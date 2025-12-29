import mysql from 'mysql2/promise';
import 'dotenv/config';

async function addMannyBooks(){
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'books_db'
    });

    try {
        const books = [
            { title: 'Alice in Wonderland', pages: 150 },
            { title: 'The Little Prince', pages: 100 },
            { title: 'Moby Dick', pages: 500 }
        ];
        

        for (const book of books) {
            await connection.query(
                'insert into books (title, pages) values (?, ?)',
                [book.title, book.pages]
            )
            console.log(`added: ${book.title}`);
        }
        
        console.log(`\nall books added successfully`);
        
        
    } catch (error) {
        console.log(error);
    } finally {
        await connection.end();
    }
}

addMannyBooks();