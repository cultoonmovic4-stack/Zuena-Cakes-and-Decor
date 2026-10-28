# Readme

A professional website and lightweight order-request system for Zuena Cakes & Decor, designed to showcase cakes and decoration services, simplify customer enquiries, and help staff manage incoming requests.

**Project status:** Planning and documentation  
**Current priority:** Frontend foundation  
**Backend status:** Planned, but deferred pending PHP environment assessment

---

## 1. Project Overview

Zuena Cakes & Decor is being developed as a new web application with a customer-facing website and a private staff administration portal.

The project aims to provide a warm, creative, celebration-focused, and professional online experience while keeping the ordering and enquiry process straightforward.

Customers will be able to explore available cakes and decoration services, submit order requests, request custom cake designs, and enquire about event decorations.

Staff will use a protected administration portal to review requests and manage approved business information.

Customer accounts are not required for the standard customer ordering journey.

## 2. Main Features

### Public Website

- Cake catalogue and discovery experience.
- Product details and available options.
- Cart supporting multiple catalogue products.
- Customer order-request submission.
- Custom cake requests with optional reference images.
- Decoration and event-service enquiries.
- Business information and contact details.

### Staff Administration Portal

- Staff authentication.
- Order-request review and management.
- Custom cake request review.
- Decoration enquiry management.
- Catalogue management, subject to approved requirements.
- Access controls for private customer information.

The final public page structure and detailed administration permissions will be defined during the appropriate planning phases.

## 3. Technology Stack

| Area | Technology |
|---|---|
| Frontend | React |
| Frontend tooling | Vite |
| Styling | Tailwind CSS |
| Backend | Laravel REST API |
| Database | MySQL |
| Version control | Git and GitHub |
| Documentation | Markdown |

The frontend and backend will reside in the same repository but remain separate applications.

The React application will communicate with Laravel through the REST API. Laravel will handle database operations; the frontend will not connect directly to MySQL.

## 4. Repository Structure

```text
zuena-cakes-website/
├── frontend/                 # React + Vite application
│
├── backend/                  # Laravel REST API
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

This is the planned structure. Application files and additional directories will be introduced as their development phases begin.

## 5. Documentation Guide

The `docs/` directory contains the project's planning documents.

| Document | Purpose |
|---|---|
| `PROJECT_REQUIREMENTS.md` | Defines the project scope and functional requirements. |
| `TECH_STACK.md` | Records the selected technologies and their responsibilities. |
| `PROJECT_ARCHITECTURE.md` | Explains application boundaries, data flows, and security principles. |
| `DEVELOPMENT_PHASES.md` | Defines the development roadmap and completion criteria. |

These documents should be reviewed and updated when approved project decisions change.

## 6. Development Strategy

Development will proceed in controlled phases.

1. Prepare the project and frontend environment.
2. Establish the frontend foundation and styling system.
3. Build the public website.
4. Build the staff portal interface.
5. Review and stabilize the frontend.
6. Assess the PHP environment and establish the Laravel backend foundation.
7. Design the database and implement API resources.
8. Implement order and enquiry workflows.
9. Integrate the frontend and backend.
10. Complete testing and security checks.
11. Prepare for deployment and launch.

The frontend is the immediate priority.

**Backend implementation is intentionally deferred** until the PHP environment has been assessed and a compatible, supported PHP and Laravel setup has been established.

Staff authentication will remain undecided until the backend foundation review. Laravel session authentication and token-based authentication will be evaluated before a final choice is made.

See `docs/DEVELOPMENT_PHASES.md` for the detailed roadmap.

## 7. Core Business Rules

- Customers do not need accounts for the standard ordering process.
- Customers can request multiple catalogue products in one order.
- Submitted order requests are not automatically confirmed.
- Staff review requests and confirm availability, final pricing, and fulfilment details with customers.
- Custom cake requests may include reference images.
- Collection and delivery are subject to business availability and confirmed arrangements.
- Public interfaces must not expose private customer or staff information.
- Backend authorization must protect all staff-only operations.

Business details such as contact information, prices, service areas, and delivery policies must be verified before being published as current information.

## 8. Development Guidelines

- Follow the approved documentation.
- Build the frontend before beginning backend implementation.
- Avoid adding unnecessary features or complexity.
- Keep business rules enforced by the backend.
- Use reusable components where they improve consistency and maintainability.
- Keep credentials and secrets out of version control.
- Test important features before declaring a phase complete.
- Document unresolved decisions rather than silently guessing.
- Review and approve each phase before proceeding to dependent work.

## 9. Getting Started

Development setup instructions will be added as the relevant environment is established.

The frontend setup instructions will be documented when the React + Vite foundation is verified.

Backend setup instructions will be added after the PHP environment assessment and Laravel compatibility review.

Do not assume the backend is ready merely because the `backend/` directory exists.

## 10. Project Status

The project is currently in the documentation and planning stage.

The immediate next step is to review the documentation set for consistency, then begin the approved frontend foundation phase.

---

**Zuena Cakes & Decor — Project documentation and development reference.**