FROM node:18-alpine

# 1. Buat user non-root untuk keamanan
# Argumen -D berarti "don't assign a password"
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Tentukan working directory dan berikan kepemilikan ke user baru
WORKDIR /app
RUN chown appuser:appgroup /app

# Copy file dependency
COPY package*.json ./

# 2. Install hanya dependensi produksi dengan 'npm ci' untuk build yang lebih cepat dan andal
RUN npm ci --only=production

# Copy source code setelah instalasi dependensi untuk caching yang lebih baik
COPY . .
RUN chown -R appuser:appgroup /app

# 3. Ganti ke user non-root
USER appuser

# Expose port aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
