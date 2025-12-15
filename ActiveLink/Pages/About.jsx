import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Globe2, Heart, Users, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function About() {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);
  
  const teamMembers = [
    {
      name: "Olsi Marko",
      role: "Founder",
      image: "/olsi.png",
      shortBio: "Physical education teacher and coordinator with over 14 years of experience in youth work, specializing in inclusive sports and community building.",
      fullBio: `Olsi Marko – Coordinator, Trainer & Physical Education Teacher

Age: 45
Location: Helsinki, Finland
Role: Coordinator at Helsingin NMKY (YMCA Helsinki)
Expertise: Youth Work · Inclusive Sports · Coaching · Community Building · Training Delivery

Profile

Olsi Marko is a physical education teacher and long-time youth work professional with more than fourteen years of experience at Helsingin NMKY. He is widely known for coordinating Yökoris (Midnight Street Basketball), one of Finland's most recognized low-threshold sports programs for young people. His work focuses on building safe, inclusive and empowering spaces where youth from diverse backgrounds can connect through sport.

Olsi's leadership style is rooted in participation, accessibility, and positive community engagement. Over the years, he has developed strong expertise in using sport as a social tool, creating activities that bring young people together while strengthening their physical, social, and emotional wellbeing.

Achievements

• Awarded Coach of the Year (Helsinki, 2017) for outstanding contribution to community sports and youth development.
• Has coordinated and expanded Yökoris into a highly visible and impactful multicultural street basketball project in Helsinki.
• Successfully collaborated with schools, youth centers, municipalities, and international partners to promote inclusive sport initiatives.
• Recognized for developing innovative, low-threshold participation methods that increase engagement among youth at risk of social exclusion.

International Training & Facilitation

In recent years, Olsi has expanded his role from coordinator to trainer and facilitator in international youth work settings.
Most recently, he served as a trainer at the International Tool Fair in Morocco, where he delivered his workshop "Building Inclusive Communities Through Sports". His sessions focus on:

• Social inclusion in sport
• Low-threshold coaching methods
• Team building and group dynamics
• Using sports as a pedagogical tool in youth work
• Practical exercises for inclusive practice

Olsi enjoys sharing his experience with international audiences and supporting youth workers and coaches in developing more accessible and meaningful sports activities.

Professional Focus

• Inclusive community sports
• Coaching and youth empowerment
• Intercultural team dynamics
• Designing and delivering training sessions
• Long-term youth engagement strategies
• Low-barrier activity development
• Coordination of large-scale youth programs

Motivation

Olsi is passionate about creating safe environments where young people feel included, respected, and encouraged to grow. After many years focusing mainly on organising activities, he is now embracing the role of trainer and facilitator—sharing his knowledge, tools, and practical experience with others in the field.`
    },
    {
      name: "Antti Avelin",
      role: "Founder",
      image: "/antti.png",
      shortBio: "Dedicated basketball coach and educator from Kotka, with two Finnish Championships as a youth basketball coach.",
      fullBio: `Antti Avelin is a dedicated basketball coach and educator from Kotka. Antti has won two Finnish Champions as coach in youth basketball leagues.

Outside of basketball, Antti works in vocational education and project coordination, including roles such as Coordinator of International Activities and Project Manager at South Kymenlaakso Vocational College (EKAMI), where he also contributes as a vocational teacher. 

Antti's approach to coaching emphasizes continuous growth, teamwork, and strategic understanding of the game. His experience in both coaching and educational environments supports young athletes not only in developing their skills but also in building confidence, discipline, and a positive mindset — qualities that are valuable both on and off the court.

With a background rooted in Finnish sports culture and education, Antti Avelin is known for his thoughtful leadership, strong communication skills, and dedication to fostering an encouraging team environment.`
    },
    {
      name: "Daniel Villas Bôas",
      role: "Founder",
      image: null,
      shortBio: "Focused on bridging gaps between organizations and target audiences to foster true social inclusion and exchange.",
      fullBio: "Focused on bridging gaps between organizations and target audiences to foster true social inclusion and exchange."
    },
    {
      name: "Tabu (Taleb) Hossaini",
      role: "Co-Founder / Educator & Trainer",
      image: null,
      shortBio: "Youth educator and community facilitator focusing on inclusion, participation, and global education, with extensive experience in multicultural youth work.",
      fullBio: `Tabu (Taleb) Hossaini is a youth educator and community facilitator whose work focuses on inclusion, participation, and global education. Having arrived in Finland as a young refugee, his lived experience has strongly shaped his long-term commitment to supporting young people, particularly in multicultural environments and in questions of identity, belonging, and agency.

Tabu has worked actively as a global education lead and coordinator in youth settings in Helsinki. In this role, he has planned and facilitated workshops, themed evenings, discussions, and participatory activities addressing topics such as global responsibility, equality, sustainability, human rights, and social justice. His approach emphasizes dialogue, critical thinking, and creating spaces where young people feel safe to reflect on both local and global issues.

Alongside global education, Tabu has extensive experience in everyday youth work, including after-school activities and open community spaces. He integrates global themes naturally into informal learning environments, connecting them to young people's own lives and experiences rather than treating them as abstract concepts.

Tabu is currently a student at Kood/Sisu, where he is developing skills in technology and software development. Through this path, he aims to shorten the gap between education, youth work, and technology, exploring how digital tools and technical understanding can support learning, accessibility, and social impact in modern educational environments.

In 2017, during Finland's 100th anniversary of independence, Tabu was invited to the Independence Day Reception (Linnan juhlat) in recognition of his positive contribution to youth and community work — highlighting the broader impact of his engagement and leadership.

Tabu is known for his approachable, empathetic, and grounded working style. He connects easily with young people from diverse backgrounds and encourages participation through trust, dialogue, and shared responsibility. His work supports young people not only in gaining knowledge, but also in building confidence, awareness, and a sense of belonging.

With a background shaped by migration, education, community engagement, and emerging technical expertise, Tabu (Taleb) Hossaini is recognized for his commitment to inclusive youth work, meaningful global education, and bridging social impact with technology.`
    },
    {
      name: "Kevin",
      role: "Co-Founder",
      image: null,
      shortBio: "Co-founder of AktiveLink Finland, contributing to the organization's mission and vision.",
      fullBio: "Co-founder of AktiveLink Finland, contributing to the organization's mission and vision."
    }
  ];
  
  return (
    <div className="pt-40 md:pt-56 pb-20">
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
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
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