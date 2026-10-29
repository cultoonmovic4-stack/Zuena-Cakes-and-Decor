import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import goldTableSettingImg from '../../assets/images/decor 1.jpg'
import coralFloralHallImg from '../../assets/images/decor 2.jpg'
import sweetheartStageImg from '../../assets/images/decor 3.jpg'
import receptionCanopyImg from '../../assets/images/decor 4.jpg'
import lanternTableImg from '../../assets/images/decor 5.jpg'
import candlelitHallImg from '../../assets/images/decor 6.jpg'
import kwanjulaCakeImg from '../../assets/images/1.jpg'
import weddingCakeImg from '../../assets/images/wd 1.jpg'
import crystalWeddingCakeImg from '../../assets/images/wd 2.jpg'
import blackGoldCakeImg from '../../assets/images/gd 2.jpg'

const TOTAL_HERO_CHARS = 18

const heroLine1 = [
  {
    word: 'ARTFUL',
    chars: [
      { char: 'A', index: 0 },
      { char: 'R', index: 1 },
      { char: 'T', index: 2 },
      { char: 'F', index: 3 },
      { char: 'U', index: 4 },
      { char: 'L', index: 5 },
    ],
  },
  {
    word: 'SPACES',
    chars: [
      { char: 'S', index: 6 },
      { char: 'P', index: 7 },
      { char: 'A', index: 8 },
      { char: 'C', index: 9 },
      { char: 'E', index: 10 },
      { char: 'S', index: 11 },
    ],
  },
]

const heroLine2 = [
  {
    word: 'STYLED.',
    chars: [
      { char: 'S', index: 12 },
      { char: 'T', index: 13 },
      { char: 'Y', index: 14 },
      { char: 'L', index: 15 },
      { char: 'E', index: 16 },
      { char: 'D', index: 17 },
      { char: '.', index: 18 },
    ],
  },
]

function AnimatedEditorialKicker({ cycle, phase }) {
  const isDeleting = phase === 'deleting'
  const letterClass = isDeleting ? 'editorial-letter-deleting' : 'editorial-letter'
  const getDelay = (index) =>
    isDeleting
      ? `${(TOTAL_HERO_CHARS - index) * 0.04}s`
      : `${index * 0.06}s`

  return (
    <span className="inline-flex flex-wrap items-center gap-x-[0.32em] tracking-[0.18em] uppercase font-serif text-xs sm:text-sm text-primary-gold">
      {heroLine1.map((item, wordIdx) => (
        <span key={`hk1-${item.word}`} className="inline-block whitespace-nowrap">
          {item.chars.map((c) => (
            <span
              key={`hk1-${wordIdx}-${c.index}-${cycle}-${phase}`}
              className={letterClass}
              style={{ animationDelay: getDelay(c.index) }}
              aria-hidden="true"
            >
              {c.char}
            </span>
          ))}
        </span>
      ))}
      <span className="inline-block whitespace-nowrap">
        {heroLine2[0].chars.map((c) => (
          <span
            key={`hk2-${c.index}-${cycle}-${phase}`}
            className={letterClass}
            style={{ animationDelay: getDelay(c.index) }}
            aria-hidden="true"
          >
            {c.char}
          </span>
        ))}
      </span>
    </span>
  )
}

const heroShowcases = [
  {
    id: 'canopy',
    label: '01 / Starlit Reception Canopy',
    kicker: 'Full-Hall Architecture',
    title: 'Ceiling Voile Swags & Candlelit Banquet Tables',
    caption: 'Warm fairy-light drapery and floral centerpieces composed for grand evening receptions.',
    mainImage: receptionCanopyImg,
    mainAlt: 'Warm candlelit reception hall with fairy-lit ceiling drapery, floral table centerpieces, and Chiavari chairs',
    insetImage: lanternTableImg,
    insetAlt: 'Reception banquet table centerpiece featuring a bronze lantern, white roses, and votive candles',
    palette: [
      { name: 'Warm Champagne', hex: '#EFC767' },
      { name: 'Blush Rose', hex: '#E8B4B8' },
      { name: 'Ivory Voile', hex: '#F7F3EB' },
    ],
  },
  {
    id: 'sweetheart',
    label: '02 / Bridal Sweetheart Stage',
    kicker: 'Stage & Backdrop Design',
    title: 'Olive Satin Drapery & Botanical Hoop Framing',
    caption: 'Intimate head-table focal points layered with hanging geometric lanterns and cascading white roses.',
    mainImage: sweetheartStageImg,
    mainAlt: 'Sweetheart bridal head table styled with olive green drapery, glowing fairy lights, hanging lanterns, white roses, and pillar candles',
    insetImage: candlelitHallImg,
    insetAlt: 'Wide view of reception hall styled with olive-draped banquet tables and fairy-light backdrop',
    palette: [
      { name: 'Olive Foliage', hex: '#4A5D3F' },
      { name: 'Antique Gold', hex: '#DEAC4B' },
      { name: 'alabaster White', hex: '#F4F1EA' },
    ],
  },
  {
    id: 'kwanjula',
    label: '03 / Kwanjula & Garden Marquee',
    kicker: 'Ceremonial & Table Styling',
    title: 'Terracotta, Amber & Gold-Rimmed Place Settings',
    caption: 'Vibrant marquee styling with bespoke couple backdrops, gold flatware, and fresh amber florals.',
    mainImage: goldTableSettingImg,
    mainAlt: 'Outdoor marquee banquet table set with gold-rimmed glass chargers, coral napkins, gold flatware, orange roses, and floral arch backdrop',
    insetImage: coralFloralHallImg,
    insetAlt: 'Sunlit reception room with round white-draped banquet tables and tall coral floral centerpieces',
    palette: [
      { name: 'Terracotta Linen', hex: '#D96B43' },
      { name: 'Marigold Bloom', hex: '#E59A3A' },
      { name: 'Polished Brass', hex: '#C8963E' },
    ],
  },
]

const stylingCategories = [
  { id: 'all', label: 'All Styling' },
  { id: 'weddings', label: 'Wedding Receptions' },
  { id: 'traditional', label: 'Kwanjula & Cultural' },
  { id: 'tablescapes', label: 'Floral & Tablescapes' },
  { id: 'milestones', label: 'Milestone Celebrations' },
]

const portfolioStudies = [
  {
    id: 'sweetheart-stage',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    tag: 'Bridal Stage & Canopy',
    title: 'Olive & Ivory Sweetheart Backdrop',
    venueType: 'Indoor Salon or Marquee Stage',
    guestScale: 'Intimate to Grand (50–350+ Guests)',
    description:
      'Asymmetrical satin olive drapery, warm fairy-light curtain walls, hanging geometric lanterns, and cascading white rose arrangements anchored by cylinder pillar candles.',
    highlights: [
      'Custom gold hoop signage & warm curtain lighting',
      'Floor-to-ceiling asymmetrical satin & sheer voile draping',
      'Fresh white roses, hydrangeas & tropical palm foliage',
    ],
    palette: [
      { name: 'Olive Satin', hex: '#4D5D3B' },
      { name: 'Warm Fairy Gold', hex: '#EFC767' },
      { name: 'Ivory Rose', hex: '#F7F4EE' },
    ],
    image: sweetheartStageImg,
    alt: 'Sweetheart bridal head table styled with olive green drapery, glowing fairy lights, hanging lanterns, white roses, and pillar candles',
  },
  {
    id: 'candlelit-canopy',
    category: 'weddings',
    occasionParam: 'Wedding Reception',
    tag: 'Full-Hall Reception',
    title: 'Starlit Canopy & Banquet Styling',
    venueType: 'Banquet Hall or Evening Pavilion',
    guestScale: 'Medium to Large (100–400+ Guests)',
    description:
      'Sweeping ceiling voile swags interwoven with warm string lighting, paired with pastel rose centerpieces, crystal stemware, and limewashed Chiavari seating.',
    highlights: [
      'Architectural ceiling voile swags & string-light canopy',
      'Low conversational rose & baby’s-breath table arrangements',
      'Clustered glass votive & pillar candle illumination',
    ],
    palette: [
      { name: 'Champagne Voile', hex: '#F3E5C8' },
      { name: 'Blush Petal', hex: '#E6B8B7' },
      { name: 'Warm Candlelight', hex: '#DEAC4B' },
    ],
    image: receptionCanopyImg,
    alt: 'Warm candlelit reception hall with fairy-lit ceiling drapery, floral table centerpieces, and Chiavari chairs',
  },
  {
    id: 'kwanjula-royal',
    category: 'traditional',
    occasionParam: 'Kwanjula / Introduction',
    tag: 'Kwanjula & Introduction',
    title: 'Ceremonial Pavilion & Guest Tableaux',
    venueType: 'Garden Tent or Homestead Pavilion',
    guestScale: 'Traditional Gathering (100–500+ Guests)',
    description:
      'Warm terracotta, amber, and gold-accented marquee styling honoring cultural heritage with statement floral columns, custom couple backdrop signage, and fine guest banquet settings.',
    highlights: [
      'Custom arched couple backdrop with twin floral pillars',
      'Gold-beaded glass chargers, gold cutlery & terracotta linens',
      'Coordinated ceiling pleated lining & suspended floral accents',
    ],
    palette: [
      { name: 'Terracotta Silk', hex: '#E07048' },
      { name: 'Amber Rose', hex: '#D9822B' },
      { name: 'Imperial Gold', hex: '#DEAC4B' },
    ],
    image: goldTableSettingImg,
    alt: 'Outdoor marquee banquet table set with gold-rimmed glass chargers, coral napkins, gold flatware, orange roses, and floral arch backdrop',
  },
  {
    id: 'lantern-tablescape',
    category: 'tablescapes',
    occasionParam: 'Table & Floral Styling',
    tag: 'Centerpiece Architecture',
    title: 'Bronze Lantern & White Rose Tablescape',
    venueType: 'Banquet Rounds or Long Estate Tables',
    guestScale: 'Modular per Guest Table Count',
    description:
      'Intimate guest table styling anchored by warm bronze lanterns, ivory and blush roses, glass votives, and sage satin chair sashes facing a draped bridal head table.',
    highlights: [
      'Vintage bronze lantern centerpieces with pillar candles',
      '360-degree fresh white rose, lisianthus & eucalyptus rings',
      'Coordinated sage-green chair sashes & botanical napkin ties',
    ],
    palette: [
      { name: 'Sage Ribbon', hex: '#7A8B74' },
      { name: 'Aged Bronze', hex: '#A36733' },
      { name: 'Cream Linen', hex: '#EFECE6' },
    ],
    image: lanternTableImg,
    alt: 'Reception banquet table centerpiece featuring a bronze lantern, white roses, votive candles, and draped head table',
  },
  {
    id: 'coral-garden-salon',
    category: 'milestones',
    occasionParam: 'Milestone Celebration',
    tag: 'Milestone & Daytime Banquets',
    title: 'Sunlit Coral & Marigold Reception Salon',
    venueType: 'Daylight Ballroom or Garden Conservatory',
    guestScale: 'Intimate to Medium (40–200 Guests)',
    description:
      'Elevated glass-vase floral clouds in vibrant coral, peach, and marigold tones paired with draped chair ties and a sculptural asymmetrical floral arch.',
    highlights: [
      'Tall clear-pedestal floral clouds for unobstructed conversation',
      'Statement asymmetrical floral arch for guest photography',
      'Draped coral chiffon chair backs & matching table napkins',
    ],
    palette: [
      { name: 'Coral Blossom', hex: '#F06E5B' },
      { name: 'Marigold Glow', hex: '#F59E3F' },
      { name: 'Crisp White', hex: '#FFFFFF' },
    ],
    image: coralFloralHallImg,
    alt: 'Sunlit reception room with round white-draped banquet tables, tall lush coral and orange floral centerpieces, and coral chair sashes',
  },
  {
    id: 'grand-ballroom-ensemble',
    category: 'traditional',
    occasionParam: 'Full-Venue Styling',
    tag: 'Grand Venue Transformation',
    title: 'Emerald & Champagne Ballroom Panorama',
    venueType: 'Large Reception Hall or Hotel Ballroom',
    guestScale: 'Grand Scale (150–500+ Guests)',
    description:
      'Full-room spatial composition uniting suspended botanical chandeliers, an illuminated extended bridal table, olive satin table linens, and a central cake-cutting stage.',
    highlights: [
      'Dedicated central cake table with cascading greenery & candles',
      'Extended multi-couple or bridal-party illuminated head table',
      'Suspended greenery chandeliers & full-room linen coordination',
    ],
    palette: [
      { name: 'Deep Olive', hex: '#556044' },
      { name: 'Champagne Gold', hex: '#EFC767' },
      { name: 'Espresso Canvas', hex: '#231F1C' },
    ],
    image: candlelitHallImg,
    alt: 'Candlelit reception hall styled with ceiling drapery, warm fairy lights, and olive-draped banquet tables',
  },
]

const cakeAndDecorPairings = [
  {
    id: 'ivory-ballroom',
    label: 'Ivory & Champagne Ballroom',
    occasion: 'Wedding Receptions',
    venueTitle: 'Starlit Voile Canopy & Lantern Tables',
    venueImage: lanternTableImg,
    venueAlt: 'Reception banquet table with bronze lantern, white roses, and fairy-lit head table',
    cakeTitle: 'Four-Tier Ivory Magnolia & Crystal Cake',
    cakeImage: crystalWeddingCakeImg,
    cakeAlt: 'Four-tier ivory wedding cake adorned with handcrafted white sugar magnolias and crystal accents',
    harmonyNote:
      'Hand-sculpted sugar magnolias and champagne-gold accents on the cake mirror the white rose table rings and warm fairy-lit ceiling drapery across the hall.',
    sharedElements: ['White & Blush Rose Palette', 'Warm Gold Pedestal & Chargers', 'Candlelit Cake Stage Framing'],
  },
  {
    id: 'kwanjula-heritage',
    label: 'Kwanjula Royal Heritage',
    occasion: 'Introduction Ceremonies',
    venueTitle: 'Terracotta, Amber & Gold Marquee',
    venueImage: goldTableSettingImg,
    venueAlt: 'Marquee banquet table with gold-rimmed chargers, coral napkins, and amber floral arch',
    cakeTitle: 'Bespoke Barkcloth & Gomasi Tiered Cake',
    cakeImage: kwanjulaCakeImg,
    cakeAlt: 'Two-tier Ugandan cultural cake featuring textured barkcloth bottom tier and traditional striped Gomasi top tier',
    harmonyNote:
      'Rich cultural textures—from the sculpted Olubugo barkcloth tier to vibrant traditional stripes—are echoed in the warm amber roses, terracotta linens, and gold-rimmed tableware.',
    sharedElements: ['Warm Earth & Gold Tones', 'Ceremonial Stage Placement', 'Cultural Motif Coordination'],
  },
  {
    id: 'emerald-soiree',
    label: ' Botanical & Gold Soirée',
    occasion: 'Evening Milestones & Galas',
    venueTitle: 'Olive Satin Drapery & Botanical Hoop',
    venueImage: sweetheartStageImg,
    venueAlt: 'Sweetheart stage with olive drapery, glowing fairy lights, and white roses',
    cakeTitle: 'Matte Black & 24k Gold-Leaf Tiered Cake',
    cakeImage: blackGoldCakeImg,
    cakeAlt: 'Three-tier matte black and gold drip celebration cake with gold leaf on a brass pedestal',
    harmonyNote:
      'Dramatic architectural contrast: metallic gold-leaf brushwork and brass cake pedestals pair with geometric hanging lanterns, deep olive drapery, and warm pillar candlelight.',
    sharedElements: ['Geometric Brass & Gold Accents', 'Lush Monstera & Rose Greenery', 'Chiaroscuro Evening Lighting'],
  },
]

export default function DecorationsPage() {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePairingIdx, setActivePairingIdx] = useState(0)
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [cycle, setCycle] = useState(0)
  const [phase, setPhase] = useState('writing')

  // Progressive letter animation cycle matching HomePage
  useEffect(() => {
    let deleteTimerId
    let rewriteTimerId

    const startCycle = () => {
      setPhase('writing')
      deleteTimerId = setTimeout(() => {
        setPhase('deleting')
        rewriteTimerId = setTimeout(() => {
          setCycle((prev) => prev + 1)
          startCycle()
        }, 1250)
      }, 4200)
    }

    startCycle()

    return () => {
      clearTimeout(deleteTimerId)
      clearTimeout(rewriteTimerId)
    }
  }, [])

  // Close lightbox modal on Escape key
  useEffect(() => {
    if (!selectedStudy) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedStudy(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedStudy])

  const currentHero = heroShowcases[activeHeroIdx]
  const currentPairing = cakeAndDecorPairings[activePairingIdx]

  const filteredStudies =
    activeCategory === 'all'
      ? portfolioStudies
      : portfolioStudies.filter((item) => item.category === activeCategory)

  return (
    <div className="w-full font-sans bg-dark-canvas text-brand-white">
      {/* ===================================================================
          SCENE 1 — Interactive Architectural Atelier Hero
          (Combines HomePage Scene 1 Progressive Type + Scene 2 Editorial Depth)
          =================================================================== */}
      <section
        aria-label="Scene 1 — Event Decoration & Venue Styling Hero"
        className="relative w-full min-h-[680px] lg:min-h-[860px] flex flex-col justify-between overflow-hidden bg-dark-canvas border-b border-bronze/25"
      >
        {/* High-Resolution Full-Bleed Ballroom Background with Active Showcase Crossfade */}
        <img
          src="/scene2_celebration_bg.jpg"
          alt="Opulent candlelit ballroom floral setting with gold arch and tiered celebration cake"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 pointer-events-none select-none"
        />

        {/* Ambient Studio Chiaroscuro Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#141210] via-[#141210]/90 to-[#141210]/65 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#141210] to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#141210] via-[#141210]/85 to-transparent pointer-events-none"
        />

        {/* Main Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (Cols 1-6): Editorial Headline, Narrative & CTAs */}
            <div className="lg:col-span-6 flex flex-col items-center text-center sm:items-start sm:text-left">
              {/* Progressive Animated Gold Kicker inspired by HomePage Scene 1 */}
              <div className="flex items-center gap-3 mb-4 min-h-[24px]">
                <span aria-hidden="true" className="w-7 h-[1px] bg-primary-gold/70" />
                <AnimatedEditorialKicker cycle={cycle} phase={phase} />
              </div>

              <h1 className="font-serif font-normal text-3xl sm:text-5xl xl:text-[3.85rem] leading-[1.1] tracking-tight break-words">
                <span className="block text-white">Where Every Space</span>
                <span className="block text-primary-gold font-serif mt-1.5">
                  Becomes a Celebration,
                </span>
                <span className="block text-white mt-1.5">Thoughtfully Styled.</span>
              </h1>

              {/* Editorial Accent Line */}
              <div
                aria-hidden="true"
                className="w-14 h-[1px] bg-primary-gold/60 my-6 sm:my-7 mx-auto sm:mx-0"
              />

              <p className="font-sans text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-xl mb-8 font-normal">
                From sweeping reception canopies and ceremonial Kwanjula stages to candlelit floral tablescapes, our Kampala atelier composes full-room environments with the same bespoke artistry as our signature cakes.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3.5 sm:gap-4 w-full max-w-xs sm:max-w-lg">
                <Link
                  to="/decorations/enquire"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xs text-xs sm:text-sm font-semibold tracking-wider uppercase bg-primary-gold text-[#141210] hover:bg-gold-highlight hover:shadow-[0_4px_24px_rgba(222,172,75,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
                >
                  Enquire About Event Decor
                </Link>
                <a
                  href="#styling-portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xs text-xs sm:text-sm font-semibold tracking-wider uppercase border border-primary-gold/60 text-champagne-gold hover:border-primary-gold hover:text-white hover:bg-primary-gold/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
                >
                  Explore Styling Portfolio
                </a>
              </div>

              {/* Key Atelier Credentials Ledger */}
              <div className="w-full max-w-lg mt-10 pt-6 border-t border-bronze/30 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <span className="block font-serif text-base sm:text-lg text-champagne-gold font-semibold">
                    Full-Room
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Stage, canopy &amp; tables
                  </span>
                </div>
                <div className="border-x border-bronze/25 px-3 sm:border-r-0 sm:pl-4">
                  <span className="block font-serif text-base sm:text-lg text-champagne-gold font-semibold">
                    Cake + Decor
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Unified colour story
                  </span>
                </div>
                <div className="sm:border-l sm:border-bronze/25 sm:pl-4">
                  <span className="block font-serif text-base sm:text-lg text-champagne-gold font-semibold">
                    Since 2014
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Kampala event atelier
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Cols 7-12): Interactive Stepped Lookbook Stage */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative grid grid-cols-12 gap-4 items-end">
                {/* Main Tall Architectural Study (Cols 1-8) */}
                <div className="col-span-8 sm:col-span-8">
                  <div className="border border-bronze/40 bg-[#181512] p-2 sm:p-2.5 rounded-sm shadow-2xl">
                    <div className="relative overflow-hidden rounded-xs">
                      <img
                        key={currentHero.id}
                        src={currentHero.mainImage}
                        alt={currentHero.mainAlt}
                        className="w-full aspect-3/4 object-cover object-center block select-none transition-all duration-500"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-transparent to-transparent"
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                        <div>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                            {currentHero.kicker}
                          </span>
                          <p className="font-serif text-sm sm:text-base text-brand-white leading-snug mt-0.5">
                            {currentHero.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlapping Secondary Detail Study + Palette Card (Cols 9-12) */}
                <div className="col-span-4 flex flex-col gap-4 -ml-6 sm:-ml-8 relative z-20 pb-2">
                  {/* Palette Swatch Plaque */}
                  <div className="bg-[#141210]/95 backdrop-blur-xs border border-primary-gold/40 p-3 sm:p-4 rounded-sm shadow-2xl">
                    <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-champagne-gold mb-2">
                      Palette Study
                    </span>
                    <div className="space-y-1.5">
                      {currentHero.palette.map((swatch) => (
                        <div key={swatch.name} className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="w-3 h-3 rounded-full border border-white/25 shrink-0"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <span className="font-sans text-[10px] sm:text-[11px] text-gray-300 truncate">
                            {swatch.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Framed Image */}
                  <div className="border-4 border-dark-canvas bg-[#181512] rounded-sm shadow-2xl overflow-hidden">
                    <img
                      key={`${currentHero.id}-inset`}
                      src={currentHero.insetImage}
                      alt={currentHero.insetAlt}
                      className="w-full aspect-4/3 object-cover block select-none"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Lookbook Switcher Tabs Under Hero Stage */}
              <div
                role="tablist"
                aria-label="Switch featured decoration showcase"
                className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5"
              >
                {heroShowcases.map((item, idx) => {
                  const isSelected = activeHeroIdx === idx
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveHeroIdx(idx)}
                      className={`text-left px-3.5 py-2.5 rounded-xs border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                        isSelected
                          ? 'bg-[#1F1B17] border-primary-gold text-brand-white shadow-lg'
                          : 'bg-[#161311]/80 border-bronze/25 text-gray-400 hover:text-gray-200 hover:border-bronze/50'
                      }`}
                    >
                      <span
                        className={`block font-mono text-[10px] uppercase tracking-[0.16em] ${
                          isSelected ? 'text-primary-gold font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block font-serif text-xs text-gray-200 truncate mt-0.5">
                        {item.kicker}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 2 — The Stepped Horizon: Spatial Architecture & Tableaux
          (Directly inspired by HomePage Scene 4 asymmetric stepped composition)
          =================================================================== */}
      <section
        aria-label="Scene 2 — Spatial Architecture and Tableaux"
        className="relative w-full bg-dark-canvas text-brand-white overflow-hidden py-20 sm:py-24 lg:py-32"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop & Tablet Balanced Editorial Layout (md and up) */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-start">
            {/* Left Wing (Cols 1-7): Headline, Intro & Stepped Styling Triad */}
            <div className="md:col-span-7 flex flex-col">
              <div data-aos="fade-up" className="mb-8 lg:mb-12 max-w-xl">
                <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-champagne-gold font-semibold block mb-2">
                  Equal Artistry &bull; Venue &amp; Table
                </span>
                <h2 className="font-serif font-normal text-3xl lg:text-5xl xl:text-[3.25rem] text-primary-gold leading-[1.1] tracking-tight">
                  Rooms Transformed With Intention.
                </h2>
                <p className="font-sans text-sm lg:text-base text-gray-300 leading-relaxed mt-3.5 font-normal">
                  Whether transforming an open garden marquee for a traditional Kwanjula or draping a candlelit ballroom for a wedding reception, every fabric swag, floral stem, and place setting is composed as part of a single visual story.
                </p>
              </div>

              {/* Stepped Decor Triad: Left Supporting Studies + Tall Center-Left Stage Anchor */}
              <div className="grid grid-cols-12 gap-5 lg:gap-7 items-start">
                {/* Supporting Studies Column */}
                <div className="col-span-5 flex flex-col">
                  {/* Upper-Left Step: Place Setting & Chargers */}
                  <div data-aos="fade-up" data-aos-delay="100" className="w-full">
                    <img
                      src={goldTableSettingImg}
                      alt="Banquet table set with gold-rimmed glass chargers, coral linen napkins, gold flatware, and amber floral arrangements"
                      className="w-full aspect-4/5 object-cover rounded-sm shadow-2xl block"
                    />
                  </div>

                  {/* Lower-Left Step: Sunlit Floral Reception */}
                  <div data-aos="fade-up" data-aos-delay="200" className="w-[88%] mt-6 lg:mt-8">
                    <img
                      src={coralFloralHallImg}
                      alt="Sunlit reception salon with elevated coral and marigold floral centerpieces and draped chairs"
                      className="w-full aspect-4/5 object-cover rounded-sm shadow-2xl block"
                    />
                  </div>
                </div>

                {/* Primary Tall Stage Photograph (Center-Left Rising Anchor) */}
                <div data-aos="fade-up" data-aos-delay="150" className="col-span-7 -mt-2 lg:-mt-6 flex flex-col">
                  <div className="w-full">
                    <img
                      src={sweetheartStageImg}
                      alt="Sweetheart bridal stage styled with olive green drapery, fairy-light curtain, gold hoop signage, and white roses"
                      className="w-full aspect-2/3 object-cover rounded-sm shadow-2xl block"
                    />
                  </div>

                  {/* Subtle Pathway to Enquiry Consultation */}
                  <div className="mt-6 lg:mt-8">
                    <Link
                      to="/decorations/enquire"
                      className="inline-flex items-center gap-2 text-xs lg:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-primary-gold hover:text-gold-highlight border-b border-primary-gold/40 hover:border-gold-highlight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                    >
                      <span>Request Styling Consultation</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Wing (Cols 8-12): Prominent Full-Room Canopy & Overlapping Lantern Study */}
            <div className="md:col-span-5 md:mt-2 flex flex-col">
              {/* Primary Immersive Canopy Feature */}
              <div data-aos="fade-left" data-aos-delay="150" className="w-full">
                <img
                  src={receptionCanopyImg}
                  alt="Warm candlelit reception hall with fairy-lit ceiling drapery, floral table centerpieces, and Chiavari chairs"
                  className="w-full aspect-3/4 object-cover object-center rounded-sm shadow-2xl block"
                />
              </div>

              {/* Overlapping Secondary Lantern Centerpiece Study */}
              <div
                data-aos="fade-up"
                data-aos-delay="260"
                className="relative z-10 -mt-16 lg:-mt-24 -ml-6 lg:-ml-12 w-[68%] max-w-[320px] border-4 border-dark-canvas rounded-sm shadow-2xl"
              >
                <img
                  src={lanternTableImg}
                  alt="Reception banquet table centerpiece featuring a bronze lantern, white roses, votive candles, and draped head table"
                  className="w-full aspect-4/3 object-cover block"
                />
              </div>

              {/* Discipline Summary Ledger Under Right Wing */}
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-8 bg-[#181512] border border-bronze/30 p-5 rounded-sm shadow-xl"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold block mb-2">
                  Signature Styling Scope
                </span>
                <ul className="space-y-2 text-xs text-gray-300 font-sans">
                  <li className="flex items-center justify-between border-b border-bronze/20 pb-2">
                    <span>Bridal &amp; Kwanjula Stages</span>
                    <span className="text-champagne-gold font-serif italic">Bespoke</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-bronze/20 pb-2">
                    <span>Ceiling Drapery &amp; Chandeliers</span>
                    <span className="text-champagne-gold font-serif italic">Full-Venue</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Floral &amp; Candlelit Tablescapes</span>
                    <span className="text-champagne-gold font-serif italic">Coordinated</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Balanced Editorial Recomposition (< 768px) */}
          <div className="md:hidden flex flex-col">
            <div data-aos="fade-up" className="mb-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-champagne-gold font-semibold block mb-1.5">
                Equal Artistry &bull; Venue &amp; Table
              </span>
              <h2 className="font-serif font-normal text-3xl sm:text-4xl text-primary-gold leading-[1.12] tracking-tight">
                Rooms Transformed With Intention.
              </h2>
              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 font-normal">
                Whether transforming an open garden marquee for a traditional Kwanjula or draping a candlelit ballroom for a wedding reception, every element is composed as one visual story.
              </p>
            </div>

            {/* Stepped Cluster on Mobile */}
            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col">
              <div className="flex items-start justify-between gap-3.5">
                <div className="w-[56%] shrink-0">
                  <img
                    src={sweetheartStageImg}
                    alt="Sweetheart bridal stage styled with olive green drapery, fairy-light curtain, and white roses"
                    className="w-full aspect-2/3 object-cover rounded-sm shadow-2xl block"
                  />
                </div>

                <div className="w-[41%] mt-8">
                  <img
                    src={goldTableSettingImg}
                    alt="Banquet table set with gold-rimmed glass chargers, coral napkins, and floral arrangements"
                    className="w-full aspect-4/5 object-cover rounded-sm shadow-2xl block"
                  />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 -mt-6 pl-[6%]">
                <div className="w-[50%] border-4 border-dark-canvas rounded-sm shadow-2xl relative z-10">
                  <img
                    src={coralFloralHallImg}
                    alt="Sunlit reception salon with elevated coral and marigold floral centerpieces"
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

            {/* Mobile Canopy & Lantern Wing */}
            <div data-aos="fade-up" data-aos-delay="150" className="mt-12 flex flex-col">
              <div className="w-full">
                <img
                  src={receptionCanopyImg}
                  alt="Warm candlelit reception hall with fairy-lit ceiling drapery and floral table centerpieces"
                  className="w-full aspect-3/4 object-cover object-center rounded-sm shadow-2xl block"
                />
              </div>

              <div className="flex items-end justify-between gap-4 -mt-12 pl-3">
                <div className="w-[58%] max-w-[220px] border-4 border-dark-canvas rounded-sm shadow-2xl relative z-10">
                  <img
                    src={lanternTableImg}
                    alt="Reception banquet table centerpiece featuring a bronze lantern and white roses"
                    className="w-full aspect-4/3 object-cover block"
                  />
                </div>

                <div className="pb-1 shrink-0">
                  <a
                    href="#styling-portfolio"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-champagne-gold hover:text-gold-highlight border-b border-primary-gold/40 pb-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                  >
                    <span>View Portfolio</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 3 — Curated Celebration Portfolio, Palette Swatches & Lightbox
          =================================================================== */}
      <section
        id="styling-portfolio"
        aria-label="Scene 3 — Curated Celebration Styling Portfolio"
        className="relative w-full bg-[#161311] text-brand-white border-t border-bronze/25 py-20 sm:py-24 lg:py-28 overflow-hidden scroll-mt-20"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Section Header + Interactive Occasion Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div data-aos="fade-up" className="max-w-2xl">
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-primary-gold font-semibold block mb-2">
                Curated Portfolio &bull; Celebration Disciplines
              </span>
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-brand-white leading-[1.12] tracking-tight">
                Styled for the Moments <span className="text-primary-gold">That Matter.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-gray-300/90 leading-relaxed mt-3">
                Filter our event styling studies by celebration discipline or click any setting to inspect its floral architecture, colour palette, and venue specifications.
              </p>
            </div>

            {/* Interactive Category Filter Bar */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              role="tablist"
              aria-label="Filter decoration portfolio by occasion"
              className="flex flex-wrap items-center gap-2"
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
                    className={`px-4 py-2.5 rounded-xs text-xs font-sans uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                      isActive
                        ? 'bg-primary-gold text-[#141210] font-semibold shadow-[0_2px_16px_rgba(222,172,75,0.3)]'
                        : 'bg-[#1C1916] text-gray-300 border border-bronze/35 hover:border-primary-gold/60 hover:text-gold-highlight'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Framed Atelier Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredStudies.map((study, index) => (
              <article
                key={study.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 80}
                className="group bg-[#141210] border border-bronze/35 hover:border-primary-gold/60 rounded-sm overflow-hidden flex flex-col justify-between shadow-2xl transition-colors duration-300"
              >
                <div>
                  {/* Framed Image Header with Quick-Inspect Trigger */}
                  <div className="p-2 pb-0 bg-[#181512]">
                    <div className="relative overflow-hidden rounded-xs">
                      <img
                        src={study.image}
                        alt={study.alt}
                        className="w-full aspect-4/5 object-cover object-center block transition-transform duration-700 group-hover:scale-105 select-none"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent opacity-85"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#141210]/85 backdrop-blur-xs border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.18em] text-champagne-gold">
                        {study.tag}
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#141210]/90 hover:bg-primary-gold text-champagne-gold hover:text-[#141210] border border-primary-gold/50 rounded-xs text-[10px] font-sans font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
                      >
                        Inspect Study +
                      </button>
                    </div>
                  </div>

                  {/* Narrative Body */}
                  <div className="p-6">
                    {/* Palette Swatches Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5" aria-label="Color palette swatches">
                        {study.palette.map((swatch) => (
                          <span
                            key={swatch.name}
                            title={swatch.name}
                            className="w-3.5 h-3.5 rounded-full border border-white/25 inline-block"
                            style={{ backgroundColor: swatch.hex }}
                          />
                        ))}
                        <span className="text-[11px] text-gray-400 font-sans ml-1">
                          {study.palette.map((s) => s.name.split(' ')[0]).join(' · ')}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif font-semibold text-xl text-primary-gold group-hover:text-gold-highlight transition-colors leading-snug mb-2">
                      {study.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed mb-5">
                      {study.description}
                    </p>

                    {/* Architectural Highlights List */}
                    <ul className="border-t border-bronze/25 pt-4 space-y-2">
                      {study.highlights.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-xs text-gray-300 font-sans"
                        >
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full bg-primary-gold/80 shrink-0 mt-1.5"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Pathway */}
                <div className="px-6 py-4 bg-[#181512]/60 flex items-center justify-between gap-3 border-t border-bronze/20">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(study)}
                    className="text-xs font-sans text-gray-400 hover:text-brand-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded px-1 py-1"
                  >
                    View Specifications
                  </button>

                  <Link
                    to={`/decorations/enquire?style=${encodeURIComponent(study.title)}&occasion=${encodeURIComponent(study.occasionParam)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-primary-gold hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold py-1"
                  >
                    <span>Enquire</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 4 — Interactive Cake & Venue Harmony Studio
          (Showcases Equal Prominence of Cakes & Event Styling Under One Roof)
          =================================================================== */}
      <section
        aria-label="Scene 4 — Cake and Venue Harmony Studio"
        className="relative w-full bg-dark-canvas text-brand-white border-t border-bronze/25 py-20 sm:py-24 lg:py-28 overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (Cols 1-5): Harmony Controls & Narrative */}
            <div data-aos="fade-right" className="lg:col-span-5">
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-primary-gold font-semibold block mb-2">
                The Zuena Distinction &bull; Paired Curation
              </span>
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-[2.75rem] text-brand-white leading-[1.14] tracking-tight">
                When Cake &amp; Room Speak the <span className="text-primary-gold">Same Language.</span>
              </h2>
              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3.5 mb-7">
                Because our bakers and event stylists work side by side in our Kampala atelier, your centerpiece cake is never an afterthought—its sugar florals, textures, and pedestal staging are designed to echo the surrounding room.
              </p>

              {/* Interactive Pairing Selector Buttons */}
              <div
                role="tablist"
                aria-label="Select Cake and Venue Pairing Theme"
                className="space-y-3 mb-7"
              >
                {cakeAndDecorPairings.map((pair, idx) => {
                  const isSelected = activePairingIdx === idx
                  return (
                    <button
                      key={pair.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActivePairingIdx(idx)}
                      className={`w-full text-left p-4 rounded-sm border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold ${
                        isSelected
                          ? 'bg-[#1B1815] border-l-2 border-l-primary-gold border-t-bronze/40 border-r-bronze/40 border-b-bronze/40 shadow-xl'
                          : 'bg-[#161311] border-bronze/20 text-gray-400 hover:border-bronze/45 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif font-semibold text-base text-primary-gold">
                          {pair.label}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-champagne-gold px-2 py-0.5 bg-bronze/15 rounded-xs">
                          {pair.occasion}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-gray-300 mt-1.5 leading-relaxed">
                        {pair.harmonyNote}
                      </p>
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`/decorations/enquire?style=${encodeURIComponent(currentPairing.label)}&occasion=${encodeURIComponent(currentPairing.occasion)}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-[0.16em] uppercase text-primary-gold hover:text-gold-highlight border-b border-primary-gold/40 hover:border-gold-highlight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                >
                  <span>Enquire About This Pairing</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Column (Cols 6-12): Dual Framed Venue + Cake Diptych */}
            <div data-aos="fade-left" data-aos-delay="120" className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-[#181512] border border-bronze/35 p-4 sm:p-6 rounded-sm shadow-2xl">
                {/* Venue Card (Cols 1-7) */}
                <div className="sm:col-span-7 flex flex-col">
                  <div className="relative overflow-hidden rounded-xs border border-bronze/30">
                    <img
                      key={`${currentPairing.id}-venue`}
                      src={currentPairing.venueImage}
                      alt={currentPairing.venueAlt}
                      className="w-full aspect-4/5 object-cover object-center block select-none"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#141210]/85 backdrop-blur-xs border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.18em] text-champagne-gold">
                      01 &bull; Venue Styling
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-brand-white mt-3">
                    {currentPairing.venueTitle}
                  </h3>
                </div>

                {/* Matched Centerpiece Cake Card (Cols 8-12) */}
                <div className="sm:col-span-5 flex flex-col">
                  <div className="relative overflow-hidden rounded-xs border border-primary-gold/40">
                    <img
                      key={`${currentPairing.id}-cake`}
                      src={currentPairing.cakeImage}
                      alt={currentPairing.cakeAlt}
                      className="w-full aspect-4/5 object-cover object-top block select-none"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#141210]/85 backdrop-blur-xs border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.18em] text-primary-gold">
                      02 &bull; Paired Cake
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-primary-gold mt-3">
                    {currentPairing.cakeTitle}
                  </h3>

                  {/* Shared Harmony Tags */}
                  <div className="mt-4 pt-3 border-t border-bronze/25 space-y-1.5">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                      Coordinated Elements:
                    </span>
                    {currentPairing.sharedElements.map((el) => (
                      <div key={el} className="flex items-center gap-2 text-xs text-gray-300">
                        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary-gold" />
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 5 — Inside the Styling Craft: Composed in Every Layer
          (Directly inspired by HomePage Scene 3 Specimen Callouts & Plaque)
          =================================================================== */}
      <section
        aria-label="Scene 5 — Inside the Styling Craft: Composed in Every Layer"
        className="relative w-full md:min-h-[860px] lg:min-h-[920px] flex flex-col justify-between overflow-hidden bg-dark-canvas border-t border-bronze/25"
      >
        {/* MOBILE LAYOUT (< 768px) — Tall Open Photo + Minimal Glass Card */}
        <div className="md:hidden relative w-full min-h-[620px] flex flex-col justify-between overflow-hidden">
          <div className="relative w-full h-[380px] overflow-hidden">
            <img
              src="/scene2_celebration_bg.jpg"
              alt="Tiered white celebration cake on a gold pedestal surrounded by white roses and candlelit ballroom floral arches"
              className="w-full h-full object-cover object-[72%_center] block select-none"
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
                Inside the Styling Craft
              </span>
              <h2 className="font-serif font-normal text-2xl text-brand-white leading-tight">
                Unified Cake &amp; Venue Harmony.
              </h2>
              <p className="font-sans text-xs text-gray-300 leading-relaxed mt-2 mb-4">
                Stage drapery, floral palettes, and centerpiece cake staging designed together under one roof in Kampala.
              </p>
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-bronze/30 text-center mb-4">
                <div>
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">Full-Venue</span>
                  <span className="block font-sans text-[10px] text-gray-400">Stage &amp; tables</span>
                </div>
                <div className="border-x border-bronze/25 px-1">
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">Cake + Decor</span>
                  <span className="block font-sans text-[10px] text-gray-400">Matched palette</span>
                </div>
                <div>
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">Consultative</span>
                  <span className="block font-sans text-[10px] text-gray-400">Tailored quote</span>
                </div>
              </div>
              <Link
                to="/decorations/enquire"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary-gold hover:text-gold-highlight"
              >
                <span>Start a Decoration Enquiry</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT (md and up) — Specimen Callouts + Editorial Plaque */}
        <img
          src="/scene2_celebration_bg.jpg"
          alt="Tiered white celebration cake on a gold pedestal surrounded by white roses and candlelit ballroom floral arches"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        <div
          aria-hidden="true"
          className="hidden md:block absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#141210] to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#141210]/92 via-[#141210]/60 to-transparent md:w-[66%] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-0 inset-x-0 h-[520px] bg-gradient-to-t from-[#141210] via-[#141210]/85 to-transparent pointer-events-none"
        />

        <div className="hidden md:flex relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 flex-1 flex-col justify-between gap-8">
          {/* Upper/Middle Field: Tactile Styling Specimen Callouts Pointing Toward the Ballroom & Cake */}
          <div className="grid grid-cols-12 gap-5 pt-8">
            <div
              data-aos="fade-right"
              data-aos-delay="80"
              className="md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-5 flex items-center gap-3"
            >
              <div className="flex-1 bg-[#141210]/75 backdrop-blur-xs border border-primary-gold/40 px-4 py-3.5 rounded-md shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                    Layer I
                  </span>
                  <span aria-hidden="true" className="w-4 h-[1px] bg-primary-gold/50" />
                  <h3 className="font-serif font-semibold text-base text-brand-white">
                    Architectural Drapery &amp; Canopy Lighting
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Ceiling voile swags, chandelier framing &amp; warm fairy-light backdrops tailored to your venue proportions.
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
              className="md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-5 flex items-center gap-3"
            >
              <div className="flex-1 bg-[#141210]/75 backdrop-blur-xs border border-primary-gold/40 px-4 py-3.5 rounded-md shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                    Layer II
                  </span>
                  <span aria-hidden="true" className="w-4 h-[1px] bg-primary-gold/50" />
                  <h3 className="font-serif font-semibold text-base text-brand-white">
                    Botanical &amp; Candlelit Tablescapes
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Gold-rimmed chargers, linen napkins, bronze lanterns &amp; floral arrangements curated for guest tables.
                </p>
              </div>
              <div aria-hidden="true" className="flex items-center shrink-0">
                <div className="w-10 lg:w-20 h-[1px] bg-primary-gold/70" />
                <div className="w-2 h-2 rounded-full border border-primary-gold bg-[#141210]" />
              </div>
            </div>
          </div>

          {/* Lower Field: Bottom-Left Editorial Plaque + Right Cake Pedestal Callout */}
          <div className="grid grid-cols-12 gap-6 items-end">
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="md:col-span-7 lg:col-span-6 bg-[#141210]/70 backdrop-blur-xs p-8 rounded-lg border-l-2 border-primary-gold/80 border-t border-r border-b border-white/10 shadow-2xl"
            >
              <span className="text-xs font-sans uppercase tracking-[0.22em] text-primary-gold font-semibold mb-2 block">
                Inside the Styling Craft &bull; The Zuena Standard
              </span>

              <h2 className="font-serif font-normal text-3xl md:text-4xl text-brand-white leading-tight tracking-tight break-words">
                Composed as One Unified Celebration.
              </h2>

              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 mb-5 font-normal break-words">
                When your celebration cake and event decoration are imagined under the same roof, the colour palette, floral varieties, and pedestal staging harmonize effortlessly across the entire room.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 pb-5 border-y border-bronze/30 text-left">
                <div>
                  <span className="block font-serif text-base text-champagne-gold font-semibold">
                    Bespoke Themes
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Tailored colour palettes
                  </span>
                </div>
                <div className="border-l border-bronze/25 pl-3">
                  <span className="block font-serif text-base text-champagne-gold font-semibold">
                    Cake + Venue
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Coordinated florals
                  </span>
                </div>
                <div className="border-l border-bronze/25 pl-3">
                  <span className="block font-serif text-base text-champagne-gold font-semibold">
                    On-Site Setup
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Kampala &amp; surrounds
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-6">
                <Link
                  to="/decorations/enquire"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-primary-gold hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded px-1 py-2 min-h-[44px] group"
                >
                  <span>Enquire About Event Decor</span>
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
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                    Layer III
                  </span>
                  <span aria-hidden="true" className="w-4 h-[1px] bg-primary-gold/50" />
                  <h3 className="font-serif font-semibold text-base text-brand-white">
                    Dedicated Cake-Stage &amp; Pedestal Styling
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  We frame your centerpiece cake with matching meadow florals, linen skirting, and warm pin-spotting for unforgettable cake-cutting moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SCENE 6 — The Quiet Coda: Consultative Journey
          (Directly inspired by HomePage Scene 5 Three-Row Atelier Layout)
          =================================================================== */}
      <section
        aria-label="Scene 6 — Every Memorable Setting Starts With a Conversation"
        className="relative w-full bg-dark-canvas text-brand-white border-t border-bronze/25 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
      >
        {/* Top Ornamental Seam & Center Crest Badge (Matching HomePage Scene 5) */}
        <div className="w-full flex flex-col items-center">
          <div className="w-10 h-12 sm:w-11 sm:h-14 rounded-b-full bg-[#1B1815] border-x border-b border-primary-gold/40 flex items-center justify-center shadow-md">
            <span
              aria-hidden="true"
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-champagne-gold [writing-mode:vertical-rl] rotate-180 select-none"
            >
              ZUENA
            </span>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12">
          {/* Top Centered Two-Line Editorial Headline */}
          <div data-aos="fade-up" className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-22">
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-champagne-gold font-semibold block mb-2">
              The Consultative Process
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-primary-gold leading-[1.15] tracking-tight">
              <span className="block">Every Memorable Setting Starts</span>
              <span className="block mt-1 text-brand-white">With a Conversation.</span>
            </h2>
          </div>

          {/* Three Alternating Editorial Rows */}
          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            {/* Row 1: Text Left (Cols 1-5) | Paired Images Right (Cols 6-12) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
              <div data-aos="fade-right" className="md:col-span-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-gold block mb-1.5">
                  Step 01 &bull; Enquiry &amp; Date Review
                </span>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Share Your Occasion, Date &amp; Venue
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-md font-normal">
                  Tell us about your upcoming event, expected guest count, and venue location. Submitting an enquiry is obligation-free and allows our team to check calendar availability and understand your celebration vision.
                </p>
              </div>

              <div data-aos="fade-left" data-aos-delay="120" className="md:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 items-center">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={sweetheartStageImg}
                    alt="Sweetheart stage backdrop with olive drapery, glowing fairy lights, and white roses"
                    className="w-full aspect-4/5 object-cover object-center block select-none"
                  />
                </div>
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={goldTableSettingImg}
                    alt="Banquet table place settings with gold-rimmed glass chargers, coral napkins, and floral arch backdrop"
                    className="w-full aspect-4/5 object-cover object-center block select-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Image Left (Cols 1-4) | Text Center (Cols 5-8) | Image Right (Cols 9-12) */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 lg:gap-8 items-center">
              <div data-aos="fade-right" data-aos-delay="100" className="col-span-1 md:col-span-4 order-2 md:order-1">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={weddingCakeImg}
                    alt="Three-tier white wedding cake with champagne drapery swags, gold pearl borders, and deep-red roses"
                    className="w-full aspect-4/5 object-cover object-top block select-none"
                  />
                </div>
              </div>

              <div data-aos="fade-up" className="col-span-2 md:col-span-4 order-1 md:order-2 md:px-2 lg:px-4 mb-2.5 md:mb-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-gold block mb-1.5">
                  Step 02 &bull; Bespoke Styling Proposal
                </span>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Harmonize Palettes, Florals &amp; Cake
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed font-normal">
                  Our stylists work with you to select drapery textures, floral arrangements, table settings, and stage backdrops—optionally paired with a custom centerpiece cake so every detail matches.
                </p>
              </div>

              <div data-aos="fade-left" data-aos-delay="180" className="col-span-1 md:col-span-4 order-3">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={crystalWeddingCakeImg}
                    alt="Four-tier ivory wedding cake adorned with handcrafted white sugar magnolias and crystal accents"
                    className="w-full aspect-4/5 object-cover object-top block select-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Paired Images Left (Cols 1-7) | Text Right (Cols 8-12) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
              <div data-aos="fade-right" data-aos-delay="100" className="md:col-span-7 order-2 md:order-1 grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 items-center">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={candlelitHallImg}
                    alt="Candlelit reception hall styled with ceiling drapery, warm fairy lights, and olive-draped banquet tables"
                    className="w-full aspect-4/3 object-cover object-center block select-none"
                  />
                </div>
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={lanternTableImg}
                    alt="Reception banquet table set with bronze lantern centerpiece, white roses, and votive candles"
                    className="w-full aspect-4/3 object-cover object-center block select-none"
                  />
                </div>
              </div>

              <div data-aos="fade-left" className="md:col-span-5 order-1 md:order-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne-gold block mb-1.5">
                  Step 03 &bull; White-Glove Installation
                </span>
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Delivered &amp; Styled Ahead of Time
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-md font-normal">
                  Once you approve the tailored styling plan and final quotation, our team handles full venue dressing, lighting checks, and centerpiece placement so you can step into your celebration with peace of mind.
                </p>
              </div>
            </div>
          </div>

          {/* Understated Closing Invitation Coda & Deliberate Transition Into Footer */}
          <div data-aos="fade-up" data-aos-delay="120" className="mt-14 sm:mt-18 lg:mt-20 flex flex-col items-center text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                to="/decorations/enquire"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-primary-gold text-[#141210] hover:bg-gold-highlight transition-colors duration-200 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
              >
                <span>Enquire About Event Decor</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to="/custom-cake"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-primary-gold/70 text-champagne-gold hover:border-primary-gold hover:bg-primary-gold hover:text-[#141210] transition-colors duration-200 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
              >
                <span>Pair With a Custom Cake</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <p className="font-sans text-xs text-gray-400 mt-4 max-w-md">
              Decoration enquiries are obligation-free consultations. Final pricing and date confirmation are arranged directly with our staff.
            </p>

            <div aria-hidden="true" className="w-[1px] h-12 sm:h-16 bg-bronze/30 mt-10 sm:mt-12" />
          </div>
        </div>
      </section>

      {/* ===================================================================
          INTERACTIVE PORTFOLIO STUDY LIGHTBOX MODAL
          =================================================================== */}
      {selectedStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="study-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs"
          onClick={() => setSelectedStudy(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#161311] border border-primary-gold/50 rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStudy(null)}
              aria-label="Close styling study details"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#141210]/90 border border-primary-gold/50 text-primary-gold hover:bg-primary-gold hover:text-[#141210] flex items-center justify-center transition-colors cursor-pointer"
            >
              &times;
            </button>

            {/* Modal Image Column */}
            <div className="md:w-1/2 bg-[#141210] flex items-center justify-center overflow-hidden">
              <img
                src={selectedStudy.image}
                alt={selectedStudy.alt}
                className="w-full h-full max-h-[360px] md:max-h-[540px] object-cover block"
              />
            </div>

            {/* Modal Specification Column */}
            <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-bronze/20 border border-primary-gold/40 text-[10px] font-mono uppercase tracking-[0.18em] text-champagne-gold mb-3">
                  {selectedStudy.tag}
                </span>
                <h2
                  id="study-modal-title"
                  className="font-serif font-semibold text-2xl sm:text-3xl text-primary-gold leading-tight mb-3"
                >
                  {selectedStudy.title}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                  {selectedStudy.description}
                </p>

                {/* Venue & Scale Ledger */}
                <dl className="border-y border-bronze/25 py-3 mb-5 space-y-2 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-gray-400">Recommended Setting</dt>
                    <dd className="text-brand-white font-medium text-right">{selectedStudy.venueType}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-gray-400">Typical Scale</dt>
                    <dd className="text-brand-white font-medium text-right">{selectedStudy.guestScale}</dd>
                  </div>
                </dl>

                {/* Palette Swatches */}
                <div className="mb-5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-champagne-gold mb-2">
                    Signature Colour Palette
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.palette.map((swatch) => (
                      <div
                        key={swatch.name}
                        className="flex items-center gap-2 px-2.5 py-1 bg-[#141210] border border-bronze/30 rounded-xs"
                      >
                        <span
                          aria-hidden="true"
                          className="w-3 h-3 rounded-full border border-white/25"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="text-xs text-gray-200">{swatch.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included Architectural Elements */}
                <div className="mb-6">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-champagne-gold mb-2">
                    Styling Highlights
                  </span>
                  <ul className="space-y-1.5">
                    {selectedStudy.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-300">
                        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary-gold mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-bronze/25 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to={`/decorations/enquire?style=${encodeURIComponent(selectedStudy.title)}&occasion=${encodeURIComponent(selectedStudy.occasionParam)}`}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-gold text-[#141210] hover:bg-gold-highlight font-sans text-xs font-semibold uppercase tracking-[0.16em] rounded-xs transition-colors text-center"
                >
                  <span>Enquire With This Style</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="w-full sm:w-auto px-4 py-3 border border-bronze/40 text-gray-300 hover:text-white text-xs font-sans uppercase tracking-[0.14em] rounded-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
