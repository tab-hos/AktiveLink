import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ isScrolled = true }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-medium transition-all hover:bg-[#f8cb2a]/10 border border-transparent hover:border-[#f8cb2a]/30 text-slate-700 hover:text-[#f8cb2a]"
      title={language === 'en' ? 'Vaihda suomeksi' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="font-semibold uppercase">
        {language === 'en' ? 'EN' : 'FI'}
      </span>
    </button>
  );
}

