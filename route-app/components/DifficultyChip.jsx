
export default function DifficultyChip({ level, selected, onClick }) {
  let colors = "bg-gray-100 text-gray-800 border-transparent";
  
  if (selected) {
    if (level === "Easy") colors = "bg-green-600 text-white border-green-600 ring-2 ring-green-200";
    if (level === "Moderate") colors = "bg-yellow-500 text-white border-yellow-500 ring-2 ring-yellow-200";
    if (level === "Hard" || level === "Extreme") colors = "bg-red-600 text-white border-red-600 ring-2 ring-red-200";
  } else {
    // Unselected state
     if (level === "Easy") colors = "bg-white text-green-700 border-green-200 hover:bg-green-50";
     if (level === "Moderate") colors = "bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50";
     if (level === "Hard" || level === "Extreme") colors = "bg-white text-red-700 border-red-200 hover:bg-red-50";
  }

  return (
    <button
      type="button" 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${colors}`}
    >
      {level}
    </button>
  );
};