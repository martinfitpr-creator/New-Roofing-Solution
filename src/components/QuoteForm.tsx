import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data';
import { LeadSubmission } from '../types';

interface QuoteFormProps {
  preselectedService?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

// URL-encoding helper for Netlify AJAX submissions
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default function QuoteForm({ preselectedService = '', onSuccess, compact = false }: QuoteFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || SERVICES[0].title);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle online form submission (Compatible with Netlify Forms, Formspree, FormSubmit, Web3Forms, or any custom host)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !phone || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = (import.meta.env.VITE_FORM_ENDPOINT as string) || '/';

      if (endpoint.startsWith('http')) {
        // Universal external web host / form service (e.g. Formspree, Web3Forms, FormSubmit, custom API)
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            'form-name': 'quote-request',
            fullName,
            email,
            phone,
            service,
            message,
            _subject: `New Roofing Quote Request from ${fullName}`,
          }),
        });
      } else {
        // Native Netlify Forms or relative endpoint handler
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'quote-request',
            fullName,
            email,
            phone,
            service,
            message,
          }),
        });
      }

      // 2. Build local lead item backup
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
          minute: '2-digit',
        }),
        status: 'new',
      };

      // Store in localStorage for admin lead monitoring
      const existingLeadsStr = localStorage.getItem('new_roofing_leads') || '[]';
      const existingLeads = JSON.parse(existingLeadsStr);
      existingLeads.unshift(newLead);
      localStorage.setItem('new_roofing_leads', JSON.stringify(existingLeads));

      setSubmitted(true);
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
    } catch (err) {
      setError('Something went wrong submitting your enquiry. Please try again or use WhatsApp.');
    } finally {
      setIsSubmitting(false);
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
      <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-xl border border-slate-200" id="quote-success-state">
        <CheckCircle2 className="h-16 w-16 text-[#F96302] mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You, {fullName}!</h3>
        <p className="text-sm text-slate-600 mb-6 max-w-sm">
          Your roofing enquiry has been logged successfully. Our specialist team will contact you back on <strong className="text-slate-900">{phone}</strong> within 2 hours.
        </p>
        <button
          onClick={handleReset}
          className="rounded-lg bg-slate-850 hover:bg-[#B71510] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow"
          id="btn-submit-another"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="quote-request"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className={`${compact ? 'space-y-3 p-1' : 'space-y-4 p-6 bg-white rounded-xl shadow-md border border-slate-200'}`}
      id="roofing-quote-form"
    >
      {/* Hidden input required by Netlify Forms */}
      <input type="hidden" name="form-name" value="quote-request" />
      <p className="hidden">
        <label>
          Don’t fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      {!compact && (
        <div className="border-b border-slate-200 pb-4 mb-4">
          <h3 className="text-lg font-black uppercase text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#B71510] rounded-full inline-block"></span>
            Request a Free Quote
          </h3>
          <div className="w-full rounded-xl overflow-hidden mt-3 border border-slate-100 shadow-sm" style={{maxHeight: '220px'}}>
            <img
              src="/images/work-nwu-building.jpg"
              alt="Quality Roofing Projects"
              className="w-full h-full object-cover"
              style={{maxHeight: '220px'}}
            />
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Get professional advice & transparent South African pricing within hours.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200" id="form-error-banner">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
          <input
            type="text"
            name="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Sipho Ndlovu"
            className={`rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 px-3 text-sm focus:bg-white focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none transition-all ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-input-name"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +27 68 087 6623"
            className={`rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 px-3 text-sm focus:bg-white focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none transition-all ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-input-phone"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. sipho@example.co.za"
            className={`rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 px-3 text-sm focus:bg-white focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none transition-all ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-input-email"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Service Required</label>
          <select
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`rounded-lg bg-slate-50 border border-slate-300 text-slate-900 px-3 text-sm focus:bg-white focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none cursor-pointer transition-all ${compact ? 'py-1.5' : 'py-2'}`}
            id="quote-select-service"
          >
            {SERVICES.map((srv) => (
              <option key={srv.slug} value={srv.title} className="bg-white text-slate-900">
                {srv.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Tell us about your roofing requirements *</label>
        <textarea
          name="message"
          required
          rows={compact ? 2 : 3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. I have a leaking roof tile in the main lounge, or I need a new Chromadek installation for my warehouse..."
          className="rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 px-3 py-2 text-sm focus:bg-white focus:border-[#B71510] focus:ring-1 focus:ring-[#B71510] focus:outline-none transition-all"
          id="quote-input-message"
        ></textarea>
      </div>

      {/* Dual Lead Action CTA buttons */}
      <div className={`flex flex-col gap-2.5 sm:flex-row ${compact ? 'pt-1' : 'pt-2'}`}>
        {/* Primary CTA Red button - Submit via email/online */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 rounded-lg bg-[#B71510] text-center text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#9c120d] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 ${compact ? 'py-2.5 px-3' : 'py-3 px-4'}`}
          id="btn-quote-submit-online"
        >
          <Send className={`h-3.5 w-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
          {isSubmitting ? 'Sending Enquiry...' : 'Send Online Enquiry'}
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
