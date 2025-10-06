#!/bin/bash
set -e

echo "🚀 Deploying Habit Tracker Frontend to S3..."

# Step 1: Navigate to frontend folder
cd frontend

# Step 2: Build React app
if [ ! -d "build" ]; then
    echo "📦 Build folder not found, running npm install and npm run build..."
    npm install
    npm run build
else
    echo "📦 Build folder exists, skipping npm install and npm run build..."
fi

cd ..

# Step 3: Get bucket name from CloudFormation
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name habit-tracker-frontend-dev \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
  --output text)

if [ -z "$BUCKET_NAME" ]; then
    echo "❌ Error: Could not get bucket name from CloudFormation"
    exit 1
fi

echo "📦 Bucket: $BUCKET_NAME"

# Step 4: Sync build folder to S3
echo "📤 Syncing files to S3..."
aws s3 sync ./frontend/build/ s3://$BUCKET_NAME/ --delete

# Step 5: Get website URL from CloudFormation
WEBSITE_URL=$(aws cloudformation describe-stacks \
  --stack-name habit-tracker-frontend-dev \
  --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" \
  --output text)

echo "✅ Deployment complete!"
echo "🌐 Website URL: $WEBSITE_URL"