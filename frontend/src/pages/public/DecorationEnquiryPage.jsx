import { Link } from 'react-router'

export default function DecorationEnquiryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest px-3 py-1 bg-bronze/20 text-gold-highlight border border-bronze/40 rounded-full font-mono font-medium">
          Service Enquiry
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary-gold mt-3 mb-2">
          Event Decoration Enquiry
        </h1>
        <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
          Tell us about your celebration date, venue location, and styling vision for an obligation-free consultation.
        </p>
      </div>

      {/* Form Shell Information Card */}
      <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-8 mb-8">
        <div className="border-b border-white/10 pb-6 mb-6">
          <h2 className="text-xl font-serif font-semibold text-primary-gold mb-2">
            Decoration Enquiry Consultation
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Decoration enquiries are obligation-free consultative requests. Submitting this form allows staff to review your date and venue availability before proposing a customized styling package.
          </p>
        </div>

        {/* Planned Enquiry Fields */}
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-[#141210] border border-white/10 rounded-lg">
            <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-2">
              Planned Enquiry Fields (Phase 3E):
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
              <li className="flex items-center gap-2">&bull; Event Category (Wedding, Kwanjula, Birthday, Corporate)</li>
              <li className="flex items-center gap-2">&bull; Event Date</li>
              <li className="flex items-center gap-2">&bull; Venue Location / Address</li>
              <li className="flex items-center gap-2">&bull; Approximate Guest Count</li>
              <li className="flex items-center gap-2">&bull; Preferred Styling Themes &amp; Color Palette</li>
              <li className="flex items-center gap-2">&bull; Customer Contact Details (Name, Phone, Email)</li>
            </ul>
          </div>
        </div>

        {/* Development Notice */}
        <div className="text-center p-4 bg-[#141210] border border-bronze/30 rounded text-xs text-gray-400">
          <p className="font-medium text-gold-highlight mb-1">Phase 3B Route Shell</p>
          <p>Interactive enquiry form controls and validation are scheduled for Phase 3E implementation.</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/decorations"
          className="text-xs text-gray-400 hover:text-primary-gold transition-colors"
        >
          &larr; Return to Decoration Services Overview
        </Link>
      </div>
    </div>
  )
}
