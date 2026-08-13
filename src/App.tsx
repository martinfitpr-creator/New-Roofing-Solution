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
  const renderThinIcon = (name: string, className = "h-6 w-6 text-[#E8611A]") => {
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
    <div className="min-h-screen bg-[#ffffff] text-slate-800 flex flex-col font-sans selection:bg-red-600 selection:text-slate-900" id="roofing-app-root">
      
      {/* Dynamic Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenQuote={() => openQuoteWithService('')}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-grow bg-[#ffffff]">
        
        {/* ==================== 1. VIEW: HOME PAGE ==================== */}
        {currentTab === 'home' && (
          <div className="flex flex-col" id="home-view">
            
            {/* HERO SECTION */}
            <section className="relative bg-slate-950 text-white overflow-hidden min-h-[90vh] flex flex-col justify-center items-center py-24" id="home-hero">
              <div className="absolute inset-0">
                <img
                  src="/images/nrs-hero-team.jpg"
                  alt="New Roofing Solutions Team and Operations"
                  className="w-full h-full object-cover object-[22%_center] sm:object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/55"></div>
              </div>
              
              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-8 z-10 w-full">
                
                {/* Main Heading & Subheading */}
                <div className="flex flex-col items-center justify-center space-y-4 mb-10 sm:mb-16 -mt-20 sm:-mt-16 w-full px-4">
                  <h1 
                    className="font-['Montserrat',sans-serif] font-extrabold text-[40px] sm:text-[72px] text-white uppercase text-center leading-[1.1]"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                  >
                    Your Roof Done Right
                  </h1>
                  <p className="font-['Inter',sans-serif] font-medium text-[16px] sm:text-[20px] text-white opacity-95 text-center max-w-2xl" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    Residential & commercial roofing across Gauteng
                  </p>
                </div>

                {/* Main Action buttons stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-xl justify-center pt-2 px-4" id="hero-cta-buttons">
                  <button
                    onClick={() => openQuoteWithService('')}
                    className="w-full sm:w-auto bg-[#F96302] hover:bg-[#d85402] text-white px-10 py-4.5 text-xs font-black uppercase tracking-[0.2em] rounded shadow-2xl hover:shadow-[#F96302]/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center text-center whitespace-nowrap"
                    id="hero-btn-quote"
                  >
                    Get a Free Quote
                  </button>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/80 hover:border-white bg-black/30 hover:bg-white/10 text-white px-10 py-4.5 text-xs font-black uppercase tracking-[0.2em] rounded shadow-2xl transition-all duration-300 active:scale-95 text-center"
                    id="hero-btn-call"
                  >
                    <Phone className="h-3.5 w-3.5 text-white shrink-0" />
                    Call {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>

                {/* Small spaced uppercase trust credentials matching R & D Perez footer line */}
                <p className="text-[10px] sm:text-xs text-slate-200 leading-relaxed max-w-xl mx-auto uppercase tracking-[0.25em] font-extrabold pt-2">
                  SABS APPROVED MATERIALS • 5-YEAR WORKMANSHIP GUARANTEE
                </p>

              </div>

            </section>


            {/* CORE SHEETING MATERIALS SHOWCASE (Corrugated, IBR, Coil) */}
            <MaterialShowcase />

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
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">Premium Solutions</span>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Our Core Services</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  We deliver industry-leading standards across all aspects of construction, protection, and preventative care.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.slice(0, 6).map((srv) => (
                  <div
                    key={srv.slug}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 group-hover:bg-[#E8611A] transition-colors duration-300">
                        {renderThinIcon(srv.iconName, "h-6 w-6 text-[#E8611A] group-hover:text-white transition-colors duration-300")}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#E8611A] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => navigateTo(srv.slug)}
                        className="text-xs font-bold text-[#E8611A] hover:text-[#C7510F] transition-colors flex items-center gap-1"
                      >
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => openQuoteWithService(srv.title)}
                        className="rounded-lg bg-slate-100 hover:bg-[#E8611A] hover:text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition-all border border-slate-200 shadow-sm"
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
                  className="rounded-lg bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 hover:bg-slate-800 transition-all shadow-md"
                >
                  Explore All Available Services →
                </button>
              </div>
            </motion.section>

            {/* ABOUT SECTION (Home variant with Mission Statement) */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 border-y border-slate-200 py-20" 
              id="about-intro"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                  
                  {/* Left Column Image Overlay Frame */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-slate-200">
                    <img
                      src="/images/media__1782324917894.jpg"
                      alt="Expert Roofing Team South Africa"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-sm p-4 border border-slate-200 text-slate-900 shadow-lg">
                      <span className="text-[10px] font-mono font-bold text-[#E8611A]">OUR COMMITMENT</span>
                      <p className="text-xs mt-1 font-bold text-slate-800">"SABS compliant roofing components engineered for long-term protection."</p>
                    </div>
                  </div>

                  {/* Right Column Text Block */}
                  <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">New Roofing Solution</span>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                      Building Roofing Solutions You Can Trust
                    </h2>
                    
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      New Roofing Solutions is a metal roofing and decking manufacturer that is <strong>100% black owned</strong>. We supply all types of roof sheets and deliver nationwide. Escorted by excellent quality, favourable price and good reputation, we are your choice.
                    </p>

                    {/* Mission Statement Box */}
                    <div className="rounded-xl bg-white border border-[#E8611A]/30 p-5 space-y-3 shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-[#E8611A] flex items-center justify-center text-white shrink-0">
                          <Shield className="h-4 w-4" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">Our Mission Statement</h4>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E8611A]"></span>
                          <span>Impartial employer and continuous skills developer</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E8611A]"></span>
                          <span>Unwavering reliability for homeowners and commercial clients</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#E8611A]"></span>
                          <span>High agile production without compromising SABS standards</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('about')}
                        className="rounded-lg border-2 border-[#E8611A] text-[#E8611A] text-xs font-bold uppercase tracking-wider px-6 py-2.5 hover:bg-[#E8611A] hover:text-white transition-all flex items-center gap-2 shadow-sm"
                      >
                        About Us
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.section>

            {/* OUR WORK / PORTFOLIO SECTION — POSITIONED ABOVE WHY CHOOSE US */}
            <section className="bg-white py-20 border-b border-gray-200" id="our-work-section">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">Portfolio</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">Our Work</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Real projects. Real results. A showcase of roofing excellence across residential, commercial &amp; industrial properties.
                  </p>
                </div>

                {/* Image Gallery — Hero + Grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">

                  {/* Large featured image — spans 2 rows */}
                  <div className="lg:col-span-2 lg:row-span-2 group relative rounded-2xl overflow-hidden shadow-2xl" style={{minHeight: '420px'}}>
                    <img
                      src="/images/work-nwu-building.jpg"
                      alt="Large commercial roofing project"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{minHeight: '420px'}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <span className="inline-block bg-[#E8611A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow">Commercial</span>
                      <p className="text-white font-bold text-base">Large-Scale Commercial Roofing</p>
                    </div>
                  </div>

                  {/* Top-right small */}
                  <div className="group relative rounded-2xl overflow-hidden shadow-xl" style={{minHeight: '200px'}}>
                    <img
                      src="/images/work-red-corrugated.jpg"
                      alt="Red corrugated roof installation"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{minHeight: '200px'}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-[#E8611A] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow">Residential</span>
                    </div>
                  </div>

                  {/* Bottom-right small */}
                  <div className="group relative rounded-2xl overflow-hidden shadow-xl" style={{minHeight: '200px'}}>
                    <img
                      src="/images/work-grey-aerial.jpg"
                      alt="Aerial view grey metal roof"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{minHeight: '200px'}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow">Residential</span>
                    </div>
                  </div>
                </div>

                {/* Secondary row of 4 smaller images */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { src: '/images/work-white-corrugated.jpg', label: 'Corrugated Sheeting' },
                    { src: '/images/work-warehouse.jpg', label: 'Industrial' },
                    { src: '/images/work-ud-trucks.jpg', label: 'Commercial' },
                    { src: '/images/work-industrial.jpg', label: 'Industrial' },
                  ].map((item, i) => (
                    <div key={i} className="group relative rounded-xl overflow-hidden shadow-md" style={{height: '180px'}}>
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                      <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-white uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* See More CTA */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61572867532674"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 hover:bg-[#0e5fc0] transition-all shadow-md hover:shadow-[#1877F2]/30 hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    See More on Facebook
                  </a>
                  <a
                    href={COMPANY_INFO.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#010101] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 hover:bg-[#333] transition-all shadow-md hover:-translate-y-0.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
                    See More on TikTok
                  </a>
                </div>

                {/* Trusted By — Client Logos (real images, no labels) */}
                <div className="border-t border-gray-200 pt-10 space-y-6">
                  <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">Trusted By</p>
                  <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
                    {/* NWU */}
                    <div className="group hover:scale-110 transition-transform duration-300">
                      <img
                        src="/images/logo-nwu.png"
                        alt="NWU - North-West University"
                        className="h-16 w-auto object-contain filter drop-shadow-md"
                      />
                    </div>
                    {/* Boitumelo */}
                    <div className="group hover:scale-110 transition-transform duration-300">
                      <img
                        src="/images/logo-boitumelo.png"
                        alt="Boitumelo"
                        className="h-16 w-auto object-contain filter drop-shadow-md"
                      />
                    </div>
                    {/* UD Trucks */}
                    <div className="group hover:scale-110 transition-transform duration-300">
                      <img
                        src="/images/logo-ud-trucks.png"
                        alt="UD Trucks"
                        className="h-14 w-auto object-contain filter drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </section>

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
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">Value Proposition</span>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Why Choose Us</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Our professional service models are engineered around quality, transparency, and rapid delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                
                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">01</span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">
                    Experienced Roofing Specialists
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our team delivers professional roofing solutions backed by decades of collective hands-on mastercraft workmanship and certified building practices.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">02</span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">
                    Quality Materials and Workmanship
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We only use premium roofing and waterproofing elements that are specifically tested and designed to withstand South Africa's harsh high-UV weather.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">03</span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">
                    Fast Turnaround Times
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We understand that roofing and leak issues require immediate containment. We provide prompt diagnostic assessments and highly efficient completion times.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">04</span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">
                    Reliable Customer Service
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Clear lines of communication, transparent progressive site updates, and dedicated backup after-care for every home and business owner we serve.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">05</span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">
                    Competitive Pricing
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Receive 100% free site survey estimates and itemized pricing with zero surprise add-ons. Premium services at highly reasonable, fair rates.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all">
                  <span className="text-3xl font-black text-slate-800 block mb-2">06</span>
                  <h4 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">
                    Solutions Built for Long-Term Performance
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our structural finishes do not just mask leak signs - we fix the underlying architecture, preventing recurrent structural decay.
                  </p>
                </div>

              </div>
            </motion.section>



            {/* ROTATING TESTIMONIALS SLIDER */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-[#f9fafb] py-20 overflow-hidden"
              id="testimonials"
            >
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">Testimonials</span>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">What Our Clients Say</h2>
                  <p className="text-sm text-slate-500 max-w-lg mx-auto">Trusted by homeowners and businesses across South Africa</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                  <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300">
                    <span className="absolute top-5 right-6 text-6xl text-[#E8611A] font-serif leading-none opacity-20 select-none">"</span>
                    <div>
                      <div className="flex text-amber-400 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed mb-6">
                        "Professional from start to finish. The workmanship on our townhouse roof replacement was excellent, and the team delivered exactly what was promised under budget."
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="h-10 w-10 rounded-full bg-[#E8611A] flex items-center justify-center text-white font-black text-sm shrink-0">A</div>
                      <div>
                        <strong className="text-sm block text-slate-900">Adriaan du Plessis</strong>
                        <span className="text-xs text-slate-500">Sandton, Johannesburg</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300">
                    <span className="absolute top-5 right-6 text-6xl text-[#E8611A] font-serif leading-none opacity-20 select-none">"</span>
                    <div>
                      <div className="flex text-amber-400 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed mb-6">
                        "Reliable, responsive, and great quality work. They came out on short notice during a heavy storm to patch a serious leak and followed up to make it permanent."
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="h-10 w-10 rounded-full bg-[#E8611A] flex items-center justify-center text-white font-black text-sm shrink-0">L</div>
                      <div>
                        <strong className="text-sm block text-slate-900">Lerato Mofokeng</strong>
                        <span className="text-xs text-slate-500">Pretoria East</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative group hover:-translate-y-1 transition-transform duration-300">
                    <span className="absolute top-5 right-6 text-6xl text-[#E8611A] font-serif leading-none opacity-20 select-none">"</span>
                    <div>
                      <div className="flex text-amber-400 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                      </div>
                      <p className="text-slate-800 text-sm leading-relaxed mb-6">
                        "Our new Chromadek roof looks fantastic and the entire process was stress-free. Very clean crew, SANS certified trusses. Five stars!"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="h-10 w-10 rounded-full bg-[#E8611A] flex items-center justify-center text-white font-black text-sm shrink-0">D</div>
                      <div>
                        <strong className="text-sm block text-slate-900">Devon Smith</strong>
                        <span className="text-xs text-slate-500">Waterfall Estate, Midrand</span>
                      </div>
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
              <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-slate-800" id="home-cta-block">
                
                {/* Decorative SVG house structure background */}
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
                  <Logo size={250} iconOnly={true} />
                </div>

                <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white" style={{color: '#ffffff'}}>
                    Need Professional Roofing Services?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed" style={{color: '#cbd5e1'}}>
                    Speak to our team today for expert advice, structural site assessments, and a comprehensive free quotation.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <button
                      onClick={() => openQuoteWithService('')}
                      className="rounded-lg bg-[#F96302] hover:bg-[#d85402] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-[#F96302]/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center text-center whitespace-nowrap"
                    >
                      Get a Free Quote
                    </button>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="rounded-lg bg-white text-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-[#F96302]" />
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
            
            <div className="border-b border-gray-200 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">KNOW OUR BRAND</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase mt-1">About New Roofing Solution</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Building better roofs, protecting what matters most throughout South Africa.</p>
            </div>

            {/* Introduction Grid */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="h-6 w-1.5 bg-[#E8611A] rounded-full"></span>
                  Introduction
                </h3>
                <p className="font-['Inter',sans-serif] font-normal text-[16px] leading-[1.8] text-slate-800">
                  New Roofing Solutions is a metal roofing and decking manufacturer that is <strong>100% black owned</strong>. We supply all types of roof sheets and deliver nationwide. Escorted by excellent quality, favourable price and good reputation, we are your choice.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative group" style={{height: '320px'}}>
                <img
                  src="/images/media__1782324675986.jpg"
                  alt="Roofing Installation Process"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Vision & Mission Statement */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* Vision */}
              <div className="rounded-xl bg-[#f9fafb] border border-gray-300 p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#E8611A]/10 flex items-center justify-center text-[#E8611A]">
                    <Award className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-black text-slate-900 text-base uppercase tracking-wide">01 Vision</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "To be Africa's most preferred roof sheet manufacturer",
                    "To produce a wide range of steel products",
                    "Produce innovative steel",
                    "Protecting our environment by constantly seeking manufacturing processes that are eco friendly",
                    "Involve with community",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#E8611A] shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mission Statement */}
              <div className="rounded-xl bg-[#f9fafb] border border-[#E8611A]/30 p-8 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8611A]/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-[#E8611A] flex items-center justify-center text-slate-900">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h4 className="font-sans font-black text-slate-900 text-base uppercase tracking-wide">02 Mission Statement</h4>
                </div>
                <ul className="space-y-3">
                  {[
                    "We aim to achieve our vision by:",
                    "Being an impartial employer as well as a career and skills developer",
                    "To constantly ensure we are reliable to our customers",
                    "To constantly increase our agility in production without compromising the quality of our products",
                    "To contribute to society by providing jobs, mentorship programmes and be intentional about our CSI projects",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#E8611A] shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Industrial & Commercial Scale Expertise info */}
            <div className="rounded-xl bg-gray-100 text-slate-900 p-8 space-y-4">
              <span className="text-[10px] tracking-widest text-[#E8611A] font-bold uppercase block">INDUSTRIAL & COMMERCIAL FOOTPRINT</span>
              <h3 className="text-xl font-bold uppercase">SANS Code Compliant Truss Engineering</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
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
            
            <div className="border-b border-gray-200 pb-6 text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">PREVENTATIVE & STRUCTURAL ENGINEERING</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase">Roofing Services in South Africa</h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                New Roofing Solution provides comprehensive roofing services throughout South Africa. Whether you require a new roof installation, emergency roof repairs, waterproofing, or preventative maintenance, our experienced team delivers reliable and professional solutions tailored to your property's needs.
              </p>
            </div>

            {/* Grid of All 13 Services */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 shadow-sm hover:shadow-md transition-all hover:border-gray-300 flex flex-col justify-between"
                  id={`service-card-${srv.slug}`}
                >
                  <div>
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
                      {renderThinIcon(srv.iconName, "h-5 w-5 text-[#E8611A]")}
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800 mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <button
                      onClick={() => navigateTo(srv.slug)}
                      className="text-xs font-bold text-[#E8611A] hover:text-[#C7510F] transition-all flex items-center gap-1"
                    >
                      View Full Details
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => openQuoteWithService(srv.title)}
                      className="rounded bg-slate-850 hover:bg-[#E8611A] text-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all border border-gray-300"
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
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0938BC] hover:text-[#E8611A] transition-colors focus:outline-none"
              id="btn-back-to-services"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Services
            </button>

            {/* Service Title Block */}
            <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">SERVICE DETAILS & PROCEDURES</span>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase mt-1">
                  {selectedService.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">{selectedService.shortDesc}</p>
              </div>

              {/* Direct Quick call to Action buttons */}
              <div className="flex gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="rounded-lg bg-slate-100 border border-slate-200 hover:bg-gray-200 text-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E8611A]" />
                  {COMPANY_INFO.phoneDisplay}
                </a>
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solution, I need a quote for ${selectedService.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#F96302] hover:bg-[#d85402] hover:scale-105 active:scale-95 text-slate-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center text-center whitespace-nowrap gap-1.5 transition-all duration-300"
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
                    <span className="w-1.5 h-5 bg-[#E8611A] rounded-full inline-block"></span>
                    Benefits & Value Gains
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {selectedService.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                        <CheckCircle2 className="h-4 w-4 text-[#E8611A] shrink-0 mt-0.5" />
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
                          <span className="text-xs font-mono font-bold text-[#E8611A]">{step.step}</span>
                          <span className="h-1 w-8 bg-[#E8611A]/15 rounded-full inline-block"></span>
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


                </div>

              </div>

            </div>

          </div>
        )}





        {/* ==================== 6. VIEW: SERVICE AREAS PAGE ==================== */}
        {currentTab === 'service-areas' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="service-areas-view">
            
            <div className="border-b border-gray-200 pb-6 text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">NATIONWIDE COVERAGE</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase">Roofing Services Throughout South Africa</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                New Roofing Solution proudly provides professional roofing services across major South African urban zones.
              </p>
            </div>

            {/* Area Search Input filter */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="relative flex items-center" id="service-area-search">
                <Search className="absolute left-4 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search South African towns, e.g. Sandton, Pretoria, Durban..."
                  value={areaSearch}
                  onChange={(e) => setAreaSearch(e.target.value)}
                  className="w-full rounded-full border border-gray-300 bg-[#f9fafb] py-3 pl-12 pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-500 focus:border-[#E8611A] focus:outline-none focus:ring-1 focus:ring-[#E8611A] transition-all"
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-500">Quick Filters:</span>
                {['Sandton', 'Pretoria', 'Midrand', 'Durban', 'Gauteng'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setAreaSearch(tag)}
                    className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-slate-600 hover:text-[#E8611A] hover:border-[#E8611A] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
                {areaSearch && (
                  <button
                    onClick={() => setAreaSearch('')}
                    className="text-[#E8611A] font-bold hover:underline ml-1"
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
                <div key={area.city} className="rounded-xl border border-gray-200 bg-[#f9fafb] p-5 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B71510] font-mono">📍 {area.city}</span>
                    <span className="rounded bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                      {area.region}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {area.details}
                  </p>
                  <div className="pt-2 border-t border-gray-200 flex justify-between">
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
            <div className="rounded-xl bg-[#f9fafb] p-6 text-center border border-gray-200 space-y-4 max-w-2xl mx-auto">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">SANS Code Compliant Logistics</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Whether you have a severe leak in Johannesburg, a flat roof waterproofing request in Midrand, or wind-damaged sheets in Pretoria, our logistics crews are fully equipped to deliver prompt materials dispatch and structural engineering sign-offs locally.
              </p>
            </div>

          </div>
        )}


        {/* ==================== 7. VIEW: FAQS PAGE ==================== */}
        {currentTab === 'faqs' && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10" id="faqs-view">
            
            <div className="border-b border-gray-200 pb-6 text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">QUESTIONS & CLARIFICATIONS</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase">Frequently Asked Questions</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Clear answers regarding roofing costs, warranties, compliance, and material lifespans in South Africa.
              </p>
            </div>

            <div className="space-y-4" id="faqs-accordion">
              {FAQS_LIST.map((faq, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-[#f9fafb] p-5 shadow-sm space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm">{faq.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <button
                onClick={() => navigateTo('contact')}
                className="rounded bg-[#F96302] hover:bg-[#d85402] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                Still Have Questions? Get in Touch
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B71510] hover:text-[#F96302] focus:outline-none transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to All Articles
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
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

                {/* Clean, perfectly contained inline blog featured image */}
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                  <img
                    src="/images/work-nwu-building.jpg"
                    alt={selectedBlog.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Article Content paragraphs */}
                <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedBlog.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 p-6 rounded-xl border">
                  <div className="text-center sm:text-left">
                    <h4 className="text-xs font-bold text-slate-900 uppercase">Need assistance with your roof?</h4>
                    <p className="text-xs text-slate-500 mt-1">Get an expert site check and transparent quote within hours.</p>
                  </div>
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I read your article "${selectedBlog.title}" and would like to request a free quote.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#F96302] hover:bg-[#d85402] hover:scale-105 hover:shadow-lg text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center text-center whitespace-nowrap gap-1.5 transition-all duration-300"
                  >
                    GET A FREE QUOTE
                  </a>
                </div>

              </div>
            ) : (
              <div className="space-y-10">
                <div className="border-b border-gray-200 pb-6 text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#B71510]">EDUCATIONAL GUIDES & ADVICE</span>
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase">Roofing Insights Blog</h1>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Read expert articles regarding pricing structures, materials comparison, and waterproofing benefits in South Africa.
                  </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" id="blog-grid-list">
                  {BLOG_POSTS.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-[#f9fafb] p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                          <span className="uppercase text-[#B71510] font-bold">{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-sans font-bold text-slate-800 text-base leading-snug group-hover:text-[#B71510] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedBlog(post)}
                          className="text-xs font-bold text-[#B71510] hover:text-[#F96302] flex items-center gap-1 transition-colors"
                        >
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-[10px] text-slate-500">{post.date}</span>
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
            
            <div className="border-b border-gray-200 pb-6 text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8611A]">CONNECT WITH US</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase">Get Your Free Roofing Quote Today</h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Need professional roofing services in South Africa? Our experienced team is ready to assist with roof installations, repairs, waterproofing, maintenance, and inspections.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              
              {/* Left Column: Form */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-wide mb-4">
                    Get In Touch
                  </h3>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    Fill out our simplified digital quote calculator below. You can submit it directly to our lead management base, or request instant dispatch coordination via WhatsApp!
                  </p>
                  
                  {/* Reuse our gorgeous QuoteForm here */}
                  <QuoteForm compact={true} />
                </div>
              </div>

              {/* Right Column: Address Cards & Details */}
              <div className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                    Our Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-3"
                    >
                      <div className="rounded-lg bg-orange-50 p-2.5 text-[#E8611A] mt-0.5">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Phone Call</span>
                        <strong className="text-xs block text-slate-900 font-bold mt-1">{COMPANY_INFO.phoneDisplay}</strong>
                        <span className="text-[10px] text-slate-500">Free telephonic support</span>
                      </div>
                    </a>

                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex items-start gap-3"
                    >
                      <div className="rounded-lg bg-orange-50 p-2.5 text-[#E8611A] mt-0.5">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Email Address</span>
                        <strong className="text-xs block text-slate-900 font-bold mt-1">{COMPANY_INFO.email}</strong>
                        <span className="text-[10px] text-slate-500">Typical response in 1 hour</span>
                      </div>
                    </a>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex items-start gap-3 sm:col-span-2">
                      <div className="rounded-lg bg-orange-50 p-2.5 text-[#E8611A] mt-0.5">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500">Official Website</span>
                        <strong className="text-xs block text-slate-900 font-bold mt-1">{COMPANY_INFO.website}</strong>
                        <p className="text-[11px] text-slate-600 leading-normal mt-1">
                          Our portal is secure, SEO-optimized, and configured for rapid dispatch routing to Johannesburg, Pretoria, Midrand, and Durban.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#E8611A]/30 bg-orange-50/50 p-5 shadow-sm flex items-start gap-3 sm:col-span-2" id="physical-address-card">
                      <div className="rounded-lg bg-orange-100 p-2.5 text-[#E8611A] mt-0.5">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#E8611A]">Business Physical Address</span>
                        <strong className="text-xs block text-slate-900 font-bold mt-1">{COMPANY_INFO.address}</strong>
                        <p className="text-[11px] text-slate-600 leading-normal mt-1">
                          Our primary administrative depot and raw material fabrication hub in Glen Austin, Midrand. Let's arrange a site inspection.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* ==================== FOOTER SECTION ==================== */}
      <footer className="bg-[#0F172A] text-white border-t border-slate-800 pt-16 pb-8" id="main-app-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" id="footer-links-grid">
            
            {/* Column 1: Logo & Tagline */}
            <div className="space-y-4">
              <div className="flex justify-start">
                <img src="/images/nrs-main-logo.png" alt="New Roofing Solutions" className="h-16 w-auto" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "{COMPANY_INFO.tagline}" <br />
                {COMPANY_INFO.taglineAlternative}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[10px] font-mono text-slate-400">
                  🇿🇦 Proudly South African Enterprise
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B71510]">Navigate Site</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={() => navigateTo('home')} className="hover:text-[#F96302] transition-colors">Home Page</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-[#F96302] transition-colors">About Our Team</button></li>
                <li><button onClick={() => navigateTo('service-areas')} className="hover:text-[#F96302] transition-colors">Our Service Areas</button></li>
                <li><button onClick={() => navigateTo('faqs')} className="hover:text-[#F96302] transition-colors">Frequently Asked Questions</button></li>
                <li><button onClick={() => navigateTo('blog')} className="hover:text-[#F96302] transition-colors">Our Blog Articles</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-[#F96302] transition-colors">Get Free Quote</button></li>
              </ul>
            </div>

            {/* Column 3: Featured Services */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B71510]">Key Services</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {SERVICES.slice(0, 5).map((srv) => (
                  <li key={srv.slug}>
                    <button onClick={() => navigateTo(srv.slug)} className="hover:text-[#F96302] text-left transition-colors">
                      {srv.title}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigateTo('services-overview')} className="text-[#F96302] hover:underline font-bold transition-colors">
                    View All Services →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & SEO footer checklist */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B71510]">Immediate Assistance</h4>
              <div className="space-y-2.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#B71510]" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#F96302] transition-all">
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#B71510]" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#F96302] transition-all break-all">
                    {COMPANY_INFO.email}
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#B71510] shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-normal">
                    {COMPANY_INFO.address}
                  </span>
                </p>
                <p className="text-[10px] text-slate-400 leading-normal pt-2 border-t border-slate-800">
                  Ranked for: <strong className="text-slate-200">Roofing Company South Africa, Waterproofing Contractors, Emergency Roof Repairs.</strong>
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400" id="footer-copyright-row">
            <p>New Roofing Solution. All rights reserved. SABS Compliant. Built for lasting protection.</p>
            
            <div className="flex items-center gap-4">
              <span>www.newroofingsolutions.co.za</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 p-4 backdrop-blur-sm cursor-pointer" 
          id="global-quote-modal"
          onClick={() => setQuoteModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md rounded-xl bg-[#f9fafb] p-5 border border-gray-300 shadow-2xl cursor-default space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-500 hover:bg-gray-200 hover:text-slate-900 hover:scale-110 active:scale-95 transition-all focus:outline-none z-10"
              title="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-5 bg-[#E8611A] rounded-full inline-block"></span>
                Request a Free Quote
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
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

