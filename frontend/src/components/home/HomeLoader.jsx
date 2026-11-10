import { useState, useEffect } from 'react'

/**
 * HomeLoader — Signature Luxury Atelier Entrance Loader for Zuena Cakes & Decor
 *
 * Displays a cinematic, warm golden preloader when the homepage begins,
 * showcasing the brand emblem, progress track, and luxury editorial tagline
 * before smoothly dissolving into the main showcase.
 */
export default function HomeLoader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setProgress(100)
      setIsExiting(true)
      const timeout = setTimeout(() => {
        setIsMounted(false)
        if (onComplete) onComplete()
      }, 200)
      return () => clearTimeout(timeout)
    }

    // Smooth progress tick over ~1.7 seconds
    const startTime = performance.now()
    const totalDuration = 1700 // milliseconds

    let animationFrameId

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime
      const rawProgress = Math.min(100, Math.round((elapsed / totalDuration) * 100))
      
      // Gentle ease-out curve
      const easedProgress = Math.min(
        100,
        Math.round(100 * (1 - Math.pow(1 - rawProgress / 100, 2.2)))
      )

      setProgress(easedProgress)

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress)
      } else {
        // Trigger smooth fade-out exit
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(() => {
            setIsMounted(false)
            if (onComplete) onComplete()
          }, 650) // Matches exit transition duration
        }, 220)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [onComplete])

  if (!isMounted) return null

  // Contextual atelier status phrases
  const getStatusText = (val) => {
    if (val < 35) return 'Lighting the Atelier...'
    if (val < 70) return 'Curating Signature Creations...'
    if (val < 98) return 'Perfecting Every Detail...'
    return 'Welcome to Zuena'
  }

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsMounted(false)
      if (onComplete) onComplete()
    }, 200)
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Zuena Cakes & Decor"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F0D0B] text-brand-white select-none transition-all duration-700 ease-out ${
        isExiting
          ? 'opacity-0 pointer-events-none scale-102 backdrop-blur-0'
          : 'opacity-100'
      }`}
    >
      {/* Background radial golden ambiance glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(222, 172, 75, 0.16) 0%, rgba(20, 18, 16, 0.8) 55%, #0B0A08 100%)',
        }}
      />

      {/* Decorative luxury corner vignettes */}
      <div className="absolute top-6 left-6 text-bronze/40 font-mono text-[10px] tracking-[0.25em] uppercase hidden sm:block">
        EST. KAMPALA &bull; UG
      </div>
      <div className="absolute top-6 right-6 text-bronze/40 font-mono text-[10px] tracking-[0.25em] uppercase hidden sm:block">
        ATELIER D&rsquo;ARTISAN
      </div>

      {/* Center Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Animated Brand Emblem with Concentric Gold Rings */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
          {/* Outer dashed spinning ring */}
          <div
            className="absolute inset-0 rounded-full border border-primary-gold/30 border-dashed animate-[spin_24s_linear_infinite]"
            style={{ willChange: 'transform' }}
          />

          {/* Middle counter-rotating ring with spark marker */}
          <div
            className="absolute inset-2 rounded-full border border-primary-gold/20 animate-[spin_18s_linear_infinite_reverse]"
            style={{ willChange: 'transform' }}
          >
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-primary-gold text-[10px]">
              ✦
            </span>
          </div>

          {/* Glowing central core circle holding Zuena logo */}
          <div
            className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#181512] border border-primary-gold/70 flex items-center justify-center p-3.5 shadow-[0_0_40px_rgba(222,172,75,0.32)] transition-transform duration-500 hover:scale-105"
            style={{
              animation: 'goldPulse 2.8s ease-in-out infinite',
            }}
          >
            <img
              src="/z.png"
              alt="Zuena Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(222,172,75,0.4)]"
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-1.5 mb-7">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.28em] text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold via-primary-gold to-gold-highlight m-0 uppercase drop-shadow-sm">
            Zuena
          </h1>
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.38em] text-champagne-gold/90 uppercase font-medium">
            Cakes &amp; Decor
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-gray-400 uppercase pt-1">
            Haute P&acirc;tisserie &bull; Bespoke Celebrations
          </p>
        </div>

        {/* Minimalist Gold Progress Bar */}
        <div className="w-48 sm:w-56 mb-4">
          <div className="w-full h-[2px] bg-[#2A231C] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-primary-gold via-gold-highlight to-primary-gold transition-all duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(222,172,75,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Status text & percentage */}
        <div className="flex items-center justify-between w-48 sm:w-56 text-[10px] font-mono text-gray-400">
          <span className="text-champagne-gold/80 truncate max-w-[140px] text-left">
            {getStatusText(progress)}
          </span>
          <span className="text-primary-gold font-semibold tracking-wider">
            {progress}%
          </span>
        </div>
      </div>

      {/* Discreet Skip Button (bottom-right) */}
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip introduction animation"
        className="absolute bottom-6 right-6 text-gray-400 hover:text-champagne-gold font-mono text-[11px] tracking-widest uppercase transition-colors px-3 py-1.5 rounded border border-bronze/30 hover:border-primary-gold/50 cursor-pointer bg-[#141210]/60 backdrop-blur-sm"
      >
        Skip &rarr;
      </button>

      {/* Bottom subtle copyright / craft footnote */}
      <div className="absolute bottom-6 left-6 text-bronze/40 font-mono text-[10px] tracking-wider hidden sm:block">
        &copy; {new Date().getFullYear()} Zuena Atelier
      </div>
    </div>
  )
}
