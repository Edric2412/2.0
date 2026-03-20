import { Code, User, Brain } from 'lucide-react';

export function SideNav() {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 lg:w-20 z-40 bg-surface-container-low shadow-[0_0_30px_rgba(199,125,255,0.1)] hidden md:flex flex-col items-center py-10 pt-28">
      <div className="mb-12 flex flex-col items-center">
      </div>
      <div className="flex flex-col items-center space-y-8 flex-1">
        <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-transform duration-500 ease-in-out" href="https://github.com/Edric2412" target="_blank" title="GitHub">
          <Code className="w-6 h-6" />
        </a>
        <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-transform duration-500 ease-in-out" href="https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/" target="_blank" title="LinkedIn">
          <User className="w-6 h-6" />
        </a>
        <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-transform duration-500 ease-in-out" href="https://huggingface.co/Edric2412" target="_blank" title="Hugging Face">
          <Brain className="w-6 h-6" />
        </a>
      </div>
      <div className="mt-auto py-6">
        <div className="rotate-[-90deg] origin-center whitespace-nowrap">
          <span className="text-[8px] tracking-[0.4em] font-bold text-outline/50 uppercase">Neural Architect</span>
        </div>
      </div>
    </aside>
  );
}
