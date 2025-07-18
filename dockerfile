# Stage 1: Build the Angular app
FROM node:18.20.2-alpine AS builder

WORKDIR /app

# Accept build argument
ARG NG_APP_BASE_URL

# Copy package files first for better caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY frontend/ .

# Overwrite environment.prod.ts with secret
RUN echo "export const environment = {" > src/environments/environment.prod.ts \
  && echo "  production: true," >> src/environments/environment.prod.ts \
  && echo "  apiUrl: '${NG_APP_BASE_URL}'" >> src/environments/environment.prod.ts \
  && echo "};" >> src/environments/environment.prod.ts

# Build the Angular app for production
RUN npm run build -- --configuration production


# Stage 2: Serve using Nginx
FROM nginx:1.25-alpine

# Copy Angular build output to Nginx html folder
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

# Custom Nginx config (make sure nginx.conf is in devops folder)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
