import mysql from 'mysql2/promise';
import 'dotenv/config';

// connection
async function completeCRUD() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'books_db'
  });

  try {
    // CREATE
    console.log('1️⃣ Adding new book...');
    const [insertResult] = await connection.query(
      'INSERT INTO books (title, pages) VALUES (?, ?)',
      ['Test Book', 250]
    );
    const newId = insertResult.insertId;
    console.log(`✅ Book added with ID: ${newId}\n`);

    // READ
    console.log('2️⃣ Reading the new book...');
    const [books] = await connection.query(
      'SELECT * FROM books WHERE id = ?',
      [newId]
    );
    console.log('✅ Book:', books[0]);
    console.log('');

    // UPDATE
    console.log('3️⃣ Updating the book...');
    await connection.query(
      'UPDATE books SET pages = ? WHERE id = ?',
      [300, newId]
    );
    console.log('✅ Book updated\n');

    // READ again
    console.log('4️⃣ Reading again after update...');
    const [updated] = await connection.query(
      'SELECT * FROM books WHERE id = ?',
      [newId]
    );
    console.log('✅ Updated book:', updated[0]);
    console.log('');

    // DELETE
    console.log('5️⃣ Deleting the book...');
    await connection.query(
      'DELETE FROM books WHERE id = ?',
      [newId]
    );
    console.log('✅ Book deleted\n');

    // VERIFY
    console.log('6️⃣ Verifying deletion...');
    const [check] = await connection.query(
      'SELECT * FROM books WHERE id = ?',
      [newId]
    );
    if (check.length === 0) {
      console.log('✅ Book successfully deleted!');
    }

    console.log('\n🎉 Completed all CRUD operations!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

completeCRUD();