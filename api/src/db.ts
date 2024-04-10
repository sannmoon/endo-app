import mysql from "mysql";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

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

export function queryPromise(
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
