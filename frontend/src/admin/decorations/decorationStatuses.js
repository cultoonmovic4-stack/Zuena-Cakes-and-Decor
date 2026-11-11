/**
 * Decoration Enquiry Status Definitions
 *
 * PROVISIONAL: These status definitions reflect the event decoration lifecycle
 * documented in `docs/PROJECT_REQUIREMENTS.md` (Section 8) and `docs/ADMIN_FRONTEND_FOUNDATION.md`.
 * Submitting an enquiry does not mean a confirmed booking until review and agreement.
 *
 * All status values are strictly isolated here so lifecycle adjustments can be made
 * without rewriting UI views or data tables.
 */

export const DECORATION_STATUSES = {
  new: {
    value: 'new',
    label: 'New Submission',
    tone: 'amber',
    description: 'Enquiry received; pending lead stylist review and customer contact.',
  },
  consultation: {
    value: 'consultation',
    label: 'Consultation Scheduled',
    tone: 'purple',
    description: 'In-person studio moodboard review or venue walkthrough scheduled with the client.',
  },
  proposal_sent: {
    value: 'proposal_sent',
    label: 'Proposal Sent',
    tone: 'blue',
    description: 'Tailored stage, drapery, floral concept, and cost estimate sent to the client.',
  },
  booked: {
    value: 'booked',
    label: 'Booked & Confirmed',
    tone: 'gold',
    description: 'Event date secured on calendar; styling contract and booking advance agreed.',
  },
  completed: {
    value: 'completed',
    label: 'Completed',
    tone: 'green',
    description: 'Event successfully staged, supported on-site, and struck post-event.',
  },
  cancelled: {
    value: 'cancelled',
    label: 'Closed / Cancelled',
    tone: 'red',
    description: 'Enquiry declined, calendar date unavailable, or cancelled by client.',
  },
};

/**
 * Filter options for the Decoration Enquiries list status dropdown.
 */
export const DECORATION_STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  ...Object.values(DECORATION_STATUSES).map((status) => ({
    value: status.value,
    label: status.label,
  })),
];

/**
 * Update options for changing status in Enquiry Detail view.
 */
export const DECORATION_STATUS_UPDATE_OPTIONS = Object.values(DECORATION_STATUSES).map((status) => ({
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
export function getDecorationStatus(statusKey) {
  if (DECORATION_STATUSES[statusKey]) {
    return DECORATION_STATUSES[statusKey];
  }

  return {
    value: statusKey || 'unknown',
    label: statusKey ? statusKey.replace(/_/g, ' ') : 'Unknown',
    tone: 'gray',
    description: 'Unrecognized status value.',
  };
}

/**
 * Occasion filter options matching public form choices.
 */
export const OCCASION_FILTER_OPTIONS = [
  { value: 'all', label: 'All Occasions' },
  { value: 'Wedding Reception', label: 'Wedding Reception' },
  { value: 'Kwanjula / Introduction', label: 'Kwanjula / Introduction' },
  { value: 'Milestone Celebration', label: 'Milestone Celebration' },
  { value: 'Full-Venue Styling', label: 'Full-Venue Styling' },
  { value: 'Corporate Gala', label: 'Corporate Gala' },
];
