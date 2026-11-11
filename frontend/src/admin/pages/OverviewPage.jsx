import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { cakeProducts } from '../../data/creationsData';
import {
  AdminDataTable,
  AdminEmptyState,
  AdminStatusBadge,
} from '../components/ui';
import { fetchOrders } from '../orders/ordersService';
import { fetchDecorationEnquiries } from '../decorations/decorationEnquiriesService';

/**
 * Computes dynamic time-based greeting according to local browser time.
 * Logic:
 * - 05:00–11:59: Good morning!
 * - 12:00–16:59: Good afternoon!
 * - 17:00–04:59: Good evening!
 *
 * @param {Date} date
 * @returns {string}
 */
function getTimeBasedGreeting(date) {
  const hours = date.getHours();
  if (hours >= 5 && hours < 12) {
    return 'Good morning!';
  } else if (hours >= 12 && hours < 17) {
    return 'Good afternoon!';
  } else {
    return 'Good evening!';
  }
}

/**
 * Formats a JavaScript Date into clean British/Ugandan English format.
 * Example: "Saturday, 7 November 2026"
 *
 * @param {Date} date
 * @returns {string}
 */
function formatCurrentDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Helper to assign standard badge tone for submission types
 */
function getSubmissionTypeTone(type = '') {
  const lower = type.toLowerCase();
  if (lower.includes('order')) return 'gold';
  if (lower.includes('custom')) return 'amber';
  if (lower.includes('decor')) return 'purple';
  return 'blue';
}

/**
 * Phase 4.2 — Admin Overview Page
 *
 * Comprises exactly three primary sections:
 * SECTION A — Welcome Header (Dynamic greeting, local date, workspace message)
 * SECTION B — Business Overview (Four compact horizontal totals on desktop, 2-col on mobile, strictly card-free)
 * SECTION C — Recent Submissions (Combined chronological table with empty state)
 */
export default function OverviewPage({
  // Optional external data contract integration props
  totalOrders = '—',
  totalCustomRequests = '—',
  totalDecorationEnquiries = '—',
  recentSubmissions = [],
}) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [liveOrdersCount, setLiveOrdersCount] = useState(null);
  const [liveDecorCount, setLiveDecorCount] = useState(null);
  const [liveSubmissions, setLiveSubmissions] = useState([]);

  // Periodically refresh current time to update greeting and date when crossing time boundaries
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live orders and decoration enquiries if props are unprovided
  useEffect(() => {
    let isCancelled = false;

    Promise.all([
      fetchOrders().catch(() => ({ data: [], total: 0 })),
      fetchDecorationEnquiries().catch(() => ({ data: [], total: 0 })),
    ]).then(([ordersRes, decorRes]) => {
      if (isCancelled) return;

      setLiveOrdersCount(ordersRes.total);
      setLiveDecorCount(decorRes.total);

      // Build combined recent submissions
      const orderItems = (ordersRes.data || []).map((o) => ({
        date: o.orderDate ? o.orderDate.split('T')[0] : '—',
        fullDate: o.orderDate || '',
        reference: o.reference,
        type: 'Order',
        customer: o.customer?.name || 'Customer',
        url: `/admin/orders/${o.id}`,
      }));

      const decorItems = (decorRes.data || []).map((d) => ({
        date: d.submissionDate ? d.submissionDate.split('T')[0] : '—',
        fullDate: d.submissionDate || '',
        reference: d.reference,
        type: 'Decoration',
        customer: d.customer?.name || 'Client',
        url: `/admin/decoration-enquiries/${d.id}`,
      }));

      const combined = [...orderItems, ...decorItems]
        .sort((a, b) => new Date(b.fullDate || 0) - new Date(a.fullDate || 0))
        .slice(0, 10);

      setLiveSubmissions(combined);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const greeting = getTimeBasedGreeting(currentDate);
  const formattedDate = formatCurrentDate(currentDate);

  // Verified total from live catalogue data source (frontend/src/data/creationsData.js)
  const totalCatalogueProducts = Array.isArray(cakeProducts)
    ? cakeProducts.length
    : '—';

  const resolvedOrdersTotal =
    totalOrders !== '—'
      ? totalOrders
      : liveOrdersCount !== null
      ? liveOrdersCount
      : '—';

  const resolvedDecorTotal =
    totalDecorationEnquiries !== '—'
      ? totalDecorationEnquiries
      : liveDecorCount !== null
      ? liveDecorCount
      : '—';

  const resolvedSubmissions =
    recentSubmissions && recentSubmissions.length > 0
      ? recentSubmissions
      : liveSubmissions;

  // Section B business totals
  const businessTotals = [
    {
      id: 'orders',
      label: 'Total Orders',
      value: resolvedOrdersTotal,
      note: liveOrdersCount !== null ? 'Live orders count' : 'Awaiting module sync',
    },
    {
      id: 'custom-requests',
      label: 'Custom Cake Requests',
      value: totalCustomRequests,
      note: 'Awaiting module sync',
    },
    {
      id: 'decor-enquiries',
      label: 'Decoration Enquiries',
      value: resolvedDecorTotal,
      note: liveDecorCount !== null ? 'Live enquiries count' : 'Awaiting module sync',
    },
    {
      id: 'catalogue',
      label: 'Catalogue Products',
      value: totalCatalogueProducts,
      note: 'Live creations',
    },
  ];

  // Section C table column definitions
  const submissionColumns = [
    { key: 'date', label: 'Date', width: '22%' },
    { key: 'reference', label: 'Reference', width: '26%' },
    { key: 'type', label: 'Type', width: '26%' },
    { key: 'customer', label: 'Customer', width: '26%' },
  ];

  return (
    <div className="space-y-10">
      {/* =========================================================================
          SECTION A — WELCOME HEADER
          ========================================================================= */}
      <section
        aria-labelledby="overview-welcome-heading"
        className="border-b border-[#DEAC4B]/15 pb-8"
      >
        <p className="text-xs font-mono uppercase tracking-wider text-[#DEAC4B] mb-1.5 font-medium">
          {formattedDate}
        </p>
        <h1
          id="overview-welcome-heading"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide"
        >
          {greeting}
        </h1>
        <p className="font-sans text-sm sm:text-base text-stone-400 mt-2 max-w-xl leading-relaxed">
          Welcome to your Zuena Cakes &amp; Decor workspace.
        </p>
      </section>

      {/* =========================================================================
          SECTION B — BUSINESS OVERVIEW (Strictly Card-Free, Thin Separators)
          ========================================================================= */}
      <section
        aria-labelledby="overview-totals-heading"
        className="border-b border-[#DEAC4B]/15 pb-10"
      >
        <div className="flex items-center justify-between mb-5">
          <h2
            id="overview-totals-heading"
            className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold"
          >
            Business Overview
          </h2>
          <span className="text-[11px] font-mono text-stone-500">
            Operations &bull; Live Totals
          </span>
        </div>

        {/* Horizontal on Desktop, 2-Column on Mobile, Subtle Dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-800 border-t border-b border-stone-800/80 py-6">
          {businessTotals.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col justify-center py-4 sm:py-0 ${
                idx === 0
                  ? 'sm:pr-6'
                  : idx === businessTotals.length - 1
                  ? 'sm:pl-6'
                  : 'sm:px-6'
              }`}
            >
              <span className="font-sans text-xs uppercase tracking-wider text-stone-400 font-medium">
                {item.label}
              </span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#DEAC4B] mt-1.5 tracking-tight">
                {item.value}
              </span>
              <span className="text-[11px] font-mono text-stone-500 mt-1">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION C — RECENT SUBMISSIONS (Single Combined Table)
          ========================================================================= */}
      <section aria-labelledby="overview-submissions-heading">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              id="overview-submissions-heading"
              className="text-xs font-mono uppercase tracking-wider text-stone-400 font-semibold"
            >
              Recent Submissions
            </h2>
            <p className="font-sans text-xs text-stone-500 mt-0.5">
              Latest orders, bespoke custom requests, and event enquiries
            </p>
          </div>
          <span className="text-[11px] font-mono text-stone-500">
            Chronological
          </span>
        </div>

        {/* Combined Table with Integrated Empty State */}
        <AdminDataTable
          columns={submissionColumns}
          data={resolvedSubmissions}
          emptyState={
            <AdminEmptyState
              icon="overview"
              title="No Recent Submissions"
              description="Submissions from Orders, Custom Cake Requests, and Decoration Enquiries will appear here automatically once module data persistence is connected."
            />
          }
          renderRow={(item) => (
            <tr
              key={item.reference}
              className="hover:bg-stone-800/30 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-xs text-stone-300">
                {item.date}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-[#DEAC4B] font-medium">
                {item.url ? (
                  <Link
                    to={item.url}
                    className="hover:text-[#FBD46D] hover:underline"
                  >
                    {item.reference}
                  </Link>
                ) : (
                  item.reference
                )}
              </td>
              <td className="px-4 py-3 text-stone-200">
                <AdminStatusBadge tone={getSubmissionTypeTone(item.type)}>
                  {item.type}
                </AdminStatusBadge>
              </td>
              <td className="px-4 py-3 font-sans text-xs sm:text-sm text-stone-200">
                {item.customer}
              </td>
            </tr>
          )}
        />
      </section>
    </div>
  );
}
