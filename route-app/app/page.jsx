'use client';
import Button from '@/components/Button';
import InputField from '@/components/InputField'; // Must match the filename "InputFiels"
import SocialButton from '@/components/SocialButton';
import AuthLayout from '@/layout/AuthLayout'; 
import { loginUser } from '../services/api';
import { 
  Mail, 
  Lock
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Login() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleEmailChange = (event) =>{
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) =>{
    setPassword(event.target.value);
  }

  const onSwitch = () => {
    console.log("Switch to Sign Up");
  };

  const onLogin = async () => {
    setLoading(true);

    await loginUser(email, password)
    .then(() => {
      router.push('/main');
    }).catch(error => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    })
  
  };

  return (
 <AuthLayout 
    title="Welcome Back" 
    subtitle="Enter your details to access your routes."
    image="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80"
  >
    <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
      <InputField label="Email Address" value={email} onChange={handleEmailChange} type="text" icon={<Mail size={20} />} placeholder="runner@example.com" />
      <InputField label="Password" type="password" value={password} onChange={handlePasswordChange} icon={<Lock size={20} />} placeholder="••••••••" />
      
      <Button type="submit" className="mt-6" icon={null} onClick={null}>Sign In</Button>
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
      </div>
      
      <div className="space-y-3">
        <SocialButton provider="Google" />
        <SocialButton provider="Facebook" />
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account? <button onClick={onSwitch} className="font-bold text-green-700 hover:text-green-800 hover:underline">Sign Up</button>
      </p>
    </form>
  </AuthLayout>
    
  );
}
