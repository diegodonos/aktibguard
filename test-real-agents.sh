#!/bin/bash

# ============================================================================
# AktibGuard Real Agent Testing Script
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}"
    echo "============================================================================"
    echo "  AktibGuard Real Agent Testing Environment"
    echo "  Testing with Real System Data"
    echo "============================================================================"
    echo -e "${NC}"
}

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

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed"
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "Prerequisites check completed"
}

# Setup Python agent
setup_agent() {
    print_status "Setting up Python agent..."
    
    cd agent
    
    # Install dependencies globally (simpler for testing)
    print_status "Installing Python dependencies..."
    pip3 install --user -r requirements.txt
    
    # Create agent config
    if [ ! -f ".env" ]; then
        print_status "Creating agent configuration..."
        cat > .env << EOF
AKTIBGUARD_SERVER=http://localhost:3000
API_KEY=test-api-key-123
AGENT_ID=auto-generated
COLLECTION_INTERVAL=15
DEBUG=true
AGENT_NAME=$(hostname)
EOF
    fi
    
    cd ..
    print_success "Agent setup completed"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend server..."
    
    cd backend-simple
    
    # Install dependencies
    if [ ! -d "node_modules" ]; then
        print_status "Installing Node.js dependencies..."
        npm install
    fi
    
    cd ..
    print_success "Backend setup completed"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    
    cd frontend
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing frontend dependencies..."
        npm install
    fi
    
    # Update API URL for real backend
    cat > .env.local << EOF
REACT_APP_API_URL=http://localhost:3000
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_VERSION=1.1.0
REACT_APP_ENVIRONMENT=testing
EOF
    
    cd ..
    print_success "Frontend prepared"
}

# Start backend server
start_backend() {
    print_status "Starting backend server..."
    
    cd backend-simple
    npm start &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    sleep 3
    
    # Test backend health
    if curl -f http://localhost:3000/api/v1/health &> /dev/null; then
        print_success "Backend server started (PID: $BACKEND_PID)"
    else
        print_error "Backend server failed to start"
        exit 1
    fi
}

# Start frontend
start_frontend() {
    print_status "Starting frontend development server..."
    
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    print_success "Frontend started (PID: $FRONTEND_PID)"
}

# Start agent
start_agent() {
    print_status "Starting AktibGuard agent..."
    
    cd agent
    python3 aktibguard_agent.py &
    AGENT_PID=$!
    cd ..
    
    print_success "Agent started (PID: $AGENT_PID)"
}

# Test agent connection
test_agent() {
    print_status "Testing agent connection..."
    
    cd agent
    python3 aktibguard_agent.py --test
    cd ..
    
    print_success "Agent test completed"
}

# Monitor system
monitor_system() {
    print_status "Monitoring system for 30 seconds..."
    
    for i in {1..6}; do
        echo -n "."
        sleep 5
    done
    echo ""
    
    # Check agent data
    print_status "Checking received data..."
    
    agents=$(curl -s http://localhost:3000/api/v1/agents | jq length 2>/dev/null || echo "0")
    threats=$(curl -s http://localhost:3000/api/v1/threats | jq length 2>/dev/null || echo "0")
    
    print_success "Agents registered: $agents"
    print_success "Threats detected: $threats"
}

# Display access info
display_info() {
    echo -e "${GREEN}"
    echo "============================================================================"
    echo "  AktibGuard Real Agent Testing - Ready!"
    echo "============================================================================"
    echo -e "${NC}"
    echo ""
    echo -e "${BLUE}🌐 Frontend Dashboard:${NC}  http://localhost:3001"
    echo -e "${BLUE}🔧 Backend API:${NC}        http://localhost:3000"
    echo -e "${BLUE}📊 API Health:${NC}         http://localhost:3000/api/v1/health"
    echo -e "${BLUE}🤖 Agents:${NC}             http://localhost:3000/api/v1/agents"
    echo -e "${BLUE}⚠️  Threats:${NC}            http://localhost:3000/api/v1/threats"
    echo ""
    echo -e "${YELLOW}📋 What's Running:${NC}"
    echo "  ✅ Real Python agent collecting system data"
    echo "  ✅ Node.js backend receiving telemetry"
    echo "  ✅ React frontend displaying real data"
    echo ""
    echo -e "${YELLOW}🔍 Real Data Being Collected:${NC}"
    echo "  📊 CPU, Memory, Disk usage"
    echo "  🔄 Running processes"
    echo "  🌐 Network connections"
    echo "  ⚠️  Basic threat detection"
    echo ""
    echo -e "${BLUE}📖 Next Steps:${NC}"
    echo "  1. Open http://localhost:3001 to see the dashboard"
    echo "  2. Watch real metrics updating every 15 seconds"
    echo "  3. Check the agent logs for debugging"
    echo "  4. Stop with Ctrl+C or run: ./stop-test.sh"
    echo ""
}

# Cleanup function
cleanup() {
    print_status "Stopping all services..."
    
    if [ ! -z "$AGENT_PID" ]; then
        kill $AGENT_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    # Kill any remaining processes
    pkill -f "aktibguard_agent.py" 2>/dev/null || true
    pkill -f "backend-simple" 2>/dev/null || true
    
    print_success "All services stopped"
}

# Create stop script
create_stop_script() {
    cat > stop-test.sh << 'EOF'
#!/bin/bash
echo "Stopping AktibGuard test environment..."
pkill -f "aktibguard_agent.py" 2>/dev/null || true
pkill -f "backend-simple" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true
echo "✅ Test environment stopped"
EOF
    chmod +x stop-test.sh
}

# Main function
main() {
    print_header
    
    # Set up cleanup on exit
    trap cleanup EXIT
    
    check_prerequisites
    setup_agent
    setup_backend
    build_frontend
    
    start_backend
    start_agent
    
    # Wait a bit for data collection
    sleep 10
    
    test_agent
    start_frontend
    
    # Wait for frontend to start
    sleep 15
    
    monitor_system
    display_info
    create_stop_script
    
    # Keep running
    print_status "Test environment running. Press Ctrl+C to stop."
    
    # Remove cleanup trap since we want to keep running
    trap - EXIT
    
    # Wait for user interrupt
    while true; do
        sleep 1
    done
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi