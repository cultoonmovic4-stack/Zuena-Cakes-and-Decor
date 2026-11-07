import React from 'react';
import { useLocation, Link } from 'react-router';
import { ADMIN_NAV_ITEMS } from '../../navigation/adminNavigation';
import AdminIcon from '../ui/AdminIcon';

/**
 * Modern, elegant, and minimal Admin Header component.
 *
 * Left: Compact context breadcrumb (Workspace / Current Page Name)
 * Right: Subtle Preview indicator & View Store storefront link
 *
 * Designed using Zuena brand tokens (Lato typography, dark canvas surfaces,
 * hairline gold borders) without SaaS bloat or decorative gradients.
 *
 * @param {Object} props
 * @param {Function} props.onOpenSidebar - Callback to open mobile navigation drawer
 */
export default function AdminHeader({ onOpenSidebar }) {
  const location = useLocation();

  // Dynamically resolve active route title
  const activeNav = ADMIN_NAV_ITEMS.find((item) =>
    location.pathname.startsWith(item.path)
  );
  const currentTitle = activeNav ? activeNav.label : 'Overview';

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#191614] border-b border-[#DEAC4B]/15 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 select-none">
      {/* Left: Mobile drawer toggle & compact breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 text-stone-400 hover:text-white rounded border border-stone-800 hover:border-[#DEAC4B]/30 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DEAC4B] shrink-0"
          aria-label="Open mobile navigation menu"
        >
          <AdminIcon name="menu" size={17} />
        </button>

        {/* Compact Breadcrumb: Workspace / Current Page */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-sans min-w-0"
        >
          <Link
            to="/admin/overview"
            className="text-stone-400 hover:text-stone-200 transition-colors shrink-0"
            title="Return to Workspace Overview"
          >
            Workspace
          </Link>
          <span
            className="text-stone-600 text-[11px] select-none"
            aria-hidden="true"
          >
            /
          </span>
          <span
            className="text-stone-100 font-medium truncate"
            aria-current="page"
          >
            {currentTitle}
          </span>
        </nav>
      </div>

      {/* Right: Subtle Preview indicator & View Store link */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Subtle Preview Indicator */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-medium text-[#DEAC4B] bg-[#DEAC4B]/10 border border-[#DEAC4B]/20 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#DEAC4B]"
            aria-hidden="true"
          />
          <span>Preview</span>
        </div>

        {/* View Store Navigation Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-sans text-stone-300 hover:text-white rounded border border-stone-800 hover:border-[#DEAC4B]/40 bg-stone-900/60 transition-colors shrink-0"
          title="Return to customer storefront"
        >
          <AdminIcon name="external-link" size={12} />
          <span>View Store</span>
        </Link>
      </div>
    </header>
  );
}
