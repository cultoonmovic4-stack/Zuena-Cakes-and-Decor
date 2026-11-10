import { useState, useEffect } from 'react'

export default function HomeLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true)
      const unmountTimer = setTimeout(() => {
        setIsVisible(false)
      }, 400)
      return () => clearTimeout(unmountTimer)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#141210] transition-opacity duration-400 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Simple rotating ring */}
        <div className="w-full h-full rounded-full border-2 border-primary-gold/25 border-t-primary-gold animate-spin" />

        {/* Logo centered inside the ring */}
        <img
          src="/z.png"
          alt="Zuena"
          className="absolute w-8 h-8 object-contain"
        />
      </div>
    </div>
  )
}
