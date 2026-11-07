import { useState } from 'react';
import { Outlet } from 'react-router';
import AdminSidebar from '../admin/components/layout/AdminSidebar';
import AdminHeader from '../admin/components/layout/AdminHeader';

/**
 * Main application shell for the Zuena Cakes & Decor Admin Portal.
 * Establishes a hybrid responsive layout supporting an expanded/collapsed
 * desktop sidebar with localStorage persistence, mobile drawer overlay,
 * context header, and centered operational content viewport.
 */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('zuena_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Sync preference with localStorage
  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('zuena_admin_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#141210] text-stone-100 flex font-sans">
      {/* Sidebar Navigation (Desktop persistent hybrid, Mobile drawer) */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main Content Area (Dynamic offset on desktop based on collapse state) */}
      <div
        className={`flex-1 flex flex-col min-w-0 min-h-screen transition-[padding] duration-200 ease-in-out ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Context Header */}
        <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Dynamic Route Viewport */}
        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
