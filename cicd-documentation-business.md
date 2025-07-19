# DevJobs Frontend - CI/CD Guide for Product Owners & Clients

## Overview

This document explains how our automated deployment system works in non-technical terms, focusing on what you need to know as a Product Owner or client.

## 🔄 What is CI/CD?

**CI/CD** stands for Continuous Integration and Continuous Deployment. In simple terms:

- **Continuous Integration**: Automatically testing code changes
- **Continuous Deployment**: Automatically deploying tested code to our environments

This means faster delivery of features and bug fixes with higher quality and reliability.

## 🔄 CI/CD Workflow

```
Code Changes → Automated Tests → Build Container → Store in Registry → Deploy to Cloud → Monitor
    ↓              ↓                ↓               ↓                  ↓               ↓
Developers    Quality Check    Package App     Save for Reuse     Make Available    Watch Health
```

### Workflow Stages

1. **Code Changes**: Developer commits and pushes code
2. **Automated Tests**: Code is tested automatically
3. **Docker Build**: Application is packaged into a Docker container
4. **Container Registry**: Container is stored in Amazon ECR
5. **Deployment**: Container is deployed to Amazon ECS
6. **Monitoring**: Application health is monitored

## 🌐 Our Environments

We maintain three separate environments for the application:

| Environment | URL                                                                                              | Purpose                            | Update Frequency       |
| ----------- | ------------------------------------------------------------------------------------------------ | ---------------------------------- | ---------------------- |
| Development | [https://dev.devjobs.example.com](gtp2-fe-primary-alb-648048185.eu-central-1.elb.amazonaws.com)  | Latest features, may be unstable   | Multiple times per day |
| Testing     | [https://test.devjobs.example.com](gtp2-fe-testing-alb-512036373.eu-central-1.elb.amazonaws.com) | For QA and user acceptance testing | As needed for testing  |
| Production  | [https://devjobs.example.com](in-progress)                                                       | Live customer-facing site          | Scheduled releases     |

## 📱 Feature Delivery Process

```
Development → Testing → Review → Approval → Deployment → Verification
    ↓          ↓        ↓        ↓          ↓           ↓
  Coding    Quality    Your     Your      Live      Confirm
           Checks    Preview  Decision   Release    Success
```

1. **Development**: Developers build new features
2. **Automated Testing**: Our system runs tests automatically
3. **Development Environment**: Features appear here first
4. **QA Testing**: Quality assurance team tests in the Testing environment
5. **Approval**: You review and approve the changes
6. **Production Release**: Features go live to users

## 🔍 How to Preview New Features

To see new features before they go live:

1. **Development Environment**: Contains the latest features, but may be unstable
2. **Testing Environment**: More stable, contains features ready for review

Simply visit the environment URL in your browser to preview the application.

## ✅ Release Approval Process

Before changes go to production:

1. **Release Notification**: You'll receive an email about ready-to-release features
2. **Review Period**: You have time to review features in the Testing environment
3. **Approval**: You provide explicit approval (via email or project management tool)
4. **Scheduling**: We schedule the production deployment
5. **Deployment**: Changes are deployed to production
6. **Verification**: We verify everything works correctly

## 📊 Monitoring & Status

- **Uptime**: We maintain 99.9% uptime for the production environment
- **Performance**: Page load times are monitored and kept under 2 seconds
- **Monitoring Dashboard**: [AWS CloudWatch Dashboard](*in-progress)

## 🔗 API Configuration

- The frontend application connects to the backend API using a configuration value called `NG_APP_BASE_URL`
- This value is set during the build process and cannot be changed after deployment
- Each environment (Development, Testing, Production) uses a different API URL
- If the backend API location changes, a new deployment of the frontend is required

## 🔄 Rollback Capability

If issues occur after deployment:

- We can revert to the previous working version within 15 minutes
- This minimizes any potential downtime or user impact
- The decision to rollback is made based on predefined criteria

## 📅 Release Schedule

- **Regular Releases**: Every two weeks (sprint cadence)
- **Hotfixes**: As needed for critical issues
- **Maintenance Windows**: Scheduled during low-traffic periods

## 🔔 Communication Channels

| Event                           | Communication Method   | Timeline                    |
| ------------------------------- | ---------------------- | --------------------------- |
| New features in Development     | Weekly email digest    | Every Friday                |
| Features ready for testing      | Email notification     | As features are ready       |
| Production deployment scheduled | Calendar invite        | 48 hours notice             |
| Deployment complete             | Email notification     | Within 1 hour of completion |
| Issues detected                 | Immediate notification | As detected                 |

## 📝 Release Notes

For each production release, you'll receive:

- List of new features
- Bug fixes included
- Known issues
- Screenshots of UI changes
- Link to Testing environment for preview

## 🆘 Support & Escalation

| Issue                      | Contact                     | Response Time    |
| -------------------------- | --------------------------- | ---------------- |
| Production issues          | support@devjobs.example.com | < 1 hour         |
| Testing environment issues | qa@devjobs.example.com      | < 4 hours        |
| Feature questions          | pm@devjobs.example.com      | < 1 business day |
| Pipeline Failure           | DevOps Team                 | < 2 hours        |
| Production Outage          | On-call Engineer            | < 15 minutes     |

## 📊 Deployment Metrics

We track the following metrics for continuous improvement:

- Deployment frequency
- Lead time (from code commit to production)
- Change failure rate
- Mean time to recovery

These metrics are shared in monthly reports to track our delivery performance.

## 📚 Glossary

- **Deployment**: The process of making the application available to users
- **Environment**: A separate instance of the application (Development, Testing, Production)
- **Build**: The process of creating the deployable application package
- **Release**: A specific version of the application deployed to production
- **Rollback**: Reverting to a previous working version
