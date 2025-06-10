import mysql from "mysql2";

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
    if (typeof sql === "string") {
      db.query(sql, values, (error: Error | null, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    } else {
      db.query(sql, values, (error: Error | null, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    }
  });
}
