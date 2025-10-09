# Lambda Function Architecture

## Function Organization

### Option 1: One Lambda per endpoint (Microservices)

```
lambda-signup/
lambda-login/
lambda-get-habits/
lambda-create-habit/
lambda-update-habit/
lambda-delete-habit/
```

**Pros:** Fine-grained scaling, isolated failures
**Cons:** Many functions to manage, more CloudFormation

### Option 2: One Lambda per resource (Monolithic functions)

```
lambda-user/ (handles signup, login, logout, get-user)
lambda-habit/ (handles all habit CRUD operations)
```

**Pros:** Easier to manage, shared code
**Cons:** Less granular scaling

### Option 3: Single Lambda for entire API (Monolith)

```
lambda-api/ (all routes in one function)
```

**Pros:** Easiest migration from Express
**Cons:** Defeats purpose of serverless, cold starts affect all routes

**Decision: Option 2** (one Lambda per resource)

- Balances simplicity and serverless benefits
- Easy migration from current controller structure
- Can split further later if needed

## Lambda Function Structure

```
backend/
└── lambda-functions/
├── user-function/
│   ├── index.js          # Main handler
│   ├── package.json      # Dependencies
│   └── controllers/
│       └── userController.js
└── habit-function/
├── index.js
├── package.json
└── controllers/
└── habitController.js
```

## Database Connection Strategy

### Problem: Lambda is stateless

Each Lambda invocation could create a new database connection
→ Connection pool exhaustion!

### Solution: Connection pooling with RDS Proxy

- RDS Proxy manages connection pooling
- Lambda reuses connections
- Prevents database overload

### Alternative: Reuse connections

```javascript
// Outside handler (survives between invocations)
let dbConnection;

exports.handler = async (event) => {
  if (!dbConnection) {
    dbConnection = await createConnection();
  }
  // Use existing connection
};
```
