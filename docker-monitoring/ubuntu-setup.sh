#!/bin/bash

# Ubuntu setup script for Docker-based Prometheus and Grafana monitoring

echo "🚀 Setting up Docker monitoring stack for DevJobs Frontend on Ubuntu"

# Update system
sudo apt update && sudo apt upgrade -y

# Install prerequisites
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common awscli

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Add user to docker group
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create directories if they don't exist
mkdir -p prometheus cloudwatch-exporter grafana/provisioning/datasources grafana/dashboards

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Start the monitoring stack
docker-compose up -d

# Get public IP
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)

echo "✅ Setup complete!"
echo "🔍 Prometheus: http://${PUBLIC_IP}:9090"
echo "📊 Grafana: http://${PUBLIC_IP}:3000 (login: admin/admin)"
echo ""
echo "⚠️ Important: Make sure your EC2 security group allows:"
echo "   - Port 9090 (Prometheus)"
echo "   - Port 3000 (Grafana)"
echo "   - Port 22 (SSH)"