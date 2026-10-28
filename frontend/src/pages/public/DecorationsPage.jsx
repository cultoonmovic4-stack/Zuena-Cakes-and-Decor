import { Link } from 'react-router'

export default function DecorationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest px-3 py-1 bg-bronze/20 text-gold-highlight border border-bronze/40 rounded-full font-mono font-medium">
          Celebration Styling
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary-gold mt-3 mb-2">
          Event Decoration Services
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Bespoke venue styling, stage backdrops, ceremonial ambiance, and floral arrangements tailored with equal artistic prominence.
        </p>
      </div>

      {/* Service Highlights Grid (Equal Prominence) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Service 1 */}
        <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="w-full aspect-16/9 bg-[#141210] border border-bronze/20 rounded-lg mb-4 flex items-center justify-center p-3 text-center">
              <span className="text-[11px] text-gray-400 font-mono">[Development Visual Placeholder: Wedding Decor]</span>
            </div>
            <h2 className="text-xl font-serif font-semibold text-primary-gold mb-2">
              Wedding Receptions
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Head-table styling, bridal stage backdrops, ambient lighting, and floral table settings designed to create memorable celebration spaces.
            </p>
          </div>
        </div>

        {/* Service 2 */}
        <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="w-full aspect-16/9 bg-[#141210] border border-bronze/20 rounded-lg mb-4 flex items-center justify-center p-3 text-center">
              <span className="text-[11px] text-gray-400 font-mono">[Development Visual Placeholder: Kwanjula Decor]</span>
            </div>
            <h2 className="text-xl font-serif font-semibold text-primary-gold mb-2">
              Kwanjula &amp; Traditional
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Authentic cultural ceremony setups honoring heritage with royal stage styling, traditional draping, and ceremonial seating arrangements.
            </p>
          </div>
        </div>

        {/* Service 3 */}
        <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="w-full aspect-16/9 bg-[#141210] border border-bronze/20 rounded-lg mb-4 flex items-center justify-center p-3 text-center">
              <span className="text-[11px] text-gray-400 font-mono">[Development Visual Placeholder: Milestone Parties]</span>
            </div>
            <h2 className="text-xl font-serif font-semibold text-primary-gold mb-2">
              Milestone Celebrations
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Themed photo backdrops, balloon installations, custom signage, and dessert table styling for birthdays, anniversaries, and graduations.
            </p>
          </div>
        </div>
      </div>

      {/* Enquiry Call to Action Banner */}
      <div className="bg-[#181614] border border-bronze/40 rounded-xl p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif font-semibold text-primary-gold mb-2">
          Planning an Upcoming Event?
        </h2>
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          Submit your event details, venue location, and styling preferences for a personalized decoration proposal.
        </p>
        <Link
          to="/decorations/enquire"
          className="inline-block px-6 py-3 bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-medium text-xs rounded transition-colors"
        >
          Enquire About Event Decor &rarr;
        </Link>
        <div className="mt-4 text-[11px] text-gray-500 font-mono">
          Phase 3B Route Shell &bull; Interactive portfolio showcase scheduled for Phase 3E
        </div>
      </div>
    </div>
  )
}
