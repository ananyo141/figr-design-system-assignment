# Stage 1: Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run compile

# Stage 2: Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/build ./

COPY .env package.json package-lock.json ./

RUN npm install --omit=dev

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:docker"]
