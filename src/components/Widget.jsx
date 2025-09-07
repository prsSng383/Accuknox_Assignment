export default function Widget({ title, children, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 relative">
      <h3 className="font-medium mb-2">{title}</h3>
      <button 
        onClick={onRemove} 
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg font-bold" 
        aria-label={`Remove widget ${title}`}
      >
        ×
      </button>
      <div className="text-sm text-gray-600">{children}</div>
    </div>
  );
}
