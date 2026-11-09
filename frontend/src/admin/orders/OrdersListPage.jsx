import React, { useState, useEffect, useId } from 'react';
import {
  AdminPageHeader,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminDataTable,
  AdminEmptyState,
  AdminStatusBadge,
  AdminIcon,
} from '../components/ui';
import { fetchOrders, resetOrdersToDefault, clearAllOrders } from './ordersService';
import { ORDER_STATUS_OPTIONS, getOrderStatus } from './orderStatuses';

/**
 * Formats an ISO date string into standard British/Ugandan date format (e.g. "6 Nov 2026").
 *
 * @param {string} dateString
 * @returns {string}
 */
function formatDisplayDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Summarizes items in an order into a clean, concise single-line description.
 *
 * @param {Array<Object>} items
 * @returns {string}
 */
function getItemsSummary(items = []) {
  if (!items || items.length === 0) return 'No items recorded';
  const firstTitle = items[0].title || 'Cake creation';
  if (items.length === 1) {
    const qty = items[0].quantity || 1;
    return qty > 1 ? `${qty}× ${firstTitle}` : firstTitle;
  }
  return `${firstTitle} +${items.length - 1} more`;
}

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusFilterSelectId = useId();
  const sortSelectId = useId();

  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Synchronize when a new order is submitted from the public cart
  useEffect(() => {
    const handleOrdersUpdated = () => {
      setReloadTrigger((prev) => prev + 1);
    };
    window.addEventListener('storage', handleOrdersUpdated);
    window.addEventListener('zuena-orders-updated', handleOrdersUpdated);
    return () => {
      window.removeEventListener('storage', handleOrdersUpdated);
      window.removeEventListener('zuena-orders-updated', handleOrdersUpdated);
    };
  }, []);

  // Load orders using current filters
  useEffect(() => {
    let isCancelled = false;

    fetchOrders({
      search: searchTerm,
      status: statusFilter,
      sortBy,
    })
      .then((response) => {
        if (!isCancelled) {
          setOrders(response.data);
          setTotalCount(response.total);
          setIsLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err?.message || 'Failed to load customer orders. Please try again.');
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [searchTerm, statusFilter, sortBy, reloadTrigger]);

  const handleRetry = () => {
    setIsLoading(true);
    setReloadTrigger((prev) => prev + 1);
  };

  // Handle clearing all search and status filters
  const handleClearFilters = () => {
    setIsLoading(true);
    setSearchTerm('');
    setStatusFilter('all');
    setSortBy('newest');
  };

  // Reset to initial development sample orders
  const handleResetDemoData = async () => {
    setIsLoading(true);
    await resetOrdersToDefault();
    handleClearFilters();
    setReloadTrigger((prev) => prev + 1);
  };

  // Clear all records to verify empty state
  const handleClearAllData = async () => {
    setIsLoading(true);
    await clearAllOrders();
    setReloadTrigger((prev) => prev + 1);
  };

  const hasActiveFilters = Boolean(searchTerm.trim()) || statusFilter !== 'all' || sortBy !== 'newest';

  // Table column configuration conforming to project specifications
  const tableColumns = [
    { key: 'reference', label: 'Order Ref', width: '13%' },
    { key: 'customer', label: 'Customer', width: '18%' },
    { key: 'orderDate', label: 'Order Date', width: '13%' },
    { key: 'fulfilmentDate', label: 'Fulfilment', width: '16%' },
    { key: 'items', label: 'Items', width: '18%' },
    { key: 'total', label: 'Total (UGX)', width: '11%', align: 'right' },
    { key: 'status', label: 'Status', width: '11%', align: 'center' },
    { key: 'action', label: 'Action', width: '8%', align: 'right' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading & Actions */}
      <AdminPageHeader
        eyebrow="Orders Management"
        title="Orders"
        subtitle="View and manage customer cake orders."
        actions={
          <div className="flex items-center gap-2">
            {/* Development Data Helpers for Empty-State & Reset Verification */}
            <AdminButton
              variant="ghost"
              size="sm"
              onClick={handleResetDemoData}
              title="Restore demo customer orders in local storage"
            >
              Reset Demo
            </AdminButton>
            <AdminButton
              variant="ghost"
              size="sm"
              onClick={handleClearAllData}
              title="Clear all orders in local storage to test empty state"
            >
              Clear All
            </AdminButton>
          </div>
        }
      />

      {/* Search & Filter Toolbar */}
      <div className="bg-[#191614] border border-white/10 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
          {/* Search Input: Order Ref or Customer Name */}
          <div className="sm:col-span-6">
            <AdminInput
              label="Search Orders"
              placeholder="Search by order ref or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon="search"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <AdminSelect
              id={statusFilterSelectId}
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={ORDER_STATUS_OPTIONS}
            />
          </div>

          {/* Sort Order */}
          <div className="sm:col-span-3">
            <AdminSelect
              id={sortSelectId}
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: 'newest', label: 'Newest First' },
                { value: 'oldest', label: 'Oldest First' },
                { value: 'price-high', label: 'Amount: High to Low' },
                { value: 'price-low', label: 'Amount: Low to High' },
              ]}
            />
          </div>
        </div>

        {/* Active Filter Clear Helper */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-stone-400 font-sans">
              Showing <strong className="text-white font-mono">{totalCount}</strong> matching order{totalCount === 1 ? '' : 's'}
            </span>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[#DEAC4B] hover:text-[#FBD46D] underline font-mono text-[11px] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Error State with Retry Action */}
      {error && (
        <div
          role="alert"
          className="border border-rose-500/40 bg-rose-950/20 rounded-lg p-4 text-xs text-rose-300 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <AdminIcon name="alert" size={16} className="text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <AdminButton variant="secondary" size="sm" onClick={handleRetry}>
            Retry
          </AdminButton>
        </div>
      )}

      {/* Restrained Loading State */}
      {isLoading ? (
        <div className="border border-white/10 bg-[#161311] rounded p-12 text-center text-xs text-stone-400 font-sans flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#DEAC4B] animate-ping" />
          <span>Loading orders...</span>
        </div>
      ) : (
        /* Orders Data Table */
        <AdminDataTable
          columns={tableColumns}
          data={orders}
          emptyState={
            hasActiveFilters ? (
              <AdminEmptyState
                icon="search"
                title="No matching orders found"
                description="No customer orders match your current search and filter criteria. Try searching with a different keyword or resetting the status filter."
                action={
                  <AdminButton variant="secondary" size="sm" onClick={handleClearFilters}>
                    Clear Filters
                  </AdminButton>
                }
              />
            ) : (
              <AdminEmptyState
                icon="orders"
                title="No orders yet"
                description="No customer orders have been placed yet. Orders submitted through the public catalogue cart will appear here."
                action={
                  <AdminButton variant="secondary" size="sm" onClick={handleResetDemoData}>
                    Load Sample Orders
                  </AdminButton>
                }
              />
            )
          }
          renderRow={(order) => {
            const statusConfig = getOrderStatus(order.status);
            const formattedTotal = order.estimatedTotalUGX
              ? `UGX ${order.estimatedTotalUGX.toLocaleString()}`
              : '—';
            const isDelivery = order.fulfilment?.method === 'delivery';

            return (
              <tr
                key={order.id}
                className="hover:bg-white/5 transition-colors divide-x divide-transparent"
              >
                {/* 1. Order Reference */}
                <td className="px-4 py-3.5 font-mono text-xs font-semibold text-[#DEAC4B] whitespace-nowrap">
                  {order.reference}
                </td>

                {/* 2. Customer Name & Phone */}
                <td className="px-4 py-3.5 text-xs text-stone-200">
                  <div className="font-medium text-white truncate max-w-[180px]">
                    {order.customer?.name || 'Anonymous Customer'}
                  </div>
                  {order.customer?.phone && (
                    <div className="font-mono text-[10px] text-stone-400 mt-0.5">
                      {order.customer.phone}
                    </div>
                  )}
                </td>

                {/* 3. Order Placement Date */}
                <td className="px-4 py-3.5 text-xs text-stone-300 font-sans whitespace-nowrap">
                  {formatDisplayDate(order.orderDate)}
                </td>

                {/* 4. Fulfilment Date & Method */}
                <td className="px-4 py-3.5 text-xs text-stone-300 whitespace-nowrap">
                  <div className="font-sans">
                    {formatDisplayDate(order.fulfilment?.date)}
                  </div>
                  <div className="mt-0.5">
                    <span
                      className={`inline-block font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                        isDelivery
                          ? 'text-sky-300 bg-sky-950/40 border-sky-800/40'
                          : 'text-stone-300 bg-stone-800/50 border-stone-700/50'
                      }`}
                    >
                      {isDelivery ? 'Delivery' : 'Collection'}
                    </span>
                  </div>
                </td>

                {/* 5. Order Type & Items Summary */}
                <td className="px-4 py-3.5 text-xs text-stone-300">
                  <div
                    className="truncate max-w-[220px] font-sans"
                    title={getItemsSummary(order.items)}
                  >
                    {getItemsSummary(order.items)}
                  </div>
                  {order.occasion && (
                    <div className="text-[10px] text-stone-400 font-sans mt-0.5 truncate max-w-[220px]">
                      {order.occasion}
                    </div>
                  )}
                </td>

                {/* 6. Estimated Total */}
                <td className="px-4 py-3.5 text-xs font-mono text-stone-200 text-right whitespace-nowrap">
                  <div className="font-medium text-[#EFC767]">{formattedTotal}</div>
                  {order.isEstimate && (
                    <div className="text-[9px] text-stone-400 font-sans">Estimate</div>
                  )}
                </td>

                {/* 7. Status Badge */}
                <td className="px-4 py-3.5 text-center whitespace-nowrap">
                  <AdminStatusBadge tone={statusConfig.tone}>
                    {statusConfig.label}
                  </AdminStatusBadge>
                </td>

                {/* 8. Row Action: View */}
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <AdminButton
                    to={`/admin/orders/${order.id}`}
                    variant="ghost"
                    size="sm"
                    className="border-stone-800 hover:border-[#DEAC4B]/40 text-[#DEAC4B]"
                    ariaLabel={`View order ${order.reference}`}
                  >
                    View
                  </AdminButton>
                </td>
              </tr>
            );
          }}
        />
      )}
    </div>
  );
}
