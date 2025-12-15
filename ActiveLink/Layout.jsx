import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Instagram, Facebook, Twitter, Mail, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from './hooks/useTranslation';
import LanguageToggle from './Components/LanguageToggle.jsx';

function NewsletterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const subscribe = async (e) => {
    e.preventDefault();
    if(!email) return;
    setStatus('loading');
    try {
      // TODO: Implement newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-400 bg-green-900/20 p-3 rounded-lg border border-green-900/50">
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">{t.footer.newsletter.subscribed}</span>
      </div>
    );
  }

  return (
    <form onSubmit={subscribe} className="relative">
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.footer.newsletter.placeholder}
        className="w-full bg-[#0a0f2f]/50 border border-slate-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#f8cb2a] transition-colors pr-12"
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="absolute right-1 top-1 bottom-1 bg-[#0a0f2f] hover:bg-[#0a0f2f] text-white rounded-md px-3 transition-colors disabled:opacity-50 flex items-center justify-center"
      >
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
      </button>
      {status === 'error' && <p className="text-red-400 text-xs mt-2">{t.footer.newsletter.error}</p>}
    </form>
  );
}

export default function Layout({ children }) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: 'Home' },
    { name: t.nav.about, path: 'About' },
    { name: t.nav.events, path: 'Events' },
    { name: t.nav.training, path: 'Training' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#0a0f2f] selection:bg-[#f8cb2a]/20 selection:text-[#0a0f2f]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        :root {
          --font-sans: 'Inter', sans-serif;
        }
        body {
            font-family: var(--font-sans);
        }
      `}</style>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-0.5' : 'bg-white/95 backdrop-blur-md shadow-sm py-1'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
             {/* Logo */}
             <img 
               src="/logo.png" 
               alt="AktiveLink Finland" 
               className="h-32 md:h-44 w-auto object-contain"
               onError={(e) => {
                 console.warn('Logo not found at /logo.png. Please place logo.png in the public directory.');
                 e.target.style.display = 'none';
               }}
             />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={createPageUrl(link.path)}
                className="text-lg font-medium transition-colors text-slate-700 hover:text-[#f8cb2a]"
              >
                {link.name}
              </Link>
            ))}
            <LanguageToggle isScrolled={isScrolled} />
            <Link 
              to={createPageUrl('Join')}
              className="px-6 py-2.5 rounded-full text-base font-semibold transition-all hover:scale-105 bg-[#0a0f2f] text-white hover:bg-[#0a0f2f]/90"
            >
              {t.nav.becomeMember}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
               <X className="w-7 h-7 text-[#0a0f2f]" />
            ) : (
               <Menu className="w-7 h-7 text-[#0a0f2f]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={createPageUrl(link.path)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-slate-800"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 flex flex-col items-center gap-4">
                <LanguageToggle />
                <Link 
                  to={createPageUrl('Join')}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-10 py-4 bg-[#0a0f2f] text-white rounded-full text-lg font-semibold"
                >
                  {t.nav.becomeMember}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0f2f] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">AktiveLink<span className="font-light">Finland</span></h3>
              <p className="text-slate-400 leading-relaxed">
                {t.footer.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={createPageUrl(link.path)} className="text-slate-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">{t.footer.contact}</h4>
              <ul className="space-y-3 text-slate-400">
                <li>Helsinki, Finland</li>
                <li>info@aktivelink.fi</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">{t.footer.followUs}</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-[#0a0f2f]/50 rounded-full hover:bg-[#f8cb2a] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-[#0a0f2f]/50 rounded-full hover:bg-[#f8cb2a] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-[#0a0f2f]/50 rounded-full hover:bg-[#f8cb2a] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
               <h4 className="text-lg font-semibold mb-6">{t.footer.newsletter.title}</h4>
               <p className="text-slate-400 text-sm mb-4">{t.footer.newsletter.description}</p>
               <NewsletterForm />
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} AktiveLink Finland. {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}