 Development Phases

**Document status:** Draft for project planning  
**Version:** 0.1  
**Project:** Zuena Cakes & Decor Website and Order Request System

---

## 1. Purpose

This document defines the planned development phases for the Zuena Cakes & Decor website and integrated order request system.

The roadmap includes frontend development, backend foundation, database and API implementation, integration, testing, and deployment.

Although the backend is part of the overall project, development will begin with the frontend. Backend implementation is intentionally deferred because the current PHP environment requires review.

Each phase must have clear objectives, deliverables, dependencies, and completion criteria. Work should not advance to a dependent phase until the required foundation has been reviewed and approved.

## 2. Development Principles

The project will follow these principles:

1. Build the frontend first.
2. Follow the approved requirements, technology stack, and architecture documents.
3. Avoid introducing unnecessary features or complexity.
4. Complete and verify the foundation before building dependent features.
5. Keep unresolved decisions documented rather than guessing.
6. Test important functionality throughout development.
7. Protect customer information and staff-only functionality.
8. Keep the public website and staff portal within the same React application.
9. Include the Laravel backend in the project plan without starting its implementation prematurely.
10. Review each phase before declaring it complete.

## 3. Overall Development Order

The project will follow this general sequence:

1. Project and frontend environment preparation.
2. Frontend foundation and styling system.
3. Public website development.
4. Staff portal frontend development.
5. Frontend review and stabilization.
6. PHP environment assessment and backend foundation.
7. Database design and Laravel API development.
8. Customer order and enquiry workflows.
9. Frontend-backend integration.
10. Testing, security review, and quality assurance.
11. Deployment preparation and launch.

The precise order of tasks within each phase may be adjusted when dependencies require it. Any significant change should be documented before implementation.

## 4. Phase 1 — Project and Frontend Environment Preparation

### Objective

Prepare a clean, organized frontend development environment before implementing website features.

### Planned tasks

- Review the project directory and existing files.
- Confirm the repository structure.
- Verify the availability of Node.js and npm.
- Initialize or verify the React + Vite application in `frontend/`.
- Configure Tailwind CSS using a version-compatible setup.
- Verify that the frontend development server starts correctly.
- Establish Git version control and confirm that sensitive files are excluded.
- Review the existing documentation before coding.

### Deliverables

- A working React + Vite application.
- Tailwind CSS configured and verified.
- A clean frontend project structure.
- Basic Git setup and appropriate ignore rules.
- A verified local development workflow.

### Completion criteria

- The frontend starts without blocking errors.
- React renders successfully.
- Tailwind styles work correctly.
- Project files are organized according to the approved structure.
- No unnecessary backend installation is required to run the frontend.

## 5. Phase 2 — Frontend Foundation and Styling System

### Objective

Establish reusable frontend foundations before implementing the complete public website.

### Planned tasks

- Define the frontend source structure.
- Establish shared layout conventions.
- Create reusable components where justified.
- Configure global styles and typography.
- Establish the approved color and spacing system.
- Define responsive layout conventions.
- Establish accessible form, button, navigation, and feedback patterns.
- Decide on frontend routing and state management when the requirements justify those choices.
- Document any additional frontend architecture decisions.

### Deliverables

- An organized React source structure.
- A consistent styling foundation.
- Reusable shared components.
- Responsive layout conventions.
- A documented approach to routing and frontend state.

### Completion criteria

- Shared components can be reused without unnecessary duplication.
- The styling system is consistent.
- The application works across appropriate screen sizes.
- The foundation does not depend on a running Laravel backend.

## 6. Phase 3 — Public Website Development

### Objective

Build the customer-facing website using the agreed brand direction and requirements.

### Planned tasks

- Confirm the detailed public page structure at the appropriate planning stage.
- Implement the approved public layouts and navigation.
- Build the cake discovery and catalogue experience.
- Support relevant cake occasions and cake-type filtering where approved.
- Build the decorations and events service experience.
- Implement product detail views.
- Implement customer contact and enquiry forms.
- Establish the cart interface and its required behaviour.
- Provide appropriate loading, empty, validation, and error states.
- Ensure the interface works across desktop, tablet, and mobile screens.

### Deliverables

- The approved public website pages.
- Cake catalogue and discovery interface.
- Decoration service interface.
- Product detail experience.
- Cart and order-request interface.
- Customer enquiry forms.
- Responsive layouts.

### Completion criteria

- The approved public pages are implemented.
- Navigation and interactions work as intended.
- The cart supports the planned customer journey.
- Forms provide appropriate feedback.
- Responsive and accessibility checks have been completed.

### Important dependency

The frontend may use clearly identified sample data during this phase. Sample data must not be mistaken for verified business information or production records.

## 7. Phase 4 — Staff Portal Frontend

### Objective

Build the staff administration interface within the existing React application.

### Planned tasks

- Establish a separate staff layout within the same React application.
- Define staff portal navigation.
- Build the login interface.
- Build the initial dashboard layout.
- Create the interface for reviewing order requests.
- Create the interface for reviewing custom cake requests.
- Create the interface for reviewing decoration enquiries.
- Plan catalogue management screens.
- Establish consistent loading, error, empty, and permission-denied states.
- Use sample data where the backend is not yet available.

### Deliverables

- Staff portal layout.
- Login interface.
- Dashboard interface.
- Order and enquiry management screens.
- Initial catalogue management screens where approved.

### Completion criteria

- Staff interfaces follow a consistent design.
- Public and staff experiences are clearly separated.
- The portal can be developed without requiring the backend to be implemented first.
- Any sample-data limitations are clearly documented.

### Security note

A frontend login screen or protected React route does not provide complete security. Real authentication and authorization must be enforced by Laravel before the portal is connected to production data.

## 8. Phase 5 — Frontend Review and Stabilization

### Objective

Review and stabilize the frontend before beginning backend implementation.

### Planned tasks

- Review the public website against approved requirements.
- Review the staff portal interface.
- Test navigation, forms, and cart interactions.
- Check responsive layouts.
- Check accessibility and keyboard interaction.
- Remove temporary components and unnecessary duplication.
- Document API data requirements.
- Identify frontend assumptions that depend on backend behaviour.
- Fix important frontend defects.

### Deliverables

- Reviewed frontend implementation.
- A list of outstanding frontend issues.
- Documented API integration requirements.
- A frontend version ready for backend integration planning.

### Completion criteria

- Core frontend journeys work using the available development data.
- Critical interface defects are resolved.
- Backend dependencies are documented.
- The project is ready for the next planned technical review.

## 9. Phase 6 — PHP Environment Assessment and Backend Foundation

**Status: Planned, but deferred.**

### Objective

Prepare a compatible and reliable Laravel backend environment after the frontend foundation has been established.

The backend remains part of the approved project architecture. It is not being removed or replaced; implementation is simply postponed.

### Reason for deferral

The current PHP environment requires review. The project will not begin Laravel installation or backend implementation until the relevant compatibility and environment issues have been investigated.

### Planned tasks

1. Inspect the installed PHP version.
2. Check required PHP extensions.
3. Verify Composer availability and compatibility.
4. Review Laravel version requirements against the available environment.
5. Determine whether the local PHP environment needs repair or an upgrade.
6. Agree on a supported PHP and Laravel combination.
7. Establish the Laravel project in `backend/`.
8. Configure environment variables safely.
9. Establish the MySQL connection.
10. Verify that Laravel runs correctly.
11. Establish the initial REST API structure.
12. Review staff authentication options and select an appropriate approach.
13. Document backend configuration and development instructions.

### Deliverables

- A verified PHP and Composer environment.
- A compatible Laravel installation.
- A working Laravel application.
- A verified MySQL connection.
- Initial API structure.
- An approved authentication decision.
- Backend setup documentation.

### Completion criteria

- PHP, Composer, and Laravel versions are compatible and supported.
- Required extensions are available.
- Laravel starts without blocking errors.
- The application connects to MySQL successfully.
- Secrets are stored outside version-controlled application code.
- Authentication and authorization planning has been reviewed.

### Restrictions before this phase begins

- Do not start backend implementation merely because the folder exists.
- Do not assume the cause of the PHP problem without checking the environment.
- Do not choose an incompatible Laravel release to work around an unresolved environment problem.
- Do not finalize staff authentication before reviewing the actual development and deployment requirements.

## 10. Phase 7 — Database Design and Laravel API Development

### Objective

Implement the approved database structure and the backend resources required by the website.

### Planned tasks

- Finalize the conceptual data model.
- Design database tables, relationships, indexes, and constraints.
- Create and test migrations.
- Establish catalogue endpoints.
- Implement product and category management endpoints.
- Implement order request endpoints.
- Implement custom cake request endpoints.
- Implement decoration enquiry endpoints.
- Establish staff authorization policies.
- Implement server-side validation.
- Define consistent API response and error formats.
- Add appropriate automated tests.

### Deliverables

- Reviewed database schema.
- Laravel migrations and required models.
- Core REST API endpoints.
- Server-side validation and authorization.
- Backend automated tests.

### Completion criteria

- Database relationships and constraints match the approved design.
- API operations validate incoming data.
- Protected operations enforce authorization.
- Core API behaviour is covered by appropriate tests.
- Customer information is not exposed through public endpoints.

### Dependency

This phase begins only after the backend foundation is verified and approved.

## 11. Phase 8 — Customer Order and Enquiry Workflows

### Objective

Implement the business workflows required for catalogue orders, custom cake requests, and decoration enquiries.

### Planned tasks

- Implement multi-item order request creation.
- Validate product identifiers, quantities, and permitted options.
- Calculate or return estimates using approved pricing rules.
- Store the relevant order and line-item information.
- Implement custom cake request submission.
- Validate and securely store custom cake reference images.
- Implement decoration enquiry submission.
- Establish the agreed order status workflow.
- Provide staff with the information required to follow up with customers.
- Prevent requests from being marked confirmed without the required staff action.

### Deliverables

- Functional order request workflow.
- Functional custom cake request workflow.
- Functional decoration enquiry workflow.
- Secure upload handling where approved.
- Documented status transitions.

### Completion criteria

- Customers can submit valid requests.
- Invalid submissions are rejected appropriately.
- Orders retain their individual requested items and options.
- Staff can retrieve and review authorized requests.
- Final pricing and fulfilment are handled according to the approved business rules.

## 12. Phase 9 — Frontend and Backend Integration

### Objective

Connect the React application to the Laravel REST API.

### Planned tasks

- Configure the frontend API client.
- Configure the approved cross-origin and authentication settings.
- Replace relevant sample data with API responses.
- Connect catalogue and product views.
- Connect cart submission to the order API.
- Connect custom cake and decoration enquiry forms.
- Connect staff login and protected administration screens.
- Implement appropriate loading and error handling.
- Test successful and unsuccessful API interactions.
- Verify authorization across protected resources.

### Deliverables

- Integrated public website.
- Integrated staff portal.
- Working API communication.
- Verified customer submission journeys.
- Verified staff management journeys.

### Completion criteria

- Frontend requests and backend responses follow the agreed API contract.
- Authentication works using the approved approach.
- Protected operations reject unauthorized requests.
- Validation errors are displayed appropriately.
- No production workflow depends on unverified sample data.

## 13. Phase 10 — Testing, Security, and Quality Assurance

### Objective

Verify that the complete application is reliable, secure, and ready for deployment preparation.

### Planned tasks

- Test customer ordering journeys end to end.
- Test custom cake and decoration enquiries.
- Test staff authentication and authorization.
- Test invalid and unexpected input.
- Review file upload security.
- Verify protection of customer information.
- Test responsive layouts and accessibility.
- Review database integrity.
- Review environment configuration and secret handling.
- Fix high-priority defects.
- Complete a final requirements checklist.

### Deliverables

- Test results.
- Resolved critical defects.
- Security review findings.
- Requirements verification checklist.
- Release-readiness assessment.

### Completion criteria

- Critical customer and staff workflows pass testing.
- No known critical security defects remain unresolved.
- Database and API behaviour is consistent.
- The team has documented any remaining limitations.
- Deployment preparation is approved.

## 14. Phase 11 — Deployment Preparation and Launch

### Objective

Prepare the approved application for a production environment.

### Planned tasks

- Select and verify suitable hosting.
- Confirm production PHP and Laravel compatibility.
- Configure production MySQL.
- Configure the frontend build and API URL.
- Configure HTTPS and secure authentication settings.
- Configure production environment variables.
- Establish database backups and recovery procedures.
- Configure approved image storage.
- Review logging and error monitoring.
- Perform production smoke tests.
- Verify customer and staff workflows after deployment.

### Deliverables

- Deployment configuration.
- Production frontend and backend.
- Database backup plan.
- Operational documentation.
- Verified production application.

### Completion criteria

- Production services run on compatible supported versions.
- HTTPS and access controls are configured correctly.
- Database backups and recovery procedures are documented.
- Core workflows pass production verification.
- The business approves the launch.

## 15. Phase Dependencies

The main dependencies are:

- Frontend foundation must precede full frontend implementation.
- Frontend review should precede backend integration planning.
- PHP and Laravel compatibility must be verified before backend implementation.
- Database design must be reviewed before migrations are finalized.
- Core API resources must exist before their production frontend integration.
- Order and enquiry workflows must be tested before launch.
- Deployment must follow security and quality assurance checks.

Some planning and documentation tasks may proceed in parallel, provided they do not force unresolved implementation decisions.

## 16. Phase Completion and Change Control

A phase is complete only when its deliverables have been reviewed and its completion criteria have been met.

At the end of each phase:

1. Review the work completed.
2. Test the relevant functionality.
3. Record unresolved issues.
4. Update documentation if decisions have changed.
5. Confirm readiness before beginning dependent work.

If a technical issue blocks progress, investigate it and report the findings before changing the architecture or skipping a required step.

Any change to the agreed stack, repository structure, authentication approach, or business workflow must be reviewed and documented.

## 17. Current Project Position

The project is currently in the documentation and planning stage.

The following documents have been drafted:

- `PROJECT_REQUIREMENTS.md`
- `TECH_STACK.md`
- `PROJECT_ARCHITECTURE.md`

This document defines the proposed development roadmap.

The next implementation priority, once documentation is sufficiently reviewed, is the frontend environment and foundation.

**Backend status:** Included in the roadmap, intentionally deferred pending PHP environment assessment.

**Authentication status:** Undecided; to be resolved during the backend foundation review.

**Public page structure:** Deferred until the appropriate frontend planning stage.

---

**End of draft — review required before implementation.**