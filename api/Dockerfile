# Create this file: /var/www/gracejeanne/api/Dockerfile

FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Run migrations
RUN pnpm migrate

# Expose the port
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"]