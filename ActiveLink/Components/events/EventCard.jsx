import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from '../../hooks/useTranslation';

export default function EventCard({ event }) {
  const { t } = useTranslation();
  const startDate = new Date(event.start_date);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100"
    >
      <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
        <img 
          src={event.image_url} 
          alt={event.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-center min-w-[60px] shadow-sm">
          <div className="text-xs font-bold text-[#f8cb2a] uppercase">{format(startDate, 'MMM')}</div>
          <div className="text-xl font-bold text-[#0a0f2f]">{format(startDate, 'd')}</div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[#f8cb2a] uppercase tracking-wider">
              {event.category}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-[#0a0f2f] mb-3">{event.title}</h3>
          <p className="text-slate-600 line-clamp-2 mb-4">{event.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center text-slate-500 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {format(startDate, 'EEEE, h:mm a')}
            </div>
            <div className="flex items-center text-slate-500 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
          </div>
          
          <button className="px-6 py-3 text-[#f8cb2a] bg-[#f8cb2a]/10 hover:bg-[#f8cb2a]/20 font-semibold hover:text-[#0a0f2f] rounded-lg flex items-center transition-colors">
            {t.common.details} <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}