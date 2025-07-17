# DevJobs Frontend - AWS Copilot Deployment Guide

## 🚀 Quick Start

### 1. Install Copilot CLI
```bash
# macOS/Linux
curl -Lo copilot https://github.com/aws/copilot-cli/releases/latest/download/copilot-$(uname -s | tr '[:upper:]' '[:lower:]') && chmod +x copilot && sudo mv copilot /usr/local/bin

# Verify installation
copilot --version
```

### 2. Deploy with One Command
```bash
# Make script executable and run
chmod +x copilot-setup.sh
./copilot-setup.sh
```

### 3. Get Your Application URL
```bash
copilot svc show --name frontend --env staging
# Look for the "Application" URL in the output
```

## 🌐 Application Endpoints

Once deployed, your Angular job portal will be accessible at:
`https://devjobs-Publi-XXXXXXXXXX.eu-west-1.elb.amazonaws.com`

### Frontend Routes
| Endpoint | Description | Features |
|----------|-------------|----------|
| `/` | **Job Details Homepage** | Single job view, company info, apply button |
| `/login` | **User Login** | Authentication form, feature tips |
| `/register` | **User Registration** | Sign-up form with validation |
| `/seeker/dashboard` | **Job Seeker Dashboard** | Job listings, search, filters |
| `/application-form` | **Job Application Form** | Apply to specific positions |

### Sample URLs
```bash
# Homepage with job details
https://your-alb-url.amazonaws.com/

# Login page
https://your-alb-url.amazonaws.com/login

# Job seeker dashboard
https://your-alb-url.amazonaws.com/seeker/dashboard
```

## 📋 Manual Deployment Steps

### Initialize Application
```bash
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

# Production (optional)
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

## ⚙️ Configuration Overview

### Service Configuration (`copilot/frontend/copilot.yml`)
- **Type**: Load Balanced Web Service
- **Resources**: 256 CPU, 512 MB memory
- **Auto-scaling**: 1-10 instances (CPU: 70%, Memory: 80%)
- **Health check**: HTTP GET on `/` (Angular app)
- **Port**: 80 (HTTP)
- **Public placement**: Internet-facing ALB

### Environment Configurations
- **Staging**: 50% spot instances, info logging
- **Production**: On-demand instances, warn logging

### AWS Resources Created
- **Application Load Balancer** (internet-facing)
- **ECS Fargate Service** (auto-scaling)
- **VPC** with public/private subnets
- **Security Groups** (HTTP/HTTPS traffic)
- **CloudWatch Logs** and metrics
- **ECR Repository** for Docker images

## 📊 Monitoring & Management

### Check Deployment Status
```bash
# View service status and URL
copilot svc status --name frontend --env staging

# Show detailed service info
copilot svc show --name frontend --env staging

# List all services
copilot svc ls
```

### View Logs
```bash
# Follow live logs
copilot svc logs --name frontend --env staging --follow

# View recent logs
copilot svc logs --name frontend --env staging --since 1h
```

### Updates & Redeployment
```bash
# Deploy code changes
copilot svc deploy --name frontend --env staging

# Force new deployment
copilot svc deploy --name frontend --env staging --force
```

## 🧹 Complete Cleanup & Termination

### ⚠️ IMPORTANT: Termination Order
**Follow this exact order to avoid errors and ensure complete cleanup:**

### Step 1: Delete Services First
```bash
# Delete frontend service from staging
copilot svc delete --name frontend --env staging

# If you deployed to production
copilot svc delete --name frontend --env production

# Confirm deletion when prompted
```

### Step 2: Delete Environments
```bash
# Delete staging environment
copilot env delete --name staging

# Delete production environment (if created)
copilot env delete --name production

# Confirm deletion when prompted
```

### Step 3: Delete Application
```bash
# Delete the entire application
copilot app delete devjobs

# Confirm deletion when prompted
```

### Step 4: Verify Cleanup
```bash
# Check no applications remain
copilot app ls

# Should return empty or "No applications found"
```

### Manual AWS Console Cleanup (if needed)
If automated cleanup fails, manually delete:
1. **ECS Services** in ECS console
2. **Load Balancers** in EC2 console
3. **CloudFormation Stacks** starting with "devjobs-"
4. **ECR Repository** named "devjobs/frontend"

### Cost Verification
```bash
# Check AWS billing dashboard
# Ensure no running ECS services
# Verify Load Balancers are deleted
```

## 💰 Cost Optimization

### Staging Environment
- **Spot instances**: 50% cost savings
- **Min instances**: 1 (scales to 0 when idle)
- **Aggressive scaling**: Quick scale-down

### Production Environment
- **On-demand instances**: High availability
- **Conservative scaling**: Stable performance

### Estimated Costs (eu-west-1)
- **Staging**: ~$15-30/month
- **Production**: ~$50-100/month
- **Load Balancer**: ~$16/month

## 🔒 Security Features
- **VPC**: Isolated network environment
- **Security Groups**: Restricted access (HTTP/HTTPS only)
- **IAM Roles**: Least privilege access
- **ALB**: DDoS protection and SSL termination
- **Private subnets**: Backend services isolation

## 📈 Monitoring & Observability
- **CloudWatch Metrics**: CPU, memory, request count
- **ALB Access Logs**: Request tracking
- **Container Insights**: Detailed container metrics
- **Health Checks**: Automatic failure detection

## 🌍 Custom Domain Setup (Optional)
1. **Get SSL Certificate**:
   ```bash
   aws acm request-certificate --domain-name devjobs.yourdomain.com --region eu-west-1
   ```

2. **Update Environment Config**:
   ```yaml
   network:
     cdn:
       certificate_arn: arn:aws:acm:eu-west-1:123456789:certificate/abc123
   ```

3. **Configure DNS**:
   - Point your domain to the ALB endpoint
   - Use Route 53 or your DNS provider

## 🔧 Troubleshooting

### Common Issues
```bash
# Service won't start
copilot svc logs --name frontend --env staging

# Health check failing
copilot svc status --name frontend --env staging

# Build failures
copilot svc deploy --name frontend --env staging --verbose
```

### Emergency Stop
```bash
# Scale to 0 instances (stops billing)
copilot svc deploy --name frontend --env staging --count 0

# Resume service
copilot svc deploy --name frontend --env staging --count 1
```

## 📝 Testing Checklist

### After Deployment
- [ ] Visit ALB URL and verify Angular app loads
- [ ] Test all routes: `/`, `/login`, `/register`, `/seeker/dashboard`
- [ ] Check health endpoint returns 200
- [ ] Verify auto-scaling works under load
- [ ] Monitor CloudWatch logs for errors

### Before Termination
- [ ] Export any important logs
- [ ] Document lessons learned
- [ ] Verify no persistent data to backup
- [ ] Follow termination steps in order
- [ ] Confirm all AWS resources deleted

## 🚨 Quick Emergency Commands

### Stop Everything Immediately
```bash
# Nuclear option - delete everything
copilot svc delete --name frontend --env staging --yes
copilot env delete --name staging --yes
copilot app delete devjobs --yes
```

### Scale to Zero (Stop Billing)
```bash
copilot svc deploy --name frontend --env staging --count 0
```

### Get Application URL
```bash
copilot svc show --name frontend --env staging | grep -A 5 "Application"
```