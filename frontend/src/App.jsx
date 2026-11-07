import { Routes, Route, Navigate } from 'react-router';
import { CartProvider } from './context/CartContext.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import HomePage from './pages/public/HomePage.jsx';
import CreationsPage from './pages/public/CreationsPage.jsx';
import CollectionPage from './pages/public/CollectionPage.jsx';
import ProductDetailPage from './pages/public/ProductDetailPage.jsx';
import CustomCakePage from './pages/public/CustomCakePage.jsx';
import DecorationsPage from './pages/public/DecorationsPage.jsx';
import DecorationEnquiryPage from './pages/public/DecorationEnquiryPage.jsx';
import CartPage from './pages/public/CartPage.jsx';
import Scene2TestPage from './pages/public/Scene2TestPage.jsx';

import {
  OverviewPage,
  OrdersPlaceholderPage,
  CustomCakeRequestsPlaceholderPage,
  DecorationEnquiriesPlaceholderPage,
  CataloguePlaceholderPage,
  AdminLoginPlaceholderPage,
} from './admin/pages';

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
  );
}

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Standalone Administrative Login (outside both layouts) */}
        <Route path="/admin/login" element={<AdminLoginPlaceholderPage />} />

        {/* Staff Administration Layout Routes (with wildcard sub-routing to isolate team branches) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="orders/*" element={<OrdersPlaceholderPage />} />
          <Route path="custom-cake-requests/*" element={<CustomCakeRequestsPlaceholderPage />} />
          <Route path="decoration-enquiries/*" element={<DecorationEnquiriesPlaceholderPage />} />
          <Route path="catalogue/*" element={<CataloguePlaceholderPage />} />
          <Route path="*" element={<Navigate to="/admin/overview" replace />} />
        </Route>

        {/* Public Customer Layout Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/creations" element={<CreationsPage />} />
          <Route path="/creations/birthday" element={<CollectionPage categoryKey="birthday" />} />
          <Route path="/creations/birthday/:occasion" element={<CollectionPage categoryKey="birthday" />} />
          <Route path="/creations/wedding" element={<CollectionPage categoryKey="wedding" />} />
          <Route path="/creations/wedding/:occasion" element={<CollectionPage categoryKey="wedding" />} />
          <Route path="/creations/graduation" element={<CollectionPage categoryKey="graduation" />} />
          <Route path="/creations/graduation/:occasion" element={<CollectionPage categoryKey="graduation" />} />
          <Route path="/creations/kwanjula" element={<CollectionPage categoryKey="kwanjula" />} />
          <Route path="/creations/kwanjula/:occasion" element={<CollectionPage categoryKey="kwanjula" />} />
          <Route path="/creations/:slug" element={<ProductDetailPage />} />
          <Route path="/custom-cake" element={<CustomCakePage />} />
          <Route path="/decorations" element={<DecorationsPage />} />
          <Route path="/decorations/enquire" element={<DecorationEnquiryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/scene2-test" element={<Scene2TestPage />} />
          <Route path="*" element={<PublicNotFoundPlaceholder />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
