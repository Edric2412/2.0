import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function TopNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl border-b border-outline/10">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tighter text-on-surface font-headline uppercase">Edric Jeffrey</span>
          <span className="hidden md:inline-block px-2 py-0.5 text-[10px] bg-primary/20 text-primary border border-primary/30 rounded-sm font-bold tracking-widest">STABLE v2.0.4</span>
        </div>
        <div className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className={`font-['Space_Grotesk'] text-sm tracking-widest uppercase transition-colors duration-300 ${isActive('/') ? 'text-on-surface font-bold border-b-2 border-primary pb-1' : 'text-primary hover:text-on-surface'}`}
          >
            Home
          </Link>
          <Link 
            to="/experience" 
            className={`font-['Space_Grotesk'] text-sm tracking-widest uppercase transition-colors duration-300 ${isActive('/experience') ? 'text-on-surface font-bold border-b-2 border-primary pb-1' : 'text-primary hover:text-on-surface'}`}
          >
            Experience & Education
          </Link>
          <Link 
            to="/tech-stack" 
            className={`font-['Space_Grotesk'] text-sm tracking-widest uppercase transition-colors duration-300 ${isActive('/tech-stack') ? 'text-on-surface font-bold border-b-2 border-primary pb-1' : 'text-primary hover:text-on-surface'}`}
          >
            Tech Stack
          </Link>
          <Link 
            to="/projects" 
            className={`font-['Space_Grotesk'] text-sm tracking-widest uppercase transition-colors duration-300 ${isActive('/projects') ? 'text-on-surface font-bold border-b-2 border-primary pb-1' : 'text-primary hover:text-on-surface'}`}
          >
            Projects & Research
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <button className="amethyst-gradient text-white px-8 py-2.5 rounded-lg font-headline font-bold text-sm scale-95 hover:scale-100 active:scale-90 transition-all uppercase tracking-wider shadow-lg shadow-primary/20">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
