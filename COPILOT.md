# AWS Copilot Deployment Guide

## Quick Start

### 1. Install Copilot CLI
```bash
# macOS/Linux
curl -Lo copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-$(uname -s | tr '[:upper:]' '[:lower:]') && chmod +x copilot && sudo mv copilot /usr/local/bin
```

### 2. Deploy with One Command
```bash
./copilot-setup.sh
```

## Manual Deployment Steps

### Initialize Application
```bash
# In your project root
copilot app init devjobs
```

### Create Service
```bash
copilot svc init --name frontend --svc-type "Load Balanced Web Service"
```

### Deploy Environments
```bash
# Staging
copilot env init --name staging
copilot env deploy --name staging

# Production
copilot env init --name production
copilot env deploy --name production
```

### Deploy Service
```bash
# Deploy to staging
copilot svc deploy --name frontend --env staging

# Deploy to production
copilot svc deploy --name frontend --env production
```

## Configuration Overview

### Service Configuration (`copilot/frontend/copilot.yml`)
- **Type**: Load Balanced Web Service
- **Resources**: 256 CPU, 512 MB memory
- **Auto-scaling**: 1-10 instances based on CPU/memory
- **Health check**: HTTP GET on `/`
- **Public placement**: Internet-facing ALB

### Environment Configurations
- **Staging**: 50% spot instances, debug logging
- **Production**: On-demand instances, minimal logging

## Useful Commands

### Monitoring
```bash
# View service status
copilot svc status --name frontend --env staging

# View logs
copilot svc logs --name frontend --env staging --follow

# View service URL
copilot svc show --name frontend --env staging
```

### Updates
```bash
# Deploy code changes
copilot svc deploy --name frontend --env staging

# Update environment
copilot env deploy --name staging
```

### Cleanup
```bash
# Delete service
copilot svc delete --name frontend --env staging

# Delete environment
copilot env delete --name staging

# Delete application
copilot app delete devjobs
```

## Cost Optimization

### Staging Environment
- Uses 50% spot instances
- Single instance minimum
- Aggressive auto-scaling

### Production Environment
- On-demand instances for reliability
- Higher minimum instance count
- Conservative scaling policies

## Security Features
- VPC with public/private subnets
- Application Load Balancer with health checks
- CloudWatch logging enabled
- IAM roles with least privilege
- Optional SSL/TLS termination

## Monitoring & Observability
- CloudWatch metrics and alarms
- Application Load Balancer access logs
- Container insights
- X-Ray tracing (optional)

## Custom Domain Setup
1. Add certificate ARN to environment config
2. Update ALB listener for HTTPS
3. Configure Route 53 DNS records

## Environment Variables
Add to `copilot/frontend/copilot.yml`:
```yaml
variables:
  API_URL: https://api.devjobs.com
  NODE_ENV: production

secrets:
  DATABASE_URL:
    from_cfn_output: DatabaseEndpoint
```