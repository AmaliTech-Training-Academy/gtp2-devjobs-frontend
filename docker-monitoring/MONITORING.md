# DevJobs Frontend Monitoring Guide

This guide explains how to monitor your DevJobs frontend application deployed on ECS, with special focus on the Service Connect container.

## Overview

We use a Docker-based monitoring stack running on EC2 that includes:

- **Prometheus**: For metrics collection and storage
- **CloudWatch Exporter**: To pull AWS metrics into Prometheus
- **Grafana**: For visualization and alerting

## Quick Setup

### 1. Launch EC2 Instance

1. Go to AWS Console > EC2 > Launch Instance
2. Choose Ubuntu Server 22.04 LTS
3. Select t3.small (or larger)
4. Create an IAM role with the permissions in `docker-monitoring/iam-policy.json`
5. Configure security group to allow:
   - SSH (port 22)
   - Prometheus (port 9090)
   - Grafana (port 3000)

### 2. Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install prerequisites
Use docker documentation (`it keeps changing`)

# Log out and log back in
exit
# Reconnect to your instance
```

### 3. Deploy Monitoring Stack

```bash
# Copy the docker-monitoring directory to EC2
scp -r docker-monitoring ubuntu@YOUR_EC2_IP:~/
[rsync works fine]

# SSH to your instance
ssh ubuntu@YOUR_EC2_IP

# Start the monitoring stack
cd docker-monitoring
docker-compose up -d
```

### 4. Access Dashboards

- **Prometheus**: http://YOUR_EC2_IP:9090
- **Grafana**: http://YOUR_EC2_IP:3000 (login: admin/admin)

## Monitoring Service Connect

The monitoring stack includes a specialized dashboard for ECS Service Connect metrics:

1. In Grafana, go to Dashboards > Import
2. Upload `docker-monitoring/grafana/dashboards/service-connect-dashboard.json`
3. Select the Prometheus data source

### Key Service Connect Metrics

- **Request Count**: Number of requests processed by the Service Connect proxy
- **Request Latency**: Time taken to process requests
- **CPU & Memory**: Resource usage of both your app and Service Connect containers

## Troubleshooting

### No Data in Prometheus

1. Check EC2 IAM role has the correct permissions
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

## Cleanup

To stop and remove the monitoring stack:

```bash
cd ~/docker-monitoring
docker-compose down -v
```
