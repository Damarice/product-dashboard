# Stage 1: Install dependencies and build sharp
FROM node:20-alpine AS builder

# Install necessary packages for sharp
RUN apk add --no-cache \
    vips-dev \
    fftw-dev \
    build-base \
    python3

WORKDIR /app

# Install sharp in standalone mode
RUN npm install sharp --unsafe-perm --build-from-source

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json* ./

# Install dependencies including Next.js
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Create production image
FROM node:20-alpine AS production

# Install libc6-compat for compatibility with sharp
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the necessary files for building Next.js
COPY --from=builder /app/package.json /app/package-lock.json* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./

# Copy the public folder
COPY --from=builder /app/public ./public

# Expose the port and start the server
EXPOSE 3000
CMD ["npm", "start"]
