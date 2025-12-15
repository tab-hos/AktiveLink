import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import RegistrationDialog from './RegistrationDialog.jsx';
import { useTranslation } from '../../hooks/useTranslation';

export default function ProgramCard({ program }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={program.image_url} 
          alt={program.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider text-[#0a0f2f] rounded-full">
            {program.focus_area}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-[#0a0f2f] mb-3 group-hover:text-[#f8cb2a] transition-colors">
          {program.title}
        </h3>
        
        <p className="text-slate-600 mb-6 flex-grow line-clamp-3">
          {program.description}
        </p>
        
        <div className="flex items-center gap-6 text-sm text-slate-500 pt-6 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#f8cb2a]" />
            <span>{program.duration || 'Ongoing'}</span>
          </div>
          {program.focus_area && (
             <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#f8cb2a]" />
                <span className="capitalize">{program.focus_area}</span>
             </div>
          )}
        </div>
        
        <div className="px-6 pb-6 mt-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-[#0a0f2f] text-white rounded-xl font-semibold text-base hover:bg-[#0a0f2f]/90 transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
          >
            {t.training.register} <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
    
    <RegistrationDialog 
      program={program} 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
}