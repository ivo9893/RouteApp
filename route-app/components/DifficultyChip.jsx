export default function DifficultyChip({ level, id, selected, onClick }) {
  let colors = "bg-gray-100 text-gray-800 border-transparent"; // Fallback

  switch (id) {
    case 1: // Easy -> Green
      if (selected) {
        colors = "bg-green-600 text-white border-green-600 ring-2 ring-green-200";
      } else {
        colors = "bg-white text-green-700 border-green-200 hover:bg-green-50";
      }
      break;

    case 2: // Moderate -> Teal (Distinct from Green, but not yet Warning)
      if (selected) {
        colors = "bg-teal-600 text-white border-teal-600 ring-2 ring-teal-200";
      } else {
        colors = "bg-white text-teal-700 border-teal-200 hover:bg-teal-50";
      }
      break;

    case 3: // Medium -> Yellow (Warning territory)
      if (selected) {
        colors = "bg-yellow-500 text-white border-yellow-500 ring-2 ring-yellow-200";
      } else {
        colors = "bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50";
      }
      break;

    case 4: // Hard -> Orange
      if (selected) {
        colors = "bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200";
      } else {
        colors = "bg-white text-orange-700 border-orange-200 hover:bg-orange-50";
      }
      break;

    case 5: // Very Hard -> Red
      if (selected) {
        colors = "bg-red-600 text-white border-red-600 ring-2 ring-red-200";
      } else {
        colors = "bg-white text-red-700 border-red-200 hover:bg-red-50";
      }
      break;

    default:
      // Keep gray fallback for unknown levels
      if (selected) colors = "bg-gray-800 text-white border-gray-800";
      break;
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
}