import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/creations', label: 'Our Creations' },
  { to: '/custom-cake', label: 'Custom Cake' },
  { to: '/decorations', label: 'Decorations' },
]

const footerCakeLinks = [
  { to: '/creations', label: 'Our Creations' },
  { to: '/custom-cake', label: 'Custom Cake Requests' },
  { to: '/cart', label: 'Shopping Cart' },
]

const footerDecorLinks = [
  { to: '/decorations', label: 'Event Decorations' },
  { to: '/decorations/enquire', label: 'Decoration Enquiry' },
  { to: '/', label: 'Home' },
]

export default function PublicLayout() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Automatically reset mobile menu on route change without useEffect cascading render
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Initialize AOS scroll animations
  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 60,
    })
  }, [])

  // Refresh AOS positions on route change
  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  // Track window scroll position for Back to Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 font-serif text-sm tracking-wide border-l-2 transition-colors ${
      isActive
        ? 'text-primary-gold border-primary-gold bg-bronze/10'
        : 'text-gray-300 border-transparent hover:text-gold-highlight hover:bg-white/5'
    }`

  return (
    <div className="min-h-screen flex flex-col bg-dark-canvas text-brand-white font-sans">
      {/* Public Header Shell — Concept 4: Serif Editorial Minimal */}
      <header
        aria-label="Site Header"
        className="w-full bg-[#141210] border-b border-bronze/25 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand Link */}
          <Link
            to="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded-xs"
            aria-label="Zuena Cakes & Decor Home"
          >
            <img
              src="/z.png"
              alt="Zuena Cakes & Decor Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation (>= 768px / md:) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `py-1.5 font-serif text-sm lg:text-[15px] tracking-wide transition-colors ${
                    isActive
                      ? 'text-primary-gold border-b border-primary-gold'
                      : 'text-gray-300 hover:text-gold-highlight'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <span aria-hidden="true" className="h-4 w-[1px] bg-bronze/35" />

            {/* Unboxed Editorial Cart Link */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 py-1.5 font-serif text-sm lg:text-[15px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded-xs ${
                  isActive
                    ? 'text-primary-gold border-b border-primary-gold'
                    : 'text-gray-300 hover:text-gold-highlight'
                }`
              }
              aria-label="Shopping Cart, 0 items"
            >
              <svg aria-hidden="true" className="w-4 h-4 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart</span>
              <span className="text-[11px] font-mono text-primary-gold">(0)</span>
            </NavLink>
          </nav>

          {/* Mobile Right Controls (< 768px): Unboxed Cart + Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <Link
              to="/cart"
              className="inline-flex items-center gap-1 py-1.5 text-xs text-gray-300 hover:text-primary-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold"
              aria-label="Shopping Cart, 0 items"
            >
              <svg aria-hidden="true" className="w-4 h-4 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-[11px] font-mono text-primary-gold">(0)</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-300 hover:text-primary-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile Navigation"
            className="md:hidden bg-[#181614] border-b border-bronze/25 px-3 py-3 space-y-1"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/cart"
              onClick={closeMobileMenu}
              className={mobileNavLinkClass}
            >
              Cart (0)
            </NavLink>
          </nav>
        )}
      </header>

      {/* Main Public Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Public Footer — The Editorial Signature (Approved Direction A) */}
      <footer
        aria-label="Site Footer"
        className="w-full bg-dark-canvas text-brand-white border-t border-bronze/30 font-sans overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper Tier: Prominent Editorial Brand Statement & Considered Logo Signature */}
          <div
            data-aos="fade-up"
            className="pt-14 sm:pt-20 pb-12 sm:pb-16 border-b border-bronze/25 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end"
          >
            <div className="md:col-span-8 lg:col-span-9">
              <span className="block font-sans text-[11px] uppercase tracking-[0.24em] text-champagne-gold mb-4">
                Kampala &bull; Cakes &amp; Event Styling Since 2014
              </span>
              <p className="font-serif font-normal text-2xl sm:text-3xl lg:text-4xl text-brand-white leading-[1.22] tracking-tight max-w-3xl">
                Making Kampala&rsquo;s celebrations sweeter since 2014.{' '}
                <span className="text-primary-gold">
                  Custom cakes and decorations for all occasions.
                </span>
              </p>
            </div>

            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start md:items-end justify-end">
              <Link
                to="/"
                aria-label="Zuena Cakes & Decor Home"
                className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded"
              >
                <img
                  src="/z.png"
                  alt="Zuena Cakes & Decor Logo"
                  className="h-14 sm:h-16 w-auto object-contain block"
                />
              </Link>
              <span className="font-serif italic text-xs text-gray-400 mt-2">
                Artisanal Bakery &amp; Event Atelier
              </span>
            </div>
          </div>

          {/* Middle Tier: Asymmetrical 12-Column Navigation & Contact Ledger */}
          <div
            data-aos="fade-up"
            data-aos-delay="120"
            className="py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start"
          >
            {/* Cols 1-5: Kampala Atelier Contact Ledger */}
            <div className="md:col-span-5">
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-gold mb-4">
                Atelier &amp; Enquiries
              </h2>
              <dl className="divide-y divide-bronze/20 border-y border-bronze/20 text-xs sm:text-sm">
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-gray-400 font-normal">Location</dt>
                  <dd className="text-brand-white text-right">Kiwatule Rd, Kampala, Uganda</dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-gray-400 font-normal">Telephone</dt>
                  <dd className="text-right">
                    <a
                      href="tel:+256705100010"
                      className="text-champagne-gold hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded"
                    >
                      +256 705 100 010
                    </a>
                  </dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="text-gray-400 font-normal">Email</dt>
                  <dd className="text-right">
                    <a
                      href="mailto:info@zuenacakes.com"
                      className="text-champagne-gold hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded"
                    >
                      info@zuenacakes.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Cols 7-9: Celebration Cakes Navigation */}
            <nav
              aria-label="Footer Celebration Cakes Navigation"
              className="md:col-span-3 md:col-start-7"
            >
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-gold mb-4">
                Celebration Cakes
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerCakeLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-gray-300 hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded py-0.5 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Cols 10-12: Event Decoration Navigation */}
            <nav
              aria-label="Footer Event Styling Navigation"
              className="md:col-span-3"
            >
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-gold mb-4">
                Event Styling &amp; Decor
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                {footerDecorLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-gray-300 hover:text-gold-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold rounded py-0.5 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Tier: Restrained Colophon */}
          <div className="py-6 border-t border-bronze/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
            <p>&copy; 2026 Zuena Cakes &amp; Decor. All rights reserved.</p>
            <p className="text-gray-500 text-center sm:text-right">
              Order and enquiry requests are reviewed directly by staff to confirm date availability and bespoke options.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141210]/90 backdrop-blur-xs border border-primary-gold/70 text-primary-gold hover:bg-primary-gold hover:text-[#141210] shadow-[0_8px_28px_rgba(0,0,0,0.65)] flex items-center justify-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#141210] ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  )
}
