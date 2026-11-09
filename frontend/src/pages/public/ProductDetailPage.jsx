import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import AOS from 'aos'
import { cakeProducts } from '../../data/creationsData'
import { useCart } from '../../context/useCart.js'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { addToCart, totalCount } = useCart()

  // Find exact product matching the URL slug
  const product = useMemo(() => {
    return cakeProducts.find((cake) => cake.slug === slug)
  }, [slug])

  // Determine starting price (minimum across available tier options)
  const startingPriceUgx = useMemo(() => {
    if (!product || !product.tierConfig || product.tierConfig.length === 0) return 0
    return Math.min(...product.tierConfig.map((t) => t.price))
  }, [product])

  const startingPriceFormatted = useMemo(() => {
    return `UGX ${startingPriceUgx.toLocaleString()}`
  }, [startingPriceUgx])

  // Find default tier index: match the cake's primary base tiers if possible, else middle or 0
  const initialTierIdx = useMemo(() => {
    if (!product || !product.tierConfig) return 0
    const matchIdx = product.tierConfig.findIndex((t) => t.tiers === product.tiers)
    return matchIdx >= 0 ? matchIdx : Math.floor(product.tierConfig.length / 2)
  }, [product])

  // State initialization
  const [prevSlug, setPrevSlug] = useState(slug)
  const [selectedTierIdx, setSelectedTierIdx] = useState(initialTierIdx)
  const [selectedFlavor, setSelectedFlavor] = useState(
    product?.flavorOptions?.[0] || 'Madagascar Bourbon Vanilla'
  )
  const [eventDate, setEventDate] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')
  const [addedNotification, setAddedNotification] = useState(false)

  // Reset configuration state during render when slug changes (standard React 19 pattern)
  if (prevSlug !== slug) {
    setPrevSlug(slug)
    const matchIdx = product?.tierConfig?.findIndex((t) => t.tiers === product.tiers) ?? 0
    setSelectedTierIdx(matchIdx >= 0 ? matchIdx : 0)
    setSelectedFlavor(product?.flavorOptions?.[0] || 'Madagascar Bourbon Vanilla')
    setEventDate('')
    setCustomerNotes('')
    setAddedNotification(false)
  }

  // Scroll to top on slug change and refresh AOS layout calculations
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    AOS.refresh()
  }, [slug])

  // Curator's Pairings: 2–3 related creations from same or complementary category
  const relatedPairings = useMemo(() => {
    if (!product) return []
    const sameCategory = cakeProducts.filter(
      (cake) => cake.id !== product.id && cake.category === product.category
    )
    const otherCategories = cakeProducts.filter(
      (cake) => cake.id !== product.id && cake.category !== product.category
    )
    return [...sameCategory, ...otherCategories].slice(0, 3)
  }, [product])

  // If slug does not match any known creation, display an elegant editorial 404 state
  if (!product) {
    return (
      <div className="w-full bg-dark-canvas text-brand-white font-sans py-20 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center border border-bronze/30 bg-[#161311] rounded-2xl p-10 sm:p-14 shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-primary-gold block mb-3 font-semibold">
            Zuena Atelier Archive
          </span>
          <h1 className="font-serif font-normal text-3xl sm:text-4xl text-brand-white mb-4">
            Creation Not Found
          </h1>
          <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-md mx-auto mb-8 font-normal">
            The confection you are searching for is unavailable, has been archived, or the link may be outdated. Explore our active collections or discuss a custom commission.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/creations"
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-primary-gold text-dark-canvas text-xs font-semibold uppercase tracking-wider hover:bg-gold-highlight transition-all text-center"
            >
              Explore Our Creations &rarr;
            </Link>
            <Link
              to="/custom-cake"
              className="w-full sm:w-auto px-6 py-3.5 rounded border border-bronze/50 text-gray-300 hover:text-white hover:border-primary-gold/60 text-xs font-medium uppercase tracking-wider transition-colors text-center"
            >
              Custom Cake Consultation
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Active tier configuration
  const currentTierConfig = product.tierConfig[selectedTierIdx] || product.tierConfig[0]
  const currentPriceUgx = currentTierConfig?.price || product.basePriceUgx
  const currentPriceFormatted = `UGX ${currentPriceUgx.toLocaleString()}`

  // Tier photography fallback: Use verified tier image if present; otherwise fallback to master hero
  const activeImage = currentTierConfig?.image || product.image

  // Handle Add to Order
  const handleAddToOrder = (e) => {
    e.preventDefault()

    const cartItem = {
      id: `${product.id}-${currentTierConfig.tiers}-${encodeURIComponent(selectedFlavor)}-${Date.now()}`,
      productId: product.id,
      slug: product.slug,
      title: product.name,
      tierCount: currentTierConfig.tiers,
      tierLabel: `${currentTierConfig.tiers} ${currentTierConfig.tiers === 1 ? 'Tall Tier' : 'Tiers'}`,
      guests: currentTierConfig.guests,
      flavor: selectedFlavor,
      eventDate: eventDate.trim() || undefined,
      specialNote: customerNotes.trim() || undefined,
      quantity: 1,
      priceUGX: currentPriceUgx,
      priceFormatted: currentPriceFormatted,
      image: activeImage,
      imageAlt: `${product.name} — ${currentTierConfig.tiers} Tiers`,
    }

    addToCart(cartItem)
    setAddedNotification(true)
  }

  return (
    <div className="w-full bg-dark-canvas text-brand-white font-sans selection:bg-primary-gold selection:text-dark-canvas">
      {/* ===================================================================
          SCENE 1: THE CREATION (Photography-Led Atelier Hero Presentation)
          =================================================================== */}
      <section className="py-10 sm:py-16 border-b border-bronze/20 bg-dark-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Column: Photographic Studio Frame with Subtle Crossfade */}
            <div
              className="lg:col-span-7 flex flex-col gap-3"
              data-aos="fade-right"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-bronze/40 bg-[#161311] shadow-2xl group">
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={product.alt}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-102"
                />

                {/* Lead Time Badge */}
                <div className="absolute bottom-4 right-4 z-20">
                  <span className="bg-[#141210]/90 backdrop-blur-md px-3 py-1.5 rounded text-[11px] text-champagne-gold font-medium border border-bronze/40 shadow-md">
                    Lead time: {product.leadTime}
                  </span>
                </div>

                {/* Atmospheric Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-canvas/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Narrative Column: Product Identity & Editorial Intro */}
            <div
              className="lg:col-span-5 flex flex-col justify-center lg:-translate-y-10"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              {product.isProvisional && (
                <div className="mb-3">
                  <span className="px-2 py-0.5 rounded bg-bronze/25 border border-primary-gold/40 text-[10px] font-mono uppercase tracking-wider text-primary-gold font-medium">
                    Provisional Demo Design
                  </span>
                </div>
              )}

              <h1 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-brand-white leading-[1.12] mb-4">
                {product.name}
              </h1>

              {/* Starting Price & Capacity Range Display */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-5 mb-5 border-b border-bronze/25">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    Starting From
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-primary-gold font-semibold">
                    {startingPriceFormatted}
                  </span>
                </div>
                <div className="sm:border-l sm:border-bronze/30 sm:pl-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                    Servings Range
                  </span>
                  <span className="text-sm font-sans text-gray-200">
                    {product.servings}
                  </span>
                </div>
              </div>

              {/* Concise Curatorial Summary */}
              <p className="font-sans text-sm sm:text-[15px] text-gray-300 leading-relaxed mb-6 font-normal">
                {product.summary || product.description}
              </p>

              {/* Atelier Hallmark Pills */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 bg-[#181512] border border-bronze/30 rounded-lg text-center">
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">
                    Scratch-Baked
                  </span>
                  <span className="block font-sans text-[10px] text-gray-400 mt-0.5">
                    Real Dairy Butter
                  </span>
                </div>
                <div className="p-3 bg-[#181512] border border-bronze/30 rounded-lg text-center">
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">
                    Hand-Sculpted
                  </span>
                  <span className="block font-sans text-[10px] text-gray-400 mt-0.5">
                    Artisanal Botanicals
                  </span>
                </div>
                <div className="p-3 bg-[#181512] border border-bronze/30 rounded-lg text-center">
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">
                    White-Glove
                  </span>
                  <span className="block font-sans text-[10px] text-gray-400 mt-0.5">
                    Kampala Delivery
                  </span>
                </div>
              </div>

              {/* Jump to Configurator Link */}
              <div className="pt-6 mt-6 border-t border-bronze/25 flex items-center justify-between">
                <a
                  href="#make-it-yours"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-gold hover:text-gold-highlight transition-colors"
                >
                  <span>Configure Tiers &amp; Flavour</span>
                  <span>&darr;</span>
                </a>
                <span className="text-xs text-gray-400 font-sans">
                  {product.tierConfig.length} Tier Options Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 2: THE DETAILS (Essential Craft Specifications)
          =================================================================== */}
      <section className="py-12 sm:py-16 bg-[#161311] border-b border-bronze/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-brand-white">
              Atelier Specifications &amp; Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans mt-2">
              Every creation is built with internal structural engineering, scratch-baked sponges, and hand-sculpted sugar craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Spec 1: Architecture & Dimensions */}
            <div
              className="bg-[#1B1815] border border-bronze/30 rounded-xl p-5"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary-gold block mb-2 font-semibold">
                01 &bull; Dimensions
              </span>
              <h3 className="font-serif text-base text-brand-white mb-2 font-semibold">
                Cake Architecture
              </h3>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                {product.dimensions}
              </p>
            </div>

            {/* Spec 2: Preparation & Lead Time */}
            <div
              className="bg-[#1B1815] border border-bronze/30 rounded-xl p-5"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary-gold block mb-2 font-semibold">
                02 &bull; Advance Notice
              </span>
              <h3 className="font-serif text-base text-brand-white mb-2 font-semibold">
                Lead Time
              </h3>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                Minimum advance notice: <strong className="text-champagne-gold">{product.leadTime}</strong>.
              </p>
            </div>

            {/* Spec 3: Dietary & Allergens */}
            <div
              className="bg-[#1B1815] border border-bronze/30 rounded-xl p-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary-gold block mb-2 font-semibold">
                03 &bull; Dietary Guidance
              </span>
              <h3 className="font-serif text-base text-brand-white mb-2 font-semibold">
                Allergen Transparency
              </h3>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                {product.allergens}
              </p>
            </div>

            {/* Spec 4: Logistics & Delivery */}
            <div
              className="bg-[#1B1815] border border-bronze/30 rounded-xl p-5"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary-gold block mb-2 font-semibold">
                04 &bull; Event Delivery
              </span>
              <h3 className="font-serif text-base text-brand-white mb-2 font-semibold">
                Venue Logistics
              </h3>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                Delivery and venue coordination available across Kampala and surrounding areas.
              </p>
            </div>
          </div>

          {/* Key Craft Highlights Row */}
          {product.highlights && product.highlights.length > 0 && (
            <div
              className="mt-8 p-5 bg-[#1B1815] border border-bronze/30 rounded-xl"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary-gold block mb-3 font-semibold">
                Signature Artisanal Highlights
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-gray-300 font-sans">
                {product.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary-gold shrink-0 font-bold">&bull;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          SCENE 3: MAKE IT YOURS (Interactive Configurator & Ordering Suite)
          =================================================================== */}
      <section id="make-it-yours" className="py-12 sm:py-20 bg-dark-canvas border-b border-bronze/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-brand-white">
              Make It Yours
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans mt-2">
              Select your tier scale, signature flavour, and optional event notes. You can configure multiple creations and submit one consolidated order request.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Configuration Steps Form */}
            <form
              onSubmit={handleAddToOrder}
              className="lg:col-span-7 space-y-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Step 1: Tier Scale Selection */}
              <div className="bg-[#181512] border border-bronze/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-gold font-sans">
                    1. Select Cake Scale &amp; Tier Count:
                  </span>
                  <span className="text-xs text-champagne-gold font-mono font-medium">
                    {currentTierConfig?.guests}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.tierConfig.map((tier, idx) => {
                    const isSelected = selectedTierIdx === idx
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTierIdx(idx)}
                        className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary-gold/15 border-primary-gold text-brand-white shadow-[0_0_16px_rgba(222,172,75,0.25)]'
                            : 'bg-[#141210] border-bronze/35 text-gray-300 hover:border-primary-gold/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif text-sm sm:text-base font-semibold text-champagne-gold">
                            {tier.tiers} {tier.tiers === 1 ? 'Tall Tier' : 'Tiers'}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-primary-gold animate-pulse" />
                          )}
                        </div>
                        <span className="block font-sans text-xs text-gray-400">
                          {tier.guests}
                        </span>
                        <span className="block font-mono text-xs text-primary-gold font-medium mt-2">
                          UGX {tier.price.toLocaleString()}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Signature Flavour Selection */}
              <div className="bg-[#181512] border border-bronze/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-gold font-sans">
                    2. Choose Signature Flavour:
                  </span>
                  <span className="text-xs text-gray-400 font-sans">
                    Baked fresh to order
                  </span>
                </div>

                <div className="space-y-2.5">
                  {product.flavorOptions.map((flavor, idx) => {
                    const isSelected = selectedFlavor === flavor
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary-gold/10 border-primary-gold text-brand-white'
                            : 'bg-[#141210] border-bronze/30 text-gray-300 hover:border-bronze/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="flavor-choice"
                          value={flavor}
                          checked={isSelected}
                          onChange={() => setSelectedFlavor(flavor)}
                          className="accent-primary-gold w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-sans">{flavor}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Event Date & Custom Notes */}
              <div className="bg-[#181512] border border-bronze/30 rounded-xl p-6 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-gold font-sans block">
                  3. Celebration Details &amp; Custom Inscriptions (Optional):
                </span>

                <div>
                  <label htmlFor="event-date" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Target Event Date:
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2.5 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="customer-notes" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Custom Monogram, Inscription or Dietary Notes:
                  </label>
                  <textarea
                    id="customer-notes"
                    rows={2}
                    placeholder="e.g. Wedding initials 'J & N', or gold cursive 'Happy 40th David' topper..."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2.5 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Action Area */}
              <div className="pt-2">
                <button
                  type="submit"
                  aria-label="Add to Order Request"
                  className="group w-full py-4 px-6 rounded-lg bg-primary-gold text-dark-canvas hover:bg-gold-highlight transition-all duration-300 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase text-center cursor-pointer min-h-[48px] inline-flex items-center justify-center overflow-hidden"
                >
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-dark-canvas shrink-0 transition-transform duration-300 ease-out group-hover:scale-130"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="max-w-[260px] opacity-100 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ml-2 group-hover:max-w-0 group-hover:opacity-0 group-hover:ml-0">
                    Add to Order Request
                  </span>
                </button>
              </div>
            </form>

            {/* Right: Live Configuration Summary Card & Notification */}
            <div
              className="lg:col-span-5 sticky top-24 space-y-6"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              {/* Order Confirmation Banner */}
              {addedNotification && (
                <div className="bg-[#1A1714] border border-primary-gold p-6 rounded-xl shadow-2xl text-center animate-fadeInDown">
                  <div className="w-10 h-10 rounded-full bg-primary-gold/20 text-primary-gold flex items-center justify-center mx-auto mb-3">
                    <svg aria-hidden="true" className="w-5 h-5 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg text-primary-gold mb-1">
                    Added to Celebration Request!
                  </h3>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed mb-4">
                    <strong>{product.name}</strong> ({currentTierConfig?.tiers} Tiers) has been added to your order at <strong>{currentPriceFormatted}</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      to="/cart"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded bg-primary-gold text-dark-canvas text-xs font-semibold uppercase tracking-wider hover:bg-gold-highlight transition-colors"
                    >
                      <span>View Cart ({totalCount}) &rarr;</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setAddedNotification(false)}
                      className="px-5 py-2.5 rounded border border-bronze/50 text-gray-300 text-xs font-medium uppercase tracking-wider hover:text-white cursor-pointer"
                    >
                      Configure Another
                    </button>
                  </div>
                </div>
              )}

              {/* Live Configuration Estimate Card */}
              <div className="bg-[#181512] border border-bronze/40 rounded-xl p-6 shadow-2xl space-y-5">
                <div className="pb-4 border-b border-bronze/25">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary-gold font-semibold">
                    Provisional Estimate
                  </span>
                </div>

                {/* Selected Cake Snapshot */}
                <div className="flex items-center gap-4">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded-lg border border-bronze/30 shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-brand-white leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-xs text-primary-gold mt-1 font-mono">
                      {currentTierConfig?.tiers} {currentTierConfig?.tiers === 1 ? 'Tall Tier' : 'Tiers'} &bull; {currentTierConfig?.guests}
                    </p>
                  </div>
                </div>

                {/* Estimate Price Callout */}
                <div className="pt-4 border-t border-bronze/25 flex items-baseline justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                    Total:
                  </span>
                  <span className="font-serif text-2xl text-primary-gold font-semibold">
                    {currentPriceFormatted}
                  </span>
                </div>

                {/* Transparent Disclaimer Box */}
                <div className="p-3.5 bg-[#141210] border-l-2 border-primary-gold/80 rounded text-[11px] text-gray-400 leading-relaxed">
                  <strong className="text-champagne-gold font-semibold">Order Estimate Notice: </strong>
                  Pricing is provisional and based on your selected tier and flavour. Final delivery timing, venue logistics, and custom toppers are confirmed with our team prior to baking.
                </div>

                {/* Custom Cake Alternative */}
                <div className="pt-2 text-center text-xs text-gray-400 font-sans border-t border-bronze/20">
                  Looking for bespoke adjustments?{' '}
                  <Link to="/custom-cake" className="text-primary-gold underline hover:text-gold-highlight">
                    Request custom consultation &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 4: CURATOR'S PAIRINGS (Complementary Creations)
          =================================================================== */}
      <section className="py-14 sm:py-20 bg-[#12100E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10" data-aos="fade-up">
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-primary-gold block mb-1 font-semibold">
              Scene 4 &bull; Curator&rsquo;s Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-brand-white">
              Complementary Atelier Pairings
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans mt-2">
              Discover celebrated confections designed with harmonious aesthetics for multi-cake dessert tables and banquets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedPairings.map((pairing, idx) => {
              const pairMinPrice = Math.min(...pairing.tierConfig.map((t) => t.price))
              return (
                <Link
                  key={pairing.id}
                  to={`/creations/${pairing.slug}`}
                  data-aos="fade-up"
                  data-aos-delay={`${idx * 120}`}
                  className="group bg-[#161311] border border-bronze/30 rounded-xl overflow-hidden hover:border-primary-gold/60 transition-all duration-300 flex flex-col shadow-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#141210]">
                    <img
                      src={pairing.image}
                      alt={pairing.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-[#141210]/90 backdrop-blur-md border border-primary-gold/40 text-[10px] font-mono uppercase tracking-wider text-champagne-gold">
                        {pairing.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-brand-white group-hover:text-primary-gold transition-colors font-medium mb-1.5 leading-snug">
                        {pairing.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed">
                        {pairing.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-bronze/20 flex items-baseline justify-between">
                      <span className="text-[11px] font-mono uppercase text-gray-400">
                        Starting from
                      </span>
                      <span className="font-serif text-sm font-semibold text-primary-gold">
                        UGX {pairMinPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
