/**
 * Reusable Admin Status Badge Component
 *
 * Implements a restrained, non-glowing status badge for operational statuses.
 * Supports both `tone` and `variant` props for API flexibility.
 * Tones: gold, amber, blue, green, purple, gray/neutral, red.
 */

export default function AdminStatusBadge({
  children,
  label,
  variant,
  tone,
  className = '',
}) {
  const content = children || label;
  const activeTone = tone || variant || 'gray';

  const toneClasses = {
    gold: 'bg-primary-gold/15 text-primary-gold border-primary-gold/40',
    amber: 'bg-[#9C6230]/20 text-[#FBD46D] border-[#9C6230]/40',
    blue: 'bg-sky-950/40 text-sky-300 border-sky-600/40',
    green: 'bg-emerald-950/40 text-emerald-300 border-emerald-600/40',
    purple: 'bg-purple-950/40 text-purple-300 border-purple-600/40',
    red: 'bg-rose-950/40 text-rose-300 border-rose-600/40',
    gray: 'bg-neutral-800/60 text-stone-300 border-neutral-700/60',
    neutral: 'bg-neutral-800/60 text-stone-300 border-neutral-700/60',
  };

  const resolvedClasses = toneClasses[activeTone] || toneClasses.gray;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider font-semibold border ${resolvedClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75 shrink-0" />
      <span>{content}</span>
    </span>
  );
}
