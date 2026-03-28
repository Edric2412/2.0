import { motion } from 'motion/react';
import { BrainCircuit, ArrowRight, ExternalLink, Compass, FileText, Gauge, Hash, CheckCircle, GraduationCap } from 'lucide-react';

export function Projects() {
  return (
    <main className="lg:pl-20 pt-32 pb-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto flex-1">
      {/* Hero Section Title */}
      <header className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="h-[1px] w-12 bg-primary"></span>
          <span className="font-label text-primary text-xs uppercase tracking-[0.3em]">Portfolio v2.0.4-stable</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-6"
        >
          System <span className="text-transparent bg-clip-text amethyst-gradient">Architect.</span><br/>
          Neural Explorer.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-on-surface-variant text-lg leading-relaxed font-medium"
        >
          Showcasing the intersection of multimodal intelligence and reliable system architecture. From fine-tuned LLMs to graph-based knowledge retrieval.
        </motion.p>
      </header>

      {/* Featured Projects Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
        {/* Project 1: LLMOps (Featured) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-12 lg:col-span-8 group relative overflow-hidden bg-surface-container-low p-8 rounded-lg border-l-4 border-primary hover:-translate-y-1 transition-all duration-300 amethyst-glow"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BrainCircuit className="w-32 h-32 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-2 py-1 text-[10px] font-bold bg-primary/20 text-on-surface border border-primary/40 tracking-widest uppercase">March 2026</span>
              <span className="px-2 py-1 text-[10px] font-bold bg-surface text-on-surface-variant border border-outline-variant/30 tracking-widest uppercase">Qwen3-8B</span>
            </div>
            <h3 className="font-headline text-3xl font-bold text-on-surface mb-4">LLMOps Reliability Platform for Hallucination Detection & Monitoring</h3>
            <ul className="text-on-surface-variant mb-8 space-y-2 text-sm md:text-base font-medium">
              <li className="flex gap-2"><span className="text-primary">•</span> Fine-tuned Qwen3-8B using QLoRA (4-bit quantization) on ~8K samples to develop a hallucination detection model.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Achieved 83.6% accuracy and 0.86 macro F1-score on a 2K-sample evaluation set using structured metrics.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Built an end-to-end platform integrating Groq, FastAPI, and React for real-time detection and explanation.</li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-8">
              {['QLoRA', 'Groq', 'FastAPI', 'React'].map(tag => (
                <span key={tag} className="text-xs font-mono text-primary px-2 py-1 bg-surface-container-lowest border border-primary/20 font-bold">{tag}</span>
              ))}
            </div>
            <div className="flex gap-6">
              <a className="inline-flex items-center gap-2 text-primary font-headline font-bold group-hover:gap-3 transition-all hover:text-on-surface" href="https://github.com/Edric2412/LLM-QLoRA" target="_blank" rel="noreferrer">
                GitHub <ArrowRight className="w-4 h-4" />
              </a>
              <a className="inline-flex items-center gap-2 text-primary font-headline font-bold group-hover:gap-3 transition-all hover:text-on-surface" href="https://huggingface.co/Edric2412/Qwen3-8B-Hallucination-Detector-LoRA" target="_blank" rel="noreferrer">
                HuggingFace <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Project 2: RAG Assessment */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-12 lg:col-span-4 group relative overflow-hidden bg-surface-container rounded-lg flex flex-col hover:-translate-y-1 transition-all duration-300 amethyst-glow border border-outline-variant/30"
        >
          <div className="h-40 overflow-hidden relative">
            <img alt="RAG Dashboard" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 scale-110 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdsDFE-uGa_EJ11LhCCP8YuutXZXBFxuiwPuyEoaBpdjWoR-rITqK1uUlvgzXwh61JywmQhje52ROIJSz6fVkcumKi036v8vXUrTmkrQ19rY4Wj4eLDv9RQxwih_Ori52yLxMJ1MuxafqhtYJSb2ov_RmRU-O-R2uHNRZUlY5SQdcKYtuIq4ktxTdqKFj3Fd7MTaFVt0OyskBhRJjQSDnNRHovIQNlabFM9R0_25H4VDdbOBXDpzjEVjt0jwbymdbFL7Tts4B-QoQ"/>
            <div className="absolute top-4 right-4 px-2 py-1 bg-primary text-on-primary text-[8px] font-bold uppercase tracking-widest rounded-sm">Award Winner</div>
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2 leading-tight">All-in-One RAG Assessment & Adaptive Learning Engine</h3>
            <p className="text-[10px] text-primary font-mono mb-4 uppercase font-bold">DEC 2025 - FEB 2026</p>
            <div className="text-xs text-on-surface-variant font-medium mb-6 space-y-2 flex-grow">
              <p>• Auto-generated university papers/keys via Gemini RAG (3 hrs → 1 min).</p>
              <p>• Gemini Vision grading for handwritten PDFs (15 min → 1 min per paper).</p>
              <p>• RL (PPO) & Neo4j adaptive engine (33% better topic selection).</p>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant/30">
              <span className="text-[9px] font-mono text-on-surface-variant uppercase font-bold">Gemini • Neo4j • Docker</span>
              <a href="https://github.com/Edric2412/Q-A" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-on-surface transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Project 3: CareerCompass AI */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-12 lg:col-span-5 group bg-surface-container rounded-lg p-6 flex flex-col justify-between border-t-2 border-transparent hover:border-primary/50 transition-all hover:-translate-y-1 amethyst-glow"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-sm bg-primary/20 flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant font-bold">DEC 2025</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-3">CareerCompass AI</h3>
            <p className="text-sm text-on-surface-variant mb-6 font-medium">
              Multimodal GenAI platform (Gemini 3, TTS/STT) for Kaggle & DeepMind. Features hybrid architecture with tool calling and Google Search grounding for real-time gap analysis and asset generation (CVs, portfolios).
            </p>
          </div>
          <div className="mt-auto">
            <a href="https://github.com/Edric2412/CareerCompass_AI" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-headline font-bold group-hover:gap-3 transition-all hover:text-on-surface">
              View on GitHub <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Project 4: Event Report Gen */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-12 lg:col-span-3 group bg-surface-container-low rounded-lg p-6 border border-primary/10 flex flex-col hover:-translate-y-1 transition-all duration-300 hover:border-primary/40 amethyst-glow"
        >
          <div className="flex justify-between mb-4">
            <span className="text-[10px] font-mono text-primary uppercase font-bold">Active Internal Tool</span>
            <span className="text-[10px] font-mono text-on-surface-variant font-bold">MAR - APR 2025</span>
          </div>
          <h3 className="font-headline text-xl font-bold text-on-surface mb-3">Event Report Automated Generator</h3>
          <p className="text-sm text-on-surface-variant mb-6 flex-grow font-medium">
            Developed for KCLAS. Reduced university event report creation time from 1 hour to 5 mins using FastAPI & DOCX automation.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2">
              <FileText className="w-6 h-6 text-primary/70 hover:scale-110 transition-transform cursor-help" />
              <Gauge className="w-6 h-6 text-primary hover:scale-110 transition-transform cursor-help" />
            </div>
            <a href="https://github.com/Edric2412/Automated-Report-Generator" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-on-surface transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Project 5: Sign Language Detection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-12 lg:col-span-4 group relative overflow-hidden bg-surface-container rounded-lg hover:-translate-y-1 transition-all duration-300 amethyst-glow border border-outline-variant/30"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent opacity-90 z-10"></div>
          <img alt="Sign Language Project" className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfV5Lsy_naNWUSUN0Ok9gsypqUIb6WzqiMELt1j04rLJaxAoEjmIZhYFmqEm7Yx__cJGxX4C7FSonqB0Fno1nfifG-DrGRDi0sIdfX59qC4XR3mLas15s7T396lU-7aqgngSFrOfR7IoXEBg5BPYTglEme7E8I7vO6WIHgwi24zcS3a7TKmstJDh8eoKdKnBPiiFC8jnQ5BlSf27juLRha_Ga8twjkRpCX9dd2JZ58vdo_gKY4YhMkcKT_9LO-J_g3zbzu2D7dD20"/>
          <div className="relative z-20 p-6 flex flex-col h-full justify-between min-h-[220px]">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline text-xl font-bold text-on-surface">Sign Language Detection</h3>
                <span className="text-[10px] font-mono text-on-surface-variant font-bold">JAN - FEB 2025</span>
              </div>
              <p className="text-sm text-on-surface-variant font-medium">Real-time YOLO (93%) and Mediapipe/LSTM (97%) detection via WebSocket + FastAPI.</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono text-primary font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                97% STACKED LSTM ACCURACY
              </div>
              <a href="https://github.com/Edric2412/Realtime-Sign-Language-Detection-and-Translation-using-YOLO-" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-on-surface transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Publications Section */}
      <section className="mb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-headline text-4xl font-black tracking-tight text-on-surface">Scientific <span className="text-primary italic">Output.</span></h2>
          <span className="text-on-surface-variant text-xs uppercase tracking-widest font-mono font-bold">Peer Reviewed / Indexing</span>
        </div>
        <div className="space-y-4">
          {/* Publication 1: IJIRT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-surface-container-low p-8 flex flex-col md:flex-row gap-8 items-start border-l-2 border-primary/20 hover:border-primary transition-all rounded-r-lg amethyst-glow"
          >
            <div className="w-full md:w-32 flex-shrink-0">
              <div className="text-primary font-headline text-5xl font-black opacity-20 group-hover:opacity-100 transition-opacity">01</div>
              <div className="text-[10px] text-on-surface-variant font-mono mt-2 uppercase tracking-tighter font-bold">Journal: IJIRT (UGC)</div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <a href="https://ijirt.org/article?manuscript=191950" target="_blank" rel="noreferrer" className="font-headline text-2xl font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                  All-in-One RAG Assessment Engine: Dynamic Creation, Automated Evaluation, and University-Centric Output
                  <ExternalLink className="w-5 h-5 opacity-50" />
                </a>
                <span className="px-2 py-0.5 bg-surface text-primary text-[10px] font-mono rounded font-bold">JAN 2026</span>
              </div>
              <p className="text-on-surface-variant max-w-3xl leading-relaxed mb-6 font-medium">
                Published in Volume 12, Issue 8. Investigates dynamic creation and automated evaluation workflows within university settings using advanced RAG architectures.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a className="text-xs font-label uppercase tracking-widest text-primary font-bold hover:underline flex items-center gap-2" href="https://ijirt.org/article?manuscript=191950" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" /> Read Paper
                </a>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Vol 12, Issue 8
                </span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                  <Hash className="w-4 h-4" /> Page: 8308-8314
                </span>
              </div>
            </div>
          </motion.div>

          {/* Publication 2: IEEE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-surface-container-low p-8 flex flex-col md:flex-row gap-8 items-start border-l-2 border-primary/20 hover:border-primary transition-all rounded-r-lg amethyst-glow"
          >
            <div className="w-full md:w-32 flex-shrink-0">
              <div className="text-primary font-headline text-5xl font-black opacity-20 group-hover:opacity-100 transition-opacity">02</div>
              <div className="text-[10px] text-on-surface-variant font-mono mt-2 uppercase tracking-tighter font-bold">Conference: IEEE</div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <a href="https://ieeexplore.ieee.org/document/11012174" target="_blank" rel="noreferrer" className="font-headline text-2xl font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                  Emerging Trends & Analytical Perspectives in the Development of New Smartphones
                  <ExternalLink className="w-5 h-5 opacity-50" />
                </a>
                <span className="px-2 py-0.5 bg-surface text-primary text-[10px] font-mono rounded font-bold">2025</span>
              </div>
              <p className="text-on-surface-variant max-w-3xl leading-relaxed mb-6 font-medium">
                Scopus Indexed. Presented at the 3rd International Conference on Advancements in Electrical, Electronics, Communication, Computing and Automation (ICAECA).
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a className="text-xs font-label uppercase tracking-widest text-primary font-bold hover:underline flex items-center gap-2" href="https://ieeexplore.ieee.org/document/11012174" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" /> Read Paper
                </a>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Scopus Indexed
                </span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> ICAECA 2025
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
