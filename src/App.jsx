import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  TrendingUp,
  Users,
  Package,
  Menu,
  X,
  Globe,
  CheckCircle2,
  BarChart3,
  Target,
  Award,
  Zap,
  ArrowRight,
  Download,
  Users2,
  PieChart,
  ShieldCheck,
  Rocket
} from 'lucide-react';

// Assets
import vinodUser from './assets/vinod-user1.png';
import kkclLogo from './assets/KKCL.jpg';
import levisLogo from './assets/levis.png';
import rrLogo from './assets/rr-logo.jfif';
import relianceLogo from './assets/reliance.png';

// --- Shared Components ---

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`section-container ${className}`}>
    {children}
  </section>
);

const SectionHeading = ({ title, subtitle, badge }) => (
  <div className="mb-16">
    {badge && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 border border-accent/20"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-extrabold text-white mb-6"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-lg max-w-2xl leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      const totalSteps = 60;
      const increment = end / totalSteps;
      const stepTime = (duration * 1000) / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="text-4xl font-bold text-white tracking-tight">
      {count}{suffix}
    </span>
  );
};

// --- App Layout ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "c74f280d-3a3b-4abf-ab88-9312def83120");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  // Navigation logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' }
  ];

  const resumeData = {
    experience: [
      {
        company: "Kewal Kiran Clothing Ltd (KKCL)",
        role: "Sales Officer",
        duration: "Jan 2024 – Present",
        logo: kkclLogo,
        achievements: [
          "Increased sales ratio through relationship-building initiatives.",
          "Cleared 25% ageing inventory within 60 days via targeted schemes.",
          "Optimized stockout incidents by 30% through proactive ERP monitoring.",
          "Conducted competitor benchmarking across 10+ brands for GTM strategy."
        ]
      },
      {
        company: "RR Athleisure Indian Pvt Ltd",
        role: "Store Manager",
        duration: "June 2022 – Dec 2023",
        logo: rrLogo,
        achievements: [
          "Grew monthly revenue by 20% and increased ATV by 12%.",
          "Led team of 8 associates with 95%+ target attainment consistently.",
          "Optimized stockouts by 35% through redesigned forward planning.",
          "Maintained shrinkage below 0.5% through bi-weekly cycle counts."
        ]
      },
      {
        company: "Brand Factory (Future Retail)",
        role: "Team Leader – Levi's Brand",
        duration: "June 2020 – May 2022",
        logo: levisLogo,
        achievements: [
          "Maintained Levi's section in top 3 by category revenue in-store.",
          "Improved footfall-to-conversion rate by 12% via VM execution.",
          "Eliminated 2-hour restock delays through real-time coordination."
        ]
      }
    ],
    skills: [
      { name: "Sales Strategy", level: 95 },
      { name: "Lead Generation", level: 90 },
      { name: "CRM Management", level: 85 },
      { name: "Negotiation", level: 92 },
      { name: "Business Development", level: 88 },
      { name: "Team Management", level: 94 },
      { name: "Communication", level: 90 },
      { name: "Market Analysis", level: 85 }
    ],
    services: [
      {
        title: "Sales Consulting",
        desc: "Strategic advisory on market entry and sales team optimization.",
        icon: <BarChart3 className="w-8 h-8 text-accent" />
      },
      {
        title: "Business Growth Strategy",
        desc: "Designing roadmaps for sustainable revenue and territory expansion.",
        icon: <TrendingUp className="w-8 h-8 text-accent" />
      },
      {
        title: "Client Acquisition",
        desc: "Implementing high-conversion funnels and B2B relationship protocols.",
        icon: <Target className="w-8 h-8 text-accent" />
      },
      {
        title: "Sales Team Training",
        desc: "Onboarding and coaching modules to drive peak performance.",
        icon: <Users2 className="w-8 h-8 text-accent" />
      },
      {
        title: "Market Expansion",
        desc: "Identifying white-space opportunities and competitor gap analysis.",
        icon: <Rocket className="w-8 h-8 text-accent" />
      },
      {
        title: "B2B Management",
        desc: "Managing complex stakeholder relationships and SLA compliance.",
        icon: <ShieldCheck className="w-8 h-8 text-accent" />
      }
    ],
    revenueMilestones: [
      { year: "2023-24", value: "47,826,279", label: "Annual Revenue" },
      { year: "2024-25", value: "46,333,562", label: "Annual Revenue" },
      { year: "2025-26", value: "57,295,054", label: "Projected Revenue" }
    ],
    stats: [
      { label: "Sales Ratio Increase", value: "15", suffix: "%", icon: <TrendingUp /> },
      { label: "Clients Managed", value: "20", suffix: "+", icon: <Users /> },
      { label: "Sales Targets", value: "95", suffix: "%", icon: <Target /> },
      { label: "Years Experience", value: "6", suffix: "+", icon: <Award /> }
    ]
  };

  return (
    <div className="bg-navy min-h-screen text-slate-300">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left" style={{ scaleX }} />

      {/* --- Sticky Navbar --- */}
      <nav className="fixed w-full top-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-accent/20">V</div>
            <span className="text-xl font-bold text-white tracking-tighter">VINOD <span className="text-accent">BODDU</span></span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'text-white after:w-full' : ''}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="px-6 py-2 bg-accent hover:bg-accent-light text-white text-sm font-bold rounded-full transition-all duration-300">
              Hire Me
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-dark border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-lg font-medium text-slate-400 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- 1. Hero Section --- */}
      <header id="home" className="relative min-h-[85vh] lg:min-h-[90vh] pt-24 pb-12 overflow-hidden flex items-center">
        {/* Background Gradients */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-[1.2]">
              Driving Revenue <br />
              <span className="gradient-text">Growth & Client Relationships</span>
            </h1>
            <p className="text-base text-slate-400 mb-6 max-w-md leading-relaxed">
              6+ years of specialized expertise in sales strategy, territory management, and negotiation for market-leading apparel brands.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary py-2.5 px-5 text-sm">Hire Me <ArrowRight size={16} /></a>
              <button className="btn-secondary py-2.5 px-5 text-sm">Download Resume <Download size={16} /></button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating Elements - Adjusted position for smaller hero */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 glass-card p-3 z-20 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent"><Award size={16} /></div>
                <div>
                  <p className="text-[8px] uppercase font-bold text-slate-500">Top Performance</p>
                  <p className="text-xs font-bold text-white">Levi's Brand 2022</p>
                </div>
              </div>
            </motion.div>

            <div className="relative rounded-[1.5rem] overflow-hidden group max-w-[320px] lg:max-w-md shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent z-10" />
              <img
                src={vinodUser}
                alt="Vinod Boddu"
                className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- 2. About Section --- */}
      <Section id="about" className="relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Professional Journey"
              title="6+ Years of Sales Leadership"
              subtitle="Results-driven Retail Professional with a proven track record in driving revenue growth, improving operational efficiency, and building high-performance teams."
            />
            <div className="space-y-6 text-slate-400 mb-10">
              <p>
                Specialized in territory sales planning, inventory management, and merchandise planning. I leverage data-driven insights and ERP systems to minimize stockouts and maximize profitability.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" />
                  <span className="text-white font-medium">B2B Strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" />
                  <span className="text-white font-medium">Market Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" />
                  <span className="text-white font-medium">P&L Accountability</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" />
                  <span className="text-white font-medium">CRM Mastery</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {resumeData.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                  {stat.icon}
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- 3. Skills Section --- */}
      <Section id="skills" className="bg-navy-dark/30">
        <SectionHeading
          badge="Expertise"
          title="Strategic Skill Set"
          subtitle="A comprehensive toolkit designed to navigate and lead in the competitive retail landscape."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resumeData.skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-white">{skill.name}</h3>
                <span className="text-accent text-sm font-bold">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- 4. Experience Timeline --- */}
      <Section id="experience">
        <SectionHeading
          badge="History"
          title="Professional Tenure"
          subtitle="Years of dedicated growth and contribution to global retail icons."
        />
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {resumeData.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-navy-dark text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Briefcase size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-8">
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-bold self-start">{exp.duration}</span>
                </div>
                <ul className="space-y-3">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- 5. Services Section --- */}
      <Section id="services" className="bg-navy-dark/30">
        <SectionHeading
          badge="What I Do"
          title="Core Services"
          subtitle="Specialized business solutions to drive retail performance and brand growth."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumeData.services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 group hover:-translate-y-2"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- 6. Achievements Section --- */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading
            badge="Success Metrics"
            title="Quantifiable Results"
            centered
          />
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-10 flex flex-col items-center">
              <PieChart className="w-12 h-12 text-accent mb-6" />
              <AnimatedCounter value="15" suffix="% Increase" />
              <p className="text-slate-400 mt-2">Increase in sales ratio through relationship-building.</p>
            </div>
            <div className="glass-card p-10 flex flex-col items-center">
              <ShieldCheck className="w-12 h-12 text-accent mb-6" />
              <AnimatedCounter value="35" suffix="% Improvement" />
              <p className="text-slate-400 mt-2">Optimization of stockout incidents via proactive monitoring.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resumeData.revenueMilestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 border-l-4 border-accent"
              >
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{milestone.year}</p>
                <p className="text-2xl font-bold text-white mb-1">₹{milestone.value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{milestone.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- 7. Portfolio Section --- */}
      <Section id="portfolio">
        <SectionHeading
          badge="Case Studies"
          title="Strategic Projects"
          subtitle="Real-world examples of operational optimization and sales success."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Inventory Optimization", result: "25% Clearance", desc: "Targeted markdown activation for KKCL ageing stock.", icon: <Package /> },
            { title: "Team Performance", result: "95% Attainment", desc: "Consistently hit targets across 18 months at RR Athleisure.", icon: <Users2 /> },
            { title: "VM Strategy", result: "12% Conversion", desc: "Planogram overhaul for Levi's brand section.", icon: <Zap /> }
          ].map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 group relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">{project.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-accent text-sm font-bold mb-4">{project.result}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- 8. Contact Section --- */}
      <Section id="contact" className="bg-navy-dark/50">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeading
              badge="Let's Talk"
              title="Schedule a Strategic Discussion"
              subtitle="Ready to optimize your retail operations or scale your sales territory? Let's connect."
            />
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                  <a href="mailto:bodduvinod765@gmail.com" className="text-lg font-bold text-white hover:text-accent transition-colors">bodduvinod765@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Me</p>
                  <a href="tel:+917569180670" className="text-lg font-bold text-white hover:text-accent transition-colors">+91 7569180670</a>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-lg font-bold text-white">Vijayawada, Andhra Pradesh</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="https://linkedin.com/in/boddu-vinod-4192a42b4" target="_blank" className="w-12 h-12 glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-accent transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-accent transition-all">
                <Globe size={20} />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Full Name</label>
                  <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all text-white" placeholder="Enter your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all text-white" placeholder="Enter Your Email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Subject</label>
                <input name="subject" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all text-white" placeholder="Business Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea name="message" rows="4" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-all text-white resize-none" placeholder="How can I help scale your operations?"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-lg">Send Message</button>
              {result && (
                <p className={`text-center mt-4 font-bold ${result.includes('Successfully') ? 'text-accent' : 'text-slate-400'}`}>
                  {result}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </Section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-white text-sm">V</div>
          <span className="text-lg font-bold text-white tracking-tighter uppercase">Vinod Boddu</span>
        </div>
        <p className="text-slate-500 text-sm">© 2024 Vinod Boddu. Executive Sales & Operations Leader. All rights reserved.</p>
      </footer>
    </div>
  );
}
