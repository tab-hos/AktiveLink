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
    <div className="min-h-screen pt-40 md:pt-56 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a0f2f] mb-6">{t.training.title}</h1>
          <p className="text-xl text-slate-600">
            {t.training.description}
          </p>
        </div>

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