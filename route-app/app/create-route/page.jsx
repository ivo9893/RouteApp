'use client';
import { useState, useRef } from "react";
import { ArrowLeft, Upload, FileText, Mountain, TrendingUp, X, ImageIcon, MapPin, AlertCircle, Check } from "lucide-react";
import InputField from '@/components/InputField';
import DifficultyChip from "@/components/DifficultyChip";
import Button from "@/components/Button";
import { ParseGPX } from "../../utils/GpxParser";
import { calculateRouteStats } from "../../utils/CalculateStats";
import { parse } from "path";

export default function CreateRouteScreen({ onBack, onPublish }) {
    const [file, setFile] = useState(null);
    const [difficulty, setDifficulty] = useState('Moderate');
    const [data, setData] = useState({
        title: '',
        location: '',
        description: '',
        distance: '0 km',
        elevation: '0 m'
    });

    const [selectedImage, setSelectedImage] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);



    const handleFileUpload = async (e) => {

        try {
            const data = await ParseGPX(e.target.files[0]);
            setFile(e.target.files[0]);
            const routeStats = calculateRouteStats(data.coordinate);
            setData({
                distance: routeStats.distanceKm + ' km',
                elevation: routeStats.elevationGain,
                title: data.name
            })
        } catch (err) {
            console.log(err);
        } finally {

        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 0) {
            const newImages = files.map(file => ({
                file: file,
                url: URL.createObjectURL(file)
            }));
            setSelectedImage(prev => [...prev, ...newImages]);
        }

        e.target.value = null;
    };

    const removeImage = (indexToRemove) => {
        setSelectedImage(prev => {
            const updated = prev.filter((_, index) => index !== indexToRemove);
            // Revoke the URL of the removed image to free memory
            URL.revokeObjectURL(prev[indexToRemove].url);
            return updated;
        });
    };


    const handleButtonClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };



    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 py-4 flex items-center justify-between">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Create New Route</h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

                {/* GPX Upload Area */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Route File (GPX)</label>
                    {!file ? (
                        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-white hover:bg-gray-50 transition-colors text-center cursor-pointer group">
                            <input
                                type="file"
                                accept=".gpx"
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="mx-auto w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Click to upload GPX</p>
                            <p className="text-xs text-gray-500 mt-1">or drag and drop file here</p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{file.name}</p>
                                    <p className="text-xs text-green-700">Processed successfully</p>
                                </div>
                            </div>
                            <button onClick={removeFile} className="p-2 hover:bg-green-100 rounded-full text-green-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Auto-Extracted Stats */}
                {file && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl"><Mountain size={24} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Distance</p>
                                <p className="text-xl font-bold text-gray-900">{data.distance}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><TrendingUp size={24} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Elevation</p>
                                <p className="text-xl font-bold text-gray-900">{data.elevation}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Photos (Mock) */}

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        <button type="button" onClick={handleButtonClick} className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-colors">
                            <ImageIcon size={20} className="mb-1" />
                            <span className="text-xs font-medium">Add Photo</span>
                        </button>
                        {/* Placeholder for uploaded images */}
                        {selectedImage.map((i, index) => (
                            <div key={index} onClick={() => setPreviewImage(i.url)} className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-xl relative group overflow-hidden">
                                <img src={i.url} className="w-full h-full object-cover" alt="upload" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity top-0 right-0">
                                    <button className="text-white bg-black/50 rounded-full p-1" onClick={(e) => { e.stopPropagation(); removeImage(index); }}><X size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- THE LIGHTBOX MODAL (Expands the Image) --- */}
                {previewImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setPreviewImage(null)} // Close when clicking the dark background
                    >
                        <div className="relative max-w-4xl w-full max-h-screen flex justify-center">

                            {/* The Large Image */}
                            <img
                                src={previewImage}
                                className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
                                alt="Expanded view"
                                onClick={(e) => e.stopPropagation()} // Optional: Prevents closing if you click the image itself
                            />

                            {/* Close Button (Top Right of screen) */}
                            <button
                                className="absolute -top-10 right-0 text-white hover:text-gray-300"
                                onClick={() => setPreviewImage(null)}
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Text Fields */}
                <div className="space-y-4">
                    {console.log(data)}
                    <InputField
                        label="Route Title"
                        type="text"
                        icon={<MapPin size={20} />}
                        placeholder="e.g., Morning Ridge Run"
                        value={data.title}
                        name="title"
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <div className="flex flex-wrap gap-2">
                            {['Easy', 'Moderate', 'Hard', 'Extreme'].map((level) => (
                                <DifficultyChip
                                    key={level}
                                    level={level}
                                    selected={difficulty === level}
                                    onClick={() => setDifficulty(level)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none text-gray-700 bg-white"
                            placeholder="Describe the terrain, best time to run, and any hazards..."
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* Warning / Notice */}
                <div className="bg-yellow-50 p-4 rounded-xl flex gap-3 text-yellow-800 text-sm">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <p>Routes are reviewed by the community. Please ensure this path is safe and publicly accessible.</p>
                </div>

                <div className="pt-4">
                    <Button onClick={onPublish} icon={<Check size={20} />}>Publish Route</Button>
                </div>

            </div>
        </div>
    );
};