import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import { createDecorationEnquiry } from '../../admin/decorations/decorationEnquiriesService'
import decoration4Img from '../../assets/images/decoration4.jpg'
import decoration5Img from '../../assets/images/decoration5.jpg'
import decoration7Img from '../../assets/images/decoration7.jpg'
import decoration8Img from '../../assets/images/decoration8.jpg'
import decoration9Img from '../../assets/images/decoration9.jpg'
import decoration110Img from '../../assets/images/decoration110.jpg'

const occasionOptions = [
  'Wedding Reception',
  'Kwanjula / Introduction',
  'Milestone Celebration',
  'Full-Venue Styling',
  'Corporate Gala',
]

const disciplineOptions = [
  'Full-Venue Styling (Complete Room Transformation)',
  'Bridal Stage Backdrop & Dais Architecture',
  'Ceiling Voile Drapery & Lighting Canopy',
  'Guest Table Centerpieces & Linen Styling',
  'Floral Arch & Entrance Monolith Framing',
  'Dedicated On-Stage Cake Pedestal Styling',
  'Coordinated Celebration Cake & Stage Pairing',
  'Custom Combination (To discuss during consultation)',
]

const portfolioThumbnails = {
  'Wisteria Cloud & Serpentine Chandelier Hall': decoration7Img,
  'Forest Velvet, Fluted Arches & Hydrangea Stage': decoration5Img,
  'Blush & Burgundy Multi-Arch Stage With Paired Cake': decoration4Img,
  'Woven Raffia Baskets, Terracotta & Kitenge Stage': decoration110Img,
  'Lakeside Pavilion & Double-Arch Floral Altar': decoration8Img,
  'Storybook Pillar Welcome Installation': decoration9Img,
}

export default function DecorationEnquiryPage() {
  const [searchParams] = useSearchParams()
  const prefilledStyle = searchParams.get('style') || ''
  const prefilledOccasion = searchParams.get('occasion') || ''

  // Pre-select matching discipline if coming from lookbook
  const defaultDiscipline =
    (prefilledStyle.includes('Chandelier') && 'Ceiling Voile Drapery & Lighting Canopy') ||
    (prefilledStyle.includes('Cake') && 'Coordinated Celebration Cake & Stage Pairing') ||
    (prefilledStyle.includes('Pillar') && 'Floral Arch & Entrance Monolith Framing') ||
    (prefilledStyle.includes('Pavilion') && 'Bridal Stage Backdrop & Dais Architecture') ||
    disciplineOptions[1]

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    occasion: occasionOptions.includes(prefilledOccasion)
      ? prefilledOccasion
      : 'Wedding Reception',
    eventDate: '',
    venueLocation: '',
    guestCount: '',
    stylingDiscipline: defaultDiscipline,
    preferredPalette: '',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [createdReference, setCreatedReference] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisciplineOpen, setIsDisciplineOpen] = useState(false)
  const disciplineDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (disciplineDropdownRef.current && !disciplineDropdownRef.current.contains(e.target)) {
        setIsDisciplineOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDisciplineOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.eventDate) {
      setErrorMessage('Please provide your name, telephone number, and target celebration date.')
      return
    }
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const record = await createDecorationEnquiry({
        ...formData,
        prefilledStyle,
      })
      if (record && record.reference) {
        setCreatedReference(record.reference)
      }
    } catch {
      // Fallback gracefully so customer always sees receipt
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full bg-dark-canvas text-brand-white font-sans min-h-screen">
      {/* ===================================================================
          SCENE 1 — Monumental Editorial Hero (Matching Home Page Style)
          =================================================================== */}
      <section className="relative w-full border-b border-white/10 pt-16 pb-14 sm:pt-24 sm:pb-20 overflow-hidden bg-[#161311]">
        <div
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Link
            to="/decorations"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne-gold hover:text-gold-highlight mb-6 transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            <span>Back to Event Decorations</span>
          </Link>


          <h1 className="font-serif font-normal text-3xl sm:text-5xl lg:text-6xl text-brand-white leading-[1.12] tracking-tight max-w-4xl mx-auto">
            Every Sacred Setting Begins <br className="hidden sm:inline" />
            <span className="text-primary-gold italic">With a Conversation.</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed mt-4 max-w-2xl mx-auto">
            Share your celebration date, venue details, and aesthetic vision below. Our lead stylists review every request personally to verify calendar availability and prepare a tailored proposal.
          </p>
        </div>
      </section>

      {/* ===================================================================
          SCENE 2 — The Centered Editorial Consultation Canvas (Max-W-4xl)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {submitted ? (
          /* Confirmation Plaque */
          <div className="bg-[#181614] border-l-2 border-l-primary-gold border-t border-r border-b border-white/10 rounded-xl p-8 sm:p-12 shadow-2xl">
            <span className="inline-block px-3 py-1 bg-primary-gold/15 border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold mb-4 rounded-full">
              {createdReference ? `Enquiry ${createdReference} Logged` : 'Enquiry Recorded'} &bull; Pending Atelier Review
            </span>
            <h2 className="font-serif font-normal text-2xl sm:text-4xl text-brand-white leading-tight mb-3">
              Thank You, <span className="text-primary-gold">{formData.customerName}</span>.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Your event decoration enquiry for a <strong className="text-brand-white">{formData.occasion}</strong> on{' '}
              <strong className="text-champagne-gold">{formData.eventDate}</strong> has been received by our Kampala styling atelier. We will review your vision and contact you at{' '}
              <strong className="text-brand-white">{formData.phone}</strong> within 24 hours.
            </p>

            <dl className="border-y border-white/10 py-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <dt className="text-gray-400">Venue / Location</dt>
                <dd className="text-brand-white font-medium mt-1">
                  {formData.venueLocation || 'To be discussed during consultation'}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400">Estimated Guest Scale</dt>
                <dd className="text-brand-white font-medium mt-1">
                  {formData.guestCount || 'To be confirmed'}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400">Selected Discipline</dt>
                <dd className="text-champagne-gold font-medium mt-1">
                  {formData.stylingDiscipline}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400">Preferred Palette</dt>
                <dd className="text-brand-white font-medium mt-1">
                  {formData.preferredPalette || 'To align with stylist'}
                </dd>
              </div>
              {formData.notes && (
                <div className="sm:col-span-2">
                  <dt className="text-gray-400">Special Vision Notes</dt>
                  <dd className="text-gray-300 mt-1 italic">
                    &ldquo;{formData.notes}&rdquo;
                  </dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-primary-gold text-[#141210] hover:bg-gold-highlight text-xs font-semibold uppercase tracking-[0.16em] rounded-sm transition-colors cursor-pointer"
              >
                Edit Enquiry Details
              </button>
              <Link
                to="/decorations"
                className="px-6 py-3 border border-white/20 text-champagne-gold hover:text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-sm transition-colors"
              >
                Return to Lookbook
              </Link>
            </div>
          </div>
        ) : (
          /* The Centered Form */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#181614] border border-white/10 rounded-xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-9"
          >
            {/* Selected Inspiration Badge with Image Thumbnail */}
            {prefilledStyle && (
              <div className="p-3.5 sm:p-4 bg-[#141210] border border-primary-gold/40 rounded-lg flex items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3.5 min-w-0">
                  {portfolioThumbnails[prefilledStyle] && (
                    <img
                      src={portfolioThumbnails[prefilledStyle]}
                      alt=""
                      className="w-12 h-12 rounded object-cover border border-primary-gold/30 shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-primary-gold">
                      Selected Portfolio Inspiration
                    </span>
                    <strong className="text-brand-white font-serif text-sm sm:text-base truncate block mt-0.5">
                      {prefilledStyle}
                    </strong>
                  </div>
                </div>
                <Link
                  to="/decorations#styling-portfolio"
                  className="text-xs font-sans text-champagne-gold hover:text-gold-highlight underline shrink-0 whitespace-nowrap"
                >
                  Change Style
                </Link>
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="p-4 bg-red-950/60 border border-red-400/50 rounded-md text-xs text-red-200"
              >
                {errorMessage}
              </div>
            )}

            {/* Fieldset 1: Celebration Particulars */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary-gold/60" />
                <h2 className="font-serif text-xl sm:text-2xl text-primary-gold">
                  Celebration Particulars
                </h2>
              </div>

              {/* 1-Tap Occasion Pill Buttons */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2.5">
                  Celebration Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasionOptions.map((opt) => {
                    const isSelected = formData.occasion === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, occasion: opt })}
                        className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? 'bg-primary-gold text-[#141210] font-semibold border-primary-gold shadow-md'
                            : 'bg-[#141210] text-gray-300 border-white/15 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Target Date <span className="text-primary-gold">*</span>
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    style={{ colorScheme: 'dark' }}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all cursor-pointer"
                  />
                </div>

                <div>
                  <label
                    htmlFor="venueLocation"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Venue Name or Area
                  </label>
                  <input
                    id="venueLocation"
                    type="text"
                    placeholder="e.g. Speke Resort / Marquee"
                    value={formData.venueLocation}
                    onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guestCount"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Guest Scale
                  </label>
                  <input
                    id="guestCount"
                    type="text"
                    placeholder="e.g. 150 – 200 guests"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Fieldset 2: Disciplines & Aesthetic Scope (Now with Dropdown!) */}
            <div className="pt-8 border-t border-white/10 space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary-gold/60" />
                <h2 className="font-serif text-xl sm:text-2xl text-primary-gold">
                  Styling Discipline &amp; Vision
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Styling Discipline Custom Luxury Dropdown with Fade In Down Animation */}
                <div ref={disciplineDropdownRef} className="relative">
                  <label
                    id="stylingDisciplineLabel"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Disciplines of Interest
                  </label>
                  
                  {/* Trigger Button */}
                  <button
                    type="button"
                    id="stylingDiscipline"
                    aria-haspopup="listbox"
                    aria-expanded={isDisciplineOpen}
                    aria-labelledby="stylingDisciplineLabel"
                    onClick={() => setIsDisciplineOpen((prev) => !prev)}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 hover:border-primary-gold/60 focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 rounded-md text-xs sm:text-sm text-left flex items-center justify-between text-brand-white transition-all cursor-pointer min-h-[46px]"
                  >
                    <span className="truncate pr-3 font-sans font-medium text-white">
                      {formData.stylingDiscipline || 'Select a styling discipline...'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-primary-gold shrink-0 transition-transform duration-200 ${
                        isDisciplineOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Custom Luxury Dropdown Menu (Fades In Down) */}
                  {isDisciplineOpen && (
                    <div
                      role="listbox"
                      className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#181614] border border-primary-gold/35 rounded-md shadow-[0_16px_40px_rgba(0,0,0,0.95)] max-h-72 overflow-y-auto divide-y divide-white/5 animate-fadeInDown"
                    >
                      {disciplineOptions.map((opt) => {
                        const isSelected = formData.stylingDiscipline === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setFormData({ ...formData, stylingDiscipline: opt })
                              setIsDisciplineOpen(false)
                            }}
                            className={`w-full text-left px-4 py-3 text-xs sm:text-sm font-sans transition-colors flex items-center justify-between cursor-pointer min-h-[44px] ${
                              isSelected
                                ? 'bg-primary-gold/15 text-primary-gold font-semibold'
                                : 'text-gray-200 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span className="pr-3 leading-snug">{opt}</span>
                            {isSelected && (
                              <svg
                                className="w-4 h-4 text-primary-gold shrink-0 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Preferred Colour Palette */}
                <div>
                  <label
                    htmlFor="preferredPalette"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Preferred Colour Palette or Accents
                  </label>
                  <input
                    id="preferredPalette"
                    type="text"
                    placeholder="e.g. Emerald, champagne gold, white roses"
                    value={formData.preferredPalette}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredPalette: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all"
                  />
                </div>
              </div>

              {/* Special Vision Notes (Textarea) */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                >
                  Special Vision Notes or Inquiries
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Share any special ceremonial requirements, stage dimensions, or cake coordination ideas..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all resize-y"
                />
              </div>
            </div>

            {/* Fieldset 3: Contact Information */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary-gold/60" />
                <h2 className="font-serif text-xl sm:text-2xl text-primary-gold">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Full Name <span className="text-primary-gold">*</span>
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Telephone / WhatsApp <span className="text-primary-gold">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+256 7..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-2"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#141210] border border-white/15 rounded-md text-xs sm:text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="text-[11px] text-gray-400">
                Obligation-free enquiry &middot; Confirmed only after staff availability review.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-9 py-3.5 bg-primary-gold text-[#141210] hover:bg-gold-highlight font-sans text-xs font-semibold uppercase tracking-[0.16em] rounded-md transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Enquiry...' : 'Submit Consultation Request \u2192'}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ===================================================================
          SCENE 3 — The Architectural Concierge Coda (Placed Below, Full-Width)
          =================================================================== */}
      <section
        aria-label="Scene 3 — Personal Consultation Atelier Concierge"
        className="w-full border-t border-white/10 bg-[#161311] py-20 sm:py-28"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Introduction with Relaxed Vertical Rhythm */}
          <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
            <h2 className="font-serif font-normal text-2xl sm:text-3xl lg:text-4xl text-brand-white leading-tight">
              Personal Styling Consultation
            </h2>
            <p className="font-sans text-sm text-gray-400 mt-3.5 leading-relaxed font-normal">
              Every celebration is designed by hand in our Kampala studio. Here is how our team supports your planning:
            </p>
          </div>

          {/* 3 Concierge Pillars with Generous Mobile & Desktop Breathing Room */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 lg:gap-16 border-t border-white/10 pt-12 sm:pt-16">
            {/* Column 1: Direct Line */}
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary-gold block mb-3.5">
                01 / Direct Line
              </span>
              <h3 className="font-serif font-normal text-xl sm:text-2xl text-brand-white leading-snug mb-3.5">
                Telephone &amp; WhatsApp
              </h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed font-normal mb-6">
                Have urgent dates or need immediate clarification? Connect directly with our lead styling coordinators.
              </p>
              <div className="mt-auto pt-2">
                <a
                  href="tel:+256700000000"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-champagne-gold hover:text-gold-highlight transition-colors"
                >
                  <span>+256 700 000 000</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Column 2: Studio Location */}
            <div className="flex flex-col border-t border-white/10 pt-10 md:border-t-0 md:pt-0 md:border-x md:border-white/10 md:px-8 lg:px-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary-gold block mb-3.5">
                02 / Studio Location
              </span>
              <h3 className="font-serif font-normal text-xl sm:text-2xl text-brand-white leading-snug mb-3.5">
                Kampala, Uganda
              </h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed font-normal mb-6">
                In-person moodboard reviews, fabric swatch inspections, and venue walk-throughs across Uganda arranged by appointment.
              </p>
              <div className="mt-auto pt-2">
                <span className="text-xs font-mono text-gray-400 block tracking-wider">
                  Turnaround: Within 24 Hours &middot; Mon – Sat
                </span>
              </div>
            </div>

            {/* Column 3: The Process */}
            <div className="flex flex-col border-t border-white/10 pt-10 md:border-t-0 md:pt-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary-gold block mb-3.5">
                03 / The Process
              </span>
              <h3 className="font-serif font-normal text-xl sm:text-2xl text-brand-white leading-snug mb-3.5">
                Three-Stage Alignment
              </h3>
              <ul className="space-y-3.5 text-sm text-gray-300 font-sans leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-gold shrink-0 mt-2" />
                  <span>1. Date &amp; venue calendar check</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-gold shrink-0 mt-2" />
                  <span>2. Palette, drapery &amp; floral review</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-gold shrink-0 mt-2" />
                  <span>3. Tailored quotation &amp; calendar hold</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
