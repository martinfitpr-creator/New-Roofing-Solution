import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Disc, Hammer, ShieldCheck, Tag, Info, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, PROMO_PRODUCTS, PromoProduct } from '../data';

export default function MaterialShowcase() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'IBR' | 'Corrugated' | 'Chromodek' | 'Accessories'>('all');

  const filteredPromoProducts = activeFilter === 'all' 
    ? PROMO_PRODUCTS 
    : PROMO_PRODUCTS.filter(p => p.profile === activeFilter);

  const materials = [
    {
      id: 'corrugated',
      title: 'Corrugated Sheeting',
      subtitle: 'The Classic S-Rib Profile',
      icon: <Layers className="h-8 w-8 text-[#B71510]" />,
      desc: 'The traditional round-wave profile is South Africa’s time-tested favourite for residential properties and estate homes. It is exceptionally lightweight and engineered for reliable rainwater runoff.',
      specs: [
        { name: 'Pitch range', val: 'Minimum 10°' },
        { name: 'Thicknesses', val: '0.18mm, 0.23mm, 0.27mm, 0.30mm, 0.40mm' },
        { name: 'Common use', val: 'Residential homes, schools' }
      ],
      badge: 'Highly Popular',
      image: '/images/media__1782324917840.jpg',
    },
    {
      id: 'ibr',
      title: 'IBR Sheeting',
      subtitle: 'Inverted Box Rib Profile',
      icon: <Hammer className="h-8 w-8 text-[#B71510]" />,
      desc: 'Featuring a square-fluted, high-strength profile, IBR is designed for optimum load-bearing strength, maximum water-carrying capacity, and ultra-wide purlin spacing across large spans.',
      specs: [
        { name: 'Pitch range', val: 'Minimum 5°' },
        { name: 'Thicknesses', val: '0.30mm, 0.40mm, 0.53mm' },
        { name: 'Common use', val: 'Industrial warehouses, malls' }
      ],
      badge: 'Heavy Duty',
      image: '/images/media__1782324986510.jpg',
    },
    {
      id: 'coil',
      title: 'Roofing Steel Coils',
      subtitle: 'Seamless On-Site Fabrication',
      icon: <Disc className="h-8 w-8 text-[#B71510]" />,
      desc: 'Bulk pre-painted galvanized steel coils are fed directly into our mobile site-rolling mills, producing endless, custom single-run roof sheets or seamless gutters with zero joint leaks.',
      specs: [
        { name: 'Pitch range', val: 'Low pitch / custom' },
        { name: 'Material grade', val: 'SABS Galvanized Steel' },
        { name: 'Common use', val: 'Continuous runs, gutters' }
      ],
      badge: 'Zero Joint Leaks',
      image: '/images/media__1782324917921.jpg',
    },
  ];

  return (
    <section className="py-20 bg-[#0a0c0e]" id="sheeting-materials-showcase" style={{background: 'linear-gradient(to bottom, #060708 0%, #0a0c0e 6%, #0a0c0e 94%, #060708 100%)'}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Profiles Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest !text-black bg-slate-100 px-3.5 py-1.5 rounded-full inline-block" style={{color: '#000000'}}>
            Premium Sheeting Profiles
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            Our Core Materials: Corrugated, IBR & Coils
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            At New Roofing Solutions, we manufacture and supply SABS-compliant materials specifically engineered to endure South Africa’s harsh UV sunshine, heavy seasonal downpours, and violent Highveld hailstorms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-24">
          {materials.map((mat, idx) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#0e1114] shadow-sm border border-slate-900 hover:shadow-xl hover:border-slate-800 transition-all duration-300"
              id={`material-card-${mat.id}`}
            >
              {/* Image Frame */}
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                <span className="absolute top-3 right-3 rounded bg-slate-950/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {mat.badge}
                </span>
              </div>

              {/* Text Meta Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                      {mat.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white uppercase tracking-wide leading-tight">
                        {mat.title}
                      </h3>
                      <p className="text-xs text-[#B71510] font-semibold">{mat.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {mat.desc}
                  </p>
                </div>

                {/* Specs List Block */}
                <div className="space-y-2 border-t border-slate-900 pt-4 mt-auto">
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">
                    <ShieldCheck className="h-3 w-3 text-[#B71510]" />
                    <span>Technical Profile Specs:</span>
                  </div>
                  {mat.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-900 last:border-0">
                      <span className="text-slate-400 font-medium">{spec.name}</span>
                      <span className="text-slate-100 font-bold text-right ml-4 leading-tight">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger direct to WhatsApp */}
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I would like to request a free quote for my roof using SABS ${mat.title} profiles.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center rounded-lg bg-[#F96302] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#d85402] hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  GET A FREE QUOTE
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo and Price Sheet Segment - Directly from flyer scan! */}
        <div className="border-t border-slate-900 pt-16" id="factory-promo-specials">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F96302] bg-[#F96302]/10 border border-[#F96302]/20 px-3.5 py-1.5 rounded-full inline-block">
              Direct from Manufacturer
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Factory Direct Pricing & Promotions
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Scan our latest catalog specials. We fabricate premium custom-length sheets to order at our Midrand factory. <strong className="text-white">{COMPANY_INFO.deliveryText}</strong>.
            </p>

            {/* Profile Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {(['all', 'Chromodek', 'IBR', 'Corrugated', 'Accessories'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeFilter === tab
                      ? 'bg-[#B71510] text-white border-[#B71510]'
                      : 'bg-[#0e1114] text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'All Specials' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromoProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0e1114] rounded-xl border border-slate-900 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-800 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-slate-900 bg-slate-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F96302] bg-[#F96302]/10 border border-[#F96302]/20 px-2 py-0.5 rounded">
                      {prod.profile}
                    </span>
                    {prod.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#B71510] px-2 py-0.5 rounded">
                        {prod.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wide">
                    {prod.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    Thickness: <span className="text-white font-bold">{prod.thickness}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow space-y-4">
                  {/* Price Banner */}
                  <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-white tracking-tight">
                        {prod.price}
                      </span>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {prod.priceDetail}
                      </p>
                    </div>
                    <Tag className="h-5 w-5 text-[#F96302]" />
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2">
                    {prod.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-tight">
                        <CheckCircle2 className="h-4 w-4 text-[#B71510] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Specs footer */}
                  {prod.specs && (
                    <div className="pt-3 border-t border-slate-900 space-y-1.5">
                      {prod.specs.map((spec, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 text-[10px] font-mono">
                          <span className="text-slate-500 uppercase shrink-0">{spec.name}</span>
                          <span className="text-slate-300 font-bold text-right">{spec.val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* WhatsApp Order Button */}
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I am interested in ordering the promotional special: ${prod.title} (Thickness: ${prod.thickness}, Price: ${prod.price} ${prod.priceDetail}). Please provide a full free quotation.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center rounded-lg bg-[#F96302] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#d85402] hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    GET A FREE QUOTE
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bulk Hardware & Contractors Info Box */}
          <div className="mt-12 bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg border border-slate-800">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 h-40 w-40 rounded-full bg-[#F96302]/10 blur-2xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl text-center md:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F96302] bg-[#F96302]/15 border border-[#F96302]/25 px-2.5 py-1 rounded">
                  FOR HARDWARE STORES & ROOFING CONTRACTORS
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight">
                  Prepare Early for Your Next Bulk Order
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We supply top-tier 0.18mm and 0.23mm S-Rib Wave sheets, custom IBR profiles, and NRS Round Wire roofing nails (2", 3", and 4") at unbeatable wholesale factory-direct warehouse pricing.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hi New Roofing Solutions, I am a contractor/hardware store owner. I would like to request bulk pricing structures.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded bg-[#F96302] hover:bg-[#d85402] hover:scale-105 hover:shadow-lg text-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-center shadow flex items-center justify-center gap-1.5 transition-all duration-300"
                >
                  BULK ENQUIRY
                </a>
                <a
                  href={`tel:${COMPANY_INFO.landline}`}
                  className="rounded bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-center border border-slate-700 hover:scale-105 hover:bg-slate-700 active:scale-95 transition-all duration-300"
                >
                  CALL WAREHOUSE
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
