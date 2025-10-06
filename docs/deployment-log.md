# Deployment Log

## 2025-10-06 - First S3 Deployment

### Stack Details

- **Stack Name:** habit-tracker-frontend-dev
- **Region:** us-east-1
- **Bucket Name:** habit-tracker-dev-026008176803
- **Website URL:** http://habit-tracker-dev-026008176803.s3-website-us-east-1.amazonaws.com

### Deployment Steps

1. Built React app: `npm run build`
2. Deployed via CloudFormation template
3. Synced build files to S3

### What Works

✅ Static website loads
✅ CSS and styling work
✅ React router navigation (if using BrowserRouter, may need fixes)

### Known Issues

❌ Backend API not connected (Week 2 task)
❌ Login/signup returns errors (expected - no backend)
❌ 404 on page refresh (need CloudFront with SPA routing - Week 1 task)

### Commands Used

```bash
# Deploy stack
aws cloudformation create-stack \
  --stack-name habit-tracker-frontend-dev \
  --template-body file://infrastructure/cloudformation/01-s3-static-website.yaml

# Sync files
aws s3 sync ./frontend/build/ s3://habit-tracker-dev-[ID]/
```
