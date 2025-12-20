
import ReactFlagsSelect from "react-flags-select";
import { countries } from './countries';
import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { Globe, ChevronDown, Search, Check, AlertCircle } from "lucide-react";
export default function CountryField({ label, value, onChange, error }) {

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);
  const [country, setCountry] = useState('');

  // Filter countries based on search
  const filteredCountries = Object.entries(countries).map(([code, name]) => ({ code: code, name: name })).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-3 pr-3 py-3 border rounded-xl bg-gray-50 transition-all outline-none ${isOpen ? 'ring-2 ring-green-500 border-transparent bg-white' : 'border-gray-300 hover:bg-white'
          }`}
      >
        <div className="flex items-center gap-2 text-gray-700">
          {country ? (
            <Image
              src={`/flags/${country.code.toLowerCase()}.svg`}
              alt={`${country.name} flag`}
              width={22} // Set explicit dimensions
              height={22}
              className="object-cover"
            />
          ) : (
            <Globe size={20} className="text-gray-400" />)
          }
          {value ? (
            <span className="flex items-center gap-2">
              <span className="text-xl">{value.flag}</span>
              <span>{value.name}</span>
            </span>
          ) : (
            <span className="text-gray-400">Select Country</span>
          )}
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-200">

          {/* Search Input */}
          <div className="p-2 border-b border-gray-100 bg-gray-50/50 sticky top-0">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search country..."
                className="w-full text-black pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 p-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country);
                    setIsOpen(false);
                    setSearch('');
                    setCountry(country);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${value?.code === country.code
                    ? 'bg-green-50 text-green-700'
                    : 'hover:bg-gray-50 text-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm shrink-0">
                      <Image
                        src={`/flags/${country.code.toLowerCase()}.svg`}
                        alt={`${country.name} flag`}
                        width={24} // Set explicit dimensions
                        height={16}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="font-medium">{country.name}</span>
                  </div>
                  {value?.code === country.code && <Check size={16} className="text-green-600" />}
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">No countries found</div>
            )}
          </div>
        </div>
      )}

        {error && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} /> {error}
          </p>
        )}
    </div>
  );
};