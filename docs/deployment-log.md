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

---

## 2025-10-06 - CloudFront + HTTPS Deployment

### Stack Details

- **Stack Name:** habit-tracker-frontend-dev
- **Region:** us-east-1
- **Bucket Name:** habit-tracker-dev-026008176803 (now PRIVATE)
- **CloudFront URL:** https://[YOUR-DIST-ID].cloudfront.net
- **S3 URL:** ~~(deprecated - use CloudFront)~~

### What Changed

- ✅ Added CloudFront distribution
- ✅ Enabled HTTPS (free SSL certificate)
- ✅ Made S3 bucket private (accessed via CloudFront only)
- ✅ Fixed React Router 404 issues with custom error responses
- ✅ Enabled gzip compression
- ✅ Set up proper caching (24h default TTL)

### Deployment Steps

1. Updated CloudFormation template with CloudFront configuration
2. Ran `aws cloudformation update-stack` (took 15 minutes)
3. Re-uploaded build files to S3
4. Created cache invalidation
5. Tested HTTPS URL

### What Works Now

✅ HTTPS enabled (secure connection)
✅ React Router works on page refresh
✅ Faster page loads (CDN caching)
✅ Gzip compression reduces bandwidth
✅ Global edge locations for better performance

### Known Issues

❌ Backend API not connected (Week 2 task)
❌ Login/signup returns errors (expected - no backend)
❌ Custom domain not configured (optional)

### Commands Used

```bash
# Update stack
aws cloudformation update-stack \
  --stack-name habit-tracker-frontend-dev \
  --template-body file://infrastructure/cloudformation/01-s3-static-website.yaml

# Deploy files
aws s3 sync ./frontend/build/ s3://BUCKET-NAME/

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id DIST-ID \
  --paths "/*"
```
