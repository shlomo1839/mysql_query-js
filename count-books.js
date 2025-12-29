import mysql from 'mysql2/promise';
import 'dotenv/config';

async function countBooks() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'books_db'
    });

    try {
        const [result1] = await connection.query(
            `select count(*) as total from books`
        );
        console.log(`Total books: ${result1[0].total}`);

        const [result2] = await connection.query(
            `select count(*) as total from books where pages > 200`
        );
        console.log(`Books with 200+ pages: ${result2[0].total}`);
    } catch (error) {
        console.error(error)
    } finally {
        await connection.end()
    }
}

countBooks();