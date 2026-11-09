/**
 * Orders Data Service & Adapter
 *
 * Provides a clean abstraction layer between the Orders UI components
 * and the order data store.
 *
 * In this frontend-first development phase (Phase 4), this adapter reads from
 * and writes to browser `localStorage` using the isolated seed dataset from `mockOrders.js`.
 *
 * When the Laravel REST API backend is implemented in Phase 7/8, this file
 * is the single replacement boundary for switching to live HTTP/Axios endpoints
 * (`/api/v1/admin/orders`) with ZERO modifications to the Orders UI views or tables.
 */

import { INITIAL_MOCK_ORDERS } from './mockOrders.js';
import { ORDER_STATUSES } from './orderStatuses.js';

const ORDERS_STORAGE_KEY = 'zuena_admin_orders';

let memoryOrders = null;

/**
 * Load raw orders array from localStorage, initializing with seed data if uninitialized.
 * If empty array was explicitly stored, it preserves the empty state.
 *
 * @returns {Array<Object>}
 */
function getRawOrders() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    if (memoryOrders === null) {
      memoryOrders = [...INITIAL_MOCK_ORDERS];
    }
    return memoryOrders;
  }

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
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
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ORDERS));
  } catch {
    // Safeguard for restricted storage
  }

  return INITIAL_MOCK_ORDERS;
}

/**
 * Save orders array to localStorage or memory store.
 *
 * @param {Array<Object>} orders
 */
function saveRawOrders(orders) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    memoryOrders = [...orders];
    return;
  }

  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Safeguard for quota or private mode
  }
}

/**
 * Fetch orders list with search, status filtering, and sorting.
 * Returns a Promise to simulate asynchronous network request behavior.
 *
 * @param {Object} [params]
 * @param {string} [params.search=''] - Search query (matches ref, name, phone, or items)
 * @param {string} [params.status='all'] - Status filter key
 * @param {string} [params.sortBy='newest'] - Sort order: 'newest' | 'oldest' | 'price-high' | 'price-low'
 * @returns {Promise<{ data: Array<Object>, total: number }>}
 */
export async function fetchOrders({ search = '', status = 'all', sortBy = 'newest' } = {}) {
  // Simulate standard network latency for smooth, restrained loading state
  await new Promise((resolve) => setTimeout(resolve, 120));

  const allOrders = getRawOrders();
  const normalizedSearch = (search || '').trim().toLowerCase();

  let filtered = allOrders.filter((order) => {
    // 1. Status Filter
    if (status && status !== 'all' && order.status !== status) {
      return false;
    }

    // 2. Search Query (order ref, customer name, phone, occasion, or item names)
    if (normalizedSearch) {
      const matchesRef = (order.reference || '').toLowerCase().includes(normalizedSearch);
      const matchesCustomer = (order.customer?.name || '').toLowerCase().includes(normalizedSearch);
      const matchesPhone = (order.customer?.phone || '').toLowerCase().includes(normalizedSearch);
      const matchesOccasion = (order.occasion || '').toLowerCase().includes(normalizedSearch);
      const matchesItems = (order.items || []).some((item) =>
        (item.title || '').toLowerCase().includes(normalizedSearch)
      );

      return matchesRef || matchesCustomer || matchesPhone || matchesOccasion || matchesItems;
    }

    return true;
  });

  // Sort results
  filtered.sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.orderDate) - new Date(b.orderDate);
    }
    if (sortBy === 'price-high') {
      return (b.estimatedTotalUGX || 0) - (a.estimatedTotalUGX || 0);
    }
    if (sortBy === 'price-low') {
      return (a.estimatedTotalUGX || 0) - (b.estimatedTotalUGX || 0);
    }
    // Default: 'newest'
    return new Date(b.orderDate) - new Date(a.orderDate);
  });

  return {
    data: filtered,
    total: filtered.length,
  };
}

/**
 * Fetch a single order by its ID or reference number.
 *
 * @param {string} orderIdOrRef
 * @returns {Promise<Object|null>}
 */
export async function fetchOrderById(orderIdOrRef) {
  await new Promise((resolve) => setTimeout(resolve, 90));

  if (!orderIdOrRef) return null;

  const target = String(orderIdOrRef).trim().toLowerCase();
  const allOrders = getRawOrders();

  const found = allOrders.find(
    (order) =>
      String(order.id).toLowerCase() === target ||
      String(order.reference).toLowerCase() === target
  );

  return found ? { ...found } : null;
}

/**
 * Update the status of an existing order.
 *
 * @param {string} orderIdOrRef
 * @param {string} newStatus
 * @returns {Promise<Object>}
 */
export async function updateOrderStatus(orderIdOrRef, newStatus) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  if (!ORDER_STATUSES[newStatus]) {
    throw new Error(`Invalid status "${newStatus}". Must be one of: ${Object.keys(ORDER_STATUSES).join(', ')}`);
  }

  const target = String(orderIdOrRef).trim().toLowerCase();
  const allOrders = getRawOrders();

  const orderIndex = allOrders.findIndex(
    (order) =>
      String(order.id).toLowerCase() === target ||
      String(order.reference).toLowerCase() === target
  );

  if (orderIndex === -1) {
    throw new Error(`Order with identifier "${orderIdOrRef}" was not found.`);
  }

  const updatedOrder = {
    ...allOrders[orderIndex],
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [...allOrders];
  updatedList[orderIndex] = updatedOrder;

  saveRawOrders(updatedList);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('zuena-orders-updated'));
  }

  return updatedOrder;
}

/**
 * Create a new customer order from a public cart submission.
 * Saves the order to persistent localStorage store so it appears
 * immediately in the admin orders table.
 *
 * @param {Object} orderPayload
 * @param {Array<Object>} orderPayload.items
 * @param {number} orderPayload.totalUGX
 * @param {Object} [orderPayload.customer]
 * @param {string} [orderPayload.occasion]
 * @param {Object} [orderPayload.fulfilment]
 * @param {string} [orderPayload.notes]
 * @returns {Promise<Object>} The created order record
 */
export async function createOrder(orderPayload = {}) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  const allOrders = getRawOrders();
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const reference = `ORD-${year}-${randomSuffix}`;
  const id = `ord-${Date.now()}`;

  const items = Array.isArray(orderPayload.items) ? orderPayload.items : [];
  const subtotal = orderPayload.totalUGX || items.reduce((sum, it) => sum + (it.priceUGX || 0) * (it.quantity || 1), 0);

  const newOrder = {
    id,
    reference,
    orderDate: new Date().toISOString(),
    status: 'pending',
    customer: {
      name: orderPayload.customer?.name?.trim() || 'Valued Client',
      phone: orderPayload.customer?.phone?.trim() || '+256 700 000 000',
      email: orderPayload.customer?.email?.trim() || 'client@zuena.co.ug',
    },
    occasion: orderPayload.occasion?.trim() || 'Celebration',
    fulfilment: {
      method: orderPayload.fulfilment?.method || 'delivery',
      date: orderPayload.fulfilment?.date || '',
      time: orderPayload.fulfilment?.time || '',
      address: orderPayload.fulfilment?.address?.trim() || 'Kampala, Uganda',
      notes: orderPayload.fulfilment?.notes?.trim() || '',
    },
    items: items.map((item, idx) => ({
      id: item.id || `ord-item-${idx + 1}`,
      productId: item.productId || '',
      slug: item.slug || '',
      title: item.title || 'Custom Cake',
      tierCount: item.tierCount || 1,
      tierLabel: item.tierLabel || `${item.tierCount || 1} Tiers`,
      guests: item.guests || '',
      flavor: item.flavor || 'Madagascar Bourbon Vanilla',
      specialNote: item.specialNote || '',
      quantity: item.quantity || 1,
      priceUGX: item.priceUGX || 0,
      priceFormatted: item.priceFormatted || `UGX ${(item.priceUGX || 0).toLocaleString()}`,
    })),
    notes: orderPayload.notes?.trim() || '',
    estimatedSubtotalUGX: subtotal,
    deliveryFeeUGX: 0,
    estimatedTotalUGX: subtotal,
    isEstimate: true,
  };

  const updatedList = [newOrder, ...allOrders];
  saveRawOrders(updatedList);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('zuena-orders-updated'));
  }

  return newOrder;
}

/**
 * Reset orders in localStorage back to the initial development seed.
 * Useful for development and verification testing.
 *
 * @returns {Promise<Array<Object>>}
 */
export async function resetOrdersToDefault() {
  saveRawOrders(INITIAL_MOCK_ORDERS);
  return [...INITIAL_MOCK_ORDERS];
}

/**
 * Clear all orders in localStorage to test the "No orders yet" empty state.
 *
 * @returns {Promise<Array<Object>>}
 */
export async function clearAllOrders() {
  saveRawOrders([]);
  return [];
}

/**
 * Get aggregated order counts for the Overview workspace or dashboard.
 * Conforms to `OverviewDataContract` in `docs/ADMIN_FRONTEND_FOUNDATION.md`.
 *
 * @returns {{ totalOrders: number, pendingCount: number, confirmedCount: number, inProductionCount: number }}
 */
export function getOrderStats() {
  const allOrders = getRawOrders();
  return {
    totalOrders: allOrders.length,
    pendingCount: allOrders.filter((o) => o.status === 'pending').length,
    confirmedCount: allOrders.filter((o) => o.status === 'confirmed').length,
    inProductionCount: allOrders.filter((o) => o.status === 'in_production').length,
  };
}

/**
 * Get formatted recent orders submissions for the Overview workspace.
 * Conforms to `OverviewDataContract.recentSubmissions` in `docs/ADMIN_FRONTEND_FOUNDATION.md`.
 *
 * @param {number} [limit=5]
 * @returns {Array<{ date: string, reference: string, type: string, customer: string }>}
 */
export function getRecentOrdersForOverview(limit = 5) {
  const allOrders = getRawOrders();
  const sorted = [...allOrders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return sorted.slice(0, limit).map((order) => {
    const d = new Date(order.orderDate);
    const dateFormatted = d.toISOString().split('T')[0];
    return {
      date: dateFormatted,
      reference: order.reference,
      type: 'Order',
      customer: order.customer?.name || 'Customer',
    };
  });
}
