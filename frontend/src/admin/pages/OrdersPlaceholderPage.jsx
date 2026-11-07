import React, { useState } from 'react';
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

export default function OrdersPlaceholderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // PROVISIONAL: Order statuses are illustrative placeholders pending client sign-off
  const statusOptions = [
    { value: 'all', label: 'All Statuses (Provisional)' },
    { value: 'pending', label: 'Pending Payment / Verification' },
    { value: 'confirmed', label: 'Confirmed & Queued' },
    { value: 'production', label: 'In Baking / Decorating' },
    { value: 'dispatched', label: 'Dispatched / In Delivery' },
    { value: 'delivered', label: 'Delivered / Completed' },
  ];

  const columns = [
    { key: 'reference', label: 'Order Ref' },
    { key: 'customer', label: 'Customer' },
    { key: 'items', label: 'Items & Tiers' },
    { key: 'deliveryDate', label: 'Delivery Date' },
    { key: 'amount', label: 'Amount (UGX)' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Orders Management"
        title="Standard Cake Orders"
        subtitle="Manage customer orders originating from the online cake catalogue, fulfillment workflows, and delivery schedules."
        actions={
          <AdminButton
            variant="secondary"
            icon="filter"
            onClick={() => {}}
            disabled
          >
            Export Orders
          </AdminButton>
        }
      />

      {/* Filter / Search Bar Demo */}
      <div className="bg-[#191614] border border-[#DEAC4B]/20 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <AdminInput
            placeholder="Search by customer name, phone, or order reference..."
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

      {/* Orders Data Table with Auto Empty State */}
      <AdminDataTable
        columns={columns}
        data={[]}
        emptyState={
          <AdminEmptyState
            icon="orders"
            title="Orders Module Foundation Ready"
            description="The orders management table structure is ready for data integration. Orders submitted through the public cart checkout will populate here once backend persistence is connected."
            action={
              <div className="flex items-center gap-2">
                <AdminStatusBadge tone="gold">Phase 4.2 Module Assignment</AdminStatusBadge>
              </div>
            }
          />
        }
      />

      {/* Developer Handoff Card */}
      <div className="bg-[#191614] border border-stone-800 rounded-lg p-5 text-xs text-stone-400 space-y-2">
        <div className="flex items-center gap-2 font-mono text-stone-300">
          <AdminIcon name="alert" size={14} className="text-[#DEAC4B]" />
          <span className="font-semibold text-white">Developer Note (Orders Module):</span>
        </div>
        <p className="leading-relaxed">
          This view is mounted at <code className="text-[#DEAC4B]">/admin/orders</code>. When implementing this module,
          integrate with customer checkout records. Proposed workflow statuses are provisional pending client sign-off.
          Use the shared UI library (<code className="text-stone-300">AdminDataTable</code>, <code className="text-stone-300">AdminStatusBadge</code>, <code className="text-stone-300">AdminModal</code>).
        </p>
      </div>
    </div>
  );
}
