import React from 'react';
import { DecorationEnquiriesModule } from '../decorations';

/**
 * Decoration Enquiries Module Admin Entry Point
 *
 * Mounts the Decoration Enquiries feature router (supporting /admin/decoration-enquiries
 * and /admin/decoration-enquiries/:enquiryId) under the wildcard sub-routing established in App.jsx.
 */
export default function DecorationEnquiriesPlaceholderPage() {
  return <DecorationEnquiriesModule />;
}
