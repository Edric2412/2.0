import { Github, Linkedin } from 'lucide-react';

export function SideNav() {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 z-40 bg-surface-container-low shadow-[0_0_30px_rgba(199,125,255,0.1)] hidden lg:flex flex-col items-center py-10 pt-28">
      <div className="mb-12 flex flex-col items-center">
      </div>
      <div className="flex flex-col items-center space-y-8 flex-1">
        <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-transform duration-500 ease-in-out" href="https://github.com/Edric2412" target="_blank" title="GitHub">
          <Github className="w-6 h-6" />
        </a>
        <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-transform duration-500 ease-in-out" href="https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/" target="_blank" title="LinkedIn">
          <Linkedin className="w-6 h-6" />
        </a>
        <a className="p-3 text-primary hover:bg-surface-container-high hover:text-on-surface rounded-full transition-transform duration-500 ease-in-out" href="https://huggingface.co/Edric2412" target="_blank" title="Hugging Face">
          <svg className="w-6 h-6" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.015 63.945c-17.636 0-31.933-14.297-31.933-31.933S14.379.079 32.015.079c17.636 0 31.933 14.297 31.933 31.933S49.651 63.945 32.015 63.945zm0-60.672c-15.867 0-28.739 12.872-28.739 28.739 0 15.867 12.872 28.739 28.739 28.739 15.867 0 28.739-12.872 28.739-28.739 0-15.867-12.872-28.739-28.739-28.739z" />
            <path d="M43.076 25.131c-1.378 0-2.495-1.117-2.495-2.495 0-1.378 1.117-2.495 2.495-2.495 1.378 0 2.495 1.117 2.495 2.495 0 1.378-1.117 2.495-2.495 2.495zm-22.122 0c-1.378 0-2.495-1.117-2.495-2.495 0-1.378 1.117-2.495 2.495-2.495 1.378 0 2.495 1.117 2.495 2.495 0 1.378-1.117 2.495-2.495 2.495zm11.061 22.122c-8.274 0-15.004-6.73-15.004-15.004h3.194c0 6.513 5.297 11.81 11.81 11.81s11.81-5.297 11.81-11.81h3.194c0 8.274-6.73 15.004-15.004 15.004z" />
          </svg>
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
