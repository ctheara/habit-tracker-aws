# Habit Tracker - Current Architecture

## Frontend

- **Tech:** React 19, Material-UI
- **Hosting:** Vercel
- **URL:** https://habit-tracker-fawn-omega.vercel.app

## Backend

- **Tech:** Node.js, Express, TypeScript
- **Hosting:** Render
- **URL:** https://habit-tracker-nyif.onrender.com/
- **API Docs:** Swagger at /api-docs

## Database

- **Type:** PostgreSQL
- **Hosting:** [Neon/Render/other?]
- **Tables:** users, habits

## Authentication

- JWT tokens in httpOnly cookies
- Endpoints: /user/signup, /user/login, /user/logout

## Key Features to Migrate

1. User registration/login
2. Habit CRUD operations
3. Dashboard with habit list
4. Edit/delete habits

## Migration Goals

- [ ] Frontend: S3 + CloudFront
- [ ] Backend: API Gateway + Lambda
- [ ] Database: RDS PostgreSQL
- [ ] Auth: Consider Cognito or Lambda authorizer
- [ ] Add caching with DynamoDB/ElastiCache
- [ ] Implement CI/CD with CodePipeline
