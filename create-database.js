import mysql from 'mysql2/promise';
import 'dotenv/config';


async function createMyDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    try {
        await connection.query('CREATE DATABASE IF NOT EXISTS books_db')
        console.log("Database books_db created successfully!")

    } catch (error) {
        console.log(error);
    } finally {
        await connection.end();
    }
    
}

createMyDatabase();