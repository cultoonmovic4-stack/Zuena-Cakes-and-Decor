import React from 'react';

/**
 * Standard page header for admin pages.
 * Enforces brand typography: Playfair Display for title, Lato for subtitle,
 * with optional eyebrow category and action buttons slot.
 *
 * @param {Object} props
 * @param {string} props.title - Main page title (Playfair Display)
 * @param {string} [props.subtitle] - Descriptive subtitle (Lato)
 * @param {string} [props.eyebrow] - Uppercase category label
 * @param {React.ReactNode} [props.actions] - Action buttons or controls slot
 * @param {string} [props.className] - Additional classes
 */
export default function AdminPageHeader({
  title,
  subtitle,
  eyebrow,
  actions,
  className = '',
}) {
  return (
    <header className={`border-b border-[#DEAC4B]/15 pb-6 mb-8 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-mono uppercase tracking-wider text-[#DEAC4B] mb-1">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-sm sm:text-base text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

