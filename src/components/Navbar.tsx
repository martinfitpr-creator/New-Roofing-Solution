import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown, ChevronRight, Phone } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data';
import { PageId } from '../types';

interface NavbarProps {
  currentTab: PageId;
  onNavigate: (tab: PageId) => void;
  onOpenQuote: () => void;
}

export default function Navbar({ currentTab, onNavigate, onOpenQuote }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = (tab: PageId) => {
    onNavigate(tab);
    setIsOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (tab: PageId) => currentTab === tab;

  const isServiceActive =
    currentTab.includes('roof') ||
    currentTab.includes('gutter') ||
    currentTab.includes('residential') ||
    currentTab.includes('commercial') ||
    currentTab.includes('industrial') ||
    currentTab === 'services-overview';

  // Hover handlers with small delay to prevent flicker when crossing the gap
  const openDropdown = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => setDropdownOpen(false), 80);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isOpen
          ? 'bg-white shadow-md border-b border-slate-100'
          : scrolled
            ? 'bg-white/95 shadow-md backdrop-blur-md border-b border-slate-200'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
      id="main-app-header"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="navbar-container">

        {/* ════════════════════════════════════════════════════════
            MOBILE layout: flex, phone | logo | hamburger
            DESKTOP layout: CSS grid 1fr | auto | 1fr
              - Left cell (1fr):  Home / About / Services ▼
              - Center cell (auto): NRS logo — always at true 50%
              - Right cell (1fr): Contact / Call / socials / Quote
            Grid guarantees zero overlap at any viewport width.
        ═══════════════════════════════════════════════════════ */}

        {/* ── MOBILE row (flex, hidden on md+) ── */}
        <div className="flex md:hidden h-16 items-center justify-between px-0" id="navbar-mobile-row">
          {/* Phone icon */}
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-[#B71510] hover:bg-red-50 transition-colors duration-200 shrink-0"
            title="Call Us"
            id="mobile-phone-shortcut"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>

          {/* Logo — naturally centred by flex-1 on both sides */}
          <div className="flex-1 flex justify-center items-center" id="navbar-middle-logo-mobile">
            <button onClick={() => handleLinkClick('home')} className="focus:outline-none" aria-label="Home">
              <img src="/images/nrs-main-logo.jpg" alt="NRS Logo" className="h-9 w-auto" />
            </button>
          </div>

          {/* Hamburger */}
          <div className="shrink-0" id="mobile-hamburger-trigger">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-[22px] w-[22px]" /> : <Menu className="h-[22px] w-[22px]" />}
            </button>
          </div>
        </div>

        {/* ── DESKTOP grid row (hidden on mobile, shown on md+) ── */}
        <div
          className="hidden md:grid h-[60px] items-center"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
          id="navbar-desktop-layout"
        >

          {/* ── LEFT NAV — fills left 1fr, content pushed to the right edge ── */}
          <nav className="flex items-center justify-end gap-8 lg:gap-10 pr-10 lg:pr-14" id="navbar-left-links">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-[13px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors hover:text-[#B71510] ${
                isActive('home') ? 'text-[#B71510]' : 'text-slate-700'
              }`}
              id="nav-link-home"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-[13px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors hover:text-[#B71510] ${
                isActive('about') ? 'text-[#B71510]' : 'text-slate-700'
              }`}
              id="nav-link-about"
            >
              About
            </button>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className={`flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors hover:text-[#B71510] focus:outline-none ${
                  isServiceActive ? 'text-[#B71510]' : 'text-slate-700'
                }`}
                id="nav-link-services-trigger"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                Services
                <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Invisible mouse-bridge so moving from trigger into panel doesn't dismiss it */}
              {dropdownOpen && <div className="absolute left-0 top-full w-full h-3" aria-hidden="true" />}

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div
                  className="absolute left-0 top-[calc(100%+10px)] w-72 rounded-xl bg-white border border-slate-200 shadow-2xl py-2 overflow-hidden"
                  style={{ zIndex: 9999, animation: 'dropdownFadeIn 0.15s ease-out forwards' }}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  id="services-dropdown-panel"
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Roofing Services</span>
                  </div>
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.slug}
                      onClick={() => handleLinkClick(srv.slug)}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[12px] font-semibold text-slate-700 hover:bg-orange-50 hover:text-[#B71510] transition-all duration-150 border-l-2 border-transparent hover:border-[#B71510] group"
                      id={`dropdown-item-${srv.slug}`}
                    >
                      <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-[#B71510] shrink-0 transition-colors" />
                      {srv.title}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 px-4 py-2">
                    <button
                      onClick={() => handleLinkClick('services-overview')}
                      className="text-[10px] font-bold text-slate-400 hover:text-[#B71510] transition-colors"
                    >
                      All Services Overview →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ── CENTRE LOGO — auto width, always at true 50% of grid container ── */}
          <div className="flex justify-center items-center px-6" id="navbar-middle-logo">
            <button
              onClick={() => handleLinkClick('home')}
              className="focus:outline-none flex items-center"
              aria-label="New Roofing Solutions — Home"
            >
              <img
                src="/images/nrs-main-logo.jpg"
                alt="NRS New Roofing Solutions Logo"
                className="h-9 w-auto"
              />
            </button>
          </div>

          {/* ── RIGHT NAV — fills right 1fr, content pushed to the left edge ── */}
          <nav className="flex items-center justify-start gap-8 lg:gap-10 pl-10 lg:pl-14" id="navbar-right-links">
            <button
              onClick={() => handleLinkClick('contact')}
              className={`text-[13px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-colors hover:text-[#B71510] ${
                isActive('contact') ? 'text-[#B71510]' : 'text-slate-700'
              }`}
              id="nav-link-contact"
            >
              Contact
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.08em] whitespace-nowrap text-slate-700 hover:text-[#B71510] transition-colors"
              id="nav-btn-call"
            >
              <Phone className="h-4 w-4 text-[#B71510]" />
              Call
            </a>

            {/* Orange CTA */}
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hi New Roofing Solutions, I would like to request a free quote for roofing services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#F96302] text-white px-6 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] shadow-md hover:bg-[#d85402] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center whitespace-nowrap"
              id="nav-btn-quote"
            >
              GET A FREE QUOTE
            </a>
          </nav>

        </div>{/* end desktop grid */}
      </div>

      {/* ── MOBILE DRAWER ── */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col overflow-y-auto"
          id="mobile-drawer-menu"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <img src="/images/nrs-main-logo.png" alt="NRS Logo" className="h-8 w-auto" />
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 px-6 py-8 space-y-1">
            <button
              onClick={() => handleLinkClick('home')}
              className={`w-full text-left text-2xl font-black uppercase tracking-wide py-3 transition-colors border-b border-white/5 ${
                isActive('home') ? 'text-[#B71510]' : 'text-white hover:text-[#F96302]'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`w-full text-left text-2xl font-black uppercase tracking-wide py-3 transition-colors border-b border-white/5 ${
                isActive('about') ? 'text-[#B71510]' : 'text-white hover:text-[#F96302]'
              }`}
            >
              ABOUT
            </button>

            {/* SERVICES — tap to expand */}
            <div className="border-b border-white/5">
              <button
                onClick={() => setMobileServicesOpen(v => !v)}
                className={`w-full text-left text-2xl font-black uppercase tracking-wide py-3 flex items-center justify-between transition-colors ${
                  isServiceActive ? 'text-[#B71510]' : 'text-white hover:text-[#F96302]'
                }`}
                aria-expanded={mobileServicesOpen}
              >
                SERVICES
                <ChevronDown
                  className={`h-6 w-6 shrink-0 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#F96302]' : 'text-white/40'}`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pb-3 pl-2 space-y-0.5">
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.slug}
                      onClick={() => handleLinkClick(srv.slug)}
                      className="w-full text-left text-base font-semibold text-slate-300 hover:text-[#F96302] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="h-3.5 w-3.5 text-[#F96302] shrink-0" />
                      {srv.title}
                    </button>
                  ))}
                  <button
                    onClick={() => handleLinkClick('services-overview')}
                    className="w-full text-left text-sm font-bold text-[#F96302] py-2 px-3 hover:underline transition-colors"
                  >
                    All Services Overview →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`w-full text-left text-2xl font-black uppercase tracking-wide py-3 transition-colors border-b border-white/5 ${
                isActive('contact') ? 'text-[#B71510]' : 'text-white hover:text-[#F96302]'
              }`}
            >
              CONTACT
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-2xl font-black uppercase tracking-wide py-3 text-white hover:text-[#F96302] transition-colors border-b border-white/5"
            >
              CALL
            </a>
            <a
              href={COMPANY_INFO.facebookUrl}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-2xl font-black uppercase tracking-wide py-3 text-white hover:text-[#F96302] transition-colors border-b border-white/5"
              target="_blank" rel="noopener noreferrer"
            >
              FACEBOOK
            </a>
            <a
              href={COMPANY_INFO.tiktokUrl}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-2xl font-black uppercase tracking-wide py-3 text-white hover:text-[#F96302] transition-colors border-b border-white/5"
              target="_blank" rel="noopener noreferrer"
            >
              TIKTOK
            </a>
            <a
              href={COMPANY_INFO.linkedinUrl}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-2xl font-black uppercase tracking-wide py-3 text-white hover:text-[#F96302] transition-colors"
              target="_blank" rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
          </div>

          {/* Drawer footer CTA */}
          <div className="px-6 pb-8 pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => { setIsOpen(false); onOpenQuote(); }}
              className="w-full bg-[#F96302] hover:bg-[#d85402] active:scale-95 text-white py-4 text-sm font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-200 shadow-lg"
            >
              GET A FREE QUOTE
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="block w-full text-center border border-white/20 hover:border-white/40 text-white py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              {COMPANY_INFO.phoneDisplay}
            </a>
            <p className="text-center text-xs text-slate-500 pt-1">{COMPANY_INFO.email}</p>
          </div>
        </div>
      , document.body)}
    </header>
  );
}
