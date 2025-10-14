# Gunakan image Node.js versi ringan
FROM node:18-slim

# Buat working directory
WORKDIR /app

# Salin file package
COPY package*.json ./

# Install dependency
RUN npm install

# Salin seluruh kode
COPY . .

# Ekspos port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
