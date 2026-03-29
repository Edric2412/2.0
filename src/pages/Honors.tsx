import { useState, useEffect } from 'react';
import {
  Medal,
  Sigma,
  Award,
  GraduationCap,
  BadgeCheck,
  Terminal,
  LineChart,
  Cloud,
  Code2,
  TrendingUp,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

export function Honors() {
  const certificates = [
    {
      title: "Python for Data Science",
      issuer: "NPTEL",
      image: "/honors/logo-nptel.png",
      link: "https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/overlay/Certifications/253980451/treasury/?profileId=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U", // Replace with your certificate URL
      icon: Terminal
    },
    {
      title: "Digital Transformation & BI",
      issuer: "Amypo (Excel & Power BI)",
      image: "/honors/logo-amypo.jpeg",
      link: "https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/overlay/Certifications/1979752722/treasury/?profileId=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U", // Replace with your certificate URL
      icon: LineChart
    },
    {
      title: "Web Development Fundamentals",
      issuer: "IBM SkillsBuild",
      image: "/honors/logo-ibm.jpg",
      link: "https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/overlay/Certifications/1974822593/treasury/?profileId=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U", // Replace with your certificate URL
      icon: Cloud
    },
    {
      title: "Object Oriented Programming",
      issuer: "Infosys Springboard",
      image: "/honors/logo-infosys.avif",
      link: "https://www.linkedin.com/in/edric-jeffrey-sam-52502927b/overlay/Certifications/1974684208/treasury/?profileId=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U", // Replace with your certificate URL
      icon: Code2
    },
    {
      title: "AI Powered Business Analytics",
      issuer: "National University of Singapore - International Immersive Program",
      image: "/honors/logo-nus.jpg",
      link: "https://www.linkedin.com/posts/edric-jeffrey-sam-52502927b_datascience-machinelearning-deeplearning-activity-7238587733676318720-z_s1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQrUa0B7xWqaVlcbuJ9b4xfjYO_GYg9y6U", // Replace with your certificate URL
      icon: TrendingUp
    }
  ];

  const honors = [
    {
      title: "Best Student Innovation",
      subtitle: "Achievers Awards 2026",
      description: "Recognized for AI-driven and web-based solutions implemented for the institution and interned companies to automate tasks, thus reducing manual workload and time.",
      image: "/honors/record-innovation.jpeg",
      icon: Medal,
    },
    {
      title: "Inferential Statistics",
      subtitle: "Perfect Score",
      description: "Scored a centum in Inferential Statistics, demonstrating mastery in statistical inference and hypothesis testing.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      icon: Sigma,
    },
    {
      title: "Outstanding Project Performance",
      subtitle: "1st Prize Best FYP",
      description: "Winner of the Final Year Project Expo for the project 'All-in-One RAG Assessment & Adaptive Learning Engine'.",
      image: "/honors/record-project.jpeg",
      icon: Award,
    },
    {
      title: "Mahatma Gandhi Merit Scholarship",
      subtitle: "Merit Scholarship",
      description: "Awarded for sustained academic excellence in the academic year 2024-2025.",
      image: "/honors/record-scholarship.jpeg",
      icon: GraduationCap,
    },
    {
      title: "Department House Winner",
      subtitle: "House Captain",
      description: "Declared the best house 'SpaCy' for our contribution and achievements in academics, extra-curriculars, leaderships and so on.",
      image: "/honors/record-house.jpeg",
      icon: BadgeCheck,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeHonor, setActiveHonor] = useState<number | null>(null);
  const [closingHonor, setClosingHonor] = useState<number | null>(null);

  const handleHonorClick = (index: number) => {
    const ANIM_MS = 1200;
    if (activeHonor === index) {
      // Closing the same card — animate it shut
      setClosingHonor(index);
      setActiveHonor(null);
      setTimeout(() => setClosingHonor(null), ANIM_MS);
    } else {
      // Opening a new card — let the previous one animate shut first
      if (activeHonor !== null) {
        setClosingHonor(activeHonor);
        setTimeout(() => setClosingHonor(null), ANIM_MS);
      }
      setActiveHonor(index);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const autoPlay = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 7000);
    return () => clearInterval(autoPlay);
  }, [isHovered, certificates.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-8 md:pt-16 min-h-screen relative overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none"></div>

      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-5 space-y-8 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <span className="font-label text-primary tracking-[0.25em] text-xs md:text-sm uppercase font-semibold">Scholastic Records</span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-on-surface">
              The <span className="text-primary/80">Museum</span> of Excellence.
            </h1>
          </div>
          <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-lg">
            A curated selection of academic and professional milestones that define Edric's journey in Projects and Leadership. Each honor represents a commitment to technical precision and innovative boundary-pushing.
          </p>
          <div className="flex items-center gap-4 pt-4 md:pt-6">
            <div className="h-[1px] w-12 bg-outline-variant/50"></div>
            <span className="font-label text-xs uppercase tracking-widest text-outline">Refining the Future</span>
          </div>
        </div>

        {/* Right Side: Interactive Image Accordion (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-7 h-[650px]">
          <div className="accordion-container flex gap-2 md:gap-3 h-full w-full">

            {/* Item 1: Best Student Innovation */}
            <div className="accordion-item relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group bg-surface-container-low w-[20%]">
              <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden">
                <img alt="Student Innovation" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 dark:opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" src="/honors/record-innovation.jpeg" />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-surface-container-low to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="vertical-text font-headline text-lg md:text-xl font-bold text-primary uppercase tracking-wider whitespace-nowrap drop-shadow-sm">Best Student Innovation</h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-surface-container-low via-surface-container-low/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 z-10">
                <span className="font-label text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-primary mb-2 block truncate drop-shadow-sm">Achievers Awards 2026</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-on-surface leading-tight">Best Student Innovation</h3>
                <div className="mt-4 md:mt-6 hidden md:block">
                  <p className="text-sm text-on-surface-variant max-w-xs mb-6 leading-relaxed">Recognized for AI-driven and web-based solutions implemented for the institution and interned companies to automate tasks, thus reducing manual workload and time.</p>
                  <Medal className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>

            {/* Item 2: Inferential Statistics */}
            <div className="accordion-item relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group bg-surface-container-low w-[20%]">
              <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden">
                <img alt="Statistics Data" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 dark:opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-surface-container-low to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="vertical-text font-headline text-lg md:text-xl font-bold text-primary uppercase tracking-wider whitespace-nowrap drop-shadow-sm">Inferential Statistics</h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-surface-container-low via-surface-container-low/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 z-10">
                <span className="font-label text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-primary mb-2 block truncate drop-shadow-sm">Perfect Score</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-on-surface leading-tight">Inferential Statistics</h3>
                <div className="mt-4 md:mt-6 hidden md:block">
                  <p className="text-sm text-on-surface-variant max-w-xs mb-6 leading-relaxed">Scored a centum in Inferential Statistics, demonstrating mastery in statistical inference and hypothesis testing.</p>
                  <Sigma className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="accordion-item relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group bg-surface-container-low w-[20%]">
              <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden">
                <img alt="Project Tech" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 dark:opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" src="/honors/record-project.jpeg" />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-surface-container-low to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="vertical-text font-headline text-lg md:text-xl font-bold text-primary uppercase tracking-wider whitespace-nowrap drop-shadow-sm">Outstanding Project Performance</h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-surface-container-low via-surface-container-low/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 z-10">
                <span className="font-label text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-primary mb-2 block truncate drop-shadow-sm">1st Prize Best FYP</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-on-surface leading-tight">Outstanding Project Performance</h3>
                <div className="mt-4 md:mt-6 hidden md:block">
                  <p className="text-sm text-on-surface-variant max-w-xs mb-6 leading-relaxed">Winner of the Final Year Project Expo for the project 'All-in-One RAG Assessment & Adaptive Learning Engine'.</p>
                  <Award className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="accordion-item relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group bg-surface-container-low w-[20%]">
              <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden">
                <img alt="Academic Hall" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 dark:opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" src="/honors/record-scholarship.jpeg" />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-surface-container-low to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="vertical-text font-headline text-lg md:text-xl font-bold text-primary uppercase tracking-wider whitespace-nowrap drop-shadow-sm">Mahatma Gandhi Merit Scholarship</h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-surface-container-low via-surface-container-low/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 z-10">
                <span className="font-label text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-primary mb-2 block truncate drop-shadow-sm">Merit Scholarship</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-on-surface leading-tight">Mahatma Gandhi Merit Scholarship</h3>
                <div className="mt-4 md:mt-6 hidden md:block">
                  <p className="text-sm text-on-surface-variant max-w-xs mb-6 leading-relaxed">Awarded for sustained academic excellence in the academic year 2024-2025.</p>
                  <GraduationCap className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="accordion-item relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group bg-surface-container-low w-[20%]">
              <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden">
                <img alt="Collaboration" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 dark:opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" src="/honors/record-house.jpeg" />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-surface-container-low to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="vertical-text font-headline text-lg md:text-xl font-bold text-primary uppercase tracking-wider whitespace-nowrap drop-shadow-sm">Department House Winner</h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-surface-container-low via-surface-container-low/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 z-10">
                <span className="font-label text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-primary mb-2 block truncate drop-shadow-sm">House Captain</span>
                <h3 className="font-headline text-xl md:text-3xl font-bold text-on-surface leading-tight">Department House Winner</h3>
                <div className="mt-4 md:mt-6 hidden md:block">
                  <p className="text-sm text-on-surface-variant max-w-xs mb-6 leading-relaxed">Declared the best house 'SpaCy' for our contribution and achievements in academics, extra-curriculars, leaderships and so on.</p>
                  <BadgeCheck className="text-primary w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* Mobile / Tablet Vertical Accordion (hidden on lg+) */}
        <div className="lg:hidden col-span-full space-y-2">
          {honors.map((honor, index) => {
            const isActive = activeHonor === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-surface-container-low w-full overflow-hidden cursor-pointer"
                onClick={() => handleHonorClick(index)}
              >
                {/* Header strip — always visible */}
                <div className="flex items-center justify-between px-4 h-[52px]">
                  <span className="font-headline text-sm font-bold text-primary uppercase tracking-wide truncate pr-3">{honor.title}</span>
                  <ChevronDown className={`text-primary w-4 h-4 flex-shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'rotate-180' : 'rotate-0'}`} />
                </div>

                {/* Collapsible body — grid-rows transition for real height animation */}
                <div
                  className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className={`transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="relative w-full">
                        <img
                          alt={honor.title}
                          src={honor.image}
                          className="w-full max-h-[55vh] object-cover block"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-surface-container-low to-transparent pointer-events-none"></div>
                      </div>
                      <div className="px-5 pb-6 pt-2">
                        <span className="font-label text-[10px] tracking-[0.2em] font-bold uppercase text-primary mb-1 block">{honor.subtitle}</span>
                        <h3 className="font-headline text-xl font-bold text-on-surface leading-tight">{honor.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{honor.description}</p>
                        <honor.icon className="text-primary w-6 h-6 mt-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </section>

      {/* Certifications Section */}
      <section className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-outline/10 relative overflow-visible">
        <div className="grid grid-cols-1 xl:grid-cols-12 items-center gap-16 xl:gap-12">
          
          {/* Card Stack Area (Left Side on Desktop) */}
          <div className="xl:col-span-7 2xl:col-span-8 order-2 xl:order-1 relative w-full flex flex-col items-center min-h-[380px] sm:min-h-[420px]">
            {/* Interactive Curved Card Stack */}
            <div
              className="card-stack-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {certificates.map((cert, index) => {
                const diff = index - currentIndex;

                const spreadDeg = isMobile ? 25 : 35;
                const overlapX = isMobile ? 80 : 160;
                const arcY = isMobile ? 25 : 45;

                const rotateY = diff * spreadDeg;
                const rotateZ = diff * 12;
                const translateX = diff * overlapX;
                const translateY = Math.abs(diff) * arcY;
                const scale = 1 - Math.abs(diff) * (isMobile ? 0.25 : 0.18);
                const zIndex = 50 - Math.abs(diff);
                const opacity = 1 - Math.abs(diff) * 0.15;

                const isCurrent = index === currentIndex;

                return (
                  <div
                    key={index}
                    className={`certificate-card group ${!isCurrent ? 'inactive-tint border-primary/20' : 'border-primary/60 shadow-[0_0_80px_rgba(157,78,221,0.2)] dark:shadow-[0_0_80px_rgba(199,125,255,0.4)]'}`}
                    style={{
                      transform: `translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      width: isMobile ? '300px' : '520px',
                      height: isMobile ? '240px' : '350px',
                    }}
                    onClick={() => {
                      if (isCurrent && cert.link && cert.link !== "#") {
                        window.open(cert.link, '_blank', 'noopener,noreferrer');
                      } else {
                        setCurrentIndex(index);
                      }
                    }}
                  >
                    {isCurrent && cert.link && cert.link !== "#" && (
                      <div className="absolute top-6 right-6 z-20 p-2 md:p-2.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:text-primary transition-colors duration-300 shadow-lg" title="View Certificate">
                        <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    )}

                    <img
                      src={cert.image}
                      alt={cert.title}
                      className={`duration-500 ease-in-out ${isCurrent ? 'opacity-100' : 'opacity-20'}`}
                    />

                    <div className={`card-content transition-opacity duration-500 p-6 md:p-10 pointer-events-none ${isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <cert.icon className="text-primary w-6 h-6 md:w-8 md:h-8" />
                        <div className="h-[1px] flex-1 bg-white/30 dark:bg-white/10"></div>
                      </div>
                      <h3 className="font-body text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="text-primary w-4 h-4" />
                        <p className="text-xs md:text-sm text-primary font-body font-medium uppercase tracking-[0.1em]">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 md:mt-12 z-10 relative">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1))}
                className="p-3 text-on-surface-variant hover:text-primary transition-all hover:bg-surface-container-high rounded-full"
                aria-label="Previous Certification"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <div className="dot-nav !mt-0">
                {certificates.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  ></div>
                ))}
              </div>

              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % certificates.length)}
                className="p-3 text-on-surface-variant hover:text-primary transition-all hover:bg-surface-container-high rounded-full"
                aria-label="Next Certification"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </div>

          {/* Section Header & Description (Right Side on Desktop) */}
          <div className="xl:col-span-5 2xl:col-span-4 text-center xl:text-left space-y-4 md:space-y-6 relative z-30 order-1 xl:order-2 mb-8 xl:mb-0">
            <span className="font-label text-primary tracking-[0.25em] text-xs md:text-sm uppercase font-semibold">Professional Validations</span>
            <h2 className="font-headline text-5xl md:text-6xl xl:text-7xl font-bold leading-[1] tracking-tighter text-on-surface">
              Global <br className="hidden xl:block"/><span className="text-primary/80">Certifications</span>.
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed max-w-lg mx-auto xl:mx-0 pt-4 md:pt-6">
              A curated showcase of industry-recognized certifications and professional credentials. These technical milestones reflect a continuous, rigorous dedication to mastering modern technologies, secure cloud architectures, and advanced data-driven analytics.
            </p>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
