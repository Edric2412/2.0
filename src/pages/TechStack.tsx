import { motion } from 'motion/react';
import { Brain, Bot, Terminal, GitBranch, Layers, Blocks, Database, Network, Cloud } from 'lucide-react';

export function TechStack() {
  return (
    <main className="pt-32 pb-20 px-4 md:px-12 lg:px-24 grid-bg min-h-screen flex-1">
      {/* Hero Header */}
      <header className="mb-20 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Core Competencies v3.2.0
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6"
        >
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Ecosystem</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-lg max-w-2xl leading-relaxed text-on-surface-variant"
        >
          Specialized in architecting high-performance inference systems, RAG pipelines, and distributed ML infrastructure. Bridging the gap between raw compute and cognitive intelligence within the Amethyst framework.
        </motion.p>
      </header>

      {/* Bento Grid Skills Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Machine Learning & AI */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-8 bg-surface-container-low border border-outline-variant/30 p-8 relative overflow-hidden group amethyst-glow"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 text-primary group-hover:opacity-10 transition-opacity">
            <Brain className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Bot className="text-primary w-8 h-8" />
              <h2 className="font-headline text-2xl font-bold text-on-surface">Machine Learning & AI</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest mb-3 text-primary-container">Intelligence & NLP</h3>
                  <div className="flex flex-wrap gap-2">
                    {['NLP', 'BERT', 'RAG', 'Generative AI', 'LoRA/QLoRA', 'Reinforcement Learning (PPO)'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-surface-container text-on-surface text-[11px] font-medium border border-outline-variant/30">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest mb-3 text-on-surface">Vision & Perception</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Computer Vision', 'Image Processing', 'OpenCV', 'YOLO'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-surface-container text-on-surface text-[11px] font-medium border border-outline-variant/30">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest mb-3 text-on-surface">Evaluation & Cognition</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Model Evaluation', 'Hallucination Detection', 'Bayesian Knowledge Tracing'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-surface-container text-on-surface text-[11px] font-medium border border-outline-variant/30">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Programming Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-4 bg-surface-container border border-outline-variant/30 p-8 flex flex-col amethyst-glow"
        >
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="text-primary w-8 h-8" />
            <h2 className="font-headline text-2xl font-bold text-on-surface">Languages</h2>
          </div>
          <ul className="space-y-6 flex-grow">
            {[
              { name: 'Python', width: '95%' },
              { name: 'JavaScript', width: '80%' },
              { name: 'R', width: '65%' }
            ].map(lang => (
              <li key={lang.name} className="flex items-center justify-between">
                <span className="font-headline font-medium text-on-surface">{lang.name}</span>
                <div className="w-32 h-1 bg-surface-container-high relative">
                  <div className={`absolute inset-0 bg-primary shadow-[0_0_10px_rgba(199,125,255,0.4)]`} style={{ width: lang.width }}></div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Version Control</span>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <GitBranch className="w-4 h-4" />
                Git
              </div>
            </div>
          </div>
        </motion.div>

        {/* ML Frameworks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-12 bg-surface-container border border-outline-variant/30 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers className="text-primary w-6 h-6" />
            <h2 className="font-headline text-xl font-bold uppercase tracking-tight text-on-surface">ML Frameworks & Libraries</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Langchain', 'Google Gen AI SDK', 'scikit-learn', 'Tensorflow', 'Pytorch', 'Hugging Face', 'Gymnasium', 'Stable-Baselines3', 'Transformers'].map(fw => (
              <div key={fw} className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-sm border border-outline-variant/30 hover:border-primary/50 transition-colors">
                <span className="text-xs font-semibold text-on-surface">{fw}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Backend & API */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-4 bg-surface-container border border-outline-variant/30 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Blocks className="text-primary w-6 h-6" />
            <h2 className="font-headline text-xl font-bold text-on-surface">Backend & API</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['FastAPI', 'Django', 'Node.js', 'Express.js', 'Rest APIs', 'WebSockets', 'ngrok'].map(tech => (
              <span key={tech} className="text-xs font-bold bg-surface-container-highest px-2 py-1 text-on-surface border border-primary/10">{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* Databases */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-4 bg-surface-container border border-outline-variant/30 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-primary w-6 h-6" />
            <h2 className="font-headline text-xl font-bold text-on-surface">Data Systems</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface font-medium">MongoDB / MySQL / Postgres</span>
              <span className="text-[10px] font-mono text-primary font-bold">RELATIONAL/DOC</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface font-medium">Neo4j</span>
              <span className="text-[10px] font-mono text-primary font-bold">GRAPH</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-on-surface font-medium">FAISS</span>
              <span className="text-[10px] font-mono text-primary font-bold">VECTOR</span>
            </div>
          </div>
        </motion.div>

        {/* MLOps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="md:col-span-4 bg-surface-container-low border border-outline-variant/30 p-8 bg-gradient-to-br from-surface-container-low to-background amethyst-glow"
        >
          <div className="flex items-center gap-3 mb-6">
            <Network className="text-primary w-6 h-6" />
            <h2 className="font-headline text-xl font-bold text-on-surface">MLOps</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Compute', val: 'Docker' },
              { label: 'Pipeline', val: 'Celery' },
              { label: 'Cache', val: 'Redis' },
              { label: 'Orchestrator', val: 'Async Proc' }
            ].map(item => (
              <div key={item.label} className="p-2 bg-surface-container-lowest border border-outline-variant/20 text-center">
                <span className="text-[9px] block uppercase tracking-tighter mb-1 text-on-surface-variant font-bold">{item.label}</span>
                <span className="text-[11px] font-bold text-on-surface">{item.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5">LLM Inference Pipelines</span>
            <span className="text-[10px] font-bold bg-primary-container/20 text-primary border border-primary-container/30 px-2 py-0.5">Model Monitoring</span>
          </div>
        </motion.div>

        {/* Cloud & Deployment */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:col-span-12 bg-surface-container-highest border border-outline-variant/30 p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cloud className="text-on-surface w-6 h-6" />
              <h2 className="font-headline text-lg font-bold text-on-surface">Cloud & Deployment</h2>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-primary-container font-black tracking-widest mb-1">PaaS</span>
                <span className="font-bold text-sm text-on-surface">Render / Fly.io / Vercel</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-primary-container font-black tracking-widest mb-1">Enterprise</span>
                <span className="font-bold text-sm text-on-surface">Microsoft Azure</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Architecture Terminal Block */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-primary-container/30 to-transparent"></div>
          <h3 className="font-headline text-sm font-black uppercase tracking-[0.4em] text-on-surface">Architecture Specification</h3>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-primary-container/30 to-transparent"></div>
        </div>
        <div className="bg-surface-container-lowest border-l-2 border-primary p-6 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl amethyst-glow">
          <div className="flex gap-4 mb-2">
            <span className="text-primary/60 font-bold">01</span>
            <span className="text-on-surface font-semibold"><span className="text-primary-container">class</span> NeuralSystem:</span>
          </div>
          <div className="flex gap-4 mb-2">
            <span className="text-primary/60 font-bold">02</span>
            <span className="text-on-surface font-semibold">&nbsp;&nbsp;<span className="text-primary-container">def</span> __init__(self, load_balancer, model_registry):</span>
          </div>
          <div className="flex gap-4 mb-2">
            <span className="text-primary/60 font-bold">03</span>
            <span className="text-on-surface font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;self.compute = <span className="text-secondary">"Docker_Azure_Cluster"</span></span>
          </div>
          <div className="flex gap-4 mb-2">
            <span className="text-primary/60 font-bold">04</span>
            <span className="text-on-surface font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;self.retrieval = <span className="text-secondary">"FAISS_Vector_Store"</span></span>
          </div>
          <div className="flex gap-4 mb-2">
            <span className="text-primary/60 font-bold">05</span>
            <span className="text-on-surface font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;self.latency = <span className="text-primary font-bold">&lt; 150ms</span></span>
          </div>
          <div className="flex gap-4">
            <span className="text-primary/60 font-bold">06</span>
            <span className="text-primary animate-pulse font-bold">_</span>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
