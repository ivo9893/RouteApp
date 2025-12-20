
'use client';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import SocialButton from '@/components/SocialButton';
import CountryField from '@/components/CountryField/CountryField';
import AuthLayout from '@/layout/AuthLayout';
import Spinner from '@/components/Spinner'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
    Mail,
    Lock,
    User,
    FlagIcon,
    Form
} from 'lucide-react';
import { useState } from 'react';

import { registerUser } from '@/services/api';


export default function RegisterScreen() {

    //  const [firstName, setFirstNameState] = useState('');
    // const [lastName, setLastNameState] = useState('');
    // const [email, setEmailState] = useState('');
    // const [password, setPasswordState] = useState('');
    // const [repeatPassword, setRepeatPasswordState] = useState('');

    const router = useRouter();

    const [error, setErrorState] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isLoading, setLoadingState] = useState(false);

    const validateEmail = (email) => {
        // Simple, standard regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };


    const onRegister = async (e) => {

        setLoadingState(true);
        setErrorState({});

        const form = new FormData(e.currentTarget);
        const firstName = form.get("firstName");
        const lastName = form.get("lastName");
        const email = form.get("email");
        const password = form.get("password");
        const repeatPassword = form.get("repeatPassword");

        const newErrors = {};

        if (!firstName) {
            newErrors.firstName = "First name is required!";
        }

        if (!lastName) {
            newErrors.lastName = "Last name is required!";
        }

        if (!validateEmail(email)) {
            newErrors.email = "Email is not valid!";
        }

        if (!selectedCountry) {
            newErrors.country = "Country is required!";
        }

        if (password != repeatPassword) {
            newErrors.password = "Passwords doesn't match!";
        }

        if (!password) {
            newErrors.password = "Password is required!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrorState(newErrors);
            setLoadingState(false);
            return;
        }

        try {
            const result = await registerUser(firstName, lastName, email, password, selectedCountry.code)
            router.push('/');
        } catch (err) {
            console.log(error);
        } finally {
            setLoadingState(false);
        }

    }


    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the community of trail runners."
            image="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80"
        >
            <form onSubmit={
                (e) => { e.preventDefault(); onRegister(e); }
            } >

                <InputField label="First name" type="text" name="firstName" icon={<User size={20} />} placeholder="Alex" />
                <InputField label="Last name" type="text" name="lastName" icon={<User size={20} />} placeholder="Chambers" />
                <InputField label="Email Address" name="email" icon={<Mail size={20} />} placeholder="alex@example.com" error={error.email} />
                <CountryField label="Country" value={selectedCountry} onChange={(change) => setSelectedCountry(change)} error={error.country} />
                <InputField label="Password" type="password" name="password" icon={<Lock size={20} />} placeholder="••••••••" error={error.password} />
                <InputField label="Repeat password" type="password" name="repeatPassword" icon={<Lock size={20} />} placeholder="••••••••" error={error.password} />


                {isLoading &&
                    <div className='mt-8 relative flex justify-center'>
                        <Spinner size="md" color="green" />
                    </div>
                }
                <Button type="submit" className="mt-6">Sign Up</Button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
                </div>

                <div className="space-y-3">
                    <SocialButton provider="Google" />
                    <SocialButton provider="Facebook" />
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link
                        href="/"
                        className="font-bold text-green-700 hover:text-green-800 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}