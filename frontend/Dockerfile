# ============================================================================
# AktibGuard Frontend - Production Dockerfile
# Multi-stage build for optimized React application
# ============================================================================

# Build arguments
ARG NODE_VERSION=18-alpine
ARG NGINX_VERSION=alpine
ARG BUILD_VERSION=1.1.0

# React build arguments
ARG REACT_APP_API_URL=http://localhost:3000
ARG REACT_APP_WS_URL=ws://localhost:3000
ARG REACT_APP_VERSION=1.1.0
ARG REACT_APP_ENVIRONMENT=production

# ============================================================================
# Stage 1: Base Node Image
# ============================================================================
FROM node:${NODE_VERSION} AS base

# Install system dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache \
    curl \
    git \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001 -G nodejs

# ============================================================================
# Stage 2: Dependencies Installation
# ============================================================================
FROM base AS dependencies

# Copy built application from build stage
COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html

# Copy Storybook build (optional)
COPY --from=build --chown=nginx:nginx /app/storybook-static /usr/share/nginx/html/storybook 2>/dev/null || true

# Create health check script
RUN echo '#!/bin/sh' > /usr/local/bin/healthcheck.sh && \
    echo 'curl -f http://localhost:80/health || exit 1' >> /usr/local/bin/healthcheck.sh && \
    chmod +x /usr/local/bin/healthcheck.sh

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD /usr/local/bin/healthcheck.sh

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# ============================================================================
# Stage 5: Development Runtime (Optional)
# ============================================================================
FROM dependencies AS development

# Set development environment
ENV NODE_ENV=development
ENV REACT_APP_ENVIRONMENT=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Copy source code
COPY . .

# Create development directories
RUN mkdir -p coverage storybook-static && \
    chown -R reactuser:nodejs .

# Switch to non-root user
USER reactuser

# Expose development ports
EXPOSE 3000 6006

# Development health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

# Start development server
CMD ["npm", "start"]

# ============================================================================
# Stage 6: Storybook Standalone (Optional)
# ============================================================================
FROM nginx:${NGINX_VERSION} AS storybook

# Install curl for health checks
RUN apk add --no-cache curl

# Create simple nginx config for Storybook
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 6006;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check
    location /health {
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copy Storybook build
COPY --from=build --chown=nginx:nginx /app/storybook-static /usr/share/nginx/html

# Expose Storybook port
EXPOSE 6006

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:6006/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# ============================================================================
# LABELS AND METADATA
# ============================================================================
FROM production AS final

# Add metadata labels
LABEL maintainer="AktibGuard Team <dev@aktibguard.com>"
LABEL version="${BUILD_VERSION}"
LABEL description="AktibGuard Frontend Dashboard - Cybersecurity Platform for SMEs"
LABEL org.opencontainers.image.title="AktibGuard Frontend"
LABEL org.opencontainers.image.description="Production-ready React dashboard for AktibGuard cybersecurity platform"
LABEL org.opencontainers.image.version="${BUILD_VERSION}"
LABEL org.opencontainers.image.authors="AktibGuard Team"
LABEL org.opencontainers.image.url="https://aktibguard.com"
LABEL org.opencontainers.image.source="https://github.com/diegodonos/aktibguard"
LABEL org.opencontainers.image.documentation="https://github.com/diegodonos/aktibguard/blob/main/frontend/README.md"
LABEL org.opencontainers.image.created="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
LABEL org.opencontainers.image.vendor="AktibGuard"
LABEL org.opencontainers.image.licenses="MIT"

# Technology labels
LABEL tech.framework="React"
LABEL tech.ui="Material-UI"
LABEL tech.server="Nginx"
LABEL tech.build="Multi-stage"

# ============================================================================
# BUILD INSTRUCTIONS
# ============================================================================
# 
# Build commands:
# 
# Production build:
# docker build --target production -t aktibguard/frontend:latest .
# 
# Development build:
# docker build --target development -t aktibguard/frontend:dev .
# 
# Storybook build:
# docker build --target storybook -t aktibguard/storybook:latest .
# 
# Build with custom API URL:
# docker build --build-arg REACT_APP_API_URL=https://api.aktibguard.com -t aktibguard/frontend:prod .
# 
# Build with custom version:
# docker build --build-arg BUILD_VERSION=1.2.0 -t aktibguard/frontend:1.2.0 .
# 
# Multi-platform build:
# docker buildx build --platform linux/amd64,linux/arm64 -t aktibguard/frontend:latest .
# 
# Environment-specific builds:
# docker build --build-arg REACT_APP_ENVIRONMENT=staging --build-arg REACT_APP_API_URL=https://staging-api.aktibguard.com -t aktibguard/frontend:staging .
# 
# ============================================================================ package files
COPY package*.json ./

# Install dependencies
RUN npm ci --include=dev && \
    npm cache clean --force

# ============================================================================
# Stage 3: Build Stage
# ============================================================================
FROM dependencies AS build

# Set build environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_WS_URL
ARG REACT_APP_VERSION
ARG REACT_APP_ENVIRONMENT
ARG BUILD_VERSION

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_WS_URL=${REACT_APP_WS_URL}
ENV REACT_APP_VERSION=${REACT_APP_VERSION}
ENV REACT_APP_ENVIRONMENT=${REACT_APP_ENVIRONMENT}
ENV BUILD_VERSION=${BUILD_VERSION}

# Optimization flags
ENV GENERATE_SOURCEMAP=false
ENV INLINE_RUNTIME_CHUNK=false
ENV IMAGE_INLINE_SIZE_LIMIT=8192

# Copy source code
COPY . .

# Run linting and tests
RUN npm run lint || true
RUN npm run test:ci || true

# Build the application
RUN npm run build

# Build Storybook (optional)
RUN npm run build-storybook || true

# ============================================================================
# Stage 4: Nginx Production Runtime
# ============================================================================
FROM nginx:${NGINX_VERSION} AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Remove default nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Alternative: Create nginx configuration inline
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
# AktibGuard Frontend Nginx Configuration

server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ws: wss:; frame-src 'self';" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/json
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff";
    }

    # API proxy
    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # WebSocket proxy
    location /socket.io {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # React Router (SPA) fallback
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }

    # Security: Hide nginx version
    server_tokens off;

    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOF

# Copy