
export default function Button ({ children, onClick, variant = 'primary', className = '', type = 'button', icon }) {
  const baseStyle = "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold transition-all duration-200 transform active:scale-95";
  const variants = {
    primary: "bg-green-700 hover:bg-green-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-gray-200 hover:bg-gray-50 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
};