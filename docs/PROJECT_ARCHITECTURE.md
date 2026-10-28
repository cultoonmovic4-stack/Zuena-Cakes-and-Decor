  Project Architecture

**Document status:** Draft for review  
**Version:** 0.1  
**Project:** Zuena Cakes & Decor Website and Order Request System

---

## 1. Purpose

This document defines the proposed technical architecture for the Zuena Cakes & Decor website.

It describes how the frontend, backend API, database, customer ordering experience, and staff administration portal will work together.

This document is a planning reference. Implementation must not begin until the relevant documentation and unresolved architectural decisions have been reviewed and approved.

## 2. Architecture Overview

The project will use a single Git repository containing the frontend application, backend API, and documentation.

The selected technology stack is:

- **Frontend:** React with Vite.
- **Styling:** Tailwind CSS.
- **Backend:** Laravel REST API.
- **Database:** MySQL.
- **Version control:** Git and GitHub.
- **Documentation:** Markdown files.

The public website and private staff administration portal will be part of the same React application. The Laravel API will handle business logic, data validation, authentication, authorization, and database operations.

The React application must never connect directly to MySQL.

## 3. High-Level Architecture

```text
Customer or Staff Member
          |
          v
React + Vite Application
          |
          |-- Public Website
          |
          |-- Protected Staff Portal
          |
          v
Laravel REST API
          |
          |-- Request Validation
          |-- Business Rules
          |-- Authentication
          |-- Authorization
          |-- Order Processing
          |-- Catalogue Management
          |
          v
       MySQL Database
```

Uploaded reference images and other media will use a storage solution approved during the relevant implementation phase.

## 4. Repository Structure

The planned repository structure is:

```text
zuena-cakes-website/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── tests/
│   └── composer.json
│
├── docs/
│   ├── PROJECT_REQUIREMENTS.md
│   ├── TECH_STACK.md
│   ├── PROJECT_ARCHITECTURE.md
│   └── DEVELOPMENT_PHASES.md
│
├── README.md
└── .gitignore
```

This is the intended structure, not a requirement to create every directory immediately. The final structure may be refined when the development phases are approved.

Environment files, credentials, private uploads, and generated dependencies must not be committed to Git.

## 5. Frontend Architecture

The frontend will use React, Vite, and Tailwind CSS.

It will provide two experiences within the same application.

### 5.1 Public Website

The public experience will allow visitors to:

- Browse cake products and available categories.
- Explore decoration services.
- View product details and available options.
- Add multiple catalogue products to a cart.
- Submit an order request without creating an account.
- Request a custom cake and provide a reference image.
- Submit decoration enquiries.
- View relevant business information and contact details.

The final public page structure and detailed visual design remain open for a later planning stage.

### 5.2 Staff Administration Portal

The administration portal will provide authorized staff with the tools required to manage the website's operational information.

Potential capabilities include:

- Secure staff login.
- Catalogue and product management.
- Order request review.
- Updating order statuses.
- Reviewing custom cake requests.
- Managing decoration enquiries.
- Accessing customer information only when required for authorized business tasks.

The precise staff roles, permissions, and administration features must be confirmed before implementation.

### 5.3 Frontend Responsibilities

The frontend will:

- Display information received from the backend.
- Manage user interactions and temporary interface state.
- Validate forms for usability.
- Submit requests to the Laravel API.
- Display loading, success, validation, and error states.
- Restrict access to staff-only interface routes.

Frontend validation and route protection improve usability but do not replace backend security.

## 6. Backend Architecture

Laravel will provide the REST API consumed by the React application.

### 6.1 Backend Responsibilities

The backend will:

- Validate incoming requests.
- Apply business rules.
- Read and write database records.
- Manage catalogue information.
- Create and process order requests.
- Handle custom cake and decoration enquiries.
- Authenticate staff members.
- Authorize protected actions.
- Validate uploaded files.
- Return consistent API responses.
- Protect private customer and business data.

Business rules must be enforced by Laravel, even when the frontend already performs corresponding checks.

### 6.2 API Organization

API endpoints will be organized around business resources and protected according to their purpose.

The proposed resource groups include:

- Public catalogue.
- Order requests.
- Custom cake requests.
- Decoration enquiries.
- Staff authentication.
- Staff administration.

The exact URL structure, request formats, response formats, and endpoint list will be documented before the API implementation phase.

## 7. Database Architecture

MySQL will store persistent application data. Laravel will be the application's database access layer.

Potential data groups include:

- Cake categories and products.
- Product options and pricing information.
- Decoration services.
- Order requests and their line items.
- Custom cake request details.
- Uploaded image metadata.
- Decoration enquiries.
- Staff accounts and permissions.
- Order status history, where required.

These are conceptual data groups, not an approved database schema. Table names, relationships, constraints, deletion policies, and indexes must be designed and reviewed before migrations are created.

The database must preserve the relationship between an order request and the individual products and options requested by the customer.

## 8. Customer Order Request Flow

Customer orders will initially be treated as requests requiring staff review, not automatically confirmed bookings.

The expected flow is:

1. The customer browses the catalogue.
2. The customer adds one or more products to the cart.
3. The customer reviews quantities, options, and estimated prices where available.
4. The customer provides the required contact and fulfilment information.
5. The frontend submits the order request to Laravel.
6. Laravel validates the submission and stores the request.
7. The customer receives an appropriate acknowledgement.
8. Authorized staff review the request and contact the customer.
9. Staff and customer agree on availability, final pricing, and fulfilment details.
10. Staff update the request to the appropriate confirmed or other status.

The cart subtotal is an estimate when final pricing depends on customizations or staff confirmation. Delivery fees and other adjustments must not be presented as confirmed until the business has established them.

The final order status workflow and customer acknowledgement method remain to be decided.

## 9. Custom Cake Request Flow

A customer may request a cake design that is not available in the standard catalogue.

The proposed process is:

1. The customer provides the requested cake details.
2. The customer selects relevant options, such as size or occasion, where supported.
3. The customer may upload a reference image.
4. The frontend submits the request to Laravel.
5. Laravel validates the submitted information and image.
6. The request and associated image metadata are stored.
7. Authorized staff review the request and discuss feasibility, availability, and final pricing with the customer.

Reference image uploads are intended for custom cake requests unless a later approved requirement changes this rule.

Image storage, permitted formats, file size limits, and retention policies remain open decisions.

## 10. Decoration Enquiry Flow

Customers will be able to enquire about decoration services separately from cake orders.

The enquiry may include event details, the requested service, the event date, location, and customer contact information, subject to the final requirements.

Laravel will validate and store submitted enquiries. Authorized staff will review them and follow up with the customer.

The precise enquiry fields and whether decoration services can be added to a combined order remain to be confirmed.

## 11. Authentication and Authorization

Customers will not be required to create accounts for the standard public ordering journey.

Staff administration will require authentication.

The following principles are mandatory:

- Laravel is the authority for access control.
- Every protected API endpoint must verify authentication and the relevant permissions.
- Staff must not access actions or records outside their authorization.
- Public endpoints must expose only information intended for public access.
- Private customer information must not be exposed through public catalogue responses.
- Secrets and credentials must not be embedded in frontend source code.
- Authentication tokens or session credentials must be handled according to the approved security design.

The authentication mechanism, staff role structure, and session management approach remain open decisions.

## 12. API Errors and Validation

The frontend and backend should use a consistent approach to errors.

The backend should distinguish between validation failures, unauthenticated requests, forbidden actions, missing resources, and unexpected server errors.

The frontend should present understandable messages without exposing database details, stack traces, credentials, or other sensitive implementation information.

Important operations must not appear successful in the interface until the backend confirms the result.

## 13. File Upload Security

Uploaded reference images must be handled securely.

The backend must enforce approved file size and type restrictions, validate uploaded content, generate safe storage names, and prevent uploaded files from being executed as application code.

Publicly accessible image URLs must not expose private customer uploads.

The storage location, access rules, backup requirements, and retention policy will be established before uploads are implemented.

## 14. Configuration and Environments

Configuration will be separated from application code.

Local development and production environments must use their own appropriate configuration values.

Examples of environment-specific settings include:

- Database connection details.
- Application URL.
- API base URL.
- Authentication settings.
- Allowed frontend origins.
- File storage configuration.

Environment files containing secrets must be excluded from Git. A safe example configuration file may document required variable names without including real credentials.

The local development setup and production hosting arrangements remain to be decided.

## 15. Testing and Quality Assurance

Testing will be planned across the frontend and backend.

Backend testing should cover:

- Request validation.
- Catalogue access.
- Order request creation.
- Custom cake request submission.
- Decoration enquiries.
- Authentication and authorization.
- Protection of private information.
- Database relationships and constraints.

Frontend testing should cover:

- Main customer interactions.
- Cart behaviour.
- Form validation and submission.
- Loading and error states.
- Protected administration routes.
- Responsive layouts and accessibility.

Integration testing should verify that the React application and Laravel API work together correctly.

The specific testing tools and coverage requirements will be selected during the development planning phase.

## 16. Agreed Architecture Decisions

The following decisions have been agreed in project planning:

- The website is being built as a new project.
- React and Vite will power the frontend.
- Tailwind CSS will handle styling.
- Laravel will provide the REST API.
- MySQL will store persistent data.
- The project will use Git and GitHub.
- The repository will contain `frontend/`, `backend/`, and `docs/`.
- The public website and staff portal will use one React application.
- Customers will not need accounts for the standard order-request process.
- Customers can submit multiple catalogue products in one order request.
- Order requests require staff review before confirmation.
- Custom cake requests may include reference images.
- The frontend will be developed first, while keeping the agreed backend architecture in mind.

## 17. Decisions Still Requiring Review

The following items are not finalized:

- Frontend routing and state management.
- API client and API versioning conventions.
- Staff authentication and session strategy.
- Staff roles and permissions.
- Exact database schema and relationships.
- Product option and pricing rules.
- Order statuses and status transitions.
- Image storage and retention.
- Decoration enquiry fields and combined-order behaviour.
- API error response format.
- Cross-origin configuration.
- Local development environment details.
- Testing tools and coverage targets.
- Hosting, deployment, backups, and monitoring.
- Final public page structure and visual design.

Unresolved decisions must be documented and agreed before the relevant implementation begins. They must not be silently settled through assumptions during coding.

## 18. Architecture Review Checklist

Before approving this document, verify that:

- [ ] The single-repository structure is correct.
- [ ] The public website and admin portal belong to one React application.
- [ ] Laravel is the only application layer that directly accesses MySQL.
- [ ] Staff-only API operations require server-side authorization.
- [ ] Customers can submit multiple catalogue items in one request.
- [ ] Order requests are not automatically confirmed.
- [ ] Custom cake reference images are handled securely.
- [ ] Private customer data is protected.
- [ ] Unresolved architectural decisions remain clearly identified.

---

**End of draft — review required before implementation.**