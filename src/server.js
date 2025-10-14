import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// fungsi buat data mahasiswa
app.post('/mahasiswa', (req, res) => {
  const { nama, nim, jurusan } = req.body;
  const sql = 'INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)';
  db.query(sql, [nama, nim, jurusan], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Data berhasil ditambahkan', id: result.insertId });
  });
});

// Fungsi read data mahasiswa
app.get('/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Fungsi update data mahasiswa
app.put('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const { nama, nim, jurusan } = req.body;
  const sql = 'UPDATE mahasiswa SET nama=?, nim=?, jurusan=? WHERE id=?';
  db.query(sql, [nama, nim, jurusan, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Data berhasil diperbarui' });
  });
});

// Fungsi hapus data mahasiswa
app.delete('/mahasiswa/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM mahasiswa WHERE id=?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Data berhasil dihapus' });
  });
});

app.listen(3000, () => console.log('🚀 Server berjalan di port 3000'));
