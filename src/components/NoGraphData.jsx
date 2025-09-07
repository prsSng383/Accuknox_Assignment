export default function NoGraphData() {
  return (
    <div className="flex flex-col items-center justify-center h-40 py-7">
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-3 text-gray-400">
        <rect x="10" y="26" width="4" height="12" rx="2" fill="currentColor" />
        <rect x="18" y="22" width="4" height="16" rx="2" fill="currentColor" />
        <rect x="26" y="34" width="4" height="4" rx="2" fill="currentColor" />
        <rect x="34" y="18" width="4" height="20" rx="2" fill="currentColor" />
        <path d="M10 28L18 24L26 36L34 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="text-gray-600 font-medium text-center">No Graph data available!</div>
    </div>
  );
}
