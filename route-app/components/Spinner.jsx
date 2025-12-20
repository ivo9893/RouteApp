export default function Spinner({ size = 'md', color = 'green' }) {
  // Map props to Tailwind classes for easy customization
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-[6px]',
  };

  const colorClasses = {
    green: 'border-t-green-600',
    blue: 'border-t-blue-600',
    white: 'border-t-white',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}   
        rounded-full               
        animate-spin               
        border-gray-200 
                   
        ${colorClasses[color]}      
      `}
      role="status"
    >
      <span className="sr-only">Loading...</span> {/* For screen readers */}
    </div>
  );
}