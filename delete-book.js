import mysql from "mysql2/promise";
import "dotenv/config";

async function deleteBook() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "books_db",
  });

  try {
    const bookId = 2;

    const [before] = await connection.query(
      `select * from books where id = ?`,
        [bookId]
    );
    console.log("Book to delete:");
    console.log(before[0]);

    const [result] = await connection.query(
        `delete from books where id = ?`,
        [bookId]
    );
    console.log("Book deleted successfully!");
    console.log("Rows deleted:", result.affectedRows);

    const [after] = await connection.query(
      `select * from books where id = ?`,
      [bookId]
    );

    if (after.length === 0) {
      console.log("Verified: Book is gone!");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
}

deleteBook();