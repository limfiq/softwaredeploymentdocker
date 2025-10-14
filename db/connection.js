const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Memeriksa koneksi ke database dengan mekanisme retry.
 * Ini penting dalam lingkungan container di mana aplikasi bisa saja
 * dimulai lebih cepat daripada database.
 * @param {number} retries - Jumlah percobaan ulang.
 */
const checkConnection = async (retries = 5) => {
  while (retries) {
    try {
      const connection = await pool.getConnection();
      console.log('Berhasil terhubung ke database MySQL.');
      connection.release();
      return; // Keluar dari fungsi jika koneksi berhasil
    } catch (error) {
      console.error(`Gagal terhubung ke database, mencoba lagi dalam 5 detik... (${retries} percobaan tersisa)`);
      retries -= 1;
      if (retries === 0) {
        console.error('Gagal total terhubung ke database setelah beberapa kali percobaan.');
        process.exit(1); // Keluar dari aplikasi jika koneksi gagal total
      }
      // Tunggu 5 detik sebelum mencoba lagi
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

module.exports = { pool, checkConnection };
