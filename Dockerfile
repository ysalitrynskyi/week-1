# Use Node.js to build and serve the app
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY pnpm-lock.yaml package.json ./
RUN pnpm install

# Copy application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the Node.js server
CMD ["node", "build"]
