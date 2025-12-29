import mysql from 'mysql2/promise';
import 'dotenv/config';

async function addBook(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'books_db'
    });

    try {
        const bookTitle = "harry potter";
        const bookPages = 100;

        const [result] = await connection.query(
            'insert into books (title, pages) VALUES (?, ?)',
            [ "the rich g", 300]
        )
        
        console.log("book added successfully");
        console.log("new book id:", result.insertId);
        
    } catch (error) {
        console.log(error);
    } finally {
        await connection.end();
    }
}

addBook();