import React, { useState, useEffect, useId } from 'react';
import { useParams } from 'react-router';
import {
  AdminButton,
  AdminStatusBadge,
  AdminSelect,
  AdminEmptyState,
  AdminIcon,
} from '../components/ui';
import { fetchOrderById, updateOrderStatus } from './ordersService';
import {
  ORDER_STATUS_UPDATE_OPTIONS,
  getOrderStatus,
} from './orderStatuses';

/**
 * Formats an ISO date string into readable British/Ugandan format with time.
 * Example: "6 Nov 2026, 15:24"
 *
 * @param {string} dateString
 * @returns {string}
 */
function formatFullDateTime(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Formats date without time (e.g. "Saturday, 14 Nov 2026").
 *
 * @param {string} dateString
 * @returns {string}
 */
function formatLongDate(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status management state
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(null);

  const statusSelectId = useId();

  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    fetchOrderById(orderId)
      .then((data) => {
        if (!isCancelled) {
          if (data) {
            setOrder(data);
            setSelectedStatus(data.status);
          } else {
            setOrder(null);
          }
          setIsLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err?.message || 'Failed to load order details.');
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [orderId, reloadTrigger]);

  const handleRetry = () => {
    setIsLoading(true);
    setReloadTrigger((prev) => prev + 1);
  };

  // Handle status update
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    if (!newStatus || newStatus === order?.status) return;

    setIsUpdatingStatus(true);
    setStatusFeedback(null);
    try {
      const updated = await updateOrderStatus(order.id, newStatus);
      setOrder(updated);
      setStatusFeedback({
        type: 'success',
        message: `Status updated to "${getOrderStatus(newStatus).label}".`,
      });
      setTimeout(() => setStatusFeedback(null), 4000);
    } catch (err) {
      setStatusFeedback({
        type: 'error',
        message: err?.message || 'Failed to update order status.',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <AdminButton to="/admin/orders" variant="ghost" size="sm" icon="arrow-left">
            Back to Orders
          </AdminButton>
        </div>
        <div className="border border-white/10 bg-[#161311] rounded p-12 text-center text-xs text-stone-400 font-sans flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#DEAC4B] animate-ping" />
          <span>Loading order details...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <AdminButton to="/admin/orders" variant="ghost" size="sm" icon="arrow-left">
            Back to Orders
          </AdminButton>
        </div>
        <div
          role="alert"
          className="border border-rose-500/40 bg-rose-950/20 rounded-lg p-6 text-center space-y-3"
        >
          <p className="text-sm text-rose-300 font-sans">{error}</p>
          <AdminButton variant="secondary" size="sm" onClick={handleRetry}>
            Retry Loading
          </AdminButton>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <AdminButton to="/admin/orders" variant="ghost" size="sm" icon="arrow-left">
            Back to Orders
          </AdminButton>
        </div>
        <AdminEmptyState
          icon="orders"
          title="Order Not Found"
          description={`The order reference "${orderId}" could not be found. It may have been removed or does not exist.`}
          action={
            <AdminButton to="/admin/orders" variant="secondary" size="sm">
              Return to Orders List
            </AdminButton>
          }
        />
      </div>
    );
  }

  const currentStatusConfig = getOrderStatus(order.status);
  const isDelivery = order.fulfilment?.method === 'delivery';

  return (
    <div className="space-y-8">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <AdminButton
            to="/admin/orders"
            variant="ghost"
            size="sm"
            icon="arrow-left"
            className="text-stone-300 hover:text-white"
          >
            Back to Orders
          </AdminButton>
          <span className="text-stone-600 font-mono text-xs select-none">/</span>
          <span className="font-mono text-xs font-semibold text-[#DEAC4B]">
            {order.reference}
          </span>
        </div>

        {/* Current Status Indicator */}
        <div className="flex items-center gap-2">
          <AdminStatusBadge tone={currentStatusConfig.tone}>
            {currentStatusConfig.label}
          </AdminStatusBadge>
        </div>
      </div>

      {/* Main Order Header */}
      <header className="border-b border-[#DEAC4B]/15 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-[#DEAC4B] mb-1">
              Customer Order Request
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              {order.reference}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-stone-400 mt-1">
              Placed on <span className="text-stone-200">{formatFullDateTime(order.orderDate)}</span>
              {order.occasion && (
                <> &bull; Occasion: <span className="text-white">{order.occasion}</span></>
              )}
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 mt-3 sm:mt-0">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400">
              Total Order Estimate
            </span>
            <span className="block font-serif text-2xl sm:text-3xl text-[#DEAC4B] font-semibold">
              {order.estimatedTotalUGX ? `UGX ${order.estimatedTotalUGX.toLocaleString()}` : '—'}
            </span>
            {order.isEstimate && (
              <span className="block text-[10px] font-sans text-stone-400 italic">
                Subject to staff confirmation
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Layout: Structured with Sections and Dividers (Not a decorative card grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT COLUMN (8 cols): Order Items, Pricing Breakdown, Notes
            ========================================================================= */}
        <div className="lg:col-span-8 space-y-8">
          {/* SECTION: Ordered Cakes & Items */}
          <section aria-labelledby="order-items-heading">
            <div className="border-b border-white/10 pb-3 mb-4 flex items-center justify-between">
              <h2
                id="order-items-heading"
                className="font-serif text-lg font-semibold text-white tracking-wide"
              >
                Ordered Cakes &amp; Specifications
              </h2>
              <span className="font-mono text-xs text-stone-400">
                {order.items?.length || 0} Item{order.items?.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="border border-white/10 bg-[#161311] rounded overflow-hidden divide-y divide-white/5">
              {(order.items || []).map((item, idx) => (
                <div key={item.id || idx} className="p-4 sm:p-5 space-y-3">
                  {/* Item Title & Price Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#DEAC4B] font-semibold">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-white font-medium">
                          {item.title}
                        </h3>
                      </div>
                      {item.tierLabel && (
                        <p className="font-sans text-xs text-stone-300 mt-0.5">
                          {item.tierLabel} {item.guests ? `• ${item.guests}` : ''}
                        </p>
                      )}
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-mono text-sm text-[#EFC767] font-semibold">
                        {item.priceFormatted || (item.priceUGX ? `UGX ${item.priceUGX.toLocaleString()}` : '—')}
                      </div>
                      <div className="text-[11px] font-sans text-stone-400">
                        Qty: {item.quantity || 1}
                      </div>
                    </div>
                  </div>

                  {/* Selected Options & Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5 text-stone-300 font-sans">
                    {item.flavor && (
                      <div>
                        <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                          Selected Flavour:
                        </span>
                        <span>{item.flavor}</span>
                      </div>
                    )}
                    {item.tierCount && (
                      <div>
                        <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                          Structure:
                        </span>
                        <span>{item.tierCount} Tiers ({item.guests || 'Standard serving'})</span>
                      </div>
                    )}
                  </div>

                  {/* Item Specific Note */}
                  {item.specialNote && (
                    <div className="bg-[#1C1815] border border-stone-800 rounded p-2.5 text-xs text-stone-300 font-sans">
                      <span className="font-mono text-[10px] uppercase text-[#DEAC4B] font-semibold block mb-0.5">
                        Item Special Note:
                      </span>
                      <p className="leading-relaxed">{item.specialNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: Financial Breakdown */}
          <section aria-labelledby="financial-breakdown-heading">
            <div className="border-b border-white/10 pb-3 mb-4">
              <h2
                id="financial-breakdown-heading"
                className="font-serif text-lg font-semibold text-white tracking-wide"
              >
                Pricing Summary &amp; Estimate
              </h2>
            </div>

            <div className="border border-white/10 bg-[#161311] rounded p-4 sm:p-5 space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span>Items Subtotal</span>
                <span className="font-mono text-stone-100">
                  {order.estimatedSubtotalUGX ? `UGX ${order.estimatedSubtotalUGX.toLocaleString()}` : '—'}
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-300">
                <span>
                  Fulfilment Fee ({isDelivery ? 'Delivery' : 'Studio Collection'})
                </span>
                <span className="font-mono text-stone-100">
                  {order.deliveryFeeUGX > 0
                    ? `UGX ${order.deliveryFeeUGX.toLocaleString()}`
                    : isDelivery
                    ? 'To be confirmed with customer'
                    : 'Free (Collection)'}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-baseline justify-between text-sm sm:text-base font-semibold">
                <span className="text-white">Estimated Order Total</span>
                <span className="font-serif text-lg sm:text-xl text-[#DEAC4B]">
                  {order.estimatedTotalUGX ? `UGX ${order.estimatedTotalUGX.toLocaleString()}` : '—'}
                </span>
              </div>

              {/* Requirement 7.3 Disclaimers */}
              <div className="pt-2 text-[11px] text-stone-400 border-t border-white/5 space-y-1">
                <p>
                  &bull; <strong className="text-stone-300">Pricing Policy:</strong> All amounts submitted via the public catalogue cart represent initial estimates. Final pricing, dietary modifications, and delivery logistics are confirmed directly with the customer prior to order acceptance.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: Customer Notes & Occasion */}
          {order.notes && (
            <section aria-labelledby="order-notes-heading">
              <div className="border-b border-white/10 pb-3 mb-4">
                <h2
                  id="order-notes-heading"
                  className="font-serif text-lg font-semibold text-white tracking-wide"
                >
                  Customer Notes &amp; Special Instructions
                </h2>
              </div>

              <div className="border border-white/10 bg-[#161311] rounded p-4 sm:p-5 text-xs text-stone-300 font-sans leading-relaxed">
                <p className="whitespace-pre-line">{order.notes}</p>
              </div>
            </section>
          )}
        </div>

        {/* =========================================================================
            RIGHT COLUMN (4 cols): Customer Contact, Fulfilment Details, Status Update
            ========================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* SECTION: Status Management */}
          <section
            aria-labelledby="status-management-heading"
            className="border border-[#DEAC4B]/20 bg-[#191614] rounded-lg p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2
                id="status-management-heading"
                className="font-serif text-base font-semibold text-white tracking-wide"
              >
                Status Management
              </h2>
              <AdminStatusBadge tone={currentStatusConfig.tone}>
                {currentStatusConfig.label}
              </AdminStatusBadge>
            </div>

            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              {currentStatusConfig.description}
            </p>

            {/* Status Selector Dropdown */}
            <div>
              <AdminSelect
                id={statusSelectId}
                label="Update Current Status"
                value={selectedStatus}
                onChange={handleStatusChange}
                options={ORDER_STATUS_UPDATE_OPTIONS}
                disabled={isUpdatingStatus}
              />
            </div>

            {/* Feedback Message */}
            {statusFeedback && (
              <div
                role="status"
                className={`text-xs p-2.5 rounded font-sans flex items-center gap-2 ${
                  statusFeedback.type === 'success'
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40'
                    : 'bg-rose-950/40 text-rose-300 border border-rose-600/40'
                }`}
              >
                <AdminIcon
                  name={statusFeedback.type === 'success' ? 'check' : 'alert'}
                  size={14}
                  className="shrink-0"
                />
                <span>{statusFeedback.message}</span>
              </div>
            )}

            {/* Provisional Lifecycle Notice */}
            <div className="pt-3 border-t border-white/10 text-[10px] text-stone-400 font-mono space-y-1">
              <p>
                <span className="text-[#DEAC4B] font-semibold">NOTE:</span> Status values are provisional pending final client sign-off.
              </p>
            </div>
          </section>

          {/* SECTION: Customer Information */}
          <section
            aria-labelledby="customer-info-heading"
            className="border border-white/10 bg-[#161311] rounded-lg p-5 space-y-3"
          >
            <div className="border-b border-white/10 pb-3">
              <h2
                id="customer-info-heading"
                className="font-serif text-base font-semibold text-white tracking-wide"
              >
                Customer Contact
              </h2>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                  Full Name
                </span>
                <span className="text-white font-medium text-sm">
                  {order.customer?.name || 'Anonymous Customer'}
                </span>
              </div>

              {order.customer?.phone && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${order.customer.phone}`}
                    className="font-mono text-[#DEAC4B] hover:text-[#FBD46D] underline transition-colors"
                  >
                    {order.customer.phone}
                  </a>
                </div>
              )}

              {order.customer?.email && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${order.customer.email}`}
                    className="text-stone-300 hover:text-white underline transition-colors break-all"
                  >
                    {order.customer.email}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* SECTION: Fulfilment Details */}
          <section
            aria-labelledby="fulfilment-info-heading"
            className="border border-white/10 bg-[#161311] rounded-lg p-5 space-y-3"
          >
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h2
                id="fulfilment-info-heading"
                className="font-serif text-base font-semibold text-white tracking-wide"
              >
                Fulfilment Logistics
              </h2>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isDelivery
                    ? 'text-sky-300 bg-sky-950/40 border-sky-800/40'
                    : 'text-stone-300 bg-stone-800/50 border-stone-700/50'
                }`}
              >
                {isDelivery ? 'Delivery' : 'Studio Collection'}
              </span>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                  Target Event Date
                </span>
                <span className="text-white font-medium">
                  {formatLongDate(order.fulfilment?.date)}
                </span>
              </div>

              {order.fulfilment?.time && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                    Target Time Window
                  </span>
                  <span className="text-stone-200">{order.fulfilment.time}</span>
                </div>
              )}

              {order.fulfilment?.address && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-stone-400 block mb-0.5">
                    {isDelivery ? 'Delivery Destination' : 'Pickup Location'}
                  </span>
                  <p className="text-stone-200 leading-relaxed">
                    {order.fulfilment.address}
                  </p>
                </div>
              )}

              {order.fulfilment?.notes && (
                <div className="bg-[#1C1815] border border-stone-800 rounded p-2.5 text-xs text-stone-300">
                  <span className="font-mono text-[10px] uppercase text-[#DEAC4B] font-semibold block mb-0.5">
                    Fulfilment Instructions:
                  </span>
                  <p className="leading-relaxed">{order.fulfilment.notes}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
