/**
 * Order Status Definitions
 *
 * PROVISIONAL: These status definitions reflect the current operational workflow
 * documented in `docs/PROJECT_REQUIREMENTS.md` (Section 7.8). They are working proposals
 * pending final business verification and client sign-off.
 *
 * All status values are strictly isolated here so lifecycle adjustments can be made
 * in Phase 7/8 without rewriting the Orders UI or table components.
 */

export const ORDER_STATUSES = {
  pending: {
    value: 'pending',
    label: 'Pending Review',
    tone: 'amber',
    description: 'New order request received; awaiting staff review and customer contact.',
  },
  confirmed: {
    value: 'confirmed',
    label: 'Confirmed',
    tone: 'gold',
    description: 'Staff and customer have agreed on details, date, and final pricing.',
  },
  in_production: {
    value: 'in_production',
    label: 'In Production',
    tone: 'purple',
    description: 'Cake is currently being baked, assembled, or decorated in the atelier.',
  },
  ready: {
    value: 'ready',
    label: 'Ready',
    tone: 'blue',
    description: 'Finished cake is packaged and ready for collection or courier dispatch.',
  },
  completed: {
    value: 'completed',
    label: 'Completed',
    tone: 'green',
    description: 'Order has been successfully collected or delivered to the customer.',
  },
  cancelled: {
    value: 'cancelled',
    label: 'Cancelled',
    tone: 'red',
    description: 'Order request was declined, abandoned, or cancelled.',
  },
};

/**
 * Filter options for the Orders list status dropdown.
 */
export const ORDER_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  ...Object.values(ORDER_STATUSES).map((status) => ({
    value: status.value,
    label: status.label,
  })),
];

/**
 * Update options for changing status in Order Detail.
 */
export const ORDER_STATUS_UPDATE_OPTIONS = Object.values(ORDER_STATUSES).map((status) => ({
  value: status.value,
  label: status.label,
}));

/**
 * Safe status descriptor resolver.
 * Falls back gracefully if an unrecognized status string is encountered.
 *
 * @param {string} statusKey
 * @returns {{ value: string, label: string, tone: string, description: string }}
 */
export function getOrderStatus(statusKey) {
  if (ORDER_STATUSES[statusKey]) {
    return ORDER_STATUSES[statusKey];
  }

  return {
    value: statusKey || 'unknown',
    label: statusKey ? statusKey.replace(/_/g, ' ') : 'Unknown',
    tone: 'gray',
    description: 'Unrecognized status value.',
  };
}

