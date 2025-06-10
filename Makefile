# ============================================================================
# AktibGuard - Production Ready Makefile
# Cybersecurity Platform for SMEs
# ============================================================================

.PHONY: help start stop restart status build clean logs agent-build agent-install test lint format backup restore deploy setup

# Default target
.DEFAULT_GOAL := help

# ============================================================================
# CONFIGURATION
# ============================================================================
# Colors for output
BLUE=\033[0;34m
GREEN=\033[0;32m
YELLOW=\033[1;33m
RED=\033[0;31m
PURPLE=\033[0;35m
CYAN=\033[0;36m
WHITE=\033[1;37m
NC=\033[0m # No Color

# Project configuration
PROJECT_NAME=AktibGuard
VERSION=1.1.0
REGISTRY=aktibguard
DOCKER_COMPOSE=docker-compose
DOCKER=docker

# Directories
BACKEND_DIR=backend
FRONTEND_DIR=frontend
AGENT_DIR=agent
DATABASE_DIR=database
DOCS_DIR=docs

# Environment detection
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
    AGENT_BINARY := aktibguard-agent.exe
    INSTALL_SCRIPT := install-windows.bat
else
    DETECTED_OS := $(shell uname -s)
    AGENT_BINARY := aktibguard-agent
    ifeq ($(DETECTED_OS),Darwin)
        INSTALL_SCRIPT := install-macos.sh
    else
        INSTALL_SCRIPT := install-linux.sh
    endif
endif

# ============================================================================
# HELP TARGET
# ============================================================================
help: ## Show this help message
	@echo "$(BLUE)🛡️  $(PROJECT_NAME) v$(VERSION) - Development Commands$(NC)"
	@echo "$(BLUE)================================================================$(NC)"
	@echo ""
	@echo "$(GREEN)🚀 Quick Start:$(NC)"
	@echo "  $(YELLOW)make setup$(NC)     - Initial project setup"
	@echo "  $(YELLOW)make start$(NC)     - Start all services"
	@echo "  $(YELLOW)make status$(NC)    - Check service status"
	@echo "  $(YELLOW)make logs$(NC)      - View live logs"
	@echo ""
	@echo "$(GREEN)📦 Development:$(NC)"
	@echo "  $(YELLOW)make build$(NC)     - Build all containers"
	@echo "  $(YELLOW)make stop$(NC)      - Stop all services"
	@echo "  $(YELLOW)make restart$(NC)   - Restart all services"
	@echo "  $(YELLOW)make clean$(NC)     - Clean containers and volumes"
	@echo ""
	@echo "$(GREEN)🔧 Database:$(NC)"
	@echo "  $(YELLOW)make backup-db$(NC) - Backup PostgreSQL database"
	@echo "  $(YELLOW)make restore-db$(NC)- Restore database from backup"
	@echo "  $(YELLOW)make migrate$(NC)   - Run database migrations"
	@echo "  $(YELLOW)make seed$(NC)      - Seed database with sample data"
	@echo ""
	@echo "$(GREEN)🤖 Agent:$(NC)"
	@echo "  $(YELLOW)make agent-build$(NC)   - Build Go agent for $(DETECTED_OS)"
	@echo "  $(YELLOW)make agent-install$(NC) - Install agent as system service"
	@echo "  $(YELLOW)make agent-uninstall$(NC) - Remove agent service"
	@echo ""
	@echo "$(GREEN)🧪 Testing & Quality:$(NC)"
	@echo "  $(YELLOW)make test$(NC)      - Run all tests"
	@echo "  $(YELLOW)make test-backend$(NC) - Run backend tests only"
	@echo "  $(YELLOW)make test-frontend$(NC) - Run frontend tests only"
	@echo "  $(YELLOW)make lint$(NC)      - Lint all code"
	@echo "  $(YELLOW)make format$(NC)    - Format all code"
	@echo "  $(YELLOW)make security$(NC)  - Run security audit"
	@echo ""
	@echo "$(GREEN)🚀 Deployment:$(NC)"
	@echo "  $(YELLOW)make deploy-dev$(NC)  - Deploy to development"
	@echo "  $(YELLOW)make deploy-prod$(NC) - Deploy to production"
	@echo "  $(YELLOW)make build-prod$(NC)  - Build production images"
	@echo ""
	@echo "$(GREEN)📊 Monitoring:$(NC)"
	@echo "  $(YELLOW)make monitor$(NC)   - Start monitoring stack"
	@echo "  $(YELLOW)make admin$(NC)     - Start admin tools"
	@echo ""
	@echo "$(PURPLE)💡 For more details: https://github.com/diegodonos/aktibguard$(NC)"

# ============================================================================
# SETUP & INITIALIZATION
# ============================================================================
setup: ## Initial project setup
	@echo "$(BLUE)🔧 Setting up $(PROJECT_NAME) development environment...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)📋 Creating .env from template...$(NC)"; \
		cp .env.example .env; \
		echo "$(GREEN)✅ .env file created. Please edit with your settings.$(NC)"; \
	else \
		echo "$(GREEN)✅ .env file already exists.$(NC)"; \
	fi
	@echo "$(YELLOW)📦 Building Docker images...$(NC)"
	@$(DOCKER_COMPOSE) build
	@echo "$(YELLOW)🗄️  Setting up database...$(NC)"
	@$(DOCKER_COMPOSE) up -d database redis
	@sleep 10
	@make migrate
	@echo "$(GREEN)🎉 Setup complete! Run 'make start' to begin.$(NC)"

# ============================================================================
# DOCKER SERVICES MANAGEMENT
# ============================================================================
start: ## Start all services
	@echo "$(BLUE)🚀 Starting $(PROJECT_NAME) services...$(NC)"
	@$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)✅ Services started successfully!$(NC)"
	@echo ""
	@echo "$(CYAN)🌐 Access URLs:$(NC)"
	@echo "  Dashboard: $(YELLOW)http://localhost:3001$(NC)"
	@echo "  API:       $(YELLOW)http://localhost:3000$(NC)"
	@echo "  pgAdmin:   $(YELLOW)http://localhost:8080$(NC)"
	@echo ""

stop: ## Stop all services
	@echo "$(RED)🛑 Stopping $(PROJECT_NAME) services...$(NC)"
	@$(DOCKER_COMPOSE) down
	@echo "$(GREEN)✅ Services stopped.$(NC)"

restart: ## Restart all services
	@echo "$(YELLOW)🔄 Restarting $(PROJECT_NAME) services...$(NC)"
	@$(DOCKER_COMPOSE) restart
	@echo "$(GREEN)✅ Services restarted.$(NC)"

status: ## Check service status
	@echo "$(BLUE)📊 $(PROJECT_NAME) Service Status:$(NC)"
	@$(DOCKER_COMPOSE) ps

build: ## Build all containers
	@echo "$(BLUE)🔨 Building $(PROJECT_NAME) containers...$(NC)"
	@$(DOCKER_COMPOSE) build --no-cache
	@echo "$(GREEN)✅ Build complete.$(NC)"

clean: ## Clean containers and volumes
	@echo "$(RED)🧹 Cleaning containers and volumes...$(NC)"
	@$(DOCKER_COMPOSE) down -v --remove-orphans
	@$(DOCKER) system prune -f
	@echo "$(GREEN)✅ Cleanup complete.$(NC)"

# ============================================================================
# LOGS & MONITORING
# ============================================================================
logs: ## View live logs
	@echo "$(CYAN)📋 Live logs for $(PROJECT_NAME):$(NC)"
	@$(DOCKER_COMPOSE) logs -f

logs-backend: ## View backend logs
	@$(DOCKER_COMPOSE) logs -f backend

logs-frontend: ## View frontend logs
	@$(DOCKER_COMPOSE) logs -f frontend

logs-database: ## View database logs
	@$(DOCKER_COMPOSE) logs -f database

# ============================================================================
# DATABASE MANAGEMENT
# ============================================================================
migrate: ## Run database migrations
	@echo "$(BLUE)🗄️  Running database migrations...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm run migrate
	@echo "$(GREEN)✅ Migrations complete.$(NC)"

seed: ## Seed database with sample data
	@echo "$(BLUE)🌱 Seeding database...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm run seed
	@echo "$(GREEN)✅ Database seeded.$(NC)"

backup-db: ## Backup PostgreSQL database
	@echo "$(BLUE)💾 Creating database backup...$(NC)"
	@mkdir -p backups
	@$(DOCKER_COMPOSE) exec database pg_dump -U aktibguard aktibguard > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✅ Backup created in backups/ directory.$(NC)"

restore-db: ## Restore database from backup
	@echo "$(YELLOW)⚠️  This will overwrite the current database!$(NC)"
	@read -p "Enter backup file name (in backups/): " backup_file; \
	if [ -f "backups/$$backup_file" ]; then \
		echo "$(BLUE)🔄 Restoring database...$(NC)"; \
		$(DOCKER_COMPOSE) exec -T database psql -U aktibguard -d aktibguard < "backups/$$backup_file"; \
		echo "$(GREEN)✅ Database restored.$(NC)"; \
	else \
		echo "$(RED)❌ Backup file not found.$(NC)"; \
	fi

db-console: ## Connect to database console
	@$(DOCKER_COMPOSE) exec database psql -U aktibguard -d aktibguard

# ============================================================================
# AGENT MANAGEMENT
# ============================================================================
agent-build: ## Build Go agent
	@echo "$(BLUE)🤖 Building agent for $(DETECTED_OS)...$(NC)"
	@if [ -d "$(AGENT_DIR)" ]; then \
		cd $(AGENT_DIR) && \
		go mod tidy && \
		go build -o $(AGENT_BINARY) .; \
		echo "$(GREEN)✅ Agent built: $(AGENT_DIR)/$(AGENT_BINARY)$(NC)"; \
	else \
		echo "$(RED)❌ Agent directory not found. Please implement agent first.$(NC)"; \
	fi

agent-install: agent-build ## Install agent as system service
	@echo "$(BLUE)📦 Installing agent as system service...$(NC)"
	@if [ -f "$(AGENT_DIR)/$(INSTALL_SCRIPT)" ]; then \
		cd $(AGENT_DIR) && sudo ./$(INSTALL_SCRIPT); \
		echo "$(GREEN)✅ Agent service installed.$(NC)"; \
	else \
		echo "$(RED)❌ Install script not found.$(NC)"; \
	fi

agent-uninstall: ## Remove agent service
	@echo "$(RED)🗑️  Removing agent service...$(NC)"
	@if [ "$(DETECTED_OS)" = "Windows" ]; then \
		sc delete AktibGuardAgent; \
	elif [ "$(DETECTED_OS)" = "Darwin" ]; then \
		sudo launchctl unload /Library/LaunchDaemons/com.aktibguard.agent.plist; \
		sudo rm /Library/LaunchDaemons/com.aktibguard.agent.plist; \
	else \
		sudo systemctl stop aktibguard-agent; \
		sudo systemctl disable aktibguard-agent; \
		sudo rm /etc/systemd/system/aktibguard-agent.service; \
		sudo systemctl daemon-reload; \
	fi
	@echo "$(GREEN)✅ Agent service removed.$(NC)"

# ============================================================================
# TESTING & QUALITY ASSURANCE
# ============================================================================
test: ## Run all tests
	@echo "$(BLUE)🧪 Running all tests...$(NC)"
	@make test-backend
	@make test-frontend
	@echo "$(GREEN)✅ All tests complete.$(NC)"

test-backend: ## Run backend tests
	@echo "$(BLUE)🧪 Running backend tests...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm test
	@echo "$(GREEN)✅ Backend tests complete.$(NC)"

test-frontend: ## Run frontend tests
	@echo "$(BLUE)🧪 Running frontend tests...$(NC)"
	@$(DOCKER_COMPOSE) exec frontend npm test -- --coverage --watchAll=false
	@echo "$(GREEN)✅ Frontend tests complete.$(NC)"

test-e2e: ## Run end-to-end tests
	@echo "$(BLUE)🧪 Running E2E tests...$(NC)"
	@$(DOCKER_COMPOSE) exec frontend npm run test:e2e
	@echo "$(GREEN)✅ E2E tests complete.$(NC)"

lint: ## Lint all code
	@echo "$(BLUE)🔍 Linting code...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm run lint
	@$(DOCKER_COMPOSE) exec frontend npm run lint
	@echo "$(GREEN)✅ Linting complete.$(NC)"

format: ## Format all code
	@echo "$(BLUE)✨ Formatting code...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm run format
	@$(DOCKER_COMPOSE) exec frontend npm run format
	@echo "$(GREEN)✅ Formatting complete.$(NC)"

security: ## Run security audit
	@echo "$(BLUE)🔒 Running security audit...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm audit
	@$(DOCKER_COMPOSE) exec frontend npm audit
	@echo "$(GREEN)✅ Security audit complete.$(NC)"

# ============================================================================
# DEPLOYMENT
# ============================================================================
build-prod: ## Build production images
	@echo "$(BLUE)🏭 Building production images...$(NC)"
	@$(DOCKER_COMPOSE) --profile production build
	@echo "$(GREEN)✅ Production images built.$(NC)"

deploy-dev: ## Deploy to development
	@echo "$(BLUE)🚀 Deploying to development...$(NC)"
	@$(DOCKER_COMPOSE) --profile development up -d
	@echo "$(GREEN)✅ Development deployment complete.$(NC)"

deploy-prod: build-prod ## Deploy to production
	@echo "$(BLUE)🚀 Deploying to production...$(NC)"
	@$(DOCKER_COMPOSE) --profile production up -d
	@echo "$(GREEN)✅ Production deployment complete.$(NC)"

# ============================================================================
# MONITORING & ADMIN TOOLS
# ============================================================================
monitor: ## Start monitoring stack
	@echo "$(BLUE)📊 Starting monitoring stack...$(NC)"
	@$(DOCKER_COMPOSE) --profile monitoring up -d
	@echo "$(GREEN)✅ Monitoring stack started.$(NC)"
	@echo "  Prometheus: $(YELLOW)http://localhost:9090$(NC)"
	@echo "  Grafana:    $(YELLOW)http://localhost:3100$(NC)"

admin: ## Start admin tools
	@echo "$(BLUE)🔧 Starting admin tools...$(NC)"
	@$(DOCKER_COMPOSE) --profile admin up -d
	@echo "$(GREEN)✅ Admin tools started.$(NC)"
	@echo "  pgAdmin:      $(YELLOW)http://localhost:8080$(NC)"
	@echo "  Redis Insight: $(YELLOW)http://localhost:8001$(NC)"

# ============================================================================
# UTILITY COMMANDS
# ============================================================================
shell-backend: ## Access backend container shell
	@$(DOCKER_COMPOSE) exec backend /bin/bash

shell-frontend: ## Access frontend container shell
	@$(DOCKER_COMPOSE) exec frontend /bin/bash

shell-database: ## Access database container shell
	@$(DOCKER_COMPOSE) exec database /bin/bash

update: ## Update all dependencies
	@echo "$(BLUE)⬆️  Updating dependencies...$(NC)"
	@$(DOCKER_COMPOSE) exec backend npm update
	@$(DOCKER_COMPOSE) exec frontend npm update
	@echo "$(GREEN)✅ Dependencies updated.$(NC)"

health: ## Check health of all services
	@echo "$(BLUE)🏥 Checking service health...$(NC)"
	@$(DOCKER_COMPOSE) exec backend curl -f http://localhost:3000/health || echo "$(RED)❌ Backend unhealthy$(NC)"
	@$(DOCKER_COMPOSE) exec frontend curl -f http://localhost:3000 || echo "$(RED)❌ Frontend unhealthy$(NC)"
	@echo "$(GREEN)✅ Health check complete.$(NC)"

# ============================================================================
# DOCKER UTILITIES
# ============================================================================
docker-prune: ## Clean up Docker system
	@echo "$(RED)🧹 Cleaning Docker system...$(NC)"
	@$(DOCKER) system prune -af --volumes
	@echo "$(GREEN)✅ Docker cleanup complete.$(NC)"

docker-reset: stop docker-prune ## Complete Docker reset
	@echo "$(RED)🔄 Resetting Docker environment...$(NC)"
	@$(DOCKER_COMPOSE) down -v --remove-orphans --rmi all
	@echo "$(GREEN)✅ Docker environment reset.$(NC)"

# ============================================================================
# INFORMATION COMMANDS
# ============================================================================
info: ## Show project information
	@echo "$(BLUE)ℹ️  $(PROJECT_NAME) v$(VERSION)$(NC)"
	@echo "$(BLUE)================================$(NC)"
	@echo "OS:         $(DETECTED_OS)"
	@echo "Docker:     $(shell $(DOCKER) --version 2>/dev/null || echo 'Not installed')"
	@echo "Compose:    $(shell $(DOCKER_COMPOSE) --version 2>/dev/null || echo 'Not installed')"
	@echo "Backend:    $(BACKEND_DIR)/"
	@echo "Frontend:   $(FRONTEND_DIR)/"
	@echo "Agent:      $(AGENT_DIR)/"
	@echo ""

version: ## Show version information
	@echo "$(BLUE)$(PROJECT_NAME) v$(VERSION)$(NC)"

# ============================================================================
# CI/CD COMMANDS
# ============================================================================
ci-test: ## Run CI tests
	@echo "$(BLUE)🤖 Running CI tests...$(NC)"
	@$(DOCKER_COMPOSE) exec -T backend npm run test:ci
	@$(DOCKER_COMPOSE) exec -T frontend npm run test:ci
	@echo "$(GREEN)✅ CI tests complete.$(NC)"

ci-build: ## CI build command
	@echo "$(BLUE)🤖 Running CI build...$(NC)"
	@$(DOCKER_COMPOSE) build
	@make ci-test
	@make security
	@echo "$(GREEN)✅ CI build complete.$(NC)"

# ============================================================================
# END OF MAKEFILE
# ============================================================================