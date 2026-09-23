# ---- Build Stage ----
FROM registry.redhat.io/ubi9/nodejs-20:latest AS builder

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package*.json ./
RUN npm ci --omit=dev=false

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime Stage ----
FROM registry.redhat.io/ubi9/nginx-120:latest

# OpenShift runs containers as arbitrary non-root UIDs; ensure nginx can write to required dirs
RUN chown -R 1001:0 /var/cache/nginx /var/log/nginx /var/run && \
    chmod -R g+rwX /var/cache/nginx /var/log/nginx /var/run

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Run as non-root (OpenShift-compatible)
USER 1001

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
