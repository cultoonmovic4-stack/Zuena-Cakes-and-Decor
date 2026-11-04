import { useState, useMemo, useEffect, useCallback } from 'react'
import { useParams, useSearchParams, Link } from 'react-router'
import { cakeProducts } from '../../data/creationsData'
import { collectionsConfig } from '../../data/collectionsConfig'

export default function CollectionPage({ categoryKey: propCategoryKey }) {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeModalIndex, setActiveModalIndex] = useState(null)

  // Resolve active category config
  const categoryKey = propCategoryKey || params.categoryKey || 'birthday'
  const config = collectionsConfig[categoryKey] || collectionsConfig.birthday

  // Resolve optional occasion sub-route
  const occasionSlug = params.occasion
  const activeOccasion = useMemo(() => {
    if (!occasionSlug) return null
    return config.occasions.find((o) => o.slug === occasionSlug) || null
  }, [config.occasions, occasionSlug])

  // Filter products for this category (with optional test/demo scaling for verification)
  const categoryProducts = useMemo(() => {
    const prods = cakeProducts.filter(config.categoryFilter)
    const demoCount = parseInt(searchParams.get('demoCount'), 10)
    if (!isNaN(demoCount) && demoCount > prods.length) {
      const expanded = [...prods]
      let counter = prods.length + 1
      while (expanded.length < demoCount) {
        const base = prods[expanded.length % prods.length]
        expanded.push({
          ...base,
          id: `${base.id}-demo-${counter}`,
          name: `${base.name} (Archive Edition ${counter})`,
          slug: base.slug,
        })
        counter++
      }
      return expanded
    }
    return prods
  }, [config, searchParams])

  // Filter products if an occasion is active
  const filteredProducts = useMemo(() => {
    if (!activeOccasion) return categoryProducts
    return categoryProducts.filter(activeOccasion.matchPredicate)
  }, [categoryProducts, activeOccasion])

  // Highlighted featured creation (Scene 3)
  const featuredCake = useMemo(() => {
    return (
      categoryProducts.find((c) => c.id === config.featuredCakeId) ||
      categoryProducts[0] ||
      cakeProducts[0]
    )
  }, [categoryProducts, config.featuredCakeId])

  // Configurable pagination
  const pageSizeParam = parseInt(searchParams.get('pageSize'), 10)
  const pageSize = !isNaN(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : config.defaultPageSize || 8
  const totalItems = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const pageParam = parseInt(searchParams.get('page'), 10)
  const currentPage = !isNaN(pageParam) && pageParam >= 1 ? Math.min(pageParam, totalPages) : 1

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredProducts.slice(start, start + pageSize)
  }, [filteredProducts, currentPage, pageSize])

  const goToPage = (page) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', page.toString())
    setSearchParams(newParams)
    document.getElementById('complete-collection')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Exhibition Lightbox helpers
  const quickViewCake = activeModalIndex !== null ? filteredProducts[activeModalIndex] : null

  const openLightbox = useCallback((cake) => {
    const idx = filteredProducts.findIndex((c) => c.id === cake.id)
    setActiveModalIndex(idx >= 0 ? idx : 0)
  }, [filteredProducts])

  const closeLightbox = useCallback(() => {
    setActiveModalIndex(null)
  }, [])

  const nextLightbox = useCallback(() => {
    if (activeModalIndex !== null && filteredProducts.length > 0) {
      setActiveModalIndex((prev) => (prev + 1) % filteredProducts.length)
    }
  }, [activeModalIndex, filteredProducts.length])

  const prevLightbox = useCallback(() => {
    if (activeModalIndex !== null && filteredProducts.length > 0) {
      setActiveModalIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length)
    }
  }, [activeModalIndex, filteredProducts.length])

  // Keyboard navigation for lightbox
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
          SCENE 1: CINEMATIC OPENING
          Full-width, immersive cake photography with category typography
          =================================================================== */}
      <section
        aria-label={`${config.title} Collection Opening Scene`}
        className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center bg-[#141210] border-b border-bronze/25 px-4 sm:px-6 lg:px-12 py-12 lg:py-20 overflow-hidden"
      >
        {/* Subtle atmospheric vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-transparent via-[#141210]/60 to-[#141210] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Category Identity & Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-3 text-xs font-mono text-gray-400">
              <Link to="/creations" className="hover:text-primary-gold transition-colors">
                Our Creations
              </Link>
              <span>/</span>
              <Link to={config.route} className="text-champagne-gold hover:text-white transition-colors">
                {config.title}
              </Link>
              {activeOccasion && (
                <>
                  <span>/</span>
                  <span className="text-primary-gold truncate max-w-[200px]">{activeOccasion.title}</span>
                </>
              )}
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary-gold font-semibold">
                {activeOccasion ? `${config.title} &mdash; ${activeOccasion.title}` : config.overline}
              </span>
              <span className="w-12 h-[1px] bg-primary-gold/60" />
            </div>

            <h1 className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F7EBD9] leading-[1.02] tracking-tight mb-4 sm:mb-6">
              {activeOccasion ? (
                <>
                  <span className="block">{activeOccasion.title}</span>
                  <span className="italic text-primary-gold font-normal">Cakes</span>
                </>
              ) : (
                <>
                  {config.title} <br />
                  <span className="italic text-primary-gold font-normal">{config.italicTitle}</span>
                </>
              )}
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-300/90 leading-relaxed max-w-lg mb-8 sm:mb-10 font-light">
              {activeOccasion ? activeOccasion.description : config.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#occasion-discovery"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('occasion-discovery')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-primary-gold/70 text-champagne-gold hover:text-[#141210] hover:bg-primary-gold text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Explore Occasions</span>
                <span aria-hidden="true">&darr;</span>
              </a>

              <a
                href="#complete-collection"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('complete-collection')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans uppercase tracking-wider text-gray-400 hover:text-primary-gold transition-colors py-3 px-4"
              >
                <span>View Full Collection ({totalItems})</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Flagship Photography */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 rounded-lg overflow-hidden shadow-2xl border border-bronze/35 bg-[#181512]">
              <img
                src={activeOccasion ? activeOccasion.image : config.heroImage}
                alt={activeOccasion ? activeOccasion.alt : config.heroAlt}
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
          SCENE 2: OCCASION DISCOVERY
          Visual photographic links integrated into the editorial composition
          =================================================================== */}
      <section
        id="occasion-discovery"
        aria-label={`${config.title} Occasion Discovery`}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-bronze/20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.26em] text-primary-gold font-semibold">
                Occasion Discovery &mdash;
              </span>
              <span className="w-10 h-[1px] bg-primary-gold/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-tight">
              Curated by <span className="italic text-primary-gold">Celebration</span>
            </h2>
          </div>

          {activeOccasion && (
            <Link
              to={config.route}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-champagne-gold hover:text-white border-b border-primary-gold/40 pb-1 self-start md:self-auto"
            >
              <span>View All {config.title} Pieces</span>
              <span aria-hidden="true">&times;</span>
            </Link>
          )}
        </div>

        {/* Editorial Composition for Wedding Collection (4 Occasions) */}
        {config.key === 'wedding' ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Upper Spread: Dominant Wedding Receptions (7 cols) + Engagements Study (5 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* 1. Dominant Photographic Presentation: Wedding Receptions */}
              {(() => {
                const occasion = config.occasions.find((o) => o.slug === 'wedding-receptions') || config.occasions[2]
                const isSelected = activeOccasion?.slug === occasion.slug
                return (
                  <Link
                    key={occasion.id}
                    to={`${config.route}/${occasion.slug}`}
                    aria-label={`Explore ${occasion.title}`}
                    className={`group md:col-span-12 lg:col-span-7 relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-xl cursor-pointer ${
                      isSelected
                        ? 'border-primary-gold ring-1 ring-primary-gold'
                        : 'border-bronze/35 hover:border-primary-gold/70'
                    }`}
                  >
                    <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden bg-[#141210]">
                      <img
                        src={occasion.image}
                        alt={occasion.alt}
                        className="w-full h-full object-cover object-[center_35%] group-hover:scale-104 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-transparent to-transparent pointer-events-none"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#141210]/90 border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold">
                          Ballroom Flagship
                        </span>
                        {isSelected && (
                          <span className="px-2.5 py-1 rounded-full bg-primary-gold text-dark-canvas text-[10px] font-mono uppercase tracking-wider font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-gold/90 font-semibold block mb-2">
                          Occasion 01 &mdash; Ballroom Grandeur
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-tight mb-3 font-normal">
                          {occasion.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-gray-300/85 leading-relaxed font-light mb-6">
                          {occasion.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                        <span>Explore Wedding Receptions</span>
                        <span aria-hidden="true" className="transform group-hover:translate-x-2 transition-transform">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })()}

              {/* 2. Romantic Study: Engagements */}
              {(() => {
                const occasion = config.occasions.find((o) => o.slug === 'engagements') || config.occasions[0]
                const isSelected = activeOccasion?.slug === occasion.slug
                return (
                  <Link
                    key={occasion.id}
                    to={`${config.route}/${occasion.slug}`}
                    aria-label={`Explore ${occasion.title}`}
                    className={`group md:col-span-12 lg:col-span-5 relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-xl cursor-pointer ${
                      isSelected
                        ? 'border-primary-gold ring-1 ring-primary-gold'
                        : 'border-bronze/35 hover:border-primary-gold/70'
                    }`}
                  >
                    <div className="relative w-full aspect-16/11 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden bg-[#141210]">
                      <img
                        src={occasion.image}
                        alt={occasion.alt}
                        className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#141210]/90 border border-bronze/40 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold">
                          Intimate Promise
                        </span>
                        {isSelected && (
                          <span className="px-2.5 py-1 rounded-full bg-primary-gold text-dark-canvas text-[10px] font-mono uppercase tracking-wider font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-gold/90 font-semibold block mb-2">
                          Occasion 02 &mdash; Marital Promise
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-snug mb-2 font-normal">
                          {occasion.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-300/80 leading-relaxed font-light mb-4">
                          {occasion.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                        <span>Explore Engagements</span>
                        <span aria-hidden="true" className="transform group-hover:translate-x-1.5 transition-transform">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })()}
            </div>

            {/* Lower Spread: Traditional Weddings (5 cols) & Anniversaries (7 cols) Asymmetric Pair */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch pt-2">
              {/* 3. Traditional Weddings */}
              {(() => {
                const occasion = config.occasions.find((o) => o.slug === 'traditional-weddings') || config.occasions[1]
                const isSelected = activeOccasion?.slug === occasion.slug
                return (
                  <Link
                    key={occasion.id}
                    to={`${config.route}/${occasion.slug}`}
                    aria-label={`Explore ${occasion.title}`}
                    className={`group md:col-span-12 lg:col-span-5 relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-lg cursor-pointer ${
                      isSelected
                        ? 'border-primary-gold ring-1 ring-primary-gold'
                        : 'border-bronze/35 hover:border-primary-gold/70'
                    }`}
                  >
                    <div className="relative w-full aspect-16/10 overflow-hidden bg-[#141210]">
                      <img
                        src={occasion.image}
                        alt={occasion.alt}
                        className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#141210]/90 border border-bronze/40 text-[9px] font-mono uppercase tracking-[0.2em] text-champagne-gold">
                          Customary Heritage
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-gold text-dark-canvas text-[9px] font-mono uppercase tracking-wider font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-gold/90 font-semibold block mb-1.5">
                          Occasion 03 &mdash; Cultural Matrimony
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-snug mb-2 font-normal">
                          {occasion.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-300/80 leading-relaxed font-light mb-4">
                          {occasion.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                        <span>Explore Traditional</span>
                        <span aria-hidden="true" className="transform group-hover:translate-x-1.5 transition-transform">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })()}

              {/* 4. Anniversaries */}
              {(() => {
                const occasion = config.occasions.find((o) => o.slug === 'anniversaries') || config.occasions[3]
                const isSelected = activeOccasion?.slug === occasion.slug
                return (
                  <Link
                    key={occasion.id}
                    to={`${config.route}/${occasion.slug}`}
                    aria-label={`Explore ${occasion.title}`}
                    className={`group md:col-span-12 lg:col-span-7 relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-lg cursor-pointer ${
                      isSelected
                        ? 'border-primary-gold ring-1 ring-primary-gold'
                        : 'border-bronze/35 hover:border-primary-gold/70'
                    }`}
                  >
                    <div className="relative w-full aspect-16/10 overflow-hidden bg-[#141210]">
                      <img
                        src={occasion.image}
                        alt={occasion.alt}
                        className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#141210]/90 border border-bronze/40 text-[9px] font-mono uppercase tracking-[0.2em] text-champagne-gold">
                          Enduring Devotion
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-gold text-dark-canvas text-[9px] font-mono uppercase tracking-wider font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-gold/90 font-semibold block mb-1.5">
                          Occasion 04 &mdash; Devotional Milestone
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-snug mb-2 font-normal">
                          {occasion.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-300/80 leading-relaxed font-light mb-4">
                          {occasion.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                        <span>Explore Anniversaries</span>
                        <span aria-hidden="true" className="transform group-hover:translate-x-1.5 transition-transform">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })()}
            </div>
          </div>
        ) : config.occasions.length === 5 ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Upper Spread: Dominant Children's Birthdays (7 cols) + Adult & Milestone Stack (5 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
              {/* 1. Dominant Photographic Presentation: Children's Birthdays */}
              {(() => {
                const occasion = config.occasions[0]
                const isSelected = activeOccasion?.slug === occasion.slug
                return (
                  <Link
                    key={occasion.id}
                    to={`${config.route}/${occasion.slug}`}
                    aria-label={`Explore ${occasion.title}`}
                    className={`group md:col-span-12 lg:col-span-7 relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-xl cursor-pointer ${
                      isSelected
                        ? 'border-primary-gold ring-1 ring-primary-gold'
                        : 'border-bronze/35 hover:border-primary-gold/70'
                    }`}
                  >
                    {/* Dominant Photograph */}
                    <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden bg-[#141210]">
                      <img
                        src={occasion.image}
                        alt={occasion.alt}
                        className="w-full h-full object-cover object-[center_35%] group-hover:scale-104 transition-transform duration-700 ease-out"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-transparent to-transparent pointer-events-none"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#141210]/90 border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold">
                          Lead Feature
                        </span>
                        {isSelected && (
                          <span className="px-2.5 py-1 rounded-full bg-primary-gold text-dark-canvas text-[10px] font-mono uppercase tracking-wider font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Editorial Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                          Celebration 01 &mdash;
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-snug mb-3">
                          {occasion.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-gray-300/85 leading-relaxed font-light max-w-xl mb-6">
                          {occasion.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                        <span className="font-semibold">Explore Occasion</span>
                        <span aria-hidden="true" className="transform group-hover:translate-x-1.5 transition-transform">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })()}

              {/* 2 & 3. Two Smaller Carefully Positioned Presentations: Adult & Milestone Birthdays */}
              <div className="md:col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-8">
                {[config.occasions[1], config.occasions[2]].map((occasion, idx) => {
                  const isSelected = activeOccasion?.slug === occasion.slug
                  const occasionNum = idx === 0 ? '02' : '03'
                  return (
                    <Link
                      key={occasion.id}
                      to={`${config.route}/${occasion.slug}`}
                      aria-label={`Explore ${occasion.title}`}
                      className={`group flex-1 relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-lg cursor-pointer ${
                        isSelected
                          ? 'border-primary-gold ring-1 ring-primary-gold'
                          : 'border-bronze/35 hover:border-primary-gold/70'
                      }`}
                    >
                      <div className="relative w-full aspect-16/10 sm:aspect-16/9 lg:aspect-16/9 overflow-hidden bg-[#141210]">
                        <img
                          src={occasion.image}
                          alt={occasion.alt}
                          className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none"
                        />
                        {isSelected && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary-gold text-dark-canvas text-[10px] font-mono uppercase tracking-wider font-semibold">
                            Viewing
                          </span>
                        )}
                      </div>

                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-gold/90 font-semibold block mb-1.5">
                            Celebration {occasionNum} &mdash;
                          </span>
                          <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-snug mb-2">
                            {occasion.title}
                          </h3>
                          <p className="font-sans text-xs text-gray-300/80 leading-relaxed font-light line-clamp-2 mb-4">
                            {occasion.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                          <span>Explore Occasion</span>
                          <span aria-hidden="true" className="transform group-hover:translate-x-1.5 transition-transform">
                            &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Lower Spread: First Birthdays & Surprise Celebrations in Asymmetric Pair */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch pt-2">
              {[
                { occasion: config.occasions[3], num: '04', span: 'md:col-span-6 lg:col-span-5' },
                { occasion: config.occasions[4], num: '05', span: 'md:col-span-6 lg:col-span-7' },
              ].map(({ occasion, num, span }) => {
                const isSelected = activeOccasion?.slug === occasion.slug
                return (
                  <Link
                    key={occasion.id}
                    to={`${config.route}/${occasion.slug}`}
                    aria-label={`Explore ${occasion.title}`}
                    className={`group ${span} relative flex flex-col justify-between bg-[#181512] rounded-xl overflow-hidden border transition-all duration-300 shadow-lg cursor-pointer ${
                      isSelected
                        ? 'border-primary-gold ring-1 ring-primary-gold'
                        : 'border-bronze/35 hover:border-primary-gold/70'
                    }`}
                  >
                    <div className="relative w-full aspect-16/10 overflow-hidden bg-[#141210]">
                      <img
                        src={occasion.image}
                        alt={occasion.alt}
                        className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent pointer-events-none"
                      />
                      {isSelected && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary-gold text-dark-canvas text-[10px] font-mono uppercase tracking-wider font-semibold">
                          Viewing
                        </span>
                      )}
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-gold/90 font-semibold block mb-1.5">
                          Celebration {num} &mdash;
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors leading-snug mb-2">
                          {occasion.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-300/80 leading-relaxed font-light line-clamp-2 mb-4">
                          {occasion.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                        <span>Explore Occasion</span>
                        <span aria-hidden="true" className="transform group-hover:translate-x-1.5 transition-transform">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : (
          /* Standard Editorial Grid for other categories */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {config.occasions.map((occasion) => {
              const isSelected = activeOccasion?.slug === occasion.slug
              return (
                <Link
                  key={occasion.id}
                  to={`${config.route}/${occasion.slug}`}
                  className={`group relative flex flex-col bg-[#181512] rounded-lg overflow-hidden border transition-all duration-300 shadow-lg ${
                    isSelected
                      ? 'border-primary-gold ring-1 ring-primary-gold'
                      : 'border-bronze/35 hover:border-primary-gold/70'
                  }`}
                >
                  <div className="relative w-full aspect-16/10 overflow-hidden bg-[#141210]">
                    <img
                      src={occasion.image}
                      alt={occasion.alt}
                      className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-transparent pointer-events-none"
                    />
                    {isSelected && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-primary-gold text-dark-canvas text-[10px] font-mono uppercase tracking-wider font-semibold">
                        Viewing
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl text-[#F7EBD9] group-hover:text-primary-gold transition-colors mb-2">
                        {occasion.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-300/80 leading-relaxed font-light line-clamp-2 mb-4">
                        {occasion.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-bronze/25 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-champagne-gold group-hover:text-primary-gold">
                      <span>Explore Occasion</span>
                      <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ===================================================================
          SCENE 3: FEATURED CREATION — EDITORIAL SPOTLIGHT
          Standalone magazine feature spotlighting the category flagship piece
          =================================================================== */}
      {featuredCake && !activeOccasion && (
        <section
          id="featured-spotlight"
          aria-label={`Featured Creation Spotlight: ${featuredCake.name}`}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 border-b border-bronze/25"
        >
          {/* Section Overline */}
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-primary-gold font-semibold">
                Curator&apos;s Spotlight &mdash; {config.romanNumeral}
              </span>
              <span aria-hidden="true" className="w-12 h-[1px] bg-primary-gold/40" />
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider text-gray-400">
              Signature Patisserie
            </span>
          </div>

          {/* Asymmetric Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Dominant Exhibition Photography */}
            <div className="lg:col-span-7">
              <div
                onClick={() => openLightbox(featuredCake)}
                className="group relative w-full aspect-4/3 sm:aspect-16/11 lg:aspect-4/3 rounded-xl overflow-hidden bg-[#181512] border border-bronze/40 hover:border-primary-gold/70 transition-all duration-500 shadow-2xl cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Preview full image of ${featuredCake.name}`}
              >
                <img
                  src={featuredCake.image}
                  alt={featuredCake.alt}
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-transparent pointer-events-none"
                />

                {/* Floating Exhibition Corner Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#141210]/90 backdrop-blur-xs border border-primary-gold/50 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold font-semibold shadow-md">
                    Featured Exhibition Piece
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Balanced Editorial Narrative & Specifications */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Occasion / Classification Badge */}
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2.5">
                  {featuredCake.categoryLabel || config.title} Patisserie
                </span>

                {/* Monumental Headline */}
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] tracking-tight mb-4">
                  <Link
                    to={`/creations/${featuredCake.slug}`}
                    className="hover:text-primary-gold transition-colors"
                  >
                    {featuredCake.name}
                  </Link>
                </h3>

                {/* Editorial Hairline Separator */}
                <div aria-hidden="true" className="flex items-center gap-3 my-4">
                  <span className="w-10 h-[1px] bg-primary-gold/50" />
                  <span className="text-primary-gold text-xs leading-none">✦</span>
                  <span className="w-16 h-[1px] bg-primary-gold/30" />
                </div>

                {/* Authentic Editorial Description */}
                <p className="font-sans text-xs sm:text-sm lg:text-base text-gray-300/85 leading-relaxed font-light mb-6 sm:mb-8">
                  {featuredCake.description || featuredCake.summary}
                </p>

                {/* Craftsmanship Specifications Strip */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-bronze/25 mb-6 sm:mb-8 font-sans">
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                      Guest Capacity
                    </span>
                    <span className="font-serif text-base sm:text-lg text-brand-white font-medium">
                      {featuredCake.servings}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                      Tier Architecture
                    </span>
                    <span className="font-serif text-base sm:text-lg text-brand-white font-medium">
                      {featuredCake.tiersDisplay || `${featuredCake.tiers} Tiers`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-0.5">
                    Starting Estimate
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-primary-gold font-semibold">
                    {featuredCake.priceDisplay}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/creations/${featuredCake.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>View Details</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================================================================
          SCENE 4: COMPLETE COLLECTION — CURATED EDITORIAL GALLERY
          Art-directed cake exhibition with lead & supporting compositions,
          varied visual rhythm, and scalable pagination (pageSize = 8).
          =================================================================== */}
      <section
        id="complete-collection"
        aria-label={`${config.title} Complete Collection`}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-t border-bronze/20"
      >
        {/* Curated Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-primary-gold font-semibold">
                {activeOccasion ? activeOccasion.title : 'Catalogue Archive'} &mdash; Chapter II
              </span>
              <span className="w-12 h-[1px] bg-primary-gold/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-tight font-normal">
              {activeOccasion ? activeOccasion.title : 'Complete'}{' '}
              <span className="italic text-primary-gold font-serif">Collection</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-300/75 font-sans leading-relaxed">
              Every creation in our permanent archive is scratch-baked with premium ingredients and customized to your celebration&rsquo;s palette, tier requirements, and guest capacity.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-bronze/30 bg-[#181512]/60 font-mono text-xs text-champagne-gold/80 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-gold/80" />
            <span>
              {filteredProducts.length === 0
                ? '0 Creations'
                : `Exhibition ${String((currentPage - 1) * pageSize + 1).padStart(2, '0')}\u2013${String(
                    Math.min(currentPage * pageSize, totalItems)
                  ).padStart(2, '0')} of ${String(totalItems).padStart(2, '0')}`}
            </span>
          </div>
        </div>

        {/* Empty Occasion Collection Handling (Preserved bespoke commission invitation) */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 max-w-2xl mx-auto text-center bg-[#181512] border border-bronze/35 rounded-sm shadow-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.26em] text-primary-gold font-semibold block mb-3">
              Bespoke Commission
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F7EBD9] mb-4 font-normal">
              Individually Envisioned for Your Celebration
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-300/85 leading-relaxed font-light mb-8 max-w-lg mx-auto">
              We do not list pre-designed catalogue pieces for this specific occasion because every piece is envisioned
              collaboratively around your unique theme, guest count, and venue style.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/custom-cake"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-all shadow-lg"
              >
                <span>Request a Custom Cake</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to={config.route}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-bronze/40 text-champagne-gold hover:text-white text-xs sm:text-sm font-sans tracking-wider uppercase transition-colors"
              >
                <span>View All {config.title} Cakes</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Art-Directed Curated Editorial Gallery */
          <div className="space-y-12 sm:space-y-16">
            {/* Primary Asymmetric Suite: Lead Creation + Supporting Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Lead Product (Index 0 on page) — Expansive Exhibition Feature */}
              {paginatedProducts[0] && (
                <div className={`${paginatedProducts.length > 1 ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl mx-auto'}`}>
                  <article className="group h-full flex flex-col bg-[#181512]/70 border border-bronze/30 hover:border-primary-gold/60 rounded-sm overflow-hidden transition-all duration-300 shadow-xl">
                    {/* Exhibition Frame */}
                    <div
                      onClick={() => openLightbox(paginatedProducts[0])}
                      className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#141210] cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Preview ${paginatedProducts[0].name} in Exhibition Lightbox`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          openLightbox(paginatedProducts[0])
                        }
                      }}
                    >
                      <img
                        src={paginatedProducts[0].image}
                        alt={paginatedProducts[0].alt}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Floating Gallery Badge */}
                      <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#141210]/85 border border-primary-gold/35 rounded-xs backdrop-blur-xs">
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary-gold font-medium">
                          Gallery Lead Piece
                        </span>
                      </div>
                    </div>

                    {/* Lead Content & Specifications */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                          <span className="uppercase tracking-wider text-champagne-gold/80">
                            {paginatedProducts[0].cakeType || paginatedProducts[0].categoryLabel}
                          </span>
                          <span className="tracking-wide text-gray-300/80">{paginatedProducts[0].servings}</span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-3 font-normal">
                          <Link to={`/creations/${paginatedProducts[0].slug}`}>
                            {paginatedProducts[0].name}
                          </Link>
                        </h3>

                        {paginatedProducts[0].summary && (
                          <p className="text-xs sm:text-sm text-gray-300/80 font-sans line-clamp-2 leading-relaxed mb-5 font-light">
                            {paginatedProducts[0].summary}
                          </p>
                        )}
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-4 border-t border-bronze/25 flex items-center justify-between gap-4">
                        <div>
                          <span className="block text-[9px] font-mono uppercase tracking-widest text-gray-400">
                            Starting Estimate
                          </span>
                          <span className="font-serif text-xl sm:text-2xl text-primary-gold font-normal">
                            {paginatedProducts[0].priceDisplay}
                          </span>
                        </div>

                        <Link
                          to={`/creations/${paginatedProducts[0].slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-md shrink-0"
                        >
                          <span>View Details</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Supporting Products Stack (Indices 1 and 2 on page) */}
              {paginatedProducts.length > 1 && (
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  {paginatedProducts.slice(1, 3).map((cake, sIdx) => (
                    <article
                      key={cake.id}
                      className="group flex-1 flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#181512]/60 hover:bg-[#181512] border border-bronze/25 hover:border-primary-gold/50 rounded-sm transition-all duration-300 shadow-md"
                    >
                      {/* Compact Exhibition Frame */}
                      <div
                        onClick={() => openLightbox(cake)}
                        className="relative w-full sm:w-36 lg:w-40 aspect-square rounded-xs overflow-hidden shrink-0 bg-[#141210] cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-label={`Preview ${cake.name} in Exhibition Lightbox`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openLightbox(cake)
                          }
                        }}
                      >
                        <img
                          src={cake.image}
                          alt={cake.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#141210]/85 border border-bronze/40 rounded-xs">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-champagne-gold">
                            No. 0{sIdx + 2}
                          </span>
                        </div>
                      </div>

                      {/* Supporting Details */}
                      <div className="flex-1 flex flex-col justify-between w-full h-full">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1">
                            <span className="uppercase tracking-wider text-champagne-gold/75 truncate max-w-[130px]">
                              {cake.cakeType}
                            </span>
                            <span className="text-gray-400">{cake.servings}</span>
                          </div>

                          <h4 className="font-serif text-base sm:text-lg text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-2 font-normal">
                            <Link to={`/creations/${cake.slug}`}>{cake.name}</Link>
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-bronze/20 flex items-center justify-between">
                          <span className="font-serif text-base text-primary-gold font-normal">
                            {cake.priceDisplay}
                          </span>

                          <Link
                            to={`/creations/${cake.slug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-champagne-gold hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                          >
                            <span>View Details</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Secondary Suite: Dynamic Editorial Arrangement for Items 3–7 */}
            {paginatedProducts.length > 3 && (
              <div className="pt-8 border-t border-bronze/20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-champagne-gold/70">
                    Additional Curated Works
                  </span>
                  <span className="w-8 h-[1px] bg-bronze/30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
                  {paginatedProducts.slice(3).map((cake, idx) => {
                    // Assign varied visual rhythm across 12 cols:
                    // 1 item: 12 cols
                    // 2 items: 7 cols & 5 cols
                    // 3+ items: alternating 4 cols or 6 cols
                    const remainingCount = paginatedProducts.slice(3).length
                    let colSpan = 'lg:col-span-4'
                    let aspectClass = 'aspect-4/3'

                    if (remainingCount === 1) {
                      colSpan = 'sm:col-span-2 lg:col-span-8 lg:col-start-3'
                      aspectClass = 'aspect-16/10'
                    } else if (remainingCount === 2) {
                      colSpan = idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                      aspectClass = idx === 0 ? 'aspect-16/10' : 'aspect-4/3'
                    } else if (remainingCount >= 4 && idx < 2) {
                      colSpan = idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                      aspectClass = 'aspect-16/10'
                    }

                    return (
                      <article
                        key={cake.id}
                        className={`${colSpan} group flex flex-col bg-[#181512]/60 hover:bg-[#181512] border border-bronze/25 hover:border-primary-gold/50 rounded-sm overflow-hidden transition-all duration-300 shadow-md`}
                      >
                        {/* Image Frame */}
                        <div
                          onClick={() => openLightbox(cake)}
                          className={`relative w-full ${aspectClass} overflow-hidden bg-[#141210] cursor-pointer`}
                          role="button"
                          tabIndex={0}
                          aria-label={`Preview ${cake.name} in Exhibition Lightbox`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              openLightbox(cake)
                            }
                          }}
                        >
                          <img
                            src={cake.image}
                            alt={cake.alt}
                            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        </div>

                        {/* Product Information */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1.5">
                              <span className="uppercase tracking-wider text-champagne-gold/75 truncate max-w-[140px]">
                                {cake.cakeType}
                              </span>
                              <span className="text-gray-400">{cake.servings}</span>
                            </div>

                            <h4 className="font-serif text-lg text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-3 font-normal">
                              <Link to={`/creations/${cake.slug}`}>{cake.name}</Link>
                            </h4>
                          </div>

                          <div className="pt-3 border-t border-bronze/20 flex items-center justify-between">
                            <div>
                              <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400">
                                Estimate
                              </span>
                              <span className="font-serif text-base text-primary-gold font-normal">
                                {cake.priceDisplay}
                              </span>
                            </div>

                            <Link
                              to={`/creations/${cake.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-champagne-gold hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                            >
                              <span>View Details</span>
                              <span aria-hidden="true">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav
                aria-label="Collection Pagination"
                className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-bronze/25"
              >
                <div className="text-xs font-mono text-gray-400">
                  Page {currentPage} of {totalPages} &bull; {totalItems} total creations
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 rounded-sm border border-bronze/40 text-xs font-mono uppercase tracking-wider text-champagne-gold hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    &larr; Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`w-9 h-9 rounded-sm text-xs font-mono transition-colors ${
                          p === currentPage
                            ? 'bg-primary-gold text-dark-canvas font-bold'
                            : 'border border-bronze/30 text-gray-300 hover:border-primary-gold'
                        }`}
                        aria-current={p === currentPage ? 'page' : undefined}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 rounded-sm border border-bronze/40 text-xs font-mono uppercase tracking-wider text-champagne-gold hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    Next &rarr;
                  </button>
                </div>
              </nav>
            )}
          </div>
        )}
      </section>

      {/* ===================================================================
          EXHIBITION LIGHTBOX / QUICK PREVIEW MODAL
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
            className="relative w-full max-w-4xl bg-[#181512] border border-bronze/50 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-[#141210]/80 hover:bg-primary-gold text-gray-300 hover:text-dark-canvas border border-bronze/40 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Cake Photo Preview */}
            <div className="w-full md:w-1/2 relative bg-[#141210] flex items-center justify-center min-h-[260px] md:min-h-[420px] overflow-hidden">
              <img
                src={quickViewCake.image}
                alt={quickViewCake.alt}
                className="w-full h-full object-cover object-center max-h-[50vh] md:max-h-full"
              />
            </div>

            {/* Details Panel */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary-gold">
                    {quickViewCake.categoryLabel}
                  </span>
                  <span className="text-gray-500">&bull;</span>
                  <span className="text-xs text-gray-400 font-mono">
                    {quickViewCake.servings}
                  </span>
                </div>

                <h3 id="lightbox-title" className="font-serif text-2xl sm:text-3xl text-[#F7EBD9] leading-snug mb-2">
                  {quickViewCake.name}
                </h3>

                <div className="text-primary-gold font-serif text-xl font-semibold mb-3">
                  {quickViewCake.priceDisplay}{' '}
                  <span className="text-xs font-mono font-normal text-gray-400">
                    ({quickViewCake.tiersDisplay || `${quickViewCake.tiers} Tiers`})
                  </span>
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
