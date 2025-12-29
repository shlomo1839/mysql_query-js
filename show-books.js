import mysql from 'mysql2/promise';
import 'dotenv/config';

async function showBooks() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'books_db'
    });

    try {
        const [books] = await connection.query('select * from books;')

        console.log('📚 Our Books:');
        console.log('================');

        books.forEach(book => {
            console.log(`ID: ${book.id}`);
            console.log(`Title: ${book.title}`);
            console.log(`Pages: ${book.pages}`);
        }); 

        console.log(`Total: ${books.length} books`);

    } catch (error) {
        console.error(error);
    } finally {
        await connection.end();
    }
}

showBooks();