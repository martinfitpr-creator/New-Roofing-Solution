import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, X, Send, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface WhatsAppButtonProps {
  contextMessage?: string;
  onOpenQuoteModal?: () => void;
}

export default function WhatsAppButton({ contextMessage = '', onOpenQuoteModal }: WhatsAppButtonProps) {
  const [showChatBox, setShowChatBox] = useState(false);
  const [pulseNotification, setPulseNotification] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Auto show a friendly notification pop after 4 seconds to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatBox(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Hide sticky bar while hero is visible; show it once scrolled past
  useEffect(() => {
    const hero = document.getElementById('home-hero');
    if (!hero) {
      // No hero on this page — always show the bar
      setShowStickyBar(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar only when hero is NOT intersecting (scrolled past)
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const getWhatsAppLink = (messageText: string) => {
    const defaultText = messageText || "Hi New Roofing Solution, I would like to request a free quote for roofing services.";
    return `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(defaultText)}`;
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowChatBox(false);
    setPulseNotification(false);
  };

  return (
    <>
      {/* 1. Interactive Floating Chat Widget Wrapper */}
      <div className="fixed bottom-24 right-6 z-50 md:bottom-8 md:right-8 flex flex-col items-end gap-3" id="floating-whatsapp-widget-wrapper">
        
        {/* Expanded Interactive Chat Box Overlay */}
        {showChatBox && (
          <div 
            className="w-80 rounded-2xl bg-[#0e1114] shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col"
            id="whatsapp-chat-box"
          >
            {/* Header section with brand colors */}
            <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-[#B71510] overflow-hidden">
                  <img src="/images/nrs-main-logo.png" alt="NRS" className="h-full w-full object-contain bg-white p-1" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#F96302] border-2 border-slate-900 animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-100">New Solutions • Site Lead</h4>
                  <p className="text-[10px] text-[#F96302] font-mono">● Active & Ready to Assist</p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
                title="Close chat bubble"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="p-4 bg-slate-950/45 space-y-3 border-b border-slate-800/50">
              <div className="bg-[#13171c] rounded-xl rounded-tl-none p-3 text-xs text-slate-300 shadow-sm border border-slate-850 leading-relaxed">
                Hi there! 👋 Welcome to <strong className="text-white">New Roofing Solutions</strong>.
                <br /><br />
                Need a quick quotation or site inspection for <strong className="text-white">Corrugated, IBR, or Coil</strong> sheet roofing? Let's get your pricing sorted now.
              </div>
              <span className="text-[9px] font-mono text-slate-400 block text-right">Just now • SABS Certified</span>
            </div>

            {/* Action Buttons to Call or WhatsApp */}
            <div className="p-4 bg-[#0e1114] space-y-2">
              <a
                href={getWhatsAppLink(contextMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg bg-[#F96302] text-white py-2.5 px-4 text-xs font-bold uppercase tracking-wider hover:bg-[#d85402] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                id="widget-btn-whatsapp"
              >
                <svg className="h-4 w-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.628 1.97 14.161.945 11.54.945c-5.445 0-9.87 4.373-9.874 9.802-.001 1.962.511 3.878 1.483 5.584L2.09 20.627l4.557-1.473zm12.59-6.314c-.33-.165-1.951-.963-2.251-1.072-.3-.109-.518-.165-.736.165-.218.33-.844 1.072-1.034 1.291-.19.218-.38.244-.71.079-.33-.165-1.393-.513-2.653-1.638-.98-.874-1.64-1.953-1.832-2.282-.19-.33-.02-.508.145-.671.149-.147.33-.385.495-.578.165-.192.22-.33.33-.55.11-.218.055-.41-.028-.575-.083-.165-.736-1.774-1.009-2.434-.266-.64-.56-.554-.769-.565-.198-.01-.424-.012-.65-.012-.226 0-.594.085-.905.424-.311.339-1.187 1.161-1.187 2.829 0 1.668 1.216 3.273 1.386 3.5.17.227 2.394 3.656 5.8 5.127.81.35 1.443.559 1.937.716.814.259 1.556.222 2.141.135.652-.097 1.951-.798 2.225-1.57.275-.771.275-1.43.193-1.57-.083-.14-.303-.227-.633-.392z" />
                </svg>
                Get a Free Quote
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full rounded-lg bg-[#B71510] text-white py-2.5 px-4 text-xs font-bold uppercase tracking-wider hover:bg-[#9c120d] transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                id="widget-btn-call"
              >
                <Phone className="h-4 w-4" />
                Call Directly: {COMPANY_INFO.phoneDisplay}
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 pt-1">
                <ShieldCheck className="h-3 w-3 text-[#B71510]" />
                <span>Fast 15-minute dispatch coordination</span>
              </div>
            </div>
          </div>
        )}

        {/* Small Floating Orange Quote Button (Toggles Chat Box) */}
        <button
          onClick={() => setShowChatBox(!showChatBox)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F96302] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#d85402] focus:outline-none focus:ring-4 focus:ring-orange-300 relative"
          aria-label="Get a Free Quote"
          id="floating-whatsapp-btn"
        >
          {pulseNotification && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white items-center justify-center">1</span>
            </span>
          )}
          <svg className="h-7 w-7 shrink-0 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>

      {/* 2. Sticky Mobile Bottom Bar (Optimized Two-Button Layout) - Hidden on desktop, hidden while hero is visible */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 flex border-t border-slate-900 bg-slate-950 p-2.5 shadow-2xl md:hidden items-center transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        id="sticky-mobile-toolbar"
      >
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="flex flex-1 flex-col items-center justify-center text-slate-300 border-r border-slate-900"
          id="mobile-action-call"
        >
          <Phone className="h-5 w-5 text-[#B71510]" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider mt-0.5">Call Us</span>
        </a>
        
        <a
          href={getWhatsAppLink(`Hi New Roofing Solutions, I'd like to request a free quote.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3 flex-[3] rounded-lg bg-[#F96302] text-center text-xs font-extrabold text-white shadow-md hover:bg-[#d85402] hover:scale-105 active:scale-95 py-3 flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-300"
          id="mobile-action-quote-btn"
        >
          {/* High-quality flat solid white SVG path without green background fill */}
          <svg className="h-5 w-5 shrink-0 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Get a Free Quote
        </a>
      </div>
    </>
  );
}
