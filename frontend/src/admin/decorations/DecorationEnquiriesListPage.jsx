import React, { useState, useEffect, useId } from 'react';
import { Link } from 'react-router';
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
import {
  fetchDecorationEnquiries,
  resetDecorationEnquiriesToDefault,
  clearAllDecorationEnquiries,
} from './decorationEnquiriesService';
import {
  DECORATION_STATUS_OPTIONS,
  OCCASION_FILTER_OPTIONS,
  getDecorationStatus,
} from './decorationStatuses';

/**
 * Formats an ISO date string into readable British/Ugandan date format (e.g. "19 Dec 2026").
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
 * Calculates remaining days until event date and returns human context.
 *
 * @param {string} dateString
 * @returns {string|null}
 */
function getEventUrgency(dateString) {
  if (!dateString) return null;
  try {
    const target = new Date(dateString);
    const now = new Date();
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past event';
    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays <= 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
    return null;
  } catch {
    return null;
  }
}

export default function DecorationEnquiriesListPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [occasionFilter, setOccasionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusFilterSelectId = useId();
  const occasionSelectId = useId();
  const sortSelectId = useId();

  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Synchronize when a new enquiry is submitted on the public website
  useEffect(() => {
    const handleUpdated = () => {
      setReloadTrigger((prev) => prev + 1);
    };
    window.addEventListener('storage', handleUpdated);
    window.addEventListener('zuena-decorations-updated', handleUpdated);
    return () => {
      window.removeEventListener('storage', handleUpdated);
      window.removeEventListener('zuena-decorations-updated', handleUpdated);
    };
  }, []);

  // Load enquiries matching active filters
  useEffect(() => {
    let isCancelled = false;

    fetchDecorationEnquiries({
      search: searchTerm,
      status: statusFilter,
      occasion: occasionFilter,
      sortBy,
    })
      .then((response) => {
        if (!isCancelled) {
          setEnquiries(response.data);
          setTotalCount(response.total);
          setIsLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err?.message || 'Failed to load decoration enquiries.');
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [searchTerm, statusFilter, occasionFilter, sortBy, reloadTrigger]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setOccasionFilter('all');
    setSortBy('newest');
  };

  const handleResetToDefaultSeed = async () => {
    setIsLoading(true);
    await resetDecorationEnquiriesToDefault();
    setReloadTrigger((prev) => prev + 1);
  };

  const handleClearAll = async () => {
    setIsLoading(true);
    await clearAllDecorationEnquiries();
    setReloadTrigger((prev) => prev + 1);
  };

  // Quick summary numbers for card-free banner
  const newCount = enquiries.filter((e) => e.status === 'new').length;
  const consultationCount = enquiries.filter((e) => e.status === 'consultation').length;
  const bookedCount = enquiries.filter((e) => e.status === 'booked').length;

  const columns = [
    {
      key: 'reference',
      label: 'Ref #',
      width: '13%',
      render: (item) => (
        <Link
          to={`/admin/decoration-enquiries/${item.id}`}
          className="font-mono text-xs text-[#DEAC4B] hover:text-[#FBD46D] transition-colors focus:outline-none focus:underline"
        >
          {item.reference}
        </Link>
      ),
    },
    {
      key: 'customer',
      label: 'Client / Contact',
      width: '20%',
      render: (item) => (
        <div>
          <div className="font-sans font-medium text-white text-sm">
            {item.customer?.name || 'Client'}
          </div>
          <div className="font-mono text-[11px] text-stone-400">
            {item.customer?.phone || '—'}
          </div>
        </div>
      ),
    },
    {
      key: 'occasion',
      label: 'Occasion & Venue',
      width: '24%',
      render: (item) => (
        <div>
          <div className="font-sans text-sm text-stone-200">
            {item.occasion}
          </div>
          <div className="font-sans text-xs text-stone-400 line-clamp-1" title={item.venueLocation}>
            {item.venueLocation || 'Venue TBD'}
          </div>
        </div>
      ),
    },
    {
      key: 'discipline',
      label: 'Discipline',
      width: '20%',
      render: (item) => (
        <div>
          <div className="font-sans text-xs text-stone-300 line-clamp-1" title={item.stylingDiscipline}>
            {item.stylingDiscipline}
          </div>
          {item.guestCount && (
            <div className="font-mono text-[11px] text-[#EFC767]">
              {item.guestCount}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'eventDate',
      label: 'Event Date',
      width: '14%',
      render: (item) => {
        const urgency = getEventUrgency(item.eventDate);
        return (
          <div>
            <div className="font-sans text-xs text-stone-200">
              {formatDisplayDate(item.eventDate)}
            </div>
            {urgency && (
              <span className="font-mono text-[10px] text-[#DEAC4B]">
                {urgency}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      width: '13%',
      render: (item) => {
        const statusMeta = getDecorationStatus(item.status);
        return (
          <AdminStatusBadge tone={statusMeta.tone}>
            {statusMeta.label}
          </AdminStatusBadge>
        );
      },
    },
    {
      key: 'actions',
      label: '',
      width: '8%',
      render: (item) => (
        <AdminButton
          size="sm"
          variant="ghost"
          to={`/admin/decoration-enquiries/${item.id}`}
          icon="chevron-right"
          iconPosition="right"
          aria-label={`View details for ${item.reference}`}
        >
          View
        </AdminButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        eyebrow="Event Services &amp; Styling"
        title="Decoration Enquiries"
        subtitle="Manage incoming event styling requests, client consultations, venue walkthroughs, and confirmed reservations."
        actions={
          <div className="flex items-center gap-2">
            <AdminButton
              variant="ghost"
              size="sm"
              icon="refresh"
              onClick={handleResetToDefaultSeed}
              title="Reset records to default demonstration data"
            >
              Reset Seed
            </AdminButton>
            <AdminButton
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              title="Clear all records to test empty state"
            >
              Clear
            </AdminButton>
          </div>
        }
      />

      {/* Card-Free Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 px-4 bg-[#191614] border border-stone-800 rounded-lg divide-x divide-stone-800/60 text-xs">
        <div className="px-2">
          <span className="text-stone-400 block font-mono text-[10px] uppercase">Total Listed</span>
          <span className="font-serif text-lg font-bold text-white">{totalCount}</span>
        </div>
        <div className="px-2 pl-4">
          <span className="text-stone-400 block font-mono text-[10px] uppercase">New Requests</span>
          <span className="font-serif text-lg font-bold text-[#DEAC4B]">{newCount}</span>
        </div>
        <div className="px-2 pl-4">
          <span className="text-stone-400 block font-mono text-[10px] uppercase">Consultations</span>
          <span className="font-serif text-lg font-bold text-purple-400">{consultationCount}</span>
        </div>
        <div className="px-2 pl-4">
          <span className="text-stone-400 block font-mono text-[10px] uppercase">Booked &amp; Confirmed</span>
          <span className="font-serif text-lg font-bold text-emerald-400">{bookedCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#191614] border border-[#DEAC4B]/20 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <AdminInput
            placeholder="Search by client, ref, venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
        </div>

        {/* Status Filter */}
        <div>
          <AdminSelect
            id={statusFilterSelectId}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={DECORATION_STATUS_OPTIONS}
          />
        </div>

        {/* Occasion Filter */}
        <div>
          <AdminSelect
            id={occasionSelectId}
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            options={OCCASION_FILTER_OPTIONS}
          />
        </div>

        {/* Sort */}
        <div>
          <AdminSelect
            id={sortSelectId}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: 'newest', label: 'Sort: Newest Submission' },
              { value: 'oldest', label: 'Sort: Oldest Submission' },
              { value: 'event-date', label: 'Sort: Event Date Soonest' },
            ]}
          />
        </div>
      </div>

      {/* Error banner if fetch fails */}
      {error && (
        <div
          role="alert"
          className="p-4 bg-red-950/60 border border-red-500/40 rounded-lg text-xs text-red-200 flex items-center gap-3"
        >
          <AdminIcon name="alert" size={16} className="text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Data Table */}
      <AdminDataTable
        columns={columns}
        data={enquiries}
        isLoading={isLoading}
        emptyState={
          <AdminEmptyState
            icon="decor"
            title="No decoration enquiries found"
            description={
              searchTerm || statusFilter !== 'all' || occasionFilter !== 'all'
                ? 'No inquiries match your current filter criteria. Try resetting your search filters.'
                : 'No event decoration enquiries have been submitted yet. Submissions from the public enquiry form will appear here in real time.'
            }
            action={
              searchTerm || statusFilter !== 'all' || occasionFilter !== 'all' ? (
                <AdminButton variant="secondary" size="sm" onClick={handleResetFilters}>
                  Clear Search Filters
                </AdminButton>
              ) : (
                <AdminButton
                  variant="primary"
                  size="sm"
                  icon="refresh"
                  onClick={handleResetToDefaultSeed}
                >
                  Load Demonstration Enquiries
                </AdminButton>
              )
            }
          />
        }
      />
    </div>
  );
}
