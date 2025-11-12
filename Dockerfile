# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm ci --only=production
RUN cd client && npm ci --only=production

# Copy application files
COPY . .

# Build client
RUN cd client && npm run build

# Production stage
FROM node:18-alpine

# Install PM2 globally
RUN npm install pm2 -g

# Create app directory
WORKDIR /app

# Copy from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/ecosystem.config.js ./
COPY --from=builder /app/config ./config
COPY --from=builder /app/models ./models
COPY --from=builder /app/routes ./routes
COPY --from=builder /app/controllers ./controllers
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/utils ./utils
COPY --from=builder /app/database ./database
COPY --from=builder /app/public ./public
COPY --from=builder /app/client/build ./client/build

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})"

# Start the application
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
