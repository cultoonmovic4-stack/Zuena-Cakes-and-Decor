import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { cakeProducts } from '../../data/creationsData'

// Hero flagship photograph
import heroCakeImg from '../../assets/images/wd 1.jpg'

export default function CreationsPage() {
  const [activeModalIndex, setActiveModalIndex] = useState(null)

  // Map products into their respective verified chapters
  const categorizedCakes = useMemo(() => {
    return {
      birthday: cakeProducts.filter((c) => c.category === 'birthdays'),
      wedding: cakeProducts.filter((c) => c.category === 'weddings'),
      graduation: cakeProducts.filter((c) => c.category === 'graduation'),
      kwanjula: cakeProducts.filter((c) => c.category === 'traditional'),
    }
  }, [])

  // Flattened catalogue for lightbox navigation
  const exhibitionCakes = useMemo(() => {
    return [
      ...categorizedCakes.birthday,
      ...categorizedCakes.wedding,
      ...categorizedCakes.graduation,
      ...categorizedCakes.kwanjula,
    ]
  }, [categorizedCakes])

  // Exhibition Lightbox helpers
  const quickViewCake = activeModalIndex !== null ? exhibitionCakes[activeModalIndex] : null

  const openLightbox = useCallback((cake) => {
    const idx = exhibitionCakes.findIndex((c) => c.id === cake.id)
    setActiveModalIndex(idx >= 0 ? idx : 0)
  }, [exhibitionCakes])

  const closeLightbox = useCallback(() => {
    setActiveModalIndex(null)
  }, [])

  const nextLightbox = useCallback(() => {
    if (exhibitionCakes.length === 0) return
    setActiveModalIndex((prev) => (prev + 1) % exhibitionCakes.length)
  }, [exhibitionCakes.length])

  const prevLightbox = useCallback(() => {
    if (exhibitionCakes.length === 0) return
    setActiveModalIndex((prev) => (prev - 1 + exhibitionCakes.length) % exhibitionCakes.length)
  }, [exhibitionCakes.length])

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (activeModalIndex === null) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') nextLightbox()
      else if (e.key === 'ArrowLeft') prevLightbox()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeModalIndex, closeLightbox, nextLightbox, prevLightbox])

  return (
    <div className="w-full bg-[#141210] text-brand-white font-sans selection:bg-primary-gold selection:text-dark-canvas overflow-x-hidden">
      {/* ===================================================================
          1. IMMERSIVE CENTRED OPENING SCENE (HERO)
          Concept 1 — Structured Luxury Exhibition
          - Asymmetric luxury composition
          - Left: Pre-title, monumental "Our Creations", poetic subtitle, and action button
          - Right: Flagship cake photography on draped velvet setting
          - (No horizontal occasion navigation strip)
          =================================================================== */}
      <section
        aria-label="The Exhibition Catalogue Opening"
        className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center bg-[#141210] border-b border-bronze/25 px-4 sm:px-6 lg:px-12 py-12 lg:py-20 overflow-hidden"
      >
        {/* Subtle atmospheric vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-transparent via-[#141210]/60 to-[#141210] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary-gold font-semibold">
                The Exhibition Catalogue
              </span>
              <span className="w-12 h-[1px] bg-primary-gold/60" />
            </div>

            <h1 className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F7EBD9] leading-[1.02] tracking-tight mb-4 sm:mb-6">
              Our <br />
              <span className="italic text-primary-gold font-normal">Creations</span>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-300/90 leading-relaxed max-w-lg mb-8 sm:mb-10 font-light">
              A world of cakes made for meaningful celebrations.
            </p>

            <div>
              <a
                href="#catalogue-exhibition"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('catalogue-exhibition')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-primary-gold/70 text-champagne-gold hover:text-[#141210] hover:bg-primary-gold text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Explore Our Collection</span>
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dramatic Flagship Cake Photography */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 rounded-lg overflow-hidden shadow-2xl border border-bronze/35 bg-[#181512]">
              <img
                src={heroCakeImg}
                alt="Three-tier royal wedding cake with champagne drapery, crimson sugar roses and edible gold foil"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141210]/40 via-transparent to-transparent pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. MAIN EXHIBITION BODY: THE 5 OCCASION CHAPTERS
          Fixed chapter order:
          1. Birthday
          2. Wedding
          3. Graduation
          4. Kwanjula
          5. Custom Cakes (Refined, text-led editorial CTA without photographs)
          (Utility bar with search, filter tabs, and sorting has been removed)
          =================================================================== */}
      <main id="catalogue-exhibition" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="space-y-16 lg:space-y-24">
          {/* ---------------------------------------------------------------
              CHAPTER 1: BIRTHDAY
              Asymmetric Composition:
              - Left: Editorial Category Header & Introduction
              - Center: Dramatic Prominent Featured Cake
              - Right: 2 Supporting Cakes Stacked with Details
              --------------------------------------------------------------- */}
          <section id="chapter-birthday" aria-label="Birthday Cakes Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Editorial Introduction */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Birthday Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Birthday <br />
                  <span className="italic text-primary-gold">Cakes</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Expressive designs for celebrations worth remembering.
                </p>
                <div className="mb-5">
                  <Link
                    to="/creations/birthday"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn cursor-pointer"
                  >
                    <span>Discover Collection</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {/* Center Column: Prominent Featured Birthday Cake */}
              {categorizedCakes.birthday[0] && (
                <div className="lg:col-span-5">
                  <div className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl">
                    <div
                      onClick={() => openLightbox(categorizedCakes.birthday[0])}
                      className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${categorizedCakes.birthday[0].name}`}
                    >
                      <img
                        src={categorizedCakes.birthday[0].image}
                        alt={categorizedCakes.birthday[0].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>{categorizedCakes.birthday[0].cakeType}</span>
                          <span className="font-mono">{categorizedCakes.birthday[0].servings}</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-3">
                          <Link to={`/creations/${categorizedCakes.birthday[0].slug}`}>
                            {categorizedCakes.birthday[0].name}
                          </Link>
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] font-mono uppercase text-gray-400">Starting Estimate</span>
                          <span className="font-serif text-lg text-primary-gold font-semibold">
                            {categorizedCakes.birthday[0].priceDisplay}
                          </span>
                        </div>
                        <Link
                          to={`/creations/${categorizedCakes.birthday[0].slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column: 2 Supporting Birthday Cakes Stacked with Details */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {categorizedCakes.birthday.slice(1, 3).map((cake) => (
                  <div
                    key={cake.id}
                    className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md"
                  >
                    <div
                      onClick={() => openLightbox(cake)}
                      className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${cake.name}`}
                    >
                      <img
                        src={cake.image}
                        alt={cake.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                          <Link to={`/creations/${cake.slug}`}>{cake.name}</Link>
                        </h4>
                        <span className="block text-[11px] text-gray-400 font-sans mb-1.5">
                          {cake.servings}
                        </span>
                        <span className="block font-serif text-sm font-semibold text-primary-gold mb-2">
                          {cake.priceDisplay}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={`/creations/${cake.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-champagne-gold hover:text-white"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 2: WEDDING
              Inverted Asymmetric Composition:
              - Left: Towering Prominent Wedding Cake
              - Center: Editorial Category Header & Introduction
              - Right: 2 Supporting Wedding Cakes Stacked with Details
              --------------------------------------------------------------- */}
          <section id="chapter-wedding" aria-label="Wedding Cakes Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Prominent Towering Wedding Cake */}
              {categorizedCakes.wedding[0] && (
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl">
                    <div
                      onClick={() => openLightbox(categorizedCakes.wedding[0])}
                      className="relative w-full aspect-4/5 overflow-hidden bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${categorizedCakes.wedding[0].name}`}
                    >
                      <img
                        src={categorizedCakes.wedding[0].image}
                        alt={categorizedCakes.wedding[0].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>{categorizedCakes.wedding[0].cakeType}</span>
                          <span className="font-mono">{categorizedCakes.wedding[0].servings}</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-3">
                          <Link to={`/creations/${categorizedCakes.wedding[0].slug}`}>
                            {categorizedCakes.wedding[0].name}
                          </Link>
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] font-mono uppercase text-gray-400">Starting Estimate</span>
                          <span className="font-serif text-lg text-primary-gold font-semibold">
                            {categorizedCakes.wedding[0].priceDisplay}
                          </span>
                        </div>
                        <Link
                          to={`/creations/${categorizedCakes.wedding[0].slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Center Column: Editorial Introduction */}
              <div className="lg:col-span-3 flex flex-col justify-center order-1 lg:order-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Wedding Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Wedding <br />
                  <span className="italic text-primary-gold">Cakes</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Elegant centrepieces for unforgettable moments.
                </p>
                <div className="mb-5">
                  <Link
                    to="/creations/wedding"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn cursor-pointer"
                  >
                    <span>Discover Collection</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {/* Right Column: 2 Supporting Wedding Cakes Stacked */}
              <div className="lg:col-span-4 flex flex-col gap-6 order-3">
                {categorizedCakes.wedding.slice(1, 3).map((cake) => (
                  <div
                    key={cake.id}
                    className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md"
                  >
                    <div
                      onClick={() => openLightbox(cake)}
                      className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${cake.name}`}
                    >
                      <img
                        src={cake.image}
                        alt={cake.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                          <Link to={`/creations/${cake.slug}`}>{cake.name}</Link>
                        </h4>
                        <span className="block text-[11px] text-gray-400 font-sans mb-1.5">
                          {cake.servings}
                        </span>
                        <span className="block font-serif text-sm font-semibold text-primary-gold mb-2">
                          {cake.priceDisplay}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={`/creations/${cake.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-champagne-gold hover:text-white"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 3: GRADUATION
              Academic Achievement Chapter (Positioned 3rd as requested)
              - Left: Editorial Header
              - Center: Emerald & Gold Crest Achievement Tier
              - Right: Satin Ribbon Belgian Chocolate Crown
              --------------------------------------------------------------- */}
          <section id="chapter-graduation" aria-label="Graduation Cakes Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Graduation Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Graduation <br />
                  <span className="italic text-primary-gold">Cakes</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Stately designs commemorating scholarly triumph and career milestones.
                </p>
                <div className="mb-5">
                  <Link
                    to="/creations/graduation"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn cursor-pointer"
                  >
                    <span>Discover Collection</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {categorizedCakes.graduation[0] && (
                <div className="lg:col-span-5">
                  <div className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl">
                    <div
                      onClick={() => openLightbox(categorizedCakes.graduation[0])}
                      className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${categorizedCakes.graduation[0].name}`}
                    >
                      <img
                        src={categorizedCakes.graduation[0].image}
                        alt={categorizedCakes.graduation[0].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>{categorizedCakes.graduation[0].cakeType}</span>
                          <span className="font-mono">{categorizedCakes.graduation[0].servings}</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-3">
                          <Link to={`/creations/${categorizedCakes.graduation[0].slug}`}>
                            {categorizedCakes.graduation[0].name}
                          </Link>
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] font-mono uppercase text-gray-400">Starting Estimate</span>
                          <span className="font-serif text-lg text-primary-gold font-semibold">
                            {categorizedCakes.graduation[0].priceDisplay}
                          </span>
                        </div>
                        <Link
                          to={`/creations/${categorizedCakes.graduation[0].slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="lg:col-span-4 flex flex-col gap-6">
                {categorizedCakes.graduation[1] && (
                  <div className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md">
                    <div
                      onClick={() => openLightbox(categorizedCakes.graduation[1])}
                      className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${categorizedCakes.graduation[1].name}`}
                    >
                      <img
                        src={categorizedCakes.graduation[1].image}
                        alt={categorizedCakes.graduation[1].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                          <Link to={`/creations/${categorizedCakes.graduation[1].slug}`}>
                            {categorizedCakes.graduation[1].name}
                          </Link>
                        </h4>
                        <span className="block text-[11px] text-gray-400 font-sans mb-1.5">
                          {categorizedCakes.graduation[1].servings}
                        </span>
                        <span className="block font-serif text-sm font-semibold text-primary-gold mb-2">
                          {categorizedCakes.graduation[1].priceDisplay}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={`/creations/${categorizedCakes.graduation[1].slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-champagne-gold hover:text-white"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 4: KWANJULA
              Cultural & Ceremonial Chapter (Positioned 4th as requested)
              - Left: Editorial Header
              - Center: Ivory Heritage Kwanjula Tier
              - Right: Golden Laurel Tier
              --------------------------------------------------------------- */}
          <section id="chapter-kwanjula" aria-label="Kwanjula Cakes Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Kwanjula Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Kwanjula <br />
                  <span className="italic text-primary-gold">Cakes</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Regal ceremonial tiers honoring Ugandan matrimonial heritage.
                </p>
                <div className="mb-5">
                  <Link
                    to="/creations/kwanjula"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn cursor-pointer"
                  >
                    <span>Discover Collection</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {categorizedCakes.kwanjula[0] && (
                <div className="lg:col-span-5">
                  <div className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl">
                    <div
                      onClick={() => openLightbox(categorizedCakes.kwanjula[0])}
                      className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${categorizedCakes.kwanjula[0].name}`}
                    >
                      <img
                        src={categorizedCakes.kwanjula[0].image}
                        alt={categorizedCakes.kwanjula[0].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>{categorizedCakes.kwanjula[0].cakeType}</span>
                          <span className="font-mono">{categorizedCakes.kwanjula[0].servings}</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-3">
                          <Link to={`/creations/${categorizedCakes.kwanjula[0].slug}`}>
                            {categorizedCakes.kwanjula[0].name}
                          </Link>
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between">
                        <div>
                          <span className="block text-[9px] font-mono uppercase text-gray-400">Starting Estimate</span>
                          <span className="font-serif text-lg text-primary-gold font-semibold">
                            {categorizedCakes.kwanjula[0].priceDisplay}
                          </span>
                        </div>
                        <Link
                          to={`/creations/${categorizedCakes.kwanjula[0].slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs font-semibold tracking-wider uppercase transition-colors"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="lg:col-span-4 flex flex-col gap-6">
                {categorizedCakes.kwanjula[1] && (
                  <div className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md">
                    <div
                      onClick={() => openLightbox(categorizedCakes.kwanjula[1])}
                      className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${categorizedCakes.kwanjula[1].name}`}
                    >
                      <img
                        src={categorizedCakes.kwanjula[1].image}
                        alt={categorizedCakes.kwanjula[1].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                          <Link to={`/creations/${categorizedCakes.kwanjula[1].slug}`}>
                            {categorizedCakes.kwanjula[1].name}
                          </Link>
                        </h4>
                        <span className="block text-[11px] text-gray-400 font-sans mb-1.5">
                          {categorizedCakes.kwanjula[1].servings}
                        </span>
                        <span className="block font-serif text-sm font-semibold text-primary-gold mb-2">
                          {categorizedCakes.kwanjula[1].priceDisplay}
                        </span>
                      </div>
                      <div>
                        <Link
                          to={`/creations/${categorizedCakes.kwanjula[1].slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-champagne-gold hover:text-white"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 5: CUSTOM CAKES
              Approved Direction: Editorial Split Composition — Direction 1
              - Left Zone: Typographic Identity (Custom Commissions, Custom Cakes)
              - Center: Subtle vertical gold rule with star/diamond
              - Right Zone: Italic statement, invitation copy, Request CTA
              --------------------------------------------------------------- */}
          <section
            id="chapter-custom-cakes"
            aria-label="Custom Cakes Chapter"
            className="scroll-mt-24 py-12 lg:py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
              {/* Left Zone — Typographic Identity */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-primary-gold font-semibold">
                    Custom Commissions
                  </span>
                  <span aria-hidden="true" className="w-12 sm:w-16 h-[1px] bg-primary-gold/40" />
                </div>

                <h2 className="font-serif font-normal text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
                  <span className="block text-[#F7EBD9]">Custom</span>
                  <span className="block italic text-primary-gold mt-1 sm:mt-2">Cakes</span>
                </h2>

                <div aria-hidden="true" className="flex items-center gap-3 mt-6 sm:mt-8 max-w-xs">
                  <span className="flex-1 h-[1px] bg-primary-gold/35" />
                  <span className="text-primary-gold text-xs leading-none">✦</span>
                  <span className="flex-1 h-[1px] bg-primary-gold/35" />
                </div>
              </div>

              {/* Vertical Rule Divider — Desktop (hidden on mobile/tablet) */}
              <div
                aria-hidden="true"
                className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center self-stretch py-4 px-4"
              >
                <div className="w-[1px] flex-1 bg-primary-gold/30" />
                <span className="my-4 text-primary-gold text-xs leading-none">✦</span>
                <div className="w-[1px] flex-1 bg-primary-gold/30" />
              </div>

              {/* Mobile Separator — Stacks on mobile/tablet */}
              <div
                aria-hidden="true"
                className="lg:hidden flex items-center justify-center gap-3 my-2 sm:my-4"
              >
                <span className="w-16 sm:w-24 h-[1px] bg-primary-gold/30" />
                <span className="text-primary-gold text-xs leading-none">✦</span>
                <span className="w-16 sm:w-24 h-[1px] bg-primary-gold/30" />
              </div>

              {/* Right Zone — Invitation */}
              <div className="lg:col-span-5 flex flex-col justify-center lg:pl-6">
                <p className="font-serif italic text-xl sm:text-2xl lg:text-[1.85rem] text-[#F7EBD9] leading-[1.3] mb-5 font-normal">
                  Every celebration is unique, and we love creating cakes that reflect your personal style.
                </p>

                <p className="font-sans text-xs sm:text-sm lg:text-base text-gray-300/85 leading-relaxed max-w-xl mb-8 font-light">
                  Whether you have an exact concept or want to explore ideas, you can share your preferred design or upload a reference image, and our team will prepare a custom order request for you.
                </p>

                <div>
                  <Link
                    to="/custom-cake"
                    className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                  >
                    <span>Request a Custom Cake</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ===================================================================
          3. EXHIBITION LIGHTBOX / QUICK PREVIEW MODAL
          Preserved for the 4 catalogue chapters with image previews
          =================================================================== */}
      {quickViewCake && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Navigation Arrow: Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevLightbox()
            }}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/50 items-center justify-center text-2xl transition-all shadow-xl cursor-pointer"
            aria-label="Previous cake"
          >
            &#8249;
          </button>

          {/* Navigation Arrow: Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextLightbox()
            }}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/50 items-center justify-center text-2xl transition-all shadow-xl cursor-pointer"
            aria-label="Next cake"
          >
            &#8250;
          </button>

          <div
            className="relative w-full max-w-4xl bg-[#181512] border border-primary-gold/60 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#141210] text-gray-300 hover:text-white hover:bg-primary-gold/20 border border-white/20 flex items-center justify-center text-xl cursor-pointer shadow-md transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto shrink-0 relative bg-[#141210] overflow-hidden">
              <img
                src={quickViewCake.image}
                alt={quickViewCake.alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-[#141210]/90 border border-primary-gold/40 text-[10px] font-mono uppercase text-champagne-gold">
                  {quickViewCake.tiersDisplay} &bull; {quickViewCake.servings}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#141210]/90 border border-white/20 text-[10px] font-mono text-gray-300">
                  {quickViewCake.categoryLabel}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold block mb-1">
                  {quickViewCake.cakeType}
                </span>

                <h3 id="lightbox-title" className="font-serif font-semibold text-2xl text-brand-white leading-tight mb-2">
                  {quickViewCake.name}
                </h3>

                <div className="text-primary-gold font-serif text-xl font-semibold mb-3">
                  {quickViewCake.priceDisplay}{' '}
                  <span className="text-xs font-sans text-gray-400 font-normal">(Starting Estimate)</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 font-light">
                  {quickViewCake.description}
                </p>

                {quickViewCake.flavorOptions && (
                  <div className="mb-4 pt-3 border-t border-bronze/25">
                    <span className="font-serif text-[11px] uppercase tracking-wider text-champagne-gold font-semibold block mb-1.5">
                      Signature Flavour Pairings:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {quickViewCake.flavorOptions.map((f, i) => (
                        <span key={i} className="text-[10px] font-sans px-2 py-0.5 rounded bg-[#1F1C18] border border-bronze/30 text-gray-300">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-bronze/30 flex items-center gap-3">
                <Link
                  to={`/creations/${quickViewCake.slug}`}
                  onClick={closeLightbox}
                  className="flex-1 py-3 px-4 rounded bg-primary-gold text-dark-canvas text-xs font-semibold uppercase tracking-wider text-center hover:bg-gold-highlight transition-all shadow-sm"
                >
                  View Product Page &rarr;
                </Link>
                <Link
                  to="/custom-cake"
                  onClick={closeLightbox}
                  className="py-3 px-4 rounded border border-primary-gold/60 text-champagne-gold hover:text-white text-xs font-semibold uppercase tracking-wider text-center hover:bg-primary-gold/10 transition-colors"
                >
                  Custom Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
