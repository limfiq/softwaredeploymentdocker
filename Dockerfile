# Tahap 1: Gunakan base image Node.js versi LTS (Long-Term Support) yang ringan
FROM node:18-alpine

# Tahap 2: Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Tahap 3: Salin package.json dan package-lock.json untuk memanfaatkan caching layer Docker
COPY package*.json ./

# Tahap 4: Install dependensi untuk production agar image lebih kecil dan aman
RUN npm install --only=production

# Tahap 5: Salin sisa file aplikasi ke dalam direktori kerja
COPY . .

# Tahap 6: Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Tahap 7: Perintah untuk menjalankan aplikasi saat container dimulai
# Menggunakan 'node' langsung lebih baik untuk signal handling di Docker
CMD [ "node", "server.js" ]
