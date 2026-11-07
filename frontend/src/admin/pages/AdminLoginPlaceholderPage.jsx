import React from 'react';
import { Link } from 'react-router';
import { AdminButton, AdminInput, AdminIcon } from '../components/ui';

/**
 * Admin Login placeholder page.
 * Provides a brand-aligned access point and explicitly states that real authentication
 * will be connected to the Laravel Sanctum backend in Phase 7.
 * Provides a clean path into the development preview workspace.
 */
export default function AdminLoginPlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#141210] flex flex-col justify-center items-center p-4">
      {/* Brand Card */}
      <div className="w-full max-w-md bg-[#191614] border border-[#DEAC4B]/25 rounded-lg shadow-2xl p-6 sm:p-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <img
            src="/z.png"
            alt="Zuena Cakes & Decor"
            className="w-14 h-14 mx-auto object-contain mb-3"
          />
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
            Zuena Cakes &amp; Decor
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-[#DEAC4B] mt-1 font-mono">
            Staff Operations Portal
          </p>
        </div>

        {/* Informational Callout: Authentication Deferred */}
        <div className="mb-6 bg-[#141210] border border-[#DEAC4B]/20 rounded-md p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#DEAC4B]">
            <AdminIcon name="alert" size={14} />
            <span className="font-semibold uppercase tracking-wider">
              Phase 4.1 Notice
            </span>
          </div>
          <p className="font-sans text-xs text-stone-300 leading-relaxed">
            Real session authentication and role-based access controls are deferred to{' '}
            <strong className="text-white">Phase 7 (Laravel Sanctum)</strong>. No credentials or
            mock tokens are required during frontend foundation review.
          </p>
        </div>

        {/* Illustrative Form Elements (Disabled) */}
        <div className="space-y-4 mb-6">
          <AdminInput
            label="Staff Email"
            placeholder="staff@zuenacakes.com"
            disabled
            value="staff@zuenacakes.com"
            onChange={() => {}}
            hint="Authentication disabled during Phase 4 preview mode"
          />
          <AdminInput
            label="Security Password"
            type="password"
            placeholder="••••••••••••"
            disabled
            value="preview-mode"
            onChange={() => {}}
          />
        </div>

        {/* Enter Portal Action */}
        <div className="space-y-4">
          <AdminButton
            to="/admin/overview"
            variant="primary"
            className="w-full justify-center text-sm py-2.5 font-medium"
          >
            Enter Admin Workspace (Preview Mode)
          </AdminButton>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-sans text-stone-400 hover:text-[#DEAC4B] transition-colors"
            >
              <AdminIcon name="arrow-left" size={12} />
              <span>Return to Customer Storefront</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer System Attribution */}
      <div className="mt-8 text-center text-xs font-mono text-stone-600">
        Zuena Cakes &amp; Decor Operations &bull; Foundation v1.0
      </div>
    </div>
  );
}

