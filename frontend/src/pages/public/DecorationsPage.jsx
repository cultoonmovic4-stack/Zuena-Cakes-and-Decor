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

const stylingPillars = [
  {
    title: 'Ceremonial & Bridal Stages',
    summary:
      'Custom fluted arches, velvet and voile drapery, couple monograms, and curated VIP lounge suites for weddings and Kwanjula ceremonies.',
  },
  {
    title: 'Canopies & Chandelier Lighting',
    summary:
      'Suspended wisteria clouds, crystal and serpentine chandeliers, and warm festoon lighting that transform halls and garden marquees.',
  },
  {
    title: 'Tablescapes & Cake Staging',
    summary:
      'Gold-rimmed place settings, fresh botanical runners, and dedicated on-stage cake pedestals colour-matched to your celebration cake.',
  },
]

const stylingCategories = [
  { id: 'all', label: 'All Works (11)' },
  { id: 'weddings', label: 'Bridal Stages & Halls' },
  { id: 'traditional', label: 'Kwanjula & Introduction' },
  { id: 'outdoor', label: 'Garden & Lakeside' },
  { id: 'bespoke', label: 'Welcome Installations' },
]

const portfolioStudies = [
  {
    id: 'decoration-5',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    title: 'Forest Velvet, Fluted Arches & Hydrangea Stage',
    venueType: 'Hotel Ballroom or Reception Hall',
    aspectClass: 'aspect-4/5',
    gridSpan: 'md:col-span-6 lg:col-span-5',
    description:
      'Blush-cream fluted arches draped in soft ivory voile against a forest-green velvet curtain, anchored by a curved boucle sofa and white hydrangea meadows.',
    image: decoration5Img,
    alt: 'Botanical emerald and blush-cream multi-arch stage against deep forest-green velvet drapery with curved ivory sofa and hydrangea mounds',
  },
  {
    id: 'decoration-4',
    category: 'traditional',
    occasionParam: 'Kwanjula / Introduction',
    title: 'Blush & Burgundy Multi-Arch Stage With Paired Cake',
    venueType: 'Outdoor Garden or Homestead Lawn',
    aspectClass: 'aspect-16/10',
    gridSpan: 'md:col-span-6 lg:col-span-7',
    description:
      'Recessed blush-pink arches framed against deep burgundy pleated drapery, complete with cascading crimson florals and a coordinated two-tier cake on a gold pedestal.',
    image: decoration4Img,
    alt: 'Outdoor Kukyala and Kwanjula multi-arch stage in blush and burgundy with coordinated two-tier cake on a gold pedestal',
  },
  {
    id: 'decoration-0',
    category: 'outdoor',
    occasionParam: 'Wedding Reception',
    title: 'Geometric Gold-Framed Monogram & Lounge Stage',
    venueType: 'Garden Courtyard or Open Lawn',
    aspectClass: 'aspect-16/10',
    gridSpan: 'md:col-span-6 lg:col-span-7',
    description:
      'Angular wing panels in marble-grey and crisp white trimmed in brushed gold, topped with festoon string lighting, custom couple initials, and a five-piece teak lounge suite.',
    image: decoration0Img,
    alt: 'Outdoor architectural wedding stage with angled white and marble panels, gold frames, monogram, white roses, and teak lounge seating',
  },
  {
    id: 'decoration-110',
    category: 'traditional',
    occasionParam: 'Kwanjula / Introduction',
    title: 'Woven Raffia Baskets, Terracotta & Kitenge Stage',
    venueType: 'Traditional Pavilion or Marquee',
    aspectClass: 'aspect-4/5',
    gridSpan: 'md:col-span-6 lg:col-span-5',
    description:
      'Handwoven Ugandan raffia baskets across a warm terracotta backdrop with custom neon couple signage, carved woodwork, clay pottery, and cascading amber florals.',
    image: decoration110Img,
    alt: 'Cultural stage backdrop styled with woven raffia baskets, terracotta drapery, warm neon script, carved wooden stool with clay pot, and Kitenge fabric',
  },
  {
    id: 'decoration-7',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    title: 'Wisteria Cloud & Serpentine Chandelier Hall',
    venueType: 'Grand Indoor Ballroom or Marquee',
    aspectClass: 'aspect-4/5',
    gridSpan: 'md:col-span-6 lg:col-span-4',
    description:
      'An overhead floral canopy of pastel lavender, powder blue, and ivory wisteria traversed by a glowing serpentine chandelier and classical arched stage paneling.',
    image: decoration7Img,
    alt: 'Grand reception hall with suspended pastel wisteria ceiling installation, serpentine LED chandelier, and arched stage backdrop',
  },
  {
    id: 'decoration-8',
    category: 'outdoor',
    occasionParam: 'Wedding Reception',
    title: 'Lakeside Pavilion & Double-Arch Floral Altar',
    venueType: 'Lakeside Lawn or Waterfront Resort',
    aspectClass: 'aspect-4/5',
    gridSpan: 'md:col-span-6 lg:col-span-4',
    description:
      'Sunlit open-air pavilion dressed in billowing white voile drapery framing a concentric double-circle white arch adorned with hanging crystal strands and white roses.',
    image: decoration8Img,
    alt: 'Lakeside wedding ceremony pavilion with sheer white drapery, double-arch white floral altar, and white carpet aisle overlooking water',
  },
  {
    id: 'decoration-9',
    category: 'bespoke',
    occasionParam: 'Milestone Celebration',
    title: 'Storybook Pillar Welcome Installation',
    venueType: 'Venue Entrance or Garden Lawn',
    aspectClass: 'aspect-4/5',
    gridSpan: 'md:col-span-12 lg:col-span-4',
    description:
      'Seven architectural white monolith pillars spelling "WELCOME To Our Wedding", personalized with couple photographs, love-story chapters, and peach rose meadows.',
    image: decoration9Img,
    alt: 'Seven white architectural pillars spelling Welcome To Our Wedding with couple photos, love story text, peach roses, and uplighting',
  },
  {
    id: 'decoration-1',
    category: 'outdoor',
    occasionParam: 'Full-Venue Styling',
    title: 'Emerald & Woven-Basket Garden Pavilion',
    venueType: 'Garden Tent or Outdoor Reception',
    aspectClass: 'aspect-16/10',
    gridSpan: 'md:col-span-6 lg:col-span-6',
    description:
      'Deep emerald-green and white canopy draping accented with suspended woven basket planters spilling with trailing ferns, paired with a sculpted white lounge sofa.',
    image: decoration1Img,
    alt: 'Emerald green and white draped garden pavilion with hanging woven basket planters, curved white lounge sofa, and gold banquet chairs',
  },
  {
    id: 'decoration-6',
    category: 'traditional',
    occasionParam: 'Kwanjula / Introduction',
    title: 'Emerald Ombre & Sunflower Introduction Stage',
    venueType: 'Garden Lawn or Marquee',
    aspectClass: 'aspect-16/10',
    gridSpan: 'md:col-span-6 lg:col-span-6',
    description:
      'Deep emerald-to-mint gradient stage wall with custom gold script ("Sheila Introduces Brian"), overhead crystal chandelier, gold triple-arch frames, and sunflowers.',
    image: decoration6Img,
    alt: 'Garden Introduction ceremony stage reading Sheila Introduces Brian with emerald ombre backdrop, gold arches, sunflowers, and emerald velvet chairs',
  },
  {
    id: 'decoration-2',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    title: 'Backlit Wave Panels & Mirrored Sweetheart Table',
    venueType: 'Indoor Ballroom Stage',
    aspectClass: 'aspect-16/10',
    gridSpan: 'md:col-span-6 lg:col-span-6',
    description:
      'Curved white sculptural ribbons with soft ice-blue ambient backlighting, a faceted silver-mirror sweetheart table, and cascading dusty-blue hydrangea runners.',
    image: decoration2Img,
    alt: 'Sculptural wave-paneled bridal stage with soft blue backlighting, silver monogram, mirrored sweetheart table, and blue-and-white florals',
  },
  {
    id: 'decoration-3',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    title: 'Five-Arch Lavender & Crystal Chandelier Stage',
    venueType: 'Banquet Hall or Indoor Venue',
    aspectClass: 'aspect-16/10',
    gridSpan: 'md:col-span-6 lg:col-span-6',
    description:
      'Classical five-arch colonnade in matte white adorned with clouds of lavender, lilac, and blush roses, mini crystal chandeliers suspended inside the side arches, and silver plinths.',
    image: decoration3Img,
    alt: 'Five-arch stage backdrop with lavender and blush rose clusters, crystal chandeliers, and cream velvet settee',
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
    const idx = portfolioStudies.findIndex((item) => item.id === studyId)
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

              {/* Minimalist Key Metrics Ledger */}
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="w-full max-w-xl mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left"
              >
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold">
                    01 / Scope
                  </span>
                  <span className="block font-serif text-sm sm:text-base text-brand-white mt-0.5">
                    Full-Venue Styling
                  </span>
                </div>
                <div className="border-x border-white/15 px-3 sm:px-5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold">
                    02 / Distinction
                  </span>
                  <span className="block font-serif text-sm sm:text-base text-brand-white mt-0.5">
                    Cake + Decor Unity
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold">
                    03 / Heritage
                  </span>
                  <span className="block font-serif text-sm sm:text-base text-brand-white mt-0.5">
                    Kampala Since 2014
                  </span>
                </div>
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
                  className="relative z-20 -mt-20 -ml-12 w-[80%] bg-[#141210]/95 backdrop-blur-md border-l-2 border-l-primary-gold p-3.5 rounded-sm shadow-2xl flex items-center gap-3.5 text-left cursor-pointer hover:bg-[#1C1815] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
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
          SCENE 2 — Three Pillars of Event Styling
          =================================================================== */}
      <section
        aria-label="Scene 2 — Core Event Styling Disciplines"
        className="relative w-full bg-dark-canvas pt-10 pb-6 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {stylingPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={idx * 90}
              >
                <div aria-hidden="true" className="w-8 h-[1px] bg-primary-gold/60 mb-4" />
                <h2 className="font-serif font-normal text-xl sm:text-2xl text-primary-gold mb-2">
                  {pillar.title}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>
            ))}
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
          SCENE 4 — Selected Styling Works (Click Any Image for Full-Screen View)
          =================================================================== */}
      <section
        id="styling-portfolio"
        aria-label="Scene 4 — The Event Styling Lookbook"
        className="relative w-full bg-dark-canvas text-brand-white py-16 sm:py-24 lg:py-28 overflow-hidden scroll-mt-20"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div data-aos="fade-up" className="max-w-2xl">
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-brand-white leading-[1.12] tracking-tight">
                Selected Styling <span className="text-primary-gold">Works.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-gray-300/90 leading-relaxed mt-3">
                Click any photograph to open it in full-screen view and browse through the collection.
              </p>
            </div>

            {/* Minimal Underline Filter Tabs */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              role="tablist"
              aria-label="Filter decoration lookbook by discipline"
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {stylingCategories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`py-1.5 text-xs font-sans uppercase tracking-[0.16em] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                      isActive
                        ? 'text-primary-gold font-semibold border-b border-primary-gold'
                        : 'text-gray-400 hover:text-gold-highlight'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Frameless Edge-to-Edge Bento Grid with Full-Screen Lightbox Trigger */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            {filteredStudies.map((study, index) => (
              <article
                key={study.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 80}
                className={`${
                  activeCategory === 'all' ? study.gridSpan : 'md:col-span-6'
                } group flex flex-col`}
              >
                <button
                  type="button"
                  onClick={() => openStudyById(study.id)}
                  aria-label={`View ${study.title} in full screen`}
                  className="relative w-full overflow-hidden rounded-sm shadow-2xl cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                >
                  <img
                    src={study.image}
                    alt={study.alt}
                    className={`w-full ${study.aspectClass} object-cover object-center block transition-transform duration-700 group-hover:scale-[1.03] select-none`}
                  />

                  {/* Subtle Hover Full-Screen Indicator */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-[#141210]/90 backdrop-blur-md text-champagne-gold text-xs font-sans uppercase tracking-[0.16em] flex items-center gap-2 shadow-xl">
                      <svg aria-hidden="true" className="w-4 h-4 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>View Full Image</span>
                    </span>
                  </div>
                </button>

                {/* Minimalist Editorial Caption Below Photo */}
                <div className="pt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <h3
                      onClick={() => openStudyById(study.id)}
                      className="font-serif font-normal text-lg sm:text-xl text-brand-white group-hover:text-primary-gold transition-colors cursor-pointer leading-snug"
                    >
                      {study.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-400 mt-1 line-clamp-1 max-w-xl">
                      {study.description}
                    </p>
                  </div>

                  <Link
                    to={`/decorations/enquire?style=${encodeURIComponent(study.title)}&occasion=${encodeURIComponent(study.occasionParam)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-primary-gold hover:text-gold-highlight shrink-0"
                  >
                    <span>Enquire</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 5 — Inside the Craft: Where Cake & Stage Share One Story
          =================================================================== */}
      <section
        aria-label="Scene 5 — Inside the Styling Craft: Where Cake and Stage Share One Story"
        className="relative w-full md:min-h-[860px] lg:min-h-[920px] flex flex-col justify-between overflow-hidden bg-dark-canvas"
      >
        {/* MOBILE LAYOUT (< 768px) */}
        <div className="md:hidden relative w-full min-h-[620px] flex flex-col justify-between overflow-hidden">
          <div className="relative w-full h-[380px] overflow-hidden">
            <img
              src={decoration4Img}
              alt="Outdoor Kukyala and Kwanjula multi-arch stage in blush and burgundy with coordinated two-tier cake on a gold pedestal"
              className="w-full h-full object-cover object-center block select-none"
            />
            <div
              aria-hidden="true"
              className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#141210] to-transparent pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#141210] via-[#141210]/80 to-transparent pointer-events-none"
            />
          </div>

          <div
            data-aos="fade-up"
            className="relative z-10 px-4 pb-12 -mt-12 text-center"
          >
            <div className="bg-[#141210]/85 backdrop-blur-xs p-5 rounded-lg border border-primary-gold/40 shadow-2xl">
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-primary-gold font-semibold mb-1.5 block">
                Inside the Craft
              </span>
              <h2 className="font-serif font-normal text-2xl text-brand-white leading-tight">
                Cake &amp; Stage Styled as One.
              </h2>
              <p className="font-sans text-xs text-gray-300 leading-relaxed mt-2 mb-4">
                Multi-arch backdrops, cascading florals, and on-stage cake pedestals crafted under one roof in Kampala.
              </p>
              <Link
                to="/decorations/enquire"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary-gold hover:text-gold-highlight"
              >
                <span>Start Your Consultation</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT (md and up) */}
        <img
          src={decoration4Img}
          alt="Outdoor Kukyala and Kwanjula multi-arch stage in blush and burgundy with coordinated two-tier cake on a gold pedestal"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        <div
          aria-hidden="true"
          className="hidden md:block absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#141210] to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#141210]/90 via-[#141210]/55 to-transparent md:w-[64%] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-0 inset-x-0 h-[520px] bg-gradient-to-t from-[#141210] via-[#141210]/85 to-transparent pointer-events-none"
        />

        <div className="hidden md:flex relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 flex-1 flex-col justify-between gap-8">
          <div className="grid grid-cols-12 gap-5 pt-8">
            <div
              data-aos="fade-right"
              data-aos-delay="80"
              className="md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-4 flex items-center gap-3"
            >
              <div className="flex-1 bg-[#141210]/75 backdrop-blur-xs border border-primary-gold/40 px-4 py-3.5 rounded-md shadow-xl">
                <h3 className="font-serif font-semibold text-base text-primary-gold mb-1">
                  Recessed Multi-Arch Architecture
                </h3>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Custom-built colonnades, pleated velvet drapery &amp; mirror-gold couple calligraphy tailored to your palette.
                </p>
              </div>
              <div aria-hidden="true" className="flex items-center shrink-0">
                <div className="w-10 lg:w-20 h-[1px] bg-primary-gold/70" />
                <div className="w-2 h-2 rounded-full border border-primary-gold bg-[#141210]" />
              </div>
            </div>

            <div
              data-aos="fade-right"
              data-aos-delay="180"
              className="md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-4 flex items-center gap-3"
            >
              <div className="flex-1 bg-[#141210]/75 backdrop-blur-xs border border-primary-gold/40 px-4 py-3.5 rounded-md shadow-xl">
                <h3 className="font-serif font-semibold text-base text-primary-gold mb-1">
                  Cascading Botanical Pillars
                </h3>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Layered roses, hydrangeas, orchids &amp; tropical foliage sculpted around the couple’s lounge seating.
                </p>
              </div>
              <div aria-hidden="true" className="flex items-center shrink-0">
                <div className="w-10 lg:w-20 h-[1px] bg-primary-gold/70" />
                <div className="w-2 h-2 rounded-full border border-primary-gold bg-[#141210]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 items-end">
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="md:col-span-7 lg:col-span-6 bg-[#141210]/70 backdrop-blur-xs p-8 rounded-lg border-l-2 border-primary-gold/80 border-t border-r border-b border-white/10 shadow-2xl"
            >
              <h2 className="font-serif font-normal text-3xl md:text-4xl text-brand-white leading-tight tracking-tight break-words">
                Where Cake &amp; Stage Share One Story.
              </h2>

              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 mb-5 font-normal break-words">
                Notice how the two-tier celebration cake sits on its sculpted gold pedestal right inside the blush and burgundy arch composition. Because our bakers and event stylists work under one roof, your cake and venue are designed as a single work of art.
              </p>

              <div className="mt-5">
                <Link
                  to="/decorations/enquire"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-primary-gold hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded px-1 py-2 min-h-[44px] group"
                >
                  <span>Begin Your Styling Consultation</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="220"
              className="md:col-span-5 lg:col-span-5 lg:col-start-8"
            >
              <div className="bg-[#141210]/80 backdrop-blur-xs border border-bronze/40 p-5 rounded-md shadow-xl">
                <h3 className="font-serif font-semibold text-base text-primary-gold mb-1">
                  On-Stage Cake Pedestal Integration
                </h3>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Positioned on a geometric gold pedestal and colour-matched to the stage arches so the cake-cutting moment is effortlessly photogenic.
                </p>
              </div>
            </div>
          </div>
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter, Title, Zoom Toggle & Close */}
          <div
            className="w-full px-4 sm:px-8 py-4 flex items-center justify-between gap-4 bg-gradient-to-b from-black/80 to-transparent z-20"
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
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141210]/85 hover:bg-primary-gold text-primary-gold hover:text-[#141210] flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
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
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141210]/85 hover:bg-primary-gold text-primary-gold hover:text-[#141210] flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
            >
              &#8594;
            </button>
          </div>

          {/* Bottom Bar: Description, Enquire CTA & Thumbnail Filmstrip */}
          <div
            className="w-full px-4 sm:px-8 pt-3 pb-4 bg-gradient-to-t from-black via-black/90 to-transparent z-20"
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
