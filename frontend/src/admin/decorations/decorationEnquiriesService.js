/**
 * Decoration Enquiries Data Service & Adapter
 *
 * Provides a clean abstraction layer between the Decoration Enquiries UI
 * components and the storage layer.
 *
 * In this frontend-first development phase (Phase 4), this adapter reads from
 * and writes to browser `localStorage` using the seed dataset from `mockDecorationEnquiries.js`.
 *
 * When the Laravel REST API backend is implemented in Phase 7/8, this file
 * is the single replacement boundary for switching to live HTTP endpoints
 * (`/api/v1/admin/decoration-enquiries`) with zero modifications to the UI views.
 */

import { INITIAL_MOCK_DECORATION_ENQUIRIES } from './mockDecorationEnquiries.js';
import { DECORATION_STATUSES } from './decorationStatuses.js';

const DECORATION_ENQUIRIES_STORAGE_KEY = 'zuena_admin_decoration_enquiries';

let memoryEnquiries = null;

/**
 * Load raw enquiries array from localStorage, initializing with seed data if uninitialized.
 *
 * @returns {Array<Object>}
 */
function getRawEnquiries() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    if (memoryEnquiries === null) {
      memoryEnquiries = [...INITIAL_MOCK_DECORATION_ENQUIRIES];
    }
    return memoryEnquiries;
  }

  try {
    const raw = localStorage.getItem(DECORATION_ENQUIRIES_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Fallback if localStorage read fails
  }

  // First-time initialization
  try {
    localStorage.setItem(
      DECORATION_ENQUIRIES_STORAGE_KEY,
      JSON.stringify(INITIAL_MOCK_DECORATION_ENQUIRIES)
    );
  } catch {
    // Safeguard for restricted storage
  }

  return INITIAL_MOCK_DECORATION_ENQUIRIES;
}

/**
 * Save enquiries array to localStorage or memory store.
 * Dispatches cross-window and in-window events to keep components reactive.
 *
 * @param {Array<Object>} enquiries
 */
function saveRawEnquiries(enquiries) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    memoryEnquiries = [...enquiries];
    return;
  }

  try {
    localStorage.setItem(DECORATION_ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    window.dispatchEvent(new CustomEvent('zuena-decorations-updated'));
  } catch {
    // Safeguard for quota or private mode
  }
}

/**
 * Fetch decoration enquiries list with search, status filtering, occasion filtering, and sorting.
 *
 * @param {Object} [params]
 * @param {string} [params.search=''] - Search query (matches ref, name, phone, email, or venue)
 * @param {string} [params.status='all'] - Status filter key
 * @param {string} [params.occasion='all'] - Occasion filter key
 * @param {string} [params.sortBy='newest'] - Sort order: 'newest' | 'oldest' | 'event-date'
 * @returns {Promise<{ data: Array<Object>, total: number }>}
 */
export async function fetchDecorationEnquiries({
  search = '',
  status = 'all',
  occasion = 'all',
  sortBy = 'newest',
} = {}) {
  // Simulate standard network latency for smooth UI feedback
  await new Promise((resolve) => setTimeout(resolve, 100));

  const allEnquiries = getRawEnquiries();
  const normalizedSearch = (search || '').trim().toLowerCase();

  let filtered = allEnquiries.filter((item) => {
    // 1. Status Filter
    if (status && status !== 'all' && item.status !== status) {
      return false;
    }

    // 2. Occasion Filter
    if (occasion && occasion !== 'all' && item.occasion !== occasion) {
      return false;
    }

    // 3. Search Query
    if (normalizedSearch) {
      const matchRef = (item.reference || '').toLowerCase().includes(normalizedSearch);
      const matchName = (item.customer?.name || '').toLowerCase().includes(normalizedSearch);
      const matchPhone = (item.customer?.phone || '').toLowerCase().includes(normalizedSearch);
      const matchVenue = (item.venueLocation || '').toLowerCase().includes(normalizedSearch);
      const matchDiscipline = (item.stylingDiscipline || '').toLowerCase().includes(normalizedSearch);
      const matchStyle = (item.prefilledStyle || '').toLowerCase().includes(normalizedSearch);

      if (!matchRef && !matchName && !matchPhone && !matchVenue && !matchDiscipline && !matchStyle) {
        return false;
      }
    }

    return true;
  });

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.submissionDate || 0) - new Date(b.submissionDate || 0);
    }
    if (sortBy === 'event-date') {
      return new Date(a.eventDate || '2099-01-01') - new Date(b.eventDate || '2099-01-01');
    }
    // Default: 'newest' submission first
    return new Date(b.submissionDate || 0) - new Date(a.submissionDate || 0);
  });

  return {
    data: filtered,
    total: filtered.length,
  };
}

/**
 * Fetch a single decoration enquiry by its primary reference or ID.
 *
 * @param {string} enquiryId - Enquiry ref (e.g. 'DEC-2026-0001') or id ('dec-2026-0001')
 * @returns {Promise<Object|null>}
 */
export async function fetchDecorationEnquiryById(enquiryId) {
  await new Promise((resolve) => setTimeout(resolve, 80));

  if (!enquiryId) return null;
  const normalized = String(enquiryId).trim().toLowerCase();
  const allEnquiries = getRawEnquiries();

  const found = allEnquiries.find(
    (item) =>
      (item.id && item.id.toLowerCase() === normalized) ||
      (item.reference && item.reference.toLowerCase() === normalized)
  );

  return found ? JSON.parse(JSON.stringify(found)) : null;
}

/**
 * Update the status and optionally staff notes of a decoration enquiry.
 *
 * @param {string} enquiryId
 * @param {string} newStatus
 * @param {string} [staffNotes]
 * @returns {Promise<Object>}
 */
export async function updateDecorationEnquiryStatus(enquiryId, newStatus, staffNotes) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  if (!DECORATION_STATUSES[newStatus]) {
    throw new Error(`Invalid status key: "${newStatus}"`);
  }

  const allEnquiries = getRawEnquiries();
  const normalized = String(enquiryId).trim().toLowerCase();
  const targetIndex = allEnquiries.findIndex(
    (item) =>
      (item.id && item.id.toLowerCase() === normalized) ||
      (item.reference && item.reference.toLowerCase() === normalized)
  );

  if (targetIndex === -1) {
    throw new Error(`Decoration enquiry with identifier "${enquiryId}" not found.`);
  }

  const existing = allEnquiries[targetIndex];
  const updated = {
    ...existing,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  if (typeof staffNotes === 'string') {
    updated.staffNotes = staffNotes;
  }

  allEnquiries[targetIndex] = updated;
  saveRawEnquiries(allEnquiries);

  return updated;
}

/**
 * Update staff notes and checklist items for an enquiry.
 *
 * @param {string} enquiryId
 * @param {Object} payload
 * @param {string} [payload.staffNotes]
 * @param {Object} [payload.checklist]
 * @returns {Promise<Object>}
 */
export async function updateDecorationEnquiryDetails(enquiryId, { staffNotes, checklist }) {
  await new Promise((resolve) => setTimeout(resolve, 120));

  const allEnquiries = getRawEnquiries();
  const normalized = String(enquiryId).trim().toLowerCase();
  const targetIndex = allEnquiries.findIndex(
    (item) =>
      (item.id && item.id.toLowerCase() === normalized) ||
      (item.reference && item.reference.toLowerCase() === normalized)
  );

  if (targetIndex === -1) {
    throw new Error(`Decoration enquiry with identifier "${enquiryId}" not found.`);
  }

  const existing = allEnquiries[targetIndex];
  const updated = {
    ...existing,
    updatedAt: new Date().toISOString(),
  };

  if (typeof staffNotes === 'string') {
    updated.staffNotes = staffNotes;
  }

  if (checklist && typeof checklist === 'object') {
    updated.checklist = {
      ...(existing.checklist || {}),
      ...checklist,
    };
  }

  allEnquiries[targetIndex] = updated;
  saveRawEnquiries(allEnquiries);

  return updated;
}

/**
 * Save a new decoration enquiry submitted from the public consultation form.
 *
 * @param {Object} formData
 * @returns {Promise<Object>}
 */
export async function createDecorationEnquiry(formData) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const allEnquiries = getRawEnquiries();
  const nextSeq = allEnquiries.length + 1;
  const padSeq = String(nextSeq).padStart(4, '0');
  const reference = `DEC-${new Date().getFullYear()}-${padSeq}`;
  const id = reference.toLowerCase();

  const newRecord = {
    id,
    reference,
    submissionDate: new Date().toISOString(),
    status: 'new',
    customer: {
      name: formData.customerName || 'Valued Client',
      phone: formData.phone || '',
      email: formData.email || '',
    },
    occasion: formData.occasion || 'Wedding Reception',
    eventDate: formData.eventDate || '',
    venueLocation: formData.venueLocation || '',
    guestCount: formData.guestCount || '',
    stylingDiscipline: formData.stylingDiscipline || 'Full-Venue Styling (Complete Room Transformation)',
    prefilledStyle: formData.prefilledStyle || '',
    preferredPalette: formData.preferredPalette || '',
    notes: formData.notes || '',
    staffNotes: '',
    checklist: {
      siteVisitScheduled: false,
      moodboardPrepared: false,
      cakeTeamNotified: false,
      proposalDelivered: false,
      contractSigned: false,
    },
  };

  const updatedList = [newRecord, ...allEnquiries];
  saveRawEnquiries(updatedList);

  return newRecord;
}

/**
 * Reset enquiries store to initial mock development records.
 *
 * @returns {Promise<Array<Object>>}
 */
export async function resetDecorationEnquiriesToDefault() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  saveRawEnquiries(INITIAL_MOCK_DECORATION_ENQUIRIES);
  return INITIAL_MOCK_DECORATION_ENQUIRIES;
}

/**
 * Clear all enquiries (for testing empty states).
 *
 * @returns {Promise<Array<Object>>}
 */
export async function clearAllDecorationEnquiries() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  saveRawEnquiries([]);
  return [];
}

/**
 * Get synchronous count totals for admin dashboard metrics.
 *
 * @returns {{ total: number, newCount: number, consultationCount: number, bookedCount: number }}
 */
export function getDecorationEnquiriesStats() {
  const enquiries = getRawEnquiries();
  return {
    total: enquiries.length,
    newCount: enquiries.filter((e) => e.status === 'new').length,
    consultationCount: enquiries.filter((e) => e.status === 'consultation').length,
    bookedCount: enquiries.filter((e) => e.status === 'booked').length,
  };
}
