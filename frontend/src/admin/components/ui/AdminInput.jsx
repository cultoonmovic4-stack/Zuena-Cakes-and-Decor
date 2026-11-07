import React from 'react';
import AdminIcon from './AdminIcon';

/**
 * Reusable Admin Form Input Component
 *
 * Implements an accessible, controlled input field following Zuena styling:
 * dark-canvas background, hairline border, gold focus ring, accessible error states.
 * Automatically resolves string icon names through `AdminIcon`.
 */

export default function AdminInput({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  hint = '',
  icon = null,
  className = '',
  ...rest
}) {
  const inputId = id || (name ? `admin-input-${name}` : undefined);
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  const resolvedIcon =
    typeof icon === 'string' ? <AdminIcon name={icon} size={15} /> : icon;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#EFC767] mb-1.5 font-medium"
        >
          {label} {required && <span className="text-[#DEAC4B]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {resolvedIcon && (
          <span className="absolute left-3.5 text-stone-400 pointer-events-none flex items-center">
            {resolvedIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full min-w-0 rounded bg-[#141210] border text-xs sm:text-sm text-stone-100 placeholder-stone-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DEAC4B] disabled:opacity-50 disabled:cursor-not-allowed ${
            resolvedIcon ? 'pl-10 pr-3.5 py-2' : 'px-3.5 py-2'
          } ${
            error
              ? 'border-rose-500/70 focus-visible:border-rose-400 focus-visible:ring-rose-400'
              : 'border-white/15 hover:border-[#DEAC4B]/40 focus-visible:border-[#DEAC4B]'
          }`}
          {...rest}
        />
      </div>

      {hint && !error && (
        <p id={hintId} className="mt-1 text-[11px] text-stone-400 font-sans">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-rose-400 font-sans">
          {error}
        </p>
      )}
    </div>
  );
}
