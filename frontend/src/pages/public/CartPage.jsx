import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../../context/useCart.js'
import { createOrder } from '../../admin/orders/ordersService.js'

export default function CartPage() {
  const {
    items,
    removeItem: removeCartItem,
    resetItems,
    clearCart,
    totalCount,
    totalUGX,
    totalFormatted,
  } = useCart()

  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  // Order Submission State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState(null)
  const [formError, setFormError] = useState('')

  // Form Fields
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [occasion, setOccasion] = useState('Celebration')
  const [eventDate, setEventDate] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [orderNotes, setOrderNotes] = useState('')

  const removeItem = (id, e) => {
    e.stopPropagation()
    removeCartItem(id)
  }

  // Quick fill helper for effortless development & preview testing
  const handleFillDemoData = () => {
    setCustomerName('Brenda Namubiru')
    setCustomerPhone('+256 701 452 891')
    setCustomerEmail('b.namubiru@gmail.com')
    setOccasion('Wedding Reception')
    setEventDate('2026-11-28')
    setDeliveryAddress('Munyonyo Commonwealth Resort, Victoria Ballroom, Kampala')
    setOrderNotes('Please coordinate delivery timing with venue manager.')
    setFormError('')
  }

  // Handle final submission of order into admin orders store
  const handleSubmitOrder = async (e) => {
    e.preventDefault()

    const name = customerName.trim()
    const phone = customerPhone.trim()

    if (!name || !phone) {
      setFormError('Please provide your name and phone number so our atelier can contact you.')
      return
    }

    setIsSubmitting(true)
    setFormError('')

    try {
      const created = await createOrder({
        items,
        totalUGX,
        customer: {
          name,
          phone,
          email: customerEmail.trim() || 'customer@zuena.co.ug',
        },
        occasion: occasion.trim() || 'Celebration',
        fulfilment: {
          method: 'delivery',
          date: eventDate || '',
          time: 'Morning / Afternoon',
          address: deliveryAddress.trim() || 'Kampala, Uganda',
          notes: orderNotes.trim(),
        },
        notes: orderNotes.trim(),
      })

      clearCart()
      setIsReviewModalOpen(false)
      setSubmittedOrder(created)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setFormError(err?.message || 'Failed to submit order request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Active cake being previewed in the hero frame
  const activeId = hoveredId || selectedId
  const activeItem = items.find((item) => item.id === activeId) || items[0]

  return (
    <div className="min-h-[80vh] w-full bg-[#141210] text-brand-white font-sans py-8 sm:py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        {submittedOrder ? (
          /* ===================================================================
             ORDER CONFIRMATION STATE (Sent directly to Admin Orders Store)
             =================================================================== */
          <div className="border border-[#4A3828] bg-[#141210] rounded-xl p-8 sm:p-12 shadow-2xl max-w-2xl mx-auto text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-primary-gold/15 border border-primary-gold/40 text-primary-gold flex items-center justify-center mx-auto mb-5 shadow-lg">
              <svg aria-hidden="true" className="w-7 h-7 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-primary-gold block mb-2 font-semibold">
              Celebration Request Received
            </span>

            <h1 className="text-2xl sm:text-3xl font-serif font-normal text-brand-white mb-2">
              Order Request Submitted!
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-6 font-sans">
              Thank you, <strong className="text-champagne-gold">{submittedOrder.customer?.name}</strong>. Your cake request has been recorded in our system. Our team will review your specifications and contact you on <strong className="text-champagne-gold">{submittedOrder.customer?.phone}</strong> to confirm details.
            </p>

            {/* Order Summary Snapshot */}
            <div className="bg-[#1B1815] border border-bronze/30 rounded-lg p-5 my-6 text-left space-y-3 font-sans text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-bronze/20">
                <span className="text-gray-400 font-mono uppercase tracking-wider">Reference Code:</span>
                <span className="font-mono text-sm text-primary-gold font-bold">
                  {submittedOrder.reference}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-primary-gold/15 text-primary-gold border border-primary-gold/40 font-medium">
                  Pending Review
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Items Ordered:</span>
                <span className="text-brand-white font-medium">
                  {submittedOrder.items?.length} {submittedOrder.items?.length === 1 ? 'Creation' : 'Creations'}
                </span>
              </div>
              {submittedOrder.fulfilment?.date && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Celebration Date:</span>
                  <span className="text-brand-white">{submittedOrder.fulfilment.date}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-bronze/20">
                <span className="text-gray-400 font-mono uppercase tracking-wider">Estimated Total:</span>
                <span className="font-serif text-base text-primary-gold font-semibold">
                  UGX {submittedOrder.estimatedTotalUGX?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Verification Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/admin/orders"
                className="w-full sm:w-auto px-6 py-3 bg-primary-gold hover:bg-gold-highlight text-dark-canvas text-xs uppercase tracking-wider font-semibold rounded-md transition-colors text-center shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>View in Admin Portal</span>
                <span>&rarr;</span>
              </Link>
              <Link
                to="/creations"
                className="w-full sm:w-auto px-6 py-3 border border-bronze/40 hover:border-primary-gold text-gray-300 hover:text-white text-xs uppercase tracking-wider font-medium rounded-md transition-colors text-center"
              >
                Browse More Creations
              </Link>
              <button
                type="button"
                onClick={() => setSubmittedOrder(null)}
                className="w-full sm:w-auto px-4 py-3 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* ===================================================================
             EMPTY CART STATE
             =================================================================== */
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
          /* ===================================================================
             ACTIVE CART COMPOSITION
             =================================================================== */
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
                  Your Cart &bull; {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
                </span>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#DEAC4B] leading-tight mb-2 tracking-tight">
                  A Celebration of Sweet Moments.
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-[13px] text-gray-400 font-sans leading-relaxed mb-6 sm:mb-8">
                  Review your selected cakes before submitting to the atelier.
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
                              Qty: {item.quantity}{item.tierLabel ? ` • ${item.tierLabel}` : ''}{item.flavor ? ` • ${item.flavor}` : ''}
                            </p>
                            {item.specialNote && (
                              <p className="text-[11px] text-primary-gold/80 italic font-sans mt-0.5 line-clamp-1">
                                Note: {item.specialNote}
                              </p>
                            )}
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
                  onClick={() => {
                    setFormError('')
                    setIsReviewModalOpen(true)
                  }}
                  className="w-full py-3.5 bg-[#DEAC4B] hover:bg-[#FBD46D] text-[#141210] font-medium text-xs sm:text-sm tracking-wide rounded-md transition-colors cursor-pointer shadow-md text-center"
                >
                  Request Order Review &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================
         ORDER REVIEW & CUSTOMER DETAILS MODAL
         =================================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-lg bg-[#161311] border border-bronze/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-bronze/25 flex items-center justify-between bg-[#191613]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-gold block">
                  Zuena Atelier &bull; Order Request
                </span>
                <h3 id="modal-title" className="font-serif text-lg sm:text-xl text-brand-white">
                  Review &amp; Customer Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 rounded transition-colors text-lg leading-none cursor-pointer"
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitOrder} className="p-6 overflow-y-auto space-y-4">
              {/* Order Quick Summary Header */}
              <div className="p-3 bg-[#1D1915] border border-bronze/30 rounded-lg flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-gray-400">Total Selection:</span>
                  <span className="text-champagne-gold font-medium ml-1.5">
                    {totalCount} {totalCount === 1 ? 'Cake' : 'Cakes'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Estimated Total:</span>
                  <span className="text-primary-gold font-serif font-semibold ml-1.5">
                    {totalFormatted}
                  </span>
                </div>
              </div>

              {/* Development Convenience: Demo Autofill */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                <span>Enter contact details for order review:</span>
                <button
                  type="button"
                  onClick={handleFillDemoData}
                  className="text-primary-gold hover:text-gold-highlight underline cursor-pointer font-sans"
                >
                  Quick Demo Fill
                </button>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-xs text-red-200">
                  {formError}
                </div>
              )}

              {/* Field 1: Full Name */}
              <div>
                <label htmlFor="customer-name" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                  Full Name <span className="text-primary-gold">*</span>
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  placeholder="e.g. Brenda Namubiru"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                />
              </div>

              {/* Field 2: Phone / WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                    Phone / WhatsApp <span className="text-primary-gold">*</span>
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    placeholder="e.g. +256 701 452 891"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="customer-email" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    placeholder="e.g. client@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                  />
                </div>
              </div>

              {/* Field 3: Occasion & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="order-occasion" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                    Occasion / Celebration
                  </label>
                  <input
                    id="order-occasion"
                    type="text"
                    placeholder="e.g. Royal Wedding Reception"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="event-date" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                    Celebration Date
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                  />
                </div>
              </div>

              {/* Field 4: Delivery Venue / Address */}
              <div>
                <label htmlFor="delivery-address" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                  Delivery Venue or Address in Kampala
                </label>
                <input
                  id="delivery-address"
                  type="text"
                  placeholder="e.g. Munyonyo Commonwealth Resort, Kampala"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors"
                />
              </div>

              {/* Field 5: Special Notes */}
              <div>
                <label htmlFor="order-notes" className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-1">
                  Special Notes or Inscription Requests
                </label>
                <textarea
                  id="order-notes"
                  rows={2}
                  placeholder="e.g. Gold script topper 'Happy 50th Anniversary', coordinate setup with hall manager..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-[#141210] border border-bronze/40 focus:border-primary-gold rounded px-3.5 py-2 text-xs text-brand-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-gold transition-colors resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-bronze/25 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded border border-bronze/40 text-gray-300 hover:text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded bg-primary-gold hover:bg-gold-highlight text-dark-canvas text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Confirm & Send to Atelier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
