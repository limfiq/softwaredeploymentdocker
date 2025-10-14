const { pool } = require('../db/connection');

// GET all mahasiswa
exports.getAllMahasiswa = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, nim, nama, jurusan FROM mahasiswa ORDER BY created_at DESC');
    res.status(200).json({
      message: 'Berhasil mengambil semua data mahasiswa',
      data: rows,
    });
  } catch (error) {
    next(error); // Teruskan error ke global error handler di server.js
  }
};

// GET mahasiswa by ID
exports.getMahasiswaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id, nim, nama, jurusan FROM mahasiswa WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: `Mahasiswa dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({
      message: `Berhasil mengambil data mahasiswa dengan ID `,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// CREATE new mahasiswa
exports.createMahasiswa = async (req, res, next) => {
  try {
    const { nim, nama, jurusan } = req.body;
    if (!nim || !nama || !jurusan) {
      return res.status(400).json({ message: 'Semua field (nim, nama, jurusan) harus diisi' });
    }
    const [result] = await pool.query(
      'INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)',
      [nim, nama, jurusan]
    );
    res.status(201).json({
      message: 'Data mahasiswa baru berhasil dibuat',
      data: { id: result.insertId, nim, nama, jurusan },
    });
  } catch (error) {
    // Handle error jika NIM sudah ada (unique constraint violation)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Konflik: NIM sudah terdaftar.' });
    }
    next(error);
  }
};

// UPDATE mahasiswa by ID
exports.updateMahasiswa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nim, nama, jurusan } = req.body;
    if (!nim || !nama || !jurusan) {
      return res.status(400).json({ message: 'Semua field (nim, nama, jurusan) harus diisi' });
    }
    const [result] = await pool.query(
      'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ?',
      [nim, nama, jurusan, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Mahasiswa dengan ID  tidak ditemukan` });
    }
    res.status(200).json({
      message: `Data mahasiswa dengan ID  berhasil diperbarui`,
      data: { id: Number(id), nim, nama, jurusan },
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Konflik: NIM sudah terdaftar.' });
    }
    next(error);
  }
};

// DELETE mahasiswa by ID
exports.deleteMahasiswa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM mahasiswa WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Mahasiswa dengan ID  tidak ditemukan` });
    }
    res.status(200).json({ message: `Data mahasiswa dengan ID  berhasil dihapus` });
  } catch (error) {
    next(error);
  }
};
