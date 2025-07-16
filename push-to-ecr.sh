#!/bin/bash

# Script to push frontend and backend Docker images to ECR
# Usage: ./push-to-ecr.sh <environment> [service]
# Example: ./push-to-ecr.sh production
# Example: ./push-to-ecr.sh testing backend

set -e

# Configuration
AWS_PROFILE="gpt2-devjobs-profile"
PRIMARY_REGION="eu-central-1"
SECONDARY_REGION="eu-west-1"
ACCOUNT_ID="039612855997"

# Parse arguments
ENVIRONMENT=${1:-production}
SERVICE=${2:-all}

# Validate environment
case $ENVIRONMENT in
  production|testing)
    REGION=$PRIMARY_REGION
    ;;
  secondary)
    REGION=$SECONDARY_REGION
    ;;
  *)
    echo "Error: Invalid environment. Use: production, secondary, or testing"
    exit 1
    ;;
esac

echo "🚀 Pushing Docker images to ECR for $ENVIRONMENT environment"
echo "Region: $REGION"

# Login to ECR
echo "🔐 Logging in to ECR..."
aws ecr get-login-password --region $REGION --profile $AWS_PROFILE | \
  docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Function to push image
push_image() {
  local service=$1
  local dockerfile_path=$2
  local ecr_repo=$3
  
  echo "📦 Building and pushing $service image..."
  
  # Build image
  docker build -t $service:latest $dockerfile_path
  
  # Tag for ECR
  docker tag $service:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ecr_repo:latest
  
  # Push to ECR
  docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ecr_repo:latest
  
  echo "✅ Successfully pushed $service image"
}

# Set ECR repository names based on environment
case $ENVIRONMENT in
  production)
    BACKEND_REPO="gtp2-devjobs-backend"
    FRONTEND_REPO="gtp2-devjobs-frontend"
    ;;
  secondary)
    BACKEND_REPO="gtp2-devjobs-backend-secondary"
    FRONTEND_REPO="gtp2-devjobs-frontend-secondary"
    ;;
  testing)
    BACKEND_REPO="gtp2-devjobs-backend-testing"
    FRONTEND_REPO="gtp2-devjobs-frontend-testing"
    ;;
esac

# Push images based on service parameter
if [[ $SERVICE == "all" || $SERVICE == "backend" ]]; then
  push_image "backend" "../" $BACKEND_REPO
fi

if [[ $SERVICE == "all" || $SERVICE == "frontend" ]]; then
  push_image "frontend" "." $FRONTEND_REPO
fi

echo "🎉 All images pushed successfully to $ENVIRONMENT environment!"
echo "📍 ECR URLs:"
if [[ $SERVICE == "all" || $SERVICE == "backend" ]]; then
  echo "Backend: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$BACKEND_REPO:latest"
fi
if [[ $SERVICE == "all" || $SERVICE == "frontend" ]]; then
  echo "Frontend: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$FRONTEND_REPO:latest"
fi
