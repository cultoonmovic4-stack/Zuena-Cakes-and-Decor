/**
 * Centralized Admin SVG Icons Utility
 *
 * Implements lightweight, dependency-free inline SVG icons matching
 * the project's established styling conventions (stroke="currentColor",
 * viewBox="0 0 24 24", strokeWidth="1.75").
 *
 * Supports both `size` (number in px) and `className` (Tailwind classes).
 */

export default function AdminIcon({
  name,
  size,
  className = '',
  ariaHidden = true,
  style = {},
  ...rest
}) {
  const sizeStyle = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }
    : undefined;

  const defaultClasses = size ? '' : 'w-4 h-4';
  const resolvedClassName = `${defaultClasses} ${className}`.trim();

  const commonProps = {
    className: resolvedClassName,
    style: { ...sizeStyle, ...style },
    'aria-hidden': ariaHidden ? 'true' : undefined,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...rest,
  };

  switch (name) {
    case 'overview':
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );

    case 'orders':
      return (
        <svg {...commonProps}>
          <path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );

    case 'cake':
      return (
        <svg {...commonProps}>
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
          <path d="M2 21h20" />
          <path d="M7 8v3" />
          <path d="M12 8v3" />
          <path d="M17 8v3" />
          <path d="M7 4h.01" />
          <path d="M12 4h.01" />
          <path d="M17 4h.01" />
        </svg>
      );

    case 'decor':
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
          <path d="M5 3v4" />
          <path d="M3 5h4" />
          <path d="M19 17v4" />
          <path d="M17 19h4" />
        </svg>
      );

    case 'catalogue':
      return (
        <svg {...commonProps}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h10" />
          <path d="M6 14h6" />
        </svg>
      );

    case 'menu':
      return (
        <svg {...commonProps}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );

    case 'close':
      return (
        <svg {...commonProps}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );

    case 'search':
      return (
        <svg {...commonProps}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );

    case 'filter':
      return (
        <svg {...commonProps}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      );

    case 'chevron-right':
      return (
        <svg {...commonProps}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );

    case 'external-link':
      return (
        <svg {...commonProps}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );

    case 'check':
      return (
        <svg {...commonProps}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );

    case 'alert':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );

    case 'user':
      return (
        <svg {...commonProps}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );

    case 'arrow-left':
      return (
        <svg {...commonProps}>
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
