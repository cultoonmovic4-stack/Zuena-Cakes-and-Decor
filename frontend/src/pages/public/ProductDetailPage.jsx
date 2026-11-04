import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router'
import { cakeProducts } from '../../data/creationsData'

export default function ProductDetailPage() {
  const { slug } = useParams()

  // Find product or fallback to first cake
  const product = useMemo(() => {
    return (
      cakeProducts.find((cake) => cake.slug === slug) ||
      cakeProducts[0]
    )
  }, [slug])

  // Interactive configurations
  const [selectedTierIdx, setSelectedTierIdx] = useState(1) // default to middle tier (e.g., 3 tiers)
  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavorOptions[0] || 'Madagascar Bourbon Vanilla'
  )
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [specialNote, setSpecialNote] = useState('')

  // Calculate dynamic price based on tier configuration
  const currentTierConfig = product.tierConfig[selectedTierIdx] || product.tierConfig[0]
  const currentPriceUgx = currentTierConfig?.price || product.basePriceUgx
  const currentPriceFormatted = `UGX ${currentPriceUgx.toLocaleString()}`


  const handleRequestSubmit = (e) => {
    e.preventDefault()
    setRequestSubmitted(true)
  }

  return (
    <div className="w-full bg-dark-canvas text-brand-white font-sans selection:bg-primary-gold selection:text-dark-canvas py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================================================================
            BREADCRUMB NAVIGATION
            =================================================================== */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs text-gray-400 flex flex-wrap items-center gap-2 font-sans"
        >
          <Link to="/" className="hover:text-primary-gold transition-colors">
            Home
          </Link>
          <span className="text-bronze/60">/</span>
          <Link to="/creations" className="hover:text-primary-gold transition-colors">
            Our Creations
          </Link>
          <span className="text-bronze/60">/</span>
          <span className="text-champagne-gold font-medium capitalize">
            {product.name}
          </span>
        </nav>

        {/* ===================================================================
            MAIN PRODUCT STUDIO SHOWCASE
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ---------------------------------------------------------------
              LEFT COLUMN: High-Resolution Photographic Visual Studio
              --------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Primary Image Frame with Ambient Backdrop */}
            <div className="relative w-full aspect-4/5 rounded-lg overflow-hidden border border-bronze/40 bg-[#161311] shadow-2xl group">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Floating Top Left Pill Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded bg-[#141210] border border-primary-gold/50 text-[11px] font-mono uppercase tracking-[0.18em] text-champagne-gold font-semibold shadow-md">
                  {product.categoryLabel}
                </span>
                <span className="px-3 py-1 rounded bg-[#141210] border border-white/20 text-[11px] font-sans font-medium text-gray-200 shadow-md">
                  {currentTierConfig?.tiers || product.tiers} Tiers &bull; {currentTierConfig?.guests || product.servings}
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs text-gray-300">
                <span className="bg-[#141210] px-2.5 py-1 rounded text-[11px] font-mono text-gray-400 border border-bronze/30">
                  {product.cakeType}
                </span>
                <span className="bg-[#141210] px-2.5 py-1 rounded text-[11px] text-champagne-gold font-medium border border-bronze/30">
                  {product.leadTime}
                </span>
              </div>
            </div>

            {/* Quality Standard Badges Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#181512] border border-bronze/30 rounded-lg text-center">
              <div>
                <span className="block font-serif text-xs text-champagne-gold font-semibold">
                  Scratch-Baked
                </span>
                <span className="block font-sans text-[10px] text-gray-400 mt-0.5">
                  100% Real Dairy Butter
                </span>
              </div>
              <div className="border-x border-bronze/25 px-1">
                <span className="block font-serif text-xs text-champagne-gold font-semibold">
                  Hand-Sculpted
                </span>
                <span className="block font-sans text-[10px] text-gray-400 mt-0.5">
                  Sugar Florals &amp; Gold
                </span>
              </div>
              <div>
                <span className="block font-serif text-xs text-champagne-gold font-semibold">
                  Venue Setup
                </span>
                <span className="block font-sans text-[10px] text-gray-400 mt-0.5">
                  White-glove Kampala delivery
                </span>
              </div>
            </div>

            {/* Cake Architecture & Specs Accordion */}
            <div className="bg-[#181512] border border-bronze/30 rounded-lg p-5 text-xs space-y-3.5">
              <h3 className="font-serif text-sm text-primary-gold font-semibold uppercase tracking-wider">
                Cake Architecture &amp; Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                <div>
                  <span className="text-gray-400 block font-mono text-[10px] uppercase">Tier Dimensions</span>
                  <span>{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-mono text-[10px] uppercase">Internal Engineering</span>
                  <span>Reinforced food-safe dowels &amp; moisture seals</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-400 block font-mono text-[10px] uppercase">Allergens &amp; Dietary</span>
                  <span className="text-gray-300 leading-relaxed">{product.allergens}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------
              RIGHT COLUMN: Product Story, Pricing & Interactive Configurator
              --------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Collection Code & Occasion Tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary-gold font-semibold">
                  Zuena Atelier &bull; {product.id.toUpperCase()}
                </span>
                <span className="text-bronze/60">&bull;</span>
                <span className="text-xs text-gray-400 font-sans">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Grand Serif Title in Playfair Display */}
              <h1 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-brand-white leading-[1.12] mb-3">
                {product.name}
              </h1>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-serif text-2xl sm:text-3xl text-primary-gold font-semibold">
                  {currentPriceFormatted}
                </span>
                <span className="text-xs font-sans text-gray-400">
                  (Estimated for {currentTierConfig?.guests || product.servings})
                </span>
              </div>

              {/* Transparent Estimate Disclaimer Box */}
              <div className="p-3.5 bg-[#1B1815] border-l-2 border-primary-gold/80 rounded text-xs text-gray-300 mb-6 leading-relaxed">
                <strong className="text-champagne-gold font-semibold">Note on Order Estimates: </strong>
                All prices shown during development represent baseline estimates. Final pricing, dietary modifications, custom toppers, and delivery details are personally reviewed and agreed with you before confirmation.
              </div>

              {/* Narrative Description */}
              <p className="font-sans text-sm text-gray-200/90 leading-relaxed mb-6 font-normal">
                {product.description}
              </p>

              {/* =========================================================
                  INTERACTIVE CONFIGURATOR 1: Tier & Guest Size Selector
                  ========================================================= */}
              <div className="mb-6 pt-5 border-t border-bronze/25">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-gold font-sans">
                    1. Select Cake Scale &amp; Servings:
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {currentTierConfig?.guests}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {product.tierConfig.map((tier, idx) => {
                    const isSelected = selectedTierIdx === idx
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTierIdx(idx)}
                        className={`p-3 rounded border text-left transition-all cursor-pointer min-h-[58px] ${
                          isSelected
                            ? 'bg-primary-gold/15 border-primary-gold text-brand-white shadow-[0_0_12px_rgba(222,172,75,0.25)]'
                            : 'bg-[#181512] border-bronze/35 text-gray-300 hover:border-primary-gold/60'
                        }`}
                      >
                        <span className="block font-serif text-sm font-semibold text-champagne-gold">
                          {tier.tiers} {tier.tiers === 1 ? 'Tall Tier' : 'Tiers'}
                        </span>
                        <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                          {tier.guests}
                        </span>
                        <span className="block font-mono text-[11px] text-primary-gold font-medium mt-1">
                          UGX {tier.price.toLocaleString()}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* =========================================================
                  INTERACTIVE CONFIGURATOR 2: Flavor & Filling Selector
                  ========================================================= */}
              <div className="mb-6 pt-5 border-t border-bronze/25">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-gold font-sans">
                    2. Select Signature Flavor &amp; Filling:
                  </span>
                  <span className="text-xs text-champagne-gold font-sans">
                    Freshly baked to order
                  </span>
                </div>

                <div className="space-y-2">
                  {product.flavorOptions.map((flavor, idx) => {
                    const isSelected = selectedFlavor === flavor
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#1F1C18] border-primary-gold text-brand-white'
                            : 'bg-[#181512] border-bronze/30 text-gray-300 hover:border-bronze/60'
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

              {/* Signature Craft Highlights */}
              <div className="mb-8 pt-5 border-t border-bronze/25">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-gold font-sans mb-3">
                  Key Artisanal Highlights:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 font-sans">
                  {product.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-gold font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* =========================================================
                ORDER REQUEST ACTION FORM / SUBMISSION SUITE
                ========================================================= */}
            <div className="pt-6 border-t border-bronze/40">
              {requestSubmitted ? (
                <div className="bg-[#1B1916] border border-primary-gold p-6 rounded-lg text-center animate-fadeIn shadow-2xl">
                  <div className="w-12 h-12 rounded-full bg-primary-gold/20 text-primary-gold flex items-center justify-center mx-auto mb-3">
                    <svg aria-hidden="true" className="w-6 h-6 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-primary-gold mb-1">
                    Added to Cart!
                  </h3>
                  <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-md mx-auto mb-4">
                    You added <strong>{product.name}</strong> ({currentTierConfig?.tiers} Tiers, {selectedFlavor}) with an estimated quote of <strong>{currentPriceFormatted}</strong> to your cart.
                  </p>
                  <p className="font-sans text-[11px] text-gray-400 mb-4">
                    Our team will contact you directly to confirm date availability, delivery arrangements, and final details.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      to="/cart"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded bg-primary-gold text-dark-canvas text-xs font-semibold uppercase tracking-wider hover:bg-gold-highlight transition-colors"
                    >
                      <svg aria-hidden="true" className="w-4 h-4 text-dark-canvas" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>View Cart &rarr;</span>
                    </Link>
                    <Link
                      to="/creations"
                      className="px-5 py-2.5 rounded border border-bronze/50 text-gray-300 text-xs font-semibold uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Browse More Cakes
                    </Link>
                    <button
                      type="button"
                      onClick={() => setRequestSubmitted(false)}
                      className="px-5 py-2.5 rounded border border-bronze/50 text-gray-300 text-xs font-semibold uppercase tracking-wider hover:text-white cursor-pointer"
                    >
                      Adjust Selection
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  {/* Optional Custom Instructions / Event Date Input */}
                  <div>
                    <label htmlFor="special-notes" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                      Optional Event Date or Custom Requests:
                    </label>
                    <input
                      id="special-notes"
                      type="text"
                      placeholder="e.g. Wedding date 18th December, gold monogram 'M & A'..."
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      className="w-full bg-[#181512] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2.5 text-xs text-brand-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                    />
                  </div>

                  {/* Primary Request Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 rounded bg-primary-gold text-dark-canvas hover:bg-gold-highlight hover:shadow-[0_4px_24px_rgba(222,172,75,0.35)] transition-all duration-300 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase text-center cursor-pointer min-h-[46px] inline-flex items-center justify-center gap-2"
                    >
                      <svg aria-hidden="true" className="w-4 h-4 text-dark-canvas shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Add to Cart &bull; {currentPriceFormatted}</span>
                    </button>

                    <Link
                      to="/custom-cake"
                      className="py-3.5 px-5 rounded border border-primary-gold/60 text-champagne-gold hover:border-primary-gold hover:text-white hover:bg-primary-gold/10 transition-colors font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase text-center min-h-[46px] flex items-center justify-center whitespace-nowrap"
                    >
                      Bespoke Redesign &rarr;
                    </Link>
                  </div>

                  {/* Decor Consultation Pathway */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-2 font-sans">
                    <span>
                      Planning a full venue setting?{' '}
                      <Link to="/decorations/enquire" className="text-primary-gold underline hover:text-gold-highlight">
                        Enquire about matching décor &rarr;
                      </Link>
                    </span>
                    <Link to="/creations" className="text-gray-400 hover:text-white transition-colors">
                      &larr; Back to Catalogue
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
