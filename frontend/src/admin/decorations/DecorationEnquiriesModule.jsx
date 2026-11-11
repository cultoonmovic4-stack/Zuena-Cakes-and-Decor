import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import DecorationEnquiriesListPage from './DecorationEnquiriesListPage';
import DecorationEnquiryDetailPage from './DecorationEnquiryDetailPage';

/**
 * Decoration Enquiries Feature Module Router
 *
 * Encapsulates the entire Decoration Enquiries feature boundary in the admin portal.
 * Mounted at `/admin/decoration-enquiries/*` via wildcard sub-routing.
 */
export default function DecorationEnquiriesModule() {
  return (
    <Routes>
      {/* Enquiries List View */}
      <Route index element={<DecorationEnquiriesListPage />} />

      {/* Enquiry Detail View */}
      <Route path=":enquiryId" element={<DecorationEnquiryDetailPage />} />

      {/* Catch-all fallback inside the decoration enquiries module */}
      <Route path="*" element={<Navigate to="/admin/decoration-enquiries" replace />} />
    </Routes>
  );
}
