import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Square, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Command handlers
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const primary = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to command history (for up/down arrows)
    setCommandHistory(prev => [trimmed, ...prev.filter(c => c !== trimmed)].slice(0, 50));
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (primary) {
      case 'help':
        output = (
          <div className="space-y-2 text-xs md:text-sm font-mono mt-1">
            <p className="text-primary font-bold">Neural Shell v2.0.4 - Available Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 mt-2 max-w-xl">
              <div>
                <span className="text-secondary font-bold inline-block w-24">about</span>
                <span className="text-on-surface-variant/80">- Read my professional background</span>
              </div>
              <div>
                <span className="text-secondary font-bold inline-block w-24">skills</span>
                <span className="text-on-surface-variant/80">- List tools, languages & frameworks</span>
              </div>
              <div>
                <span className="text-secondary font-bold inline-block w-24">projects</span>
                <span className="text-on-surface-variant/80">- Details of my featured builds</span>
              </div>
              <div>
                <span className="text-secondary font-bold inline-block w-24">privacy</span>
                <span className="text-on-surface-variant/80">- View the client-side privacy notice</span>
              </div>
              <div>
                <span className="text-secondary font-bold inline-block w-24">clear</span>
                <span className="text-on-surface-variant/80">- Clear the screen buffer</span>
              </div>
              <div>
                <span className="text-secondary font-bold inline-block w-24">exit / close</span>
                <span className="text-on-surface-variant/80">- Close this terminal overlay</span>
              </div>
            </div>
            <p className="text-[10px] text-on-surface-variant/50 mt-2 italic">Tip: You can use the Up/Down arrow keys to cycle through previous commands.</p>
          </div>
        );
        break;
      case 'about':
        output = (
          <div className="space-y-3 text-xs md:text-sm font-mono leading-relaxed mt-1">
            <h3 className="text-primary font-bold text-base">Edric Jeffrey Sam | AI/ML Engineer</h3>
            <p className="text-on-surface">
              Currently pursuing a <span className="text-secondary font-bold">B.Sc. in Data Science</span> at Kumaraguru College of Liberal Arts and Science, Bharathiyar University (GPA: 8.13 / Duration: 2023 - 2026).
            </p>
            <p className="text-on-surface-variant">
              My engineering focus centers on developing reliable, production-grade intelligence systems: fine-tuning large language models, mitigating hallucinations, integrating knowledge graphs, and creating low-latency computer vision pipelines.
            </p>
            <div className="border-l-2 border-primary/40 pl-4 space-y-2 mt-2">
              <p className="font-bold text-secondary">Recent Internships:</p>
              <div>
                <p className="text-on-surface font-semibold">1. Infotact Solutions — Gen AI Engineer Intern (Mar '26 - Present)</p>
                <p className="text-on-surface-variant/80 text-[11px]">Led team of 4, built advanced RAG systems (Pinecone, Cohere Rerank-3, Nomic Atlas) and Agentic AI workflows (LangGraph, SSE Streaming).</p>
              </div>
              <div>
                <p className="text-on-surface font-semibold">2. Lysa Solutions — AI Engineer Intern (Oct '25 - Jan '26)</p>
                <p className="text-on-surface-variant/80 text-[11px]">Built OCR/LLM grading pipelines, centralized LLM Gateway, Celery/Redis workflows, and YAML prompt routing.</p>
              </div>
              <div>
                <p className="text-on-surface font-semibold">3. OneYes Infotech Solutions — Data Analyst Intern (May '25 - Jun '25)</p>
                <p className="text-on-surface-variant/80 text-[11px]">Engineered Streamlit pipelines for clustering models (K-Means, GMM) with Power BI evaluations.</p>
              </div>
            </div>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="space-y-4 text-xs md:text-sm font-mono mt-1">
            <h3 className="text-primary font-bold text-base">Technical Competencies</h3>
            
            <div className="space-y-2">
              <p className="text-secondary font-bold">Languages:</p>
              <p className="text-on-surface">Python, JavaScript, R, SQL, C/C++</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-secondary font-bold">AI & Machine Learning:</p>
              <p className="text-on-surface">NLP, RAG, Agentic AI, Fine-Tuning (LoRA/QLoRA), Reinforcement Learning (PPO), YOLO, Computer Vision, OpenCV, Model Evaluation</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-secondary font-bold">ML Frameworks & Libraries:</p>
              <p className="text-on-surface">LangChain, LangGraph, Google Gen AI SDK, PyTorch, TensorFlow, scikit-learn, Hugging Face, Transformers, Nomic Atlas, DeepEval</p>
            </div>

            <div className="space-y-2">
              <p className="text-secondary font-bold">Data & Backend Systems:</p>
              <p className="text-on-surface">Neo4j (Graph), Postgres, MySQL, MongoDB, FAISS, Pinecone, ChromaDB (Vector), FastAPI, Django, SSE Streaming, Node.js, WebSockets</p>
            </div>

            <div className="space-y-2">
              <p className="text-secondary font-bold">MLOps & OS:</p>
              <p className="text-on-surface">Docker (Containerization), Celery, Redis, Linux (Fedora)</p>
            </div>
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="space-y-4 text-xs md:text-sm font-mono mt-1">
            <h3 className="text-primary font-bold text-base">Featured Deployments</h3>

            <div className="border border-primary/20 p-3 rounded bg-surface-container-low/40">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="text-secondary font-bold">1. LLMOps Hallucination Detector</span>
                <a href="https://github.com/Edric2412/LLM-QLoRA" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-[11px] font-bold">
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-on-surface-variant mt-1 text-[11px] md:text-xs">
                QLoRA fine-tuned Qwen3-8B hallucination explanation engine. Developed with Groq API, FastAPI, and React.
              </p>
            </div>

            <div className="border border-primary/20 p-3 rounded bg-surface-container-low/40">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="text-secondary font-bold">2. Adaptive RAG Assessment Engine</span>
                <a href="https://github.com/Edric2412/Q-A" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-[11px] font-bold">
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-on-surface-variant mt-1 text-[11px] md:text-xs">
                Gemini-powered automated paper generation & vision grading system with RL (PPO) and Neo4j graph-guided paths.
              </p>
            </div>

            <div className="border border-primary/20 p-3 rounded bg-surface-container-low/40">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <span className="text-secondary font-bold">3. CareerCompass AI</span>
                <a href="https://github.com/Edric2412/CareerCompass_AI" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-[11px] font-bold">
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-on-surface-variant mt-1 text-[11px] md:text-xs">
                Multimodal AI career guidance tool implementing Google Search grounding, tool calling, and structured asset generation.
              </p>
            </div>

            <p className="text-[10px] text-on-surface-variant/60">Run 'help' to review other tools, or browse the scrollable sections of the page.</p>
          </div>
        );
        break;
      case 'privacy':
        output = (
          <div className="space-y-2 text-xs md:text-sm font-mono mt-1 leading-relaxed">
            <h3 className="text-primary font-bold text-base">Privacy Policy</h3>
            <p className="text-on-surface">
              Your privacy is respected. This portfolio application does not track, collect, or store any personal metadata.
            </p>
            <p className="text-on-surface-variant">
              All terminal commands are processed exclusively inside your local browser runtime. External links redirect to official GitHub, Hugging Face, or publisher landing pages.
            </p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
      case 'close':
        setIsOpen(false);
        setInput('');
        return;
      default:
        output = (
          <div className="text-xs md:text-sm font-mono text-amber-600 dark:text-amber-400 mt-1">
            Command not recognized: '{primary}'. Type <span className="font-bold text-primary underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to view available operations.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: trimmed, output }]);
    setInput('');
  };

  // Keyboard navigation & key handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Handle outside events (footer clicks)
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ command?: string }>;
      setIsOpen(true);
      
      const defaultCommand = customEvent.detail?.command;
      if (defaultCommand) {
        // Wait minor delay for render, then fire
        setTimeout(() => {
          executeCommand(defaultCommand);
        }, 150);
      }
    };

    window.addEventListener('open-terminal', handleOpenEvent);
    return () => {
      window.removeEventListener('open-terminal', handleOpenEvent);
    };
  }, [commandHistory]);

  // Focus input when modal opens or layout clicks
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      // Disable background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Avoid focusing when clicking text links
    if ((e.target as HTMLElement).tagName !== 'A') {
      inputRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-md bg-black/60 font-mono"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
        >
          {/* Main Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            ref={modalRef}
            onClick={handleContainerClick}
            className="w-full max-w-4xl h-[80vh] min-h-[400px] bg-surface-container-lowest border border-primary/30 rounded-lg overflow-hidden flex flex-col shadow-2xl dark:shadow-[0_0_50px_rgba(123,44,191,0.25)] relative"
            id="neural-terminal-interface"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-surface-container-low px-4 py-2 border-b border-primary/20 select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Edric Jeffrey Sam | Neural Shell v2.0.4</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center hover:bg-yellow-500/40 transition-colors">
                  <Minimize2 className="w-2 h-2 text-yellow-500/70" />
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center hover:bg-green-500/40 transition-colors">
                  <Square className="w-1.5 h-1.5 text-green-500/70" />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center hover:bg-red-500/80 hover:text-white transition-colors cursor-pointer group"
                  aria-label="Close Terminal"
                >
                  <X className="w-3 h-3 text-red-500/80 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Terminal Body / Output */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 text-on-surface selection:bg-primary/40 selection:text-white scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30"
            >
              {/* ASCII Welcome Banner */}
              <div className="text-primary text-[8px] sm:text-xs leading-none whitespace-pre overflow-x-auto select-none opacity-90">
                {`  _   _                      _   ____  _          _ _ 
 | \\ | | ___ _   _ _ __ __ _| | / ___|| |__   ___| | |
 |  \\| |/ _ \\ | | | '__/ _\` | | \\___ \\| '_ \\ / _ \\ | |
 | |\\  |  __/ |_| | | | (_| | |  ___) | | | |  __/ | |
 |_| \\_|\\___|\\__,_|_|  \\__,_|_| |____/|_| |_|\\___|_|_|`}
              </div>

              <div className="text-xs md:text-sm text-on-surface-variant/80 border-b border-primary/10 pb-4 select-none space-y-1">
                <p>System Initialized. Active Node: <span className="text-secondary font-bold">guest@neural-shell</span></p>
                <p>Host Context: <span className="text-on-surface">Vercel Production v2.0.4-stable</span></p>
                <p className="text-[11px] text-on-surface-variant/60">Type <span className="text-primary font-bold underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to print available commands, or <span className="text-primary font-bold underline cursor-pointer" onClick={() => executeCommand('about')}>about</span> to view personal details.</p>
              </div>

              {/* History */}
              <div className="space-y-4">
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-semibold select-none">
                      <span className="text-emerald-600 dark:text-emerald-400">edric@neural-shell:~$</span>
                      <span className="text-on-surface">{item.command}</span>
                    </div>
                    <div className="pl-4 border-l border-primary/10 py-0.5">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Line */}
            <div className="bg-surface-container-low/40 dark:bg-surface-container-low/60 border-t border-primary/20 px-6 py-4 flex items-center gap-2 select-none">
              <span className="text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-semibold flex-shrink-0">edric@neural-shell:~$</span>
              <div className="flex-1 relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-on-surface border-none outline-none focus:ring-0 p-0 text-xs md:text-sm font-mono caret-transparent relative z-10"
                  aria-label="Terminal command prompt"
                />
                {/* Blinking cursor */}
                <div 
                  className="absolute pointer-events-none text-xs md:text-sm font-mono text-on-surface bg-transparent"
                  style={{
                    left: `${input.length}ch`,
                    display: 'inline-block',
                    marginLeft: '2px'
                  }}
                >
                  <span className="animate-[pulse_1s_infinite] bg-primary text-primary opacity-90 inline-block w-[7px] h-[14px] align-middle -mt-[2px]"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
