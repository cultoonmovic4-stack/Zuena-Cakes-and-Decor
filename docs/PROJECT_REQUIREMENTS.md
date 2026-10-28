# Zuena Cakes & Decor --- Project Requirements

**Document status:** Draft for review\
**Version:** 0.1\
**Last updated:** 22 October 2026\
**Purpose:** Record the business context and requirements agreed so far
for the new Zuena Cakes & Decor website and order-request system.

> This document is a working specification. Items labelled **Pending
> verification** must be confirmed with the business before they are
> treated as final website content or implemented as fixed business
> rules.

------------------------------------------------------------------------

## 1. Project Overview

Zuena Cakes & Decor is presented on its existing website as a
Kampala-based business offering cakes for special occasions and event
decoration services.

The goal is to build a new website from scratch with a warm, creative,
celebration-focused identity. The new platform should present cakes and
decoration services with equal importance and provide a straightforward
way for customers to submit order requests.

The project will include: - A public-facing website. - A product and
service discovery experience. - A shopping cart for cake products. - An
order-request process that does not require customers to create
accounts. - A protected staff admin area within the same React frontend
application. - A Laravel backend API and MySQL database.

The project should remain appropriately simple for the business. It is
not intended to begin as a large enterprise management system.

## 2. Business Reference

The existing website used as a reference is:

-   https://mathew-mats.github.io/zuena-cakes-website/

The current website describes the business as serving Kampala and shows
cake services, event decorations, a portfolio, testimonials, and contact
information.

### 2.1 Existing website information

The following information is visible on the current website. It is
recorded here as reference material, not as independently verified
business information.

  -----------------------------------------------------------------------
  Item                    Existing website        Status
                          information             
  ----------------------- ----------------------- -----------------------
  Business name           Zuena Cakes & Decor     Confirm business's
                                                  preferred official
                                                  styling

  Service area            Kampala, Uganda         Pending verification

  Phone                   +256 705 100 010        Pending verification

  Email                   info@zuenacakes.com     Pending verification

  Location                Kiwatule Road, Kampala, Pending verification
                          Uganda                  

  Business history        Website says the        Confirm before reuse
                          business has served     
                          customers since 2014    

  Wedding cake starting   UGX 200,000             Pending price
  price                                           confirmation

  Birthday cake starting  UGX 80,000              Pending price
  price                                           confirmation

  Kwanjula cake starting  UGX 150,000             Pending price
  price                                           confirmation

  Anniversary cake        UGX 120,000             Pending price
  starting price                                  confirmation
  -----------------------------------------------------------------------

The current website also mentions baby-shower cakes and decorations,
event decorations, custom designs, delivery, a cake-decorating equipment
shop, and customer testimonials. The business should confirm which of
these services and claims should appear on the new website.

### 2.2 Content accuracy rule

Do not assume that existing website text, prices, testimonials,
guarantees, opening hours, delivery promises, statistics, or service
claims are still accurate. Mark them for confirmation before publishing
them on the new website.

Do not invent customer testimonials, business credentials, guarantees,
prices, or operational policies.

## 3. Brand Direction

The agreed brand identity is:

-   Warm.
-   Creative.
-   Celebration-focused.
-   Personal and welcoming.
-   Professional without sounding unnecessarily formal or overly
    luxurious.

Cakes and decoration services must receive equal importance across the
website.

The new website should feel intentionally designed for the business and
its customers. Avoid generic visual treatments that make it feel
mass-produced.

## 4. Technology Stack

The agreed technology stack is:

  Area                                      Technology
  ----------------------------------------- ------------------
  Frontend                                  React
  Frontend tooling and development server   Vite
  Styling                                   Tailwind CSS
  Backend                                   Laravel REST API
  Database                                  MySQL
  Version control                           Git
  Remote repository                         GitHub

The public website and admin portal will be part of the **same React
application**. Laravel will provide the API and enforce server-side
authentication, authorization, validation, and business rules.

## 5. Repository and Application Organization

The project will use one Git repository containing two main folders:

``` text
zuena-cakes-decor/
├── frontend/
│   └── # React + Vite application (public website and admin portal)
├── backend/
│   └── # Laravel API
├── docs/
│   └── # Project documentation in Markdown
└── README.md
```

The exact internal frontend and backend structures will be documented
and agreed before implementation. The admin portal is not to be created
as a separate frontend application or separate repository.

## 6. Public Website Requirements

The public website must:

-   Communicate the Zuena Cakes & Decor brand clearly.
-   Give cakes and decoration services equal prominence.
-   Present cake products and relevant information in a way customers
    can browse.
-   Allow customers to find cakes by name.
-   Support browsing by occasion and filtering by cake type. The final
    catalogue taxonomy must be confirmed with the business.
-   Provide a way to request a custom cake when the desired design is
    not available in the catalogue.
-   Present decoration services and provide a way to enquire about them.
-   Work responsively on desktop, tablet, and mobile devices.
-   Use accessible, readable typography, clear navigation, appropriate
    contrast, and keyboard-friendly controls.
-   Avoid publishing unverified prices, business claims, or policies.

### 6.1 Working catalogue direction

The agreed discovery direction is to combine: - Occasion-based browsing,
such as birthdays, weddings, Kwanjula/introduction ceremonies,
anniversaries, graduations, baby showers, and other occasions. -
Cake-type filters, with examples such as tiered cakes, cupcakes, photo
cakes, and themed cakes.

These examples are a proposed starting point, not a confirmed complete
catalogue. The business must confirm actual products, categories,
options, and available services.

### 6.2 Working navigation name

**Our Creations** is the agreed working name for the cake
discovery/creation area. The overall page structure and final navigation
will be decided later, after the frontend foundation is complete.

Do not treat the complete page list or page structure as finalized in
this document.

## 7. Cart and Order-Request Requirements

### 7.1 Customer accounts

Customers must be able to submit order requests without creating an
account.

### 7.2 Multiple items in one request

Customers should be able to add multiple cake products to one cart and
submit them together as a single order request. For example, one request
may include a birthday cake and cupcakes.

### 7.3 Cart estimate and final pricing

-   The cart should show selected items, quantities, selected options
    where applicable, and an estimated subtotal.
-   The interface must clearly explain that the submitted amount is an
    estimate and that the final price is confirmed by staff.
-   Delivery fees, custom adjustments, and any other additional charges
    must be confirmed with the customer before the order is finalized.
-   Starting prices may be displayed only after the business confirms
    them.

### 7.4 Existing catalogue products

Customers should be able to select products from the catalogue and
choose from the options that the business actually supports. The
available option set must be confirmed before implementation.

### 7.5 Custom cake requests

Customers must have a route for requesting a custom cake design that is
not found in the catalogue.

-   Reference-image upload applies to custom cake requests, not standard
    catalogue products.
-   The request should collect the information needed for staff to
    understand the desired cake and contact the customer.
-   The business must confirm acceptable image formats, upload limits,
    and retention expectations before this feature is implemented.

### 7.6 Request details

The proposed request form may collect: - Customer name. - Phone
number. - Email address, if required by the business. - Occasion. -
Event date or required date. - Requested products, quantities, and
selected options. - Collection or delivery preference. - Delivery
location, when delivery is requested. - Special instructions. - A
reference image for a custom cake request only.

The final required fields and validation rules are pending business
review.

### 7.7 Collection and delivery

Customers should be able to request collection or delivery, subject to
the business's availability and service area.

The website must not promise delivery availability, delivery times, or
fixed delivery charges until the business confirms the relevant
policies.

### 7.8 Request is not confirmation

Submitting a request does **not** mean that the order is automatically
accepted or confirmed.

The intended workflow is:

1.  Customer submits an order request.
2.  The request is saved and becomes visible to authorized staff.
3.  Staff review the products, event date, options, fulfilment
    preference, and customer details.
4.  Staff contact the customer to discuss availability and any missing
    details.
5.  Staff and customer agree on the final price and fulfilment
    arrangements.
6.  Staff confirm the order after agreement.

The system must communicate this process clearly to customers.

## 8. Decoration Enquiries

Decoration services must receive equal prominence with cakes.

Customers need a way to enquire about event decoration services. The
final enquiry fields and workflow are pending discussion. Possible
information may include the event type, date, venue/location,
approximate requirements, contact details, and notes, but these should
not become mandatory fields until agreed.

Decoration enquiries should not be treated as confirmed bookings merely
because a customer submits a form.

## 9. Admin Portal Requirements

The admin portal will be part of the same React application as the
public website, but its routes and layout will be separated from the
public-facing experience.

The admin area must be private and accessible only to authenticated,
authorized staff.

At a minimum, the planned purpose is to allow staff to: - View incoming
order requests. - Review customer contact details and requested items. -
Review custom cake request details and any reference image. - Review
decoration enquiries. - Update request status as the business workflow
is agreed. - Contact customers to discuss availability, details, and
final pricing.

The exact staff roles, permissions, dashboard features, status
definitions, and catalogue-management capabilities remain to be
specified before implementation.

**Security requirement:** Hiding admin pages in React is not sufficient
protection. Laravel must authenticate requests and enforce authorization
on every protected API endpoint. Private customer information must not
be exposed through public API responses.

## 10. Backend and Data Responsibilities

Laravel will be responsible for: - Exposing the API consumed by the
React application. - Validating and normalizing incoming requests. -
Applying business rules and order-request workflow rules. -
Authenticating staff and authorizing protected operations. - Persisting
and retrieving data through MySQL. - Validating file uploads for custom
cake references. - Returning only data that the requesting user is
authorized to access.

MySQL will store the application's persistent data. The database schema,
entities, relationships, indexes, constraints, and migration strategy
will be designed and documented before they are implemented.

## 11. Scope Boundaries

The initial project is a public website and a straightforward
order/enquiry workflow with a staff dashboard.

The following are **not agreed as part of the initial scope** and must
not be added without discussion: - Customer account registration. -
Automatic order confirmation. - Complex payment-gateway integration. -
Inventory management. - Accounting or payroll. - A large enterprise
resource-planning system. - A separate admin frontend application.

This list records current scope boundaries; it does not prevent future
phases from being discussed and approved separately.

## 12. Quality and Security Requirements

The implementation should: - Be responsive across common screen sizes. -
Use reusable, maintainable components. - Provide clear loading, success,
empty, and error states for interactive features. - Validate inputs on
both frontend and backend, with Laravel as the authoritative validation
layer. - Protect staff authentication and all admin API endpoints. -
Store secrets and environment-specific configuration in environment
files, not in Git. - Exclude real credentials, customer personal
information, and production secrets from the repository. - Use Git
commits to track meaningful project changes. - Include appropriate
automated tests for critical backend rules and request workflows as
implementation progresses. - Verify accessibility, form usability, and
responsive behavior before release.

## 13. Development Approach

The agreed development approach is **frontend foundation first**.

The project should not jump directly into building all pages or
connecting every feature. First, establish the frontend foundation and
its standards. The overall page structure will be decided after the
frontend foundation is complete, as requested.

Before implementation begins: 1. Review and approve the project
documentation. 2. Mark unresolved business details as pending rather
than guessing. 3. Define the frontend foundation and its completion
criteria. 4. Confirm the required local development setup and compatible
dependency versions. 5. Keep frontend work aligned with the agreed
React, Vite, and Tailwind stack.

The Laravel backend and MySQL remain part of the agreed stack. Their
implementation will follow the agreed project sequence and will use
supported, patched software versions.

## 14. Pending Decisions and Verification

The following items need confirmation before the relevant features or
content are finalized:

-   Official business name styling and approved logo/assets.
-   Current contact details, location, service area, and opening hours.
-   Current product catalogue and actual cake types.
-   Occasion categories and available filters.
-   Current starting prices and how prices vary by size, flavour,
    design, or other options.
-   Supported cake flavours, sizes, servings, and customization choices.
-   Delivery area, fees, lead times, and availability rules.
-   Collection arrangements and opening hours.
-   Custom cake request details and reference-image upload rules.
-   Decoration service offerings, enquiry fields, and booking workflow.
-   Staff roles and admin permissions.
-   Order-request statuses and the exact confirmation process.
-   Privacy notice, terms, delivery policy, and customer-data retention
    requirements.
-   Whether payments may be considered in a later phase.
-   Final public page structure and navigation, to be discussed after
    the frontend foundation is complete.

## 15. Acceptance Criteria for This Document

This requirements document is ready to be treated as approved when: -
The user has reviewed the recorded decisions. - Incorrect or outdated
business information has been corrected or explicitly left pending. -
The user agrees that the scope and workflow reflect the intended first
release. - Unresolved decisions remain clearly marked rather than
silently assumed.

------------------------------------------------------------------------

## Reference

-   Existing website: https://mathew-mats.github.io/zuena-cakes-website/

**Note:** The existing website is a reference for currently displayed
business information. It is not the design specification for the new
website.
