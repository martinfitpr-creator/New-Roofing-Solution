import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Disc, Hammer, ShieldCheck, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
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
        { name: 'Pitch range', val: 'Low pitch / custom' },
        { name: 'Thicknesses', val: '0.27mm, 0.30mm, 0.40mm' },
        { name: 'Common use', val: 'Residential homes, schools' }
      ],
      badge: 'Highly Popular',
      image: '/images/material-corrugated-sheeting.jpg',
    },
    {
      id: 'ibr',
      title: 'IBR Sheeting',
      subtitle: 'IBR Profile',
      icon: <Hammer className="h-8 w-8 text-[#B71510]" />,
      desc: 'Featuring a square-fluted, high-strength profile, IBR is designed for optimum load-bearing strength, maximum water-carrying capacity, and ultra-wide purlin spacing across large spans.',
      specs: [
        { name: 'Pitch range', val: 'Low pitch / custom' },
        { name: 'Thicknesses', val: '0.30mm, 0.40mm, 0.47mm, 0.53mm' },
        { name: 'Common use', val: 'Industrial warehouses, malls' }
      ],
      badge: 'Heavy Duty',
      image: '/images/material-ibr-sheeting.jpg',
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
      image: '/images/material-steel-coils.jpg',
    },
  ];

  return (
    <section className="py-20 bg-white" id="sheeting-materials-showcase">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Profiles Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B71510] bg-[#B71510]/10 px-3.5 py-1.5 rounded-full inline-block">
            Premium Sheeting Profiles
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase tracking-tight">
            Our Core Materials: Corrugated, IBR & Coils
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-200 hover:shadow-2xl hover:border-slate-300 transition-all duration-300"
              id={`material-card-${mat.id}`}
            >
              {/* Image Frame */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Text Meta Content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-red-50 rounded-xl group-hover:scale-110 transition-transform">
                      {mat.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-black text-base text-slate-900 uppercase tracking-wide leading-tight">
                        {mat.title}
                      </h3>
                      <p className="text-xs text-[#B71510] font-bold mt-0.5">{mat.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {mat.desc}
                  </p>
                </div>

                {/* Specs List Block */}
                <div className="space-y-2 border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#B71510]" />
                    <span>Technical Profile Specs:</span>
                  </div>
                  {mat.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 font-medium">{spec.name}</span>
                      <span className="text-slate-900 font-bold text-right ml-4 leading-tight">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger direct to WhatsApp */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I would like to request a free quote for my roof using SABS ${mat.title} profiles.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center rounded-lg bg-[#F96302] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider hover:bg-[#d85402] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center whitespace-nowrap gap-1.5 shadow-md"
                >
                  GET A FREE QUOTE
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo and Price Sheet Segment - Directly from flyer scan! */}
        <div className="border-t border-slate-200 pt-16" id="factory-promo-specials">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F96302] bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full inline-block">
              Direct from Manufacturer
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 uppercase tracking-tight">
              Factory Direct Pricing & Promotions
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Scan our latest catalog specials. We fabricate premium custom-length sheets to order at our Midrand factory.
            </p>

            {/* Profile Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {(['all', 'Chromodek', 'IBR', 'Corrugated', 'Accessories'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border shadow-sm ${
                    activeFilter === tab
                      ? 'bg-[#B71510] text-white border-[#B71510] shadow-md'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900'
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
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                {/* Card Header (Light Slate Gray like image 2) */}
                <div className="p-5 border-b border-slate-200 bg-slate-200/90 flex flex-col justify-between min-h-[115px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F96302] bg-white border border-orange-200 px-2.5 py-0.5 rounded shadow-sm">
                        {prod.profile}
                      </span>
                      {prod.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#B71510] px-2.5 py-0.5 rounded shadow-sm">
                          {prod.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-black text-sm text-slate-900 uppercase tracking-wide">
                      {prod.title}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-1">
                    Thickness: <span className="text-slate-900 font-bold">{prod.thickness}</span>
                  </div>
                </div>

                {/* Product Image (shown when available) */}
                {prod.image && (
                  <div className="relative overflow-hidden" style={{ height: '160px' }}>
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 flex-grow space-y-4 bg-white">
                  {/* Price Banner */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        {prod.price}
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {prod.priceDetail}
                      </p>
                    </div>
                    <Tag className="h-5 w-5 text-[#F96302]" />
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2">
                    {prod.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-tight">
                        <CheckCircle2 className="h-4 w-4 text-[#B71510] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Specs footer — larger bold font size */}
                  {prod.specs && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {prod.specs.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 text-xs font-mono">
                          <span className="text-slate-600 font-bold uppercase tracking-wider shrink-0">{spec.name}</span>
                          <span className="text-slate-950 font-black text-right">{spec.val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* WhatsApp Order Button */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <a
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi New Roofing Solutions, I am interested in ordering the promotional special: ${prod.title} (Thickness: ${prod.thickness}, Price: ${prod.price} ${prod.priceDetail}). Please provide a full free quotation.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center rounded-lg bg-[#F96302] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider hover:bg-[#d85402] hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center whitespace-nowrap gap-1.5 shadow-md"
                  >
                    GET A FREE QUOTE
                  </a>
                </div>
              </motion.div>
            ))}
          </div>


        </div>

      </div>
    </section>
  );
}
