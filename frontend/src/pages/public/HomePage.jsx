import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import weddingCakeImg from '../../assets/images/wd 1.jpg'
import birthdayCakeImg from '../../assets/images/bd 1.jpg'
import chocolateCakeImg from '../../assets/images/3.jpg'
import receptionCanopyImg from '../../assets/images/decor 4.jpg'
import lanternTableImg from '../../assets/images/decor 5.jpg'
import crystalWeddingCakeImg from '../../assets/images/wd 2.jpg'
import chocolateRoseCakeImg from '../../assets/images/8.jpg'
import blackGoldCakeImg from '../../assets/images/gd 2.jpg'
import goldRibbonCakeImg from '../../assets/images/gd 3.jpg'
import candlelitHallImg from '../../assets/images/decor 6.jpg'
import goldTableSettingImg from '../../assets/images/decor 1.jpg'

const TOTAL_HEADLINE_CHARS = 22

const headlineLine1 = [
  {
    word: 'EVERY',
    chars: [
      { char: 'E', index: 0 },
      { char: 'V', index: 1 },
      { char: 'E', index: 2 },
      { char: 'R', index: 3 },
      { char: 'Y', index: 4 },
    ],
  },
  {
    word: 'DETAIL',
    chars: [
      { char: 'D', index: 5 },
      { char: 'E', index: 6 },
      { char: 'T', index: 7 },
      { char: 'A', index: 8 },
      { char: 'I', index: 9 },
      { char: 'L', index: 10 },
    ],
  },
]

const headlineLine2 = [
  {
    word: 'CELEBRATES.',
    chars: [
      { char: 'C', index: 11 },
      { char: 'E', index: 12 },
      { char: 'L', index: 13 },
      { char: 'E', index: 14 },
      { char: 'B', index: 15 },
      { char: 'R', index: 16 },
      { char: 'A', index: 17 },
      { char: 'T', index: 18 },
      { char: 'E', index: 19 },
      { char: 'S', index: 20 },
      { char: '.', index: 21 },
    ],
  },
]

function EditorialHeadlineLines({ keyPrefix, cycle, phase }) {
  const isDeleting = phase === 'deleting'
  const letterClass = isDeleting ? 'editorial-letter-deleting' : 'editorial-letter'
  const getDelay = (index) =>
    isDeleting
      ? `${(TOTAL_HEADLINE_CHARS - 1 - index) * 0.045}s`
      : `${index * 0.065}s`

  return (
    <>
      {/* Line 1: EVERY DETAIL — Monumental full-span scale with natural word spacing */}
      <div className="w-full flex items-center justify-center gap-x-[0.28em] sm:gap-x-[0.38em] md:gap-x-[0.42em] lg:gap-x-[0.44em] tracking-[0.015em] sm:tracking-[0.045em] md:tracking-[0.055em] lg:tracking-[0.065em] pl-[0.015em] sm:pl-[0.045em] md:pl-[0.055em] lg:pl-[0.065em] whitespace-nowrap">
        {headlineLine1.map((item, wordIdx) => (
          <span key={`${keyPrefix}-${item.word}`} className="inline-block whitespace-nowrap">
            {item.chars.map((char) => (
              <span
                key={`${keyPrefix}-l1-${wordIdx}-${char.index}-${cycle}-${phase}`}
                className={letterClass}
                style={{ animationDelay: getDelay(char.index) }}
                aria-hidden="true"
              >
                {char.char}
              </span>
            ))}
          </span>
        ))}
      </div>

      {/* Line 2: CELEBRATES. — Monumental full-span scale centered across the middle of the cake */}
      <div className="w-full flex items-center justify-center mt-[0.06em] sm:mt-[0.04em] tracking-[0.03em] sm:tracking-[0.065em] md:tracking-[0.08em] lg:tracking-[0.095em] pl-[0.03em] sm:pl-[0.065em] md:pl-[0.08em] lg:pl-[0.095em] whitespace-nowrap">
        <span className="inline-block whitespace-nowrap">
          {headlineLine2[0].chars.map((char) => (
            <span
              key={`${keyPrefix}-l2-${char.index}-${cycle}-${phase}`}
              className={letterClass}
              style={{ animationDelay: getDelay(char.index) }}
              aria-hidden="true"
            >
              {char.char}
            </span>
          ))}
        </span>
      </div>
    </>
  )
}

export default function HomePage() {
  const [cycle, setCycle] = useState(0)
  const [phase, setPhase] = useState('writing')

  useEffect(() => {
    let deleteTimerId
    let rewriteTimerId

    const startCycle = () => {
      setPhase('writing')
      // Writing completes at ~1.85s (21 * 0.065s + 0.48s), holds visible until 4.25s, then deletes
      deleteTimerId = setTimeout(() => {
        setPhase('deleting')
        // Deleting completes at ~1.3s (21 * 0.045s + 0.36s), then immediately writes again
        rewriteTimerId = setTimeout(() => {
          setCycle((prev) => prev + 1)
          startCycle()
        }, 1450)
      }, 4250)
    }

    startCycle()

    return () => {
      clearTimeout(deleteTimerId)
      clearTimeout(rewriteTimerId)
    }
  }, [])

  return (
    <div className="w-full font-sans bg-dark-canvas text-brand-white">
      {/* Scene 1 — Sculptural Editorial Hero (Direction 1: The Full-Span Architectural Billboard) */}
      <section
        aria-label="Scene 1 — Sculptural Editorial"
        className="relative w-full h-[calc(100svh-5rem)] min-h-[560px] max-h-[820px] sm:max-h-[1050px] flex items-end justify-center overflow-hidden bg-dark-canvas"
      >
        {/* Layer 1 (z-10): Full-Span Monumental Two-Line Typographic Wall centered behind the middle of the cake */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center -translate-y-[3%] sm:-translate-y-[2%] md:-translate-y-[2%] lg:-translate-y-[2%] px-1 sm:px-6 md:px-8 lg:px-10 pointer-events-none select-none">
          <h1
            aria-label="EVERY DETAIL CELEBRATES."
            className="m-0 w-full max-w-[1440px] flex flex-col items-center justify-center font-serif font-medium uppercase text-center leading-[1.08] sm:leading-[1.02] md:leading-[1.0] lg:leading-[0.98] text-primary-gold text-[12.4vw] sm:text-[10.6vw] xl:text-[11.2rem]"
          >
            <EditorialHeadlineLines keyPrefix="bg" cycle={cycle} phase={phase} />
          </h1>
        </div>

        {/* Layer 2 (z-20): Central Sculptural Celebration Cake balanced vertically on mobile and desktop */}
        <div className="relative z-20 flex items-end justify-center w-full h-full px-2 sm:px-4 pointer-events-none select-none">
          <img
            src="/sculptural_cake_hero.png"
            alt="Handcrafted artisanal sculptural celebration cake"
            className="h-[88%] sm:h-[85%] md:h-[88%] lg:h-[92%] max-h-[680px] sm:max-h-[710px] md:max-h-[835px] lg:max-h-[760px] w-auto max-w-none object-contain object-bottom -translate-y-[6%] sm:translate-y-[7.5%]"
          />
        </div>

        {/* Layer 3 (z-30): Perfectly aligned (0px offset) optical contrast pass with soft studio chiaroscuro vignette on mobile so the centered headline reads clearly across the bright cake */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center -translate-y-[3%] sm:-translate-y-[2%] md:-translate-y-[2%] lg:-translate-y-[2%] px-1 sm:px-6 md:px-8 lg:px-10 pointer-events-none select-none"
        >
          {/* Soft feathered chiaroscuro studio vignette over the cake midpoint on mobile for effortless gold-on-cream contrast */}
          <div className="sm:hidden absolute w-[76%] h-28 bg-[#141210]/55 blur-2xl rounded-full pointer-events-none" />

          <div
            className="relative m-0 w-full max-w-[1440px] flex flex-col items-center justify-center font-serif font-medium uppercase text-center leading-[1.08] sm:leading-[1.02] md:leading-[1.0] lg:leading-[0.98] text-primary-gold text-[12.4vw] sm:text-[10.6vw] xl:text-[11.2rem] opacity-[0.90] sm:opacity-[0.48] md:opacity-[0.42] [text-shadow:0_2px_16px_rgba(20,18,16,0.98),0_1px_4px_rgba(20,18,16,0.95)] sm:[text-shadow:0_2px_10px_rgba(20,18,16,0.75)]"
          >
            <EditorialHeadlineLines keyPrefix="fg" cycle={cycle} phase={phase} />
          </div>
        </div>
      </section>

      {/* Scene 2 — More Than a Cake. A Celebration, Thoughtfully Created. */}
      <section
        aria-label="Scene 2 — A Celebration, Thoughtfully Created"
        className="relative w-full min-h-[600px] sm:min-h-[640px] md:min-h-[740px] lg:min-h-[840px] flex items-center justify-center overflow-hidden bg-dark-canvas"
      >
        {/* Photographic Background Asset: Celebratory Cake & Ballroom Décor Setting */}
        <img
          src="/scene2_celebration_bg.jpg"
          alt="Artisanal white celebration cake on a gold pedestal within an opulent candlelit ballroom floral setting"
          className="absolute inset-0 w-full h-full object-cover object-[76%_center] sm:object-[70%_center] md:object-center pointer-events-none select-none"
        />

        {/* Ambient Gradient Overlays for Natural Visual Contrast and Smooth Seams */}
        {/* 1. Balanced ambient tint on mobile so the cake remains visible behind the centered text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#141210]/68 sm:bg-transparent pointer-events-none"
        />
        {/* 2. Left-to-right directional shade on tablet/desktop */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/75 to-transparent sm:w-[75%] md:w-[65%] lg:w-[58%] pointer-events-none"
        />
        {/* 3. Top seamless transition from Scene 1 */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#141210] to-transparent pointer-events-none"
        />
        {/* 4. Bottom seamless transition to subsequent sections */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#141210] to-transparent pointer-events-none"
        />

        {/* Scene 2 Narrative Content — Centered on Mobile, Left-Aligned on Tablet/Desktop */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 flex items-center justify-center sm:justify-start">
          <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl flex flex-col items-center text-center sm:items-start sm:text-left">
            {/* Approved Headline with Exact Reference Image Color Balancing */}
            <h2
              data-aos="fade-up"
              className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.14] sm:leading-[1.12] tracking-tight break-words"
            >
              <span className="block text-white">
                More Than a Cake.
              </span>
              <span className="block text-primary-gold font-serif mt-1">
                A Celebration,
              </span>
              <span className="block text-white mt-1">
                Thoughtfully Created.
              </span>
            </h2>

            {/* Subtle Editorial Accent Line */}
            <div
              aria-hidden="true"
              data-aos="fade-up"
              data-aos-delay="100"
              className="w-12 h-[1px] bg-primary-gold/60 my-5 sm:my-8 mx-auto sm:mx-0"
            />

            {/* Approved Supporting Statement */}
            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="font-sans text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-sm sm:max-w-lg mb-7 sm:mb-10 font-normal break-words"
            >
              From exquisite celebration cakes to artfully curated event settings, we unite craftsmanship and aesthetic refinement to give every occasion a distinctive sense of occasion.
            </p>

            {/* Calls to Action — Centered on Mobile */}
            <div
              data-aos="fade-up"
              data-aos-delay="240"
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1 w-full max-w-xs sm:max-w-md min-w-0"
            >
              <Link
                to="/creations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase bg-primary-gold text-[#141210] hover:bg-gold-highlight hover:shadow-[0_4px_24px_rgba(222,172,75,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
              >
                Explore Our Creations
              </Link>
              <Link
                to="/decorations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded text-xs sm:text-sm font-semibold tracking-wider uppercase border border-primary-gold/60 text-champagne-gold hover:border-primary-gold hover:text-white hover:bg-primary-gold/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
              >
                Discover Our Decorations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 4 — The Stepped Horizon: A World of Possibilities */}
      <section
        aria-label="Scene 4 — A World of Possibilities"
        className="relative w-full bg-dark-canvas text-brand-white overflow-hidden py-20 sm:py-24 lg:py-32"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop & Tablet Balanced Editorial Layout (md and up) */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-start">
            {/* Left Wing (Cols 1-7): Headline, Intro & Stepped Cake Collection */}
            <div className="md:col-span-7 flex flex-col">
              {/* Opening Narrative Aligned to the Left Editorial Margin */}
              <div data-aos="fade-up" className="mb-8 lg:mb-12 max-w-xl">
                <h2 className="font-serif font-normal text-3xl lg:text-5xl xl:text-[3.25rem] text-primary-gold leading-[1.1] tracking-tight">
                  A World of Possibilities.
                </h2>
                <p className="font-sans text-sm lg:text-base text-gray-300 leading-relaxed mt-3.5 font-normal">
                  From expressive birthday creations and tiered wedding centerpieces to full-room reception styling, every celebration is composed with intention.
                </p>
              </div>

              {/* Stepped Cake Triad: Left Supporting Column + Tall Center-Left Wedding Anchor */}
              <div className="grid grid-cols-12 gap-5 lg:gap-7 items-start">
                {/* Supporting Cake Studies Column (Anchored cleanly to the left margin) */}
                <div className="col-span-5 flex flex-col">
                  {/* Supporting Birthday Cake (Upper-Left Step) */}
                  <div data-aos="fade-up" data-aos-delay="100" className="w-full">
                    <img
                      src={birthdayCakeImg}
                      alt="Ombre mocha and cream birthday cake topped with dark chocolate, gold-dusted sticks, and bronze spheres"
                      className="w-full aspect-4/5 object-cover rounded-sm shadow-2xl block"
                    />
                  </div>

                  {/* Supporting Cake Variety — Chocolate & Berry Drip (Lower-Left Step) */}
                  <div data-aos="fade-up" data-aos-delay="200" className="w-[88%] mt-6 lg:mt-8">
                    <img
                      src={chocolateCakeImg}
                      alt="Two-tier dark chocolate ganache drip cake topped with chocolate truffles and fresh berries on a gold board"
                      className="w-full aspect-4/5 object-cover rounded-sm shadow-2xl block"
                    />
                  </div>
                </div>

                {/* Primary Tall Cake Photograph (Center-Left Rising Anchor) */}
                <div data-aos="fade-up" data-aos-delay="150" className="col-span-7 -mt-2 lg:-mt-6 flex flex-col">
                  <div className="w-full">
                    <img
                      src={weddingCakeImg}
                      alt="Three-tier white wedding cake with champagne drapery swags, gold pearl borders, and deep-red roses"
                      className="w-full aspect-2/3 object-cover rounded-sm shadow-2xl block"
                    />
                  </div>

                  {/* Subtle Pathway to Our Creations */}
                  <div className="mt-6 lg:mt-8">
                    <Link
                      to="/creations"
                      className="inline-flex items-center gap-2 text-xs lg:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-primary-gold hover:text-gold-highlight border-b border-primary-gold/40 hover:border-gold-highlight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                    >
                      <span>Our Creations</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Wing (Cols 8-12): Prominent Event-Decoration Wing Balanced with Left Wing */}
            <div className="md:col-span-5 md:mt-2 flex flex-col">
              {/* Primary Immersive Decoration Feature */}
              <div data-aos="fade-left" data-aos-delay="150" className="w-full">
                <img
                  src={receptionCanopyImg}
                  alt="Warm candlelit reception hall with fairy-lit ceiling drapery, floral table centerpieces, and Chiavari chairs"
                  className="w-full aspect-3/4 object-cover object-center rounded-sm shadow-2xl block"
                />
              </div>

              {/* Overlapping Secondary Decoration Study */}
              <div
                data-aos="fade-up"
                data-aos-delay="260"
                className="relative z-10 -mt-16 lg:-mt-24 -ml-6 lg:-ml-12 w-[66%] max-w-[320px] border-4 border-dark-canvas rounded-sm shadow-2xl"
              >
                <img
                  src={lanternTableImg}
                  alt="Reception banquet table centerpiece featuring a bronze lantern, white roses, votive candles, and draped head table"
                  className="w-full aspect-4/3 object-cover block"
                />
              </div>

              {/* Subtle Pathway to Decorations Aligned to the Right Editorial Margin */}
              <div className="mt-6 lg:mt-8 flex justify-end">
                <Link
                  to="/decorations"
                  className="inline-flex items-center gap-2 text-xs lg:text-sm font-sans font-semibold tracking-[0.18em] uppercase text-champagne-gold hover:text-gold-highlight border-b border-primary-gold/40 hover:border-gold-highlight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                >
                  <span>Decorations</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Balanced Editorial Recomposition (< 768px) */}
          <div className="md:hidden flex flex-col">
            {/* Opening Narrative */}
            <div data-aos="fade-up" className="mb-8">
              <h2 className="font-serif font-normal text-3xl sm:text-4xl text-primary-gold leading-[1.12] tracking-tight">
                A World of Possibilities.
              </h2>
              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 font-normal">
                From expressive birthday creations and tiered wedding centerpieces to full-room reception styling, every celebration is composed with intention.
              </p>
            </div>

            {/* Stepped Cake Cluster on Mobile */}
            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col">
              <div className="flex items-start justify-between gap-3.5">
                {/* Primary Tall Wedding Cake */}
                <div className="w-[56%] shrink-0">
                  <img
                    src={weddingCakeImg}
                    alt="Three-tier white wedding cake with champagne drapery swags, gold pearl borders, and deep-red roses"
                    className="w-full aspect-2/3 object-cover rounded-sm shadow-2xl block"
                  />
                </div>

                {/* Stepped Birthday Cake */}
                <div className="w-[41%] mt-8">
                  <img
                    src={birthdayCakeImg}
                    alt="Ombre mocha and cream birthday cake topped with dark chocolate, gold-dusted sticks, and bronze spheres"
                    className="w-full aspect-4/5 object-cover rounded-sm shadow-2xl block"
                  />
                </div>
              </div>

              {/* Overlapping Chocolate Drip Cake Study & Pathway to Our Creations */}
              <div className="flex items-end justify-between gap-3 -mt-6 pl-[6%]">
                <div className="w-[50%] border-4 border-dark-canvas rounded-sm shadow-2xl relative z-10">
                  <img
                    src={chocolateCakeImg}
                    alt="Two-tier dark chocolate ganache drip cake topped with chocolate truffles and fresh berries on a gold board"
                    className="w-full aspect-4/5 object-cover block"
                  />
                </div>

                <div className="pb-1 shrink-0">
                  <Link
                    to="/creations"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-primary-gold hover:text-gold-highlight border-b border-primary-gold/40 pb-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                  >
                    <span>Our Creations</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Prominent Event-Decoration Wing Balanced Across Mobile Viewport */}
            <div data-aos="fade-up" data-aos-delay="150" className="mt-12 flex flex-col">
              <div className="w-full">
                <img
                  src={receptionCanopyImg}
                  alt="Warm candlelit reception hall with fairy-lit ceiling drapery, floral table centerpieces, and Chiavari chairs"
                  className="w-full aspect-3/4 object-cover object-center rounded-sm shadow-2xl block"
                />
              </div>

              <div className="flex items-end justify-between gap-4 -mt-12 pl-3">
                <div className="w-[58%] max-w-[220px] border-4 border-dark-canvas rounded-sm shadow-2xl relative z-10">
                  <img
                    src={lanternTableImg}
                    alt="Reception banquet table centerpiece featuring a bronze lantern, white roses, votive candles, and draped head table"
                    className="w-full aspect-4/3 object-cover block"
                  />
                </div>

                <div className="pb-1 shrink-0">
                  <Link
                    to="/decorations"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-champagne-gold hover:text-gold-highlight border-b border-primary-gold/40 pb-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold min-h-[44px]"
                  >
                    <span>Decorations</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 3 — Inside the Craft: The Artistry Is in the Details */}
      <section
        aria-label="Scene 3 — Inside the Craft: The Artistry Is in the Details"
        className="relative w-full md:min-h-[860px] lg:min-h-[920px] flex flex-col justify-between overflow-hidden bg-dark-canvas"
      >
        {/* ===================================================================
            MOBILE LAYOUT (< 768px) — Approved Mode 3: Tall Open Photo + Minimal Glass Card
            =================================================================== */}
        <div className="md:hidden relative w-full min-h-[620px] flex flex-col justify-between overflow-hidden">
          {/* Photo occupies the upper 68% of the container so the cake & hands sit in the upper open half */}
          <div className="relative w-full h-[380px] overflow-hidden">
            <img
              src="/scene3_inside_the_craft.jpg"
              alt="Close-up of artisan patissier's hands delicately placing a handcrafted sugar flower onto a textured celebration cake using fine tweezers"
              className="w-full h-full object-cover object-[78%_center] block select-none"
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
                The Artistry Is in the Details.
              </h2>
              <p className="font-sans text-xs text-gray-300 leading-relaxed mt-2 mb-4">
                Hand-sculpted sugar florals, small-batch scratch baking, and white-glove venue setup under one roof.
              </p>
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-bronze/30 text-center mb-4">
                <div>
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">100% Bespoke</span>
                  <span className="block font-sans text-[10px] text-gray-400">Scratch-baked</span>
                </div>
                <div className="border-x border-bronze/25 px-1">
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">Cake + Decor</span>
                  <span className="block font-sans text-[10px] text-gray-400">Unified styling</span>
                </div>
                <div>
                  <span className="block font-serif text-xs text-champagne-gold font-semibold">Since 2014</span>
                  <span className="block font-sans text-[10px] text-gray-400">Kampala</span>
                </div>
              </div>
              <Link
                to="/creations"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary-gold hover:text-gold-highlight"
              >
                <span>Explore Our Creations</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================================
            DESKTOP LAYOUT (md and up) — Approved Direction 2 Untouched
            =================================================================== */}
        <img
          src="/scene3_inside_the_craft.jpg"
          alt="Close-up of artisan patissier's hands delicately placing a handcrafted sugar flower onto a textured celebration cake using fine tweezers"
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
          {/* Upper/Middle Field: Tactile Craft Specimen Callouts Pointing Toward the Cake */}
          <div className="grid grid-cols-12 gap-5 pt-8">
            <div
              data-aos="fade-right"
              data-aos-delay="80"
              className="md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-4 flex items-center gap-3"
            >
              <div className="flex-1 bg-[#141210]/70 backdrop-blur-xs border border-primary-gold/40 px-4 py-3.5 rounded-md shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                    Detail I
                  </span>
                  <span aria-hidden="true" className="w-4 h-[1px] bg-primary-gold/50" />
                  <h3 className="font-serif font-semibold text-base text-brand-white">
                    Hand-Sculpted Sugar Florals
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Petals shaped one by one &amp; finished with edible gold leaf to match your event palette.
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
              <div className="flex-1 bg-[#141210]/70 backdrop-blur-xs border border-primary-gold/40 px-4 py-3.5 rounded-md shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                    Detail II
                  </span>
                  <span aria-hidden="true" className="w-4 h-[1px] bg-primary-gold/50" />
                  <h3 className="font-serif font-semibold text-base text-brand-white">
                    Small-Batch Scratch Baking
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Layered sponges, fruit reductions &amp; silky buttercream baked fresh for your celebration date.
                </p>
              </div>
              <div aria-hidden="true" className="flex items-center shrink-0">
                <div className="w-10 lg:w-20 h-[1px] bg-primary-gold/70" />
                <div className="w-2 h-2 rounded-full border border-primary-gold bg-[#141210]" />
              </div>
            </div>
          </div>

          {/* Lower Field: Bottom-Left Editorial Plaque + Right Pedestal Callout */}
          <div className="grid grid-cols-12 gap-6 items-end">
            <div
              data-aos="fade-up"
              data-aos-delay="120"
              className="md:col-span-7 lg:col-span-6 bg-[#141210]/65 backdrop-blur-xs p-8 rounded-lg border-l-2 border-primary-gold/80 border-t border-r border-b border-white/10 shadow-2xl"
            >
              <span className="text-xs font-sans uppercase tracking-[0.22em] text-primary-gold font-semibold mb-2 block">
                Inside the Craft &bull; The Zuena Standard
              </span>

              <h2 className="font-serif font-normal text-3xl md:text-4xl text-brand-white leading-tight tracking-tight break-words">
                The Artistry Is in the Details.
              </h2>

              <p className="font-sans text-sm text-gray-300 leading-relaxed mt-3 mb-5 font-normal break-words">
                We never rely on mass-produced templates. Every cake and reception setting is personally reviewed with you, crafted by hand in our Kampala atelier, and delivered on schedule.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 pb-5 border-y border-bronze/30 text-left">
                <div>
                  <span className="block font-serif text-base text-champagne-gold font-semibold">
                    100% Bespoke
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Tailored tiers &amp; flavours
                  </span>
                </div>
                <div className="border-l border-bronze/25 pl-3">
                  <span className="block font-serif text-base text-champagne-gold font-semibold">
                    Cake + Decor
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Styled under one roof
                  </span>
                </div>
                <div className="border-l border-bronze/25 pl-3">
                  <span className="block font-serif text-base text-champagne-gold font-semibold">
                    Since 2014
                  </span>
                  <span className="block font-sans text-[11px] text-gray-400 mt-0.5">
                    Trusted in Kampala
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  to="/creations"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-primary-gold hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded px-1 py-2 min-h-[44px] group"
                >
                  <span>Explore Our Creations</span>
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
              <div className="bg-[#141210]/75 backdrop-blur-xs border border-bronze/40 p-5 rounded-md shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-gold font-semibold">
                    Detail III
                  </span>
                  <span aria-hidden="true" className="w-4 h-[1px] bg-primary-gold/50" />
                  <h3 className="font-serif font-semibold text-base text-brand-white">
                    White-Glove Venue Delivery &amp; Setup
                  </h3>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Positioned at your venue and coordinated with your reception table styling so every element is ready before guests arrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 5 — Direction B: The Quiet Coda (Three-Row Alternating Atelier Layout) */}
      <section
        aria-label="Scene 5 — Something Special Starts With an Idea"
        className="relative w-full bg-dark-canvas text-brand-white border-t border-bronze/25 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
      >
        {/* Top Ornamental Seam & Center Crest Badge (Matching Reference Layout) */}
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
            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-primary-gold leading-[1.15] tracking-tight">
              <span className="block">Something Special Starts</span>
              <span className="block mt-1 text-brand-white">With an Idea.</span>
            </h2>
          </div>

          {/* Three Alternating Editorial Rows */}
          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            {/* Row 1: Text Left (Cols 1-5) | Paired Images Right (Cols 6-12) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-center">
              <div data-aos="fade-right" className="md:col-span-5">
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Share Your Occasion &amp; Vision
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-md font-normal">
                  Tell us what you&apos;re celebrating and the kind of experience you have in mind. Whether an intimate family milestone or a grand wedding reception, every bespoke piece begins with your story.
                </p>
              </div>

              <div data-aos="fade-left" data-aos-delay="120" className="md:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-5 lg:gap-6 items-center">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={crystalWeddingCakeImg}
                    alt="Four-tier ivory wedding cake adorned with handcrafted white sugar magnolias and crystal accents"
                    className="w-full aspect-4/5 object-cover object-top block select-none"
                  />
                </div>
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={chocolateRoseCakeImg}
                    alt="Three-tier dark chocolate wedding cake decorated with bronze and champagne sugar roses on a gold board"
                    className="w-full aspect-4/5 object-cover object-top block select-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Image Left (Cols 1-4) | Text Center (Cols 5-8) | Image Right (Cols 9-12) */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-5 md:gap-6 lg:gap-8 items-center">
              <div data-aos="fade-right" data-aos-delay="100" className="col-span-1 md:col-span-4 order-2 md:order-1">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={blackGoldCakeImg}
                    alt="Three-tier matte black and gold drip celebration cake with gold leaf on a brass pedestal"
                    className="w-full aspect-4/5 object-cover object-top block select-none"
                  />
                </div>
              </div>

              <div data-aos="fade-up" className="col-span-2 md:col-span-4 order-1 md:order-2 md:px-2 lg:px-4 mb-2.5 md:mb-0">
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Explore Custom Flavours &amp; Craft
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed font-normal">
                  We&apos;ll help you explore the possibilities across tier proportions, signature flavour pairings, handcrafted sugar florals, and fine gold-leaf finishes tailored to your guests.
                </p>
              </div>

              <div data-aos="fade-left" data-aos-delay="180" className="col-span-1 md:col-span-4 order-3">
                <div className="border border-bronze/30 bg-[#181512] p-1.5 sm:p-2 rounded-sm shadow-xl">
                  <img
                    src={goldRibbonCakeImg}
                    alt="Three-tier ivory and chocolate celebration cake finished with a satin gold ribbon bow"
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
                    src={goldTableSettingImg}
                    alt="Reception banquet table set with gold-rimmed glass chargers, folded linen napkins, gold flatware, and floral arrangements"
                    className="w-full aspect-4/3 object-cover object-[center_65%] block select-none"
                  />
                </div>
              </div>

              <div data-aos="fade-left" className="md:col-span-5 order-1 md:order-2">
                <h3 className="font-serif font-semibold text-xl sm:text-2xl text-primary-gold leading-snug mb-3">
                  Composed for the Whole Room
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-300/90 leading-relaxed max-w-md font-normal">
                  From the centerpiece cake to coordinated table settings and venue drapery, every detail is thoughtfully reviewed with you so the entire celebration feels unified.
                </p>
              </div>
            </div>
          </div>

          {/* Understated Closing Invitation Coda & Deliberate Transition Into Footer */}
          <div data-aos="fade-up" data-aos-delay="120" className="mt-14 sm:mt-18 lg:mt-20 flex flex-col items-center text-center">
            <Link
              to="/custom-cake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-primary-gold/70 text-champagne-gold hover:border-primary-gold hover:bg-primary-gold hover:text-[#141210] transition-colors duration-200 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] min-h-[44px] text-center"
            >
              <span>Let&apos;s Create Something Special</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <div aria-hidden="true" className="w-[1px] h-12 sm:h-16 bg-bronze/30 mt-10 sm:mt-12" />
          </div>
        </div>
      </section>
    </div>
  )
}
