import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data';
import { LeadSubmission } from '../types';

interface QuoteFormProps {
  preselectedService?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function QuoteForm({ preselectedService = '', onSuccess, compact = false }: QuoteFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || SERVICES[0].title);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isWhatsAppSubmitting, setIsWhatsAppSubmitting] = useState(false);

  // Handle standard online form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      // Build lead item
      const newLead: LeadSubmission = {
        id: 'lead-' + Date.now(),
        fullName,
        email,
        phone,
        service,
        message,
        date: new Date().toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'new'
      };

      // Store in localStorage for lead monitoring
      const existingLeadsStr = localStorage.getItem('new_roofing_leads') || '[]';
      const existingLeads = JSON.parse(existingLeadsStr);
      existingLeads.unshift(newLead);
      localStorage.setItem('new_roofing_leads', JSON.stringify(existingLeads));

      setSubmitted(true);
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Handle direct WhatsApp submit (creates preformatted quote text)
  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setError('Please provide at least your Name and Phone Number to request via WhatsApp.');
      return;
    }

    // Format professional WhatsApp markdown message
    const waMessage =
`👋 *NEW QUOTE REQUEST – New Roofing Solutions*

*👤 Client Details*
• Name: ${fullName}
• Phone: ${phone}
• Email: ${email || 'Not provided'}

*🔧 Service Required*
• ${service}

*📝 Message*
${message || 'I would like to request a free site inspection and roofing quotation.'}

_Sent from www.newroofingsolutions.co.za_`;

    const whatsappUrl = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(waMessage)}`;
    
    // Log as lead as well so it persists
    const newLead: LeadSubmission = {
      id: 'lead-' + Date.now(),
      fullName,
      email: email || 'WhatsApp Request',
      phone,
      service,
      message: message || 'WhatsApp Quick Quote',
      date: new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'new'
    };
    
    const existingLeadsStr = localStorage.getItem('new_roofing_leads') || '[]';
    const existingLeads = JSON.parse(existingLeadsStr);
    existingLeads.unshift(newLead);
    localStorage.setItem('new_roofing_leads', JSON.stringify(existingLeads));

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    if (onSuccess) {
      setTimeout(() => onSuccess(), 2500);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setService(preselectedService || SERVICES[0].title);
    setMessage('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 rounded-xl border border-slate-800" id="quote-success-state">
        <CheckCircle2 className="h-16 w-16 text-[#F96302] mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2">Thank You, {fullName}!</h3>
        <p className="text-sm text-slate-400 mb-6 max-w-sm">
          Your roofing enquiry has been logged successfully. Our specialist team will contact you back on <strong className="text-white">{phone}</strong> within 2 hours.
        </p>
        <button
          onClick={handleReset}
          className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
          id="btn-submit-another"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${compact ? 'space-y-3 p-1' : 'space-y-4 p-6 bg-black rounded-xl shadow-md border border-slate-800'}`} id="roofing-quote-form">
      {!compact && (
        <div className="border-b border-slate-900 pb-4 mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#B71510] rounded-full inline-block"></span>
            Request a Free Quote
          </h3>
          <div className="w-full rounded-xl overflow-hidden mt-3" style={{maxHeight: '340px'}}>
            <img
              src="/images/media__1782324325894.jpg"
              alt="Premium Roofing Materials"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              style={{maxHeight: '340px'}}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Get professional advice & transparent South African pricing within hours.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-950/50 p-2.5 text-xs text-red-400 border border-red-900/50" id="form-error-banner">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-300">Full Name *</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Sipho Ndlovu"
            className={`rounded-lg bg-[#13171c] border border-slate-800 text-white px-3 text-sm focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-input-name"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-300">Phone Number *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +27 68 087 6623"
            className={`rounded-lg bg-[#13171c] border border-slate-800 text-white px-3 text-sm focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-input-phone"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-300">Email Address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. sipho@example.co.za"
            className={`rounded-lg bg-[#13171c] border border-slate-800 text-white px-3 text-sm focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-input-email"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-300">Service Required</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`rounded-lg bg-[#13171c] border border-slate-800 text-white px-3 text-sm focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none cursor-pointer ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-select-service"
          >
            {SERVICES.map((srv) => (
              <option key={srv.slug} value={srv.title} className="bg-[#13171c] text-white">
                {srv.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-[11px] font-bold text-slate-300">Tell us about your roofing requirements *</label>
        <textarea
          required
          rows={compact ? 2 : 3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. I have a leaking roof tile in the main lounge, or I need a new Chromadek installation for my warehouse..."
          className="rounded-lg bg-[#13171c] border border-slate-800 text-white px-3 py-2 text-sm focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none"
          id="quote-input-message"
        ></textarea>
      </div>

      {/* Dual Lead Action CTA buttons */}
      <div className={`flex flex-col gap-2.5 sm:flex-row ${compact ? 'pt-1' : 'pt-2'}`}>
        {/* Primary CTA Red button - Submit via email/online */}
        <button
          type="submit"
          className={`flex-1 rounded-lg bg-[#B71510] text-center text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#a1120d] active:scale-95 transition-all flex items-center justify-center gap-2 ${compact ? 'py-2.5 px-3' : 'py-3 px-4'}`}
          id="btn-quote-submit-online"
        >
          <Send className="h-3.5 w-3.5" />
          Send Online Enquiry
        </button>

        {/* Secondary CTA Green button - Instant WhatsApp request */}
        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          className={`flex-1 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md text-center text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap ${compact ? 'py-2.5 px-3' : 'py-3 px-4'}`}
          id="btn-quote-submit-whatsapp"
        >
          <MessageSquare className="h-3.5 w-3.5 text-white" />
          Instant WhatsApp
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1 text-center">
        <ShieldCheck className="h-3.5 w-3.5 text-[#B71510]" />
        <span>100% Secure. We never share your personal information.</span>
      </div>
    </form>
  );
}
