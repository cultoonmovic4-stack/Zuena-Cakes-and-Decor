import { Routes, Route } from 'react-router'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import HomePage from './pages/public/HomePage.jsx'
import CreationsPage from './pages/public/CreationsPage.jsx'
import ProductDetailPage from './pages/public/ProductDetailPage.jsx'
import CustomCakePage from './pages/public/CustomCakePage.jsx'
import DecorationsPage from './pages/public/DecorationsPage.jsx'
import DecorationEnquiryPage from './pages/public/DecorationEnquiryPage.jsx'
import CartPage from './pages/public/CartPage.jsx'

function AdminLoginPlaceholder() {
  return (
    <div className="min-h-screen bg-dark-canvas text-brand-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-[#1A1815] border border-bronze/40 rounded-xl p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-semibold text-primary-gold mb-3 font-serif">
          Administrative Login
        </h1>
        <p className="text-sm text-gray-400 font-sans">
          Temporary standalone route destination for /admin/login
        </p>
      </div>
    </div>
  )
}

function AdminSectionPlaceholder() {
  return (
    <div className="max-w-4xl mx-auto bg-[#1A1815] border border-white/10 rounded-xl p-8">
      <h1 className="text-2xl font-semibold text-primary-gold mb-3 font-serif">
        Admin Section
      </h1>
      <p className="text-sm text-gray-400 font-sans">
        Temporary route destination for /admin/* inside AdminLayout
      </p>
    </div>
  )
}

function PublicNotFoundPlaceholder() {
  return (
    <div className="py-20 px-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold text-primary-gold mb-3 font-serif">
        Page Not Found
      </h1>
      <p className="text-sm text-gray-400 font-sans">
        The requested public URL does not exist.
      </p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Standalone Administrative Login (outside both layouts) */}
      <Route path="/admin/login" element={<AdminLoginPlaceholder />} />

      {/* Staff Administration Layout Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminSectionPlaceholder />} />
        <Route path="*" element={<AdminSectionPlaceholder />} />
      </Route>

      {/* Public Customer Layout Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/creations" element={<CreationsPage />} />
        <Route path="/creations/:slug" element={<ProductDetailPage />} />
        <Route path="/custom-cake" element={<CustomCakePage />} />
        <Route path="/decorations" element={<DecorationsPage />} />
        <Route path="/decorations/enquire" element={<DecorationEnquiryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<PublicNotFoundPlaceholder />} />
      </Route>
    </Routes>
  )
}

export default App

