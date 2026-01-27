# /var/www/gracejeanne/frontend/Dockerfile

FROM node:25-alpine3.22

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

ARG NEXT_PUBLIC_IAM_CLIENT_ID
ARG NEXT_PUBLIC_IAM_URL
ENV NEXT_PUBLIC_IAM_CLIENT_ID=$NEXT_PUBLIC_IAM_CLIENT_ID
ENV NEXT_PUBLIC_IAM_URL=$NEXT_PUBLIC_IAM_URL

RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]