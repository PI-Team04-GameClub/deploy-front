# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build argument for API URL
ARG VITE_API_URL=http://localhost:3000/api
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN echo "Building with VITE_API_URL=$VITE_API_URL" && npm run build

# Serve stage
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist
COPY serve.json ./

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001", "-c", "../serve.json"]
