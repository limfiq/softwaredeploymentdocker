import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'sim'
});

db.connect(err => {
  if (err) {
    console.error('❌ Koneksi ke database gagal:', err);
  } else {
    console.log('✅ Terhubung ke database MySQL');
  }
});

export default db;
