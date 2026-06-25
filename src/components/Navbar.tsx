import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data';
import { PageId } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentTab: PageId;
  onNavigate: (tab: PageId) => void;
  onOpenQuote: () => void;
}

export default function Navbar({ currentTab, onNavigate, onOpenQuote }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (tab: PageId) => {
    onNavigate(tab);
    setIsOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (tab: PageId) => currentTab === tab;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isOpen 
          ? 'bg-white/85 backdrop-blur-sm py-4 border-b border-slate-100' 
          : scrolled
            ? 'bg-white/80 shadow-md backdrop-blur-md py-3 border-b border-slate-200'
            : 'bg-white/75 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
      id="main-app-header"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="navbar-container">
        <div className="flex h-16 items-center justify-between" id="navbar-desktop-layout">
          
          {/* Quick Call icon on mobile left side */}
          <div className="flex md:hidden items-center gap-2" id="mobile-left-actions">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="rounded-full bg-slate-100 p-2 text-slate-700 hover:text-[#B71510]"
              title="Call Contractor"
              id="mobile-phone-shortcut"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>

          {/* LEFT COLUMN: Laptop Links (Hidden on mobile) */}
          <nav className="hidden md:flex flex-1 items-center justify-end space-x-8 pr-8" id="navbar-left-links">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#B71510] ${
                isActive('home') ? 'text-[#B71510]' : 'text-slate-800'
              }`}
              id="nav-link-home"
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#B71510] ${
                isActive('about') ? 'text-[#B71510]' : 'text-slate-800'
              }`}
              id="nav-link-about"
            >
              About
            </button>

            {/* Roofing Services Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#B71510] focus:outline-none ${
                  currentTab.includes('roof') || currentTab.includes('gutter') || currentTab.includes('residential') || currentTab.includes('commercial') || currentTab.includes('industrial')
                    ? 'text-[#B71510]'
                    : 'text-slate-800'
                }`}
                id="nav-link-services-trigger"
              >
                Services
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute left-0 mt-3 w-72 rounded bg-white border border-slate-200 shadow-2xl py-3 z-50 grid grid-cols-1"
                  onMouseLeave={() => setDropdownOpen(false)}
                  id="services-dropdown-panel"
                >
                  <div className="px-4 py-1 border-b border-slate-100 mb-1">
                    <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">Roofing Services</span>
                  </div>
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.slug}
                      onClick={() => handleLinkClick(srv.slug)}
                      className="block px-4 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 hover:text-[#B71510] transition-all border-l-2 border-transparent hover:border-[#B71510]"
                      id={`dropdown-item-${srv.slug}`}
                    >
                      {srv.title}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => handleLinkClick('services-overview')}
                      className="block w-full px-4 py-1.5 text-center text-[10px] font-bold text-slate-500 hover:text-[#B71510]"
                    >
                      All Services Overview →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* MIDDLE COLUMN: LOGO Centered on both Mobile and Laptop */}
          <div className="flex-shrink-0 flex justify-center items-center" id="navbar-middle-logo">
            <button onClick={() => handleLinkClick('home')} className="focus:outline-none" aria-label="New Roofing Solutions Home">
              <img src="/images/nrs-main-logo.jpg" alt="NRS Logo" className="h-10 w-auto" />
            </button>
          </div>

          {/* RIGHT COLUMN: Laptop Links & CTAs (Hidden on mobile) */}
          <nav className="hidden md:flex flex-1 items-center justify-start space-x-8 pl-8" id="navbar-right-links">
            <button
              onClick={() => handleLinkClick('projects')}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#B71510] ${
                isActive('projects') ? 'text-[#B71510]' : 'text-slate-800'
              }`}
              id="nav-link-projects"
            >
              Gallery
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#B71510] ${
                isActive('contact') ? 'text-[#B71510]' : 'text-slate-800'
              }`}
              id="nav-link-contact"
            >
              Contact
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 hover:text-[#B71510] transition-colors pl-2"
              id="nav-btn-call"
            >
              <Phone className="h-3.5 w-3.5 text-[#B71510]" />
              Call
            </a>

            {/* Facebook Link */}
            <a
              href="https://www.facebook.com/profile.php?id=61572867532674"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-700 hover:text-[#B71510] transition-colors pl-2"
              title="Visit our Facebook Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#B71510]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>

            {/* Quick Action Quote button - Simple brand orange quote button, still leads to WhatsApp */}
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hi New Roofing Solutions, I would like to request a free quote for roofing services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-[#F96302] text-white px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.15em] shadow-md hover:bg-[#d85402] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-1.5"
              id="nav-btn-quote"
            >
              GET A FREE QUOTE
            </a>
          </nav>

          {/* Mobile hamburger - Right Aligned on Mobile, hidden on Laptop */}
          <div className="flex md:hidden" id="mobile-hamburger-trigger">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE NAV PANEL (Full screen dark drawer matching reference design) */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-6 overflow-y-auto" id="mobile-drawer-menu">
          
          {/* Header row: Logo at left, Close X at right */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <img src="/images/nrs-main-logo.png" alt="NRS Logo" className="h-9 w-auto" />
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Giant bold white navigation links */}
          <div className="flex-1 flex flex-col justify-center py-6 pl-2 space-y-6">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-left text-2xl sm:text-3xl font-black uppercase tracking-wider transition-colors ${
                isActive('home') ? 'text-[#B71510]' : 'text-white hover:text-[#B71510]'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`text-left text-2xl sm:text-3xl font-black uppercase tracking-wider transition-colors ${
                isActive('about') ? 'text-[#B71510]' : 'text-white hover:text-[#B71510]'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => handleLinkClick('services-overview')}
              className={`text-left text-2xl sm:text-3xl font-black uppercase tracking-wider transition-colors ${
                isActive('services-overview') || currentTab.includes('roof') || currentTab.includes('gutter') ? 'text-[#B71510]' : 'text-white hover:text-[#B71510]'
              }`}
            >
              SERVICES
            </button>
            <button
              onClick={() => handleLinkClick('projects')}
              className={`text-left text-2xl sm:text-3xl font-black uppercase tracking-wider transition-colors ${
                isActive('projects') ? 'text-[#B71510]' : 'text-white hover:text-[#B71510]'
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className={`text-left text-2xl sm:text-3xl font-black uppercase tracking-wider transition-colors ${
                isActive('contact') ? 'text-[#B71510]' : 'text-white hover:text-[#B71510]'
              }`}
            >
              CONTACT
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              onClick={() => setIsOpen(false)}
              className="text-left text-2xl sm:text-3xl font-black uppercase tracking-wider text-white hover:text-[#B71510]"
            >
              CALL
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61572867532674"
              onClick={() => setIsOpen(false)}
              className="text-left text-2xl sm:text-3xl font-black uppercase tracking-wider text-white hover:text-[#B71510]"
              target="_blank"
              rel="noopener noreferrer"
            >
              FACEBOOK
            </a>
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hi New Roofing Solutions, I would like to request a free quote for roofing services.')}`}
              onClick={() => setIsOpen(false)}
              className="text-left text-2xl sm:text-3xl font-black uppercase tracking-wider text-white hover:text-[#B71510]"
              target="_blank"
              rel="noopener noreferrer"
            >
              GET A FREE QUOTE
            </a>
          </div>

          {/* Bottom CTA + contact info */}
          <div className="space-y-5 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuote();
              }}
              className="w-full bg-[#B71510] hover:bg-[#9c120d] active:scale-95 text-white py-4 text-sm font-black uppercase tracking-[0.25em] rounded transition-all duration-300 shadow-xl"
            >
              GET A FREE QUOTE
            </button>

            <div className="space-y-1.5 pl-1">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="block text-base font-bold text-white hover:text-[#B71510] transition-colors"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

        </div>
      , document.body)}
    </header>
  );
}
