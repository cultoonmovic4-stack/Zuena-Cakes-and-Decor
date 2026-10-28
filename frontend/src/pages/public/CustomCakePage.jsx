import { Link } from 'react-router'

export default function CustomCakePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest px-3 py-1 bg-bronze/20 text-gold-highlight border border-bronze/40 rounded-full font-mono font-medium">
          Bespoke Creations
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary-gold mt-3 mb-2">
          Request a Custom Cake
        </h1>
        <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
          Have a unique theme, cultural ceremony design, or bespoke vision in mind? Tell us about your celebration and submit your specifications for review.
        </p>
      </div>

      {/* Form Shell Information Card */}
      <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-8 mb-8">
        <div className="border-b border-white/10 pb-6 mb-6">
          <h2 className="text-xl font-serif font-semibold text-primary-gold mb-2">
            Custom Consultation Process
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Custom cake requests are consultative submissions handled directly by authorized staff.
            Submitting a request does not charge a card or represent an automated booking.
          </p>
        </div>

        {/* Planned Form Fields Overview */}
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-[#141210] border border-white/10 rounded-lg">
            <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
              Planned Custom Submission Fields (Phase 3D):
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
              <li className="flex items-center gap-2">&bull; Occasion / Event Category</li>
              <li className="flex items-center gap-2">&bull; Required Event Date</li>
              <li className="flex items-center gap-2">&bull; Approximate Servings / Tiers</li>
              <li className="flex items-center gap-2">&bull; Flavor Preferences</li>
              <li className="flex items-center gap-2">&bull; Detailed Design Notes</li>
              <li className="flex items-center gap-2">&bull; Reference Image Upload (PNG/JPEG)</li>
              <li className="flex items-center gap-2">&bull; Collection vs. Delivery Preference</li>
              <li className="flex items-center gap-2">&bull; Customer Contact Details</li>
            </ul>
          </div>
        </div>

        {/* Development Notice */}
        <div className="text-center p-4 bg-[#141210] border border-bronze/30 rounded text-xs text-gray-400">
          <p className="font-medium text-gold-highlight mb-1">Phase 3B Route Shell</p>
          <p>Interactive form controls, validation, and client-side image preview are scheduled for Phase 3D implementation.</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/creations"
          className="text-xs text-gray-400 hover:text-primary-gold transition-colors"
        >
          &larr; Return to Our Creations Catalogue
        </Link>
      </div>
    </div>
  )
}
