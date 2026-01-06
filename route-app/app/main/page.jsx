'use client';
import NavigationButton from '@/components/NavigationButton';
import { Plus, Map, Heart, Bell, User, Router } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Main() {

    const router = useRouter();
    const [activeScreen, setActiveScreen] = useState('home');
    const isDetailView = activeScreen === 'detail';
    const isCreateView = activeScreen === 'create';


    const handleNavigate = (screen) => {
        setActiveScreen(screen);
        router.push(`${screen}`);
    };
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            {/* Bottom Navigation (Mobile Only, hidden on detail/create) */}
            {!isDetailView && !isCreateView && (
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe pt-1 px-2 h-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50 rounded-t-2xl">
                    <div className="grid grid-cols-5 h-full items-end pb-2">
                        <NavigationButton active={activeScreen === 'home'} label="Discover" icon={Map} />
                        <NavigationButton active={activeScreen === 'community'} label="Community" icon={Heart} onClick={() => { }} />

                        {/* Center Prominent Add Button */}
                        <div className="flex justify-center -mt-8 pointer-events-none">
                            <button
                                onClick={() => handleNavigate('create')}
                                className="pointer-events-auto w-16 h-16 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg shadow-orange-600/30 flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 border-4 border-gray-50"
                            >
                                <Plus size={32} strokeWidth={2.5} />
                            </button>
                        </div>

                        <NavigationButton active={activeScreen === 'notifications'} label="Alerts" icon={Bell} onClick={() => { }} />
                        <NavigationButton active={activeScreen === 'profile'} label="Profile" icon={User} onClick={() => { }} />
                    </div>
                </nav>
            )}

            {/* Desktop Navigation (Sidebar Concept) */}
            {!isDetailView && !isCreateView && (
                <div className="hidden md:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 pl-8 pr-8 py-3 rounded-full shadow-2xl z-50 gap-8 items-center">
                    <button onClick={() => handleNavigate('home')} className={`flex items-center gap-2 font-bold transition-colors ${activeScreen === 'home' ? 'text-green-700' : 'text-gray-400 hover:text-gray-700'}`}>
                        <Map size={20} /> Discover
                    </button>
                    <button className="flex items-center gap-2 font-bold text-gray-400 hover:text-gray-700 transition-colors">
                        <Heart size={20} /> Community
                    </button>

                    {/* Desktop Center Add Button */}
                    <button
                        onClick={() => handleNavigate('create-route')}
                        className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg hover:shadow-orange-600/40 transform hover:-translate-y-1 transition-all mx-2"
                    >
                        <Plus size={24} strokeWidth={3} />
                    </button>

                    <button className="flex items-center gap-2 font-bold text-gray-400 hover:text-gray-700 transition-colors">
                        <Bell size={20} /> Alerts
                    </button>
                    <button onClick={() => handleNavigate('profile')} className={`flex items-center gap-2 font-bold transition-colors ${activeScreen === 'profile' ? 'text-green-700' : 'text-gray-400 hover:text-gray-700'}`}>
                        <User size={20} /> Profile
                    </button>
                </div>
            )}

        </div>
    );
}