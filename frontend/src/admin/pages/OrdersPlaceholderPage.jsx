import React from 'react';
import { OrdersModule } from '../orders';

/**
 * Orders Module Admin Entry Point
 *
 * Owned by the Orders Feature Developer.
 * Mounts the Orders feature router (supporting /admin/orders and /admin/orders/:orderId)
 * under the wildcard sub-routing established in App.jsx.
 */
export default function OrdersPlaceholderPage() {
  return <OrdersModule />;
}
