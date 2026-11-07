import React from 'react';
import AdminEmptyState from './AdminEmptyState';

/**
 * Reusable Admin Data Table Component
 *
 * Implements a semantic, responsive table container supporting column definitions,
 * data array auto-detection, row rendering, and integrated empty states.
 *
 * When data is empty, directly renders the empty state rather than showing
 * an awkward empty table header with no rows.
 *
 * @param {Object} props
 * @param {Array<{key: string, label: string, width?: string, align?: 'left'|'center'|'right'}>} props.columns
 * @param {Array<Object>} [props.data] - Table rows data
 * @param {Function} [props.renderRow] - Row render function (item, index) => JSX
 * @param {React.ReactNode} [props.children] - Direct table body rows
 * @param {boolean} [props.isEmpty] - Explicit empty flag
 * @param {React.ReactNode} [props.emptyState] - Custom empty state component
 * @param {string} [props.className] - Additional wrapper class
 */
export default function AdminDataTable({
  columns = [],
  data = null,
  renderRow = null,
  children = null,
  isEmpty = false,
  emptyState = null,
  className = '',
}) {
  const isDataEmpty = Array.isArray(data) && data.length === 0;
  const shouldShowEmpty = isEmpty || isDataEmpty;

  if (shouldShowEmpty) {
    return emptyState || <AdminEmptyState />;
  }

  const getAlignClass = (align) => {
    if (align === 'right') return 'text-right';
    if (align === 'center') return 'text-center';
    return 'text-left';
  };

  const renderBodyContent = () => {
    if (renderRow && Array.isArray(data)) {
      return data.map((item, index) => renderRow(item, index));
    }
    return children;
  };

  return (
    <div
      className={`w-full overflow-hidden border border-white/10 bg-[#161311] rounded ${className}`}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs font-sans text-stone-200 divide-y divide-white/10 border-collapse">
          <thead className="bg-[#181512]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key || col.label}
                  scope="col"
                  style={{ width: col.width }}
                  className={`px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-[#EFC767] font-semibold ${getAlignClass(
                    col.align
                  )}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#161311]">
            {renderBodyContent()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
