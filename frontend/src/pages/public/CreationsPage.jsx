import { Link } from 'react-router'

export default function CreationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest px-3 py-1 bg-bronze/20 text-gold-highlight border border-bronze/40 rounded-full font-mono font-medium">
          Cake Catalogue
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary-gold mt-3 mb-2">
          Our Creations
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Browse celebration cakes designed for weddings, traditional ceremonies (Kwanjula), birthdays, and custom milestones.
        </p>
      </div>

      {/* Custom Cake Prompt Banner */}
      <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-serif font-semibold text-primary-gold mb-1">
            Looking for a Bespoke Cake Design?
          </h2>
          <p className="text-xs text-gray-400">
            If your desired design is not in the catalogue, submit a custom request with your specifications and reference images.
          </p>
        </div>
        <Link
          to="/custom-cake"
          className="shrink-0 px-5 py-2.5 bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-medium text-xs rounded transition-colors"
        >
          Request Custom Cake
        </Link>
      </div>

      {/* Catalogue Placeholder & Sample Card Preview */}
      <div className="bg-[#181614] border border-white/10 rounded-xl p-8 text-center mb-10">
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-bronze/20 border border-bronze/40 flex items-center justify-center mx-auto mb-4 text-primary-gold">
            <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold text-primary-gold mb-2">
            Catalogue Discovery Shell
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            Interactive occasion filtering (Weddings, Kwanjula, Birthdays), cake-type filters (Tiered, Photo, Cupcakes), and search features are scheduled for Phase 3C implementation.
          </p>
          <div className="text-xs text-gray-400">
            Preview sample detail view:{' '}
            <Link
              to="/creations/celebration-tiered-cake"
              className="text-gold-highlight hover:underline font-medium"
            >
              Celebration Tiered Cake Sample &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
