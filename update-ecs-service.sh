#!/bin/bash

# Script to force ECS service update after pushing new images
# Usage: ./update-ecs-service.sh <environment> [service]

set -e

AWS_PROFILE="gpt2-devjobs-profile"
PRIMARY_REGION="eu-central-1"
SECONDARY_REGION="eu-west-1"

ENVIRONMENT=${1:-production}
SERVICE=${2:-all}

case $ENVIRONMENT in
  production|testing)
    REGION=$PRIMARY_REGION
    ;;
  secondary)
    REGION=$SECONDARY_REGION
    ;;
  *)
    echo "Error: Invalid environment"
    exit 1
    ;;
esac

echo "🔄 Updating ECS services in $ENVIRONMENT environment..."

update_service() {
  local cluster=$1
  local service=$2
  
  echo "Updating $service in cluster $cluster..."
  aws ecs update-service \
    --cluster $cluster \
    --service $service \
    --force-new-deployment \
    --region $REGION \
    --profile $AWS_PROFILE
}

# Update services based on environment
case $ENVIRONMENT in
  production)
    if [[ $SERVICE == "all" || $SERVICE == "backend" ]]; then
      update_service "backend-primary-cluster" "backend-primary"
    fi
    if [[ $SERVICE == "all" || $SERVICE == "frontend" ]]; then
      update_service "frontend-primary-cluster" "frontend-primary"
    fi
    ;;
  secondary)
    if [[ $SERVICE == "all" || $SERVICE == "backend" ]]; then
      update_service "backend-secondary-cluster" "backend-secondary"
    fi
    if [[ $SERVICE == "all" || $SERVICE == "frontend" ]]; then
      update_service "frontend-secondary-cluster" "frontend-secondary"
    fi
    ;;
  testing)
    if [[ $SERVICE == "all" || $SERVICE == "backend" ]]; then
      update_service "backend-testing-cluster" "backend-testing"
    fi
    if [[ $SERVICE == "all" || $SERVICE == "frontend" ]]; then
      update_service "frontend-testing-cluster" "frontend-testing"
    fi
    ;;
esac

echo "✅ ECS services updated successfully!"