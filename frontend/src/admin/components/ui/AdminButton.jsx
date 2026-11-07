import React from 'react';
import { Link } from 'react-router';
import AdminIcon from './AdminIcon';

/**
 * Reusable Admin Button Component
 *
 * Implements accessible, styled buttons or links following Zuena brand tokens.
 * Variants: primary (solid gold), secondary (gold outline), ghost (neutral), danger (red).
 * Supports `to` prop to render as a React Router Link.
 * Automatically resolves string icon names via `AdminIcon`.
 */

export default function AdminButton({
  children,
  to,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon = null,
  iconPosition = 'left',
  ariaLabel,
  ...rest
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-wider rounded transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEAC4B]';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[11px] min-h-[32px]',
    md: 'px-4 py-2 text-xs min-h-[38px]',
    lg: 'px-6 py-2.5 text-sm min-h-[44px]',
  };

  const variantClasses = {
    primary:
      'bg-[#DEAC4B] hover:bg-[#FBD46D] text-[#141210] font-semibold border border-transparent shadow-xs',
    secondary:
      'bg-transparent border border-[#DEAC4B]/60 text-[#EFC767] hover:border-[#DEAC4B] hover:text-white hover:bg-[#DEAC4B]/10',
    ghost:
      'bg-transparent border border-white/15 text-stone-300 hover:text-white hover:bg-white/5 hover:border-[#A36733]/40',
    danger:
      'bg-transparent border border-rose-500/50 text-rose-300 hover:bg-rose-500/10 hover:border-rose-400',
  };

  const disabledClasses = 'opacity-40 cursor-not-allowed pointer-events-none';
  const interactiveClasses = 'cursor-pointer';

  const resolvedSize = sizeClasses[size] || sizeClasses.md;
  const resolvedVariant = variantClasses[variant] || variantClasses.primary;
  const stateClasses = disabled ? disabledClasses : interactiveClasses;
  const combinedClasses = `${baseClasses} ${resolvedSize} ${resolvedVariant} ${stateClasses} ${className}`.trim();

  const iconElement =
    typeof icon === 'string' ? (
      <AdminIcon name={icon} size={size === 'sm' ? 14 : 16} />
    ) : (
      icon
    );

  const content = (
    <>
      {iconElement && iconPosition === 'left' && (
        <span className="shrink-0 flex items-center">{iconElement}</span>
      )}
      <span>{children}</span>
      {iconElement && iconPosition === 'right' && (
        <span className="shrink-0 flex items-center">{iconElement}</span>
      )}
    </>
  );

  if (to && !disabled) {
    return (
      <Link
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        className={combinedClasses}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  if (to && disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className={combinedClasses}
        {...rest}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={combinedClasses}
      {...rest}
    >
      {content}
    </button>
  );
}
