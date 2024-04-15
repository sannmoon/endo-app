import { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { queryPromise } from "./db";

export const authRouter = Router();

const generateAndStoreToken = async (userId: number) => {
  const token = crypto.randomBytes(48).toString("hex");
  const date24hInFuture = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
  try {
    await queryPromise(
      "UPDATE users SET token = ?, token_expire_at = ? WHERE id = ?",
      [token, date24hInFuture, userId]
    );
    return token;
  } catch (error) {
    console.error(error);
  }
};

//SIGNUP LOGIC/REGISTRATION ENDPOINT
authRouter.post("/signup", async (req: Request, res: Response) => {
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

    const token = await generateAndStoreToken(result.insertId);
    return res.status(201).json({ id: result.insertId, email, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error logging in user"); // 🚨 Internal Server Error? 🚨//
  }
});

//LOGIN LOGIC/LOGIN ENDPOINT
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Missing required fields: email and password" });
    }

    const user = await queryPromise("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const isMatched = await bcrypt.compare(password, user[0]?.password);
    if (!user[0] || !isMatched) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid email or password" });

      /* 🚨 It's advisable to put this message as there can be social-eng/brute-force attacks.
        Best to just put both "Invalid email and password" 🚨 */
    }

    /* OR
      if (!bcrypt.compare(password, userEmail[0].password)) {
          return res.status(401).json({ errorMessage: "Invalid password" });
      } 
      In if statement, we can put ! to bcrypt but not when we define it 
      DONT DO THIS ❌ const isMatched = !bcrypt.compare ❌
      */

    const token = await generateAndStoreToken(user[0].id);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error logging in user"); // 🚨 Internal Server Error? 🚨//
  }
});

export const checkAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["auth-token"]; // if we put "-", gotta put []

  const foundUsers = await queryPromise("SELECT * FROM users WHERE token = ?", [
    token,
  ]);

  const user = foundUsers[0];

  const today = new Date();
  const expiryDate = new Date(user.token_expire_at);

  if (foundUsers.length === 0 || today > expiryDate) {
    return res.status(401).json({ msg: "Authorization denied 🤡" });
  } else {
    next();
  }
};
