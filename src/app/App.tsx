import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/image-1.png";
import {
  Zap, Shield, TrendingUp, Users, Phone, Mail, MapPin,
  ChevronDown, ArrowRight, Check, Star, Menu, X, Award,
  Leaf, Battery, Settings, Wrench, MessageCircle, Linkedin,
  Facebook, Twitter, Instagram, Send, BarChart3, Clock, Cpu,
  ChevronUp, MessageSquare, FileText,
} from "lucide-react";

// ─── Gold gradient helper ─────────────────────────────────────────────────────
const goldGrad = "linear-gradient(135deg, #F0D060 0%, #C9A400 45%, #8B6914 100%)";
const goldGradText: React.CSSProperties = {
  background: goldGrad,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Services", "Pricing", "Resources", "Blog", "FAQ", "Contact"];

const SERVICES = [
  {
    icon: <Users size={22} />,
    title: "Solar Consultation",
    desc: "Expert site assessments and personalised energy audits to build the perfect solar roadmap for your property.",
    tag: "Start here",
    col: "md:col-span-2",
    row: "",
    accent: true,
  },
  {
    icon: <Cpu size={22} />,
    title: "System Design",
    desc: "CAD-precision custom layouts engineered for maximum yield and seamless aesthetic integration.",
    tag: "Engineering",
    col: "md:col-span-1",
    row: "",
    accent: false,
  },
  {
    icon: <Battery size={22} />,
    title: "Equipment Supply",
    desc: "Tier-1 panels, hybrid inverters, and lithium battery storage sourced directly from certified manufacturers.",
    tag: "Hardware",
    col: "md:col-span-1",
    row: "",
    accent: false,
  },
  {
    icon: <Wrench size={22} />,
    title: "Installation",
    desc: "NABCEP-certified installers complete most residential projects within one to two days — zero corners cut.",
    tag: "Execution",
    col: "md:col-span-2",
    row: "",
    accent: true,
  },
  {
    icon: <Settings size={22} />,
    title: "Maintenance",
    desc: "Scheduled servicing and 24/7 remote monitoring keep your system running at peak performance year-round.",
    tag: "Ongoing",
    col: "md:col-span-1",
    row: "",
    accent: false,
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Energy Optimisation",
    desc: "AI-driven analytics surface hidden inefficiencies and continuously improve your savings ratio.",
    tag: "Intelligence",
    col: "md:col-span-1",
    row: "",
    accent: false,
  },
];

const WHY = [
  { icon: <Award size={26} />, title: "10+ Years of Excellence", desc: "A decade delivering solar solutions across residential, commercial, and industrial sectors." },
  { icon: <Shield size={26} />, title: "NABCEP-Certified Team", desc: "Every engineer holds current certification with ongoing training on the latest technology." },
  { icon: <Star size={26} />, title: "25-Year Warranty", desc: "Industry-leading coverage on panels, inverters, and our own workmanship — unconditionally." },
  { icon: <Clock size={26} />, title: "24 / 7 Monitoring", desc: "We watch your system around the clock so issues are resolved before you ever notice them." },
  { icon: <Leaf size={26} />, title: "Carbon-Negative Install", desc: "We offset the embodied carbon of every installation through verified reforestation projects." },
  { icon: <BarChart3 size={26} />, title: "≥ 300 % Lifetime ROI", desc: "Our clients consistently see three-times-return on their investment over a 25-year system life." },
];

const STEPS = [
  { num: "01", title: "Free Consultation", desc: "Book a no-obligation call. Our energy advisors assess your site, consumption, and goals to create an accurate picture of what solar can do for you." },
  { num: "02", title: "Custom System Design", desc: "We model your roof in 3D, run shadow analysis, and produce a CAD drawing with a detailed performance projection and itemised quote." },
  { num: "03", title: "Equipment Procurement", desc: "We source Tier-1 hardware directly from certified manufacturers — no grey-market panels, no substitutions after signing." },
  { num: "04", title: "Professional Installation", desc: "Our certified crew installs and commissions your system in one to two days, pulling all permits and handling grid-connection paperwork." },
  { num: "05", title: "Activation & Ongoing Support", desc: "Your monitoring dashboard goes live. We remain your dedicated energy partner for the life of the system." },
];

const PROJECTS = [
  { title: "Riverside Residence", location: "Lagos, Nigeria", kw: "12.5 kW", category: "Residential", img: "https://images.unsplash.com/photo-1660330589243-4c640d878052?w=700&h=480&fit=crop&auto=format", tall: true },
  { title: "TechHub Office Complex", location: "Abuja, Nigeria", kw: "85 kW", category: "Commercial", img: "https://images.unsplash.com/photo-1729843832879-284e28d1661d?w=700&h=480&fit=crop&auto=format", tall: false },
  { title: "Meridian Industrial Park", location: "Kano, Nigeria", kw: "250 kW", category: "Industrial", img: "https://images.unsplash.com/photo-1543181139-a1916d8dd9aa?w=700&h=480&fit=crop&auto=format", tall: false },
  { title: "Green Valley Homes", location: "Port Harcourt", kw: "8.4 kW", category: "Residential", img: "https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?w=700&h=480&fit=crop&auto=format", tall: true },
  { title: "Starlight Mall", location: "Enugu, Nigeria", kw: "120 kW", category: "Commercial", img: "https://images.unsplash.com/photo-1639774274707-09c80b4f53e3?w=700&h=480&fit=crop&auto=format", tall: false },
  { title: "Eco Estate Phase 2", location: "Ibadan, Nigeria", kw: "6.6 kW", category: "Residential", img: "https://images.unsplash.com/photo-1655300256335-beef51a914fe?w=700&h=480&fit=crop&auto=format", tall: false },
];

const TESTIMONIALS = [
  {
    name: "Amara Okonkwo",
    role: "Homeowner · Lagos",
    text: "Santerra transformed our home. Electricity bills dropped 92 % and the installation team was impeccably professional. Best financial decision our family has made.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "David Adeleke",
    role: "CEO, TechHub Nigeria · Abuja",
    text: "We have saved over ₦8 million annually since commissioning our 85 kW rooftop array. Santerra's team took the entire complexity off our plate — design, permits, grid-connection.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Dr. Fatima Hassan",
    role: "Medical Director · Abuja",
    text: "Uninterrupted power is life-critical for us. Santerra delivered a hybrid system with battery backup that has recorded zero downtime in 18 months of operation.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=80&h=80&fit=crop&auto=format",
  },
  {
    name: "Emeka Nwosu",
    role: "Factory Owner · Kano",
    text: "The 250 kW industrial array paid back ahead of the 4-year projection. The monitoring platform gives us live generation data that we now integrate with our ERP.",
    stars: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
];

const FAQS = [
  { q: "How much does a residential system cost?", a: "Residential systems typically range from ₦1.5 M to ₦8 M depending on size, battery storage, and roof complexity. We provide a fully itemised quote at no cost after your site assessment — there are no surprises." },
  { q: "How long does the installation take?", a: "Most homes are completed in one to two days. Commercial projects take three to seven days depending on size. We schedule around your routine and leave the site cleaner than we found it." },
  { q: "What warranties are included?", a: "25-year linear performance warranty on panels, 10-year product warranty on inverters, and a 5-year Santerra workmanship guarantee covering all labour and penetrations." },
  { q: "Does solar work during load-shedding or cloudy days?", a: "Panels produce power in diffuse light — typically 15–30 % of peak capacity on overcast days. With our hybrid inverter and battery packages, you are fully independent of the grid during outages." },
  { q: "How much can I realistically save?", a: "Our residential customers average a 75–92 % reduction in electricity bills. Use the Savings Calculator on this page for a personalised estimate based on your actual monthly spend." },
  { q: "Do you handle DISCOM approvals and net-metering?", a: "Yes — we manage every permit, distribution-company approval, and net-metering application as part of the standard installation package. You sign nothing and chase no-one." },
  { q: "What ongoing maintenance is required?", a: "Annual professional cleaning and a bi-annual electrical inspection is all that is typically needed. Our monitoring platform flags anomalies automatically so we can often resolve issues remotely." },
  { q: "Can I expand the system later?", a: "Absolutely. We over-size the inverter and conduit runs at installation specifically to make future expansion straightforward and cost-effective." },
];

const CLIENTS = [
  "Dangote Group", "MTN Nigeria", "Access Bank", "GTBank",
  "Nestlé Nigeria", "Heineken", "NNPC", "Julius Berger",
  "Zenith Bank", "Total Energies", "Lafarge Africa", "Nigerian Breweries",
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [calcBill, setCalcBill] = useState(200);
  const [calcResult, setCalcResult] = useState<null | { annual: number; payback: number; net20: number }>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 500); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const calcSavings = () => {
    const annual = Math.round(calcBill * 12 * 0.87);
    const systemCost = calcBill * 90;
    const payback = Math.round((systemCost / annual) * 10) / 10;
    const net20 = Math.round(annual * 20 - systemCost);
    setCalcResult({ annual, payback, net20 });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-inner { animation: marquee 28s linear infinite; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .float-anim { animation: floatY 5s ease-in-out infinite; }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        .pulse-ring::before { content:''; position:absolute; inset:0; border-radius:50%; border:2px solid #C9A400; animation: pulse-ring 2s ease-out infinite; }
        @keyframes gradMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .hero-grad { background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,164,0,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 90%, rgba(139,105,20,0.08) 0%, transparent 60%), #080809; }
        .gold-border-card { border: 1px solid rgba(201,164,0,0.12); transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
        .gold-border-card:hover { border-color: rgba(201,164,0,0.45); box-shadow: 0 0 30px rgba(201,164,0,0.08); transform: translateY(-3px); }
        .timeline-line { background: linear-gradient(to bottom, #C9A400, rgba(201,164,0,0.1)); }
        .section-label { font-family: 'Object Sans', 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #C9A400; }
        .nav-link { position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:#C9A400; transition:width 0.25s ease; }
        .nav-link:hover::after { width:100%; }
        .dot-grid { background-image: radial-gradient(rgba(201,164,0,0.1) 1px, transparent 1px); background-size: 32px 32px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes chatSlideIn { 0%{opacity:0;transform:translateY(16px) scale(0.96)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        .chat-panel { animation: chatSlideIn 0.28s cubic-bezier(0.34,1.2,0.64,1) forwards; transform-origin: bottom right; }
        @keyframes chatBtnPop { 0%{transform:scale(0.85)} 60%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .chat-btn-pop { animation: chatBtnPop 0.35s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        @keyframes msgIn { 0%{opacity:0;transform:translateX(-10px)} 100%{opacity:1;transform:translateX(0)} }
        .msg-in { animation: msgIn 0.35s ease 0.15s both; }
        @keyframes actionIn { 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }
        .action-in-1 { animation: actionIn 0.3s ease 0.3s both; }
        .action-in-2 { animation: actionIn 0.3s ease 0.42s both; }
        .action-in-3 { animation: actionIn 0.3s ease 0.54s both; }
        .chat-quick-btn { transition: background 0.2s, border-color 0.2s, transform 0.15s; }
        .chat-quick-btn:hover { transform: translateX(3px); }
      `}</style>

      {/* ── Sticky Navigation ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "bg-transparent"}`}>
        <nav className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <ImageWithFallback src={logoSrc} alt="Santerra Solar" className="w-[120px] h-auto object-contain" />
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
              style={{ background: goldGrad }}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-2 rounded-lg border border-border text-foreground">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-b border-border px-5 py-6">
            <ul className="flex flex-col gap-4 mb-5">
              {NAV_LINKS.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="block w-full text-center px-5 py-3 rounded-full text-sm font-semibold text-primary-foreground" style={{ background: goldGrad }}>
              Get a Quote
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-grad dot-grid pt-16">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,164,0,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201,164,0,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full py-24 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/60 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="section-label">Nigeria's #1 Solar Energy Company</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Power Your World
              <br />
              with <span style={goldGradText}>Clean&nbsp;Solar</span>
              <br />
              Energy
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
              Santerra Solar designs, installs, and maintains premium solar systems that slash your electricity bills, protect you from grid outages, and accelerate your path to energy independence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(201,164,0,0.35)] active:scale-95" style={{ background: goldGrad }}>
                Get a Quote <ArrowRight size={18} />
              </a>
              <a href="#projects" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-foreground border border-border bg-secondary/40 backdrop-blur-sm hover:border-primary/40 transition-all duration-200">
                View Our Projects
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { val: "500+", label: "Projects Completed" },
                { val: "98%", label: "Customer Satisfaction" },
                { val: "₦2B+", label: "Energy Bills Saved" },
                { val: "10+", label: "Years of Excellence" },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-extrabold" style={goldGradText}>{val}</span>
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,164,0,0.1) 0%, transparent 70%)" }} />
            <div className="float-anim relative z-10 rounded-3xl overflow-hidden border border-border shadow-[0_20px_80px_rgba(0,0,0,0.6)]" style={{ maxWidth: 560 }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1120&h=760&fit=crop&auto=format"
                alt="Modern home with Santerra Solar panels"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,8,9,0.5) 0%, transparent 50%)" }} />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-8 gold-border-card bg-card/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,164,0,0.15)" }}>
                <Zap size={18} style={{ color: "#C9A400" }} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Live Generation</div>
                <div className="text-lg font-bold text-foreground">8.4 <span className="text-sm font-normal text-muted-foreground">kW now</span></div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 gold-border-card bg-card/90 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,164,0,0.15)" }}>
                <Leaf size={18} style={{ color: "#C9A400" }} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">CO₂ Avoided</div>
                <div className="text-lg font-bold text-foreground">4.2 <span className="text-sm font-normal text-muted-foreground">t / yr</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-muted-foreground">Scroll</span>
          <ChevronDown size={16} className="text-primary animate-bounce" />
        </div>
      </section>

      {/* ── Trusted Clients ── */}
      <section className="py-12 border-y border-border bg-secondary/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-6 flex items-center gap-4">
          <span className="section-label">Trusted by Industry Leaders</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="relative overflow-hidden">
          <div className="marquee-inner flex gap-12 w-max">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="flex-shrink-0 px-5 py-2 text-sm font-semibold text-muted-foreground/60 tracking-wide uppercase border border-border/40 rounded-full hover:text-muted-foreground hover:border-border transition-colors cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <div className="section-label mb-3">About Santerra Solar</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
            More Than Solar — <span style={goldGradText}>A Partnership</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">We have spent over a decade building Nigeria's most trusted solar brand, one installation at a time.</p>
        </div>

        {/* Zig-zag block 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="section-label mb-3">Our Mission</div>
            <h3 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Making clean energy <span style={goldGradText}>accessible to every Nigerian</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded in 2014, Santerra Solar was born from a simple conviction: reliable electricity should not be a luxury. We started with residential rooftop installations in Lagos and have since grown into a full-spectrum energy company serving homeowners, enterprises, hospitals, and factories across all 36 states.
            </p>
            <ul className="space-y-3">
              {["ISO 9001:2015 certified operations", "500+ commissioned systems", "Zero safety incidents in 10 years", "Average 4.9 / 5 post-install rating"].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,164,0,0.15)" }}>
                    <Check size={11} style={{ color: "#C9A400" }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-3xl overflow-hidden border border-border shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&h=600&fit=crop&auto=format"
                alt="Santerra Solar team on a commercial rooftop installation"
                className="w-full h-72 lg:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 gold-border-card bg-card rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-extrabold mb-1" style={goldGradText}>500+</div>
              <div className="text-xs text-muted-foreground font-medium">Systems installed nationwide</div>
            </div>
          </div>
        </div>

        {/* Zig-zag block 2 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-border shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=900&h=600&fit=crop&auto=format"
                alt="Large-scale industrial solar field managed by Santerra Solar"
                className="w-full h-72 lg:h-96 object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-5 gold-border-card bg-card rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-extrabold mb-1" style={goldGradText}>25 yr</div>
              <div className="text-xs text-muted-foreground font-medium">Panel performance warranty</div>
            </div>
          </div>
          <div>
            <div className="section-label mb-3">Our Commitment</div>
            <h3 className="text-3xl font-bold mb-5" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Technology-first, <span style={goldGradText}>people always</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We invest heavily in the latest photovoltaic and battery-storage technology so our clients are never locked into yesterday's hardware. Every system is remotely monitored, every alert is actioned within four hours, and every client has a named account manager from commissioning day.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "4 hrs", label: "Avg response time" },
                { val: "100%", label: "Permit success rate" },
                { val: "₦2B+", label: "Customer savings" },
                { val: "36", label: "States served" },
              ].map(({ val, label }) => (
                <div key={label} className="gold-border-card bg-secondary/40 rounded-2xl p-4">
                  <div className="text-2xl font-extrabold mb-1" style={goldGradText}>{val}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Bento ── */}
      <section id="services" className="py-28 bg-secondary/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <div className="section-label mb-3">What We Offer</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Complete Solar <span style={goldGradText}>Services</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">End-to-end solar solutions — from the first conversation to the last bill.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className={`${svc.col} gold-border-card rounded-3xl p-7 bg-card group cursor-default ${svc.accent ? "relative overflow-hidden" : ""}`}
              >
                {svc.accent && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,164,0,0.07) 0%, transparent 70%)" }} />
                )}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(201,164,0,0.12)" }}>
                    <span style={{ color: "#C9A400" }}>{svc.icon}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-border text-muted-foreground">{svc.tag}</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Hagrid', sans-serif" }}>{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#C9A400" }}>
                  Learn more <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section id="why" className="py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Why Santerra</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
            The Standard Others <span style={goldGradText}>Aspire To</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Six reasons over 500 clients chose Santerra Solar — and stayed.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map(({ icon, title, desc }) => (
            <div key={title} className="gold-border-card bg-card rounded-3xl p-7 group cursor-default">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(201,164,0,0.12)" }}>
                <span style={{ color: "#C9A400" }}>{icon}</span>
              </div>
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "'Hagrid', sans-serif" }}>{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="process" className="py-28 bg-secondary/20 border-y border-border dot-grid">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Our Process</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              From Quote to <span style={goldGradText}>Clean Power</span>
            </h2>
            <p className="text-muted-foreground">Five steps. Complete transparency. Handled end to end.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-6 bottom-6 w-px timeline-line hidden sm:block" />

            <div className="flex flex-col gap-8">
              {STEPS.map((step, i) => (
                <div key={step.num} className="sm:pl-20 relative group">
                  {/* Number bubble */}
                  <div
                    className="absolute left-0 top-0 w-12 h-12 rounded-full hidden sm:flex items-center justify-center text-xs font-extrabold border-2 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: i === 0 ? goldGrad : "#0F0F14",
                      borderColor: "#C9A400",
                      color: i === 0 ? "#080809" : "#C9A400",
                      fontFamily: "'Object Sans', 'DM Sans', sans-serif",
                      zIndex: 1,
                    }}
                  >
                    {step.num}
                  </div>
                  <div className="gold-border-card bg-card rounded-3xl p-6 group-hover:border-primary/40">
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Hagrid', sans-serif" }}>{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-primary-foreground hover:opacity-90 hover:scale-105 active:scale-95 transition-all" style={{ background: goldGrad }}>
              Start Your Journey <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" className="py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="section-label mb-3">Our Work</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Featured <span style={goldGradText}>Projects</span>
            </h2>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: "#C9A400" }}>
            View all projects <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <div key={p.title} className="gold-border-card bg-card rounded-3xl overflow-hidden group cursor-pointer">
              <div className="relative overflow-hidden h-52">
                <ImageWithFallback
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(8,8,9,0.7) 0%, transparent 50%)" }} />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-primary-foreground" style={{ background: goldGrad }}>
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: "'Hagrid', sans-serif" }}>{p.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={12} />{p.location}</span>
                  <span className="font-semibold" style={{ color: "#C9A400" }}>{p.kw}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-28 bg-secondary/20 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <div className="section-label mb-3">Client Stories</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Voices of <span style={goldGradText}>Trust</span>
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2 sm:px-8">
                  <div className="gold-border-card bg-card rounded-3xl p-8 max-w-3xl mx-auto">
                    <div className="flex mb-4 gap-1">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} size={16} fill="#C9A400" style={{ color: "#C9A400" }} />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/90 mb-7 italic">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 flex-shrink-0">
                        <ImageWithFallback src={t.img} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-sm" style={{ fontFamily: "'Object Sans', 'DM Sans', sans-serif" }}>{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-7">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === testimonialIdx ? 24 : 8,
                  height: 8,
                  background: i === testimonialIdx ? "#C9A400" : "rgba(201,164,0,0.25)",
                }}
              />
            ))}
          </div>

          {/* Grid of all 4 condensed */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} onClick={() => setTestimonialIdx(i)} className={`gold-border-card bg-card rounded-2xl p-5 cursor-pointer transition-all duration-200 ${i === testimonialIdx ? "border-primary/50 shadow-[0_0_20px_rgba(201,164,0,0.1)]" : ""}`}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} size={12} fill="#C9A400" style={{ color: "#C9A400" }} />)}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"><ImageWithFallback src={t.img} alt={t.name} className="w-full h-full object-cover" /></div>
                  <span className="text-xs font-semibold">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solar Savings Calculator ── */}
      <section id="calculator" className="py-28 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-3">Free Calculator</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-5" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              See How Much You Could <span style={goldGradText}>Save</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Enter your average monthly electricity bill and get an instant estimate of your potential savings with a Santerra Solar system. It takes 30 seconds.
            </p>
            <ul className="space-y-3">
              {["Based on real customer data from 500+ installations", "Accounts for Nigerian electricity tariff increases", "Includes battery-storage and net-metering benefits"].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(201,164,0,0.15)" }}>
                    <Check size={11} style={{ color: "#C9A400" }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="gold-border-card bg-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-7" style={{ fontFamily: "'Hagrid', sans-serif" }}>Solar Savings Calculator</h3>

            <div className="mb-6">
              <label className="text-sm font-semibold text-muted-foreground block mb-2">Monthly Electricity Bill</label>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl font-extrabold" style={goldGradText}>₦{calcBill.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={50}
                value={calcBill}
                onChange={e => { setCalcBill(Number(e.target.value)); setCalcResult(null); }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #C9A400 ${((calcBill - 50) / 1950) * 100}%, rgba(201,164,0,0.15) 0%)`,
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₦50</span><span>₦2,000</span>
              </div>
            </div>

            <button
              onClick={calcSavings}
              className="w-full py-4 rounded-2xl text-base font-bold text-primary-foreground hover:opacity-90 hover:scale-[1.02] active:scale-100 transition-all mb-6"
              style={{ background: goldGrad }}
            >
              Calculate My Savings
            </button>

            {calcResult && (
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                {[
                  { val: `₦${calcResult.annual.toLocaleString()}`, label: "Annual savings" },
                  { val: `${calcResult.payback} yrs`, label: "Payback period" },
                  { val: `₦${(calcResult.net20 / 1000).toFixed(0)}K`, label: "20-yr net return" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-xl font-extrabold mb-0.5" style={goldGradText}>{val}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {!calcResult && (
              <p className="text-center text-xs text-muted-foreground pt-2">Adjust the slider and click Calculate</p>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-28 bg-secondary/20 border-y border-border">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <div className="section-label mb-3">FAQ</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Questions, <span style={goldGradText}>Answered</span>
            </h2>
            <p className="text-muted-foreground">Everything you need to know before going solar.</p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="gold-border-card bg-card rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <h3 className="text-sm font-semibold" style={{ fontFamily: "'Hagrid', sans-serif" }}>{faq.q}</h3>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ color: "#C9A400", transform: activeFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </div>
                {activeFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="py-24 max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-3">Stay Informed</div>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ fontFamily: "'Hagrid', sans-serif" }}>
              Get Solar Insights <span style={goldGradText}>Every Month</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">Industry news, exclusive tips on maximising your system output, government incentive updates, and first access to Santerra promotions — delivered monthly, never spammy.</p>
          </div>

          <div>
            {subscribed ? (
              <div className="gold-border-card bg-card rounded-3xl p-8 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(201,164,0,0.15)" }}>
                  <Check size={24} style={{ color: "#C9A400" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Hagrid', sans-serif" }}>You're in!</h3>
                <p className="text-sm text-muted-foreground">Welcome to the Santerra community. Expect your first issue next month.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="gold-border-card bg-card rounded-3xl p-7 flex flex-col gap-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl text-sm bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl text-sm font-bold text-primary-foreground hover:opacity-90 hover:scale-[1.02] active:scale-100 transition-all flex items-center justify-center gap-2"
                  style={{ background: goldGrad }}
                >
                  Subscribe to Newsletter <Send size={16} />
                </button>
                <p className="text-xs text-center text-muted-foreground">No spam. Unsubscribe any time. We respect your privacy.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="contact" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1A1200 0%, #0F0A00 50%, #0A0800 100%)" }} />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(201,164,0,0.18) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="section-label">Limited Availability</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "'Hagrid', sans-serif" }}>
            Ready to Eliminate <br /><span style={goldGradText}>Your Electricity Bill?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Book your free, no-obligation consultation today. Our energy experts will assess your site, design a custom system, and provide a detailed proposal — at zero cost to you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="tel:+2347019650513" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-primary-foreground hover:scale-105 hover:shadow-[0_0_30px_rgba(201,164,0,0.4)] active:scale-95 transition-all" style={{ background: goldGrad }}>
              <Phone size={18} /> Get a Quote
            </a>
            <a href="mailto:hello@santerrasolar.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-foreground border border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10 transition-all">
              <Mail size={18} /> Send an Enquiry
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {["No upfront commitment", "Response within 2 hours", "Certified engineers only", "Price-match guarantee"].map(item => (
              <span key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={14} style={{ color: "#C9A400" }} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <ImageWithFallback src={logoSrc} alt="Santerra Solar" className="w-[110px] h-auto object-contain mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Nigeria's leading solar energy company — designing, installing, and supporting premium solar systems since 2014.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <Linkedin size={16} />, href: "#" },
                  { icon: <Facebook size={16} />, href: "#" },
                  { icon: <Twitter size={16} />, href: "#" },
                  { icon: <Instagram size={16} />, href: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.href} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-bold mb-5" style={{ fontFamily: "'Hagrid', sans-serif" }}>Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About Us", "Services", "Pricing", "Projects", "Blog", "FAQ", "Contact"].map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-bold mb-5" style={{ fontFamily: "'Hagrid', sans-serif" }}>Services</h4>
              <ul className="space-y-3">
                {["Solar Consultation", "System Design", "Equipment Supply", "Installation", "Maintenance", "Energy Optimisation", "Battery Storage", "Commercial Solar"].map(s => (
                  <li key={s}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold mb-5" style={{ fontFamily: "'Hagrid', sans-serif" }}>Contact</h4>
              <ul className="space-y-4">
                {[
                  { icon: <MapPin size={15} />, val: "14 Solar Drive, Maitama District, Abuja, Nigeria" },
                  { icon: <Phone size={15} />, val: "+234 701 965 0513" },
                  { icon: <Mail size={15} />, val: "hello@santerrasolar.com" },
                ].map(({ icon, val }) => (
                  <li key={val} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: "#C9A400" }}>{icon}</span>
                    {val}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "'Hagrid', sans-serif" }}>Newsletter</h4>
                <div className="flex gap-2">
                  <input type="email" placeholder="Your email" className="flex-1 px-3 py-2.5 rounded-xl text-xs bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 min-w-0" />
                  <button className="px-3 py-2.5 rounded-xl text-primary-foreground flex-shrink-0" style={{ background: goldGrad }}>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2026 Santerra Solar. All Rights Reserved.</p>
            <div className="flex gap-5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
                <a key={link} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Buttons ── */}
      {/* WhatsApp */}
      <a
        href="https://wa.me/2347019650513"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all relative"
        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
        aria-label="Chat on WhatsApp"
      >
        <span className="pulse-ring" />
        <MessageCircle size={24} fill="white" />
      </a>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* ── Live Chat Widget ── */}
      <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">

        {/* Chat panel */}
        {chatOpen && (
          <div
            className="chat-panel mb-3 w-[320px] max-w-[calc(100vw-5rem)] rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
            style={{ border: "1px solid rgba(201,164,0,0.2)" }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #1A1400 0%, #0F0C00 100%)", borderBottom: "1px solid rgba(201,164,0,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: goldGrad }}
                >
                  <Zap size={16} style={{ color: "#080809" }} />
                </div>
                <div>
                  <div className="text-sm font-bold leading-tight" style={{ fontFamily: "'Object Sans', 'DM Sans', sans-serif", color: "#F9F9FB" }}>
                    Santerra Solar
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">Online — typical reply in minutes</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(201,164,0,0.12)", color: "#C9A400" }}
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-5 space-y-5" style={{ background: "#0A0A0E" }}>

              {/* Welcome message bubble */}
              <div className="msg-in flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: goldGrad }}
                >
                  <Zap size={13} style={{ color: "#080809" }} />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed"
                  style={{
                    background: "#151519",
                    border: "1px solid rgba(201,164,0,0.12)",
                    color: "#F9F9FB",
                    fontFamily: "'Inter', sans-serif",
                    maxWidth: "calc(100% - 2.75rem)",
                  }}
                >
                  👋 Welcome to <strong style={{ color: "#C9A400" }}>Santerra Solar!</strong> How can we help you today?
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "rgba(201,164,0,0.1)" }} />
                <span style={{ fontSize: "0.65rem", color: "#7A7A8C", fontFamily: "'Object Sans', 'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Quick Actions
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(201,164,0,0.1)" }} />
              </div>

              {/* Quick action buttons */}
              <div className="flex flex-col gap-2.5">
                {/* Get a Quote */}
                <a
                  href="#contact"
                  onClick={() => setChatOpen(false)}
                  className="chat-quick-btn flex items-center gap-3 px-4 py-3 rounded-2xl group"
                  style={{
                    background: goldGrad,
                    fontFamily: "'Object Sans', 'DM Sans', sans-serif",
                  }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(8,8,9,0.25)" }}>
                    <FileText size={14} style={{ color: "#080809" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold leading-tight" style={{ color: "#080809" }}>Get a Quote</div>
                    <div className="text-xs opacity-70 leading-tight mt-0.5" style={{ color: "#080809" }}>Free, no-obligation estimate</div>
                  </div>
                  <ArrowRight size={14} style={{ color: "#080809", opacity: 0.7 }} />
                </a>

                {/* Talk to Sales */}
                <a
                  href="tel:+2347019650513"
                  className="chat-quick-btn action-in-2 flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: "#151519",
                    border: "1px solid rgba(201,164,0,0.2)",
                    fontFamily: "'Object Sans', 'DM Sans', sans-serif",
                  }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,164,0,0.12)" }}>
                    <Phone size={14} style={{ color: "#C9A400" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold leading-tight" style={{ color: "#F9F9FB" }}>Talk to Sales</div>
                    <div className="text-xs leading-tight mt-0.5" style={{ color: "#7A7A8C" }}>Speak with an energy advisor</div>
                  </div>
                  <ArrowRight size={14} style={{ color: "#C9A400", opacity: 0.6 }} />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2347019650513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat-quick-btn action-in-3 flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: "#0D1F12",
                    border: "1px solid rgba(37,211,102,0.2)",
                    fontFamily: "'Object Sans', 'DM Sans', sans-serif",
                  }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,211,102,0.12)" }}>
                    <MessageCircle size={14} style={{ color: "#25D366" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold leading-tight" style={{ color: "#F9F9FB" }}>WhatsApp Us</div>
                    <div className="text-xs leading-tight mt-0.5" style={{ color: "#7A7A8C" }}>+234 701 965 0513</div>
                  </div>
                  <ArrowRight size={14} style={{ color: "#25D366", opacity: 0.6 }} />
                </a>
              </div>
            </div>

            {/* Footer note */}
            <div
              className="px-5 py-3 text-center"
              style={{ background: "#080809", borderTop: "1px solid rgba(201,164,0,0.08)" }}
            >
              <span style={{ fontSize: "0.65rem", color: "#7A7A8C", fontFamily: "'Inter', sans-serif" }}>
                🔒 We never share your data. Privacy guaranteed.
              </span>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setChatOpen(o => !o)}
          key={chatOpen ? "open" : "closed"}
          className="chat-btn-pop w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground shadow-[0_8px_30px_rgba(201,164,0,0.35)] hover:shadow-[0_8px_40px_rgba(201,164,0,0.5)] hover:scale-110 active:scale-95 transition-shadow transition-transform relative"
          style={{ background: chatOpen ? "#1A1A20" : goldGrad, border: chatOpen ? "1px solid rgba(201,164,0,0.4)" : "none" }}
          aria-label={chatOpen ? "Close chat" : "Open live chat"}
        >
          {chatOpen ? (
            <X size={22} style={{ color: "#C9A400" }} />
          ) : (
            <>
              <MessageSquare size={22} style={{ color: "#080809" }} />
              {/* Notification dot */}
              <span
                className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: "#EF4444", fontSize: "0.5rem", fontWeight: 700, color: "#fff", fontFamily: "'Object Sans', 'DM Sans', sans-serif" }}
              >
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
