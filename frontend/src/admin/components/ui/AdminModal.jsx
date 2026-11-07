import React, { useEffect, useRef } from 'react';
import AdminIcon from './AdminIcon';

/**
 * Accessible modal dialog for admin modules.
 * Restrained dark surface styling with gold accents and solid backdrops (no glassmorphism).
 * Includes keyboard focus trapping, Escape listener, and body scroll lock.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Callback to close modal
 * @param {string} props.title - Modal title
 * @param {string} [props.description] - Optional subtext under title
 * @param {React.ReactNode} props.children - Modal content body
 * @param {React.ReactNode} [props.footer] - Modal action buttons slot
 * @param {string} [props.maxWidth] - Custom width class (default 'max-w-lg')
 */
export default function AdminModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'max-w-lg',
}) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Focus management and keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore upon close
    previousFocusRef.current = document.activeElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the modal dialog container
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    const handleKeyDown = (event) => {
      // Escape key to close
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      // Tab key focus trap
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Solid dark backdrop with no blur */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidth} bg-[#191614] border border-[#DEAC4B]/25 rounded shadow-2xl flex flex-col max-h-[90vh] z-10 focus:outline-none`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-[#DEAC4B]/15">
          <div>
            <h2
              id="admin-modal-title"
              className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide"
            >
              {title}
            </h2>
            {description && (
              <p className="font-sans text-xs sm:text-sm text-stone-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded border border-transparent hover:border-[#DEAC4B]/30 transition-colors focus:outline-none focus:ring-1 focus:ring-[#DEAC4B]"
            aria-label="Close dialog"
          >
            <AdminIcon name="close" size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto font-sans text-sm text-stone-300 space-y-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 sm:px-6 py-4 bg-[#141210] border-t border-[#DEAC4B]/15 flex items-center justify-end gap-3 rounded-b">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
