import React from 'react';
import AdminIcon from './AdminIcon';

/**
 * Reusable Admin Empty State Component
 *
 * Provides a clean, restrained fallback when lists or tables have no records.
 * Automatically resolves string icon names through `AdminIcon`.
 * Uses solid dark surfaces and fine borders; avoids excessive illustrations.
 */

export default function AdminEmptyState({
  title = 'No records found',
  description = 'There are currently no items matching your criteria or filters.',
  icon = null,
  action = null,
  className = '',
}) {
  const resolvedIcon =
    typeof icon === 'string' ? (
      <AdminIcon name={icon} size={20} className="text-[#DEAC4B]" />
    ) : (
      icon || '✦'
    );

  return (
    <div
      className={`w-full py-12 px-6 sm:px-10 text-center border border-white/10 bg-[#161311] rounded flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-11 h-11 rounded-full bg-[#1F1C18] border border-[#A36733]/30 text-[#EFC767] flex items-center justify-center mb-3">
        {resolvedIcon}
      </div>

      <h3 className="font-serif text-base sm:text-lg text-[#DEAC4B] font-medium mb-1.5 tracking-wide">
        {title}
      </h3>

      <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed mb-5">
        {description}
      </p>

      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
