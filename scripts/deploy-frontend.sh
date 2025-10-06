#!/bin/bash
set -e

echo "🚀 Deploying Habit Tracker Frontend to AWS..."

STACK_NAME="habit-tracker-frontend-dev"

# Get bucket name from CloudFormation
echo "📦 Getting bucket name from CloudFormation..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
  --output text)

if [ -z "$BUCKET_NAME" ]; then
    echo "❌ Error: Could not get bucket name from CloudFormation"
    echo "💡 Make sure stack '$STACK_NAME' exists"
    exit 1
fi

echo "📦 Bucket: $BUCKET_NAME"

# Check if build directory exists
if [ ! -d "frontend/build" ]; then
    echo "❌ Error: frontend/build directory not found"
    echo "💡 Build your React app first:"
    echo "   cd ../habit-tracker/frontend"
    echo "   npm run build"
    echo "   cp -r build ~/habit-tracker-aws/frontend/"
    exit 1
fi

# Sync to S3
echo "📤 Syncing files to S3..."
aws s3 sync ./frontend/build/ s3://$BUCKET_NAME/ --delete

# Get CloudFront distribution ID
echo "🌐 Getting CloudFront distribution ID..."
DIST_ID=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
  --output text)

if [ -z "$DIST_ID" ]; then
    echo "⚠️  Warning: Could not get CloudFront distribution ID"
    echo "⚠️  Skipping cache invalidation"
else
    # Invalidate CloudFront cache
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
      --distribution-id $DIST_ID \
      --paths "/*" \
      --output json \
      | grep '"Id"' || true
    
    echo "⏳ Cache invalidation started (takes ~5 minutes)"
fi

# Get URLs
CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
  --output text)

echo ""
echo "✅ Deployment complete!"
echo "🌐 CloudFront URL: $CLOUDFRONT_URL"
echo "📝 Note: Changes may take 5-10 minutes to appear due to CDN caching"