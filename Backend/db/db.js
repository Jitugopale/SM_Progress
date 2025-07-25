import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  user:process.env.USER,
  password:process.env.PASSWORD,
  server:process.env.SERVER,
  database:process.env.DATABASE,
  // TrustServerCertificate: true is often required for development
  options: {
    encrypt: false, // Use true if your SQL Server requires encryption
    trustServerCertificate: true,
  },
  port: 1433, // Default SQL Server port
};

const pool = new sql.ConnectionPool(dbConfig);
// const poolConnect = pool.connect();

const poolConnect = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database successfully');
  } catch (err) {
    if (err.code === 'ELOGIN') {
      console.error('Invalid username or password');
    } else if (err.code === 'ETIMEOUT') {
      console.error('Error connecting to the database: Connection timeout');
    } else {
      console.error('Error connecting to the database:', err.message);
    }
    process.exit(1); // Exit the process in case of a database connection error
  }
};

export { sql, pool, poolConnect };

// pool.on('error', err => {
//     console.error('SQL Server connection pool error:', err);
// });

//test connection

// async function testConnection() {
//     try {
//         let pool = await sql.connect(dbConfig);
//         console.log('Connected to the database successfully');
//         await pool.close();
//     } catch (err) {
//         // Custom error handling
//         if (err.code === 'ELOGIN') {
//             console.error('Invalid username or password');
//         } else if (err.code === 'ETIMEOUT') {
//             console.error('Connection timeout: Cannot reach the SQL Server');
//         } else if (err.code === 'ESOCKET') {
//             console.error('Network error: SQL Server is unreachable. Is the server running and accessible?');
//         } else if (err.code === 'EALREADYCONNECTED') {
//             console.error('Already connected to the database.');
//         } else if (err.message && err.message.includes('Failed to connect')) {
//             console.error('Failed to connect: Check if SQL Server is running, and TCP/IP is enabled.');
//         } else {
//             console.error('Error connecting to the database:', err);
//         }
//     }
// }

// testConnection();