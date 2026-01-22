# /var/www/gracejeanne/api/Dockerfile

FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN pnpm build

# Create entrypoint script to run migrations then start
RUN echo '#!/bin/sh' > /entrypoint.sh && \
    echo 'echo "Running migrations..."' >> /entrypoint.sh && \
    echo 'pnpm migrate' >> /entrypoint.sh && \
    echo 'echo "Starting NestJS application..."' >> /entrypoint.sh && \
    echo 'exec pnpm start:prod' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]