import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import decoration0Img from '../../assets/images/decoration0.jpg'
import decoration1Img from '../../assets/images/decoration1.jpg'
import decoration2Img from '../../assets/images/decoration2.jpg'
import decoration3Img from '../../assets/images/decoration3.jpg'
import decoration4Img from '../../assets/images/decoration4.jpg'
import decoration5Img from '../../assets/images/decoration5.jpg'
import decoration6Img from '../../assets/images/decoration6.jpg'
import decoration7Img from '../../assets/images/decoration7.jpg'
import decoration8Img from '../../assets/images/decoration8.jpg'
import decoration9Img from '../../assets/images/decoration9.jpg'
import decoration110Img from '../../assets/images/decoration110.jpg'


const stylingCategories = [
  { id: 'all', label: 'All Works' },
  { id: 'weddings', label: 'Bridal & Halls' },
  { id: 'traditional', label: 'Kwanjula' },
  { id: 'outdoor', label: 'Outdoor & Bespoke' },
]

const portfolioStudies = [
  {
    id: 'decoration-7',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Bridal Ballroom',
    title: 'Wisteria Cloud & Serpentine Chandelier Hall',
    venueType: 'Grand Indoor Ballroom or Marquee',
    image: decoration7Img,
    alt: 'Grand reception hall with suspended pastel wisteria ceiling installation, serpentine LED chandelier, and arched stage backdrop',
    description:
      'An overhead floral canopy of pastel lavender, powder blue, and ivory wisteria traversed by a glowing serpentine chandelier and classical arched stage paneling.',
  },
  {
    id: 'decoration-5',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Bridal Stage',
    title: 'Forest Velvet, Fluted Arches & Hydrangea Stage',
    venueType: 'Hotel Ballroom or Reception Hall',
    image: decoration5Img,
    alt: 'Botanical emerald and blush-cream multi-arch stage against deep forest-green velvet drapery with curved ivory sofa and hydrangea mounds',
    description:
      'Blush-cream fluted arches draped in soft ivory voile against a forest-green velvet curtain, anchored by a curved boucle sofa and white hydrangea meadows.',
  },
  {
    id: 'decoration-4',
    category: 'traditional',
    occasionParam: 'Kwanjula / Introduction',
    categoryTag: 'Kwanjula Ceremony',
    title: 'Blush & Burgundy Multi-Arch Stage With Paired Cake',
    venueType: 'Outdoor Garden or Homestead Lawn',
    image: decoration4Img,
    alt: 'Outdoor Kukyala and Kwanjula multi-arch stage in blush and burgundy with coordinated two-tier cake on a gold pedestal',
    description:
      'Recessed blush-pink arches framed against deep burgundy pleated drapery, complete with cascading crimson florals and a coordinated two-tier cake on a gold pedestal.',
  },
  {
    id: 'decoration-110',
    category: 'traditional',
    occasionParam: 'Kwanjula / Introduction',
    categoryTag: 'Cultural Craft',
    title: 'Woven Raffia Baskets, Terracotta & Kitenge Stage',
    venueType: 'Traditional Pavilion or Marquee',
    image: decoration110Img,
    alt: 'Cultural stage backdrop styled with woven raffia baskets, terracotta drapery, warm neon script, carved wooden stool with clay pot, and Kitenge fabric',
    description:
      'Handwoven Ugandan raffia baskets across a warm terracotta backdrop with custom neon couple signage, carved woodwork, clay pottery, and cascading amber florals.',
  },
  {
    id: 'decoration-8',
    category: 'outdoor',
    occasionParam: 'Wedding Reception',
    categoryTag: 'Lakeside Pavilion',
    title: 'Lakeside Pavilion & Double-Arch Floral Altar',
    venueType: 'Lakeside Lawn or Waterfront Resort',
    image: decoration8Img,
    alt: 'Lakeside wedding ceremony pavilion with sheer white drapery, double-arch white floral altar, and white carpet aisle overlooking water',
    description:
      'Sunlit open-air pavilion dressed in billowing white voile drapery framing a concentric double-circle white arch adorned with hanging crystal strands and white roses.',
  },
  {
    id: 'decoration-9',
    category: 'outdoor',
    occasionParam: 'Milestone Celebration',
    categoryTag: 'Welcome Monolith',
    title: 'Storybook Pillar Welcome Installation',
    venueType: 'Venue Entrance or Garden Lawn',
    image: decoration9Img,
    alt: 'Seven white architectural pillars spelling Welcome To Our Wedding with couple photos, love story text, peach roses, and uplighting',
    description:
      'Seven architectural white monolith pillars spelling "WELCOME To Our Wedding", personalized with couple photographs, love-story chapters, and peach rose meadows.',
  },
]

export default function DecorationsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)
  

  const filteredStudies =
    activeCategory === 'all'
      ? portfolioStudies
      : portfolioStudies.filter((item) => item.category === activeCategory)

  const openStudyById = (studyId) => {
    let idx = portfolioStudies.findIndex((item) => item.id === studyId)
    if (idx === -1) {
      const aliasMap = {
        'decoration-1': 'decoration-5',
        'decoration-6': 'decoration-4',
        'decoration-2': 'decoration-7',
        'decoration-3': 'decoration-5',
        'decoration-0': 'decoration-8',
      }
      const targetId = aliasMap[studyId] || 'decoration-7'
      idx = portfolioStudies.findIndex((item) => item.id === targetId)
    }
    if (idx !== -1) {
      setIsZoomed(false)
      setLightboxIndex(idx)
    }
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    setIsZoomed(false)
  }

  const showPrevImage = () => {
    setIsZoomed(false)
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + portfolioStudies.length) % portfolioStudies.length
    )
  }

  const showNextImage = () => {
    setIsZoomed(false)
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % portfolioStudies.length
    )
  }

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight) in full-screen viewer
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
        setIsZoomed(false)
      } else if (e.key === 'ArrowLeft') {
        setIsZoomed(false)
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + portfolioStudies.length) % portfolioStudies.length
        )
      } else if (e.key === 'ArrowRight') {
        setIsZoomed(false)
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % portfolioStudies.length
        )
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  const activeLightboxStudy =
    lightboxIndex !== null ? portfolioStudies[lightboxIndex] : null

  return (
    <div className="w-full font-sans bg-dark-canvas text-brand-white">
      {/* ===================================================================
          SCENE 1 — Clean Edge-to-Edge Architectural Hero
          =================================================================== */}
      <section
        aria-label="Scene 1 — An Atmosphere, Thoughtfully Created"
        className="relative w-full min-h-[600px] sm:min-h-[660px] md:min-h-[760px] lg:min-h-[840px] flex items-center justify-center overflow-hidden bg-dark-canvas"
      >
        {/* Full-Bleed Forest-Velvet & Arch Stage Background (decoration5.jpg) */}
        <img
          src={decoration5Img}
          alt="Botanical emerald and blush-cream multi-arch stage against deep forest-green velvet drapery with curved ivory sofa, hydrangea mounds, and glowing pillar candles"
          className="absolute inset-0 w-full h-full object-cover object-[center_58%] pointer-events-none select-none"
        />

        {/* Seamless Chiaroscuro Gradient Overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#141210]/72 sm:bg-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/78 to-transparent sm:w-[75%] md:w-[65%] lg:w-[58%] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#141210] to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#141210] to-transparent pointer-events-none"
        />

        {/* Hero 12-Column Editorial Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column (Cols 1-7): Headline, Statement, CTAs & Metrics */}
            <div className="lg:col-span-7 flex flex-col items-center text-center sm:items-start sm:text-left">
              <h1
                data-aos="fade-up"
                className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.14] sm:leading-[1.12] tracking-tight break-words"
              >
                <span className="block text-white">More Than Decor.</span>
                <span className="block text-primary-gold italic font-serif mt-1">
                  An Atmosphere,
                </span>
                <span className="block text-white mt-1">
                  Thoughtfully Created.
                </span>
              </h1>

              {/* Subtle Editorial Accent Line */}
              <div
                aria-hidden="true"
                data-aos="fade-up"
                data-aos-delay="100"
                className="w-12 h-[1px] bg-primary-gold/60 my-5 sm:my-7 mx-auto sm:mx-0"
              />

              <p
                data-aos="fade-up"
                data-aos-delay="150"
                className="font-sans text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-sm sm:max-w-lg mb-7 sm:mb-9 font-normal break-words"
              >
                From custom bridal stages and authentic Kwanjula pavilions to suspended floral ballrooms, we unite architectural framing and botanical artistry to give every celebration a distinctive sense of occasion.
              </p>

              {/* Clean Dual Calls to Action */}
              <div
                data-aos="fade-up"
                data-aos-delay="240"
                className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 w-full max-w-xs sm:max-w-md min-w-0"
              >
                <Link
                  to="/decorations/enquire"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase bg-primary-gold text-[#141210] hover:bg-gold-highlight hover:shadow-[0_4px_24px_rgba(222,172,75,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
                >
                  Request a Consultation
                </Link>
                <a
                  href="#styling-portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase border border-primary-gold/60 text-champagne-gold hover:border-primary-gold hover:text-white hover:bg-primary-gold/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
                >
                  Explore Lookbook
                </a>
              </div>
            </div>

            {/* Right Column (Cols 8-12): Additional Floating Showcase Card on the Hero */}
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              className="hidden lg:flex lg:col-span-5 flex-col items-end"
            >
              <div className="relative w-full max-w-[380px]">
                {/* Primary Tall Portrait Showcase (decoration7.jpg) */}
                <button
                  type="button"
                  onClick={() => openStudyById('decoration-7')}
                  aria-label="View Wisteria Cloud & Serpentine Chandelier Hall full screen"
                  className="w-full relative overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.85)] group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                >
                  <img
                    src={decoration7Img}
                    alt="Grand reception hall with suspended pastel wisteria ceiling installation and serpentine LED chandelier"
                    className="w-full aspect-4/5 object-cover object-center block select-none transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#141210]/75 via-transparent to-transparent"
                  />
                </button>

                {/* Overlapping Additional Card (decoration110.jpg + Bespoke Curation Caption) */}
                <button
                  type="button"
                  onClick={() => openStudyById('decoration-110')}
                  aria-label="View Woven Raffia Baskets, Terracotta & Kitenge Stage full screen"
                  className="relative z-20 -mt-20 -ml-12 w-[80%] bg-[#141210] border-l-2 border-l-primary-gold p-3.5 rounded-sm shadow-2xl flex items-center gap-3.5 text-left cursor-pointer hover:bg-[#1C1815] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                >
                  <img
                    src={decoration110Img}
                    alt="Cultural Kwanjula stage with woven raffia baskets and terracotta drapery"
                    className="w-16 h-20 object-cover rounded-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-primary-gold">
                      Bespoke Curation
                    </span>
                    <p className="font-serif text-sm text-brand-white leading-snug mt-0.5 truncate">
                      Weddings &amp; Kwanjula
                    </p>
                    <p className="font-sans text-[11px] text-gray-400 mt-1 leading-tight">
                      Tailored stages, florals &amp; lighting composed to order.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 3 — The Stepped Horizon: Every Setting, Composed by Hand
          =================================================================== */}
      <section
        aria-label="Scene 3 — Every Setting, Composed by Hand"
        className="relative w-full bg-dark-canvas text-brand-white overflow-hidden py-16 sm:py-24 lg:py-32"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop & Tablet Balanced Editorial Layout (md and up) */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-start">
            <div className="md:col-span-7 flex flex-col">
              <div data-aos="fade-up" className="mb-8 lg:mb-12 max-w-xl">
                <h2 className="font-serif font-normal text-3xl lg:text-5xl xl:text-[3.25rem] text-primary-gold leading-[1.1] tracking-tight">
                  Every Setting, Composed by Hand.
                </h2>
                <p className="font-sans text-sm lg:text-base text-gray-300 leading-relaxed mt-3.5 font-normal">
                  From woven-raffia Kwanjula stages and personalized wedding welcome monoliths to sunlit lakeside altars, our portfolio spans intimate cultural ceremonies and grand ballroom transformations.
                </p>
              </div>

              <div className="grid grid-cols-12 gap-5 lg:gap-7 items-start">
                <div className="col-span-5 flex flex-col">
                  <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    onClick={() => openStudyById('decoration-110')}
                    className="w-full overflow-hidden rounded-sm shadow-2xl cursor-pointer group"
                  >
                    <img
                      src={decoration110Img}
                      alt="Cultural stage backdrop styled with woven raffia baskets, terracotta drapery, warm neon script, and Kitenge fabric"
                      className="w-full aspect-4/5 object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    onClick={() => openStudyById('decoration-9')}
                    className="w-[88%] mt-6 lg:mt-8 overflow-hidden rounded-sm shadow-2xl cursor-pointer group"
                  >
                    <img
                      src={decoration9Img}
                      alt="Seven white architectural pillars spelling Welcome To Our Wedding with couple photos and peach roses"
                      className="w-full aspect-4/5 object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="150" className="col-span-7 -mt-2 lg:-mt-6 flex flex-col">
                  <div
                    onClick={() => openStudyById('decoration-8')}
                    className="w-full overflow-hidden rounded-sm shadow-2xl cursor-pointer group"
                  >
                    <img
                      src={decoration8Img}
                      alt="Lakeside wedding ceremony pavilion with sheer white drapery, double-arch white floral altar, and white carpet aisle"
                      className="w-full aspect-2/3 object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-6 lg:mt-8">
                    <Link
                      to="/decorations/enquire"
                      className="inline-flex items-center gap-2 text-xs lg:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-primary-gold hover:text-gold-highlight border-b border-primary-gold/40 hover:border-gold-highlight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                    >
                      <span>Book a Styling Consultation</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 md:mt-2 flex flex-col">
              <div
                data-aos="fade-left"
                data-aos-delay="150"
                onClick={() => openStudyById('decoration-7')}
                className="w-full overflow-hidden rounded-sm shadow-2xl cursor-pointer group"
              >
                <img
                  src={decoration7Img}
                  alt="Grand reception hall with suspended pastel wisteria ceiling installation and serpentine LED chandelier"
                  className="w-full aspect-3/4 object-cover object-center block transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="260"
                onClick={() => openStudyById('decoration-1')}
                className="relative z-10 -mt-16 lg:-mt-24 -ml-6 lg:-ml-12 w-[66%] max-w-[320px] rounded-sm shadow-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={decoration1Img}
                  alt="Emerald green and white draped garden pavilion with hanging woven basket planters and curved white lounge sofa"
                  className="w-full aspect-4/3 object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-6 lg:mt-8 flex justify-end">
                <a
                  href="#styling-portfolio"
                  className="inline-flex items-center gap-2 text-xs lg:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-champagne-gold hover:text-gold-highlight border-b border-primary-gold/40 hover:border-gold-highlight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                >
                  <span>Explore Lookbook</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Balanced Editorial Recomposition (< 768px) */}
          <div className="md:hidden flex flex-col">
            <div data-aos="fade-up" className="mb-8">
              <h2 className="font-serif font-normal text-3xl sm:text-4xl text-primary-gold leading-[1.12] tracking-tight">
                Every Setting, Composed by Hand.
              </h2>
              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 font-normal">
                From woven-raffia Kwanjula stages and personalized wedding welcome monoliths to sunlit lakeside altars, every space is styled with intention.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col">
              <div className="flex items-start justify-between gap-3.5">
                <div
                  onClick={() => openStudyById('decoration-8')}
                  className="w-[56%] shrink-0 overflow-hidden rounded-sm shadow-2xl cursor-pointer"
                >
                  <img
                    src={decoration8Img}
                    alt="Lakeside wedding ceremony pavilion with sheer white drapery and double-arch white floral altar"
                    className="w-full aspect-2/3 object-cover block"
                  />
                </div>

                <div
                  onClick={() => openStudyById('decoration-110')}
                  className="w-[41%] mt-8 overflow-hidden rounded-sm shadow-2xl cursor-pointer"
                >
                  <img
                    src={decoration110Img}
                    alt="Cultural stage backdrop styled with woven raffia baskets, terracotta drapery, and Kitenge fabric"
                    className="w-full aspect-4/5 object-cover block"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 -mt-6 pl-[6%]">
                <div
                  onClick={() => openStudyById('decoration-9')}
                  className="w-[50%] rounded-sm shadow-2xl relative z-10 overflow-hidden cursor-pointer"
                >
                  <img
                    src={decoration9Img}
                    alt="Seven white architectural pillars spelling Welcome To Our Wedding with couple photos"
                    className="w-full aspect-4/5 object-cover block"
                  />
                </div>

                <div className="pb-1 shrink-0">
                  <Link
                    to="/decorations/enquire"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-primary-gold hover:text-gold-highlight border-b border-primary-gold/40 pb-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                  >
                    <span>Book Consultation</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="150" className="mt-12 flex flex-col">
              <div
                onClick={() => openStudyById('decoration-7')}
                className="w-full overflow-hidden rounded-sm shadow-2xl cursor-pointer"
              >
                <img
                  src={decoration7Img}
                  alt="Grand reception hall with suspended pastel wisteria ceiling installation and serpentine chandelier"
                  className="w-full aspect-3/4 object-cover object-center block"
                />
              </div>

              <div className="flex items-end justify-between gap-4 -mt-12 pl-3">
                <div
                  onClick={() => openStudyById('decoration-1')}
                  className="w-[58%] max-w-[220px] rounded-sm shadow-2xl relative z-10 overflow-hidden cursor-pointer"
                >
                  <img
                    src={decoration1Img}
                    alt="Emerald green and white draped garden pavilion with hanging woven basket planters"
                    className="w-full aspect-4/3 object-cover block"
                  />
                </div>

                <div className="pb-1 shrink-0">
                  <a
                    href="#styling-portfolio"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-champagne-gold hover:text-gold-highlight border-b border-primary-gold/40 pb-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                  >
                    <span>Explore Works</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 4 — The Atelier Salon (Curated Asymmetrical Room Reveal)
          =================================================================== */}
      <section
        id="styling-portfolio"
        aria-label="Scene 4 — The Atelier Styling Salon"
        className="relative w-full bg-dark-canvas text-brand-white py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-20 border-y border-white/5"
      >
        <div
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row: Title & Manifesto on Left, Luxury Capsule Pill Bar on Right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div data-aos="fade-up" className="max-w-xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[1px] bg-primary-gold" />
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-gold">
                  Scene IV &middot; The Atelier Salon
                </span>
              </div>
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-brand-white leading-[1.12] tracking-tight">
                Selected Styling <span className="text-primary-gold">Works.</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-300/80 leading-relaxed mt-2.5">
                A spatial salon composition of bespoke stages, ceremonial drapery, and venue atmospheres.
              </p>
            </div>

            {/* Luxury Capsule Filter Bar */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              role="tablist"
              aria-label="Filter decoration lookbook by discipline"
              className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#181614] border border-white/10 shadow-inner overflow-x-auto max-w-full no-scrollbar"
            >
              {stylingCategories.map((cat) => {
                const isActive = activeCategory === cat.id
                const count =
                  cat.id === 'all'
                    ? portfolioStudies.length
                    : portfolioStudies.filter((item) => item.category === cat.id).length

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-3.5 sm:px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold flex items-center gap-2 ${
                      isActive
                        ? 'bg-primary-gold text-[#141210] font-semibold shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                        isActive
                          ? 'bg-[#141210]/25 text-[#141210] font-bold'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* The Asymmetrical Salon Content */}
          {activeCategory === 'all' ? (
            /* ALL WORKS: Two Alternating Editorial Salon Suites */
            <div className="space-y-16 sm:space-y-20">
              {/* Salon Suite 1: Primary Anchor Left (Col 1-7) | Stacked Studies Right (Col 8-12) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Primary Anchor Monolith: Wisteria Cloud & Chandelier Hall (decor-7) */}
                <article
                  data-aos="fade-right"
                  className="lg:col-span-7 flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-2xl transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => openStudyById('decoration-7')}
                    aria-label="View Wisteria Cloud & Serpentine Chandelier Hall in full screen"
                    className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                  >
                    <img
                      src={decoration7Img}
                      alt="Grand reception hall with suspended pastel wisteria ceiling installation and serpentine LED chandelier"
                      className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.2em]">
                      01 &middot; Bridal Ballroom Anchor
                    </span>

                    <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 px-3.5 py-1.5 rounded-full bg-[#141210] text-primary-gold text-[11px] font-sans uppercase tracking-[0.16em] flex items-center gap-1.5 shadow-xl border border-primary-gold/30">
                      <svg aria-hidden="true" className="w-3.5 h-3.5 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>Inspect</span>
                    </span>
                  </button>

                  <div className="p-5 sm:p-6 flex items-start justify-between gap-4 bg-[#161412] flex-1">
                    <div>
                      <h3
                        onClick={() => openStudyById('decoration-7')}
                        className="font-serif font-normal text-lg sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug"
                      >
                        Wisteria Cloud &amp; Serpentine Chandelier Hall
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mt-1">
                        Grand Indoor Ballroom or Marquee &middot; Full Ceiling Installation
                      </p>
                    </div>

                    <Link
                      to={`/decorations/enquire?style=${encodeURIComponent('Wisteria Cloud & Serpentine Chandelier Hall')}&occasion=${encodeURIComponent('Wedding Reception')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-primary-gold hover:text-gold-highlight shrink-0 pt-1 transition-transform group-hover:translate-x-0.5"
                    >
                      <span>Enquire</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </article>

                {/* Staggered Studies Stack (Col 8-12): decor-4 & decor-5 */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
                  {/* Study A: Blush & Burgundy Multi-Arch Stage with Paired Cake (decor-4) */}
                  <article
                    data-aos="fade-left"
                    data-aos-delay="100"
                    className="flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-xl transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => openStudyById('decoration-4')}
                      aria-label="View Blush & Burgundy Multi-Arch Stage With Paired Cake in full screen"
                      className="relative w-full aspect-[16/10] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                    >
                      <img
                        src={decoration4Img}
                        alt="Outdoor Kukyala and Kwanjula multi-arch stage in blush and burgundy with coordinated two-tier cake on a gold pedestal"
                        className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.18em]">
                        02 &middot; Kwanjula Stage + Cake
                      </span>
                    </button>

                    <div className="p-4 flex items-start justify-between gap-3 bg-[#161412]">
                      <div className="min-w-0 pr-2">
                        <h3
                          onClick={() => openStudyById('decoration-4')}
                          className="font-serif font-normal text-base sm:text-lg text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          Blush &amp; Burgundy Multi-Arch Stage With Paired Cake
                        </h3>
                        <p className="font-sans text-[11px] text-gray-400 mt-0.5 truncate">
                          Outdoor Garden or Homestead Lawn
                        </p>
                      </div>
                      <Link
                        to={`/decorations/enquire?style=${encodeURIComponent('Blush & Burgundy Multi-Arch Stage With Paired Cake')}&occasion=${encodeURIComponent('Kwanjula / Introduction')}`}
                        className="inline-flex items-center gap-1 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-primary-gold hover:text-gold-highlight shrink-0 pt-0.5"
                      >
                        <span>Enquire</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>

                  {/* Study B: Forest Velvet, Fluted Arches & Hydrangea Stage (decor-5) */}
                  <article
                    data-aos="fade-left"
                    data-aos-delay="200"
                    className="flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-xl transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => openStudyById('decoration-5')}
                      aria-label="View Forest Velvet, Fluted Arches & Hydrangea Stage in full screen"
                      className="relative w-full aspect-[16/10] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                    >
                      <img
                        src={decoration5Img}
                        alt="Botanical emerald and blush-cream multi-arch stage against deep forest-green velvet drapery"
                        className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.18em]">
                        03 &middot; Bridal Stage
                      </span>
                    </button>

                    <div className="p-4 flex items-start justify-between gap-3 bg-[#161412]">
                      <div className="min-w-0 pr-2">
                        <h3
                          onClick={() => openStudyById('decoration-5')}
                          className="font-serif font-normal text-base sm:text-lg text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          Forest Velvet, Fluted Arches &amp; Hydrangea Stage
                        </h3>
                        <p className="font-sans text-[11px] text-gray-400 mt-0.5 truncate">
                          Hotel Ballroom or Reception Hall
                        </p>
                      </div>
                      <Link
                        to={`/decorations/enquire?style=${encodeURIComponent('Forest Velvet, Fluted Arches & Hydrangea Stage')}&occasion=${encodeURIComponent('Wedding Reception')}`}
                        className="inline-flex items-center gap-1 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-primary-gold hover:text-gold-highlight shrink-0 pt-0.5"
                      >
                        <span>Enquire</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>
                </div>
              </div>

              {/* Salon Suite 2: Stacked Studies Left (Col 1-5) | Primary Anchor Right (Col 6-12) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Staggered Studies Stack (Col 1-5): decor-110 & decor-9 */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8 order-2 lg:order-1">
                  {/* Study C: Woven Raffia Baskets, Terracotta & Kitenge Stage (decor-110) */}
                  <article
                    data-aos="fade-right"
                    data-aos-delay="100"
                    className="flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-xl transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => openStudyById('decoration-110')}
                      aria-label="View Woven Raffia Baskets, Terracotta & Kitenge Stage in full screen"
                      className="relative w-full aspect-[16/10] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                    >
                      <img
                        src={decoration110Img}
                        alt="Cultural stage backdrop styled with woven raffia baskets, terracotta drapery, warm neon script, and Kitenge fabric"
                        className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.18em]">
                        04 &middot; Cultural Craft
                      </span>
                    </button>

                    <div className="p-4 flex items-start justify-between gap-3 bg-[#161412]">
                      <div className="min-w-0 pr-2">
                        <h3
                          onClick={() => openStudyById('decoration-110')}
                          className="font-serif font-normal text-base sm:text-lg text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          Woven Raffia Baskets, Terracotta &amp; Kitenge Stage
                        </h3>
                        <p className="font-sans text-[11px] text-gray-400 mt-0.5 truncate">
                          Traditional Pavilion or Marquee
                        </p>
                      </div>
                      <Link
                        to={`/decorations/enquire?style=${encodeURIComponent('Woven Raffia Baskets, Terracotta & Kitenge Stage')}&occasion=${encodeURIComponent('Kwanjula / Introduction')}`}
                        className="inline-flex items-center gap-1 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-primary-gold hover:text-gold-highlight shrink-0 pt-0.5"
                      >
                        <span>Enquire</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>

                  {/* Study D: Storybook Pillar Welcome Installation (decor-9) */}
                  <article
                    data-aos="fade-right"
                    data-aos-delay="200"
                    className="flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-xl transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => openStudyById('decoration-9')}
                      aria-label="View Storybook Pillar Welcome Installation in full screen"
                      className="relative w-full aspect-[16/10] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                    >
                      <img
                        src={decoration9Img}
                        alt="Seven white architectural pillars spelling Welcome To Our Wedding with couple photos, love story text, and peach roses"
                        className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.18em]">
                        05 &middot; Welcome Installation
                      </span>
                    </button>

                    <div className="p-4 flex items-start justify-between gap-3 bg-[#161412]">
                      <div className="min-w-0 pr-2">
                        <h3
                          onClick={() => openStudyById('decoration-9')}
                          className="font-serif font-normal text-base sm:text-lg text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug line-clamp-1"
                        >
                          Storybook Pillar Welcome Installation
                        </h3>
                        <p className="font-sans text-[11px] text-gray-400 mt-0.5 truncate">
                          Venue Entrance or Garden Lawn
                        </p>
                      </div>
                      <Link
                        to={`/decorations/enquire?style=${encodeURIComponent('Storybook Pillar Welcome Installation')}&occasion=${encodeURIComponent('Milestone Celebration')}`}
                        className="inline-flex items-center gap-1 text-xs font-sans font-semibold uppercase tracking-[0.14em] text-primary-gold hover:text-gold-highlight shrink-0 pt-0.5"
                      >
                        <span>Enquire</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>
                </div>

                {/* Primary Anchor Monolith: Lakeside Pavilion & Double-Arch Altar (decor-8) */}
                <article
                  data-aos="fade-left"
                  className="lg:col-span-7 flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-2xl transition-all duration-300 order-1 lg:order-2"
                >
                  <button
                    type="button"
                    onClick={() => openStudyById('decoration-8')}
                    aria-label="View Lakeside Pavilion & Double-Arch Floral Altar in full screen"
                    className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                  >
                    <img
                      src={decoration8Img}
                      alt="Lakeside wedding ceremony pavilion with sheer white drapery, double-arch white floral altar, and white carpet aisle"
                      className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.2em]">
                      06 &middot; Lakeside Pavilion Anchor
                    </span>

                    <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 px-3.5 py-1.5 rounded-full bg-[#141210] text-primary-gold text-[11px] font-sans uppercase tracking-[0.16em] flex items-center gap-1.5 shadow-xl border border-primary-gold/30">
                      <svg aria-hidden="true" className="w-3.5 h-3.5 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>Inspect</span>
                    </span>
                  </button>

                  <div className="p-5 sm:p-6 flex items-start justify-between gap-4 bg-[#161412] flex-1">
                    <div>
                      <h3
                        onClick={() => openStudyById('decoration-8')}
                        className="font-serif font-normal text-lg sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug"
                      >
                        Lakeside Pavilion &amp; Double-Arch Floral Altar
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mt-1">
                        Lakeside Lawn or Waterfront Resort &middot; Waterfront Ceremony Staging
                      </p>
                    </div>

                    <Link
                      to={`/decorations/enquire?style=${encodeURIComponent('Lakeside Pavilion & Double-Arch Floral Altar')}&occasion=${encodeURIComponent('Wedding Reception')}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-primary-gold hover:text-gold-highlight shrink-0 pt-1 transition-transform group-hover:translate-x-0.5"
                    >
                      <span>Enquire</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          ) : (
            /* FILTERED DISCIPLINE SALON: 2 High-Impact Curated Masterworks */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {filteredStudies.map((study, idx) => {
                const isPrimary = idx === 0
                return (
                  <article
                    key={study.id}
                    data-aos={isPrimary ? 'fade-right' : 'fade-left'}
                    className={`${
                      isPrimary ? 'lg:col-span-7' : 'lg:col-span-5'
                    } flex flex-col group bg-[#161412] rounded-lg overflow-hidden border border-white/10 hover:border-primary-gold/50 shadow-2xl transition-all duration-300`}
                  >
                    <button
                      type="button"
                      onClick={() => openStudyById(study.id)}
                      aria-label={`View ${study.title} in full screen`}
                      className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] overflow-hidden cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                    >
                      <img
                        src={study.image}
                        alt={study.alt}
                        className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#141210] border border-white/10 text-champagne-gold text-[10px] font-mono uppercase tracking-[0.2em]">
                        {study.categoryTag}
                      </span>

                      <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300 px-3.5 py-1.5 rounded-full bg-[#141210] text-primary-gold text-[11px] font-sans uppercase tracking-[0.16em] flex items-center gap-1.5 shadow-xl border border-primary-gold/30">
                        <svg aria-hidden="true" className="w-3.5 h-3.5 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span>Inspect</span>
                      </span>
                    </button>

                    <div className="p-5 sm:p-6 flex items-start justify-between gap-4 bg-[#161412] flex-1">
                      <div>
                        <h3
                          onClick={() => openStudyById(study.id)}
                          className="font-serif font-normal text-lg sm:text-2xl text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug"
                        >
                          {study.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-400 mt-1">
                          {study.venueType}
                        </p>
                      </div>

                      <Link
                        to={`/decorations/enquire?style=${encodeURIComponent(study.title)}&occasion=${encodeURIComponent(study.occasionParam)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-primary-gold hover:text-gold-highlight shrink-0 pt-1 transition-transform group-hover:translate-x-0.5"
                      >
                        <span>Enquire</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>


      {/* ===================================================================
          SCENE 6 — The Quiet Coda (Three-Row Alternating Atelier Layout)
          =================================================================== */}
      <section
        aria-label="Scene 6 — Every Memorable Setting Starts With an Idea"
        className="relative w-full bg-dark-canvas text-brand-white py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-22">
            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-primary-gold leading-[1.15] tracking-tight">
              <span className="block">Every Memorable Space Starts</span>
              <span className="block mt-1 text-brand-white">With a Conversation.</span>
            </h2>
          </div>

          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            {/* Row 1: Text Left (Cols 1-5) | Paired Images Right (Cols 6-12) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
              <div data-aos="fade-right" className="md:col-span-5">
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Share Your Occasion &amp; Venue Vision
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-md font-normal">
                  Tell us what you&apos;re celebrating, your venue location, and the atmosphere you have in mind. Whether a traditional Kwanjula introduction at home or a sunlit waterfront ceremony, every bespoke setting begins with your story.
                </p>
              </div>

              <div data-aos="fade-left" data-aos-delay="120" className="md:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 items-center">
                <img
                  src={decoration9Img}
                  onClick={() => openStudyById('decoration-9')}
                  alt="Seven white architectural pillars spelling Welcome To Our Wedding with couple photos and peach roses"
                  className="w-full aspect-4/5 object-cover object-center rounded-sm shadow-xl block cursor-zoom-in hover:opacity-95 transition-opacity"
                />
                <img
                  src={decoration8Img}
                  onClick={() => openStudyById('decoration-8')}
                  alt="Lakeside wedding ceremony pavilion with sheer white drapery and double-arch white floral altar"
                  className="w-full aspect-4/5 object-cover object-center rounded-sm shadow-xl block cursor-zoom-in hover:opacity-95 transition-opacity"
                />
              </div>
            </div>

            {/* Row 2: Image Left (Cols 1-4) | Text Center (Cols 5-8) | Image Right (Cols 9-12) */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 lg:gap-8 items-center">
              <div data-aos="fade-right" data-aos-delay="100" className="col-span-1 md:col-span-4 order-2 md:order-1">
                <img
                  src={decoration6Img}
                  onClick={() => openStudyById('decoration-6')}
                  alt="Garden Introduction ceremony stage reading Sheila Introduces Brian with emerald ombre backdrop, gold arches, and sunflowers"
                  className="w-full aspect-4/3 object-cover object-center rounded-sm shadow-xl block cursor-zoom-in hover:opacity-95 transition-opacity"
                />
              </div>

              <div data-aos="fade-up" className="col-span-2 md:col-span-4 order-1 md:order-2 md:px-2 lg:px-4 mb-2.5 md:mb-0">
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Explore Custom Arches, Drapery &amp; Florals
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed font-normal">
                  We&apos;ll guide you through stage proportions, velvet and voile drapery, suspended chandeliers, couples’ lounge seating, and colour-matched floral installations tailored to your guest count.
                </p>
              </div>

              <div data-aos="fade-left" data-aos-delay="180" className="col-span-1 md:col-span-4 order-3">
                <img
                  src={decoration3Img}
                  onClick={() => openStudyById('decoration-3')}
                  alt="Five-arch stage backdrop with lavender and blush rose clusters, crystal chandeliers, and cream velvet settee"
                  className="w-full aspect-4/3 object-cover object-center rounded-sm shadow-xl block cursor-zoom-in hover:opacity-95 transition-opacity"
                />
              </div>
            </div>

            {/* Row 3: Paired Images Left (Cols 1-7) | Text Right (Cols 8-12) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
              <div data-aos="fade-right" data-aos-delay="100" className="md:col-span-7 order-2 md:order-1 grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 items-center">
                <img
                  src={decoration2Img}
                  onClick={() => openStudyById('decoration-2')}
                  alt="Sculptural wave-paneled bridal stage with soft blue backlighting and mirrored sweetheart table"
                  className="w-full aspect-4/3 object-cover object-center rounded-sm shadow-xl block cursor-zoom-in hover:opacity-95 transition-opacity"
                />
                <img
                  src={decoration0Img}
                  onClick={() => openStudyById('decoration-0')}
                  alt="Outdoor architectural wedding stage with angled white and marble panels, gold frames, and teak lounge seating"
                  className="w-full aspect-4/3 object-cover object-center rounded-sm shadow-xl block cursor-zoom-in hover:opacity-95 transition-opacity"
                />
              </div>

              <div data-aos="fade-left" className="md:col-span-5 order-1 md:order-2">
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Composed for the Whole Room
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-md font-normal">
                  From the bridal stage and VIP lounge to guest table settings and your centerpiece cake, every detail is personally reviewed and installed on schedule so the entire celebration feels unified.
                </p>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="120" className="mt-14 sm:mt-18 lg:mt-20 flex flex-col items-center text-center">
            <Link
              to="/decorations/enquire"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-primary-gold/70 text-champagne-gold hover:border-primary-gold hover:bg-primary-gold hover:text-[#141210] transition-colors duration-200 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
            >
              <span>Let&apos;s Style Your Celebration</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FULL-SCREEN GALLERY LIGHTBOX VIEWER (With Prev/Next, Zoom & Filmstrip)
          =================================================================== */}
      {activeLightboxStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxStudy.title}
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col justify-between select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter, Title, Zoom Toggle & Close */}
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

          {/* Center Stage: Large Full-Screen Image + Prev / Next Arrows */}
          <div
            className="relative flex-1 w-full flex items-center justify-center overflow-auto px-4 sm:px-16 py-2"
            onClick={closeLightbox}
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showPrevImage()
              }}
              aria-label="Previous image"
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141210] hover:bg-primary-gold text-primary-gold hover:text-[#141210] flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
            >
              &#8592;
            </button>

            {/* Full-Resolution Image */}
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
                  : 'max-h-[70vh] sm:max-h-[74vh] max-w-[92vw] sm:max-w-[82vw] w-auto h-auto object-contain cursor-zoom-in'
              }`}
            />

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showNextImage()
              }}
              aria-label="Next image"
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141210] hover:bg-primary-gold text-primary-gold hover:text-[#141210] flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
            >
              &#8594;
            </button>
          </div>

          {/* Bottom Bar: Description, Enquire CTA & Thumbnail Filmstrip */}
          <div
            className="w-full px-4 sm:px-8 pt-3 pb-4 bg-[#100e0c] z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-6xl mx-auto flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-2xl line-clamp-2">
                  {activeLightboxStudy.description}
                </p>
                <Link
                  to={`/decorations/enquire?style=${encodeURIComponent(activeLightboxStudy.title)}&occasion=${encodeURIComponent(activeLightboxStudy.occasionParam)}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-gold text-[#141210] hover:bg-gold-highlight font-sans text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors shrink-0"
                >
                  <span>Enquire About This Style</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              {/* Thumbnail Filmstrip of All 11 Works */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {portfolioStudies.map((item, idx) => {
                  const isCurrent = idx === lightboxIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setIsZoomed(false)
                        setLightboxIndex(idx)
                      }}
                      aria-label={`View ${item.title}`}
                      className={`relative shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-xs overflow-hidden transition-all cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-primary-gold opacity-100 scale-105'
                          : 'opacity-45 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover block"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
