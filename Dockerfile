# Use Node.js 18 for Cloudtype
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev || npm install --production

# Copy client package.json
COPY client/package*.json ./client/

# Install client dependencies and build
WORKDIR /app/client
RUN npm ci || npm install
WORKDIR /app

# Copy all application files
COPY . .

# Build client
WORKDIR /app/client
RUN npm run build
WORKDIR /app

# Create necessary directories
RUN mkdir -p logs uploads

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
