import mysql from 'mysql2/promise';
import 'dotenv/config';


async function createBooksTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'books_db'
  });

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200),
        pages INT
      )
    `);
    
    console.log('✅ Table books created successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

createBooksTable();