/**
 * Reusable Admin Form Select Component
 *
 * Implements accessible select dropdown with styled option tags and error states.
 */

export default function AdminSelect({
  id,
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  hint = '',
  children,
  className = '',
  ...rest
}) {
  const selectId = id || (name ? `admin-select-${name}` : undefined)
  const hintId = hint && selectId ? `${selectId}-hint` : undefined
  const errorId = error && selectId ? `${selectId}-error` : undefined

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-[11px] font-mono uppercase tracking-[0.16em] text-champagne-gold/90 mb-1.5 font-medium"
        >
          {label} {required && <span className="text-primary-gold">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full min-w-0 appearance-none rounded-sm bg-[#141210] border px-3.5 py-2.5 pr-9 text-xs sm:text-sm text-brand-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-gold disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-rose-500/70 focus-visible:border-rose-400 focus-visible:ring-rose-400'
              : 'border-white/15 hover:border-bronze/50 focus-visible:border-primary-gold'
          }`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#141210] text-gray-500">
              {placeholder}
            </option>
          )}

          {options && options.length > 0
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-[#181614] text-brand-white"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        {/* Custom Chevron Indicator */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
          </svg>
        </span>
      </div>

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

