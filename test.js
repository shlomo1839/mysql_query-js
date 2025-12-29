import mysql from 'mysql2/promise';
import 'dotenv/config';


// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD
// });


async function checkConection() {
    try {
        const connection = await mysql.createConnection( {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        } )
        console.log("Successfully connected to MySQL!")

        await connection.end();

    } catch (error) {
        console.log(error)
    }
}

checkConection()