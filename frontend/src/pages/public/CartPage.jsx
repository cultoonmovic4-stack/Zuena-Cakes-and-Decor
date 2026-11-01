import { useState } from 'react'
import { Link } from 'react-router'
import ivoryEleganceImg from '../../assets/images/wd 1.jpg'
import chocolateDelightImg from '../../assets/images/3.jpg'

const INITIAL_ITEMS = [
  {
    id: 'item-1',
    number: '01',
    title: 'Ivory Elegance',
    quantity: 1,
    priceUGX: 480000,
    priceFormatted: 'UGX 480,000',
    image: ivoryEleganceImg,
    imageAlt: 'Ivory Elegance celebration cake with delicate champagne drapery and fresh roses on a gold stand',
  },
  {
    id: 'item-2',
    number: '02',
    title: 'Chocolate Delight',
    quantity: 1,
    priceUGX: 450000,
    priceFormatted: 'UGX 450,000',
    image: chocolateDelightImg,
    imageAlt: 'Chocolate Delight two-tier dark chocolate ganache drip cake with truffles and berries on a gold stand',
  },
]

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [selectedId, setSelectedId] = useState(INITIAL_ITEMS[0].id)
  const [hoveredId, setHoveredId] = useState(null)

  const removeItem = (id, e) => {
    e.stopPropagation()
    setItems((prev) => {
      const remaining = prev.filter((item) => item.id !== id)
      if (selectedId === id && remaining.length > 0) {
        setSelectedId(remaining[0].id)
      }
      return remaining
    })
  }

  const resetItems = () => {
    setItems(INITIAL_ITEMS)
    setSelectedId(INITIAL_ITEMS[0].id)
  }

  // Active cake being previewed in the hero frame
  const activeId = hoveredId || selectedId
  const activeItem = items.find((item) => item.id === activeId) || items[0]

  const totalUGX = items.reduce((sum, item) => sum + item.priceUGX * item.quantity, 0)
  const totalFormatted = `UGX ${totalUGX.toLocaleString()}`

  return (
    <div className="min-h-[80vh] w-full bg-[#141210] text-brand-white font-sans py-8 sm:py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="border border-[#4A3828] bg-[#141210] rounded-xl p-10 sm:p-16 text-center shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#DEAC4B] block mb-2">
              Your Cart
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#DEAC4B] mb-3">
              Your Celebration Request is Empty
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-6 font-sans">
              You haven&rsquo;t added any celebratory confections to your request yet. Explore our handcrafted creations to begin.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/creations"
                className="w-full sm:w-auto px-8 py-3 bg-[#DEAC4B] hover:bg-[#FBD46D] text-[#141210] text-xs uppercase tracking-wider font-semibold rounded-md transition-colors text-center"
              >
                Explore Our Creations &rarr;
              </Link>
              <button
                type="button"
                onClick={resetItems}
                className="w-full sm:w-auto px-6 py-3 border border-bronze/40 hover:border-gold-highlight text-gray-300 hover:text-gold-highlight text-xs uppercase tracking-wider font-medium rounded-md transition-colors cursor-pointer"
              >
                Restore Demo Cakes
              </button>
            </div>
          </div>
        ) : (
          /* Enhanced Atelier Composition (Option D with Interactive Cake Preview) */
          <div className="border border-[#4A3828] bg-[#141210] rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Left: Dynamic Hero Cake Photography with Smooth Crossfade */}
            <div className="md:col-span-6 lg:col-span-6 bg-[#0F0E0C] overflow-hidden relative min-h-[300px] sm:min-h-[360px] md:min-h-[480px]">
              {items.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.imageAlt}
                  className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ease-in-out block ${
                    activeItem?.id === item.id
                      ? 'opacity-100 z-10'
                      : 'opacity-0 z-0 pointer-events-none'
                  }`}
                />
              ))}
            </div>

            {/* Right: Atelier Typography & Interactive Order Details */}
            <div className="md:col-span-6 lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-[#141210]">
              <div>
                {/* Eyebrow */}
                <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#DEAC4B] font-medium block mb-2">
                  Your Cart
                </span>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#DEAC4B] leading-tight mb-2 tracking-tight">
                  A Celebration of Sweet Moments.
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13px] text-gray-400 font-sans leading-relaxed mb-6 sm:mb-8">
                  Review your selected cakes before proceeding.
                </p>

                {/* Interactive Numbered Items List */}
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item) => {
                    const isCurrent = activeItem?.id === item.id
                    return (
                      <article
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedId(item.id)}
                        className={`group p-3 sm:p-3.5 rounded-md border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-[#1D1915] border-[#DEAC4B]/60 shadow-md translate-x-1'
                            : 'bg-transparent border-transparent hover:bg-white/5 border-l-2 hover:border-l-[#DEAC4B]/40'
                        }`}
                      >
                        {/* Number & Name */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span
                            className={`text-sm sm:text-base font-serif font-medium transition-colors ${
                              isCurrent ? 'text-[#DEAC4B]' : 'text-gray-500 group-hover:text-gray-300'
                            }`}
                          >
                            {item.number}
                          </span>
                          <div>
                            <h2
                              className={`text-base sm:text-lg font-serif font-normal transition-colors leading-snug ${
                                isCurrent ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white'
                              }`}
                            >
                              {item.title}
                            </h2>
                            <p className="text-xs text-gray-400 font-sans mt-0.5">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Price & Remove */}
                        <div className="text-right shrink-0">
                          <span
                            className={`text-base sm:text-lg font-serif font-semibold block leading-snug transition-colors ${
                              isCurrent ? 'text-[#DEAC4B]' : 'text-[#DEAC4B]/80'
                            }`}
                          >
                            {item.priceFormatted}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => removeItem(item.id, e)}
                            className="text-xs text-[#DEAC4B] hover:text-[#FBD46D] underline underline-offset-4 mt-0.5 inline-block transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Summary & Action */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-[#33281E]">
                {/* Total Row */}
                <div className="flex items-baseline justify-between mb-4 sm:mb-5">
                  <span className="text-xs sm:text-sm text-gray-400 font-sans tracking-wide">
                    Estimated Total
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-semibold text-[#DEAC4B]">
                    {totalFormatted}
                  </span>
                </div>

                {/* Full-Width Order Review Action */}
                <button
                  type="button"
                  className="w-full py-3.5 bg-[#DEAC4B] hover:bg-[#FBD46D] text-[#141210] font-medium text-xs sm:text-sm tracking-wide rounded-md transition-colors cursor-pointer shadow-md text-center"
                >
                  Request Order Review &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
