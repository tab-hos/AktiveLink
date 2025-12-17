import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Globe2, Heart, Users, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function About() {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);
  
  const teamMembers = t.about.founders.staff;
  
  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#0a0f2f] mb-6">
            {t.about.title} <br/>
            <span className="text-[#f8cb2a]">{t.about.titleHighlight}</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-[#f8cb2a]/10 rounded-2xl transform -rotate-3"></div>
            <img 
              src="/events/who_we_are.png" 
              alt="Community Workshop" 
              className="relative rounded-2xl shadow-xl w-full h-[600px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0a0f2f] mb-6">{t.about.whoWeAre.title}</h2>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              {t.about.whoWeAre.paragraph1}
            </p>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              {t.about.whoWeAre.paragraph2}
            </p>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {t.about.whoWeAre.paragraph3}
            </p>
            
            <div className="space-y-4">
              {t.about.whoWeAre.features.map((feature, index) => (
                <Feature key={index} text={feature} />
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-[#0a0f2f]/5 rounded-3xl p-12 md:p-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#0a0f2f] mb-4">{t.about.founders.title}</h2>
            <p className="text-[#0a0f2f]">
              {t.about.founders.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.shortBio}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-1 rounded-full bg-[#f8cb2a]/10 text-[#f8cb2a]">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <span className="text-slate-700 font-medium">{text}</span>
    </div>
  );
}

function TeamMember({ name, role, image, bio, onClick }) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-[#f8cb2a]/20"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-[#f8cb2a]/20 flex items-center justify-center border-4 border-[#f8cb2a]/20">
          <Users className="w-16 h-16 text-[#f8cb2a]/40" />
        </div>
      )}
      <h3 className="text-xl font-bold text-[#0a0f2f]">{name}</h3>
      <p className="text-[#f8cb2a] font-medium mb-4">{role}</p>
      <p className="text-slate-500 text-sm leading-relaxed mb-2">
        {bio}
      </p>
      <p className="text-[#f8cb2a] text-xs font-medium mt-3">
        Click to learn more →
      </p>
    </motion.div>
  );
}

function MemberModal({ member, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl mx-auto p-8 md:p-12 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Image */}
            <div className="flex-shrink-0">
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-48 h-48 rounded-2xl object-cover border-4 border-[#f8cb2a]/20"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-48 h-48 rounded-2xl bg-[#f8cb2a]/20 flex items-center justify-center border-4 border-[#f8cb2a]/20">
                  <Users className="w-24 h-24 text-[#f8cb2a]/40" />
                </div>
              )}
            </div>

            {/* Header Info */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0f2f] mb-2">
                {member.name}
              </h2>
              <p className="text-xl text-[#f8cb2a] font-medium mb-6">
                {member.role}
              </p>
            </div>
          </div>

          {/* Full Bio */}
          <div className="prose prose-slate max-w-none">
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {member.fullBio}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}