'use client';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SocialButton from '@/components/SocialButton';
import AuthLayout from '@/layout/AuthLayout';
import Spinner from '@/components/Spinner'
import { loginUser } from '../services/api';
import {
  Mail,
  Lock
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {

  const router = useRouter();
  const [isLoading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState({});


  const onLogin = async (e) => {
    setLoadingState(true);

    const form = new FormData(e.currentTarget)
    const newErrors = {};
    const email = form.get("email");
    const password = form.get("password");

    if (!email) {
      newErrors.email = "Email is empty!";
    }

    if (!password) {
      newErrors.password = "Password is empty!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorState(newErrors);
      setLoadingState(false);
      return;
    }


    await loginUser(email, password)
      .then(() => {
        router.push('/main');
      }).catch(error => {
        newErrors.loginError = error.message;
      }).finally(() => {
        setLoadingState(false);
        setErrorState(newErrors);
      })

  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your details to access your routes."
      image="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80"
    >
      <form onSubmit={(e) => { e.preventDefault(); onLogin(e); }}>
        <InputField name="email" label="Email Address" type="text" icon={<Mail size={20} />} placeholder="runner@example.com" error={error.email}/>
        <InputField name="password" label="Password" type="password" icon={<Lock size={20} />} placeholder="••••••••" error={error.password}/>

        {isLoading &&
          <div className='mt-8 relative flex justify-center'>
            <Spinner size="md" color="green" />
          </div>
        }
        {error.loginError && 
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">{error.loginError}</p>
        
        }

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
          Don't have an account?
          <Link
            href="/register"
            className="font-bold text-green-700 hover:text-green-800 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>

  );
}
