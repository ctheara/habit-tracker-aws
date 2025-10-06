# Migration Notes

## Day 1

### What I Did Today

- Create IAM user with MFA
- Install and configure AWS CLI with the new user
- Learn basics of S3 and CloudFront
- Crate project structure
- Document current architecture and mirgation plan
- Tested CloudFormation template

### What I learned

#### S3 Buckets

- Bucket names must be globally unique (not just in my account!)
- Buckets are region-specific, but names are global namespace
- Can't change bucket name after creation (need to delete and recreate)

#### IAM Roles vs Users

- **Users**: For people (me logging in)
- **Roles**: For services (Lambda accessing S3)
- Best practice: Services should use roles, not access keys

#### S3 Static Website Hosting

- Need two things:
  1. Enable static hosting in bucket settings
  2. Make objects publicly readable with bucket policy
- Default docs: `index.html` and `error.html`
- URL format: `bucket-name.s3-website-region.amazonaws.com`

### Commands

```bash
aws configure
aws s3 mb s3://habit-tracker-test123 # create s3 bucket
aws s3 rb s3://habit-tracker-test123 # delete s3 bucket
aws cloudformation create-stack --stack-name test-stack --template-body file://test-s3.yaml # create stack
aws cloudformation describe-stacks --stack-name test-stack # check status
aws cloudformation delete-stack --stack-name test-stack # delete stack
```

## Day 2

### What I Did Today

- Created CloudFormation template (`01-s3-static-website.yaml`) for S3 static website hosting
- Configured S3 bucket for static website hosting with index and error documents
- Build frontend code and upload to s3 and got s3 static site to work

### What I learned

- How to use CloudFormation to automate S3 static website setup
- How to use parameters in CloudFormation for environment-specific resources
- How to set up S3 bucket policies for public access via CloudFormation
- How to use CloudFormation outputs to export resource info for other stacks

### Commands

```bash
aws cloudformation validate-template --template-body file://infrastructure/cloudformation/01-s3-static-website.yaml # valid template
aws cloudformation create-stack --stack-name habit-tracker-frontend-dev --template-body file://infrastructure/cloudformation/01-s3-static-website.yaml --parameters ParameterKey=Environment,ParameterValue=dev # create stack
aws cloudformation describe-stacks--stack-name habit-tracker-frontend-dev --query 'Stacks[0].StackStatus' # check status
aws cloudformation describe-stacks --stack-name habit-tracker-frontend-dev --query 'Stacks[0].Outputs' # print output
```

---

## Day X

### What I Did Today

### What I learned

### Commands
