Community-Powered Real-Time Public
Awareness Platform
(Non-Geospatial Architecture – MVP Technical Specification)
1. Executive Overview
1.1 Vision
To build a structured, real-time civic awareness platform that enables users to
report and discover live infrastructure and public service conditions using verified
visual evidence (photo/video), organized strictly by administrative hierarchy City
→
Area).
1.2 Product Positioning
This platform is:
Not a social media network
Not a review aggregation site
Not map-based
It is a structured, evidence-driven public condition reporting system organized by
administrative areas.
2. Recommended Technology Stack
Based on the planned architecture and scalability requirements, the following
stack is recommended:
2.1 Frontend

Framework: Next.js App Router)
Language: TypeScript

State Management: Zustand
Server State & Caching: TanStack Query
Form Handling: React Hook Form + Zod
UI Framework: TailwindCSS + shadcn/ui
Authentication Client: Supabase Auth SDK or Better Auth Client
Image Optimization: Next.js Image Optimization
PWA Support Optional): Next PWA
If targeting mobile-first, consider wrapping with Capacitor or building a
dedicated React Native client later.
2.2 Backend
Primary Framework Recommended): NestJS
Structured, modular, scalable)
Alternative Lightweight): Express.js
Language: TypeScript
Validation: class-validator / Zod
Authentication: Supabase Auth or Better Auth JWT-based)
API Documentation: Swagger OpenAPI
Background Jobs: BullMQ
Queue Broker: Redis
2.3 Database & ORM

Database: PostgreSQL
Cloud Provider: Neon (serverless Postgres)
ORM Drizzle ORM

Migration Tool: Drizzle Kit
2.4 Storage & Media
Primary Storage: Neon Storage
Extended Media CDN Cloudinary
Video Processing: FFmpeg (via worker service)
Thumbnail Generation: Cloudinary or custom worker
2.5 Infrastructure & DevOps
Hosting Frontend): Vercel
Hosting Backend): Railway / Fly.io / AWS ECS
Cache Layer: Redis
CDN Cloudflare
Monitoring: Sentry + Prometheus
Logging: Winston + centralized log storage
CI/CD GitHub Actions
3. Scope Definition (MVP)
3.1 Allowed Categories
A. Roads & Transportation
Traffic congestion
Road damage
Flooding
Construction blockage
B. Public Services


Power outage
Water shortage
Hospital congestion
Government office delays
C. Business Conditions (Evidence-Based Only)
Hygiene issues
Overcrowding
Closed/unavailable status
3.2 Explicitly Excluded
Political content
Religious content
Entertainment content
Personal attacks
Opinion-only submissions without media evidence
4. System Structure (Non-Geospatial
Model)
Reports are organized using structured administrative tagging:
Country
└── City
└── Area / Sub-city
└── Optional Specific Place Name
Each report must include:

City

Area
Category
Media evidence
No GPS coordinates or radius-based filtering.
5. Functional Requirements
5.1 User Management
Registration & login
JWT-based authentication
Role-based access control:
User
Admin
Super Admin
Profile management
Account suspension/ban
Password reset
5.2 Report Creation
Required Fields

Title
Description
Category
Urgency Level Info / Warning / Critical)
City

Area
At least one image or video
Auto-generated timestamp
Optional Fields
Specific place name
Business rating (business category only)
System Rules
Max video length (default: 30s)
Allowed file formats enforced
Media compression
Thumbnail generation
Duplicate detection
Empty submission rejection
5.3 Report Lifecycle
States
Published
Under Review
Removed
Verified
Time-Sensitive Handling
Auto-expiry (configurable hours)
Archiving with search availability
5.4 Multi-Search System (Text-Based)


Keyword Search
Title
Description
Place name
Filters
Category
Urgency
City
Area
Date range
Media type
Status
Sorting
Most recent
Most urgent
Highest confidence
Most validated
No geospatial search capability.
5.5 Trust & Validation System
Each report displays:

Real votes
Fake votes
Confidence score

Confidence Score Factors
Vote ratio
Reporter trust score
Report age
Counter-reports
User Trust Score Increases When
Reports validated
Low removal rate
Low violation history
Low-Trust Restrictions
Reduced visibility
Higher moderation threshold
Posting frequency limits
5.6 Moderation System
Automated Moderation
Profanity detection
Spam detection
Duplicate detection
Media validation
Manual Moderation Flow
Report flagged
Admin review
Action:

Approve

Remove
Ban
Mark verified
Action logged with mandatory reason
All actions recorded in audit logs.
5.7 Subscription & Notification System
Users may subscribe to:
City
Specific Area
Category within Area
Trigger Events
Critical reports
Verified reports
High-confidence reports
No GPS-based notifications.
6. Non-Functional Requirements
Performance

Report submission < 3s
Search < 300ms average
Async media processing
Concurrent user support

Scalability
Horizontal backend scaling
Queue-based media pipeline
CDN-backed delivery
Stateless API design
Security
JWT authentication
Role-based authorization
Rate limiting
Secure file validation
Input sanitization
Secure hashing (bcrypt/argon2
Full audit logging
Reliability
Automated backups
Centralized logging
Monitoring & alerts
Graceful failure handling
Governance
Clear content policy enforcement
Appeal process
Data deletion requests
Configurable retention policy


7. System Architecture
7.1 High-Level Architecture
Next.js Frontend
↓
NestJS REST API
↓
PostgreSQL (Neon)
↓
Redis (Cache + Queue)
↓
Cloudinary / Neon Storage
7.2 Core Backend Modules
Authentication Module
User Module
Report Module
Moderation Module
Trust & Scoring Module
Notification Module
Admin Module
7.3 Core Database Entities

Users
Reports
Media
Categories
Cities
Areas
Reactions
ModerationReports
AuditLogs
Subscriptions
No geospatial tables required.
7.4 Media Processing Flow
Upload request
Backend validation
Storage upload
Background worker:
Video transcoding
Thumbnail generation
Compression
Status update
8. API Design (REST)
Authentication
POST /api/auth/register
POST 
/api/auth/login
POST /api/auth/logout
Reports
POST /api/reports
GET /api/reports
 12
GET 
/api/reports/{id}
PATCH 
/api/reports/{id}
DELETE 
/api/reports/{id}
Query Parameters
city
area
category
urgency
startDate
endDate
mediaType
sort
Reactions
/api/reports/{id}/react
POST 
Moderation
/api/reports/{id}/flag
POST 
/api/admin/reports
GET 
POST 
/api/admin/action
Subscriptions
/api/subscriptions
POST 
DELETE 
/api/subscriptions/{id}


9. Development Standards
Architectural Principles
Modular architecture
Service-layer business logic
DTO-based validation
Centralized error handling
Clean separation of concerns
Suggested Folder Structure
/src
/modules
/auth
/users
/reports
/moderation
/notifications
/trust
/common
/config
API Standards
OpenAPI Swagger) documentation
Standard response format:
success
data
error
message
Defined error codes for:

Authentication failure
Validation error
Permission denied
Resource not found
10. Testing Strategy
Unit Testing
Trust score calculation
Permission logic
State transitions
Input validation
Integration Testing
Media report creation
Moderation workflow
Subscription triggers
Search accuracy
Security Testing
Role enforcement
Rate limiting
Upload validation
Injection prevention
Performance Testing

1,000 concurrent users

10,000 retrievals/hour
Media upload stress test
11. MVP Success Criteria
The MVP is considered production-ready when:
Structured reports with media can be submitted
Search and filtering by City/Area/Category works reliably
Trust scoring affects visibility
Moderation workflow functions correctly
System operates under moderate concurrent load without degradation
Conclusion
A structured, area-based, real-time public condition reporting platform designed
without geographic mapping dependencies, optimized for scalability, trust
validation, and evidence-based reporting.

