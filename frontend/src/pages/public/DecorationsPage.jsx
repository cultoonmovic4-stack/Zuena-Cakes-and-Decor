import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import decoration0Img from '../../assets/images/decoration0.jpg'
import decoration1Img from '../../assets/images/decoration1.jpg'
import decoration2Img from '../../assets/images/decoration2.jpg'
import decoration4Img from '../../assets/images/decoration4.jpg'
import decoration5Img from '../../assets/images/decoration5.jpg'
import decoration6Img from '../../assets/images/decoration6.jpg'
import decoration7Img from '../../assets/images/decoration7.jpg'
import decoration8Img from '../../assets/images/decoration8.jpg'
import decoration9Img from '../../assets/images/decoration9.jpg'
import decoration110Img from '../../assets/images/decoration110.jpg'

const portfolioStudies = [
  // Bridal & Reception Halls
  {
    id: 'decoration-5',
    chapter: 'bridal',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Bridal Stage',
    title: 'Forest Velvet & Fluted Arch Stage',
    venueType: 'Indoor Ballroom or Reception Hall',
    summary:
      'Blush-cream fluted arches draped in soft ivory voile against deep forest-green velvet with white hydrangea meadows.',
    image: decoration5Img,
    alt: 'Botanical emerald and blush-cream multi-arch stage against deep forest-green velvet drapery with curved ivory sofa',
  },
  {
    id: 'decoration-8',
    chapter: 'bridal',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Waterfront Ceremony',
    title: 'Lakeside Double-Arch Floral Altar',
    venueType: 'Lakeside Pavilion',
    summary:
      'Sunlit open-air pavilion dressed in billowing white voile framing a concentric floral ring altar overlooking the water.',
    image: decoration8Img,
    alt: 'Lakeside wedding ceremony pavilion with sheer white drapery and double-arch white floral altar',
  },
  {
    id: 'decoration-2',
    chapter: 'bridal',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Sweetheart Stage',
    title: 'Sculptural Wave-Panel Bridal Dais',
    venueType: 'Evening Reception Hall',
    summary:
      'Layered architectural wave panels with soft ambient backlighting, crystal chandeliers, and a mirrored sweetheart table.',
    image: decoration2Img,
    alt: 'Sculptural wave-paneled bridal stage with soft blue backlighting and mirrored sweetheart table',
  },

  // Kwanjula & Cultural Ceremonies
  {
    id: 'decoration-110',
    chapter: 'kwanjula',
    occasionParam: 'Kwanjula / Introduction',
    categoryTag: 'Cultural Craft',
    title: 'Woven Raffia & Terracotta Stage',
    venueType: 'Traditional Pavilion or Marquee',
    summary:
      'Handwoven Ugandan raffia baskets across warm terracotta drapery with carved woodwork, clay pottery, and amber florals.',
    image: decoration110Img,
    alt: 'Cultural stage backdrop styled with woven raffia baskets, terracotta drapery, warm neon script, and Kitenge fabric',
  },
  {
    id: 'decoration-4',
    chapter: 'kwanjula',
    occasionParam: 'Kwanjula / Introduction',
    categoryTag: 'Stage + Cake Pairing',
    title: 'Blush & Burgundy Arch Stage',
    venueType: 'Garden or Homestead Lawn',
    summary:
      'Recessed blush arches against burgundy pleated drapery paired with a colour-matched two-tier cake on a gold pedestal.',
    image: decoration4Img,
    alt: 'Outdoor Kukyala and Kwanjula multi-arch stage in blush and burgundy with coordinated two-tier cake on a gold pedestal',
  },
  {
    id: 'decoration-6',
    chapter: 'kwanjula',
    occasionParam: 'Kwanjula / Introduction',
    categoryTag: 'Garden Introduction',
    title: 'Emerald Ombre & Gold Arch Stage',
    venueType: 'Outdoor Marquee',
    summary:
      'Emerald-to-champagne ombre backdrop framed by gilded arches, vibrant sunflower meadows, and custom couple signage.',
    image: decoration6Img,
    alt: 'Garden Introduction ceremony stage with emerald ombre backdrop, gold arches, and sunflowers',
  },

  // Outdoor & Bespoke Installations
  {
    id: 'decoration-9',
    chapter: 'bespoke',
    occasionParam: 'Milestone Celebration',
    categoryTag: 'Welcome Monolith',
    title: 'Storybook Pillar Welcome Walkway',
    venueType: 'Venue Entrance or Garden Lawn',
    summary:
      'Seven architectural white pillars personalized with couple portraits, love-story chapters, and peach rose meadows.',
    image: decoration9Img,
    alt: 'Seven white architectural pillars spelling Welcome To Our Wedding with couple photos and peach roses',
  },
  {
    id: 'decoration-1',
    chapter: 'bespoke',
    occasionParam: 'Milestone Celebration',
    categoryTag: 'Botanical Lounge',
    title: 'Emerald Canopy & Woven Basket Pavilion',
    venueType: 'Garden Tent',
    summary:
      'Emerald and ivory ceiling drapery accented with suspended woven basket planters and a curved boucle lounge sofa.',
    image: decoration1Img,
    alt: 'Emerald green and white draped garden pavilion with hanging woven basket planters and curved white lounge sofa',
  },
  {
    id: 'decoration-0',
    chapter: 'bespoke',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Architectural Lawn',
    title: 'Marble & Gold Frame Garden Stage',
    venueType: 'Open-Air Estate Lawn',
    summary:
      'Angled white and marble architectural panels paired with open geometric gold frames and teak lounge seating.',
    image: decoration0Img,
    alt: 'Outdoor architectural wedding stage with angled white and marble panels, gold frames, and teak lounge seating',
  },

  // Hero Flagship Reference (Included in Lightbox sequence)
  {
    id: 'decoration-7',
    chapter: 'bridal',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Bridal Ballroom',
    title: 'Wisteria Cloud & Chandelier Hall',
    venueType: 'Grand Indoor Ballroom',
    summary:
      'An overhead canopy of pastel wisteria traversed by a glowing serpentine chandelier and classical arched stage paneling.',
    image: decoration7Img,
    alt: 'Grand reception hall with suspended pastel wisteria ceiling installation and serpentine LED chandelier',
  },
]

const bridalChapter = portfolioStudies.filter((s) => s.chapter === 'bridal')
const kwanjulaChapter = portfolioStudies.filter((s) => s.chapter === 'kwanjula')
const bespokeChapter = portfolioStudies.filter((s) => s.chapter === 'bespoke')

export default function DecorationsPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)

  const openLightbox = useCallback((studyId) => {
    const idx = portfolioStudies.findIndex((item) => item.id === studyId)
    if (idx !== -1) {
      setIsZoomed(false)
      setLightboxIndex(idx)
    }
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setIsZoomed(false)
  }, [])

  const showPrevImage = useCallback(() => {
    setIsZoomed(false)
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + portfolioStudies.length) % portfolioStudies.length
    )
  }, [])

  const showNextImage = useCallback(() => {
    setIsZoomed(false)
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % portfolioStudies.length
    )
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') showPrevImage()
      else if (e.key === 'ArrowRight') showNextImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, showPrevImage, showNextImage])

  const activeLightboxStudy =
    lightboxIndex !== null ? portfolioStudies[lightboxIndex] : null

  return (
    <div className="w-full bg-[#141210] text-brand-white font-sans selection:bg-primary-gold selection:text-dark-canvas overflow-x-hidden">
      {/* ===================================================================
          1. IMMERSIVE OPENING SCENE (HERO)
          Matches CreationsPage.jsx Concept 1 — Structured Luxury Exhibition:
          - Left: Pre-title, monumental two-line title, short italic subtitle, 1 pill button
          - Right: Single flagship decoration photograph in a clean frame
          =================================================================== */}
      <section
        aria-label="Event Styling Opening"
        className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center bg-[#141210] border-b border-bronze/25 px-4 sm:px-6 lg:px-12 py-12 lg:py-20 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-radial from-transparent via-[#141210]/60 to-[#141210] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary-gold font-semibold">
                The Scenic Portfolio
              </span>
              <span className="w-12 h-[1px] bg-primary-gold/60" />
            </div>

            <h1 className="font-serif font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F7EBD9] leading-[1.02] tracking-tight mb-4 sm:mb-6">
              Event <br />
              <span className="italic text-primary-gold font-normal">Decorations</span>
            </h1>

            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-gray-300/90 leading-relaxed max-w-lg mb-8 sm:mb-10 font-light">
              Atmospheres thoughtfully composed for meaningful celebrations.
            </p>

            <div>
              <a
                href="#styling-chapters"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('styling-chapters')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-primary-gold/70 text-champagne-gold hover:text-[#141210] hover:bg-primary-gold text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Explore Our Lookbook</span>
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Single Flagship Stage & Ballroom Photograph */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div
              onClick={() => openLightbox('decoration-7')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox('decoration-7')
                }
              }}
              aria-label="Inspect Wisteria Cloud & Chandelier Hall"
              className="relative w-full max-w-md lg:max-w-none aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 rounded-lg overflow-hidden shadow-2xl border border-bronze/35 bg-[#181512] cursor-pointer group"
            >
              <img
                src={decoration7Img}
                alt="Grand reception hall with suspended pastel wisteria ceiling installation and serpentine LED chandelier"
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141210]/45 via-transparent to-transparent pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. MAIN EXHIBITION BODY: THE 3 STYLING CHAPTERS + BESPOKE SPLIT CTA
          Matches CreationsPage.jsx chapter structure:
          - Chapter 1: Bridal & Reception Halls
          - Chapter 2: Kwanjula & Cultural Ceremonies
          - Chapter 3: Outdoor & Bespoke Installations
          - Chapter 4: Bespoke Styling Commissions (Editorial Split without photos)
          =================================================================== */}
      <main id="styling-chapters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="space-y-16 lg:space-y-24">
          {/* ---------------------------------------------------------------
              CHAPTER 1: BRIDAL & RECEPTION HALLS
              - Left (3 cols): Editorial Header & Single Consultation Pill
              - Center (5 cols): Featured Bridal Stage
              - Right (4 cols): 2 Supporting Setups Stacked
              --------------------------------------------------------------- */}
          <section id="chapter-bridal" aria-label="Bridal and Reception Halls Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Bridal Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Bridal &amp; <br />
                  <span className="italic text-primary-gold">Reception Halls</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Architectural stages, ceiling drapery, and candlelit tablescapes.
                </p>
                <div className="mb-5">
                  <Link
                    to="/decorations/enquire?occasion=Wedding%20Reception"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
                  >
                    <span>Enquire Bridal</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {/* Center Column: Featured Setup */}
              <div className="lg:col-span-5">
                <div
                  onClick={() => openLightbox(bridalChapter[0].id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightbox(bridalChapter[0].id)
                    }
                  }}
                  aria-label={`Preview ${bridalChapter[0].title}`}
                  className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl cursor-pointer"
                >
                  <div className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#141210]">
                    <img
                      src={bridalChapter[0].image}
                      alt={bridalChapter[0].alt}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>{bridalChapter[0].categoryTag}</span>
                      <span className="font-mono">{bridalChapter[0].venueType}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug">
                      {bridalChapter[0].title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column: 2 Supporting Bridal Works Stacked */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {bridalChapter.slice(1, 3).map((study) => (
                  <div
                    key={study.id}
                    onClick={() => openLightbox(study.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openLightbox(study.id)
                      }
                    }}
                    aria-label={`Preview ${study.title}`}
                    className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    <div className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210]">
                      <img
                        src={study.image}
                        alt={study.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-primary-gold mb-1">
                        {study.categoryTag}
                      </span>
                      <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                        {study.title}
                      </h4>
                      <span className="block text-[11px] text-gray-400 font-sans">
                        {study.venueType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 2: KWANJULA & CULTURAL CEREMONIES
              Inverted Asymmetric Composition (Matches CreationsPage Chapter 2):
              - Left (5 cols): Featured Kwanjula Stage
              - Center (3 cols): Editorial Header
              - Right (4 cols): 2 Supporting Cultural Setups Stacked
              --------------------------------------------------------------- */}
          <section id="chapter-kwanjula" aria-label="Kwanjula and Cultural Ceremonies Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Prominent Featured Kwanjula Stage */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div
                  onClick={() => openLightbox(kwanjulaChapter[0].id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightbox(kwanjulaChapter[0].id)
                    }
                  }}
                  aria-label={`Preview ${kwanjulaChapter[0].title}`}
                  className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl cursor-pointer"
                >
                  <div className="relative w-full aspect-4/5 overflow-hidden bg-[#141210]">
                    <img
                      src={kwanjulaChapter[0].image}
                      alt={kwanjulaChapter[0].alt}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>{kwanjulaChapter[0].categoryTag}</span>
                      <span className="font-mono">{kwanjulaChapter[0].venueType}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug">
                      {kwanjulaChapter[0].title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Center Column: Editorial Introduction */}
              <div className="lg:col-span-3 flex flex-col justify-center order-1 lg:order-2">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Kwanjula Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Kwanjula <br />
                  <span className="italic text-primary-gold">&amp; Cultural</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Regal ceremonial stages honoring Ugandan heritage and paired cake styling.
                </p>
                <div className="mb-5">
                  <Link
                    to="/decorations/enquire?occasion=Kwanjula%20%2F%20Introduction"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
                  >
                    <span>Enquire Kwanjula</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {/* Right Column: 2 Supporting Kwanjula Works Stacked */}
              <div className="lg:col-span-4 flex flex-col gap-6 order-3">
                {kwanjulaChapter.slice(1, 3).map((study) => (
                  <div
                    key={study.id}
                    onClick={() => openLightbox(study.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openLightbox(study.id)
                      }
                    }}
                    aria-label={`Preview ${study.title}`}
                    className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    <div className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210]">
                      <img
                        src={study.image}
                        alt={study.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-primary-gold mb-1">
                        {study.categoryTag}
                      </span>
                      <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                        {study.title}
                      </h4>
                      <span className="block text-[11px] text-gray-400 font-sans">
                        {study.venueType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 3: OUTDOOR & BESPOKE INSTALLATIONS
              - Left (3 cols): Editorial Header
              - Center (5 cols): Featured Welcome Monolith Installation
              - Right (4 cols): 2 Supporting Outdoor Pavilions Stacked
              --------------------------------------------------------------- */}
          <section id="chapter-bespoke" aria-label="Outdoor and Bespoke Installations Chapter" className="scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-3 flex flex-col justify-center">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-primary-gold font-semibold block mb-2">
                  Outdoor Collection &mdash;
                </span>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F7EBD9] leading-[1.08] mb-3">
                  Outdoor &amp; <br />
                  <span className="italic text-primary-gold">Installations</span>
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-gray-300/85 leading-relaxed mb-5 font-light">
                  Welcome monolith walkways, garden lounges, and open-air pavilions.
                </p>
                <div className="mb-5">
                  <Link
                    to="/decorations/enquire?occasion=Milestone%20Celebration"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-gold/70 bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
                  >
                    <span>Enquire Outdoor</span>
                    <span aria-hidden="true" className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
                <div className="w-12 h-[1px] bg-primary-gold/40" />
              </div>

              {/* Center Column */}
              <div className="lg:col-span-5">
                <div
                  onClick={() => openLightbox(bespokeChapter[0].id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightbox(bespokeChapter[0].id)
                    }
                  }}
                  aria-label={`Preview ${bespokeChapter[0].title}`}
                  className="group relative bg-[#181512] border border-bronze/35 hover:border-primary-gold/70 rounded-lg overflow-hidden transition-all duration-300 shadow-2xl cursor-pointer"
                >
                  <div className="relative w-full aspect-4/3 sm:aspect-16/11 overflow-hidden bg-[#141210]">
                    <img
                      src={bespokeChapter[0].image}
                      alt={bespokeChapter[0].alt}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>{bespokeChapter[0].categoryTag}</span>
                      <span className="font-mono">{bespokeChapter[0].venueType}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors leading-snug">
                      {bespokeChapter[0].title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {bespokeChapter.slice(1, 3).map((study) => (
                  <div
                    key={study.id}
                    onClick={() => openLightbox(study.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openLightbox(study.id)
                      }
                    }}
                    aria-label={`Preview ${study.title}`}
                    className="group flex flex-col sm:flex-row lg:flex-row items-center gap-4 p-3.5 bg-[#181512] border border-bronze/30 hover:border-primary-gold/60 rounded-lg transition-all shadow-md cursor-pointer"
                  >
                    <div className="relative w-full sm:w-32 lg:w-36 aspect-square rounded overflow-hidden shrink-0 bg-[#141210]">
                      <img
                        src={study.image}
                        alt={study.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-primary-gold mb-1">
                        {study.categoryTag}
                      </span>
                      <h4 className="font-serif font-semibold text-sm sm:text-base text-brand-white group-hover:text-primary-gold transition-colors leading-snug mb-1">
                        {study.title}
                      </h4>
                      <span className="block text-[11px] text-gray-400 font-sans">
                        {study.venueType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------
              CHAPTER 4: BESPOKE STYLING COMMISSIONS
              Exact Editorial Split Composition from CreationsPage.jsx Chapter 5
              (Text-led editorial CTA with vertical gold rule — zero extra photos)
              --------------------------------------------------------------- */}
          <section
            id="chapter-bespoke-consultation"
            aria-label="Bespoke Styling Consultation"
            className="scroll-mt-24 py-12 lg:py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
              {/* Left Zone — Typographic Identity */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-primary-gold font-semibold">
                    Bespoke Commissions
                  </span>
                  <span aria-hidden="true" className="w-12 sm:w-16 h-[1px] bg-primary-gold/40" />
                </div>

                <h2 className="font-serif font-normal text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
                  <span className="block text-[#F7EBD9]">Custom</span>
                  <span className="block italic text-primary-gold mt-1 sm:mt-2">Styling</span>
                </h2>

                <div aria-hidden="true" className="flex items-center gap-3 mt-6 sm:mt-8 max-w-xs">
                  <span className="flex-1 h-[1px] bg-primary-gold/35" />
                  <span className="text-primary-gold text-xs leading-none">✦</span>
                  <span className="flex-1 h-[1px] bg-primary-gold/35" />
                </div>
              </div>

              {/* Vertical Rule Divider — Desktop */}
              <div
                aria-hidden="true"
                className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center self-stretch py-4 px-4"
              >
                <div className="w-[1px] flex-1 bg-primary-gold/30" />
                <span className="my-4 text-primary-gold text-xs leading-none">✦</span>
                <div className="w-[1px] flex-1 bg-primary-gold/30" />
              </div>

              {/* Mobile Separator */}
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
                  Every venue is unique, and we love styling spaces that reflect your personal story.
                </p>

                <p className="font-sans text-xs sm:text-sm lg:text-base text-gray-300/85 leading-relaxed max-w-xl mb-8 font-light">
                  Share your event date, venue location, and preferred colour palette, and our styling team will review calendar availability and prepare a tailored proposal for your celebration.
                </p>

                <div>
                  <Link
                    to="/decorations/enquire"
                    className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-primary-gold text-dark-canvas hover:bg-gold-highlight text-xs sm:text-sm font-sans font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                  >
                    <span>Request a Consultation</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ===================================================================
          3. FULL-SCREEN LIGHTBOX VIEWER
          =================================================================== */}
      {activeLightboxStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxStudy.title}
          className="fixed inset-0 z-[70] bg-black/95 flex flex-col justify-between select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="w-full px-4 sm:px-8 py-4 flex items-center justify-between gap-4 bg-[#100e0c] z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs text-primary-gold shrink-0">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(portfolioStudies.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="w-4 h-[1px] bg-white/25 shrink-0" />
              <h2 className="font-serif text-base sm:text-xl text-brand-white truncate">
                {activeLightboxStudy.title}
              </h2>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans text-gray-200 cursor-pointer transition-colors"
              >
                {isZoomed ? 'Reset Zoom' : 'Zoom +'}
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close full-screen viewer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-gold text-brand-white hover:text-[#141210] flex items-center justify-center text-lg transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Center Image Stage */}
          <div
            className="relative flex-1 w-full flex items-center justify-center overflow-auto px-4 sm:px-16 py-2"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showPrevImage()
              }}
              aria-label="Previous image"
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/50 flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
            >
              &#8592;
            </button>

            <img
              src={activeLightboxStudy.image}
              alt={activeLightboxStudy.alt}
              onClick={(e) => {
                e.stopPropagation()
                setIsZoomed((z) => !z)
              }}
              className={`transition-transform duration-300 rounded-xs shadow-[0_20px_70px_rgba(0,0,0,0.9)] ${
                isZoomed
                  ? 'max-w-none w-[135vw] sm:w-[115vw] max-h-none cursor-zoom-out'
                  : 'max-h-[72vh] sm:max-h-[76vh] max-w-[92vw] sm:max-w-[82vw] w-auto h-auto object-contain cursor-zoom-in'
              }`}
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showNextImage()
              }}
              aria-label="Next image"
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181512] hover:bg-primary-gold text-champagne-gold hover:text-dark-canvas border border-primary-gold/50 flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
            >
              &#8594;
            </button>
          </div>

          {/* Bottom Caption & Enquire Action */}
          <div
            className="w-full px-4 sm:px-8 py-4 bg-[#100e0c] border-t border-white/10 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold block">
                  {activeLightboxStudy.categoryTag} &bull; {activeLightboxStudy.venueType}
                </span>
                <p className="font-sans text-xs sm:text-sm text-gray-300 mt-0.5">
                  {activeLightboxStudy.summary}
                </p>
              </div>
              <Link
                to={`/decorations/enquire?style=${encodeURIComponent(activeLightboxStudy.title)}&occasion=${encodeURIComponent(activeLightboxStudy.occasionParam)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-gold text-[#141210] hover:bg-gold-highlight font-sans text-xs font-semibold uppercase tracking-[0.16em] rounded transition-colors shrink-0"
              >
                <span>Enquire About This Style</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
