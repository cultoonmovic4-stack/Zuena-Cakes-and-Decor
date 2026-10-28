import { Link } from 'react-router'

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest px-3 py-1 bg-bronze/20 text-gold-highlight border border-bronze/40 rounded-full font-mono font-medium">
          Order Review
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary-gold mt-3 mb-2">
          Your Order Request
        </h1>
        <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
          Review your selected catalogue cake items and submit your request for staff review without creating an account.
        </p>
      </div>

      {/* Cart Content Shell (Honest Empty State) */}
      <div className="bg-[#1A1815] border border-bronze/30 rounded-xl p-8 sm:p-12 text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-bronze/20 border border-bronze/40 flex items-center justify-center mx-auto mb-4 text-primary-gold">
          <svg aria-hidden="true" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-semibold text-primary-gold mb-2">
          Your Order Request is Empty
        </h2>
        <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
          You haven&apos;t added any catalogue cakes to your order request yet. Browse Our Creations to explore available designs and options.
        </p>
        <Link
          to="/creations"
          className="inline-block px-6 py-3 bg-primary-gold hover:bg-gold-highlight text-dark-canvas font-medium text-xs rounded transition-colors"
        >
          Explore Our Creations &rarr;
        </Link>
      </div>

      {/* Guest Checkout & Order Workflow Notice */}
      <div className="bg-[#141210] border border-white/10 rounded-xl p-6 text-xs text-gray-400 space-y-3">
        <h3 className="font-semibold text-gray-200 uppercase tracking-wider font-mono text-[11px]">
          Order Request Workflow &bull; Phase 3B Architecture Notice
        </h3>
        <p>
          &bull; <strong>No Account Required:</strong> Customers can submit order requests directly without registration.
        </p>
        <p>
          &bull; <strong>Multi-Item Support:</strong> Multiple catalogue cakes and cupcake assortments can be combined in one request.
        </p>
        <p>
          &bull; <strong>Request Review Process:</strong> Submissions represent order requests. Authorized staff will contact you to verify date availability, customization options, and final pricing.
        </p>
        <div className="pt-2 text-[11px] text-gold-highlight font-mono">
          Interactive cart state management (Context/localStorage) and guest checkout forms are scheduled for Phase 3F.
        </div>
      </div>
    </div>
  )
}
