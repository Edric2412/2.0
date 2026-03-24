import { motion } from 'motion/react';
import { Quote, Send, Download, Terminal, Cpu, Microscope, Mail, Phone } from 'lucide-react';
import { NeuralPortrait } from '../components/NeuralPortrait';

export function Home() {
  return (
    <main className="pl-0 md:pl-20 min-h-screen pt-20 grid-bg relative overflow-hidden flex-1">
      {/* Animated Amethyst Circuit Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute bg-gradient-to-r from-transparent via-primary to-transparent h-px w-[250px] animate-[flow_12s_linear_infinite]" style={{ top: '15%', left: '5%', animationDelay: '0s' }}></div>
        <div className="absolute bg-gradient-to-r from-transparent via-primary to-transparent h-px w-[250px] animate-[flow_12s_linear_infinite]" style={{ top: '35%', left: '-10%', animationDelay: '5s' }}></div>
        <div className="absolute bg-gradient-to-r from-transparent via-primary to-transparent h-px w-[250px] animate-[flow_12s_linear_infinite]" style={{ top: '55%', left: '20%', animationDelay: '9s' }}></div>
        <div className="absolute bg-gradient-to-r from-transparent via-primary to-transparent h-px w-[250px] animate-[flow_12s_linear_infinite]" style={{ top: '80%', left: '-5%', animationDelay: '3s' }}></div>
        <div className="absolute bg-gradient-to-r from-transparent via-primary to-transparent h-px w-[250px] animate-[flow_12s_linear_infinite]" style={{ top: '95%', left: '15%', animationDelay: '7s' }}></div>
      </div>

      {/* Background Glow Elements */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-secondary/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Hero Content */}
          <div className="flex-1 space-y-8 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-surface-container-high border border-outline/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-sm">AI Engineer</span>
                <div className="h-px w-12 bg-outline/30"></div>
                <span className="text-xs text-on-surface-variant tracking-widest uppercase font-medium">Core Systems Architecture</span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black text-on-surface leading-none tracking-tighter">
                Edric Jeffrey <span className="text-transparent bg-clip-text amethyst-gradient">Sam</span>
              </h1>
              <p className="font-headline text-lg sm:text-xl md:text-2xl text-on-surface-variant font-medium max-w-2xl leading-relaxed">
                Architecting the next generation of <span className="text-on-surface">Large Language Models</span> and <span className="text-on-surface">RAG systems</span> with mechanical precision.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-surface-container-low/80 backdrop-blur-md border-l-4 border-primary p-6 md:p-8 max-w-2xl shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Quote className="w-16 h-16" />
              </div>
              <p className="text-sm md:text-base text-on-surface leading-relaxed font-body italic">
                "AI/ML Engineer focused on Large Language Models, RAG systems, and AI reliability engineering. Experienced in fine-tuning and evaluating LLMs (QLoRA, LoRA) and building production AI systems integrating FastAPI, React, Docker, and cloud infrastructure. Developed end-to-end AI platforms including hallucination detection pipelines, adaptive learning engines using reinforcement learning, and multimodal GenAI applications. Passionate about building scalable and trustworthy AI systems for real-world deployment."
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a href="mailto:edricjeffrey07@gmail.com" className="amethyst-gradient text-white px-6 md:px-10 py-4 md:py-5 rounded-xl font-headline font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-[0_0_40px_rgba(123,44,191,0.4)] transition-all hover:-translate-y-1 w-full sm:w-auto justify-center">
                Contact Me
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="/resume.pdf" download="Edric_Jeffrey_Resume.pdf" className="bg-surface-container border border-outline/30 text-on-surface px-6 md:px-10 py-4 md:py-5 rounded-xl font-headline font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-surface-container-high transition-all w-full sm:w-auto justify-center">
                Download Resume
                <Download className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </motion.div>

            {/* Technical Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8 flex flex-wrap items-center gap-4 opacity-70"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline/20 rounded-lg">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface">Linux x86_64</span>
              </div>
              <a href="mailto:edricjeffrey07@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline/20 rounded-lg hover:border-primary/50 transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface">edricjeffrey07@gmail.com</span>
              </a>
              <a href="tel:+917305528953" className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline/20 rounded-lg hover:border-primary/50 transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface">+91 7305528953</span>
              </a>
            </motion.div>
          </div>

          {/* Hero Portrait Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-md lg:max-w-lg aspect-[4/5]"
          >
            {/* Outer Glow Frame */}
            <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-3xl -z-10"></div>
            {/* Glass Frame */}
            <div className="absolute inset-0 bg-surface-container-low/40 backdrop-blur-3xl rounded-3xl border border-white/5 shadow-2xl overflow-hidden z-10 group">
              <NeuralPortrait />
              {/* Technical UI Overlays */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/20 border border-primary/40 p-3 rounded-xl backdrop-blur-md">
                    <Microscope className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-right bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-outline/20">
                    <div className="text-[8px] font-bold tracking-[0.3em] text-primary uppercase">Inference Engine</div>
                    <div className="text-[10px] font-mono text-on-surface">Latency: 12ms</div>
                  </div>
                </div>
                <div className="space-y-3 bg-background/60 backdrop-blur-md p-4 rounded-2xl border border-outline/20">
                  <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase">
                    <span className="text-on-surface">Model Convergence</span>
                    <span className="text-primary">98.2%</span>
                  </div>
                  <div className="w-full h-1.5 bg-outline/20 overflow-hidden rounded-full">
                    <div className="w-3/4 h-full amethyst-gradient"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { num: '02', label: 'Internships', sub: 'Industry Proven' },
            { num: '05', label: 'Projects', sub: 'Full-Stack AI' },
            { num: '02', label: 'Publications', sub: 'IEEE/CVPR Core' },
            { num: 'BEST FYP', label: 'Academic Excellence', sub: 'Award Winner', textClass: 'text-3xl leading-tight' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface-container-low p-6 md:p-10 rounded-2xl border border-outline/10 group hover:border-primary/50 transition-all duration-500"
            >
              <div className={`${stat.textClass || 'text-5xl'} font-headline font-black text-on-surface mb-3 group-hover:text-primary transition-colors`}>{stat.num}</div>
              <div className="text-[10px] font-bold tracking-[0.3em] text-on-surface-variant uppercase">{stat.label}</div>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
