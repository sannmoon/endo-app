import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";
import mysql from "mysql";
import bcrypt from "bcrypt";

dotenv.config(); // ⚠️ should always be written down first before putting the env variable key//

const {
  OPEN_AI_API_KEY,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

const app: Express = express();
const port = PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const db = mysql.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Unable to connect to DB");
  } else {
    console.log("Database connected successfully");
  }
});

function queryPromise(
  sql: string | mysql.QueryOptions,
  values: any[] = []
): any {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.get("/health", (req: Request, res: Response) => {
  res.send("ok");
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, repeatPassword } = req.body;

    const emailCheck = await queryPromise(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (emailCheck.length > 0) {
      // or !== 0
      res.status(400).send({ errorMessage: "User has already exist" });
      return;
    }

    if (password !== repeatPassword) {
      res.status(400).json({ errorMessage: "Passwords don't match" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const users = [email, passwordHash];
    // Executing the query
    const result = await queryPromise(
      "INSERT INTO users (email, password) VALUES (?,?)",
      users
    );

    res.status(201).json({ id: result.insertId, email });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

app.post("/login", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.body.email, req.body.password);
  res.send("ok");
});

app.post("/analyze-image", async (req: Request, res: Response) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content:
          "You are a gynecologist that specialize in endometriosis. Analyze if this image (food) is healthy for endometriosis sufferers",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Does this image containing food good for endometriosis?",
          },
          {
            type: "image_url",
            image_url: {
              url: req.body.image,
            },
          },
        ],
      },
    ],
  });

  res.send({ result: response.choices[0].message.content });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
