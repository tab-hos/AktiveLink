import React, { useState } from 'react';
import EventCard from '../Components/events/EventCard.jsx';
import CalendarView from '../Components/events/CalendarView.jsx';
import { Loader2, Calendar as CalendarIcon, List as ListIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Events() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // TODO: Implement events data fetching
  const events = [];
  const isLoading = false;

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  const categories = [
    { key: 'all', label: t.events.filters.all },
    { key: 'sports', label: t.events.filters.sports },
    { key: 'culture', label: t.events.filters.culture },
    { key: 'education', label: t.events.filters.education },
    { key: 'art', label: t.events.filters.art },
  ];

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Hero Section with Background */}
      <div className="relative mb-16 h-[400px] md:h-[500px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/events/event.png" 
            alt="Events" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f2f]/90 to-[#0a0f2f]/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {(() => {
              const words = t.events.title.split(' ');
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
          <p className="text-xl text-white/90 max-w-2xl">{t.events.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 flex-1">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all whitespace-nowrap ${
                  filter === cat.key
                    ? 'bg-[#0a0f2f] text-white shadow-md' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
             <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-[#0a0f2f]' : 'text-slate-500 hover:text-slate-700'}`}
                title={t.events.viewList}
             >
                <ListIcon className="w-5 h-5" />
             </button>
             <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'calendar' ? 'bg-slate-100 text-[#0a0f2f]' : 'text-slate-500 hover:text-slate-700'}`}
                title={t.events.viewCalendar}
             >
                <CalendarIcon className="w-5 h-5" />
             </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#0a0f2f] animate-spin" />
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
               <div className="space-y-6">
                 {filteredEvents.map((event) => (
                   <EventCard key={event.id} event={event} />
                 ))}
                 
                 {filteredEvents.length === 0 && (
                   <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                     <p className="text-slate-500 text-lg">{t.events.noEvents}</p>
                   </div>
                 )}
               </div>
            ) : (
               <CalendarView events={filteredEvents} />
            )}
          </>
        )}
      </div>
    </div>
  );
}