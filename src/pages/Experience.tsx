import { motion } from 'motion/react';
import { Briefcase, Scan, CheckSquare, Network, Settings, BarChart, PieChart, GraduationCap, Award, Calculator, Medal, Users } from 'lucide-react';

export function Experience() {
  return (
    <main className="pl-0 md:pl-20 pt-24 pb-12 min-h-screen flex-1">
      <div className="max-w-7xl mx-auto px-8 py-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Experience Timeline */}
          <section className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-10">
              <Briefcase className="text-primary w-8 h-8" />
              <h2 className="font-headline text-3xl font-bold tracking-tight uppercase text-on-surface">Professional Experience</h2>
            </div>
            
            <div className="space-y-0 relative border-l border-outline-variant/30 ml-4">
              {/* AI Engineer Role */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 pl-10 relative transition-all duration-300 amethyst-glow-hover"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-surface-container border-2 border-primary-container shadow-[0_0_15px_var(--color-primary-container)]"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface">AI Engineer Intern</h3>
                    <p className="text-primary font-bold tracking-wide">Lysa Solutions</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="text-xs font-mono bg-surface-container-high px-3 py-1 rounded-full text-on-surface uppercase tracking-widest border border-outline-variant/30">Oct '25 – Jan '26</span>
                    <p className="text-xs text-on-surface-variant/70 mt-1 italic">Coimbatore, India</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border-l-2 border-primary-container p-6 mt-4 rounded-r-lg">
                  <ul className="space-y-4 font-body leading-relaxed text-sm text-on-surface-variant">
                    <li className="flex gap-3">
                      <Scan className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-on-surface">Built a production-grade AI-powered grading system combining <strong>OCR processing</strong>, LLM-based evaluation, and result visualization.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckSquare className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-on-surface">Designed a structured <strong>LLM grading pipeline</strong> with schema validation, criteria-wise scoring, mistake identification, and concept-level feedback; worked on concept mastery assessment for adaptive learning.</span>
                    </li>
                    <li className="flex gap-3">
                      <Network className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-on-surface">Implemented a <strong>centralized LLM Gateway</strong> for secure model access, configuration management, retries, token usage, and cost tracking; migrated to Google GenAI stack.</span>
                    </li>
                    <li className="flex gap-3">
                      <Settings className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-on-surface">Externalized AI prompts into <strong>YAML-based configuration</strong> for versioning; implemented asynchronous workflows using <strong>Celery and Redis</strong>.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Data Analyst Role */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 pl-10 relative transition-all duration-300 amethyst-glow-hover"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-surface-container border-2 border-outline-variant/50"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface">Data Analyst Intern</h3>
                    <p className="text-primary/80 font-bold tracking-wide">OneYes Infotech Solutions</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="text-xs font-mono bg-surface-container-high px-3 py-1 rounded-full text-on-surface uppercase tracking-widest border border-outline-variant/30">May '25 – Jun '25</span>
                    <p className="text-xs text-on-surface-variant/70 mt-1 italic">Chennai, India</p>
                  </div>
                </div>
                <div className="bg-surface-container-low p-6 mt-4 rounded-r-lg border-l-2 border-outline-variant/30">
                  <ul className="space-y-4 font-body leading-relaxed text-sm text-on-surface-variant">
                    <li className="flex gap-3">
                      <BarChart className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-on-surface">Built a <strong>Streamlit pipeline</strong> to automate K-Means, GMM, and Agglomerative clustering, saving time on data analysis.</span>
                    </li>
                    <li className="flex gap-3">
                      <PieChart className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-on-surface">Visualized performance with Silhouette and Davies-Bouldin scores in <strong>Power BI</strong>, guiding model selection through quick comparison.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Right Column: Education & Achievements */}
          <section className="lg:col-span-5 space-y-12">
            {/* Education Section */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <GraduationCap className="text-primary w-8 h-8" />
                <h2 className="font-headline text-3xl font-bold tracking-tight uppercase text-on-surface">Academic Core</h2>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-surface-container-low border border-outline-variant/20 p-8 rounded-lg relative overflow-hidden transition-all duration-300 amethyst-glow-hover"
              >
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-5xl font-black text-primary/10 select-none">B.SC</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-1 text-on-surface">Bachelor of Science, Data Science</h3>
                <p className="text-primary mb-2">Kumaraguru College of Liberal Arts and Science</p>
                <p className="text-on-surface-variant/80 text-sm mb-6">Bharathiyar University</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 border-l-2 border-primary-container rounded-r-md">
                    <span className="block text-[10px] uppercase tracking-widest text-outline mb-1">Duration</span>
                    <span className="text-on-surface font-mono">Jul 2023 — May 2026</span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 border-l-2 border-primary-container rounded-r-md">
                    <span className="block text-[10px] uppercase tracking-widest text-outline mb-1">Performance</span>
                    <span className="text-on-surface font-mono text-lg font-bold">8.2 GPA</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Achievements Section */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Award className="text-primary w-8 h-8" />
                <h2 className="font-headline text-3xl font-bold tracking-tight uppercase text-on-surface">Achievements</h2>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Calculator, title: 'Perfect Score in Inferential Statistics', sub: 'Academic Excellence' },
                  { icon: Medal, title: 'Mahatma Gandhi Merit Scholarship', sub: 'Merit-Based Honor' },
                  { icon: Users, title: 'CSR Project Chair', sub: 'Rotaract Club of KCLAS' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-6 p-5 bg-surface-container-low hover:bg-surface-container transition-all border-r-2 border-transparent hover:border-primary group rounded-l-lg"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-lg text-primary group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-on-surface">{item.title}</h4>
                        <p className="text-xs text-outline uppercase tracking-tighter">{item.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* System Metrics & Research Area */}
      <section className="bg-surface-container-lowest py-20 px-8 border-y border-outline-variant/20 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative group">
              <div className="absolute inset-0 bg-primary-container/20 blur-3xl rounded-full group-hover:bg-primary-container/30 transition-colors"></div>
              <img alt="Neural Network Visualization" className="relative rounded-lg shadow-2xl border border-outline-variant/30 opacity-70 hover:opacity-100 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD7SD68QpM0gYB12xZ6r_WMlxpqnZHZ6dEvBJshc1f6ODIekvjfAC0qe0ahLmlg_lkUAQmUPVvEe3HiNc8cOVGzrzigUyed8_RLNXP8aH52HQG3I4pc5jhyp4Mohn0j5v3XFdmIdiG5MIVl2qI_ebTnAv1VC1DQ9vHjWgVimJVV-zYZeH-RLEo8AB2Z4D73FqXLy_JHKeZySdl2aL-c4kucfio3Ju5XsdGc_Tl41Kzo2x0USympQxP-tzBoDg3FbF7L6a_3lOU6Vw"/>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="font-headline text-4xl font-bold text-on-surface">System Metrics & Research</h2>
              <p className="font-body leading-relaxed text-on-surface-variant">
                Beyond industrial application, Edric maintains a steady focus on technical documentation and architectural performance metrics. His work bridges the gap between raw data and actionable AI modeling.
              </p>
              <div className="flex gap-4">
                <div className="flex-1 p-6 bg-surface-container border-t-4 border-primary-container rounded-b-lg">
                  <span className="text-4xl font-bold font-headline text-on-surface">14+</span>
                  <span className="block text-[10px] text-primary uppercase tracking-widest mt-2 font-bold">Models Deployed</span>
                </div>
                <div className="flex-1 p-6 bg-surface-container border-t-4 border-primary-container rounded-b-lg">
                  <span className="text-4xl font-bold font-headline text-on-surface">98%</span>
                  <span className="block text-[10px] text-primary uppercase tracking-widest mt-2 font-bold">Uptime SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
