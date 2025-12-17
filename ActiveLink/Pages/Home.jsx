import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight, Globe, Trophy, GraduationCap, Palette } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();
  // TODO: Implement events data fetching
  const upcomingEvents = [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-start justify-center overflow-hidden pt-[160px] md:pt-[200px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/events/homepage.png" 
            alt="Aktive Lifestyle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2f]/90 to-[#0a0f2f]/80" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              {t.home.hero.title} <br/>
              <span className="text-[#f8cb2a]">{t.home.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
              {t.home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={createPageUrl('Join')}
                className="px-10 py-5 bg-[#0a0f2f] hover:bg-[#0a0f2f]/90 text-white rounded-full font-semibold text-lg md:text-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {t.home.hero.joinCommunity} <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <Link 
                to={createPageUrl('About')}
                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold text-lg md:text-xl transition-all text-center shadow-lg hover:shadow-xl"
              >
                {t.home.hero.learnMore}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-semibold text-[#f8cb2a] tracking-widest uppercase mb-3">{t.home.approach.subtitle}</h2>
            <h3 className="text-4xl font-bold text-[#0a0f2f]">{t.home.approach.title}</h3>
            <p className="mt-4 text-slate-600 text-lg">
              {t.home.approach.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={<GraduationCap className="w-8 h-8 text-[#0a0f2f]" />}
              title={t.home.approach.education.title}
              description={t.home.approach.education.description}
            />
            <ValueCard 
              icon={<Trophy className="w-8 h-8 text-[#f8cb2a]" />}
              title={t.home.approach.sports.title}
              description={t.home.approach.sports.description}
            />
            <ValueCard 
              icon={<Palette className="w-8 h-8 text-rose-500" />}
              title={t.home.approach.art.title}
              description={t.home.approach.art.description}
            />
             <ValueCard 
              icon={<Globe className="w-8 h-8 text-indigo-500" />}
              title={t.home.approach.partnerships.title}
              description={t.home.approach.partnerships.description}
            />
          </div>
        </div>
      </section>

      {/* Stats/Impact Section */}
      <section className="py-20 bg-[#0a0f2f] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number="50+" label={t.home.stats.events} />
            <StatItem number="1200+" label={t.home.stats.members} />
            <StatItem number="15" label={t.home.stats.programs} />
            <StatItem number="10" label={t.home.stats.countries} />
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">{t.home.stats.visionNote}</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-[#0a0f2f]/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#0a0f2f] mb-6">{t.home.cta.title}</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            {t.home.cta.description}
          </p>
          <Link 
            to={createPageUrl('Join')}
            className="inline-flex items-center justify-center px-10 py-5 bg-[#0a0f2f] text-white rounded-full font-semibold text-lg hover:bg-[#0a0f2f]/90 transition-all shadow-lg hover:shadow-xl"
          >
            {t.home.cta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all"
    >
      <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-[#0a0f2f] mb-3">{title}</h4>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="p-4">
      <div className="text-4xl md:text-5xl font-bold text-[#f8cb2a] mb-2">{number}</div>
      <div className="text-slate-400 font-medium tracking-wide uppercase text-sm">{label}</div>
    </div>
  );
}