#!/bin/bash

# ============================================================================
# AktibGuard Laboratory Deployment Script
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}"
    echo "============================================================================"
    echo "  AktibGuard Laboratory Deployment"
    echo "  Cybersecurity Platform for Testing & Demonstration"
    echo "============================================================================"
    echo -e "${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check if running as sudo for Docker (if needed)
    if ! docker ps &> /dev/null; then
        print_warning "Cannot connect to Docker daemon. You might need to run with sudo or add user to docker group."
    fi
    
    print_success "Prerequisites check completed"
}

# Get server IP
get_server_ip() {
    print_status "Detecting server IP address..."
    
    # Try to get the main interface IP
    SERVER_IP=$(ip route get 8.8.8.8 | awk '{for(i=1;i<=NF;i++) if($i=="src") print $(i+1)}' | head -1)
    
    if [ -z "$SERVER_IP" ]; then
        SERVER_IP="localhost"
        print_warning "Could not detect IP address, using localhost"
    else
        print_success "Detected server IP: $SERVER_IP"
    fi
    
    # Update environment file
    sed -i.bak "s/192\.168\.1\.100/$SERVER_IP/g" .env.lab
    sed -i.bak "s/192\.168\.1\.100/$SERVER_IP/g" docker-compose.lab.yml
}

# Build frontend for production
build_frontend() {
    print_status "Building frontend for production..."
    
    cd frontend
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing frontend dependencies..."
        npm install
    fi
    
    # Create production build
    print_status "Creating production build..."
    npm run build
    
    cd ..
    print_success "Frontend build completed"
}

# Start services
start_services() {
    print_status "Starting AktibGuard laboratory services..."
    
    # Copy environment file
    cp .env.lab .env
    
    # Start services
    docker-compose -f docker-compose.lab.yml up -d
    
    print_success "Services started successfully"
}

# Wait for services to be healthy
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for database
    print_status "Waiting for database..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if docker-compose -f docker-compose.lab.yml exec -T database pg_isready -U aktibguard_lab -d aktibguard_lab &> /dev/null; then
            break
        fi
        sleep 2
        timeout=$((timeout-2))
    done
    
    if [ $timeout -le 0 ]; then
        print_error "Database failed to start within timeout"
        exit 1
    fi
    
    # Wait for frontend
    print_status "Waiting for frontend..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if curl -f http://$SERVER_IP:3001 &> /dev/null; then
            break
        fi
        sleep 2
        timeout=$((timeout-2))
    done
    
    print_success "All services are ready"
}

# Display access information
display_access_info() {
    echo -e "${GREEN}"
    echo "============================================================================"
    echo "  AktibGuard Laboratory Deployment Complete!"
    echo "============================================================================"
    echo -e "${NC}"
    echo ""
    echo -e "${BLUE}🌐 Frontend Dashboard:${NC}  http://$SERVER_IP:3001"
    echo -e "${BLUE}🔧 Database Admin:${NC}     http://$SERVER_IP:8080"
    echo -e "${BLUE}📊 Redis Admin:${NC}        http://$SERVER_IP:8001"
    echo -e "${BLUE}🧪 Mock Backend:${NC}       http://$SERVER_IP:3000"
    echo ""
    echo -e "${YELLOW}📋 Test Credentials:${NC}"
    echo "  Email: admin@aktibguard.lab"
    echo "  Password: AktibGuard123!"
    echo ""
    echo -e "${YELLOW}🔧 Admin Tools:${NC}"
    echo "  pgAdmin: admin@aktibguard.lab / AktibGuard2024Lab!"
    echo ""
    echo -e "${BLUE}📖 Next Steps:${NC}"
    echo "  1. Access the dashboard at http://$SERVER_IP:3001"
    echo "  2. Explore the different sections (Dashboard, Endpoints, Threats, etc.)"
    echo "  3. Check system logs: docker-compose -f docker-compose.lab.yml logs -f"
    echo "  4. Stop services: docker-compose -f docker-compose.lab.yml down"
    echo ""
}

# Cleanup function
cleanup() {
    print_status "Stopping services..."
    docker-compose -f docker-compose.lab.yml down
}

# Main deployment process
main() {
    print_header
    
    # Change to project root directory
    if [ -f "../.env.lab" ]; then
        cd ..
        print_status "Working from project root directory"
    elif [ ! -f ".env.lab" ]; then
        print_error "Cannot find .env.lab file. Please run from project root or laboratory directory."
        exit 1
    fi
    
    # Set up cleanup on exit
    trap cleanup EXIT
    
    check_prerequisites
    get_server_ip
    build_frontend
    start_services
    wait_for_services
    display_access_info
    
    # Remove cleanup trap since deployment was successful
    trap - EXIT
    
    print_success "Laboratory deployment completed successfully!"
}

# Check if script is being sourced or executed
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi