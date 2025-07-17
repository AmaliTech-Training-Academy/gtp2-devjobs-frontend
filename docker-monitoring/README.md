# Docker-based Monitoring for DevJobs Frontend

This setup provides Prometheus and Grafana in Docker containers to monitor your DevJobs frontend application deployed on ECS.

## Quick Start

### 1. Launch an EC2 Instance

1. Go to AWS Console > EC2 > Launch Instance
2. Choose Amazon Linux 2023
3. Select t3.small (or larger)
4. Configure security group to allow:
   - SSH (port 22)
   - Prometheus (port 9090)
   - Grafana (port 3000)
5. Launch and connect to your instance

### 2. Install Docker and Docker Compose

```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and log back in for group changes to take effect
exit
# Reconnect to your instance
```

### 3. Set Up AWS Credentials

```bash
# Configure AWS CLI
aws configure
# Enter your AWS Access Key, Secret Key, and region (eu-west-1)
```

### 4. Copy Monitoring Files to EC2

```bash
# From your local machine
scp -r docker-monitoring ec2-user@YOUR_EC2_IP:~/
```

### 5. Start Monitoring Stack

```bash
cd ~/docker-monitoring
docker-compose up -d
```

### 6. Access Monitoring Dashboards

- Prometheus: http://YOUR_EC2_IP:9090
- Grafana: http://YOUR_EC2_IP:3000 (login: admin/admin)

## Monitoring ECS Service Connect

### Service Connect Metrics

The CloudWatch exporter is configured to collect these Service Connect metrics:

- `ServiceConnectRequestCount`: Number of requests processed
- `ServiceConnectRequestLatency`: Time taken to process requests

### Importing Dashboards

1. In Grafana, go to Dashboards > Import
2. Upload the JSON file from `grafana/dashboards/devjobs-dashboard.json`
3. Select the Prometheus data source

## Troubleshooting

### No Data in Prometheus

1. Check EC2 IAM role has permissions:
   - CloudWatchReadOnlyAccess
   - AmazonEC2ReadOnlyAccess
   - AmazonECS-FullAccess

2. Verify Prometheus configuration:
   ```bash
   docker-compose exec prometheus promtool check config /etc/prometheus/prometheus.yml
   ```

3. Check CloudWatch exporter logs:
   ```bash
   docker-compose logs cloudwatch-exporter
   ```

### Grafana Can't Connect to Prometheus

1. Check Prometheus is running:
   ```bash
   docker-compose ps prometheus
   ```

2. Verify network connectivity:
   ```bash
   docker-compose exec grafana wget -O- http://prometheus:9090/api/v1/status/config
   ```