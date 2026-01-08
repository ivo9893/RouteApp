'use client';
import NavigationButton from '@/components/NavigationButton';
import { Plus, Map, Heart, Bell, User, Activity, Filter, MapPin, Mountain, TrendingUp, Star, Router } from 'lucide-react';
import { useState } from 'react';
import DifficultyChip from "@/components/DifficultyChip";
import { useRouter } from 'next/navigation';

export default function Main() {

    const router = useRouter();
    const [activeScreen, setActiveScreen] = useState('home');
    const isDetailView = activeScreen === 'detail';
    const isCreateView = activeScreen === 'create';
    const trails = [
        {
            id: 1,
            title: "Misty Pine Ridge Loop",
            location: "Cascadia National Park",
            distance: "12.5 km",
            elevation: "850 m",
            difficulty: "Hard",
            rating: 4.8,
            reviews: 124,
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
            author: {
                name: "Sarah Trekker",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
            },
            description: "A challenging loop featuring steep accents, rocky terrain, and breathtaking views of the valley. Best run in early morning to catch the mist rising off the pines.",
            tags: ["Technical", "Scenic", "Steep"]
        },
        {
            id: 2,
            title: "Golden Valley River Run",
            location: "Golden Gate Highlands",
            distance: "8.2 km",
            elevation: "210 m",
            difficulty: "Moderate",
            rating: 4.5,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
            author: {
                name: "Mike Runner",
                avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80"
            },
            description: "Flowy singletrack alongside the river. Great for tempo runs or a relaxed weekend long run. Watch out for mud after rain.",
            tags: ["River", "Flat", "Fast"]
        },
        {
            id: 3,
            title: "Sunset Peak Scramble",
            location: "Rocky Mountains",
            distance: "5.0 km",
            elevation: "600 m",
            difficulty: "Extreme",
            rating: 4.9,
            reviews: 45,
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
            author: {
                name: "Elena Vert",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
            },
            description: "Short but brutal vertical kilometer style training ground. Pure climbing with a technical descent.",
            tags: ["Vertical", "Summit", "Technical"]
        }
    ];

    const handleNavigate = (screen) => {
        setActiveScreen(screen);
        router.push(`${screen}`);
    };
    return (

        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-4 md:px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 text-green-700">
                        <Activity className="w-8 h-8" />
                        <span className="text-xl font-bold tracking-tight text-gray-900">SummitShare</span>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                        <Filter size={24} />
                    </button>
                </div>
            </header>

            {/* Filters
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2">
                    <button className="px-5 py-2 rounded-full bg-green-700 text-white text-sm font-semibold shadow-md whitespace-nowrap">All</button>
                    {['Mountain', 'Forest', 'Coastal', 'Desert', 'Urban'].map(cat => (
                        <button key={cat} className="px-5 py-2 rounded-full bg-white border border-gray-200 text-gray-600 text-sm font-semibold shadow-sm hover:bg-gray-50 whitespace-nowrap transition-colors">
                            {cat}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* Feed */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trails.map((trail) => (
                        <div
                            key={trail.id}
                            onClick={() => onNavigate('detail', trail)}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img src={trail.image} alt={trail.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute bottom-3 left-3">
                                    <DifficultyChip level={trail.difficulty} />
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{trail.title}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin size={14} className="mr-1" />
                                    <span className="truncate">{trail.location}</span>
                                </div>

                                <div className="w-full h-px bg-gray-100 mb-4" />

                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Mountain size={16} className="text-green-600" />
                                        <span className="text-sm font-semibold text-gray-700">{trail.distance}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp size={16} className="text-orange-600" />
                                        <span className="text-sm font-semibold text-gray-700">{trail.elevation}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-auto">
                                    <div className="flex items-center gap-2">
                                        <img src={trail.author.avatar} alt={trail.author.name} className="w-6 h-6 rounded-full ring-2 ring-white" />
                                        <span className="text-xs text-gray-500">by {trail.author.name}</span>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                                        <Heart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>



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