import { Outlet } from 'react-router'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#11100E] text-brand-white font-sans">
      {/* Staff Administrative Header Shell */}
      <header className="w-full bg-[#181614] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-serif text-lg font-semibold text-primary-gold tracking-wide">
              Zuena Cakes &amp; Decor
            </span>
            <span className="shrink-0 text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 bg-bronze/30 text-gold-highlight border border-bronze/40 rounded">
              Staff Administration
            </span>
          </div>
          {/* Administrative Navigation Shell (structural placeholder) */}
          <nav aria-label="Staff Administration Navigation" className="text-xs text-gray-400">
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-gray-400 font-medium">
              Admin Workspace Shell
            </span>
          </nav>
        </div>
      </header>

      {/* Main Administrative Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Staff Administrative Footer Shell */}
      <footer className="w-full bg-[#181614] border-t border-white/10 py-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>Zuena Cakes &amp; Decor &bull; Staff Administration Shell</p>
        </div>
      </footer>
    </div>
  )
}
