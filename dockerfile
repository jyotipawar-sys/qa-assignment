# Use official Node.js image as base
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
