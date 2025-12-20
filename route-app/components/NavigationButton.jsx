export default function NavButton({ active, label, icon: Icon, onClick }) {

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${active ? 'text-green-700 transform -translate-y-1' : 'text-gray-400 hover:text-gray-600'
                }`}>
            <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
            <span className={`text-[10px] font-bold tracking-wide ${active ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
        </button>
    );
}