# 🧪 AktibGuard - Laboratory Testing Guide

## 📋 Overview

This laboratory environment is designed for testing, demonstration, and evaluation of the AktibGuard cybersecurity platform. It includes mock data, simulated threats, and a complete containerized setup.

## 🚀 Quick Start

### Prerequisites

- Docker (20.10+)
- Docker Compose (2.0+)
- 4GB+ available RAM
- 10GB+ available disk space

### One-Command Deployment

```bash
cd laboratory
./deploy-lab.sh
```

## 🌐 Access Points

After deployment, access the following services:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend Dashboard** | `http://[SERVER_IP]:3001` | admin@aktibguard.lab / AktibGuard123! |
| **Database Admin** | `http://[SERVER_IP]:8080` | admin@aktibguard.lab / AktibGuard2024Lab! |
| **Redis Admin** | `http://[SERVER_IP]:8001` | - |
| **Mock Backend API** | `http://[SERVER_IP]:3000` | - |

## 🧪 Testing Scenarios

### 1. Dashboard Overview
- **URL**: `/dashboard`
- **Features**: Real-time metrics, threat radar, network map
- **Test**: Verify all widgets load and display mock data

### 2. Endpoint Management
- **URL**: `/machines`
- **Features**: Device inventory, status monitoring, search/filter
- **Test**: 
  - Search for devices
  - Filter by status
  - Check device details

### 3. Threat Detection
- **URL**: `/threats`
- **Features**: Threat analysis, timeline, distribution charts
- **Test**:
  - View threat list
  - Filter by severity
  - Check threat details

### 4. Security Analytics
- **URL**: `/analytics`
- **Features**: Advanced metrics, compliance status, trends
- **Test**:
  - Review security metrics
  - Check compliance scores
  - Analyze trends

### 5. Configuration
- **URL**: `/settings`
- **Features**: System settings, user management, API keys
- **Test**:
  - Modify security settings
  - Manage users
  - Configure notifications

## 📊 Mock Data Structure

### Endpoints (3 devices)
- Desktop: Windows 11 (Online)
- Laptop: macOS (Warning - 2 threats)
- Server: Ubuntu (Online)

### Threats (2 active)
- Critical: Trojan.Win32.GenKrypt
- High: Phishing Email Detection

### Analytics
- Security Score: 94%
- Threat Detection Rate: 98.7%
- MTTR: 2.1 hours
- Compliance: 87%

## 🔧 Advanced Configuration

### Custom IP Address
```bash
# Edit .env.lab file
APP_URL=http://YOUR_IP:3001
API_URL=http://YOUR_IP:3000
```

### Add More Mock Data
Edit `laboratory/mock-backend/mock-data.json`:
```json
{
  "endpoints": [
    {
      "id": 4,
      "name": "NEW-DEVICE",
      "type": "laptop",
      "status": "online"
    }
  ]
}
```

### Enable Debug Mode
```bash
# In .env.lab
LOG_LEVEL=debug
ENABLE_DEBUG_ROUTES=true
```

## 🛠️ Management Commands

### View Logs
```bash
docker-compose -f docker-compose.lab.yml logs -f
```

### Restart Services
```bash
docker-compose -f docker-compose.lab.yml restart
```

### Update Frontend
```bash
cd frontend
npm run build
docker-compose -f docker-compose.lab.yml restart frontend
```

### Reset Database
```bash
docker-compose -f docker-compose.lab.yml down -v
docker-compose -f docker-compose.lab.yml up -d
```

## 🧪 Testing Checklist

### Functional Testing
- [ ] Dashboard loads with all widgets
- [ ] Navigation between pages works
- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] Responsive design on mobile/tablet
- [ ] Real-time updates simulate correctly

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Smooth animations and transitions
- [ ] No memory leaks during long usage
- [ ] Charts render without lag

### UI/UX Testing
- [ ] Cybersecurity theme consistent
- [ ] Dark mode styling correct
- [ ] Glassmorphism effects working
- [ ] Icons and colors match design
- [ ] Typography readable
- [ ] Accessibility features work

### Data Testing
- [ ] Mock data displays correctly
- [ ] Statistics calculate properly
- [ ] Charts show accurate data
- [ ] Filtering works with data
- [ ] Search returns correct results

## 🐛 Troubleshooting

### Services Won't Start
```bash
# Check Docker daemon
sudo systemctl start docker

# Check ports availability
netstat -tulpn | grep :3001
```

### Frontend Build Fails
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Connection Issues
```bash
# Check database logs
docker-compose -f docker-compose.lab.yml logs database

# Reset database
docker-compose -f docker-compose.lab.yml down database
docker volume rm aktibguard-postgres-lab-data
docker-compose -f docker-compose.lab.yml up -d database
```

### Can't Access from Other Machines
```bash
# Check firewall
sudo ufw allow 3001
sudo ufw allow 3000

# Update IP in config
sed -i 's/localhost/0.0.0.0/g' .env.lab
```

## 📈 Performance Metrics

### Expected Performance
- **Load Time**: < 3 seconds
- **Memory Usage**: < 512MB
- **CPU Usage**: < 10%
- **Network Traffic**: < 1MB/min

### Monitoring
Access metrics at:
- Container stats: `docker stats`
- Application logs: Service logs in Docker
- Network activity: Browser DevTools

## 📞 Support

### Issues & Questions
1. Check this documentation
2. Review Docker logs
3. Verify system requirements
4. Check network connectivity

### Common Solutions
- **Port conflicts**: Change ports in docker-compose.lab.yml
- **Permission issues**: Run with sudo or add user to docker group
- **Memory issues**: Increase Docker memory allocation
- **Network issues**: Check firewall and IP configuration

## 🎯 Next Steps

After successful testing:
1. Document findings and feedback
2. Prepare for production deployment
3. Plan backend integration
4. Schedule user acceptance testing
5. Prepare training materials

---

**AktibGuard Laboratory Environment v1.1.0**  
*Cybersecurity Platform for SMEs*