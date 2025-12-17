import React from 'react';
import ProgramCard from '../Components/training/ProgramCard.jsx';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Training() {
  const { t } = useTranslation();
  // TODO: Implement programs data fetching
  const programs = [];
  const isLoading = false;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section with Background */}
      <div className="relative mb-16 h-[400px] md:h-[500px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/education/training.png" 
            alt="Training Programs" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2f]/90 to-[#0a0f2f]/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {(() => {
              const words = t.training.title.split(' ');
              const firstWord = words[0];
              const rest = words.slice(1).join(' ');
              return (
                <>
                  <span>{firstWord}</span>
                  {rest && <><span className="text-[#f8cb2a]"> {rest}</span></>}
                </>
              );
            })()}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t.training.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#0a0f2f] animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}

        {!isLoading && programs.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">{t.training.noPrograms}</p>
          </div>
        )}
      </div>
    </div>
  );
}