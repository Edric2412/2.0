import { motion } from 'motion/react';
import { Briefcase, Scan, CheckSquare, Network, Settings, BarChart, PieChart, GraduationCap, Award, Calculator, Medal, Users, Flame, HeartHandshake, Code, ExternalLink } from 'lucide-react';

export function Experience() {
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
                  { 
                    icon: Award, 
                    title: 'Best Student Innovation — Achievers Awards 2026', 
                    sub: 'Innovation Excellence',
                    link: 'https://www.linkedin.com/posts/edric-jeffrey-sam-52502927b_still-taking-this-in-im-truly-honored-ugcPost-7443722607738327040-32V0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U'
                  },
                  { 
                    icon: Medal, 
                    title: 'Outstanding Project Performance — Project Expo \'26', 
                    sub: '1st Prize for Best Final Year Project',
                    link: 'https://www.linkedin.com/posts/edric-jeffrey-sam-52502927b_really-happy-to-share-that-i-won-first-prize-ugcPost-7432475284685221888-Sxi4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U'
                  },
                  { 
                    icon: Calculator, 
                    title: 'Perfect Score in Inferential Statistics', 
                    sub: 'Academic Excellence' 
                  },
                  { 
                    icon: Medal, 
                    title: 'Mahatma Gandhi Merit Scholarship', 
                    sub: 'Merit-Based Honor',
                    link: 'https://www.linkedin.com/posts/edric-jeffrey-sam-52502927b_academics-scholarship-professionaldevelopment-activity-7309235200754950144-c5S6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U'
                  }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a 
                      key={i}
                      href={item.link || '#'}
                      target={item.link ? "_blank" : undefined}
                      rel={item.link ? "noreferrer" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`flex items-center gap-6 p-5 bg-surface-container-low transition-all border-r-2 group rounded-l-lg ${
                        item.link 
                          ? 'border-transparent hover:border-primary hover:bg-surface-container cursor-pointer' 
                          : 'border-transparent cursor-default'
                      }`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-lg text-primary group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-headline font-bold text-on-surface">{item.title}</h4>
                        <p className="text-xs text-outline uppercase tracking-tighter">{item.sub}</p>
                      </div>
                      {item.link && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                          <ExternalLink className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Leadership & Community Impact */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <section className="mt-8 lg:mt-12">
          <div className="flex items-center gap-4 mb-10">
            <Users className="text-primary w-8 h-8" />
            <h2 className="font-headline text-3xl font-bold tracking-tight uppercase text-on-surface">Leadership & Community Impact</h2>
          </div>

          <div className="space-y-0 relative border-l border-outline-variant/30 ml-4">
            {/* Brigade Lead */}
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
                  <h3 className="font-headline text-2xl font-bold text-on-surface">Brigade Lead — IGNITE 2025</h3>
                  <p className="text-primary font-bold tracking-wide">KCLAS</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <span className="text-xs font-mono bg-surface-container-high px-3 py-1 rounded-full text-on-surface uppercase tracking-widest border border-outline-variant/30">July 2025</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest border-l-2 border-primary-container p-6 mt-4 rounded-r-lg">
                <p className="font-body text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Selected as one of 16 Brigade Leads for IGNITE 2025, a two-week student induction programme at KCLAS. Mentored and guided a cross-departmental cohort of first-year students through structured activities in leadership, teamwork, value-based learning, and personal development.
                </p>
                <ul className="space-y-4 font-body leading-relaxed text-sm text-on-surface-variant">
                  <li className="flex gap-3">
                    <Flame className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Managed a brigade group through 14 days of collaborative exercises, discussions, and self-discovery sessions across multiple departments.</span>
                  </li>
                  <li className="flex gap-3">
                    <Flame className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Facilitated group dynamics, resolved team conflicts, and delivered daily structured sessions with peer co-leads.</span>
                  </li>
                  <li className="flex gap-3">
                    <Flame className="text-primary w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Recognised for communication, mentorship, and the ability to engage freshers from diverse academic backgrounds.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* CSR Project Chair */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16 pl-10 relative transition-all duration-300 amethyst-glow-hover"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-surface-container border-2 border-outline-variant/50"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">CSR Project Chair</h3>
                  <p className="text-primary/80 font-bold tracking-wide">Rotaract Club, KCLAS</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <span className="text-xs font-mono bg-surface-container-high px-3 py-1 rounded-full text-on-surface uppercase tracking-widest border border-outline-variant/30">2024 – 2025</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 mt-4 rounded-r-lg border-l-2 border-outline-variant/30">
                <p className="font-body text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Appointed as CSR Project Chair for the Rotaract Club of Kumaraguru College of Liberal Arts and Science, under Rotaract District 3201, for the 2024–2025 academic year.
                </p>
                <ul className="space-y-4 font-body leading-relaxed text-sm text-on-surface-variant">
                  <li className="flex gap-3">
                    <HeartHandshake className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Led the planning and execution of community service initiatives and social responsibility projects for the club's annual calendar.</span>
                  </li>
                  <li className="flex gap-3">
                    <HeartHandshake className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Coordinated cross-departmental participation, volunteer mobilisation, and community outreach events.</span>
                  </li>
                  <li className="flex gap-3">
                    <HeartHandshake className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Reported to the club's Faculty Advisor and oversaw impact tracking for CSR deliverables throughout the year.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* AI/ML Project Developer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 pl-10 relative transition-all duration-300 amethyst-glow-hover"
            >
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-surface-container border-2 border-outline-variant/50"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">AI/ML Project Developer</h3>
                  <p className="text-primary/80 font-bold tracking-wide">KCLAS</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <span className="text-xs font-mono bg-surface-container-high px-3 py-1 rounded-full text-on-surface uppercase tracking-widest border border-outline-variant/30">2024 – 2026</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 mt-4 rounded-r-lg border-l-2 border-outline-variant/30">
                <p className="font-body text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Designed and deployed three production-ready AI systems in an academic setting:
                </p>
                <ul className="space-y-4 font-body leading-relaxed text-sm text-on-surface-variant">
                  <li className="flex gap-3">
                    <Code className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Built an Automated Event Report Generator using Python + AI-assisted writing, reducing faculty reporting time by 90% across masterclasses, workshops, and field visits. Tool supports multi-device use and one-click DOCX export.</span>
                  </li>
                  <li className="flex gap-3">
                    <Code className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Deployed a Confluence Seating Visualiser used institution-wide to manage 300+ student seating allocations in real time.</span>
                  </li>
                  <li className="flex gap-3">
                    <Code className="text-outline w-4 h-4 mt-1 flex-shrink-0" />
                    <span className="text-on-surface">Guided a team as Project Lead to create a Exam Seating Visualizer and a Exam Attendance Marking Platform, that also helps to create reports of attendance of classes and departments for the exams.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
