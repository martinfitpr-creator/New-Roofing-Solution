import React, { useState, useEffect } from 'react';
import {
  Wrench, Hammer, Shield, RefreshCw, Droplets, Calendar,
  Eye, Paintbrush, Sparkles, Droplet, Home, Building, Building2,
  Phone, Mail, Globe, MapPin, Search, ArrowLeft, ArrowRight,
  MessageSquare, Star, CheckCircle2, ChevronRight, HelpCircle,
  Clock, Newspaper, Award, AlertTriangle, Layers, ChevronDown, ListFilter, Users, ClipboardList, Play, Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';

import { SERVICES, COMPANY_INFO, BLOG_POSTS, PROJECTS_GALLERY, SERVICE_AREAS, FAQS_LIST } from './data';
import { PageId, ServiceDetail, BlogPost, LeadSubmission } from './types';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import QuoteForm from './components/QuoteForm';
import ProjectGallery from './components/ProjectGallery';
import MaterialShowcase from './components/MaterialShowcase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageId>('home');
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  // Modals / Overlays
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalService, setQuoteModalService] = useState('');
  
  // Leads Database Viewer state
  const [leads, setLeads] = useState<LeadSubmission[]>([]);

  // Close modals on Escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuoteModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Search/Filter for Service Areas
  const [areaSearch, setAreaSearch] = useState('');

  // Read leads on load & route handling from URL hash
  useEffect(() => {
    // Read local leads
    const loadLeads = () => {
      const stored = localStorage.getItem('new_roofing_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Initial mock lead for professional look
        const defaultLead: LeadSubmission[] = [
          {
            id: 'lead-1',
            fullName: 'New Solutions',
            email: 'info@newroofingsolution.co.za',
            phone: '+27 11 314 4386',
            service: 'Roof Waterproofing',
            message: 'Need a free quote to waterproof our commercial office flat concrete slab in Pretoria East.',
            date: 'June 24, 2026, 08:15 AM',
            status: 'new'
          }
        ];
        localStorage.setItem('new_roofing_leads', JSON.stringify(defaultLead));
        setLeads(defaultLead);
      }
    };
    loadLeads();

    // Event listener to reload leads when form is submitted
    const handleStorageChange = () => {
      const stored = localStorage.getItem('new_roofing_leads');
      if (stored) setLeads(JSON.parse(stored));
    };
    window.addEventListener('storage', handleStorageChange);

    // Simple Hash Router: allows external link navigation for SEO page compliance
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash) {
        // Check if hash matches a service slug
        const matchingService = SERVICES.find(s => s.slug === hash);
        if (matchingService) {
          setSelectedService(matchingService);
          setCurrentTab(hash);
        } else {
          setSelectedService(null);
          setCurrentTab(hash);
        }
      } else {
        setCurrentTab('home');
        setSelectedService(null);
      }
      setSelectedBlog(null);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial trigger
    handleHashChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateTo = (tab: PageId) => {
    // Set hash to support browser forward/back buttons and SEO URLs
    window.location.hash = tab;
    // Fallback if event doesnt fire fast enough
    const matchingService = SERVICES.find(s => s.slug === tab);
    if (matchingService) {
      setSelectedService(matchingService);
    } else {
      setSelectedService(null);
    }
    setCurrentTab(tab);
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open modal with specific preset
  const openQuoteWithService = (serviceTitle: string) => {
    setQuoteModalService(serviceTitle);
    setQuoteModalOpen(true);
  };

  // Icon mapper helper
  const renderThinIcon = (name: string, className = "h-6 w-6 text-[#B71510]") => {
    switch (name) {
      case 'Wrench': return <Wrench className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'DropletOff': return <Droplets className={className} />;
      case 'CalendarCheck': return <Calendar className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Paintbrush': return <Paintbrush className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Droplet': return <Droplet className={className} />;
      case 'Home': return <Home className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Building2': return <Building2 className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  // Update lead status
  const updateLeadStatus = (leadId: string, newStatus: 'new' | 'contacted' | 'completed') => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
    localStorage.setItem('new_roofing_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  // Delete lead
  const deleteLead = (leadId: string) => {
    const filtered = leads.filter(l => l.id !== leadId);
    localStorage.setItem('new_roofing_leads', JSON.stringify(filtered));
    setLeads(filtered);
  };

  return (
    <div className="min-h-screen bg-[#060708] text-slate-200 flex flex-col font-sans selection:bg-red-600 selection:text-white" id="roofing-app-root">
      
      {/* Dynamic Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenQuote={() => openQuoteWithService('')}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-grow">
        
        {/* ==================== 1. VIEW: HOME PAGE ==================== */}
        {currentTab === 'home' && (
          <div className="flex flex-col" id="home-view">
            
            {/* HERO SECTION */}
            <section className="relative bg-slate-950 text-white overflow-hidden min-h-[92vh] flex flex-col justify-center items-center py-24" id="home-hero">
              <div className="absolute inset-0">
                <img
                  src="/images/hero-team.jpg"
                  alt="Premium Charcoal Roofing Solutions"
                  className="w-full h-full object-cover object-[30%_center] sm:object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
              
              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-8 z-10 w-full">
                
                {/* Main Heading & Subheading */}
                <div className="flex flex-col items-center justify-center space-y-4 mb-10 sm:mb-16 -mt-28 sm:-mt-24 w-full px-4">
                  <h1 
                    className="font-['Montserrat',sans-serif] font-extrabold text-[40px] sm:text-[72px] text-white uppercase text-center leading-[1.1]"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
                  >
                    Your Roof.<br className="sm:hidden" /> Done Right.
                  </h1>
                  <p className="font-['Inter',sans-serif] font-normal text-[16px] sm:text-[20px] text-white opacity-90 text-center max-w-2xl">
                    Residential & commercial roofing across Gauteng
                  </p>
                </div>

                {/* Main Action buttons stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-xl justify-center pt-2 px-4" id="hero-cta-buttons">
                  <button
                    onClick={() => openQuoteWithService('')}
                    className="w-full sm:w-auto bg-[#F96302] hover:bg-[#d85402] text-white px-10 py-4.5 text-xs font-black uppercase tracking-[0.2em] rounded shadow-2xl hover:shadow-[#F96302]/25 hover:scale-105 active:scale-95 transition-all duration-300 text-center"
                    id="hero-btn-quote"
                  >
                    Get a Free Quote
                  </button>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/70 hover:border-white bg-black/20 hover:bg-white/10 text-white px-10 py-4.5 text-xs font-black uppercase tracking-[0.2em] rounded shadow-2xl transition-all duration-300 active:scale-95 text-center"
                    id="hero-btn-call"
                  >
                    <Phone className="h-3.5 w-3.5 text-white shrink-0" />
                    Call {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>

                {/* Small spaced uppercase trust credentials matching R & D Perez footer line */}
                <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed max-w-xl mx-auto uppercase tracking-[0.25em] font-extrabold pt-2">
                  SABS APPROVED MATERIALS • 5-YEAR WORKMANSHIP GUARANTEE • LICENSED & INSURED
                </p>

              </div>

              {/* Scroll down indicator matching screenshot */}
              <div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center select-none cursor-pointer z-10 opacity-75 hover:opacity-100 transition-opacity"
                onClick={() => {
                  const el = document.getElementById('trust-bar');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-slate-400">Scroll</p>
                <ChevronDown className="h-3.5 w-3.5 mx-auto text-slate-400 mt-1 animate-bounce" />
              </div>
            </section>



            {/* CORE SHEETING MATERIALS SHOWCASE (Corrugated, IBR, Coil) */}
            <MaterialShowcase />

            {/* OUR WORK SECTION */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 py-20" id="our-work-section">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">Latest Projects</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Our Work</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Watch our team in action. Click to view our recent roofing projects on Facebook.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { link: "https://www.facebook.com/reel/2107503786866752", title: "Project 1" },
                  { link: "https://www.facebook.com/reel/1638883697168061", title: "Project 2" },
                  { link: "https://www.facebook.com/reel/1562278371863446", title: "Project 3" },
                  { link: "https://www.facebook.com/profile.php?id=61572867532674", title: "Project 4" }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative block aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-md hover:shadow-xl hover:border-slate-500 transition-all duration-300"
                  >
                    {/* Placeholder Background (dark grey to fit theme) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 group-hover:bg-slate-800 transition-colors">
                      {/* Play Button Overlay */}
                      <div className="bg-black/50 text-white rounded-full p-4 border-2 border-white/20 group-hover:bg-[#B71510] group-hover:border-[#B71510] group-hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-lg">
                        <Play className="h-8 w-8 fill-current translate-x-0.5" />
                      </div>
                      <span className="mt-4 text-xs font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest">
                        Watch on Facebook
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="text-center pt-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61572867532674"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-slate-100 border border-slate-200 text-black text-xs font-bold uppercase tracking-wider px-8 py-4 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-md hover:shadow-[#1877F2]/25 hover:-translate-y-0.5"
                >
                  See More on Facebook
                </a>
              </div>
            </section>



            {/* SERVICES PREVIEW (6 Clean Service Cards) */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 py-20" 
              id="services-preview-section"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">Premium Solutions</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Our Core Services</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  We deliver industry-leading standards across all aspects of construction, protection, and preventative care.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.slice(0, 6).map((srv) => (
                  <div
                    key={srv.slug}
                    className="group rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md hover:border-slate-800 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900 group-hover:bg-[#B71510] transition-colors duration-300">
                        {renderThinIcon(srv.iconName, "h-6 w-6 text-[#B71510] group-hover:text-white transition-colors duration-300")}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#B71510] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                      <button
                        onClick={() => navigateTo(srv.slug)}
                        className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => openQuoteWithService(srv.title)}
                        className="rounded bg-slate-900 hover:bg-[#B71510] hover:text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-all border border-slate-800"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => navigateTo('services-overview')}
                  className="rounded-lg bg-slate-100 border border-slate-200 text-black text-xs font-extrabold uppercase tracking-wider px-6 py-3 hover:bg-slate-200 transition-all"
                >
                  Explore All 13 Services Available →
                </button>
              </div>
            </motion.section>

            {/* ABOUT SECTION (Home variant) */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-slate-950/50 border-y border-slate-900 py-20" 
              id="about-intro"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                  
                  {/* Left Column Image Overlay Frame */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative shadow-2xl border border-slate-200">
                    <img
                      src="/images/media__1782324917894.jpg"
                      alt="Expert Roofing Team South Africa"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/25"></div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-[#0e1114]/90 p-4 border border-slate-800 text-white">
                      <span className="text-[10px] font-mono text-slate-400">OUR COMMITMENT</span>
                      <p className="text-xs mt-1 font-bold">"SABS compliant roofing components engineered for long-term protection."</p>
                    </div>
                  </div>

                  {/* Right Column Text Block */}
                  <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">New Roofing Solution</span>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                      Building Roofing Solutions You Can Trust
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      NRS (New Roofing Solutions) offers residential and commercial roofing services including new roof installations, roof repairs, waterproofing, gutters, and thatching. Based in Gauteng, South Africa. Licensed, insured, SABS approved materials, 5-year workmanship guarantee.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('about')}
                        className="rounded-lg border-2 border-[#B71510] text-[#B71510] text-xs font-bold uppercase tracking-wider px-6 py-2.5 hover:bg-[#B71510] hover:text-white transition-all flex items-center gap-2"
                      >
                        About Us
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.section>

            {/* WHY CHOOSE US (Bento Grid of Value Propositions) */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 py-20" 
              id="why-choose-us-section"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">Value Proposition</span>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Why Choose Us</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Our professional service models are engineered around quality, transparency, and rapid delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                
                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">01</span>
                  <h4 className="font-sans font-bold text-slate-100 text-sm uppercase tracking-wide mb-2">
                    Experienced Roofing Specialists
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our team delivers professional roofing solutions backed by decades of collective hands-on mastercraft workmanship and certified building practices.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">02</span>
                  <h4 className="font-sans font-bold text-slate-100 text-sm uppercase tracking-wide mb-2">
                    Quality Materials and Workmanship
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    We only use premium roofing and waterproofing elements that are specifically tested and designed to withstand South Africa's harsh high-UV weather.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">03</span>
                  <h4 className="font-sans font-bold text-slate-100 text-sm uppercase tracking-wide mb-2">
                    Fast Turnaround Times
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    We understand that roofing and leak issues require immediate containment. We provide prompt diagnostic assessments and highly efficient completion times.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">04</span>
                  <h4 className="font-sans font-bold text-slate-100 text-sm uppercase tracking-wide mb-2">
                    Reliable Customer Service
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Clear lines of communication, transparent progressive site updates, and dedicated backup after-care for every home and business owner we serve.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">05</span>
                  <h4 className="font-sans font-bold text-slate-100 text-sm uppercase tracking-wide mb-2">
                    Competitive Pricing
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Receive 100% free site survey estimates and itemized pricing with zero surprise add-ons. Premium services at highly reasonable, fair rates.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">06</span>
                  <h4 className="font-sans font-bold text-slate-100 text-sm uppercase tracking-wide mb-2">
                    Solutions Built for Long-Term Performance
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our structural finishes do not just mask leak signs—we fix the underlying architecture, preventing recurrent structural decay.
                  </p>
                </div>

              </div>
            </motion.section>

            {/* PROJECTS PREVIEW GALLERY HEADER & SLIDER */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 py-20" 
              id="home-projects-preview"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-900 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">Case Studies</span>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">Our Featured Projects</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    See how our engineering and waterproofing crews deliver absolute precision in the field.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('projects')}
                  className="rounded bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold uppercase text-white hover:bg-[#B71510] transition-colors tracking-wider"
                >
                  View All Project Galleries →
                </button>
              </div>

              {/* Embed ProjectGallery for instant user pleasure */}
              <ProjectGallery />
            </motion.section>

            {/* ROTATING TESTIMONIALS SLIDER */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 text-white py-20 overflow-hidden" 
              id="testimonials"
            >
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">TESTIMONIALS</span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">Client Satisfaction Guarantees</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  
                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/60 relative flex flex-col justify-between">
                    <div>
                      <div className="flex text-amber-400 mb-3">
                        <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                      </div>
                      <p className="text-xs text-white italic leading-relaxed mb-4">
                        "Professional from start to finish. The workmanship on our townhouse roof replacement was excellent, and the team delivered exactly what was promised under budget."
                      </p>
                    </div>
                    <div className="text-left">
                      <strong className="text-xs block text-white">Adriaan du Plessis</strong>
                      <span className="text-[10px] text-slate-400">Sandton, Johannesburg</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/60 relative flex flex-col justify-between">
                    <div>
                      <div className="flex text-amber-400 mb-3">
                        <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                      </div>
                      <p className="text-xs text-white italic leading-relaxed mb-4">
                        "Reliable, responsive, and great quality work. They came out on short notice during a heavy storm to patch a serious leak and followed up to make it permanent."
                      </p>
                    </div>
                    <div className="text-left">
                      <strong className="text-xs block text-white">Lerato Mofokeng</strong>
                      <span className="text-[10px] text-slate-400">Pretoria East</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/60 relative flex flex-col justify-between">
                    <div>
                      <div className="flex text-amber-400 mb-3">
                        <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                      </div>
                      <p className="text-xs text-white italic leading-relaxed mb-4">
                        "Our new Chromadek roof looks fantastic and the entire process was stress-free. Very clean crew, SANS certified trusses. Five stars!"
                      </p>
                    </div>
                    <div className="text-left">
                      <strong className="text-xs block text-white">Devon Smith</strong>
                      <span className="text-[10px] text-slate-400">Durbanville, Cape Town</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.section>

            {/* LARGE CENTERED CTA FOR ESTIMATE */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20" 
              id="home-quote-panel"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 md:p-12 text-center relative overflow-hidden shadow-xl border border-slate-800" id="home-cta-block">
                
                {/* Decorative SVG house structure background */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
                  <Logo size={250} iconOnly={true} />
                </div>

                <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight !text-white" style={{color: '#ffffff'}}>
                    Need Professional Roofing Services?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    Speak to our team today for expert advice, structural site assessments, and a comprehensive free quotation.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <button
                      onClick={() => openQuoteWithService('')}
                      className="rounded-lg bg-[#F96302] hover:bg-[#d85402] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-[#F96302]/25 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      Get a Free Quote
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="rounded-lg bg-white text-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow hover:bg-slate-100 transition-all flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-[#0938BC]" />
                      Call Now: {COMPANY_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>

          </div>
        )}


        {/* ==================== 2. VIEW: ABOUT US PAGE ==================== */}
        {currentTab === 'about' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="about-view">
            
            <div className="border-b border-slate-900 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">KNOW OUR BRAND</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase mt-1">About New Roofing Solution</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Building better roofs, protecting what matters most throughout South Africa.</p>
            </div>

            {/* Our Story Grid */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                  <span className="h-6 w-1.5 bg-[#B71510] rounded-full"></span>
                  Our Story
                </h3>
                <p className="font-['Inter',sans-serif] font-normal text-[16px] leading-[1.7] text-[#333333]">
                  Established with a commitment to elevate construction and engineering practices in South Africa, New Roofing Solution has grown from a local residential repair team into a recognized structural roofing enterprise.
                </p>
                <p className="font-['Inter',sans-serif] font-normal text-[16px] leading-[1.7] text-[#333333]">
                  We observed that South African property owners were frequently plagued by recurring roof leaks, sub-standard timber installations, and short-lived waterproofing coats. We dedicated our business to utilizing superior quality SABS elements, hiring certified structural woodwrights, and guaranteeing our labor with solid warranties.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 relative group h-full max-h-[400px]">
                <img
                  src="/images/media__1782324675986.jpg"
                  alt="Roofing Installation Process"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Our Mission, Values, and Quality Policy (Three Column Cards) */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              
              <div className="rounded-xl bg-[#0e1114] p-6 border border-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center text-[#B71510]">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-sans font-bold text-slate-100 text-sm uppercase">Our Mission</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To secure residential complexes, business parks, and massive industrial warehouse footprints with durable, high-performance roof coatings, installations, and waterproofing structures that safeguard physical investments.
                </p>
              </div>

              <div className="rounded-xl bg-[#0e1114] p-6 border border-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center text-[#B71510]">
                  <Shield className="h-5 w-5" />
                </div>
                <h4 className="font-sans font-bold text-slate-100 text-sm uppercase">Our Values</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A commitment to absolute SANS code compliance, professional accountability, rapid leak containment, honest structural reviews, and the utilization of environmentally sustainable insulation systems.
                </p>
              </div>

              <div className="rounded-xl bg-[#0e1114] p-6 border border-slate-900 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-[#F96302]/10 flex items-center justify-center text-[#F96302]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h4 className="font-sans font-bold text-slate-100 text-sm uppercase">Our Commitment to Quality</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We enforce rigid Quality Inspections upon every completed phase. No project is finalized until flashing is waterproof-tested and our strict structural compliance standards are met.
                </p>
              </div>

            </div>

            {/* Industrial & Commercial Scale Expertise info */}
            <div className="rounded-xl bg-slate-900 text-white p-8 space-y-4">
              <span className="text-[10px] tracking-widest text-[#B71510] font-bold uppercase block">INDUSTRIAL & COMMERCIAL FOOTPRINT</span>
              <h3 className="text-xl font-bold uppercase">SANS Code Compliant Truss Engineering</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                We handle heavy large-scale complex conversions: converting heavy, hazard-prone concrete tiles to light metal profiles, configuring massive continuous standing seam runs, and treating severe industrial warehouse leak valleys. We maintain active safety files, full COIDA standing, and comprehensive public liability insurances for commercial property assets.
              </p>
            </div>

            {/* Quote Form Embed for rapid contact */}
            <div className="max-w-xl mx-auto pt-4">
              <QuoteForm />
            </div>

          </div>
        )}


        {/* ==================== 3. VIEW: SERVICES OVERVIEW ==================== */}
        {currentTab === 'services-overview' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="services-overview-view">
            
            <div className="border-b border-slate-900 pb-6 text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">PREVENTATIVE & STRUCTURAL ENGINEERING</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">Roofing Services in South Africa</h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                New Roofing Solution provides comprehensive roofing services throughout South Africa. Whether you require a new roof installation, emergency roof repairs, waterproofing, or preventative maintenance, our experienced team delivers reliable and professional solutions tailored to your property's needs.
              </p>
            </div>

            {/* Grid of All 13 Services */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-xl border border-slate-900 bg-[#0e1114] p-6 shadow-sm hover:shadow-md transition-all hover:border-slate-800 flex flex-col justify-between"
                  id={`service-card-${srv.slug}`}
                >
                  <div>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900">
                      {renderThinIcon(srv.iconName, "h-5 w-5 text-[#B71510]")}
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-100 mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                    <button
                      onClick={() => navigateTo(srv.slug)}
                      className="text-xs font-bold text-red-400 hover:text-red-500 transition-all flex items-center gap-1"
                    >
                      View Full Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => openQuoteWithService(srv.title)}
                      className="rounded bg-slate-850 hover:bg-[#B71510] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all border border-slate-800"
                    >
                      Free Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}


        {/* ==================== 4. VIEW: DYNAMIC SERVICE SUBPAGES ==================== */}
        {selectedService && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="dynamic-service-view">
            
            {/* Navigation back button */}
            <button
              onClick={() => navigateTo('services-overview')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0938BC] hover:text-[#B71510] transition-colors focus:outline-none"
              id="btn-back-to-services"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Services
            </button>

            {/* Service Title Block */}
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">SERVICE DETAILS & PROCEDURES</span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase mt-1">
                  {selectedService.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">{selectedService.shortDesc}</p>
              </div>

              {/* Direct Quick call to Action buttons */}
              <div className="flex gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-[#B71510]" />
                  {COMPANY_INFO.phoneDisplay}
                </a>
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solution, I need a quote for ${selectedService.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#F96302] hover:bg-[#d85402] hover:scale-105 active:scale-95 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Get a Quote
                </a>
              </div>
            </div>

            {/* Service detail page visual rows */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              
              {/* Left Column: Extensive details + Benefits */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Core description card */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Overview</h3>
                  <p className="font-['Inter',sans-serif] font-normal text-[16px] leading-[1.7] text-[#333333]">
                    {selectedService.description} At New Roofing Solution, we believe that roof work is more than just raw construction materials; it represents long-term protection, insulation efficiency, and solid financial security for your home or corporate premises.
                  </p>
                </div>

                {/* Benefits Bullet Points */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#B71510] rounded-full inline-block"></span>
                    Benefits & Value Gains
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {selectedService.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                        <CheckCircle2 className="h-4 w-4 text-[#B71510] shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 leading-normal">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Our Operational Process Steps */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                    Our Installation & Repair Process
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {selectedService.process.map((step, idx) => (
                      <div key={idx} className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#B71510]">{step.step}</span>
                          <span className="h-1 w-8 bg-[#B71510]/15 rounded-full inline-block"></span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs uppercase">{step.title}</h4>
                        <p className="text-[11px] text-slate-700 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specific Subpage FAQs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                    Service Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {selectedService.faqs.map((faq, i) => (
                      <div key={i} className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                        <strong className="text-xs block text-slate-900 font-sans uppercase tracking-wide mb-1">Q: {faq.q}</strong>
                        <p className="text-xs text-slate-700 leading-relaxed">A: {faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Quote Form and SEO Keywords context */}
              <div className="space-y-6">
                
                {/* Sticky quote module focused on this service */}
                <div className="sticky top-28 space-y-6">
                  
                  <QuoteForm preselectedService={selectedService.title} />

                  {/* SEO Keyword Context Indicator (for Google Search optimization transparent display) */}
                  <div className="rounded-xl bg-slate-900 text-white p-5 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 text-[#B71510] text-[10px] font-mono font-bold uppercase tracking-wider">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      SEO Meta Optimization context
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block">Target Keywords for Google Indexing:</span>
                    <p className="text-[11px] font-mono text-slate-300 italic bg-slate-950 p-2.5 rounded leading-relaxed border border-slate-800">
                      {selectedService.seoKeywords}
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}


        {/* ==================== 5. VIEW: PROJECTS GALLERY PAGE ==================== */}
        {currentTab === 'projects' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8" id="projects-view">
            
            <div className="border-b border-slate-900 pb-6 text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">PROOF OF EXCELLENCE</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">Our Roofing Projects Across South Africa</h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Showcasing completed residential townhouses, commercial parks, flat slabs waterproofing, and heavy industrial warehouse sheet installations. Toggle Before & After states to inspect workmanship.
              </p>
            </div>

            {/* Embedded custom filterable gallery component */}
            <ProjectGallery />

          </div>
        )}


        {/* ==================== 6. VIEW: SERVICE AREAS PAGE ==================== */}
        {currentTab === 'service-areas' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="service-areas-view">
            
            <div className="border-b border-slate-900 pb-6 text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">NATIONWIDE COVERAGE</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">Roofing Services Throughout South Africa</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                New Roofing Solution proudly provides professional roofing services across major South African urban zones.
              </p>
            </div>

            {/* Area Search Input filter */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative flex items-center" id="service-area-search">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search South African towns, e.g. Sandton, Pretoria, Durban..."
                  value={areaSearch}
                  onChange={(e) => setAreaSearch(e.target.value)}
                  className="w-full rounded-full border border-slate-800 bg-[#0e1114] py-3 pl-12 pr-4 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#B71510] focus:outline-none focus:ring-1 focus:ring-[#B71510] transition-all"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-400">Quick Filters:</span>
                {['Sandton', 'Pretoria', 'Cape Town', 'Durban', 'Gauteng'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setAreaSearch(tag)}
                    className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#B71510] hover:border-[#B71510] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
                {areaSearch && (
                  <button
                    onClick={() => setAreaSearch('')}
                    className="text-red-400 font-bold hover:underline ml-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Grid of service regions */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" id="service-areas-grid">
              {SERVICE_AREAS.filter(area => 
                area.city.toLowerCase().includes(areaSearch.toLowerCase()) || 
                area.region.toLowerCase().includes(areaSearch.toLowerCase())
              ).map((area) => (
                <div key={area.city} className="rounded-xl border border-slate-900 bg-[#0e1114] p-5 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B71510] font-mono">📍 {area.city}</span>
                    <span className="rounded bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-300">
                      {area.region}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {area.details}
                  </p>
                  <div className="pt-2 border-t border-slate-900 flex justify-between">
                    <a
                      href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I am in ${area.city}, and I would like to request a free quote for my roof.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#F96302] hover:text-[#d85402] hover:scale-105 active:scale-95 font-extrabold uppercase transition-all duration-300 flex items-center gap-1"
                    >
                      GET A FREE QUOTE IN {area.city.toUpperCase()} →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder Graphic with SEO context */}
            <div className="rounded-xl bg-[#0e1114] p-6 text-center border border-slate-900 space-y-4 max-w-2xl mx-auto">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">SANS Code Compliant Logistics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether you have a severe leak in Johannesburg, a flat roof waterproofing request in Durban, or wind-damaged sheets in Cape Town, our logistics crews are fully equipped to deliver prompt materials dispatch and structural engineering sign-offs locally.
              </p>
            </div>

          </div>
        )}


        {/* ==================== 7. VIEW: FAQS PAGE ==================== */}
        {currentTab === 'faqs' && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10" id="faqs-view">
            
            <div className="border-b border-slate-900 pb-6 text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">QUESTIONS & CLARIFICATIONS</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">Frequently Asked Questions</h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Clear answers regarding roofing costs, warranties, compliance, and material lifespans in South Africa.
              </p>
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-4" id="faqs-accordions">
              {FAQS_LIST.map((faq, index) => (
                <div key={index} className="rounded-xl border border-slate-900 bg-[#0e1114] p-5 shadow-sm space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-[#B71510] shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center rounded-xl bg-[#0e1114] p-6 border border-slate-900 max-w-xl mx-auto space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase">Have a specific question not listed?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our head structural estimator is online and ready to answer complex engineering queries directly via email or phone call.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="rounded bg-[#B71510] hover:bg-[#9c120d] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Send Us an Enquiry
              </button>
            </div>

          </div>
        )}


        {/* ==================== 8. VIEW: BLOG PAGE ==================== */}
        {currentTab === 'blog' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="blog-view">
            
            {/* If a specific blog article is selected, view it in detail */}
            {selectedBlog ? (
              <div className="max-w-3xl mx-auto space-y-8" id="blog-detail-view">
                
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0938BC] hover:text-[#B71510] focus:outline-none"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Articles
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="uppercase text-[#B71510] font-bold">{selectedBlog.category}</span>
                    <span>•</span>
                    <span>{selectedBlog.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedBlog.readTime}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 uppercase leading-tight">
                    {selectedBlog.title}
                  </h1>
                </div>

                {/* Sub-hero blog image placeholder */}
                <div className="aspect-video sm:aspect-auto sm:absolute sm:inset-y-0 sm:right-0 sm:w-1/2">
                  <img
                    src="/images/media__1782324325894.jpg"
                    alt="Premium Roofing Materials"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/10"></div>
                </div>

                {/* Article Content paragraphs */}
                <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedBlog.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-6 rounded-xl">
                  <div className="text-center sm:text-left">
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Need assistance with your roof?</h4>
                    <p className="text-xs text-slate-500 mt-1">Get an expert site check and transparent quote within hours.</p>
                  </div>
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I read your article "${selectedBlog.title}" and would like to request a free quote.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#F96302] hover:bg-[#d85402] hover:scale-105 hover:shadow-lg text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 transition-all duration-300"
                  >
                    GET A FREE QUOTE
                  </a>
                </div>

              </div>
            ) : (
              <div className="space-y-10">
                <div className="border-b border-slate-900 pb-6 text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">EDUCATIONAL GUIDES & ADVICE</span>
                  <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">Roofing Insights Blog</h1>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Read expert articles regarding pricing structures, materials comparison, and waterproofing benefits in South Africa.
                  </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" id="blog-grid-list">
                  {BLOG_POSTS.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col justify-between rounded-xl border border-slate-900 bg-[#0e1114] p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-800"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                          <span className="uppercase text-[#B71510] font-bold">{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-sans font-bold text-slate-100 text-base leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-450 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-900 mt-4 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedBlog(post)}
                          className="text-xs font-bold text-[#B71510] hover:text-red-400 flex items-center gap-1"
                        >
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-[10px] text-slate-400">{post.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}


        {/* ==================== 9. VIEW: CONTACT US PAGE ==================== */}
        {currentTab === 'contact' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="contact-view">
            
            <div className="border-b border-slate-900 pb-6 text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">CONNECT WITH US</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">Get Your Free Roofing Quote Today</h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Need professional roofing services in South Africa? Our experienced team is ready to assist with roof installations, repairs, waterproofing, maintenance, and inspections.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              
              {/* Left Column: Form */}
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-6">
                  <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide mb-4">
                    Get In Touch
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Fill out our simplified digital quote calculator below. You can submit it directly to our lead management base, or request instant dispatch coordination via WhatsApp!
                  </p>
                  
                  {/* Reuse our gorgeous QuoteForm here */}
                  <QuoteForm compact={true} />
                </div>
              </div>

              {/* Right Column: Address Cards & Details */}
              <div className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                    Our Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="rounded-xl border border-slate-900 bg-[#0e1114] p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-3"
                    >
                      <div className="rounded bg-[#B71510]/10 p-2 text-[#B71510] mt-0.5">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Phone Call</span>
                        <strong className="text-xs block text-slate-200 mt-1">{COMPANY_INFO.phoneDisplay}</strong>
                        <span className="text-[10px] text-slate-500">Free telephonic support</span>
                      </div>
                    </a>

                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="rounded-xl border border-slate-900 bg-[#0e1114] p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-3"
                    >
                      <div className="rounded bg-[#B71510]/10 p-2 text-[#B71510] mt-0.5">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Email Address</span>
                        <strong className="text-xs block text-slate-200 mt-1">{COMPANY_INFO.email}</strong>
                        <span className="text-[10px] text-slate-500">Typical response in 1 hour</span>
                      </div>
                    </a>

                    <div className="rounded-xl border border-slate-900 bg-[#0e1114] p-5 shadow-sm flex items-start gap-3 sm:col-span-2">
                      <div className="rounded bg-slate-900 p-2 text-slate-400 mt-0.5">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Official Website</span>
                        <strong className="text-xs block text-slate-200 mt-1">{COMPANY_INFO.website}</strong>
                        <p className="text-[11px] text-slate-400 leading-normal mt-1">
                          Our portal is secure, SEO-optimized, and configured for rapid dispatch routing to Johannesburg, Pretoria, Cape Town, and Durban.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#B71510]/20 bg-[#B71510]/5 p-5 shadow-sm flex items-start gap-3 sm:col-span-2" id="physical-address-card">
                      <div className="rounded bg-[#B71510]/10 p-2 text-[#B71510] mt-0.5">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Business Physical Address</span>
                        <strong className="text-xs block text-black mt-1">{COMPANY_INFO.address}</strong>
                        <p className="text-[11px] text-slate-400 leading-normal mt-1">
                          Our primary administrative depot and raw material fabrication hub in Glen Austin, Midrand. Let's arrange a site inspection.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* SABS compliance trust board */}
                <div className="rounded-xl bg-slate-950 text-white p-6 border border-slate-900 space-y-3">
                  <h4 className="text-xs font-bold text-slate-100 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#B71510]" />
                    Guaranteed Protection Policies
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every new installation completed by New Roofing Solution carries a minimum 5-year structural warranty, while our torch-on concrete slab waterproofing structures carry formal material certificates to guarantee zero leaks.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* ==================== FOOTER SECTION ==================== */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-8" id="main-app-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" id="footer-links-grid">
            
            {/* Column 1: Logo & Tagline */}
            <div className="space-y-4">
              <div className="flex justify-start">
                <img src="/images/nrs-main-logo.png" alt="New Roofing Solutions" className="h-16 w-auto" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                "{COMPANY_INFO.tagline}" <br />
                {COMPANY_INFO.taglineAlternative}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[10px] font-mono text-slate-400 px-3 py-1">
                  🇿🇦 Proudly South African Enterprise
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B71510]">Navigate Site</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => navigateTo('home')} className="hover:text-[#B71510] transition-colors">Home Page</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-[#B71510] transition-colors">About Our Team</button></li>
                <li><button onClick={() => navigateTo('projects')} className="hover:text-[#B71510] transition-colors">Projects Gallery</button></li>
                <li><button onClick={() => navigateTo('service-areas')} className="hover:text-[#B71510] transition-colors">Our Service Areas</button></li>
                <li><button onClick={() => navigateTo('faqs')} className="hover:text-[#B71510] transition-colors">Frequently Asked Questions</button></li>
                <li><button onClick={() => navigateTo('blog')} className="hover:text-[#B71510] transition-colors">Our Blog Articles</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-[#B71510] transition-colors">Get Free Quote</button></li>
              </ul>
            </div>

            {/* Column 3: Featured Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B71510]">Key Services</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {SERVICES.slice(0, 5).map((srv) => (
                  <li key={srv.slug}>
                    <button onClick={() => navigateTo(srv.slug)} className="hover:text-[#B71510] text-left transition-colors">
                      {srv.title}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigateTo('services-overview')} className="text-slate-400 hover:text-white font-bold transition-colors">
                    View All 13 Services →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & SEO footer checklist */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B71510]">Immediate Assistance</h4>
              <div className="space-y-2 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#B71510]" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#B71510] transition-all">
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#B71510]" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#B71510] transition-all break-all">
                    {COMPANY_INFO.email}
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#B71510] shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-normal">
                    {COMPANY_INFO.address}
                  </span>
                </p>
                <p className="text-[10px] text-slate-400 leading-normal pt-2 border-t border-slate-900">
                  Ranked for: <strong className="text-slate-300">Roofing Company South Africa, Waterproofing Contractors, Emergency Roof Repairs.</strong>
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500" id="footer-copyright-row">
            <p>New Roofing Solution. All rights reserved. SABS Compliant. Built for lasting protection.</p>
            
            <div className="flex items-center gap-4">
              <span>www.newroofingsolutios.co.za</span>
            </div>
          </div>

        </div>
      </footer>


      {/* ==================== 10. CONVERSION SYSTEM: FLOATING & STICKY WHATSAPP BUTTONS ==================== */}
      <WhatsAppButton
        contextMessage={`Hi New Roofing Solution, I'm visiting your website and would like to coordinate a free quotation.`}
        onOpenQuoteModal={() => openQuoteWithService('')}
      />


      {/* ==================== 11. GENERAL POPUP MODAL: FREE QUOTE FOR CLIENT CONVERSION ==================== */}
      {quoteModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm cursor-pointer" 
          id="global-quote-modal"
          onClick={() => setQuoteModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md rounded-xl bg-[#0e1114] p-5 border border-slate-800 shadow-2xl cursor-default space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white hover:scale-110 active:scale-95 transition-all focus:outline-none z-10"
              title="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="border-b border-slate-900 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-5 bg-[#B71510] rounded-full inline-block"></span>
                Request a Free Quote
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Get professional advice & transparent South African pricing within hours.
              </p>
            </div>
            <QuoteForm
              preselectedService={quoteModalService}
              onSuccess={() => setQuoteModalOpen(false)}
              compact={true}
            />
          </div>
        </div>
      )}

      {/* Leads Portal Removed per user request */}

    </div>
  );
}

// Reuseable inline SVG close icon
function X({ className, ...props }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
