# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AktibGuard is a production-ready cybersecurity platform designed for SMEs (Small and Medium Enterprises), offering 24/7 endpoint monitoring, AI-powered threat detection, and an executive-friendly dashboard at 50-70% lower cost than traditional solutions.

## Architecture

- **Frontend**: React 18 + Material-UI with cyber theme (port 3001)
- **Backend**: Node.js/Express + PostgreSQL + Redis (port 3000) 
- **Agent**: Python-based monitoring agent for Windows/Linux/macOS
- **Laboratory**: Complete testing environment with mock data
- **Deployment**: Docker-first with docker-compose configurations

## Development Commands

### Main Commands (use Makefile)
- `make help` - Show all available commands
- `make setup` - Initial project setup
- `make start` - Start all services (Frontend: :3001, API: :3000, pgAdmin: :8080)
- `make stop` / `make restart` - Service management
- `make test` - Run comprehensive test suite
- `make build` - Build all containers
- `make agent-build` - Compile monitoring agent

### Frontend (React)
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Jest + React Testing Library
- `npm run format` - Prettier formatting

### Backend (Node.js)
- `npm run dev` - Development with nodemon
- `npm test` - Jest testing (requires >70% coverage)
- `npm run lint` - ESLint analysis
- `npm run migrate` / `npm run seed` - Database operations

### Laboratory Environment
- `./deploy-lab.sh` - Deploy complete testing lab
- Uses mock-backend with JSON-based data

## Key Patterns

### Frontend Structure
- **Pages**: Lazy-loaded route components in `/pages`
- **Components**: Organized by `/layout`, `/common`, `/dashboard`
- **Theme**: Custom cyber theme with glassmorphism and neon accents
- **Real-time**: WebSocket integration for live updates

### Backend Structure
- **RESTful API**: Express with comprehensive middleware
- **Security**: JWT auth, rate limiting, helmet headers
- **Database**: PostgreSQL with 12+ optimized indexes
- **Monitoring**: Health checks and metrics endpoints

### Agent Architecture
- **Cross-platform**: Python agent for system monitoring
- **Requirements**: Install via `pip install -r agent/requirements.txt`
- **Build**: Use `make agent-build` for compilation

## Development Guidelines

### Testing Requirements
- Backend: >70% test coverage with Jest
- Frontend: React Testing Library for component testing
- Use `make test` to run full test suite

### Code Standards
- Backend: ESLint + Prettier with security plugins
- Frontend: React best practices with Material-UI patterns
- Agent: Python PEP 8 standards

### Security Focus
- Multiple security layers implemented
- No hardcoded credentials (use environment variables)
- JWT-based authentication throughout

### Performance Targets
- API responses: <200ms
- Frontend: Optimized with lazy loading
- Database: Indexed queries with business logic functions

## Docker Usage

- Development: `docker-compose.yml`
- Laboratory: `docker-compose.lab.yml` 
- All services containerized for consistent environments
- Use `make start` instead of direct docker-compose commands