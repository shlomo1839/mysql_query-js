import mysql from 'mysql2/promise';
import 'dotenv/config';

async function updateBook() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'books_db'
  });
  try {
    const bookId = 1;
    const newPages = 450;

    const [result] = await connection.query(
        'update books set pages = ? where id = ?',
        [newPages, bookId]
    );

    console.log('Book updated!');
    console.log('Rows affected:', result.affectedRows)

    const [updated] = await connection.query(
        `select * from books where id = ?`,
        [bookId]
    );
    console.log('\n Updated book:');
    console.log(updated[0]);
  } catch (error) {
    console.error(error)
  } finally {
    await connection.end();
  }
}

updateBook();