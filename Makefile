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
	@