const express = require('express');
const cors = require('cors');
// 1. Ganti `body-parser` yang sudah usang dengan middleware bawaan Express
const pool = require('./db');

const app = express();
app.use(cors());
// 2. Gunakan express.json()
app.use(express.json());

// 3. Ubah semua endpoint menjadi async dan gunakan try...catch untuk error handling

// fungsi buat data mahasiswa (CREATE)
app.post('/mahasiswa', async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    const sql = 'INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)';
    const [result] = await pool.query(sql, [nama, nim, jurusan]);
    res.status(201).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Fungsi read data mahasiswa (READ)
app.get('/mahasiswa', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM mahasiswa');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Fungsi update data mahasiswa (UPDATE)
app.put('/mahasiswa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, jurusan } = req.body;
    const sql = 'UPDATE mahasiswa SET nama=?, nim=?, jurusan=? WHERE id=?';
    await pool.query(sql, [nama, nim, jurusan, id]);
    res.json({ message: 'Data berhasil diperbarui' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Fungsi hapus data mahasiswa (DELETE)
app.delete('/mahasiswa/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM mahasiswa WHERE id=?';
    await pool.query(sql, [id]);
    res.json({ message: 'Data berhasil dihapus' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

app.listen(3000, () => console.log('🚀 Server berjalan di port 3000'));
