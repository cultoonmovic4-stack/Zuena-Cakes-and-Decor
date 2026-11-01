import { useState } from 'react'
import { Link } from 'react-router'

export default function Scene2TestPage() {
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'dir1' | 'dir2' | 'dir3'
  const [showScene1Preview, setShowScene1Preview] = useState(false)

  return (
    <div className="w-full min-h-screen bg-dark-canvas text-brand-white font-sans selection:bg-primary-gold/30 selection:text-white">
      {/* Test Page Sticky Command Dock */}
      <div className="sticky top-20 z-50 bg-[#141210]/95 border-b border-primary-gold/20 py-3.5 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-primary-gold animate-pulse" />
            <h1 className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-primary-gold">
              Scene 2 Design Lab · 3 Cinematic Directions
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-primary-gold text-[#141210] shadow-[0_0_16px_rgba(222,172,75,0.4)]'
                  : 'border border-white/20 text-gray-300 hover:border-primary-gold/60 hover:text-white'
              }`}
            >
              All 3 Stacked
            </button>
            <button
              onClick={() => setActiveTab('dir1')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'dir1'
                  ? 'bg-primary-gold text-[#141210] shadow-[0_0_16px_rgba(222,172,75,0.4)]'
                  : 'border border-white/20 text-gray-300 hover:border-primary-gold/60 hover:text-white'
              }`}
            >
              1. Cinema Letterbox
            </button>
            <button
              onClick={() => setActiveTab('dir2')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'dir2'
                  ? 'bg-primary-gold text-[#141210] shadow-[0_0_16px_rgba(222,172,75,0.4)]'
                  : 'border border-white/20 text-gray-300 hover:border-primary-gold/60 hover:text-white'
              }`}
            >
              2. Central Altar
            </button>
            <button
              onClick={() => setActiveTab('dir3')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeTab === 'dir3'
                  ? 'bg-primary-gold text-[#141210] shadow-[0_0_16px_rgba(222,172,75,0.4)]'
                  : 'border border-white/20 text-gray-300 hover:border-primary-gold/60 hover:text-white'
              }`}
            >
              3. Candlelit Tableau
            </button>

            <button
              onClick={() => setShowScene1Preview((prev) => !prev)}
              className={`ml-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 ${
                showScene1Preview
                  ? 'border border-primary-gold text-primary-gold bg-primary-gold/10'
                  : 'border border-white/10 text-gray-400 hover:text-gray-200'
              }`}
            >
              {showScene1Preview ? 'Hide Scene 1 Scroll' : '+ Preview with Scene 1'}
            </button>
          </div>
        </div>
      </div>

      {/* Optional Scene 1 Simulation to test the scroll transition */}
      {showScene1Preview && (
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center bg-dark-canvas border-b border-primary-gold/20 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="font-serif text-[14vw] text-primary-gold font-bold uppercase tracking-widest">
              CELEBRATES
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <img
              src="/sculptural_cake_hero.png"
              alt="Sculptural cake hero"
              className="h-72 w-auto object-contain mb-4"
            />
            <p className="text-xs uppercase tracking-[0.28em] text-primary-gold font-semibold">
              Scene 1 Reference (Scroll Down to test transition &darr;)
            </p>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DIRECTION 1: THE WIDESCREEN CINEMA LETTERBOX                             */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'dir1') && (
        <div className="relative border-b border-primary-gold/20">
          {activeTab === 'all' && (
            <div className="bg-[#1C1A17] py-2 px-6 border-y border-primary-gold/30 flex items-center justify-between">
              <span className="text-xs font-serif text-primary-gold tracking-widest uppercase">
                Direction 01 / The Widescreen Cinema Letterbox
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">
                Full-Canvas Theater Frame · Zero Left/Right Splits · Zero Buttons
              </span>
            </div>
          )}

          <section
            aria-label="Direction 1 — The Cinema Letterbox"
            className="relative w-full bg-dark-canvas text-brand-white py-20 sm:py-28 lg:py-36 overflow-hidden"
          >
            <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center">
              {/* Scene Chapter Eyebrow */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-primary-gold/25 bg-[#141210] mb-8 select-none">
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-primary-gold">
                  Act I · The Philosophy
                </span>
              </div>

              {/* Centered Grand Editorial Headline */}
              <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.12] tracking-tight max-w-4xl mx-auto mb-6">
                <span className="block text-brand-white">More Than a Cake.</span>
                <span className="block text-primary-gold italic font-serif mt-1">
                  A Celebration, Thoughtfully Created.
                </span>
              </h2>

              {/* Poetic Narrative Sentence */}
              <p className="font-sans text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-normal max-w-2xl mx-auto mb-12 sm:mb-16">
                From exquisite celebration cakes to artfully curated event settings, we unite craftsmanship and aesthetic refinement to give every occasion a distinctive sense of occasion.
              </p>

              {/* Panoramic Cinema Letterbox Aperture */}
              <div className="w-full relative rounded-sm overflow-hidden border border-primary-gold/30 shadow-[0_24px_80px_rgba(0,0,0,0.85)] group">
                <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-[#141210]">
                  <img
                    src="/scene2_celebration_bg.jpg"
                    alt="Artisanal white celebration cake on a gold pedestal within an opulent candlelit ballroom floral setting"
                    className="w-full h-full object-cover object-[center_42%] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Director's Cut Subtitle Plaque along bottom rim */}
                <div className="py-3 px-5 sm:px-8 bg-[#141210] border-t border-primary-gold/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                  <span className="text-[10px] font-sans text-primary-gold uppercase tracking-[0.24em] font-medium">
                    Grand Ballroom &amp; Centerpiece Composition
                  </span>
                  <span className="text-[10px] font-sans text-gray-400 uppercase tracking-[0.2em]">
                    Munyonyo Commonwealth · Styled by Zuena Atelier
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIRECTION 2: THE MONOLITHIC CENTRAL ALTAR                                */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'dir2') && (
        <div className="relative border-b border-primary-gold/20">
          {activeTab === 'all' && (
            <div className="bg-[#1C1A17] py-2 px-6 border-y border-primary-gold/30 flex items-center justify-between">
              <span className="text-xs font-serif text-primary-gold tracking-widest uppercase">
                Direction 02 / The Monolithic Central Altar
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">
                Centered Vertical Spine · Sculpture Pedestal Framing · Zero Buttons
              </span>
            </div>
          )}

          <section
            aria-label="Direction 2 — The Monolithic Central Altar"
            className="relative w-full bg-dark-canvas text-brand-white py-20 sm:py-28 lg:py-36 overflow-hidden"
          >
            <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
              {/* Central Chapter Hairline Axis */}
              <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-primary-gold/60 mb-4" />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-primary-gold mb-5 select-none">
                Act I · The Sacred Setting
              </span>

              {/* Centered Monolithic Title */}
              <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.14] tracking-tight mb-8">
                <span className="block text-brand-white">More Than a Cake.</span>
                <span className="block text-primary-gold italic font-serif mt-1">
                  A Celebration, Thoughtfully Created.
                </span>
              </h2>

              {/* Tall Architectural Portrait Frame on Central Axis */}
              <div className="w-full max-w-lg sm:max-w-xl mx-auto relative my-4 rounded-sm overflow-hidden border border-primary-gold/35 shadow-[0_30px_90px_rgba(0,0,0,0.9)] bg-[#141210]">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src="/scene2_celebration_bg.jpg"
                    alt="Artisanal white celebration cake on a gold pedestal within an opulent candlelit ballroom floral setting"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Vertical Spine Continuation Below Frame */}
              <div className="w-[1px] h-8 bg-gradient-to-b from-primary-gold/60 to-transparent my-6" />

              {/* Centered Editorial Altar Inscription */}
              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-normal max-w-xl mx-auto mb-3">
                From exquisite celebration cakes to artfully curated event settings, we unite craftsmanship and aesthetic refinement to give every occasion a distinctive sense of occasion.
              </p>
              <span className="text-[10px] uppercase tracking-[0.26em] text-champagne-gold/70 font-sans">
                Where Patisserie Meets Spatial Architecture
              </span>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIRECTION 3: THE DARK CANDLELIT TABLEAU                                  */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'dir3') && (
        <div className="relative">
          {activeTab === 'all' && (
            <div className="bg-[#1C1A17] py-2 px-6 border-y border-primary-gold/30 flex items-center justify-between">
              <span className="text-xs font-serif text-primary-gold tracking-widest uppercase">
                Direction 03 / The Dark Candlelit Tableau
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-sans">
                Atmospheric Full-Bleed Auditorium · Natural Chiaroscuro · Zero Buttons
              </span>
            </div>
          )}

          <section
            aria-label="Direction 3 — The Dark Candlelit Tableau"
            className="relative w-full min-h-[700px] sm:min-h-[820px] flex items-center justify-center overflow-hidden bg-dark-canvas py-24 sm:py-32"
          >
            {/* Full-Bleed Background Ballroom Atmosphere */}
            <img
              src="/scene2_celebration_bg.jpg"
              alt="Artisanal white celebration cake on a gold pedestal within an opulent candlelit ballroom floral setting"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none scale-105"
            />

            {/* Natural Chiaroscuro Dark Chamber Shading (No fake side blobs, pure atmospheric hall depth) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#141210]/78 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-dark-canvas via-transparent to-dark-canvas/90 pointer-events-none"
            />

            {/* Centered Floating Golden Message Chamber */}
            <div className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
              {/* Discrete Origin Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary-gold/30 bg-[#141210]/85 mb-8 select-none">
                <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-primary-gold">
                  Act I · The Atmospheric Room
                </span>
              </div>

              {/* Floating Headline */}
              <h2 className="font-serif font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.1] tracking-tight text-white mb-6 [text-shadow:0_4px_30px_rgba(0,0,0,0.9)]">
                <span>More Than a Cake.</span>
                <span className="block text-primary-gold italic font-serif mt-2">
                  A Celebration, Thoughtfully Created.
                </span>
              </h2>

              {/* Hairline Divider */}
              <div className="w-16 h-[1px] bg-primary-gold/60 my-6" />

              {/* Quiet Narrative Stanza */}
              <p className="font-sans text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-normal max-w-xl mx-auto mb-10 [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
                From exquisite celebration cakes to artfully curated event settings, we unite craftsmanship and aesthetic refinement to give every occasion a distinctive sense of occasion.
              </p>

              {/* Subtle Atelier Stamp Seal */}
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-champagne-gold/80 font-sans select-none">
                <span>Kampala Atelier</span>
                <span className="w-1 h-1 rounded-full bg-primary-gold" />
                <span>Bespoke Staging &amp; Sugarcraft</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Bottom Navigation Back to Home */}
      <div className="py-12 bg-[#141210] border-t border-primary-gold/20 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-primary-gold hover:text-white transition-colors"
        >
          <span>&larr; Return to Live Home Page</span>
        </Link>
      </div>
    </div>
  )
}
