# ============================================================================
# AktibGuard Backend - Production Dockerfile
# Multi-stage build for optimized production image
# ============================================================================

# Build arguments
ARG NODE_VERSION=18-alpine
ARG NODE_ENV=production
ARG BUILD_VERSION=1.1.0

# ============================================================================
# Stage 1: Base Image with Dependencies
# ============================================================================
FROM node:${NODE_VERSION} AS base

# Install system dependencies and security updates
RUN apk update && apk upgrade && \
    apk add --no-cache \
    curl \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create app directory and user for security
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S aktibguard -u 1001 -G nodejs

# ============================================================================
# Stage 2: Dependencies Installation
# ============================================================================
FROM base AS dependencies

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --include=dev && \
    npm cache clean --force

# ============================================================================
# Stage 3: Build Stage
# ============================================================================
FROM dependencies AS build

# Set build environment
ARG NODE_ENV
ARG BUILD_VERSION
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_VERSION=${BUILD_VERSION}

# Copy source code
COPY . .

# Run build tasks (linting, testing, documentation)
RUN npm run lint && \
    npm run test:ci && \
    npm run docs || true

# Remove dev dependencies and install only production dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# ============================================================================
# Stage 4: Production Runtime
# ============================================================================
FROM base AS production

# Set production environment variables
ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn
ENV PORT=3000

# Performance optimizations
ENV UV_THREADPOOL_SIZE=4
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Copy production dependencies
COPY --from=build --chown=aktibguard:nodejs /app/node_modules ./node_modules

# Copy application source
COPY --from=build --chown=aktibguard:nodejs /app .

# Create necessary directories with proper permissions
RUN mkdir -p logs uploads cache temp && \
    chown -R aktibguard:nodejs logs uploads cache temp

# Remove unnecessary files for production
RUN rm -rf \
    tests/ \
    coverage/ \
    .git/ \
    .github/ \
    *.md \
    .eslintrc* \
    .prettierrc* \
    jest.config.js \
    nodemon.json

# Health check script
COPY --chown=aktibguard:nodejs <<EOF /usr/local/bin/healthcheck.sh
#!/bin/sh
curl -f http://localhost:3000/health || exit 1
EOF

RUN chmod +x /usr/local/bin/healthcheck.sh

# Switch to non-root user
USER aktibguard

# Expose application port
EXPOSE 3000

# Health check configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD /usr/local/bin/healthcheck.sh

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["npm", "start"]

# ============================================================================
# Stage 5: Development Runtime (Optional)
# ============================================================================
FROM dependencies AS development

# Set development environment
ENV NODE_ENV=development
ENV DEBUG=*

# Install additional development tools
RUN apk add --no-cache \
    git \
    bash \
    vim \
    htop

# Copy source code
COPY . .

# Create development directories
RUN mkdir -p logs uploads cache temp coverage && \
    chown -R aktibguard:nodejs .

# Switch to non-root user
USER aktibguard

# Expose application and debug ports
EXPOSE 3000 9229

# Development health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start in development mode with hot reload
CMD ["npm", "run", "dev"]

# ============================================================================
# LABELS AND METADATA
# ============================================================================
FROM production AS final

# Add metadata labels
LABEL maintainer="AktibGuard Team <dev@aktibguard.com>"
LABEL version="${BUILD_VERSION}"
LABEL description="AktibGuard Backend API - Cybersecurity Platform for SMEs"
LABEL org.opencontainers.image.title="AktibGuard Backend"
LABEL org.opencontainers.image.description="Production-ready backend API for AktibGuard cybersecurity platform"
LABEL org.opencontainers.image.version="${BUILD_VERSION}"
LABEL org.opencontainers.image.authors="AktibGuard Team"
LABEL org.opencontainers.image.url="https://aktibguard.com"
LABEL org.opencontainers.image.source="https://github.com/diegodonos/aktibguard"
LABEL org.opencontainers.image.documentation="https://github.com/diegodonos/aktibguard/blob/main/README.md"
LABEL org.opencontainers.image.created="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
LABEL org.opencontainers.image.vendor="AktibGuard"
LABEL org.opencontainers.image.licenses="MIT"

# Security labels
LABEL security.scan="enabled"
LABEL security.updates="auto"

# ============================================================================
# BUILD INSTRUCTIONS
# ============================================================================
# 
# Build commands:
# 
# Production build:
# docker build --target production -t aktibguard/backend:latest .
# 
# Development build:
# docker build --target development -t aktibguard/backend:dev .
# 
# Build with custom version:
# docker build --build-arg BUILD_VERSION=1.2.0 -t aktibguard/backend:1.2.0 .
# 
# Build with specific Node version:
# docker build --build-arg NODE_VERSION=18-alpine -t aktibguard/backend:node18 .
# 
# Multi-platform build:
# docker buildx build --platform linux/amd64,linux/arm64 -t aktibguard/backend:latest .
# 
# ============================================================================