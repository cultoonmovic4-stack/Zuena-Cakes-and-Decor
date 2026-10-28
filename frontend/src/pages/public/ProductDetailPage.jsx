import { useParams, Link } from 'react-router'

export default function ProductDetailPage() {
  const { slug } = useParams()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400 flex items-center gap-2">
        <Link to="/" className="hover:text-primary-gold transition-colors">Home</Link>
        <span>/</span>
        <Link to="/creations" className="hover:text-primary-gold transition-colors">Our Creations</Link>
        <span>/</span>
        <span className="text-gray-200 capitalize font-medium">{slug?.replace(/-/g, ' ') || 'Product Detail'}</span>
      </nav>

      {/* Product Shell Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#1A1815] border border-bronze/30 rounded-xl p-6 sm:p-10">
        {/* Visual Media Placeholder (No Logo Misuse) */}
        <div className="w-full aspect-4/3 bg-[#141210] border border-bronze/20 rounded-lg flex flex-col items-center justify-center text-center p-6">
          <svg aria-hidden="true" className="w-12 h-12 text-primary-gold/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-gray-400 font-mono">
            [Development Image Placeholder: {slug || 'Product'}]
          </span>
          <span className="text-[11px] text-gray-500 mt-1">
            Product photography integration scheduled for Phase 3D
          </span>
        </div>

        {/* Product Information Shell */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-mono text-bronze font-semibold">
              Catalogue Item Shell
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-primary-gold mt-2 mb-3 capitalize">
              {slug?.replace(/-/g, ' ') || 'Celebration Cake'}
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Handcrafted celebration cake with customizable size, tiering, and flavor selections. Designed for special milestone occasions.
            </p>

            {/* Options Shell Placeholder */}
            <div className="border-t border-b border-white/10 py-4 mb-6 space-y-3">
              <div className="text-xs text-gray-400 flex items-center justify-between">
                <span>Supported Options:</span>
                <span className="text-gray-200">Servings / Sizes &bull; Flavors</span>
              </div>
              <div className="text-xs text-gray-400 flex items-center justify-between">
                <span>Pricing Status:</span>
                <span className="text-gold-highlight font-mono">Sample Estimate Configurator (Phase 3D)</span>
              </div>
            </div>
          </div>

          <div>
            <div className="p-3 bg-[#141210] border border-bronze/30 rounded text-xs text-gray-400 mb-4">
              <p className="font-medium text-gray-300 mb-0.5">Price &amp; Request Note:</p>
              <p>Prices displayed during development are sample estimates. Actual pricing is confirmed by staff upon review.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled
                className="flex-1 py-3 px-4 bg-primary-gold/40 text-dark-canvas/70 font-medium text-xs rounded cursor-not-allowed text-center"
              >
                Add to Order Request (Phase 3D)
              </button>
              <Link
                to="/creations"
                className="py-3 px-4 border border-white/20 hover:border-white/40 text-xs text-gray-300 rounded transition-colors text-center"
              >
                &larr; Back to Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
