FROM node:18-alpine

# Tentukan working directory
WORKDIR /app

# Copy file dependency
COPY package*.json ./

# Install dependency
RUN npm install

# Copy semua source code
COPY . .

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
