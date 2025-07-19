# DevJobs Frontend - CI/CD Documentation for Developers

## Overview

This document explains the technical details of the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the DevJobs Frontend application.

## 🔄 CI/CD Workflow Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Git Push   │────▶│GitHub Actions│────▶│Docker Build │────▶│ Amazon ECR  │────▶│ Amazon ECS  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                          │                                                            │
                          ▼                                                            ▼
                    ┌─────────────┐                                             ┌─────────────┐
                    │  Run Tests  │                                             │  Monitoring │
                    └─────────────┘                                             └─────────────┘
```

### Workflow Stages

1. **Code Changes**: Developer commits and pushes code
2. **Automated Tests**: Code is tested automatically
3. **Docker Build**: Application is packaged into a Docker container
4. **Container Registry**: Container is stored in Amazon ECR
5. **Deployment**: Container is deployed to Amazon ECS
6. **Monitoring**: Application health is monitored

## 📁 Repository Structure

The CI/CD configuration is defined in the following files:

- `.github/workflows/frontend-dev.yml` - Main workflow file
- `.github/workflows/deploy-test-and-notify-for-dev.yml` - Testing workflow
- `.github/workflows/deploy-build-and-push-for-dev.yml` - Docker build workflow
- `.github/workflows/deploy-ecs-for-dev.yml` - ECS deployment workflow

## 🌿 Branch Strategy

| Branch | Purpose | Auto-Deploy | Environment |
|--------|---------|------------|------------|
| `feature/*` | Feature development | No | Local only |
| `feature/devops` | DevOps changes | Yes | Development |
| `development` | Integration testing | Yes | Development |
| `testing` | QA testing | Yes | Testing |
| `main` | Production code | No | Production (manual) |

## 🚀 Workflow Details

### 1. Test Stage

```yaml
test:
  name: Run Tests and Notify
  uses: ./.github/workflows/deploy-test-and-notify-for-dev.yml
  secrets:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
    SLACK_CHANNEL_ID: ${{ secrets.SLACK_CHANNEL_ID }}
```

- Runs unit tests
- Notifies Slack channel of test results
- Fails the pipeline if tests fail

### 2. Build Stage

```yaml
build:
  name: Build & Push Docker Image
  needs: test
  uses: ./.github/workflows/deploy-build-and-push-for-dev.yml
  secrets:
    AWS_REGION: ${{ secrets.AWS_REGION }}
    AWS_ROLE_TO_ASSUME: ${{ secrets.AWS_ROLE_TO_ASSUME }}
    ECR_REPO: ${{ secrets.ECR_REPO }}
    EXECUTION_ROLE_ARN: ${{ secrets.EXECUTION_ROLE_ARN }}
    NG_APP_BASE_URL: ${{ secrets.NG_APP_BASE_URL }}
```

- Creates environment files with API URL
- Builds the Angular application
- Creates Docker image
- Pushes to Amazon ECR

### 3. Deploy Stage

```yaml
deploy:
  name: Deploy to ECS (Dev)
  needs: build
  uses: ./.github/workflows/deploy-ecs-for-dev.yml
  secrets:
    AWS_REGION: ${{ secrets.AWS_REGION }}
    AWS_ROLE_TO_ASSUME: ${{ secrets.AWS_ROLE_TO_ASSUME }}
    ECS_CLUSTER: ${{ secrets.ECS_CLUSTER }}
    ECS_SERVICE: ${{ secrets.ECS_SERVICE }}
    # Additional secrets...
```

- Updates ECS task definition
- Deploys new container to ECS
- Performs health checks

## 🔑 Required Secrets

| Secret Name | Purpose | Where to Set |
|-------------|---------|-------------|
| `AWS_ROLE_TO_ASSUME` | IAM role ARN for GitHub Actions | GitHub repository settings |
| `AWS_REGION` | AWS region for deployment | GitHub repository settings |
| `ECR_REPO` | ECR repository name | GitHub repository settings |
| `EXECUTION_ROLE_ARN` | ECS task execution role | GitHub repository settings |
| `NG_APP_BASE_URL` | Backend API URL | GitHub repository settings |
| `ECS_CLUSTER` | ECS cluster name | GitHub repository settings |
| `ECS_SERVICE` | ECS service name | GitHub repository settings |
| `TASK_FAMILY` | ECS task definition family | GitHub repository settings |
| `CONTAINER_NAME` | Container name in task definition | GitHub repository settings |
| `CONTAINER_PORT` | Container port mapping | GitHub repository settings |

## 🧪 Testing Strategy

| Test Type | When | Where | How |
|-----------|------|-------|-----|
| Unit Tests | Pre-commit | Local & CI | `npm test` |
| Integration Tests | CI Pipeline | GitHub Actions | Automated |
| E2E Tests | CI Pipeline | GitHub Actions | Automated |

## 🧪 Testing Locally

Before pushing code, test the build process locally:

```bash
# Run tests
cd frontend
npm test

# Build Docker image
docker build -t devjobs-frontend .

# Run container locally
docker run -d -p 1111:80 --name devjobs devjobs-frontend

# Test application
curl http://localhost:1111
```

## 🔍 Debugging Failed Pipelines

1. **GitHub Actions Logs**:
   - Go to repository → Actions tab → Failed workflow → Job logs

2. **Docker Build Issues**:
   - Check for syntax errors in Dockerfile
   - Verify environment variables are set correctly
   - Check for network connectivity issues during build

3. **AWS Deployment Issues**:
   - Verify IAM permissions
   - Check ECS service logs in CloudWatch
   - Verify task definition is valid

4. **Common Errors**:
   - `Error: No such file or directory`: Check file paths in workflow
   - `Error: Cannot find module`: Check npm dependencies
   - `Error: The security token included in the request is invalid`: Check AWS credentials

## 🔄 Manual Deployment

If automatic deployment fails, you can deploy manually:

```bash
# Update ECS service
./update-ecs-service.sh testing frontend

# Force new deployment
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service $ECS_SERVICE \
  --force-new-deployment \
  --region $AWS_REGION
```

## 🔧 Infrastructure

### AWS Services Used

- **Amazon ECR**: Container registry for Docker images
- **Amazon ECS**: Container orchestration service
- **AWS IAM**: Identity and access management
- **AWS CloudWatch**: Monitoring and logging
- **AWS Application Load Balancer**: Traffic distribution

### Environment Configuration

| Environment | AWS Region | Scaling | Notes |
|-------------|------------|---------|-------|
| Development | eu-central-1 | 1 instance | For development team |
| Testing | eu-central-1 | 1-2 instances | For QA team |
| Production | eu-central-1 | 2-5 instances | Auto-scaling based on load |
| DR (Disaster Recovery) | eu-west-1 | 2-5 instances | Activated if primary region fails |

## 🔐 Security Best Practices

- Never commit secrets to the repository
- Use GitHub repository secrets for sensitive values
- Use IAM roles with least privilege
- Regularly rotate credentials
- Scan Docker images for vulnerabilities

### Security Implementation

- **Secrets Management**: AWS Secrets Manager & GitHub Secrets
- **IAM Roles**: Least privilege principle
- **Network Security**: Private subnets, security groups
- **Scanning**: Container vulnerability scanning

## 📝 Audit & Compliance

- **Deployment Logs**: Retained for 90 days
- **Access Logs**: Retained for 1 year
- **Change Management**: All changes tracked in Git
- **Approvals**: Production deployments require approval

## 📚 References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Docker Documentation](https://docs.docker.com/)
- [Angular Build Documentation](https://angular.io/guide/build)