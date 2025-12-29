import mysql from 'mysql2/promise';
import 'dotenv/config';

async function searchBooks(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'books_db'
    });

    try {
        const [book1] = await connection.query(
            `select * from books where title = ?`,
            ['The Little Prince']
        );
        console.log(book1);

        const [book2] = await connection.query(
            'select * from books where pages > ?',
            [200]
        );
        console.log(book2);
        
    } catch (error) {
        console.error(error)
    } finally {
        await connection.end();
    }
}


searchBooks();