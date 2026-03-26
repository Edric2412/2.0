import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Github, Linkedin } from 'lucide-react';
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
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-outline/10">
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
          <ThemeToggle />
          <a href="mailto:edricjeffrey07@gmail.com" className="hidden sm:block amethyst-gradient text-white px-6 md:px-8 py-2 md:py-2.5 rounded-lg font-headline font-bold text-xs md:text-sm scale-95 hover:scale-100 active:scale-90 transition-all uppercase tracking-wider shadow-lg shadow-primary/20">
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

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 w-full h-screen bg-background/60 backdrop-blur-3xl border-t border-outline/10 shadow-2xl flex flex-col py-6 px-6 gap-2 overflow-y-auto pb-32"
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
            <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-colors" href="https://huggingface.co/Edric2412" target="_blank" rel="noreferrer" title="Hugging Face">
              <svg className="w-6 h-6" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.015 63.945c-17.636 0-31.933-14.297-31.933-31.933S14.379.079 32.015.079c17.636 0 31.933 14.297 31.933 31.933S49.651 63.945 32.015 63.945zm0-60.672c-15.867 0-28.739 12.872-28.739 28.739 0 15.867 12.872 28.739 28.739 28.739 15.867 0 28.739-12.872 28.739-28.739 0-15.867-12.872-28.739-28.739-28.739z" />
                <path d="M43.076 25.131c-1.378 0-2.495-1.117-2.495-2.495 0-1.378 1.117-2.495 2.495-2.495 1.378 0 2.495 1.117 2.495 2.495 0 1.378-1.117 2.495-2.495 2.495zm-22.122 0c-1.378 0-2.495-1.117-2.495-2.495 0-1.378 1.117-2.495 2.495-2.495 1.378 0 2.495 1.117 2.495 2.495 0 1.378-1.117 2.495-2.495 2.495zm11.061 22.122c-8.274 0-15.004-6.73-15.004-15.004h3.194c0 6.513 5.297 11.81 11.81 11.81s11.81-5.297 11.81-11.81h3.194c0 8.274-6.73 15.004-15.004 15.004z" />
              </svg>
            </a>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
