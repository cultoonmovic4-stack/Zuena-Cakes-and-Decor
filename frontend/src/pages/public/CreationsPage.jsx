import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { baseCakeProducts, cakeProducts as allCakeProducts } from '../../data/creationsData'

const cakeProducts = baseCakeProducts || allCakeProducts

// High-resolution images for the 5 constellation circles
import weddingCakeImg from '../../assets/images/wd 1.jpg'
import mochaBirthdayImg from '../../assets/images/bd 1.jpg'
import ivoryFloralWeddingImg from '../../assets/images/wd 3.jpg'
import emeraldGraduationImg from '../../assets/images/gd 1.jpg'
import blackGoldDripImg from '../../assets/images/gd 2.jpg'

// High-resolution asymmetrical images for Scene 3 CTA
import crystalWeddingImg from '../../assets/images/wd 2.jpg'
import receptionCanopyImg from '../../assets/images/decor 4.jpg'
import goldTableSettingImg from '../../assets/images/decor 1.jpg'

// Filter system configuration in user-specified order:
// 1. All creations, 2. Birthday cakes, 3. Wedding cakes, 4. Kwanjula cakes, 5. Graduation cakes, 6. Custom cakes
const filterItems = [
  {
    id: 'all',
    label: 'All Creations',
    count: 12,
    isAll: true,
  },
  {
    id: 'birthdays',
    label: 'Birthday Cakes',
    count: 3,
    image: mochaBirthdayImg,
    alt: 'Modern mocha and gold spheres birthday celebration cake',
    moveOrder: 1, // 1st to move
    initialDelay: 100, // 1st to fade-in initially (0.1s)
  },
  {
    id: 'weddings',
    label: 'Wedding Cakes',
    count: 3,
    image: weddingCakeImg,
    alt: 'Tiered royal wedding cake with champagne drapery and crimson sugar roses',
    moveOrder: 2, // 2nd to move
    initialDelay: 800, // 2nd to fade-in initially (+0.7s)
  },
  {
    id: 'traditional',
    label: 'Kwanjula Cakes',
    count: 2,
    image: ivoryFloralWeddingImg,
    alt: 'Pure ivory and sugar florals Kwanjula introduction ceremonial cake',
    moveOrder: 3, // 3rd to move
    initialDelay: 1500, // 3rd to fade-in initially (+0.7s)
  },
  {
    id: 'graduation',
    label: 'Graduation Cakes',
    count: 2,
    image: emeraldGraduationImg,
    alt: 'Royal emerald marble and gold crest graduation cake',
    moveOrder: 4, // 4th to move
    initialDelay: 2200, // 4th to fade-in initially (+0.7s)
  },
  {
    id: 'custom',
    label: 'Custom Cakes',
    count: 2,
    image: blackGoldDripImg,
    alt: 'Matte black and molten 24K gold drip custom sculptural celebration cake',
    moveOrder: 5, // 5th to move
    initialDelay: 2900, // 5th to fade-in initially (+0.7s)
  },
]

export default function CreationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [activeModalIndex, setActiveModalIndex] = useState(null)

  // Scroll and animation states
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollYPos, setScrollYPos] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const lastScrollYRef = useRef(0)
  const [appearedCircles, setAppearedCircles] = useState(new Set())
  const [deltasReady, setDeltasReady] = useState(false)
  const [deltas, setDeltas] = useState({
    birthdays: { x: 0, y: 0 },
    weddings: { x: 0, y: 0 },
    traditional: { x: 0, y: 0 },
    graduation: { x: 0, y: 0 },
    custom: { x: 0, y: 0 },
  })

  const [filterOffsetY, setFilterOffsetY] = useState(0)
  const heroRef = useRef(null)
  const showcaseRef = useRef(null)
  const filterBarRef = useRef(null)

  // Anchor and slot refs for FLIP coordinate calculation
  const heroAnchorRefs = {
    weddings: useRef(null),
    birthdays: useRef(null),
    traditional: useRef(null),
    graduation: useRef(null),
    custom: useRef(null),
  }

  const filterSlotRefs = {
    birthdays: useRef(null),
    weddings: useRef(null),
    traditional: useRef(null),
    graduation: useRef(null),
    custom: useRef(null),
  }

  // Filter products based on selected category & search
  const filteredProducts = useMemo(() => {
    let list = cakeProducts.filter((cake) => {
      let matchesCategory = false
      if (selectedCategory === 'all') {
        matchesCategory = true
      } else if (selectedCategory === 'custom') {
        matchesCategory =
          cake.category === 'modern-glamour' ||
          cake.cakeType.toLowerCase().includes('sculptural') ||
          cake.cakeType.toLowerCase().includes('drip')
      } else {
        matchesCategory = cake.category === selectedCategory
      }

      const matchesSearch =
        cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.cakeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cake.flavorOptions.some((f) =>
          f.toLowerCase().includes(searchQuery.toLowerCase())
        )

      return matchesCategory && matchesSearch
    })

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePriceUgx - b.basePriceUgx)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.basePriceUgx - a.basePriceUgx)
    } else if (sortBy === 'tiers') {
      list.sort((a, b) => b.tiers - a.tiers)
    }

    return list
  }, [selectedCategory, searchQuery, sortBy])

  // Measure delta between hero constellation anchors and filter bar slots
  const measureDeltas = () => {
    if (typeof window === 'undefined') return

    const newDeltas = {}
    let allFound = true
    filterItems.forEach((item) => {
      if (item.isAll) return
      const heroEl = heroAnchorRefs[item.id]?.current
      const filterEl = filterSlotRefs[item.id]?.current
      if (heroEl && filterEl) {
        const hRect = heroEl.getBoundingClientRect()
        const fRect = filterEl.getBoundingClientRect()
        // Difference between center points
        const dx = hRect.left + hRect.width / 2 - (fRect.left + fRect.width / 2)
        const dy = hRect.top + hRect.height / 2 - (fRect.top + fRect.height / 2)
        newDeltas[item.id] = { x: Math.round(dx), y: Math.round(dy) }
      } else {
        allFound = false
      }
    })
    if (allFound) {
      setDeltas(newDeltas)
      setDeltasReady(true)
    }
  }

  // Initial layout measurement and resize listener
  useEffect(() => {
    const timer = setTimeout(() => {
      measureDeltas()
    }, 120)

    const handleResize = () => {
      if (window.scrollY < 40) {
        measureDeltas()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Initial sequential 0.7s entrance animation on page landing:
  // 1. Birthday cakes (100ms)
  // 2. Wedding cakes (800ms)
  // 3. Kwanjula cakes (1500ms)
  // 4. Graduation cakes (2200ms)
  // 5. Custom cakes (2900ms)
  useEffect(() => {
    const timeouts = filterItems
      .filter((item) => !item.isAll)
      .map((item) =>
        setTimeout(() => {
          setAppearedCircles((prev) => new Set([...prev, item.id]))
        }, item.initialDelay)
      )

    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Scroll listener: Wait until user has scrolled ~3 times (hero scene is 3/4 off viewport)
  // The circles move naturally with the hero until 3/4 threshold, then fly into the sticky filter bar
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY
          setScrollYPos(sy)

          // Detect scroll direction for mobile show/hide filter bar
          const prevY = lastScrollYRef.current
          const diff = sy - prevY
          if (Math.abs(diff) > 6) {
            if (diff > 0) {
              setScrollDirection('down')
            } else {
              setScrollDirection('up')
            }
            lastScrollYRef.current = sy
          }

          const heroEl = heroRef.current
          const heroHeight = heroEl ? heroEl.offsetHeight : 600
          // Trigger when hero scene is 3/4 off the viewport (~450px, ~3 scrolls)
          const triggerThreshold = Math.round(heroHeight * 0.75)
          const resetThreshold = Math.round(heroHeight * 0.65)

          setIsScrolled((prev) => {
            if (!prev && sy >= triggerThreshold) {
              setAppearedCircles(
                new Set(['birthdays', 'weddings', 'traditional', 'graduation', 'custom'])
              )
              return true
            } else if (prev && sy < resetThreshold) {
              setScrollDirection('down')
              return false
            }
            return prev
          })

          // Stop being sticky where the product showcase ends
          const showcaseEl = showcaseRef.current
          const filterBarEl = filterBarRef.current
          if (showcaseEl && filterBarEl) {
            const showcaseRect = showcaseEl.getBoundingClientRect()
            const filterBarHeight = filterBarEl.offsetHeight || 110
            const navbarHeight = 80 // top-20 (80px)
            const remaining = showcaseRect.bottom - (navbarHeight + filterBarHeight)
            setFilterOffsetY(Math.min(0, Math.round(remaining)))
          }

          if (sy < 15) {
            setScrollDirection('down')
            measureDeltas()
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Exhibition Lightbox helpers & navigation
  const quickViewCake = activeModalIndex !== null ? filteredProducts[activeModalIndex] : null

  const openLightbox = (cake) => {
    const idx = filteredProducts.findIndex((c) => c.id === cake.id)
    setActiveModalIndex(idx >= 0 ? idx : 0)
  }

  const closeLightbox = () => {
    setActiveModalIndex(null)
  }

  const nextLightbox = () => {
    if (filteredProducts.length === 0) return
    setActiveModalIndex((prev) => (prev + 1) % filteredProducts.length)
  }

  const prevLightbox = () => {
    if (filteredProducts.length === 0) return
    setActiveModalIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length)
  }

  // Keyboard navigation for Lightbox (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (activeModalIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowRight') {
        nextLightbox()
      } else if (e.key === 'ArrowLeft') {
        prevLightbox()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeModalIndex, filteredProducts.length])

  // Handle clicking a circle filter item
  const handleFilterSelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setActiveModalIndex(null)
    // If clicked while in hero, smoothly scroll down into showcase
    if (!isScrolled) {
      setIsScrolled(true)
      const showcaseEl = document.getElementById('scene-showcase')
      if (showcaseEl) {
        showcaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // Staggered flight delay when scrolling into filter bar:
  // 1st: Birthday cakes (0ms)
  // 2nd: Wedding cakes (180ms)
  // 3rd: Kwanjula cakes (360ms)
  // 4th: Graduation cakes (540ms)
  // 5th: Custom cakes (720ms)
  const getFlightDelay = (id, scrolled) => {
    if (!scrolled) return '0ms'
    switch (id) {
      case 'birthdays':
        return '0ms'
      case 'weddings':
        return '180ms'
      case 'traditional':
        return '360ms'
      case 'graduation':
        return '540ms'
      case 'custom':
        return '720ms'
      default:
        return '0ms'
    }
  }

  // On mobile (< 640px), filter bar disappears on scroll DOWN, and appears on scroll UP.
  const heroHeight = heroRef.current ? heroRef.current.offsetHeight : 600
  const triggerThreshold = Math.round(heroHeight * 0.75)
  const isFilterHiddenOnMobile =
    isScrolled && scrollDirection === 'down' && scrollYPos > triggerThreshold + 40

  return (
    <div className="w-full bg-[#1A1613] text-brand-white font-sans selection:bg-primary-gold selection:text-dark-canvas">
      {/* ===================================================================
          FIXED DYNAMIC FILTER BAR (HOLDS THE 5 CAKE CIRCLES + ALL CREATIONS)
          - Pinned right under navbar (top-20 = 80px)
          - Fixed position takes 0px normal flow height (Hero starts flush at top: 0)
          - When isScrolled === false:
            Completely transparent, pointer-events-none.
            The 5 circles are visually translated into the Hero Constellation
            around the title and follow the hero scroll naturally for the first ~3 scrolls.
          - When isScrolled === true:
            Bar background fades in with dark luxury blur & border.
            Circles smoothly fly into filter bar in exact specified sequence:
            1. Birthday -> 2. Wedding -> 3. Kwanjula -> 4. Graduation -> 5. Custom
            Docked in exact requested order:
            1. All creations, 2. Birthday cakes, 3. Wedding cakes, 4. Kwanjula cakes, 5. Graduation cakes, 6. Custom cakes
          =================================================================== */}
      <div
        ref={filterBarRef}
        style={{
          transform:
            isFilterHiddenOnMobile && typeof window !== 'undefined' && window.innerWidth < 640
              ? 'translate3d(0, -150%, 0)'
              : filterOffsetY < 0
              ? `translate3d(0, ${filterOffsetY}px, 0)`
              : undefined,
        }}
        className={`fixed top-20 left-0 right-0 z-30 w-full overflow-visible transition-all duration-300 ${
          isScrolled
            ? 'bg-[#141210]/95 backdrop-blur-md border-b border-bronze/35 shadow-2xl py-1.5 sm:py-2.5 pointer-events-auto'
            : 'bg-transparent border-transparent pointer-events-none py-2.5'
        } ${
          isFilterHiddenOnMobile
            ? '-translate-y-full opacity-0 pointer-events-none sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-[340px] sm:max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 overflow-visible">
          <div className="flex items-center justify-center gap-1 sm:gap-2.5 flex-wrap sm:flex-nowrap overflow-visible py-0.5 sm:py-1">
            {/* Slot 0: "All Creations" Button (Reveals when scrolled) */}
            <button
              type="button"
              onClick={() => handleFilterSelect('all')}
              className={`shrink-0 flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-[5px] text-[10px] sm:text-xs font-semibold tracking-tight sm:tracking-wider uppercase transition-all duration-500 cursor-pointer ${
                isScrolled
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-75 pointer-events-none'
              } ${
                selectedCategory === 'all'
                  ? 'bg-primary-gold text-dark-canvas shadow-[0_2px_14px_rgba(222,172,75,0.35)]'
                  : 'bg-[#1A1815] text-gray-300 hover:text-white hover:bg-[#221F1B] border border-bronze/30 hover:border-primary-gold/60'
              }`}
            >
              <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-[3px] bg-primary-gold/20 border border-primary-gold flex items-center justify-center text-primary-gold text-[8px] sm:text-[10px]">
                ✦
              </span>
              <span>
                <span className="sm:hidden">All</span>
                <span className="hidden sm:inline">All Creations</span>
              </span>
              <span className="text-[8.5px] sm:text-[10px] opacity-75 font-mono">(12)</span>
            </button>

            {/* Slots 1-5: The 5 Morphing Cake Circles (Birthday, Wedding, Kwanjula, Graduation, Custom) */}
            {filterItems
              .filter((item) => !item.isAll)
              .map((circle) => {
                const isActive = selectedCategory === circle.id
                const hasAppeared = appearedCircles.has(circle.id)
                const delta = deltas[circle.id] || { x: 0, y: 0 }

                // In Hero mode, button follows the hero scroll naturally until 3/4 threshold
                const currentDy = delta.y - scrollYPos

                const transformStyle = !isScrolled
                  ? deltasReady
                    ? `translate3d(${delta.x}px, ${currentDy}px, 0)`
                    : 'none'
                  : 'translate3d(0, 0, 0)'

                // Initial 0.7s appearance opacity, then 100% visible
                const initialOpacity = !isScrolled
                  ? deltasReady && hasAppeared
                    ? 1
                    : 0
                  : 1

                const scaleStyle = !isScrolled
                  ? hasAppeared
                    ? 1
                    : 0.75
                  : 1

                return (
                  <div
                    key={circle.id}
                    ref={filterSlotRefs[circle.id]}
                    className="shrink-0 relative overflow-visible"
                  >
                    <button
                      type="button"
                      onClick={() => handleFilterSelect(circle.id)}
                      style={{
                        transform: transformStyle,
                        opacity: initialOpacity,
                        scale: scaleStyle,
                        transition: isScrolled
                          ? `transform 750ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 500ms ease, scale 500ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease`
                          : `opacity 500ms ease, scale 500ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
                        transitionDelay: getFlightDelay(circle.id, isScrolled),
                      }}
                      className={`cursor-pointer focus:outline-none pointer-events-auto transition-all ${
                        isScrolled
                          ? `flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-[5px] text-[10px] sm:text-xs font-semibold tracking-tight sm:tracking-wider uppercase border ${
                              isActive
                                ? 'bg-primary-gold text-dark-canvas border-primary-gold shadow-[0_2px_14px_rgba(222,172,75,0.35)]'
                                : 'bg-[#1A1815] text-gray-300 hover:text-white hover:bg-[#221F1B] border-bronze/30 hover:border-primary-gold/60'
                            }`
                          : 'flex flex-col items-center bg-transparent border-transparent p-0'
                      }`}
                      aria-label={`Filter by ${circle.label}`}
                    >
                      {/* Cake Image Circle (Scales from hero size down to filter badge) */}
                      <div
                        className={`p-0.5 border-2 transition-all duration-700 ease-out overflow-hidden shadow-xl ${
                          isScrolled
                            ? 'w-4 h-4 sm:w-8 sm:h-8 rounded-[3px] border-primary-gold/60 bg-[#141210]'
                            : 'w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-full border-primary-gold/70 hover:border-primary-gold bg-[#1A1613] hover:scale-105 hover:shadow-[0_0_28px_rgba(222,172,75,0.45)]'
                        }`}
                      >
                        <img
                          src={circle.image}
                          alt={circle.alt}
                          className={`w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                            isScrolled ? 'rounded-[2px]' : 'rounded-full'
                          }`}
                        />
                      </div>

                      {/* Text Label & Badge */}
                      <div
                        className={`transition-all duration-500 ${
                          isScrolled
                            ? 'flex items-center gap-0.5 sm:gap-1'
                            : 'mt-1 px-1.5 sm:px-2.5 py-0.5 rounded-[5px] bg-[#1A1613]/95 border border-primary-gold/40 text-[9px] sm:text-[11px] font-sans font-semibold tracking-tight sm:tracking-wider uppercase text-champagne-gold shadow-md whitespace-nowrap'
                        }`}
                      >
                        {isScrolled ? (
                          <>
                            <span className="sm:hidden">{circle.label.replace(' Cakes', '')}</span>
                            <span className="hidden sm:inline">{circle.label}</span>
                          </>
                        ) : (
                          <span>{circle.label}</span>
                        )}
                        {isScrolled && (
                          <span
                            className={`text-[8.5px] sm:text-[10px] font-mono ${
                              isActive ? 'opacity-85' : 'text-gray-400'
                            }`}
                          >
                            ({circle.count})
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
          </div>

          {/* Row 2: Search Bar & Sort Toolbar (Appears ONLY when creation circles change into filters) */}
          <div
            className={`transition-all duration-500 ease-out overflow-hidden ${
              isScrolled
                ? 'max-h-48 sm:max-h-28 opacity-100 pt-2 pb-0.5 border-t border-bronze/25 mt-2 pointer-events-auto'
                : 'max-h-0 opacity-0 py-0 border-transparent m-0 pointer-events-none'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-80 md:w-96">
                <input
                  type="text"
                  placeholder="Search by occasion, design, flavor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#181512] border border-bronze/40 focus:border-primary-gold rounded-[5px] px-3.5 py-1.5 pl-9 text-xs sm:text-sm text-brand-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors min-h-[36px]"
                />
                <svg
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-primary-gold absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer p-1"
                    aria-label="Clear search query"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Results Count & Sort Dropdown (Hidden on mobile) */}
              <div className="hidden sm:flex sm:w-auto items-center justify-end gap-3 text-xs text-gray-400">
                <span className="text-[11px] font-sans">
                  Showing <strong className="text-champagne-gold font-mono">{filteredProducts.length}</strong> of{' '}
                  {cakeProducts.length} creations
                </span>

                <div className="flex items-center gap-1.5">
                  <label htmlFor="sort-select" className="text-gray-400 font-mono text-[10px] uppercase">
                    Sort:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#181512] border border-bronze/40 text-champagne-gold text-xs rounded-[5px] px-2 py-1 focus:outline-none focus:border-primary-gold cursor-pointer min-h-[30px]"
                  >
                    <option value="featured">Featured Order</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="tiers">Most Tiers</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================
          SCENE 1: CINEMATIC CONSTELLATION HERO
          - Uniform warm background (#1A1613) directly after the navbar (no black strip)
          - All 5 circles are completely visible within the viewport upon landing
          - Circles remain locked in constellation as user scrolls, then fly into
            the filter bar when the hero scene is 3/4 off viewport (~3 scrolls)
          =================================================================== */}
      <section
        ref={heroRef}
        aria-label="Scene 1 — Creations Constellation Hero"
        className="relative w-full h-[calc(100svh-5rem)] min-h-[460px] max-h-[660px] flex items-center justify-center overflow-hidden bg-[#1A1613] border-b border-bronze/20 px-3 sm:px-4"
      >
        {/* Warm Ambient Gold Radial Glow spanning the hero seamlessly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(222,172,75,0.10)_0%,rgba(26,22,19,0.35)_50%,rgba(26,22,19,0.75)_85%)] pointer-events-none"
        />

        {/* Central Constellation Canvas */}
        <div className="relative w-full max-w-4xl h-[400px] sm:h-[450px] md:h-[470px] flex items-center justify-center">
          {/* CENTER: "OUR CREATIONS" TITLE */}
          <div
            className={`z-10 text-center max-w-[280px] sm:max-w-md md:max-w-xl mx-auto px-2 select-none transition-all duration-700 ease-out ${
              isScrolled ? 'opacity-35 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            {/* Atelier Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181512]/90 border border-primary-gold/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] text-champagne-gold mb-2 sm:mb-2.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse" />
              <span>Atelier Portfolio &bull; Kampala</span>
            </div>

            {/* Main Monumental Serif Title */}
            <h1 className="font-serif font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-gold uppercase tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(20,18,16,0.95)]">
              Our Creations
            </h1>

            {/* Delicate Gold Accent Rule */}
            <div aria-hidden="true" className="w-14 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent mx-auto my-2 sm:my-2.5" />

            {/* Editorial Subtitle */}
            <p className="font-sans text-[10px] sm:text-xs text-gray-300/85 font-light tracking-wide max-w-sm mx-auto leading-relaxed">
              Bespoke celebration centerpieces, traditional tiers &amp; sculpted cakes handcrafted from scratch.
            </p>
          </div>

          {/* -------------------------------------------------------------
              HERO CONSTELLATION ANCHOR SLOTS (Invisible Reference Coordinates)
              Fitted so top, middle, and bottom circles are 100% visible on load!
              On mobile (<sm):
              Birthday & Graduation anchors are positioned gracefully above the title (10 & 2 o'clock)
              to guarantee zero overlap with the title and zero side edge overflow!
              ------------------------------------------------------------- */}
          {/* Anchor 1: Wedding Cakes (Top Center) */}
          <div
            ref={heroAnchorRefs.weddings}
            className="absolute top-1 sm:top-2 md:top-3 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 pointer-events-none"
            aria-hidden="true"
          />

          {/* Anchor 2: Birthday Cakes (Mid Left) */}
          <div
            ref={heroAnchorRefs.birthdays}
            className="absolute top-[26%] sm:top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-8 lg:left-12 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 pointer-events-none"
            aria-hidden="true"
          />

          {/* Anchor 3: Graduation Cakes (Mid Right) */}
          <div
            ref={heroAnchorRefs.graduation}
            className="absolute top-[26%] sm:top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 lg:right-12 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 pointer-events-none"
            aria-hidden="true"
          />

          {/* Anchor 4: Kwanjula Cakes (Bottom Left) */}
          <div
            ref={heroAnchorRefs.traditional}
            className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-[20%] sm:left-[26%] -translate-x-1/2 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 pointer-events-none"
            aria-hidden="true"
          />

          {/* Anchor 5: Custom Cakes (Bottom Right) */}
          <div
            ref={heroAnchorRefs.custom}
            className="absolute bottom-1 sm:bottom-2 md:bottom-3 right-[20%] sm:right-[26%] translate-x-1/2 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ===================================================================
          SCENE 2: INTERACTIVE PRODUCT SHOWCASE
          =================================================================== */}
      <section id="scene-showcase" ref={showcaseRef} aria-label="Scene 2 — Product Showcase" className="w-full pt-20 sm:pt-32 scroll-mt-60 sm:scroll-mt-48">
        {/* Product Cards Grid */}
        {/* Product Showcase Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Editorial Section Introduction */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10 pb-4 border-b border-bronze/30">
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-primary-gold font-semibold block mb-1">
                ✦ Exhibition Catalogue &bull; Collection 2026
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-white">
                {selectedCategory === 'all'
                  ? 'The Complete Patisserie Archive'
                  : selectedCategory === 'weddings'
                  ? 'Matrimonial & Grand Reception Tiers'
                  : selectedCategory === 'traditional'
                  ? 'Kwanjula & Cultural Ceremonial Cakes'
                  : selectedCategory === 'birthdays'
                  ? 'Milestone & Celebration Sculptures'
                  : selectedCategory === 'graduation'
                  ? 'Academic Achievement & Crest Creations'
                  : 'Bespoke Custom & Avant-Garde Drip'}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-mono text-xs text-champagne-gold">
                Showing <strong className="font-serif text-primary-gold text-sm font-semibold">{filteredProducts.length}</strong> of {cakeProducts.length} Atelier Works
              </span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 bg-[#181512] border border-bronze/30 rounded-xl max-w-xl mx-auto">
              <span className="text-3xl block mb-3 text-primary-gold">&bull; &#10022; &bull;</span>
              <h3 className="font-serif text-2xl text-primary-gold mb-2">No matching creations found</h3>
              <p className="font-sans text-xs sm:text-sm text-gray-400 mb-6">
                Try adjusting your search criteria or explore our bespoke custom cake service to create an entirely original design.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSearchQuery('')
                  }}
                  className="px-5 py-2.5 bg-primary-gold text-dark-canvas text-xs font-semibold uppercase tracking-wider rounded hover:bg-gold-highlight transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
                <Link
                  to="/custom-cake"
                  className="px-5 py-2.5 border border-primary-gold text-champagne-gold text-xs font-semibold uppercase tracking-wider rounded hover:bg-primary-gold/10 transition-colors"
                >
                  Request Custom Cake
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {filteredProducts.map((cake, idx) => {
                const isLeadFeature = idx === 0

                if (isLeadFeature) {
                  return (
                    <article
                      key={cake.id}
                      data-aos="fade-up"
                      className="col-span-1 md:col-span-2 lg:col-span-3 group relative bg-[#181512] border border-bronze/40 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-[0_12px_45px_rgba(222,172,75,0.18)] flex flex-col lg:flex-row mb-2 sm:mb-4"
                    >
                      {/* Left Media (56% on lg) */}
                      <div
                        onClick={() => openLightbox(cake)}
                        className="relative w-full lg:w-[56%] aspect-4/3 sm:aspect-16/10 lg:aspect-auto overflow-hidden bg-[#141210] cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openLightbox(cake)
                          }
                        }}
                        aria-label={`Open exhibition lightbox for ${cake.name}`}
                      >
                        <img
                          src={cake.image}
                          alt={cake.alt}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-75 pointer-events-none"
                        />
                        {/* Floating Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1 rounded bg-[#141210]/90 backdrop-blur-sm border border-primary-gold/50 text-[10px] font-mono uppercase tracking-[0.2em] text-champagne-gold font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse" />
                            Featured Masterpiece
                          </span>
                          <span className="px-2.5 py-1 rounded bg-[#141210]/90 backdrop-blur-sm border border-white/20 text-[11px] font-mono text-gray-200">
                            № 01
                          </span>
                        </div>
                        {/* Center Hover Pill */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/30">
                          <span className="px-4 py-2 rounded-full bg-[#141210]/95 border border-primary-gold text-champagne-gold font-sans text-xs font-semibold tracking-wider uppercase shadow-2xl flex items-center gap-2">
                            <span>Explore Creation</span>
                            <span>✦</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Editorial Story & Specs */}
                      <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 font-sans mb-2.5">
                            <span className="text-primary-gold font-mono uppercase tracking-[0.16em] text-[11px] font-semibold">
                              {cake.categoryLabel} &bull; {cake.cakeType}
                            </span>
                            <span className="text-gray-300 font-mono text-[11px] bg-[#1F1C18] px-2.5 py-0.5 rounded border border-bronze/25">
                              {cake.tiersDisplay} &bull; {cake.servings}
                            </span>
                          </div>

                          <h3 className="font-serif font-semibold text-2xl sm:text-3xl text-brand-white group-hover:text-primary-gold transition-colors leading-tight">
                            <Link to={`/creations/${cake.slug}`} className="focus:outline-none focus-visible:underline">
                              {cake.name}
                            </Link>
                          </h3>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-bronze/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                          <div>
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-400">
                              Starting Estimate
                            </span>
                            <span className="block font-serif text-xl sm:text-2xl text-primary-gold font-semibold">
                              {cake.priceDisplay}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => openLightbox(cake)}
                              className="px-4 py-2.5 rounded bg-[#1F1C18] hover:bg-[#28241F] text-champagne-gold border border-primary-gold/40 hover:border-primary-gold text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                            >
                              Quick Preview
                            </button>
                            <Link
                              to={`/creations/${cake.slug}`}
                              className="px-5 py-2.5 rounded bg-primary-gold hover:bg-gold-highlight text-dark-canvas text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_2px_14px_rgba(222,172,75,0.25)]"
                            >
                              <span>View Details</span>
                              <span aria-hidden="true" className="ml-1.5">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                }

                // Standard Editorial Portrait Cards
                return (
                  <div key={cake.id} className="contents">
                    {/* Atelier Storytelling Interlude after Item 2 if in All collection */}
                    {idx === 2 && selectedCategory === 'all' && (
                      <div
                        data-aos="fade-up"
                        className="col-span-1 md:col-span-2 lg:col-span-3 my-4 sm:my-6 py-8 sm:py-12 px-6 sm:px-12 bg-gradient-to-r from-[#181512] via-[#221C17] to-[#181512] border-y border-primary-gold/30 rounded-lg relative overflow-hidden shadow-2xl text-center"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute top-0 right-1/4 w-80 h-80 bg-primary-gold/5 blur-[100px] rounded-full pointer-events-none"
                        />
                        <div className="max-w-3xl mx-auto relative z-10">
                          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-primary-gold font-semibold block mb-3">
                            ✦ THE ATELIER PHILOSOPHY ✦
                          </span>
                          <blockquote className="font-serif italic text-lg sm:text-2xl md:text-3xl text-brand-white leading-relaxed mb-4">
                            &ldquo;A celebration cake is not merely confectionery; it is an ephemeral sculpture, the crowning centerpiece of life&rsquo;s most treasured memories.&rdquo;
                          </blockquote>
                          <div className="flex items-center justify-center gap-3 text-xs text-champagne-gold font-sans uppercase tracking-widest">
                            <span>Zuena K.</span>
                            <span className="w-1 h-1 rounded-full bg-primary-gold" />
                            <span className="text-gray-400">Master Patissier &amp; Creative Director</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <article
                      data-aos="fade-up"
                      data-aos-delay={`${(idx % 3) * 100}`}
                      className="group relative flex flex-col bg-[#181512] border border-bronze/30 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_10px_35px_rgba(20,18,16,0.95)]"
                    >
                      {/* Visual Media with Zoom & Badges - Click to open Quick Preview */}
                      <div
                        onClick={() => openLightbox(cake)}
                        className="relative w-full aspect-4/5 overflow-hidden bg-[#141210] cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openLightbox(cake)
                          }
                        }}
                        aria-label={`View quick preview of ${cake.name}`}
                      >
                        <img
                          src={cake.image}
                          alt={cake.alt}
                          loading="lazy"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-80 pointer-events-none"
                        />
                        {/* Top Floating Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded bg-[#141210]/85 backdrop-blur-xs border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.16em] text-champagne-gold font-semibold">
                            {cake.categoryLabel}
                          </span>
                          <span className="px-2 py-1 rounded bg-[#141210]/85 backdrop-blur-xs border border-white/20 text-[10px] font-mono text-gray-300">
                            № {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        {/* Hover Quick Preview Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/30">
                          <span className="px-3.5 py-1.5 rounded-full bg-[#141210]/95 border border-primary-gold/80 text-champagne-gold font-sans text-[11px] font-semibold tracking-wider uppercase shadow-2xl flex items-center gap-1.5">
                            <span>Quick Preview</span>
                            <span>✦</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Content & Narrative */}
                      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-gray-400 font-sans mb-1.5 sm:mb-2">
                            <span className="text-primary-gold font-medium">{cake.cakeType}</span>
                            <span>Serves: {cake.servings}</span>
                          </div>

                          <h3 className="font-serif font-semibold text-lg sm:text-xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug">
                            <Link to={`/creations/${cake.slug}`} className="focus:outline-none focus-visible:underline">
                              {cake.name}
                            </Link>
                          </h3>
                        </div>

                        {/* Price & Detailed Link Footer */}
                        <div className="pt-3 sm:pt-4 border-t border-bronze/25 flex items-center justify-between gap-2 sm:gap-3 mt-4">
                          <div>
                            <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-gray-400">
                              Starting Estimate
                            </span>
                            <span className="block font-serif text-base sm:text-lg text-primary-gold font-semibold">
                              {cake.priceDisplay}
                            </span>
                          </div>

                          <Link
                            to={`/creations/${cake.slug}`}
                            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded bg-primary-gold/15 hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/40 hover:border-primary-gold text-xs font-semibold tracking-wider uppercase transition-all duration-200 min-h-[38px] sm:min-h-[40px]"
                          >
                            <span>View Details</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </section>

      {/* ===================================================================
          SCENE 3: HIGH-QUALITY ASYMMETRICAL CALL TO ACTION (CTA)
          =================================================================== */}
      <section
        aria-label="Scene 3 — Atelier Bespoke Call to Action"
        className="relative w-full bg-[#181512] text-brand-white border-t border-bronze/30 py-20 sm:py-24 lg:py-32 overflow-hidden"
      >
        {/* Ambient Radial Lighting */}
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 w-96 h-96 bg-primary-gold/5 blur-[120px] rounded-full pointer-events-none"
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Asymmetrical Layered Photography */}
            <div data-aos="fade-right" className="lg:col-span-6 relative mb-12 sm:mb-16 lg:mb-0">
              {/* Primary Anchor Photograph */}
              <div className="relative w-[82%] sm:w-[78%] aspect-4/5 rounded-lg overflow-hidden border border-bronze/40 shadow-2xl bg-[#141210]">
                <img
                  src={crystalWeddingImg}
                  alt="Four-tier ivory architectural celebration cake with crystal accents and handcrafted magnolias"
                  className="w-full h-full object-cover object-top block"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-transparent pointer-events-none"
                />
              </div>

              {/* Overlapping Secondary Photograph */}
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="absolute -bottom-8 sm:-bottom-12 right-0 w-[62%] sm:w-[58%] aspect-4/3 rounded-lg overflow-hidden border-4 border-[#181512] shadow-2xl z-20 bg-[#141210]"
              >
                <img
                  src={receptionCanopyImg}
                  alt="Opulent candlelit reception hall with drapery canopy and floral table settings"
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Small Detail Study */}
              <div
                data-aos="fade-right"
                data-aos-delay="250"
                className="hidden sm:block absolute top-10 -left-6 w-28 h-28 rounded-full overflow-hidden border-2 border-primary-gold/60 shadow-xl z-20 bg-[#141210]"
              >
                <img
                  src={goldTableSettingImg}
                  alt="Gold table chargers and linen napkin details"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quality Stamp Pill */}
              <div className="absolute -top-4 right-8 z-30 px-3.5 py-1.5 rounded-full bg-[#141210]/95 backdrop-blur-md border border-primary-gold/50 shadow-xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne-gold font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-gold animate-pulse" />
                  White-Glove Venue Delivery
                </span>
              </div>
            </div>

            {/* Right: Editorial Narrative & Action Buttons */}
            <div data-aos="fade-left" className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold">
                  Bespoke Patisserie &bull; Kampala Atelier
                </span>
              </div>

              <h2 className="font-serif font-normal text-2xl sm:text-4xl lg:text-5xl text-brand-white leading-[1.14] tracking-tight mb-4">
                Something Special Starts <span className="text-primary-gold italic">With an Idea.</span>
              </h2>

              <div aria-hidden="true" className="w-14 h-[1px] bg-primary-gold/70 my-2" />

              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-normal mt-4 mb-6">
                Whether you envision a soaring five-tier matrimonial centerpiece, a culturally steeped Kwanjula ceremonial creation, or an avant-garde sculpted milestone cake, our team translates your vision into an unforgettable celebration.
              </p>

              {/* 3-Step Bespoke Journey Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-5 border-y border-bronze/30 mb-8">
                <div>
                  <span className="block font-serif text-sm text-champagne-gold font-semibold">
                    1. Consultation &amp; Tasting
                  </span>
                  <span className="block font-sans text-xs text-gray-400 mt-1">
                    Private studio tasting &amp; custom flavour design in Kampala
                  </span>
                </div>
                <div className="sm:border-l border-bronze/25 sm:pl-3">
                  <span className="block font-serif text-sm text-champagne-gold font-semibold">
                    2. Bespoke Sketch
                  </span>
                  <span className="block font-sans text-xs text-gray-400 mt-1">
                    Architectural tier scale, sugar florals &amp; 24K gold foil
                  </span>
                </div>
                <div className="sm:border-l border-bronze/25 sm:pl-3">
                  <span className="block font-serif text-sm text-champagne-gold font-semibold">
                    3. White-Glove Staging
                  </span>
                  <span className="block font-sans text-xs text-gray-400 mt-1">
                    Climate-controlled delivery &amp; banquet pedestal setup
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                  to="/custom-cake"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase bg-primary-gold text-dark-canvas hover:bg-gold-highlight hover:shadow-[0_4px_24px_rgba(222,172,75,0.35)] transition-all min-h-[46px] text-center"
                >
                  <span>Request Custom Cake Design</span>
                  <span aria-hidden="true" className="ml-2">&rarr;</span>
                </Link>

                <Link
                  to="/decorations/enquire"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase border border-primary-gold/60 text-champagne-gold hover:border-primary-gold hover:text-white hover:bg-primary-gold/10 transition-all min-h-[46px] text-center"
                >
                  <span>Enquire About Matching Décor</span>
                </Link>
              </div>

              <p className="font-sans text-xs text-gray-400 mt-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-primary-gold font-serif text-sm hidden sm:inline">&diams;</span>
                <span>Personal consultation &amp; tasting by appointment: <strong className="text-gray-200">+256 705 100 010</strong></span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          EXHIBITION LIGHTBOX / PREVIEW MODAL
          =================================================================== */}
      {quickViewCake && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Desktop Navigation Arrow: Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevLightbox()
            }}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#181512]/90 hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/50 items-center justify-center text-2xl transition-all shadow-2xl cursor-pointer"
            aria-label="Previous cake"
          >
            &#8249;
          </button>

          {/* Desktop Navigation Arrow: Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextLightbox()
            }}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#181512]/90 hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/50 items-center justify-center text-2xl transition-all shadow-2xl cursor-pointer"
            aria-label="Next cake"
          >
            &#8250;
          </button>

          <div
            className="relative w-full max-w-4xl bg-[#181512] border border-primary-gold/60 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col md:flex-row max-h-[92vh] sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={closeLightbox}
                className="w-9 h-9 rounded-full bg-[#141210]/90 text-gray-300 hover:text-white hover:bg-primary-gold/20 border border-white/20 flex items-center justify-center text-xl focus:outline-none focus:ring-2 focus:ring-primary-gold cursor-pointer shadow-lg transition-colors"
                aria-label="Close exhibition modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto md:min-h-[460px] shrink-0 relative bg-[#141210] overflow-hidden">
              <img
                src={quickViewCake.image}
                alt={quickViewCake.alt}
                className="w-full h-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#181512] via-transparent to-transparent opacity-60 pointer-events-none"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-[#141210]/90 border border-primary-gold/40 text-[10px] font-mono uppercase text-champagne-gold">
                  {quickViewCake.tiersDisplay} &bull; {quickViewCake.servings}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#141210]/90 border border-white/20 text-[10px] font-mono text-gray-300">
                  № {String((activeModalIndex ?? 0) + 1).padStart(2, '0')} / {String(filteredProducts.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Modal Content Panel */}
            <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-primary-gold font-semibold mb-2">
                  <span>{quickViewCake.categoryLabel}</span>
                  <span className="text-gray-400">{quickViewCake.cakeType}</span>
                </div>

                <h3 id="lightbox-title" className="font-serif font-semibold text-xl sm:text-2xl text-brand-white leading-tight mb-2">
                  {quickViewCake.name}
                </h3>

                <div className="text-primary-gold font-serif text-lg sm:text-xl font-semibold mb-3">
                  {quickViewCake.priceDisplay}{' '}
                  <span className="text-xs font-sans text-gray-400 font-normal">(Starting Estimate)</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {quickViewCake.description}
                </p>

                <h4 className="font-serif text-xs uppercase tracking-wider text-champagne-gold font-semibold mb-2">
                  Signature Craft Highlights:
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-300 mb-4">
                  {quickViewCake.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-gold font-bold">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {quickViewCake.flavorOptions && (
                  <div className="mb-4 pt-3 border-t border-bronze/25">
                    <h5 className="font-serif text-[11px] uppercase tracking-wider text-champagne-gold font-semibold mb-1.5">
                      Recommended Flavour Pairings:
                    </h5>
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

              {/* Action Buttons & Prev/Next for mobile */}
              <div className="pt-4 border-t border-bronze/30 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <Link
                    to={`/creations/${quickViewCake.slug}`}
                    onClick={closeLightbox}
                    className="flex-1 py-3 px-4 rounded bg-primary-gold text-dark-canvas text-xs font-semibold uppercase tracking-wider text-center hover:bg-gold-highlight transition-all shadow-[0_2px_14px_rgba(222,172,75,0.25)]"
                  >
                    View Full Product Page &rarr;
                  </Link>
                  <Link
                    to="/custom-cake"
                    onClick={closeLightbox}
                    className="py-3 px-4 rounded border border-primary-gold/60 text-champagne-gold hover:text-white text-xs font-semibold uppercase tracking-wider text-center hover:bg-primary-gold/10 transition-colors"
                  >
                    Bespoke Inquiry
                  </Link>
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex md:hidden items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={prevLightbox}
                    className="text-xs font-mono text-champagne-gold hover:text-white py-1 px-3 rounded border border-bronze/40 flex items-center gap-1"
                  >
                    &#8249; Previous
                  </button>
                  <span className="text-[10px] font-mono text-gray-400">
                    {activeModalIndex + 1} of {filteredProducts.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextLightbox}
                    className="text-xs font-mono text-champagne-gold hover:text-white py-1 px-3 rounded border border-bronze/40 flex items-center gap-1"
                  >
                    Next &#8250;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
