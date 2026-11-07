import React, { useState } from 'react';
import {
  AdminPageHeader,
  AdminInput,
  AdminSelect,
  AdminDataTable,
  AdminEmptyState,
  AdminStatusBadge,
  AdminIcon,
} from '../components/ui';

export default function DecorationEnquiriesPlaceholderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // PROVISIONAL: Event decoration statuses are illustrative placeholders pending client sign-off
  const statusOptions = [
    { value: 'all', label: 'All Enquiry Statuses (Provisional)' },
    { value: 'new', label: 'New / Received' },
    { value: 'consultation', label: 'Consultation Scheduled' },
    { value: 'proposal_sent', label: 'Styling Proposal Sent' },
    { value: 'booked', label: 'Booked / Confirmed' },
    { value: 'closed', label: 'Closed' },
  ];

  const columns = [
    { key: 'enquiryId', label: 'Enquiry Ref' },
    { key: 'client', label: 'Client Name' },
    { key: 'eventType', label: 'Event Type' },
    { key: 'venue', label: 'Venue Location' },
    { key: 'eventDate', label: 'Event Date' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Event Services"
        title="Decoration Enquiries"
        subtitle="Review event styling and venue decoration service submissions, client consultations, and date reservations."
      />

      {/* Filter / Search Bar Demo */}
      <div className="bg-[#191614] border border-[#DEAC4B]/20 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <AdminInput
            placeholder="Search enquiries by client, event type, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
        </div>
        <div>
          <AdminSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Enquiries Data Table with Auto Empty State */}
      <AdminDataTable
        columns={columns}
        data={[]}
        emptyState={
          <AdminEmptyState
            icon="decor"
            title="Decoration Enquiries Module Ready"
            description="Event styling inquiries submitted through the decoration enquiry form will populate here. Inspect the public submission form in frontend/src/pages/public/DecorationEnquiryPage.jsx."
            action={
              <AdminStatusBadge tone="purple">
                Feature Module Branch Assignment
              </AdminStatusBadge>
            }
          />
        }
      />

      {/* Developer Handoff Card */}
      <div className="bg-[#191614] border border-stone-800 rounded-lg p-5 text-xs text-stone-400 space-y-2">
        <div className="flex items-center gap-2 font-mono text-stone-300">
          <AdminIcon name="alert" size={14} className="text-[#DEAC4B]" />
          <span className="font-semibold text-white">
            Developer Note (Decor Module):
          </span>
        </div>
        <p className="leading-relaxed">
          This view is mounted at{' '}
          <code className="text-[#DEAC4B]">/admin/decoration-enquiries</code>.
          Responsible for wedding setups, corporate decor consultations, colour palette
          review, and venue site-visit scheduling. Status definitions are provisional and subject to client sign-off.
        </p>
      </div>
    </div>
  );
}
