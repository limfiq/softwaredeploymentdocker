require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkConnection } = require('./db/connection');
const mahasiswaRoutes = require('./routes/mahasiswa');

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware untuk mem-parsing body JSON dari request

// Cek koneksi database saat aplikasi dimulai
checkConnection();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Selamat datang di API Mahasiswa!' });
});
app.use('/mahasiswa', mahasiswaRoutes);

// Middleware untuk menangani rute yang tidak ditemukan (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
});

// Global Error Handler untuk menangani error tak terduga
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
