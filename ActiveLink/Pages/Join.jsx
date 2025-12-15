import React from 'react';
import MembershipForm from '../Components/join/MembershipForm.jsx';
import { Check } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Join() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen pt-40 md:pt-56 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column: Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a0f2f] mb-6">
              {t.join.title}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              {t.join.description}
            </p>

            <div className="space-y-8 mb-12">
              <Benefit 
                title={t.join.benefits.exclusive.title}
                description={t.join.benefits.exclusive.description}
              />
              <Benefit 
                title={t.join.benefits.network.title}
                description={t.join.benefits.network.description}
              />
              <Benefit 
                title={t.join.benefits.voting.title}
                description={t.join.benefits.voting.description}
              />
            </div>

            <div className="bg-[#0a0f2f]/5 p-8 rounded-2xl border border-[#f8cb2a]/20">
              <h3 className="font-bold text-[#0a0f2f] mb-4">{t.join.pricing.title}</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-[#f8cb2a]/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-[#0a0f2f]">{t.join.pricing.individual.title}</h4>
                      <p className="text-sm text-slate-600">{t.join.pricing.individual.monthly}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#0a0f2f]">{t.join.pricing.individual.annual}</div>
                      <div className="text-xs text-[#f8cb2a] font-semibold">{t.join.pricing.individual.savings}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#f8cb2a]/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-[#0a0f2f]">{t.join.pricing.corporate.title}</h4>
                      <p className="text-sm text-slate-600">{t.join.pricing.corporate.monthly}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#0a0f2f]">{t.join.pricing.corporate.annual}</div>
                      <div className="text-xs text-[#f8cb2a] font-semibold">{t.join.pricing.corporate.savings}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div>
            <MembershipForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function Benefit({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f8cb2a]/10 flex items-center justify-center text-[#0a0f2f] mt-1">
        <Check className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold text-[#0a0f2f] text-lg">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
}