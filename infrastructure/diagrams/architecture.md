# Habit Tracker AWS Architecture

## Phase 1: Frontend (Week 1)

**User Flow:**

```
User Browser
↓
CloudFront (CDN)
↓
S3 Bucket (React build)
```

**Components:**

- **CloudFront Distribution** – Serves the React frontend globally with HTTPS and caching.
- **S3 Bucket** – Stores the React `build` folder; private, accessed via CloudFront.
- **ACM Certificate** – Provides SSL/TLS encryption for secure HTTPS connections.
- **Route 53 (Optional)** – Maps a custom domain to CloudFront.

**Purpose:**  
Deploy a fully static React frontend with global availability and HTTPS.

---

## Phase 2: Backend Migration (Week 2)

**User Flow:**

```
User Browser
↓
CloudFront (Frontend)
↓
S3 (React app)
User Browser
↓
API Gateway
↓
Lambda Functions
↓
RDS PostgreSQL
```

**Components:**

- **API Gateway** – RESTful API interface for frontend to interact with backend logic.
- **Lambda Functions** – Serverless compute for handling API requests.
- **RDS PostgreSQL** – Stores relational data like users, orders, and habits.

**Purpose:**  
Add backend functionality without managing servers, enabling CRUD operations and database access.

---

## Phase 3: Complete Architecture (Week 3–4)

**User Flow:**

```
User Browser
↓
CloudFront + Route 53
↓
├─→ S3 (React app)
└─→ API Gateway
↓
Lambda Functions
↓
├─→ RDS (orders, users)
├─→ DynamoDB (habits, cache)
├─→ Cognito (auth)
└─→ SQS (async tasks)
```

**Components:**

- **CloudFront + Route 53** – Global delivery with optional custom domain.
- **S3 Bucket** – Hosts React frontend.
- **API Gateway** – Handles requests from frontend.
- **Lambda Functions** – Serverless backend logic.
- **RDS PostgreSQL** – Stores relational data.
- **DynamoDB** – Stores habits data and cache for fast reads.
- **Cognito** – Manages user authentication, registration, and login.
- **SQS** – Queues asynchronous tasks such as notifications or email reminders.

**Purpose:**  
Complete serverless architecture with frontend, backend, authentication, caching, and asynchronous processing. Fully scalable, cost-effective, and production-ready.
