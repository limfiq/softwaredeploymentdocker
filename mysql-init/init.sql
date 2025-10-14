-- Gunakan database yang sudah dibuat oleh docker-compose
USE mahasiswa_db;

-- Buat tabel mahasiswa jika belum ada
CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- (Opsional) Masukkan beberapa data awal untuk testing
INSERT INTO mahasiswa(nim, nama, jurusan) VALUES
('112233', 'Budi Santoso', 'Teknik Informatika'),
('112244', 'Ani Lestari', 'Sistem Informasi');
