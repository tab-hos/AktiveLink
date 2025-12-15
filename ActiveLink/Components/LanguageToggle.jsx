import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#f8cb2a]/10 border border-transparent hover:border-[#f8cb2a]/30"
      title={language === 'en' ? 'Vaihda suomeksi' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-[#0a0f2f]" />
      <span className="text-[#0a0f2f] font-semibold uppercase">
        {language === 'en' ? 'EN' : 'FI'}
      </span>
    </button>
  );
}

