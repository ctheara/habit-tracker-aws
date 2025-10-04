# Habit Tracker - AWS Migration Project

> Migrating a full-stack habit tracking application to AWS serverless architecture

## 🎯 Project Goals

- Learn AWS services hands-on (S3, Lambda, API Gateway, RDS, Cognito, etc.)
- Migrate existing Node.js/React application to serverless
- Implement Infrastructure as Code with CloudFormation
- Build a resume-worthy cloud architecture project

## 📊 Current Architecture

**Tech Stack:**

- Frontend: React 19 + Material-UI (Currently on Vercel)
- Backend: Node.js/Express + TypeScript (Currently on Render)
- Database: PostgreSQL
- Auth: JWT with httpOnly cookies

## 🎯 Target AWS Architecture

**Target Stack:**

- Frontend: S3 + CloudFront + Route 53
- Backend: API Gateway + Lambda (Node.js)
- Database: RDS PostgreSQL or Aurora Serverless
- Auth: AWS Cognito or Lambda Authorizer
- Caching: DynamoDB + ElastiCache
- Monitoring: CloudWatch
- CI/CD: CodePipeline + CodeBuild

## 📅 Migration Timeline

- **Week 1:** Foundation & Frontend (S3 + CloudFront)
- **Week 2:** Backend Migration (Lambda + API Gateway + RDS)
- **Week 3:** Advanced Features (Cognito, DynamoDB, SQS)
- **Week 4:** CI/CD & Documentation

## 📁 Project Structure

```bash
├── docs/                   # Documentation and notes
├── infrastructure/         # CloudFormation templates
│   ├── cloudformation/     # IaC templates
│   └── diagrams/           # Architecture diagrams
├── frontend/               # React application
└── backend/                # Backend
└── lambda-functions/       # Lambda functions
```

## 🔗 Links

- **Original App Frontend:** https://habit-tracker-fawn-omega.vercel.app
- **Original App Backend:** https://habit-tracker-nyif.onrender.com/
- **Original API Docs:** https://habit-tracker-nyif.onrender.com/api-docs

## ⚠️ Cost Management

This project is designed to stay within AWS Free Tier limits:

- Billing alerts configured at $1 threshold
- Regular cost monitoring via AWS Cost Explorer
- All resources tagged for cost tracking

## 🔒 Security

- Root account MFA enabled ✅
- IAM admin user with MFA ✅
- AWS credentials never committed to Git ✅
- Following AWS Well-Architected Framework principles

## 📈 Progress

- [x] AWS account setup
- [x] IAM user creation with MFA
- [x] AWS CLI configuration
- [x] Project structure created
- [x] Documentation initialized
- [ ] Frontend deployed to S3
- [ ] CloudFront distribution configured
- [ ] Backend Lambda functions created
- [ ] API Gateway configured
- [ ] Database migration completed
