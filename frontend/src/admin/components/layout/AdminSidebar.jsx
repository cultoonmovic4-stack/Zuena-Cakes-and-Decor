import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { ADMIN_NAV_ITEMS } from '../../navigation/adminNavigation';
import AdminIcon from '../ui/AdminIcon';

/**
 * Hybrid Admin Sidebar component.
 * Supports:
 * 1. Desktop expanded state (default w-64) with full brand text and labels.
 * 2. Desktop collapsed state (w-20) with compact brand mark, centered icons, and accessible tooltips.
 * 3. Mobile collapsible drawer overlay (w-72) with Escape key listener and body scroll lock.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Mobile drawer visibility
 * @param {Function} props.onClose - Mobile drawer close handler
 * @param {boolean} props.isCollapsed - Desktop collapsed state
 * @param {Function} props.onToggleCollapse - Desktop collapse toggle callback
 */
export default function AdminSidebar({
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) {
  // Mobile drawer keyboard Escape listener and body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Render sidebar contents for desktop
  const renderDesktopContent = () => (
    <div className="flex flex-col h-full bg-[#191614] text-stone-200 select-none">
      {/* Brand Header */}
      <div
        className={`border-b border-[#DEAC4B]/15 flex items-center shrink-0 ${
          isCollapsed
            ? 'flex-col justify-center py-4 px-2 gap-3'
            : 'justify-between p-5'
        }`}
      >
        <Link
          to="/admin/overview"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DEAC4B] rounded"
          title="Zuena Cakes &amp; Decor"
        >
          <img
            src="/z.png"
            alt="Zuena Cakes &amp; Decor Logo"
            className="w-8 h-8 object-contain shrink-0"
          />
          {!isCollapsed && (
            <div>
              <span className="font-serif font-bold text-base text-white tracking-wide group-hover:text-[#FBD46D] transition-colors block">
                Zuena Cakes
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#DEAC4B] px-1.5 py-0.5 bg-[#DEAC4B]/10 rounded border border-[#DEAC4B]/20 inline-block mt-0.5">
                Staff Operations
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse / Expand Toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 text-stone-400 hover:text-white rounded border border-stone-800 hover:border-[#DEAC4B]/40 hover:bg-stone-800/50 transition-colors focus:outline-none focus:ring-1 focus:ring-[#DEAC4B]"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand navigation sidebar' : 'Collapse navigation sidebar'}
        >
          <AdminIcon
            name="chevron-right"
            size={14}
            className={`transition-transform duration-200 ${
              isCollapsed ? '' : 'rotate-180'
            }`}
          />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-5 px-2.5 overflow-y-auto space-y-4">
        <div>
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-2">
              Operations
            </p>
          )}
          <nav className="space-y-1" aria-label="Admin Navigation">
            {ADMIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                aria-label={item.label}
                className={({ isActive }) =>
                  `flex items-center rounded text-xs sm:text-sm font-sans transition-colors border-l-2 ${
                    isCollapsed
                      ? 'justify-center p-2.5'
                      : 'gap-3 px-3 py-2.5'
                  } ${
                    isActive
                      ? 'bg-[#DEAC4B]/15 text-[#DEAC4B] border-[#DEAC4B] font-medium'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40 border-transparent font-normal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <AdminIcon
                      name={item.icon}
                      size={17}
                      className={isActive ? 'text-[#DEAC4B]' : 'text-stone-400'}
                    />
                    {!isCollapsed && (
                      <span className="leading-snug truncate">{item.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  // Render sidebar contents for mobile drawer (always full expanded width)
  const renderMobileContent = () => (
    <div className="flex flex-col h-full bg-[#191614] text-stone-200 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#DEAC4B]/15 flex items-center justify-between shrink-0">
        <Link
          to="/admin/overview"
          onClick={onClose}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img
            src="/z.png"
            alt="Zuena Cakes &amp; Decor Logo"
            className="w-8 h-8 object-contain shrink-0"
          />
          <div>
            <span className="font-serif font-bold text-base text-white tracking-wide block">
              Zuena Cakes
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#DEAC4B] px-1.5 py-0.5 bg-[#DEAC4B]/10 rounded border border-[#DEAC4B]/20 inline-block mt-0.5">
              Staff Operations
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-stone-400 hover:text-white rounded border border-transparent hover:border-[#DEAC4B]/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#DEAC4B]"
          aria-label="Close navigation sidebar"
        >
          <AdminIcon name="close" size={18} />
        </button>
      </div>

      {/* Navigation Group */}
      <div className="flex-1 py-5 px-3 overflow-y-auto space-y-5">
        <div>
          <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-2">
            Operations
          </p>
          <nav className="space-y-1" aria-label="Mobile Admin Navigation">
            {ADMIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded text-sm font-sans transition-colors border-l-2 ${
                    isActive
                      ? 'bg-[#DEAC4B]/15 text-[#DEAC4B] border-[#DEAC4B] font-medium'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40 border-transparent font-normal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <AdminIcon
                      name={item.icon}
                      size={17}
                      className={isActive ? 'text-[#DEAC4B]' : 'text-stone-400'}
                    />
                    <span className="leading-snug">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Expanded: w-64, Collapsed: w-20) */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 border-r border-[#DEAC4B]/15 transition-[width] duration-200 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        aria-label="Desktop Administrative Sidebar"
      >
        {renderDesktopContent()}
      </aside>

      {/* Mobile Collapsible Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Solid Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 border-r border-[#DEAC4B]/20 shadow-2xl"
            aria-label="Mobile Navigation Drawer"
          >
            {renderMobileContent()}
          </aside>
        </div>
      )}
    </>
  );
}
