# Stage 1: Build the Angular app
FROM node:18.20.2-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY frontend/ /app

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Stage 2: Serve using Nginx
FROM nginx:1.25-alpine

# Copy Angular build output to Nginx html folder
COPY --from=builder /app/dist/* /usr/share/nginx/html

# Custom Nginx config (make sure nginx.conf is in devops folder)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Stage 3: Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost/ || exit 1
# This healthcheck will ensure that the Nginx server is running and serving the Angular app
# If the healthcheck fails, it will exit with a non-zero status, indicating an issue with the container.
