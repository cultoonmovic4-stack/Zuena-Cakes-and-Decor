/**
 * Reusable Admin Form Textarea Component
 *
 * Implements accessible multi-line text input with custom scrollbar,
 * dark-canvas styling, and error handling.
 */

export default function AdminTextarea({
  id,
  label,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  required = false,
  disabled = false,
  error = '',
  hint = '',
  className = '',
  ...rest
}) {
  const textareaId = id || (name ? `admin-textarea-${name}` : undefined)
  const hintId = hint && textareaId ? `${textareaId}-hint` : undefined
  const errorId = error && textareaId ? `${textareaId}-error` : undefined

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-1.5 font-medium"
        >
          {label} {required && <span className="text-primary-gold">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`w-full min-w-0 rounded-sm bg-[#141210] border px-3.5 py-2.5 text-xs sm:text-sm text-brand-white placeholder-gray-500 transition-colors resize-y focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-gold disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? 'border-rose-500/70 focus-visible:border-rose-400 focus-visible:ring-rose-400'
            : 'border-white/15 hover:border-bronze/50 focus-visible:border-primary-gold'
        }`}
        {...rest}
      />

      {hint && !error && (
        <p id={hintId} className="mt-1 text-[11px] text-gray-400 font-sans">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-rose-400 font-sans">
          {error}
        </p>
      )}
    </div>
  )
}

