/**
 * Admin portal primary navigation configuration.
 * Defines the core routes, labels, icons, and module descriptions
 * for the Zuena Cakes & Decor administration workspace.
 */
export const ADMIN_NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/admin/overview',
    icon: 'overview',
    description: 'Operational summary and quick navigation',
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: 'orders',
    description: 'Standard cake orders and fulfillment management',
  },
  {
    id: 'custom-cake-requests',
    label: 'Custom Cake Requests',
    path: '/admin/custom-cake-requests',
    icon: 'cake',
    description: 'Custom celebration and wedding cake inquiries',
  },
  {
    id: 'decoration-enquiries',
    label: 'Decoration Enquiries',
    path: '/admin/decoration-enquiries',
    icon: 'decor',
    description: 'Event and venue decoration service requests',
  },
  {
    id: 'catalogue',
    label: 'Catalogue',
    path: '/admin/catalogue',
    icon: 'catalogue',
    description: 'Product catalogue, tiers, and pricing management',
  },
];

