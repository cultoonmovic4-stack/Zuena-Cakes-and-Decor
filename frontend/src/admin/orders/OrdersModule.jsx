import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import OrdersListPage from './OrdersListPage';
import OrderDetailPage from './OrderDetailPage';

/**
 * Orders Feature Module Router
 *
 * Encapsulates the entire Orders feature boundary within the Admin portal.
 * Mounted at `/admin/orders/*` via wildcard sub-routing.
 */
export default function OrdersModule() {
  return (
    <Routes>
      {/* Orders List View */}
      <Route index element={<OrdersListPage />} />

      {/* Order Detail View */}
      <Route path=":orderId" element={<OrderDetailPage />} />

      {/* Catch-all fallback inside the orders module */}
      <Route path="*" element={<Navigate to="/admin/orders" replace />} />
    </Routes>
  );
}

