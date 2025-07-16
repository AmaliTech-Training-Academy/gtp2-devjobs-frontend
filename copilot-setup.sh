#!/bin/bash

echo "🚀 Setting up AWS Copilot for DevJobs Frontend in eu-west-1"

# Set AWS region
export AWS_DEFAULT_REGION=eu-west-1
export AWS_REGION=eu-west-1

echo "📍 Using region: $AWS_REGION"

# Initialize Copilot application
echo "Initializing Copilot application..."
copilot app init devjobs

# Initialize Load Balanced Web Service
echo "Creating Load Balanced Web Service..."
copilot svc init --name frontend --svc-type "Load Balanced Web Service"

# Deploy to staging environment
echo "Deploying to staging in eu-west-1..."
copilot env init --name staging
copilot env deploy --name staging
copilot svc deploy --name frontend --env staging

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at the ALB endpoint in eu-west-1"
echo "📍 Region: eu-west-1 (Ireland)"