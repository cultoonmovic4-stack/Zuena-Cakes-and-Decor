# Zuena Cakes & Decor --- Technology Stack

**Document status:** Draft for review\
**Version:** 0.1\
**Last updated:** 22 October 2026\
**Purpose:** Record the selected technology stack, the responsibility of
each technology, and the principles for using it in the Zuena Cakes &
Decor project.

------------------------------------------------------------------------

## 1. Overview

The following stack has been selected for the project:

  Area                                      Selected technology
  ----------------------------------------- ---------------------
  Frontend library                          React
  Frontend tooling and development server   Vite
  CSS framework                             Tailwind CSS
  Backend framework                         Laravel
  Backend interface                         REST API
  Database                                  MySQL
  Version control                           Git
  Remote repository and collaboration       GitHub

The public website and staff admin portal will be part of the **same
React application**. The Laravel backend will provide the API and
enforce server-side business rules, authentication, and authorization.

This document records the selected technologies. Exact version numbers
and compatible dependencies must be checked and pinned during
environment setup rather than guessed in advance.

## 2. Repository Organization

The project will use one Git repository with two primary application
folders and a documentation folder:

``` text
zuena-cakes-decor/
├── frontend/
│   └── # React + Vite + Tailwind CSS application
├── backend/
│   └── # Laravel REST API
├── docs/
│   └── # Project documentation in Markdown
└── README.md
```

The frontend application will contain both the public-facing website and
the protected admin portal. They may use separate route groups and
layouts, but they will not be separate React applications.

The detailed internal folder structure will be decided in the
architecture documentation before implementation.

## 3. Frontend

### 3.1 React

**Role:** Build the user interface as reusable components.

React will be used for: - Public website interface. - Admin portal
interface. - Shared interface components where appropriate. -
Interactive catalogue and filtering experiences. - Shopping cart state
and interactions. - Form interactions and feedback states. -
Route-specific layouts and protected admin views.

React is responsible for the interface, not for enforcing security or
authoritative business rules. Sensitive decisions and permissions must
be validated by the backend.

### 3.2 Vite

**Role:** Frontend development tooling and build system.

Vite will be used to: - Run the local frontend development server. -
Process the frontend application during development. - Build optimized
frontend assets for deployment. - Support the selected React setup.

The exact Vite configuration and compatible package versions will be
established during frontend foundation work.

### 3.3 Tailwind CSS

**Role:** Style the frontend using utility classes and a consistent
design system.

Tailwind CSS will support: - Responsive layouts. - Consistent spacing
and typography. - Reusable visual patterns. - Breakpoints for desktop,
tablet, and mobile. - States such as hover, focus, disabled, loading,
and error.

The project should establish shared design tokens and styling
conventions during the frontend foundation stage. The brand direction is
warm, creative, celebration-focused, and welcoming. Avoid introducing a
visual direction that conflicts with that agreed identity.

### 3.4 Frontend routing

A React-compatible routing solution will be selected during setup. It
must support public routes and admin routes while keeping their
navigation and layouts clearly separated.

Frontend route protection is a user-experience measure only. Laravel
must independently enforce authorization for all protected data and
operations.

### 3.5 Frontend API communication

The frontend will communicate with Laravel through a documented API
client or shared request layer rather than scattering ad hoc requests
throughout components.

The shared layer should provide consistent handling for: - Base API URL
and environment configuration. - Request and response processing. -
Validation errors. - Authentication-related responses. - Network
failures and unexpected server errors.

Secrets and privileged credentials must never be placed in client-side
code. Values compiled into the frontend must be treated as publicly
visible.

## 4. Backend

### 4.1 Laravel

**Role:** Provide the backend API and enforce business rules.

Laravel will be responsible for: - API endpoints used by the React
application. - Server-side validation. - Authentication and
authorization for staff. - Order-request and enquiry processing. -
Catalogue and service data access. - Applying agreed workflow and status
rules. - Safe handling of custom-cake reference-image uploads. -
Consistent error responses. - Database transactions where operations
require them.

Laravel must be configured to use a supported, security-patched PHP
release compatible with the chosen Laravel version. Framework and
runtime compatibility must be verified before installation and
deployment.

### 4.2 REST API

The REST API will be the communication boundary between the frontend and
backend.

Before endpoint implementation, the project should document: - Resource
names and endpoint responsibilities. - Request and response shapes. -
Validation rules. - Authentication requirements. - Authorization
rules. - Error response conventions. - Pagination and filtering where
needed. - File-upload rules for custom cake references.

Public endpoints must expose only information intended for public
viewing. Customer details and admin operations must be protected.

## 5. Database

### 5.1 MySQL

**Role:** Persistent storage for application data.

MySQL will store the data required for the public catalogue, customer
requests, staff access, and the agreed order workflow.

The database design must be based on reviewed requirements. Before
creating migrations, the project should document the data entities,
relationships, constraints, indexes, and data lifecycle.

### 5.2 Database access

Laravel's Eloquent ORM and migration system will be used for normal
application data access and schema changes, unless a documented
technical reason requires an alternative.

Database credentials must be stored in environment-specific
configuration and excluded from version control.

### 5.3 Data integrity

The backend and database should protect data integrity through
appropriate: - Required-field validation. - Foreign-key relationships. -
Unique constraints where appropriate. - Transactions for related
multi-step writes. - Consistent status values and transition rules. -
Safe handling of customer-provided input.

The exact schema and constraints are not defined by this document; they
belong in the architecture and database design documentation.

## 6. Version Control and Repository Hosting

### 6.1 Git

Git will track changes to the frontend, backend, and documentation.

Recommended practices: - Make commits that describe meaningful
changes. - Keep unrelated changes out of the same commit where
practical. - Avoid committing generated build output unless deployment
requirements explicitly call for it. - Review changes before merging
them into the primary branch.

### 6.2 GitHub

GitHub will host the project repository and provide a remote copy of the
version history.

The repository should contain: - `frontend/` - `backend/` - `docs/` - A
root `README.md` - Appropriate example environment files without
secrets.

Do not commit real `.env` files, API secrets, database passwords,
production customer records, private uploads, or other sensitive data.
Use `.env.example` files with placeholder values where appropriate.

Branching, pull-request, backup, and deployment conventions can be
documented when the workflow is agreed.

## 7. Development Environments

The project will use separate local configuration for the frontend and
backend.

At minimum: - The frontend needs its Node.js/package-manager environment
and Vite development server. - The backend needs a compatible PHP
runtime, Composer, Laravel configuration, and database connectivity. -
MySQL must be available locally or through an explicitly selected
development service. - Frontend API configuration must point to the
intended backend environment. - Environment-specific values must not be
hard-coded into application source.

Exact supported versions, package manager, local service setup, ports,
and deployment environment remain to be confirmed during setup. They
should be recorded in the README and environment/setup documentation
after verification.

## 8. Security Principles

The selected stack must be used with these baseline principles:

1.  **Backend authorization is authoritative.** React route guards do
    not replace Laravel authorization.
2.  **Validate on the server.** Client-side validation improves
    usability but is not a security boundary.
3.  **Protect staff access.** Admin endpoints and customer data must
    require the appropriate authentication and authorization.
4.  **Handle uploads defensively.** Custom-cake reference uploads need
    file type, size, storage, and access controls.
5.  **Protect secrets.** Keep credentials and environment-specific
    secrets out of Git and frontend bundles.
6.  **Use secure configuration.** Production deployments must use HTTPS
    and appropriate cookie/session or token settings for the chosen
    authentication design.
7.  **Keep dependencies maintained.** Use supported, patched runtime and
    package versions, and review security advisories during maintenance.
8.  **Return minimal data.** API responses should include only fields
    required by the authorized caller.

The exact staff authentication mechanism, session/token approach, CORS
configuration, rate limits, upload storage policy, and production
deployment controls require a separate architecture decision.

## 9. Testing Expectations

Testing will be introduced alongside implementation rather than left
until the end.

The project should include: - Frontend checks for critical component
behavior and important user interactions. - Backend tests for
validation, authorization, and business rules. - API tests for important
request workflows. - Tests ensuring public requests cannot access
private staff data. - Manual responsive and accessibility checks at
agreed breakpoints.

The exact test libraries and commands will be selected after the package
versions and architecture are established.

## 10. Decisions Not Covered by This Document

This document does not finalize: - Exact framework/runtime version
numbers. - React router selection. - Frontend state-management library,
if any. - API client library, if any. - Staff authentication/session
design. - Image storage provider or retention policy. - Deployment and
hosting provider. - CI/CD workflow. - Database schema. - Public page
structure or final navigation.

These decisions should be made in the appropriate setup or architecture
document rather than assumed here.

## 11. Stack Acceptance Checklist

-   [x] React selected for the frontend.
-   [x] Vite selected for frontend tooling.
-   [x] Tailwind CSS selected for styling.
-   [x] Laravel selected for the backend.
-   [x] MySQL selected for the database.
-   [x] Git selected for version control.
-   [x] GitHub selected for remote repository hosting.
-   [x] Public website and admin portal will share one React
    application.
-   [x] One repository will contain `frontend/` and `backend/`.
-   [ ] Compatible, supported software versions verified and recorded.
-   [ ] Local development setup documented.
-   [ ] API authentication and authorization design approved.
-   [ ] Deployment approach selected.

------------------------------------------------------------------------

## Related Documentation

-   `README.md` --- project overview and setup instructions.
-   `PROJECT_REQUIREMENTS.md` --- business and functional requirements.
-   `PROJECT_ARCHITECTURE.md` --- application boundaries, API,
    authentication, and data flow.
-   `DEVELOPMENT_PHASES.md` --- staged implementation plan.

**Status note:** This document records the selected stack and baseline
principles. Items left unchecked remain open and must be addressed
before the relevant implementation work.
