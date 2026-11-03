/**
 * Presentational sections for the Custom Cake Request page.
 * Corporate / editorial styling: flat surfaces, hairline borders, square corners.
 * Purely visual — no form logic lives here.
 */
import weddingImg from '../../assets/images/4.jpg'
import culturalImg from '../../assets/images/1.jpg'
import themedCoatImg from '../../assets/images/6.jpg'
import graduationImg from '../../assets/images/gd 4.jpg'
import professionImg from '../../assets/images/5.jpg'
import birthdayImg from '../../assets/images/2.jpg'
import colourfulImg from '../../assets/images/9.jpg'
import processImg from '../../assets/images/10.jpg'

const HERO_FACTS = [
  ['Process', '4-step request'],
  ['Review', 'By our bakers'],
  ['At submission', 'No payment taken'],
]

export function HeroShowcase() {
  return (
    <section
      aria-labelledby="custom-cake-hero-heading"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Copy */}
        <div className="lg:col-span-6" data-aos="fade-up">
          <p className="flex items-center gap-3 m-0 text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-primary-gold" />
            BESPOKE CREATIONS
          </p>
          <h1
            id="custom-cake-hero-heading"
            className="mt-5 mb-5 text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-serif font-semibold text-brand-white"
          >
            Request a <span className="text-primary-gold">Custom Cake</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed m-0">
            Every celebration deserves something extraordinary. From elegant wedding cakes to creative cultural designs, share your vision with us and let our bakers craft something uniquely yours.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#request-form"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-sm bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210]"
            >
              Start Your Request
            </a>
            <a
              href="#consultation-process"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-sm border border-white/25 text-gray-100 hover:border-primary-gold hover:text-primary-gold text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
            >
              How It Works
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 border-t border-white/15 m-0">
            {HERO_FACTS.map(([term, detail], i) => (
              <div
                key={term}
                className={`pt-4 pr-3 ${i > 0 ? 'pl-4 border-l border-white/15' : ''}`}
              >
                <dt className="text-[11px] uppercase tracking-wider text-gray-400">{term}</dt>
                <dd className="m-0 mt-1 text-sm text-brand-white font-medium">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photography grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="150">
          <figure className="row-span-2 m-0">
            <img
              src={weddingImg}
              alt="Four-tier white wedding cake with red roses and a gold monogram"
              className="w-full h-[360px] sm:h-[520px] lg:h-[540px] object-cover border border-white/10"
            />
            <figcaption className="mt-2 text-[11px] uppercase tracking-wider text-gray-400">
              Wedding
            </figcaption>
          </figure>
          <figure className="m-0">
            <img
              src={culturalImg}
              alt="Two-tier cultural cake with a striped panel and a bark-textured base"
              className="w-full h-[160px] sm:h-[240px] lg:h-[250px] object-cover border border-white/10"
            />
            <figcaption className="mt-2 text-[11px] uppercase tracking-wider text-gray-400">
              Cultural
            </figcaption>
          </figure>
          <figure className="m-0">
            <img
              src={themedCoatImg}
              alt="Sculpted cake in the shape of a white lab coat with a stethoscope"
              className="w-full h-[160px] sm:h-[240px] lg:h-[250px] object-cover border border-white/10"
            />
            <figcaption className="mt-2 text-[11px] uppercase tracking-wider text-gray-400">
              Sculpted &amp; themed
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export function ProcessOrbit({ steps, heading, intro, notice }) {
  return (
    <section
      id="consultation-process"
      aria-labelledby="consultation-process-heading"
      className="bg-[#1A1815] border-y border-white/10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Photograph, full height of the section on large screens */}
        <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] lg:min-h-full" data-aos="fade-up">
          <img
            src={processImg}
            alt="Two-tier cake with lit pink candles, strawberries and sugar flowers on a marble counter"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-14 py-12 sm:py-16 lg:py-20">
          <p className="flex items-center gap-3 m-0 mb-4 text-xs uppercase tracking-[0.25em] text-champagne-gold font-medium">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-primary-gold" />
            The Process
          </p>
          <h2
            id="consultation-process-heading"
            className="m-0 mb-4 text-3xl sm:text-4xl font-serif font-semibold text-primary-gold"
          >
            {heading}
          </h2>
          <p className="m-0 mb-10 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
            {intro}
          </p>

          <ol className="list-none p-0 m-0 border-b border-white/15">
            {steps.map((step, index) => (
              <li
                key={step.number}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[6rem_1fr] items-start gap-4 sm:gap-6 py-6 border-t border-white/15"
              >
                <span
                  aria-hidden="true"
                  className="font-serif text-5xl sm:text-6xl leading-none text-primary-gold"
                >
                  {step.number}
                </span>
                <div>
                  <h3 className="m-0 mb-1.5 text-lg sm:text-xl font-serif font-semibold text-brand-white">
                    <span className="sr-only">Step {Number(step.number)}: </span>
                    {step.title}
                  </h3>
                  <p className="m-0 text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <p
            role="note"
            aria-label="Booking and payment notice"
            data-aos="fade-up"
            className="mt-8 mb-0 bg-primary-gold text-dark-canvas px-5 py-4 text-sm leading-relaxed"
          >
            <strong className="font-bold">Please note: </strong>
            {notice}
          </p>
        </div>
      </div>
    </section>
  )
}

const GALLERY = [
  { src: graduationImg, label: 'Graduation', alt: 'Navy and teal ombre graduation cake with a mortarboard topper' },
  { src: professionImg, label: 'Profession-themed', alt: 'Three-tier cream cake decorated with a heartbeat line, nurse cap and stethoscope' },
  { src: birthdayImg, label: 'Birthday', alt: 'Pink two-tier heart-shaped cake with buttercream roses and butterflies' },
  { src: colourfulImg, label: 'Colourful celebration', alt: 'Yellow two-tier cake with rainbow sprinkles and piped rosettes' },
]

export function InspirationGallery() {
  return (
    <section
      aria-labelledby="inspiration-gallery-heading"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8" data-aos="fade-up">
        <h2
          id="inspiration-gallery-heading"
          className="m-0 text-2xl sm:text-3xl font-serif font-semibold text-primary-gold"
        >
          Styles We Can Create
        </h2>
        <p className="m-0 text-sm text-gray-400 max-w-md">
          A few directions for inspiration. Your cake is designed around your own brief.
        </p>
      </div>
      <ul className="list-none p-0 m-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {GALLERY.map((item, index) => (
          <li key={item.label} data-aos="fade-up" data-aos-delay={(index % 2) * 100}>
            <figure className="m-0">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover border border-white/10"
              />
              <figcaption className="mt-2 text-[11px] uppercase tracking-wider text-gray-400">
                {item.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}

const SIDEBAR_STEPS = ['Event Details', 'Cake Preferences', 'Design Inspiration', 'Contact & Delivery']

/** Flat progress list and running summary shown beside the form on large screens. */
export function RequestSidebar({ currentStep, highestCompletedStep, values }) {
  const rows = [
    ['Occasion', values.occasion],
    ['Date', values.eventDate],
    ['Servings', values.servings],
    ['Flavour', values.flavour],
    ['Style', values.cakeStyle],
    ['Tiers', values.tiers],
  ]

  return (
    <aside
      aria-label="Request summary"
      className="hidden lg:flex flex-col p-8 bg-[#141210] border-r border-white/10"
    >
      <p className="m-0 mb-4 text-[11px] uppercase tracking-[0.2em] text-champagne-gold font-medium">
        Progress
      </p>
      <ol className="list-none p-0 m-0 mb-8">
        {SIDEBAR_STEPS.map((label, i) => {
          const n = i + 1
          const done = n <= highestCompletedStep && n !== currentStep
          const active = n === currentStep
          return (
            <li
              key={label}
              aria-current={active ? 'step' : undefined}
              className={`flex items-center gap-3 py-2.5 border-b border-white/10 text-sm ${
                active ? 'text-brand-white font-medium' : done ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              <span
                className={`w-6 h-6 shrink-0 flex items-center justify-center text-[11px] font-mono border ${
                  active
                    ? 'bg-primary-gold border-primary-gold text-dark-canvas'
                    : done
                    ? 'border-primary-gold text-primary-gold'
                    : 'border-white/20'
                }`}
              >
                {done ? '✓' : n}
              </span>
              {label}
            </li>
          )
        })}
      </ol>

      <p className="m-0 mb-3 text-[11px] uppercase tracking-[0.2em] text-champagne-gold font-medium">
        Your selections
      </p>
      <dl className="m-0 text-xs">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-3 py-2 border-b border-white/10"
          >
            <dt className="text-gray-400">{label}</dt>
            <dd
              className={`m-0 text-right truncate max-w-[60%] ${
                value ? 'text-brand-white' : 'text-gray-600'
              }`}
            >
              {value || '—'}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-auto pt-6 m-0 text-[11px] leading-relaxed text-gray-500">
        This is a summary only. Your request is reviewed by our team before anything is confirmed.
      </p>
    </aside>
  )
}
