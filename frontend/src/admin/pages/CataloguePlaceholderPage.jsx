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

export default function CataloguePlaceholderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // PROVISIONAL: Catalogue categories and status filters are illustrative placeholders pending client sign-off
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'wedding', label: 'Wedding Cakes' },
    { value: 'birthday', label: 'Birthday Cakes' },
    { value: 'graduation', label: 'Graduation Cakes' },
    { value: 'traditional', label: 'Traditional & Kwanjula' },
    { value: 'modern-glamour', label: 'Modern Glamour & Drip' },
  ];

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'basePrice', label: 'Base Price (UGX)' },
    { key: 'tiers', label: 'Tier Options' },
    { key: 'status', label: 'Availability' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Catalogue &amp; Inventory"
        title="Catalogue Management"
        subtitle="Manage cake catalogue items, pricing tiers, descriptions, and category visibility across the public storefront."
        actions={
          <AdminButton variant="primary" icon="catalogue" disabled>
            Add New Product
          </AdminButton>
        }
      />

      {/* Filter / Search Bar Demo */}
      <div className="bg-[#191614] border border-[#DEAC4B]/20 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <AdminInput
            placeholder="Search catalogue items by name, flavor, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="search"
          />
        </div>
        <div>
          <AdminSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categoryOptions}
          />
        </div>
      </div>

      {/* Catalogue Data Table with Auto Empty State */}
      <AdminDataTable
        columns={columns}
        data={[]}
        emptyState={
          <AdminEmptyState
            icon="catalogue"
            title="Catalogue Management Ready"
            description="37 catalogue items currently stored in frontend/src/data/creationsData.js (cakeProducts) are ready to be integrated into an administrative CRUD management interface."
            action={
              <AdminStatusBadge tone="blue">
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
            Developer Note (Catalogue Module):
          </span>
        </div>
        <p className="leading-relaxed">
          This view is mounted at <code className="text-[#DEAC4B]">/admin/catalogue</code>.
          The developer building this module will manage product creation, image gallery references,
          tier pricing matrices, and category classifications using the shared UI components.
          Reference data source: <code className="text-stone-300">frontend/src/data/creationsData.js</code> (exports <code className="text-[#DEAC4B]">cakeProducts</code> and <code className="text-[#DEAC4B]">cakeCategories</code>).
        </p>
      </div>
    </div>
  );
}
