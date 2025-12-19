import { Activity } from 'lucide-react';

export default function AuthLayout({ children, title, subtitle, image }) {
  return <div className="min-h-screen flex bg-white">
    {/* Left Side - Image */}
    <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
      <img src={image} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-transparent flex flex-col justify-center p-12">
        <h1 className="text-5xl font-bold text-white mb-4">Route Share</h1>
        <p className="text-xl text-green-100 max-w-md">Discover the path less traveled. Connect with runners worldwide.</p>
      </div>
    </div>
    
    {/* Right Side - Form */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mb-4">
            <Activity size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  </div>
}
