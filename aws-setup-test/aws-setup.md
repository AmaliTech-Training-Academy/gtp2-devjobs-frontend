# AWS ECS Deployment Setup

## Prerequisites
1. AWS CLI configured with appropriate permissions
2. Docker installed locally
3. An AWS account with ECS permissions

## Step-by-Step Deployment

### 1. Create ECR Repository
```bash
aws ecr create-repository --repository-name devjobs-frontend --region us-east-1
```

### 2. Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name devjobs-cluster --capacity-providers FARGATE --region us-east-1
```

### 3. Create CloudWatch Log Group
```bash
aws logs create-log-group --log-group-name /ecs/devjobs-frontend --region us-east-1
```

### 4. Create ECS Task Execution Role (if not exists)
```bash
aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}'

aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

### 5. Register Task Definition
Update `ecs-task-definition.json` with your account ID and region, then:
```bash
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json --region us-east-1
```

### 6. Create VPC and Security Groups (if needed)
```bash
# Get default VPC
VPC_ID=$(aws ec2 describe-vpcs --filters "Name=is-default,Values=true" --query 'Vpcs[0].VpcId' --output text --region us-east-1)

# Create security group
aws ec2 create-security-group --group-name devjobs-sg --description "Security group for DevJobs frontend" --vpc-id $VPC_ID --region us-east-1

# Get security group ID
SG_ID=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=devjobs-sg" --query 'SecurityGroups[0].GroupId' --output text --region us-east-1)

# Allow HTTP traffic
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0 --region us-east-1
```

### 7. Create ECS Service
```bash
# Get subnet IDs
SUBNET_IDS=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query 'Subnets[*].SubnetId' --output text --region us-east-1)

# Create service
aws ecs create-service \
  --cluster devjobs-cluster \
  --service-name devjobs-frontend-service \
  --task-definition devjobs-frontend:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_IDS],securityGroups=[$SG_ID],assignPublicIp=ENABLED}" \
  --region us-east-1
```

### 8. Deploy Application
Update `deploy.sh` with your AWS account ID and region, then run:
```bash
./deploy.sh
```

## Load Balancer Setup (Optional but Recommended)

### Create Application Load Balancer
```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name devjobs-alb \
  --subnets $SUBNET_IDS \
  --security-groups $SG_ID \
  --region us-east-1

# Create target group
aws elbv2 create-target-group \
  --name devjobs-targets \
  --protocol HTTP \
  --port 80 \
  --vpc-id $VPC_ID \
  --target-type ip \
  --health-check-path / \
  --region us-east-1

# Create listener (get ALB ARN and Target Group ARN from previous commands)
aws elbv2 create-listener \
  --load-balancer-arn <ALB_ARN> \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=<TARGET_GROUP_ARN> \
  --region us-east-1
```

## Environment Variables
If your Angular app needs environment-specific configurations, update the task definition to include environment variables:

```json
"environment": [
  {
    "name": "API_URL",
    "value": "https://your-api-endpoint.com"
  }
]
```

## Monitoring
- Check ECS service status in AWS Console
- View logs in CloudWatch: `/ecs/devjobs-frontend`
- Monitor ALB health checks and metrics

## Scaling
To scale the service:
```bash
aws ecs update-service --cluster devjobs-cluster --service devjobs-frontend-service --desired-count 3 --region us-east-1
```