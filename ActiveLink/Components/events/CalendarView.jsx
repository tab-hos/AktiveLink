import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CalendarView({ events }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getEventsForDay = (date) => {
    return events.filter(event => isSameDay(new Date(event.start_date), date));
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-100">
        <h2 className="text-2xl font-bold text-[#0a0f2f]">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center text-sm font-semibold text-slate-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-fr bg-slate-200 gap-px">
        {calendarDays.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div 
              key={day.toString()} 
              className={`min-h-[140px] bg-white p-2 transition-colors hover:bg-slate-50/50 ${
                !isCurrentMonth ? 'bg-slate-50/30' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span 
                  className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                    isToday(day) 
                      ? 'bg-[#0a0f2f] text-white' 
                      : !isCurrentMonth 
                        ? 'text-slate-300' 
                        : 'text-slate-700'
                  }`}
                >
                  {format(day, 'd')}
                </span>
                {dayEvents.length > 0 && (
                   <span className="text-xs font-bold text-[#0a0f2f] bg-[#f8cb2a]/20 px-1.5 py-0.5 rounded-md">
                     {dayEvents.length}
                   </span>
                )}
              </div>
              
              <div className="space-y-1.5">
                {dayEvents.slice(0, 3).map(event => (
                  <div 
                    key={event.id}
                    className="group relative bg-[#f8cb2a]/10 border border-[#f8cb2a]/30 rounded px-2 py-1 cursor-pointer hover:border-[#f8cb2a] transition-colors"
                  >
                    <div className="truncate text-xs font-medium text-[#0a0f2f]">
                      {event.title}
                    </div>
                    <div className="truncate text-[10px] text-[#0a0f2f]/70">
                      {format(new Date(event.start_date), 'h:mm a')}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-20 w-48 bg-[#0a0f2f] text-white text-xs p-2 rounded shadow-xl pointer-events-none">
                       <div className="font-bold mb-1">{event.title}</div>
                       <div className="flex items-center gap-1 mb-1 text-slate-300"><Clock className="w-3 h-3"/> {format(new Date(event.start_date), 'h:mm a')}</div>
                       <div className="flex items-center gap-1 text-slate-300"><MapPin className="w-3 h-3"/> {event.location}</div>
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-slate-400 pl-1">
                    + {dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}