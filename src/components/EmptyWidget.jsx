export default function EmptyWidget({ onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="bg-gray-100 rounded-lg border-dashed border-2 flex items-center justify-center text-gray-400 cursor-pointer min-h-[140px] hover:text-blue-400 hover:border-blue-300 transition"
    >
      + Add Widget
    </div>
  );
}
