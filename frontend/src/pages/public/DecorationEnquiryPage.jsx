import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import sweetheartStageImg from '../../assets/images/decoration5.jpg'
import receptionCanopyImg from '../../assets/images/decoration7.jpg'
import lanternTableImg from '../../assets/images/decoration4.jpg'

const occasionOptions = [
  'Wedding Reception',
  'Kwanjula / Introduction',
  'Milestone Celebration',
  'Table & Floral Styling',
  'Full-Venue Styling',
  'Corporate / Gala Event',
]

const scopeCheckboxes = [
  'Bridal / Ceremonial Stage Backdrop',
  'Ceiling Voile Drapery & Lighting Canopy',
  'Guest Table Centerpieces & Chargers',
  'Floral Arch & Entrance Framing',
  'Dedicated Cake Stage & Pedestal Styling',
  'Coordinated Custom Celebration Cake',
]

export default function DecorationEnquiryPage() {
  const [searchParams] = useSearchParams()
  const prefilledStyle = searchParams.get('style') || ''
  const prefilledOccasion = searchParams.get('occasion') || ''

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
    preferredPalette: prefilledStyle ? `Inspired by: ${prefilledStyle}` : '',
    selectedScopes: [
      'Bridal / Ceremonial Stage Backdrop',
      'Guest Table Centerpieces & Chargers',
    ],
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleScopeToggle = (scopeItem) => {
    setFormData((prev) => {
      const exists = prev.selectedScopes.includes(scopeItem)
      return {
        ...prev,
        selectedScopes: exists
          ? prev.selectedScopes.filter((item) => item !== scopeItem)
          : [...prev.selectedScopes, scopeItem],
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.eventDate) {
      setErrorMessage('Please provide your name, telephone number, and target celebration date.')
      return
    }
    setErrorMessage('')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="w-full bg-dark-canvas text-brand-white font-sans min-h-screen">
      {/* Top Editorial Banner */}
      <section className="relative w-full border-b border-bronze/25 py-14 sm:py-20 overflow-hidden bg-[#161311]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              to="/decorations"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne-gold hover:text-gold-highlight mb-5 transition-colors"
            >
              <span aria-hidden="true">&larr;</span>
              <span>Back to Event Decorations</span>
            </Link>
            <h1 className="font-serif font-normal text-3xl sm:text-5xl text-primary-gold leading-[1.12] tracking-tight">
              Begin Your Event Styling <span className="text-brand-white">Consultation.</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed mt-3.5 max-w-2xl">
              Share your celebration date, venue details, and preferred aesthetic direction. Submitting an enquiry is obligation-free—our stylists review every request personally to confirm calendar availability and prepare a tailored proposal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Consultation Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (Cols 1-8): Interactive Consultation Form or Confirmation Plaque */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-[#181512] border-l-2 border-l-primary-gold border-t border-r border-b border-bronze/40 rounded-sm p-8 sm:p-10 shadow-2xl">
                <span className="inline-block px-3 py-1 bg-bronze/20 border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold mb-4">
                  Enquiry Recorded &bull; Pending Staff Review
                </span>
                <h2 className="font-serif font-normal text-2xl sm:text-4xl text-brand-white leading-tight mb-3">
                  Thank You, <span className="text-primary-gold">{formData.customerName}</span>.
                </h2>
                <p className="font-sans text-sm text-gray-300 leading-relaxed mb-6">
                  Your event decoration enquiry for a <strong className="text-brand-white">{formData.occasion}</strong> on{' '}
                  <strong className="text-champagne-gold">{formData.eventDate}</strong> has been prepared for our Kampala styling team. Please note that submitting an enquiry does not automatically confirm a booking—our staff will contact you at{' '}
                  <strong className="text-brand-white">{formData.phone}</strong> to discuss venue specifics, availability, and final pricing.
                </p>

                <dl className="border-y border-bronze/25 py-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <dt className="text-gray-400">Venue / Location</dt>
                    <dd className="text-brand-white font-medium mt-0.5">
                      {formData.venueLocation || 'To be discussed during consultation'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-400">Estimated Guest Scale</dt>
                    <dd className="text-brand-white font-medium mt-0.5">
                      {formData.guestCount || 'To be confirmed'}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-gray-400">Requested Styling Elements</dt>
                    <dd className="text-champagne-gold font-medium mt-1">
                      {formData.selectedScopes.length > 0
                        ? formData.selectedScopes.join(' · ')
                        : 'General venue styling consultation'}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-primary-gold text-[#141210] hover:bg-gold-highlight text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors cursor-pointer"
                  >
                    Edit Enquiry Details
                  </button>
                  <Link
                    to="/decorations"
                    className="px-6 py-3 border border-bronze/40 text-champagne-gold hover:text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors"
                  >
                    Return to Portfolio
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-[#181512] border border-bronze/35 rounded-sm p-6 sm:p-10 shadow-2xl space-y-8"
              >
                {prefilledStyle && (
                  <div className="p-4 bg-[#141210] border-l-2 border-primary-gold border-t border-r border-b border-bronze/30 rounded-xs flex items-center justify-between gap-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-primary-gold">
                        Selected Portfolio Inspiration
                      </span>
                      <p className="font-serif text-sm sm:text-base text-brand-white mt-0.5">
                        {prefilledStyle}
                      </p>
                    </div>
                    <Link
                      to="/decorations#styling-portfolio"
                      className="text-xs font-sans text-champagne-gold hover:text-gold-highlight underline shrink-0"
                    >
                      Change Style
                    </Link>
                  </div>
                )}

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-4 bg-red-950/50 border border-red-400/50 rounded-xs text-xs text-red-200"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Section 1: Celebration & Venue Details */}
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold mb-1">
                    01 &bull; Celebration Overview
                  </span>
                  <h2 className="font-serif text-xl text-brand-white mb-4">
                    Occasion, Date &amp; Venue
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="occasion"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Celebration Category
                      </label>
                      <select
                        id="occasion"
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white focus:outline-none focus:border-primary-gold"
                      >
                        {occasionOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Event Date <span className="text-primary-gold">*</span>
                      </label>
                      <input
                        id="eventDate"
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white focus:outline-none focus:border-primary-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="venueLocation"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Venue Name or Location (Kampala / Surrounds)
                      </label>
                      <input
                        id="venueLocation"
                        type="text"
                        placeholder="e.g., Speke Resort Munyonyo / Garden Marquee"
                        value={formData.venueLocation}
                        onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="guestCount"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Approximate Guest Count
                      </label>
                      <input
                        id="guestCount"
                        type="text"
                        placeholder="e.g., 150 – 200 guests"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Styling Scope & Palette */}
                <div className="pt-6 border-t border-bronze/25">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold mb-1">
                    02 &bull; Aesthetic &amp; Spatial Scope
                  </span>
                  <h2 className="font-serif text-xl text-brand-white mb-4">
                    Styling Elements &amp; Colour Palette
                  </h2>

                  <div className="mb-5">
                    <span className="block text-xs font-medium text-gray-300 mb-2.5">
                      Elements of Interest (Select all that apply)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {scopeCheckboxes.map((scope) => {
                        const checked = formData.selectedScopes.includes(scope)
                        return (
                          <label
                            key={scope}
                            className={`flex items-center gap-2.5 p-3 rounded-xs border text-xs cursor-pointer transition-colors ${
                              checked
                                ? 'bg-[#1F1B17] border-primary-gold text-brand-white'
                                : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/50'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleScopeToggle(scope)}
                              className="accent-[#DEAC4B] w-4 h-4"
                            />
                            <span>{scope}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="preferredPalette"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Preferred Colour Palette or Theme Direction
                      </label>
                      <input
                        id="preferredPalette"
                        type="text"
                        placeholder="e.g., Olive green, champagne gold, and white roses"
                        value={formData.preferredPalette}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredPalette: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Additional Vision Notes or Questions
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Share any special ceremonial requirements, stage dimensions, or cake coordination ideas..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Contact Details */}
                <div className="pt-6 border-t border-bronze/25">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold mb-1">
                    03 &bull; Your Contact Details
                  </span>
                  <h2 className="font-serif text-xl text-brand-white mb-4">
                    How Our Stylists Can Reach You
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label
                        htmlFor="customerName"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-gray-300 mb-1.5"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#141210] border border-bronze/40 rounded-xs text-sm text-brand-white placeholder:text-gray-500 focus:outline-none focus:border-primary-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Bar */}
                <div className="pt-6 border-t border-bronze/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-400 max-w-md">
                    Submitting this form sends a consultation request. Bookings and final pricing are confirmed only after staff review and agreement.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary-gold text-[#141210] hover:bg-gold-highlight font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors cursor-pointer shrink-0"
                  >
                    Submit Decoration Enquiry &rarr;
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (Cols 9-12): Editorial Atelier Assurance & Visual Reference */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#181512] border border-bronze/35 rounded-sm p-6 shadow-xl">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold mb-2">
                How Consultations Work
              </span>
              <h3 className="font-serif text-lg text-brand-white mb-4">
                Personal Review by Our Kampala Atelier
              </h3>
              <ol className="space-y-4 text-xs text-gray-300">
                <li className="flex gap-3">
                  <span className="font-mono text-primary-gold font-semibold">01.</span>
                  <span>
                    <strong className="text-brand-white block">Date &amp; Venue Check</strong>
                    We verify availability for your event date and assess your venue’s architectural requirements.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-primary-gold font-semibold">02.</span>
                  <span>
                    <strong className="text-brand-white block">Palette &amp; Scope Alignment</strong>
                    We discuss your drapery, lighting, floral tablescapes, and optional centerpiece cake pairing.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-primary-gold font-semibold">03.</span>
                  <span>
                    <strong className="text-brand-white block">Tailored Quotation</strong>
                    Final pricing and setup schedules are agreed directly with you before any booking is confirmed.
                  </span>
                </li>
              </ol>
            </div>

            {/* Framed Diptych Preview */}
            <div className="bg-[#181512] border border-bronze/35 rounded-sm p-4 shadow-xl">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <img
                  src={sweetheartStageImg}
                  alt="Sweetheart stage styling with olive drapery"
                  className="w-full aspect-4/5 object-cover rounded-xs block"
                />
                <img
                  src={receptionCanopyImg}
                  alt="Starlit reception canopy and floral tables"
                  className="w-full aspect-4/5 object-cover rounded-xs block"
                />
              </div>
              <img
                src={lanternTableImg}
                alt="Banquet table centerpiece with bronze lantern and white roses"
                className="w-full aspect-16/9 object-cover rounded-xs block"
              />
              <p className="font-serif italic text-xs text-champagne-gold mt-3 text-center">
                Every celebration space is styled to order by Zuena Cakes &amp; Decor.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
