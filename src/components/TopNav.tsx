import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Github, Linkedin, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TopNav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience & Education' },
    { path: '/tech-stack', label: 'Tech Stack' },
    { path: '/projects', label: 'Projects & Research' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isMobileMenuOpen ? 'bg-transparent border-transparent' : 'bg-background/40 backdrop-blur-2xl shadow-sm border-white/10 dark:border-white/5'} border-b`}>
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-xl md:text-2xl font-bold tracking-tighter text-on-surface font-headline uppercase truncate">Edric Jeffrey Sam</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`font-['Space_Grotesk'] text-xs xl:text-sm tracking-widest uppercase transition-colors duration-300 ${isActive(link.path) ? 'text-on-surface font-bold border-b-2 border-primary pb-1' : 'text-primary hover:text-on-surface'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {/* Desktop Socials */}
          <div className="hidden lg:flex items-center gap-4 border-r border-outline/20 pr-6 mr-1">
            <a className="text-primary hover:text-on-surface hover:scale-110 transition-all" href="https://github.com/Edric2412" target="_blank" rel="noreferrer" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a className="text-primary hover:text-on-surface hover:scale-110 transition-all" href="https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/" target="_blank" rel="noreferrer" title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a className="text-primary hover:text-on-surface hover:scale-110 transition-all" href="https://huggingface.co/Edric2412" target="_blank" rel="noreferrer" title="Hugging Face">
              <Bot className="w-5 h-5" />
            </a>
          </div>

          <ThemeToggle />
          <a href="mailto:edricjeffrey07@gmail.com" className="hidden sm:block amethyst-gradient text-white px-6 md:px-8 py-2 md:py-2.5 rounded-lg font-headline font-bold text-xs md:text-sm scale-95 hover:scale-100 active:scale-90 transition-all uppercase tracking-wider shadow-[0_0_20px_rgba(157,78,221,0.3)]">
            Contact
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-on-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Navigation Menu Overlay at z-40 so it sits behind the TopNav but above the page */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden fixed inset-0 z-40 w-full h-screen bg-background/60 backdrop-blur-3xl shadow-2xl flex flex-col pt-24 px-6 gap-2 overflow-y-auto pb-32"
          >
            {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-['Space_Grotesk'] text-base tracking-widest uppercase py-4 transition-colors duration-300 ${isActive(link.path) ? 'text-on-surface font-bold border-l-4 border-primary pl-4 bg-surface-container-low/50' : 'text-primary hover:text-on-surface pl-4'}`}
            >
              {link.label}
            </Link>
          ))}
          <a 
            href="mailto:edricjeffrey07@gmail.com"
            onClick={() => setIsMobileMenuOpen(false)}
            className="amethyst-gradient text-white px-8 py-4 mt-6 rounded-xl font-headline font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/20 w-full text-center block"
          >
            Contact Me
          </a>
          
          {/* Mobile Social Links */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-outline/10">
            <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-colors" href="https://github.com/Edric2412" target="_blank" rel="noreferrer" title="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-colors" href="https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/" target="_blank" rel="noreferrer" title="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface hover:scale-110 rounded-full transition-all" href="https://huggingface.co/Edric2412" target="_blank" rel="noreferrer" title="Hugging Face">
              <Bot className="w-6 h-6" />
            </a>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
