import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Scan, CheckSquare, Network, Settings, BarChart, PieChart, GraduationCap, Users, Flame, HeartHandshake, Code, Database, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

// MarqueeGallery component has been removed in favor of a static unified grid layout

interface ImageLightboxProps {
  images: string[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

function ImageLightbox({ images, activeIndex, isOpen, onClose, title }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(activeIndex);
    }
  }, [isOpen, activeIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
        onClick={onClose}
      >
        {/* Header/Title */}
        <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center text-on-surface" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col">
            <h4 className="font-headline text-lg md:text-xl font-bold tracking-tight">{title}</h4>
            <span className="text-xs font-mono text-on-surface-variant/80">
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-surface-container/40 border border-outline-variant/30 text-on-surface hover:text-primary transition-all duration-300 hover:scale-105 backdrop-blur-md cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main image container */}
        <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} view ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />

          {/* Large arrow buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 p-3 rounded-full bg-surface-container/60 hover:bg-primary/20 border border-outline-variant/30 text-on-surface hover:text-primary transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 p-3 rounded-full bg-surface-container/60 hover:bg-primary/20 border border-outline-variant/30 text-on-surface hover:text-primary transition-all duration-300 shadow-lg backdrop-blur-md cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Direct thumbnail selectors at bottom */}
        {images.length > 1 && (
          <div className="absolute bottom-6 flex gap-3 z-50" onClick={(e) => e.stopPropagation()}>
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all duration-300 bg-black/40 cursor-pointer ${
                  idx === currentIndex
                    ? 'border-primary scale-110 shadow-[0_0_12px_var(--color-primary)]'
                    : 'border-outline-variant/30 opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function Experience() {
  useEffect(() => {
    document.title = "Professional Experience | Edric Jeffrey Sam";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover the professional path, AI engineering internships, and academic core of Edric Jeffrey Sam.');
    }
  }, []);

  const brigadeImages = [
    '/leadership/brigade1.jpeg',
    '/leadership/brigade2.jpeg',
    '/leadership/brigade3.jpeg'
  ];

  const rotaractImages = [
    '/leadership/Rotaract1.jpeg',
    '/leadership/Rotaract2.jpeg',
    '/leadership/Rotaract3.jpeg'
  ];

  const developerImages = [
    '/leadership/Developer1.jpeg',
    '/leadership/Developer2.jpeg'
  ];

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    title: ''
  });

  const [activeTabs, setActiveTabs] = useState<Record<string, 'photos' | 'details'>>({
    brigade: 'photos',
    rotaract: 'photos',
    developer: 'photos'
  });

  const handleOpenLightbox = (images: string[], index: number, title: string) => {
    setLightboxState({
      isOpen: true,
      images,
      index,
      title
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const handleCardInteraction = (id: string, index: number, images: string[], title: string) => {
    if (window.innerWidth < 1024) {
      if (activeTabs[id] === 'photos') {
        handleOpenLightbox(images, index, title);
      }
    } else {
      handleOpenLightbox(images, index, title);
    }
  };

  return (
    <section id="experience" className="pt-24 pb-12 min-h-screen flex-1">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Hero Header */}
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-on-surface"
          >
            Architecting <span className="text-gradient">Intelligence.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-xl max-w-2xl leading-relaxed text-on-surface-variant"
          >
            Edric Jeffrey Sam — Mapping the intersection of Data Science and Generative AI through high-performance inference and automated systems.
          </motion.p>
        </header>

        {/* Bento Grid Layout - Combining Experience and Academics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. Infotact Solutions (Gen AI Intern) Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-surface-container-low border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full animate-heartbeat"
          >
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2">
                    <Network className="text-primary w-5 h-5 flex-shrink-0" />
                    Gen AI Engineer Intern
                  </h3>
                  <p className="text-primary font-bold tracking-wide">Infotact Solutions</p>
                </div>
                <div className="text-left md:text-right flex flex-col md:items-end">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold uppercase tracking-widest">
                    Mar '26 – Present
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/70 mt-1 italic">Bengaluru, India</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Leadership</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Led a team of 4 by assigning tasks, coordinating workflows, and overseeing execution.
                  </p>
                </div>

                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <Database className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Advanced RAG</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Built high-performance RAG using <strong>Pinecone</strong>, <strong>Cohere Rerank-3</strong>, and <strong>Nomic Atlas</strong> (sub-1.5s TTFT).
                  </p>
                </div>

                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <Network className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Agentic AI</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Orchestrated Agentic AI workflows using <strong>LangGraph</strong>, <strong>LangSmith</strong>, and <strong>SSE Streaming</strong>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-surface-container border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="text-5xl font-black text-primary/10 select-none font-headline">B.SC</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary w-6 h-6 flex-shrink-0" />
                <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">Academic Core</h3>
              </div>
              <div className="mb-6">
                <h4 className="font-headline font-bold text-on-surface text-base md:text-lg mb-1">Bachelor of Science, Data Science</h4>
                <p className="text-primary font-bold text-sm">Kumaraguru College of Liberal Arts and Science</p>
                <p className="text-on-surface-variant/80 text-xs mt-1">Bharathiyar University</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Duration</span>
                  <span className="text-on-surface font-mono text-xs md:text-sm font-semibold">Jul 2023 — May 2026</span>
                </div>
                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Performance</span>
                  <span className="text-on-surface font-mono text-sm md:text-base font-bold">8.13 GPA</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. OneYes Infotech Solutions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 bg-surface-container border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full"
          >
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2">
                    <BarChart className="text-primary w-5 h-5 flex-shrink-0" />
                    Data Analyst Intern
                  </h3>
                  <p className="text-primary font-bold tracking-wide">OneYes Infotech Solutions</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs font-mono text-on-surface-variant/80 font-bold uppercase tracking-widest block">
                    May '25 – Jun '25
                  </span>
                  <p className="text-xs text-on-surface-variant/70 mt-1 italic">Chennai, India</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <BarChart className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Clustering</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Built a <strong>Streamlit pipeline</strong> to automate K-Means, GMM, and Agglomerative clustering algorithms.
                  </p>
                </div>

                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <PieChart className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Dashboarding</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Visualized evaluation scores in <strong>Power BI</strong> to guide modeling selection and business insights.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Lysa Solutions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-7 bg-surface-container border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full"
          >
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2">
                    <Scan className="text-primary w-5 h-5 flex-shrink-0" />
                    AI Engineer Intern
                  </h3>
                  <p className="text-primary font-bold tracking-wide">Lysa Solutions</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs font-mono text-on-surface-variant/80 font-bold uppercase tracking-widest block">
                    Oct '25 – Jan '26
                  </span>
                  <p className="text-xs text-on-surface-variant/70 mt-1 italic">Coimbatore, India</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <Scan className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">AI Grading</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Deployed grading systems combining <strong>OCR document processing</strong> and LLM evaluation criteria.
                  </p>
                </div>

                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">LLM Pipelines</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Designed pipelines with schema validation, scoring metrics, and concept-level evaluation.
                  </p>
                </div>

                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <Network className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">LLM Gateways</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Implemented gateways for model configuration, fallback routing, and token/cost analysis.
                  </p>
                </div>

                <div className="bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 rounded-lg p-4 transition-all duration-300 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                      <Settings className="w-4 h-4" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">MLOps & Config</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Externalized prompts into YAML configs and orchestrated tasks with <strong>Celery and Redis</strong>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Leadership & Community Impact */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <section className="mt-8 lg:mt-12">
          <div className="flex items-center gap-4 mb-10">
            <Users className="text-primary w-8 h-8" />
            <h2 className="font-headline text-3xl font-bold tracking-tight uppercase text-on-surface">Leadership & Community Impact</h2>
          </div>

          <div className="pb-8">
            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Brigade Lead Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="transition-all duration-300 group/card h-full flex w-full"
              >
                <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full">
                  <div className="flex flex-col gap-4 flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">Brigade Lead</h3>
                          <p className="text-xs text-on-surface-variant/70 italic">IGNITE 2025 – KCLAS</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface uppercase tracking-wider border border-outline-variant/30">July 2025</span>
                        </div>
                      </div>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed font-medium">
                        Selected as one of 16 Brigade Leads for IGNITE 2025, a two-week student induction programme at KCLAS. Mentored and guided a cross-departmental cohort of first-year students through structured activities in leadership, teamwork, value-based learning, and personal development.
                      </p>
                    </div>

                    {/* Mobile Tab Switcher */}
                    <div className="flex lg:hidden bg-surface-container-high border border-outline-variant/30 p-0.5 rounded-lg w-fit mb-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTabs(prev => ({ ...prev, brigade: 'photos' })); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 cursor-pointer ${
                          activeTabs.brigade === 'photos' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        Photos
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTabs(prev => ({ ...prev, brigade: 'details' })); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 cursor-pointer ${
                          activeTabs.brigade === 'details' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Photo Grid Container */}
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group/grid w-full max-w-[280px] mx-auto">
                    {/* Images Bento Grid */}
                    <div className={`w-full transition-all duration-500 flex flex-col gap-1.5 ${
                      activeTabs.brigade === 'details' 
                        ? 'brightness-[0.75] opacity-[0.85] dark:brightness-[0.3] dark:opacity-[0.9] scale-[0.98]' 
                        : 'lg:group-hover/card:brightness-[0.75] lg:group-hover/card:opacity-[0.85] dark:lg:group-hover/card:brightness-[0.3] dark:lg:group-hover/card:opacity-[0.9] lg:group-hover/card:scale-[1.01]'
                    }`}>
                      {/* Row 1: Portrait + Square */}
                      <div className="grid grid-cols-[0.707fr_1fr] gap-1.5 w-full">
                        {/* Photo 1 (Portrait - aspect 1131/1599) */}
                        <div 
                          className="w-full aspect-[1131/1599] overflow-hidden rounded-lg cursor-pointer"
                          onClick={() => handleCardInteraction('brigade', 0, brigadeImages, "Brigade Lead — IGNITE 2025")}
                        >
                          <img
                            src={brigadeImages[0]}
                            alt="Brigade Lead photo 1"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                          />
                        </div>
                        {/* Photo 3 (Square - aspect 1:1) */}
                        <div 
                          className="w-full aspect-square overflow-hidden rounded-lg cursor-pointer"
                          onClick={() => handleCardInteraction('brigade', 2, brigadeImages, "Brigade Lead — IGNITE 2025")}
                        >
                          <img
                            src={brigadeImages[2]}
                            alt="Brigade Lead photo 3"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                          />
                        </div>
                      </div>
                      {/* Row 2: Landscape (aspect 3761/3008, i.e. 1.25) */}
                      <div 
                        className="w-full aspect-[3761/3008] overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleCardInteraction('brigade', 1, brigadeImages, "Brigade Lead — IGNITE 2025")}
                      >
                        <img
                          src={brigadeImages[1]}
                          alt="Brigade Lead photo 2"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                        />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div 
                      className={`absolute inset-0 bg-purple-50 dark:bg-purple-950 flex flex-col justify-between p-4 transition-all duration-300 border border-purple-300/50 dark:border-purple-900/50 rounded-lg cursor-pointer ${
                        activeTabs.brigade === 'details' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:group-hover/card:opacity-100 lg:group-hover/card:pointer-events-auto'
                      }`}
                      onClick={() => handleOpenLightbox(brigadeImages, 0, "Brigade Lead — IGNITE 2025")}
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-primary dark:text-primary-container font-bold">Key Responsibilities & Impact</span>
                        <ul className="space-y-1.5 font-body text-[11px] text-on-surface dark:text-white leading-relaxed">
                          <li className="flex gap-1.5 items-start">
                            <Flame className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Managed a brigade group through 14 days of collaborative exercises.</span>
                          </li>
                          <li className="flex gap-1.5 items-start">
                            <Flame className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Facilitated group dynamics, resolved conflicts, and delivered structured sessions.</span>
                          </li>
                          <li className="flex gap-1.5 items-start">
                            <Flame className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Recognised for communication, mentorship, and fresher engagement.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-on-surface dark:text-white border-t border-outline-variant/20 pt-1.5">
                        <Scan className="w-3 h-3 text-primary animate-pulse" />
                        <span>Click photo to open gallery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CSR Project Chair Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="transition-all duration-300 group/card h-full flex w-full"
              >
                <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full">
                  <div className="flex flex-col gap-4 flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">CSR Project Chair</h3>
                          <p className="text-xs text-on-surface-variant/70 italic">Rotaract Club – KCLAS</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface uppercase tracking-wider border border-outline-variant/30">2024 – 2025</span>
                        </div>
                      </div>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed font-medium">
                        Appointed as CSR Project Chair for the Rotaract Club of Kumaraguru College of Liberal Arts and Science, under Rotaract District 3201, for the 2024–2025 academic year.
                      </p>
                    </div>

                    {/* Mobile Tab Switcher */}
                    <div className="flex lg:hidden bg-surface-container-high border border-outline-variant/30 p-0.5 rounded-lg w-fit mb-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTabs(prev => ({ ...prev, rotaract: 'photos' })); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 cursor-pointer ${
                          activeTabs.rotaract === 'photos' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        Photos
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTabs(prev => ({ ...prev, rotaract: 'details' })); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 cursor-pointer ${
                          activeTabs.rotaract === 'details' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Photo Grid Container */}
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group/grid w-full max-w-[280px] mx-auto">
                    {/* Images Bento Grid */}
                    <div className={`w-full transition-all duration-500 flex flex-col gap-1.5 ${
                      activeTabs.rotaract === 'details' 
                        ? 'brightness-[0.75] opacity-[0.85] dark:brightness-[0.3] dark:opacity-[0.9] scale-[0.98]' 
                        : 'lg:group-hover/card:brightness-[0.75] lg:group-hover/card:opacity-[0.85] dark:lg:group-hover/card:brightness-[0.3] dark:lg:group-hover/card:opacity-[0.9] lg:group-hover/card:scale-[1.01]'
                    }`}>
                      {/* Row 1: Landscape */}
                      <div 
                        className="w-full aspect-[3744/2496] overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleCardInteraction('rotaract', 1, rotaractImages, "CSR Project Chair")}
                      >
                        <img
                          src={rotaractImages[1]}
                          alt="CSR Project Chair photo 1"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                        />
                      </div>
                      {/* Row 2: Portrait + Square (Rotaract3 cropped to 1:1) */}
                      <div className="grid grid-cols-[0.714fr_1fr] gap-1.5 w-full">
                        {/* Photo 2 (Portrait - aspect 2729/3822) */}
                        <div 
                          className="w-full aspect-[2729/3822] overflow-hidden rounded-lg cursor-pointer"
                          onClick={() => handleCardInteraction('rotaract', 0, rotaractImages, "CSR Project Chair")}
                        >
                          <img
                            src={rotaractImages[0]}
                            alt="CSR Project Chair photo 2"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                          />
                        </div>
                        {/* Photo 3 (Square - aspect 1:1) */}
                        <div 
                          className="w-full aspect-square overflow-hidden rounded-lg cursor-pointer"
                          onClick={() => handleCardInteraction('rotaract', 2, rotaractImages, "CSR Project Chair")}
                        >
                          <img
                            src={rotaractImages[2]}
                            alt="CSR Project Chair photo 3"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div 
                      className={`absolute inset-0 bg-purple-50 dark:bg-purple-950 flex flex-col justify-between p-4 transition-all duration-300 border border-purple-300/50 dark:border-purple-900/50 rounded-lg cursor-pointer ${
                        activeTabs.rotaract === 'details' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:group-hover/card:opacity-100 lg:group-hover/card:pointer-events-auto'
                      }`}
                      onClick={() => handleOpenLightbox(rotaractImages, 0, "CSR Project Chair")}
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-primary dark:text-primary-container font-bold">Key Responsibilities & Impact</span>
                        <ul className="space-y-1.5 font-body text-[11px] text-on-surface dark:text-white leading-relaxed">
                          <li className="flex gap-1.5 items-start">
                            <HeartHandshake className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Collabed with UYIR Club to volunteer to Road Safety and Patrolling.</span>
                          </li>
                          <li className="flex gap-1.5 items-start">
                            <HeartHandshake className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Coordinated cross-departmental participation and outreach events.</span>
                          </li>
                          <li className="flex gap-1.5 items-start">
                            <HeartHandshake className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Reported to Faculty Advisor and tracked CSR deliverables.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-on-surface dark:text-white border-t border-outline-variant/20 pt-1.5">
                        <Scan className="w-3 h-3 text-primary animate-pulse" />
                        <span>Click photo to open gallery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Lead Project Developer Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="transition-all duration-300 group/card h-full flex w-full"
              >
                <div className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 md:p-8 flex flex-col justify-between gap-6 shadow-lg amethyst-glow-hover w-full">
                  <div className="flex flex-col gap-4 flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface">Lead Project Developer</h3>
                          <p className="text-xs text-on-surface-variant/70 italic">Project Developer – KCLAS</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface uppercase tracking-wider border border-outline-variant/30">2024 – 2026</span>
                        </div>
                      </div>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed font-medium">
                        Designed and deployed three production-ready AI systems in an academic setting: Seating Visualizers, Attendance Trackers, and Event Report Generators.
                      </p>
                    </div>

                    {/* Mobile Tab Switcher */}
                    <div className="flex lg:hidden bg-surface-container-high border border-outline-variant/30 p-0.5 rounded-lg w-fit mb-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTabs(prev => ({ ...prev, developer: 'photos' })); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 cursor-pointer ${
                          activeTabs.developer === 'photos' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        Photos
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveTabs(prev => ({ ...prev, developer: 'details' })); }}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 cursor-pointer ${
                          activeTabs.developer === 'details' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
                        }`}
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Photo Grid Container */}
                  <div className="relative overflow-hidden rounded-lg transition-all duration-300 group/grid w-full max-w-[280px] mx-auto">
                    {/* Images Bento Grid */}
                    <div className={`w-full transition-all duration-500 flex flex-col gap-1.5 ${
                      activeTabs.developer === 'details' 
                        ? 'brightness-[0.75] opacity-[0.85] dark:brightness-[0.3] dark:opacity-[0.9] scale-[0.98]' 
                        : 'lg:group-hover/card:brightness-[0.75] lg:group-hover/card:opacity-[0.85] dark:lg:group-hover/card:brightness-[0.3] dark:lg:group-hover/card:opacity-[0.9] lg:group-hover/card:scale-[1.01]'
                    }`}>
                      {/* Photo 1 (Portrait cropped to 4:3) */}
                      <div 
                        className="w-full aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleCardInteraction('developer', 0, developerImages, "Lead Project Developer")}
                      >
                        <img
                          src={developerImages[0]}
                          alt="Lead Project Developer photo 1"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                        />
                      </div>
                      {/* Photo 2 (Landscape - aspect 1280/960) */}
                      <div 
                        className="w-full aspect-[1280/960] overflow-hidden rounded-lg cursor-pointer"
                        onClick={() => handleCardInteraction('developer', 1, developerImages, "Lead Project Developer")}
                      >
                        <img
                          src={developerImages[1]}
                          alt="Lead Project Developer photo 2"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
                        />
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div 
                      className={`absolute inset-0 bg-purple-50 dark:bg-purple-950 flex flex-col justify-between p-4 transition-all duration-300 border border-purple-300/50 dark:border-purple-900/50 rounded-lg cursor-pointer ${
                        activeTabs.developer === 'details' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:group-hover/card:opacity-100 lg:group-hover/card:pointer-events-auto'
                      }`}
                      onClick={() => handleOpenLightbox(developerImages, 0, "Lead Project Developer")}
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-primary dark:text-primary-container font-bold">Key Project Deliverables</span>
                        <ul className="space-y-1.5 font-body text-[11px] text-on-surface dark:text-white leading-relaxed">
                          <li className="flex gap-1.5 items-start">
                            <Code className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Built an Automated Event Report Generator using Python + AI writing, reducing faculty reporting time by 90%.</span>
                          </li>
                          <li className="flex gap-1.5 items-start">
                            <Code className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Deployed a Confluence Seating Visualiser used institution-wide to manage 300+ students.</span>
                          </li>
                          <li className="flex gap-1.5 items-start">
                            <Code className="text-primary w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">Guided a team as Project Lead to create a Exam Seating and Attendance Platform.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-mono text-on-surface dark:text-white border-t border-outline-variant/20 pt-1.5">
                        <Scan className="w-3 h-3 text-primary animate-pulse" />
                        <span>Click photo to open gallery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <ImageLightbox
        images={lightboxState.images}
        activeIndex={lightboxState.index}
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        title={lightboxState.title}
      />
    </section>
  );
}
