#!/bin/bash

echo "🌍 Setting AWS region to eu-west-1 for Copilot deployment"

# Set environment variables
export AWS_DEFAULT_REGION=eu-west-1
export AWS_REGION=eu-west-1

# Configure AWS CLI default region
aws configure set default.region eu-west-1

echo "✅ AWS region set to eu-west-1 (Ireland)"
echo "📍 All Copilot resources will be deployed in Europe"

# Verify region setting
echo "🔍 Current AWS region: $(aws configure get region)"