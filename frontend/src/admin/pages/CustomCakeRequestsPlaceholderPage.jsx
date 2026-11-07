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

export default function CustomCakeRequestsPlaceholderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // PROVISIONAL: Custom cake request statuses are illustrative placeholders pending client sign-off
  const statusOptions = [
    { value: 'all', label: 'All Request Statuses (Provisional)' },
    { value: 'new', label: 'New / Unreviewed' },
    { value: 'quoted', label: 'Price Quote Sent' },
    { value: 'approved', label: 'Approved & Scheduled' },
    { value: 'completed', label: 'Completed' },
  ];

  const columns = [
    { key: 'requestId', label: 'Request ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'eventDate', label: 'Event Date & Occasion' },
    { key: 'tiersFlavours', label: 'Tiers & Flavours' },
    { key: 'designUploads', label: 'Design Ref' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Custom Cake Pipeline"
        title="Custom Cake Requests"
        subtitle="Review bespoke cake requests from the custom cake builder, inspect design attachments, and prepare price quotations."
      />

      {/* Filter / Search Bar Demo */}
      <div className="bg-[#191614] border border-[#DEAC4B]/20 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <AdminInput
            placeholder="Search custom requests by customer or occasion..."
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

      {/* Requests Data Table with Auto Empty State */}
      <AdminDataTable
        columns={columns}
        data={[]}
        emptyState={
          <AdminEmptyState
            icon="cake"
            title="Custom Requests Module Ready"
            description="Bespoke celebration and wedding cake inquiries submitted through the custom cake builder will populate here. Inspect public form schema in frontend/src/pages/public/CustomCakePage.jsx."
            action={
              <AdminStatusBadge tone="amber">
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
            Developer Note (Custom Cake Module):
          </span>
        </div>
        <p className="leading-relaxed">
          This view is mounted at{' '}
          <code className="text-[#DEAC4B]">/admin/custom-cake-requests</code>. The
          developer building this module will manage custom cake specifications,
          customer image attachments, serving size calculations, and WhatsApp/email quote
          coordination. Note that review statuses are provisional pending final business rules.
        </p>
      </div>
    </div>
  );
}
