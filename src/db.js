// 1. Gunakan 'mysql2/promise' untuk async/await dan 'require' untuk konsistensi
const mysql = require('mysql2/promise');

// 2. Gunakan createPool untuk keandalan dan performa
const pool = mysql.createPool({
  // 3. Baca konfigurasi dari environment variables, bukan hardcode
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tes koneksi pool saat startup
pool.getConnection()
  .then(connection => {
    console.log('✅ Terhubung ke database MySQL');
    connection.release(); // Lepaskan koneksi kembali ke pool
  })
  .catch(err => {
    console.error('❌ Koneksi ke database gagal:', err.message);
  });

module.exports = pool;
