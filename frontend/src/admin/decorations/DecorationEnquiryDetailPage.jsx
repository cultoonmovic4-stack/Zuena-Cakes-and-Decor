import React, { useState, useEffect, useId } from 'react';
import { useParams, Link } from 'react-router';
import {
  AdminButton,
  AdminStatusBadge,
  AdminSelect,
  AdminEmptyState,
  AdminIcon,
} from '../components/ui';
import {
  fetchDecorationEnquiryById,
  updateDecorationEnquiryStatus,
  updateDecorationEnquiryDetails,
} from './decorationEnquiriesService';
import {
  DECORATION_STATUS_UPDATE_OPTIONS,
  getDecorationStatus,
} from './decorationStatuses';

// Portfolio images for preview matching
import decoration4Img from '../../assets/images/decoration4.jpg';
import decoration5Img from '../../assets/images/decoration5.jpg';
import decoration7Img from '../../assets/images/decoration7.jpg';
import decoration8Img from '../../assets/images/decoration8.jpg';
import decoration9Img from '../../assets/images/decoration9.jpg';
import decoration110Img from '../../assets/images/decoration110.jpg';

const portfolioThumbnails = {
  'Wisteria Cloud & Serpentine Chandelier Hall': decoration7Img,
  'Wisteria Cloud & Chandelier Hall': decoration7Img,
  'Forest Velvet, Fluted Arches & Hydrangea Stage': decoration5Img,
  'Forest Velvet & Fluted Arch Stage': decoration5Img,
  'Blush & Burgundy Multi-Arch Stage With Paired Cake': decoration4Img,
  'Blush & Burgundy Arch Stage': decoration4Img,
  'Woven Raffia Baskets, Terracotta & Kitenge Stage': decoration110Img,
  'Woven Raffia & Terracotta Stage': decoration110Img,
  'Lakeside Pavilion & Double-Arch Floral Altar': decoration8Img,
  'Lakeside Double-Arch Floral Altar': decoration8Img,
  'Storybook Pillar Welcome Installation': decoration9Img,
  'Storybook Pillar Welcome Walkway': decoration9Img,
};

/**
 * Formats an ISO date string into readable British/Ugandan format with time.
 * Example: "9 Nov 2026, 14:32"
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
 * Formats long date without time (e.g. "Saturday, 19 December 2026").
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
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Clean phone number string for WhatsApp link (digits only, e.g. "256702334112").
 *
 * @param {string} phone
 * @returns {string}
 */
function formatWhatsAppNumber(phone = '') {
  return phone.replace(/[^\d]/g, '');
}

export default function DecorationEnquiryDetailPage() {
  const { enquiryId } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status management state
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(null);

  // Staff notes and checklist state
  const [staffNotes, setStaffNotes] = useState('');
  const [checklist, setChecklist] = useState({
    siteVisitScheduled: false,
    moodboardPrepared: false,
    cakeTeamNotified: false,
    proposalDelivered: false,
    contractSigned: false,
  });
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesFeedback, setNotesFeedback] = useState(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const statusSelectId = useId();

  // Load enquiry by ID
  useEffect(() => {
    let isCancelled = false;

    fetchDecorationEnquiryById(enquiryId)
      .then((data) => {
        if (!isCancelled) {
          if (data) {
            setEnquiry(data);
            setSelectedStatus(data.status);
            setStaffNotes(data.staffNotes || '');
            if (data.checklist) {
              setChecklist(data.checklist);
            }
          } else {
            setEnquiry(null);
          }
          setIsLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err?.message || 'Failed to load decoration enquiry details.');
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [enquiryId]);

  // Handle status update
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedStatus || selectedStatus === enquiry?.status) return;

    setIsUpdatingStatus(true);
    setStatusFeedback(null);

    try {
      const updated = await updateDecorationEnquiryStatus(
        enquiry.id,
        selectedStatus,
        staffNotes
      );
      setEnquiry(updated);
      setStatusFeedback({
        type: 'success',
        message: `Status updated to "${getDecorationStatus(selectedStatus).label}".`,
      });
    } catch (err) {
      setStatusFeedback({
        type: 'error',
        message: err?.message || 'Failed to update status.',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle checklist item toggle
  const handleToggleChecklist = async (key) => {
    const updatedChecklist = {
      ...checklist,
      [key]: !checklist[key],
    };
    setChecklist(updatedChecklist);

    try {
      await updateDecorationEnquiryDetails(enquiry.id, {
        checklist: updatedChecklist,
      });
    } catch {
      // Revert if write fails
      setChecklist(checklist);
    }
  };

  // Handle saving staff notes
  const handleSaveStaffNotes = async () => {
    setIsSavingNotes(true);
    setNotesFeedback(null);

    try {
      await updateDecorationEnquiryDetails(enquiry.id, {
        staffNotes,
      });
      setNotesFeedback({
        type: 'success',
        message: 'Internal notes saved.',
      });
    } catch (err) {
      setNotesFeedback({
        type: 'error',
        message: err?.message || 'Failed to save notes.',
      });
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="py-20 text-center text-stone-400 font-sans text-sm">
        <div className="inline-block w-6 h-6 border-2 border-[#DEAC4B] border-t-transparent rounded-full animate-spin mb-3" />
        <p>Loading decoration enquiry details...</p>
      </div>
    );
  }

  // Not found / error state
  if (error || !enquiry) {
    return (
      <div className="space-y-6">
        <AdminButton
          variant="ghost"
          size="sm"
          to="/admin/decoration-enquiries"
          icon="arrow-left"
        >
          Back to Decoration Enquiries
        </AdminButton>

        <AdminEmptyState
          icon="decor"
          title="Decoration Enquiry Not Found"
          description={
            error ||
            `No decoration enquiry matching identifier "${enquiryId}" could be located in the system.`
          }
          action={
            <AdminButton variant="primary" size="sm" to="/admin/decoration-enquiries">
              Return to Enquiries List
            </AdminButton>
          }
        />
      </div>
    );
  }

  const currentStatusMeta = getDecorationStatus(enquiry.status);
  const matchedLookbookImage =
    enquiry.prefilledStyle && portfolioThumbnails[enquiry.prefilledStyle];

  const waNumber = formatWhatsAppNumber(enquiry?.customer?.phone);
  const waUrl = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(
        `Hello ${enquiry.customer?.name}, this is Zuena Cakes & Decor reaching out regarding your ${enquiry.occasion} decoration enquiry (${enquiry.reference}).`
      )}`
    : null;

  const handleCopyBrief = () => {
    if (!enquiry) return;
    const briefText = [
      `Zuena Cakes & Decor — Decoration Enquiry Brief`,
      `Reference: ${enquiry.reference}`,
      `Customer: ${enquiry.customer?.name} (${enquiry.customer?.phone}${enquiry.customer?.email ? ` | ${enquiry.customer?.email}` : ''})`,
      `Occasion: ${enquiry.occasion}`,
      `Date: ${formatLongDate(enquiry.eventDate)}`,
      `Venue: ${enquiry.venueLocation || 'To be determined'}`,
      `Guest Scale: ${enquiry.guestCount || 'To be determined'}`,
      `Styling Discipline: ${enquiry.stylingDiscipline}`,
      enquiry.prefilledStyle ? `Lookbook Reference: ${enquiry.prefilledStyle}` : null,
      enquiry.preferredPalette ? `Color Palette: ${enquiry.preferredPalette}` : null,
      enquiry.notes ? `Client Vision Notes: "${enquiry.notes}"` : null,
      `Status: ${currentStatusMeta.label}`,
    ]
      .filter(Boolean)
      .join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(briefText).then(() => {
        setCopiedBrief(true);
        setTimeout(() => setCopiedBrief(false), 2400);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminButton
          variant="ghost"
          size="sm"
          to="/admin/decoration-enquiries"
          icon="arrow-left"
        >
          Back to Decoration Enquiries
        </AdminButton>

        <AdminButton
          variant="secondary"
          size="sm"
          onClick={handleCopyBrief}
          icon={copiedBrief ? "check" : "calendar"}
        >
          {copiedBrief ? 'Brief Copied to Clipboard!' : 'Copy Enquiry Brief'}
        </AdminButton>
      </div>

      {/* Header Banner */}
      <div className="bg-[#191614] border border-[#DEAC4B]/25 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400 mb-2">
            <span className="text-[#DEAC4B] font-semibold tracking-wider">
              {enquiry.reference}
            </span>
            <span>&bull;</span>
            <span>Submitted {formatFullDateTime(enquiry.submissionDate)}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            {enquiry.customer?.name || 'Client'}{' '}
            <span className="text-stone-400 font-sans text-lg">&mdash; {enquiry.occasion}</span>
          </h1>

          <p className="font-sans text-xs text-stone-400 mt-1">
            Target Celebration Date:{' '}
            <strong className="text-white font-medium">
              {formatLongDate(enquiry.eventDate)}
            </strong>
          </p>
        </div>

        {/* Current Status & Status Change Form */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t lg:border-t-0 lg:border-l border-stone-800 pt-4 lg:pt-0 lg:pl-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-stone-400 mb-1">
              Current Lifecycle State
            </span>
            <AdminStatusBadge tone={currentStatusMeta.tone} size="md">
              {currentStatusMeta.label}
            </AdminStatusBadge>
          </div>

          <form onSubmit={handleUpdateStatus} className="flex items-center gap-2">
            <div>
              <AdminSelect
                id={statusSelectId}
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setStatusFeedback(null);
                }}
                options={DECORATION_STATUS_UPDATE_OPTIONS}
                disabled={isUpdatingStatus}
              />
            </div>
            <AdminButton
              type="submit"
              variant="primary"
              disabled={isUpdatingStatus || selectedStatus === enquiry.status}
            >
              {isUpdatingStatus ? 'Updating...' : 'Update'}
            </AdminButton>
          </form>
        </div>
      </div>

      {/* Feedback banner */}
      {statusFeedback && (
        <div
          role="status"
          className={`p-3.5 rounded-lg text-xs flex items-center gap-2.5 ${
            statusFeedback.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/60 border border-red-500/40 text-red-200'
          }`}
        >
          <AdminIcon
            name={statusFeedback.type === 'success' ? 'check' : 'alert'}
            size={14}
          />
          <span>{statusFeedback.message}</span>
        </div>
      )}

      {/* Two-Column Grid: Left (Particulars & Scope) | Right (Contact & Workflow) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =========================================================================
            LEFT COLUMN (7 Cols): Event Particulars & Creative Styling Scope
            ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Event Particulars */}
          <div className="bg-[#191614] border border-stone-800 rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-white font-medium border-b border-stone-800 pb-3 flex items-center justify-between">
              <span>Event &amp; Venue Particulars</span>
              <span className="font-mono text-xs text-[#DEAC4B]">Section I</span>
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <dt className="text-stone-400 font-mono text-[10px] uppercase">Occasion Category</dt>
                <dd className="font-sans text-sm text-white font-medium mt-1">
                  {enquiry.occasion}
                </dd>
              </div>

              <div>
                <dt className="text-stone-400 font-mono text-[10px] uppercase">Celebration Date</dt>
                <dd className="font-sans text-sm text-[#EFC767] font-medium mt-1">
                  {formatLongDate(enquiry.eventDate)}
                </dd>
              </div>

              <div>
                <dt className="text-stone-400 font-mono text-[10px] uppercase">Venue Location</dt>
                <dd className="font-sans text-sm text-white mt-1">
                  {enquiry.venueLocation || 'To be determined during consultation'}
                </dd>
              </div>

              <div>
                <dt className="text-stone-400 font-mono text-[10px] uppercase">Estimated Guest Scale</dt>
                <dd className="font-sans text-sm text-white mt-1">
                  {enquiry.guestCount || 'Not specified'}
                </dd>
              </div>
            </dl>
          </div>

          {/* 2. Styling Discipline & Creative Scope */}
          <div className="bg-[#191614] border border-stone-800 rounded-lg p-6 space-y-5">
            <h2 className="font-serif text-lg text-white font-medium border-b border-stone-800 pb-3 flex items-center justify-between">
              <span>Styling Scope &amp; Creative Direction</span>
              <span className="font-mono text-xs text-[#DEAC4B]">Section II</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase block mb-1">
                  Requested Styling Discipline
                </span>
                <div className="p-3 bg-[#141210] border border-[#DEAC4B]/30 rounded-md text-sm text-white font-medium">
                  {enquiry.stylingDiscipline}
                </div>
              </div>

              {/* Selected Inspiration Style from Lookbook (if provided) */}
              {enquiry.prefilledStyle && (
                <div className="p-3.5 bg-[#141210] border border-stone-800 rounded-md flex items-center gap-4">
                  {matchedLookbookImage ? (
                    <img
                      src={matchedLookbookImage}
                      alt={enquiry.prefilledStyle}
                      className="w-16 h-16 rounded object-cover border border-[#DEAC4B]/40 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded bg-[#191614] border border-stone-800 flex items-center justify-center text-stone-500 shrink-0">
                      <AdminIcon name="decor" size={20} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DEAC4B] block">
                      Lookbook Aesthetic Inspiration
                    </span>
                    <strong className="font-serif text-sm sm:text-base text-white block mt-0.5 truncate">
                      {enquiry.prefilledStyle}
                    </strong>
                    <span className="font-sans text-[11px] text-stone-400">
                      Client selected this directly from the public lookbook portfolio.
                    </span>
                  </div>
                </div>
              )}

              {/* Preferred Palette */}
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase block mb-1">
                  Preferred Colour Palette &amp; Accents
                </span>
                <p className="font-sans text-sm text-stone-200 bg-[#141210] p-3 rounded-md border border-stone-800/80">
                  {enquiry.preferredPalette || 'Open to stylist recommendations during consultation'}
                </p>
              </div>

              {/* Special Vision Notes */}
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase block mb-1">
                  Client Special Vision Notes &amp; Requests
                </span>
                <div className="font-sans text-xs text-stone-300 leading-relaxed bg-[#141210] p-3.5 rounded-md border border-stone-800/80 whitespace-pre-wrap">
                  {enquiry.notes
                    ? `“${enquiry.notes}”`
                    : 'No additional notes provided in the initial submission.'}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Integrated Cake & Patisserie Coordination */}
          <div className="bg-[#191614] border border-stone-800 rounded-lg p-6 space-y-3">
            <h3 className="font-serif text-base text-white font-medium flex items-center gap-2">
              <AdminIcon name="cake" size={16} className="text-[#DEAC4B]" />
              <span>Coordinated Celebration Cake Service</span>
            </h3>
            <p className="font-sans text-xs text-stone-400 leading-relaxed">
              Zuena Cakes &amp; Decor pairs celebratory tiered cakes and banquet stage styling under one unified atelier roof. When client agrees on stage arch colors and pedestal placement, notify the patisserie team to synchronize the cake design.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/admin/orders"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#DEAC4B] hover:text-[#FBD46D]"
              >
                <span>Check Customer Orders Archive &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (5 Cols): Client Contact Card & Staff Operations
            ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Client Contact Card */}
          <div className="bg-[#191614] border border-stone-800 rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-white font-medium border-b border-stone-800 pb-3 flex items-center justify-between">
              <span>Client Contact Card</span>
              <AdminIcon name="user" size={16} className="text-[#DEAC4B]" />
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase block">Full Name</span>
                <div className="text-sm font-sans font-semibold text-white mt-0.5">
                  {enquiry.customer?.name}
                </div>
              </div>

              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase block">Telephone / WhatsApp</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a
                    href={`tel:${enquiry.customer?.phone}`}
                    className="font-mono text-sm text-[#DEAC4B] hover:underline"
                  >
                    {enquiry.customer?.phone || '—'}
                  </a>
                </div>
              </div>

              {enquiry.customer?.email && (
                <div>
                  <span className="text-stone-400 font-mono text-[10px] uppercase block">Email Address</span>
                  <a
                    href={`mailto:${enquiry.customer?.email}`}
                    className="font-sans text-sm text-stone-300 hover:text-white hover:underline mt-0.5 block truncate"
                  >
                    {enquiry.customer?.email}
                  </a>
                </div>
              )}

              {/* Direct Action Gateway (Call & WhatsApp) */}
              <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row gap-2">
                {enquiry.customer?.phone && (
                  <a
                    href={`tel:${enquiry.customer?.phone}`}
                    className="flex-1 py-2 px-3 bg-[#141210] hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-sans font-medium rounded text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <AdminIcon name="phone" size={13} />
                    <span>Call Client</span>
                  </a>
                )}
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-[#141210] hover:bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-xs font-sans font-medium rounded text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <AdminIcon name="external-link" size={13} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 2. Staff Workflow Checklist */}
          <div className="bg-[#191614] border border-stone-800 rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg text-white font-medium border-b border-stone-800 pb-3 flex items-center justify-between">
              <span>Operational Checklist</span>
              <AdminIcon name="check" size={16} className="text-[#DEAC4B]" />
            </h2>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={Boolean(checklist.siteVisitScheduled)}
                  onChange={() => handleToggleChecklist('siteVisitScheduled')}
                  className="mt-0.5 rounded border-stone-700 text-[#DEAC4B] focus:ring-[#DEAC4B]/40 bg-[#141210] cursor-pointer"
                />
                <span className={`font-sans ${checklist.siteVisitScheduled ? 'text-white line-through opacity-60' : 'text-stone-300 group-hover:text-white'}`}>
                  Venue walkthrough &amp; stage measurements completed
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={Boolean(checklist.moodboardPrepared)}
                  onChange={() => handleToggleChecklist('moodboardPrepared')}
                  className="mt-0.5 rounded border-stone-700 text-[#DEAC4B] focus:ring-[#DEAC4B]/40 bg-[#141210] cursor-pointer"
                />
                <span className={`font-sans ${checklist.moodboardPrepared ? 'text-white line-through opacity-60' : 'text-stone-300 group-hover:text-white'}`}>
                  Client moodboard, draping swatches &amp; florals confirmed
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={Boolean(checklist.proposalDelivered)}
                  onChange={() => handleToggleChecklist('proposalDelivered')}
                  className="mt-0.5 rounded border-stone-700 text-[#DEAC4B] focus:ring-[#DEAC4B]/40 bg-[#141210] cursor-pointer"
                />
                <span className={`font-sans ${checklist.proposalDelivered ? 'text-white line-through opacity-60' : 'text-stone-300 group-hover:text-white'}`}>
                  Written styling proposal &amp; quotation sent to client
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={Boolean(checklist.cakeTeamNotified)}
                  onChange={() => handleToggleChecklist('cakeTeamNotified')}
                  className="mt-0.5 rounded border-stone-700 text-[#DEAC4B] focus:ring-[#DEAC4B]/40 bg-[#141210] cursor-pointer"
                />
                <span className={`font-sans ${checklist.cakeTeamNotified ? 'text-white line-through opacity-60' : 'text-stone-300 group-hover:text-white'}`}>
                  Bakery team notified for coordinated cake pedestal styling
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={Boolean(checklist.contractSigned)}
                  onChange={() => handleToggleChecklist('contractSigned')}
                  className="mt-0.5 rounded border-stone-700 text-[#DEAC4B] focus:ring-[#DEAC4B]/40 bg-[#141210] cursor-pointer"
                />
                <span className={`font-sans ${checklist.contractSigned ? 'text-white line-through opacity-60' : 'text-stone-300 group-hover:text-white'}`}>
                  Contract signed &amp; date commitment deposit secured
                </span>
              </label>
            </div>
          </div>

          {/* 3. Internal Staff Notes */}
          <div className="bg-[#191614] border border-stone-800 rounded-lg p-6 space-y-3">
            <h2 className="font-serif text-lg text-white font-medium border-b border-stone-800 pb-3 flex items-center justify-between">
              <span>Internal Staff Notes</span>
              <span className="font-mono text-[10px] text-stone-400">Private</span>
            </h2>

            <textarea
              rows={4}
              value={staffNotes}
              onChange={(e) => {
                setStaffNotes(e.target.value);
                setNotesFeedback(null);
              }}
              placeholder="Record venue manager contacts, access times, floral supplier notes, or client meeting records..."
              className="w-full px-3 py-2 bg-[#141210] border border-stone-800 rounded text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#DEAC4B] resize-y"
            />

            <div className="flex items-center justify-between pt-1">
              <div>
                {notesFeedback && (
                  <span className="font-mono text-[11px] text-emerald-400">
                    {notesFeedback.message}
                  </span>
                )}
              </div>
              <AdminButton
                size="sm"
                variant="secondary"
                disabled={isSavingNotes}
                onClick={handleSaveStaffNotes}
              >
                {isSavingNotes ? 'Saving...' : 'Save Notes'}
              </AdminButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
