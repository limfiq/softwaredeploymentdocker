const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');

// Rute untuk resource 'mahasiswa'
router.get('/', mahasiswaController.getAllMahasiswa);
router.post('/', mahasiswaController.createMahasiswa);
router.get('/:id', mahasiswaController.getMahasiswaById);
router.put('/:id', mahasiswaController.updateMahasiswa);
router.delete('/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;
