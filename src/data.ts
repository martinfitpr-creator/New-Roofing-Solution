import { ServiceDetail, BlogPost, ProjectItem } from './types';

export const COMPANY_INFO = {
  name: 'New Roofing Solutions',
  tagline: 'Quality Roofing. Built to Last.',
  taglineAlternative: "Better Roofs. Better Living. Let's Build It Together!",
  email: 'info@newroofingsolutions.co.za',
  phone: '0113144386',
  phoneDisplay: '011 314 4386',
  landline: '0113144737',
  landlineDisplay: '011 314 4737',
  landlineAlternative: '0680876623',
  landlineAlternativeDisplay: '068 087 6623',
  landlineAlternative2: '0113144396',
  landlineAlternative2Display: '011 314 4396',
  website: 'www.newroofingsolutions.co.za',
  whatsappUrl: 'https://wa.me/27680876623',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61572867532674',
  tiktokUrl: 'https://www.tiktok.com/@newroofingsolutions?is_from_webapp=1&sender_device=pc',
  linkedinUrl: 'https://www.linkedin.com/in/new-roofing-solutions-17b5243b4/?isSelfProfile=false',
  address: '78c Olifantsfontein Road, Glen Austin AH, Midrand',
  deliveryText: 'We Deliver Nationwide',
};

export interface PromoProduct {
  id: string;
  title: string;
  profile: 'IBR' | 'Corrugated' | 'Chromodek' | 'Accessories';
  thickness: string;
  price: string;
  priceDetail: string;
  features: string[];
  tag?: string;
  specs?: { name: string; val: string }[];
}

export const PROMO_PRODUCTS: PromoProduct[] = [
  {
    id: 'promo-chromodek-053',
    title: 'Chromodek Roof Sheets (Premium)',
    profile: 'Chromodek',
    thickness: '0.53mm',
    price: 'R128.00',
    priceDetail: 'per meter (Excl. VAT)',
    tag: 'Promo Special',
    features: [
      'Durable & long lasting protection',
      'Extra UV & weathering protection',
      'Custom lengths fabricated to order',
      'High-strength structural steel'
    ],
    specs: [
      { name: 'Profile Type', val: 'IBR / Corrugated' },
      { name: 'Thickness', val: '0.53mm' },
      { name: 'Origin', val: 'Direct from Manufacturer' },
      { name: 'Delivery', val: 'Nationwide' }
    ]
  },
  {
    id: 'promo-ibr-040',
    title: '0.40mm Roof Sheets (IBR & Corrugated)',
    profile: 'IBR',
    thickness: '0.40mm',
    price: 'R64.00',
    priceDetail: 'per meter (Excl. VAT)',
    tag: 'Unbeatable Value',
    features: [
      'High quality steel sheets',
      'Boxed (IBR) or wave (Corrugated) profiles',
      'Weather-resistant galvanized surface',
      'Unbeatable factory-direct prices'
    ],
    specs: [
      { name: 'Profile Options', val: 'IBR / Corrugated' },
      { name: 'Thickness', val: '0.40mm' },
      { name: 'Tax status', val: 'Excl. VAT' }
    ]
  },
  {
    id: 'promo-ibr-030',
    title: '0.30mm Roof Sheets (IBR & Corrugated)',
    profile: 'IBR',
    thickness: '0.30mm',
    price: 'R50.75',
    priceDetail: 'per meter (Excl. VAT)',
    tag: 'Best Seller',
    features: [
      'Amazing cost-effective durability',
      'Perfect for residential & commercial builds',
      'High rust resistance and weather proofing',
      'Custom lengths available'
    ],
    specs: [
      { name: 'Profile Options', val: 'IBR / Corrugated' },
      { name: 'Thickness', val: '0.30mm' },
      { name: 'Tax status', val: 'Excl. VAT' }
    ]
  },
  {
    id: 'promo-corrugated-027',
    title: '0.27mm Steel Roof Sheets',
    profile: 'Corrugated',
    thickness: '0.27mm',
    price: 'R47.50',
    priceDetail: 'per meter (Excl. VAT)',
    tag: 'Budget Friendly',
    features: [
      'Wave profile galvanized sheeting',
      'Lightweight and high structural strength',
      'Direct from manufacturer pricing',
      'Guaranteed quality you can see'
    ],
    specs: [
      { name: 'Profile Type', val: 'Corrugated wave profile' },
      { name: 'Thickness', val: '0.27mm' },
      { name: 'Material', val: 'Galvanized high-grade steel' }
    ]
  },
  {
    id: 'promo-roofing-nails',
    title: 'Premium NRS Roofing Nails / Wire Nails',
    profile: 'Accessories',
    thickness: '2-inch, 3-inch & 4-inch',
    price: 'R25.00',
    priceDetail: 'per pack (Excl. VAT)',
    tag: 'Essential Accessory',
    features: [
      'Available sizes: 2-inch, 3-inch & 4-inch',
      'Strong, reliable, built to hold sheets tightly',
      'Rust-resistant finish to prevent leaks at fixing points',
      'Heavy-duty round wire design'
    ],
    specs: [
      { name: 'Nail Sizes', val: "2-Inch, 3-Inch, 4-Inch" },
      { name: 'Price status', val: 'R25 (Excl. VAT)' }
    ]
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'roof-installations',
    title: 'Professional Roof Installations',
    shortDesc: 'New roofs built for durability and long-term performance.',
    description: 'A professionally installed roof protects your property, improves energy efficiency, and increases property value. New Roofing Solution provides expert roof installation services for residential, commercial, and industrial properties throughout South Africa.',
    iconName: 'Wrench',
    benefits: [
      'Durable and weather-resistant structures built for Southern African sun and storms',
      'High energy efficiency with premium under-roof insulation options',
      'Significantly improved property value and curb appeal',
      'Low maintenance requirements for decades',
      'Comprehensive material guarantees and expert workmanship warranties',
    ],
    process: [
      { step: '01', title: 'Consultation & Site Inspection', desc: 'We inspect your blueprints or existing structure, measuring the pitch and engineering requirements.' },
      { step: '02', title: 'Material Selection & Quotation', desc: 'Choose from concrete tiles, corrugated sheets, IBR, or Chromadek. Receive a detailed, transparent price quotation.' },
      { step: '03', title: 'Professional Installation', desc: 'Our experienced crews install trusses, underlay, battens, insulation, and the final roofing materials to strict building codes.' },
      { step: '04', title: 'Final Inspection & Clean-up', desc: 'A thorough quality checklist ensures flawless flashing, valleys, and structural integrity. We clean the entire site before sign-off.' },
    ],
    faqs: [
      { q: 'What materials do you install?', a: 'We install Tile Roofs, Metal Roofs, Corrugated Roofs, IBR Roofs, Chromadek Roofing, Standing Seam Roofing, and Flat Roof Systems.' },
      { q: 'How long does a new roof installation take?', a: 'Typically 3 to 7 working days depending on the size, complexity of pitch, and chosen materials.' },
    ],
    seoKeywords: 'Roof Installation South Africa | Roofing Contractors South Africa | New Roof Installation | Professional Roof Installers',
    imageAlt: 'Roof Installations South Africa',
  },
  {
    slug: 'roof-repairs',
    title: 'Expert Roof Repairs',
    shortDesc: 'Fast and reliable repairs that restore your roof\'s integrity.',
    description: 'Roof damage can quickly lead to water damage, mould growth, and expensive structural repairs. Our roofing specialists provide fast, reliable, and durable roof repair services throughout South Africa for storm damage, worn structures, and general wear.',
    iconName: 'Hammer',
    benefits: [
      'Prevent costly downstream structural and ceiling damage',
      'Extend the overall lifespan of your existing roof structure',
      'Improve home insulation and stop active leaks instantly',
      'Restore visual integrity and prevent wood rot in trusses',
    ],
    process: [
      { step: '01', title: 'Emergency Response & Diagnosis', desc: 'We locate the precise source of leaks or structural failure, even hidden ones behind plaster or flashings.' },
      { step: '02', title: 'Emergency Tarping / Patching', desc: 'If storm damage threatens immediate rain penetration, we implement temporary weather protection.' },
      { step: '03', title: 'Structural Restoration', desc: 'We replace broken tiles, mend flashing, seal fasteners, or replace damaged timber and trusses.' },
      { step: '04', title: 'Sealing and Guarantee', desc: 'All repaired areas are thoroughly waterproofed, tested, and backed by our workmanship repair guarantee.' },
    ],
    faqs: [
      { q: 'Do you handle emergency roof repairs during heavy rain?', a: 'Yes, we provide emergency storm damage tarping and rapid repair services across Gauteng and other key service areas.' },
      { q: 'What are the main causes of roof damage in South Africa?', a: 'Harsh UV radiation degrading sealant washers, severe hailstorms cracking tiles, and heavy downpours overwhelming gutter valleys.' },
    ],
    seoKeywords: 'Roof Repairs South Africa | Emergency Roof Repairs | Roof Leak Repair | Roofing Specialists',
    imageAlt: 'Emergency Roof Repairs South Africa',
  },
  {
    slug: 'roof-waterproofing',
    title: 'Premium Roof Waterproofing',
    shortDesc: 'Protect your property against leaks and water damage.',
    description: 'Waterproofing is one of the most important investments you can make in protecting your property. Our high-performance waterproofing systems prevent leaks, moisture entry, mould growth, and premature roof deterioration on concrete, tile, and metal surfaces.',
    iconName: 'Shield',
    benefits: [
      'Absolute, long-lasting barrier against South African summer downpours',
      'Prevents structural concrete cancer, rusted fasteners, and peeling ceiling paint',
      'Prevents dangerous mould spores from breeding in ceiling cavities',
      'Reduces long-term preventative maintenance costs dramatically',
    ],
    process: [
      { step: '01', title: 'Surface Preparation', desc: 'High-pressure washing to remove moss, dirt, and loose coatings. This step is critical for proper membrane adhesion.' },
      { step: '02', title: 'Priming & Joint Sealing', desc: 'We apply specialized primers and seal all expansion joints, flashing intersections, and fastener heads.' },
      { step: '03', title: 'Waterproofing Membrane Application', desc: 'We apply premium torch-on bitumen membranes (for flat concrete) or liquid rubber membranes with heavy-duty polyester mesh.' },
      { step: '04', title: 'UV Protection Topcoat', desc: 'A final protective coating is applied to shield the waterproofing from harsh South African solar degradation.' },
    ],
    faqs: [
      { q: 'How long does professional waterproofing last?', a: 'With our premium torch-on and liquid membrane systems, coatings last 5 to 10 years, with simple refresher coats extending it indefinitely.' },
      { q: 'What is Torch-On waterproofing?', a: 'It is a robust bitumen-based membrane melted directly onto flat concrete slabs to create an impenetrable, seamless water barrier.' },
    ],
    seoKeywords: 'Roof Waterproofing South Africa | Waterproofing Contractors South Africa | Flat Roof Waterproofing | Roof Leak Solutions',
    imageAlt: 'Roof Waterproofing South Africa',
  },
  {
    slug: 'roof-replacements',
    title: 'Complete Roof Replacements',
    shortDesc: 'Complete replacements that give your property a fresh start.',
    description: 'If your roof has reached the end of its lifespan, replacing it is more cost-effective than continual repairs. New Roofing Solution provides complete roof replacement (re-roofing) services using premium materials designed for long-term South African weather protection.',
    iconName: 'RefreshCw',
    benefits: [
      'Eliminate recurring repair bills entirely',
      'Integrate modern materials with superior thermal rating and sound dampening',
      'A beautiful visual transformation that updates older properties instantly',
      'Peace of mind with extended multi-year comprehensive structural warranties',
    ],
    process: [
      { step: '01', title: 'Safe Removal of Old Roofing', desc: 'We systematically strip away old tiles or rusted iron, ensuring zero damage to the underlying structure or interior.' },
      { step: '02', title: 'Timber Truss Inspection & Bracing', desc: 'We inspect the wooden frame for dry rot or sagging, reinforcing trusses and brandering where necessary.' },
      { step: '03', title: 'Insulation & Underlay Installation', desc: 'We lay down premium heavy-duty plastic underlay and thick thermal insulation for maximum energy efficiency.' },
      { step: '04', title: 'New Roofing Laying & Detailing', desc: 'We mount your choice of premium Chromadek, Tile, or Metal roofing with state-of-the-art rustproof fasteners.' },
    ],
    faqs: [
      { q: 'Can I change my roof type during replacement (e.g. tile to metal)?', a: 'Yes! We specialize in converting heavy tile roofs to light metal profiles, which reduces structural weight and gives a highly modern look.' },
      { q: 'Do we have to move out during the replacement?', a: 'Usually, no. We work in progressive sections to ensure your home is kept weather-tight and safe at all times.' },
    ],
    seoKeywords: 'Roof Replacement South Africa | Re-roofing Contractors South Africa | Tile to Metal Conversion | Roof Stripping',
    imageAlt: 'Roof Replacement South Africa',
  },
  {
    slug: 'roof-leak-repairs',
    title: 'Emergency Roof Leak Repairs',
    shortDesc: 'Stop active leaks before they ruin your interior.',
    description: 'Even small leaks can cause massive plaster deterioration, structural wood rot, and electrical short circuits. Our rapid response team specializes in fast detection and permanent fixing of tricky, hard-to-find roof leaks.',
    iconName: 'DropletOff',
    benefits: [
      'Prevent catastrophic ceiling collapses',
      'Saves high-end carpets, furniture, and internal electronics',
      'Advanced thermal and moisture scanning to find leaks without destroying drywall',
      'Affordable, pinpointed fixes rather than paying for unnecessary whole-roof work',
    ],
    process: [
      { step: '01', title: 'Moisture Mapping', desc: 'We track water paths from the interior ceiling up into the roof structure to isolate exact leak entries.' },
      { step: '02', title: 'Sarking & Felt Repair', desc: 'Often leaks are caused by torn plastic under-ceiling paper. We replace damaged felt sections.' },
      { step: '03', title: 'Flashing Restoration', desc: 'We replace rusted metal or lead flashing around chimneys, solar geyser pipes, and walls.' },
      { step: '04', title: 'Water-testing', desc: 'We perform active water testing on the repair to confirm the leak is 100% cured.' },
    ],
    faqs: [
      { q: 'Why is my roof leaking only during heavy wind and rain?', a: 'This is usually due to wind-driven rain getting blown up underneath tiles or ridge caps, or flashing being loose and lifting up under heavy gusts.' },
      { q: 'How quickly can your repair team arrive?', a: 'We strive for same-day inspection and emergency mitigation for high-severity residential and commercial leaks.' },
    ],
    seoKeywords: 'Emergency Roof Leak Repairs | Stop Roof Leaks South Africa | Roof Leak Detection | Repair Leaking Roof',
    imageAlt: 'Roof Leak Repairs South Africa',
  },
  {
    slug: 'roof-maintenance',
    title: 'Preventative Roof Maintenance',
    shortDesc: 'Preventative care that protects your investment.',
    description: 'Regular roof maintenance extends the lifespan of your roofing system and prevents costly emergency repairs. Our preventative packages keep your roof clean, clear, and perfectly sealed against South Africa\'s intense seasonal shifts.',
    iconName: 'CalendarCheck',
    benefits: [
      'Catch minor deterioration before it becomes a multi-thousand Rand disaster',
      'Keep your manufacturer material warranties fully compliant and active',
      'Ensure clear valleys and gutters so rain flows off rapidly without flooding',
      'Maintain peak structural beauty and market appeal for your building',
    ],
    process: [
      { step: '01', title: 'Scheduled Inspection', desc: 'A twice-yearly walk-through checking all fasteners, sealants, tile placements, and ridge capping.' },
      { step: '02', title: 'Debris Removal & Gutter Cleanout', desc: 'We remove leaves, branches, and sand from all gutters, downpipes, and drainage valleys.' },
      { step: '03', title: 'Screw Tightening & Washer Replacement', desc: 'For metal roofs, we tighten any loose roofing screws and replace cracked weather-sealing washers.' },
      { step: '04', title: 'Minor Touch-ups & Report', desc: 'We reseal flashing joints and hand over a comprehensive health report with photo evidence for your records.' },
    ],
    faqs: [
      { q: 'How often should a roof undergo professional maintenance?', a: 'We highly recommend a maintenance service once a year—ideally just before the rainy summer season begins in high-rainfall regions.' },
      { q: 'Does roof maintenance really save money?', a: 'Absolutely. Over 80% of emergency roof replacements could have been delayed by up to 15 years with basic annual maintenance.' },
    ],
    seoKeywords: 'Roof Maintenance Services South Africa | Roof Inspections | Preventative Roof Care | Extend Roof Life',
    imageAlt: 'Roof Maintenance South Africa',
  },
  {
    slug: 'roof-inspections',
    title: 'Professional Roof Inspections',
    shortDesc: 'Comprehensive roof assessments and certificates of compliance.',
    description: 'Whether buying a new property, selling, claiming insurance, or checking for storm damage, our certified roofing inspectors provide unbiased, deeply detailed reports on the condition of any residential, commercial, or industrial roof.',
    iconName: 'Eye',
    benefits: [
      'A complete, professional diagnostic report with photos and repair estimates',
      'Required documentation for home sale transfers and insurance claims',
      'Locate hidden structural flaws, truss degradation, and moisture traps',
      'Unbiased advice on whether to repair, waterproof, or fully replace',
    ],
    process: [
      { step: '01', title: 'Visual & Structural Survey', desc: 'We inspect the external coverings, ridges, hips, and flashing, then crawl into the ceiling space to check trusses.' },
      { step: '02', title: 'Moisture Detection', desc: 'We check timber moisture levels to identify slow leaks that are rotting structural wood without visible ceiling damp.' },
      { step: '03', title: 'Valuation & Code Compliance Review', desc: 'We check the roof structural integrity against South African National Standards (SANS) building regulations.' },
      { step: '04', title: 'Certification Delivery', desc: 'We provide a detailed Roof Condition Report and, if fully sound, a Roof Certificate of Compliance (CoC).' },
    ],
    faqs: [
      { q: 'When do I need a Roof Certificate of Compliance?', a: 'Many banks require a structural roof compliance report before approving home bonds or during transfer of older properties.' },
      { q: 'How much does a professional roof inspection cost?', a: 'We provide competitive inspection rates with free, no-obligation quotations for any subsequent remedial repair work we identify.' },
    ],
    seoKeywords: 'Roof Inspections South Africa | Roof Certification of Compliance | Property Pre-purchase Roof Check | Certified Roof Inspector',
    imageAlt: 'Roof Inspections South Africa',
  },

  {
    slug: 'gutter-installation-repairs',
    title: 'Gutter Installation & Repairs',
    shortDesc: 'Proper drainage systems that protect your foundations and walls.',
    description: 'Proper gutter systems direct rainwater away from your property, protecting your foundations, exterior walls, and ceiling structures. New Roofing Solution designs and installs custom, seamless gutters with durable storm downpipes.',
    iconName: 'Sparkles',
    benefits: [
      'Stop rainwater from eroding garden beds and flooding building foundations',
      'Prevent unsightly, damp stains and paint peeling on exterior walls',
      'High-capacity designs that handle the heaviest tropical and summer storms',
      'Modern, seamless aluminum gutters that never rust and add a clean, beautiful trim line',
    ],
    process: [
      { step: '01', title: 'Slope & Capacity Calculation', desc: 'We design the optimal pitch and select either 125mm (residential) or 150mm (commercial/industrial) gutter sizes.' },
      { step: '02', title: 'Seamless On-Site Fabrication', desc: 'Using mobile roll-forming machines, we extrude seamless aluminum gutters to the exact custom lengths of your roof eaves.' },
      { step: '03', title: 'Secure Fixing & Sealing', desc: 'We bracket the gutters securely to fascia boards using rustproof internal hangers, sealing corner joints with marine-grade silicone.' },
      { step: '04', title: 'Downpipe Integration & Flow Test', desc: 'We install robust downpipes and perform water flow tests to guarantee smooth, fast drainage.' },
    ],
    faqs: [
      { q: 'Why are seamless aluminum gutters better than PVC?', a: 'Aluminum gutters have no seams, so they are virtually leak-proof. They don\'t warp under hot sun or crack like plastic PVC gutters do.' },
      { q: 'How often should gutters be cleaned?', a: 'At least twice a year, especially at the start of autumn and right before South Africa\'s summer rain seasons.' },
    ],
    seoKeywords: 'Gutter Installation South Africa | Gutter Repairs | Seamless Aluminum Gutters | Rainwater Drainage Solutions',
    imageAlt: 'Seamless Gutter Installation South Africa',
  },

  {
    slug: 'residential-roofing',
    title: 'Residential Roofing Services',
    shortDesc: 'Safe, durable, and premium roofing solutions for South African homes.',
    description: 'Your home deserves a roof that is safe, structurally perfect, and beautifully aligned with your architecture. We provide comprehensive residential roofing services for houses, townhouse complexes, apartment estates, and new residential developments.',
    iconName: 'Home',
    benefits: [
      'Experienced residential installers who treat your property with respect',
      'Premium insulation options (aerolite/think pink) to lower household energy costs',
      'Strict compliance with SANS building regulations for perfect safety',
      'Tidy site protocols—we clean up completely so your family is safe from nails and dust',
    ],
    process: [
      { step: '01', title: 'Consultation & Style Pairing', desc: 'We help you choose the best style (Harvey tiles, slate, corrugated, or concrete tiles) that complements your home\'s design.' },
      { step: '02', title: 'Detailed Estimation', desc: 'A transparent bill of quantities showing every truss, sheet, tile, and labor hour with zero hidden charges.' },
      { step: '03', title: 'Expert Structural Work', desc: 'Our certified residential crew completes the project while protecting your garden, pool, and solar setups.' },
      { step: '04', title: 'Guaranteed Handover', desc: 'A thorough walkthrough, final sweep, and hand-over of warranties.' },
    ],
    faqs: [
      { q: 'What residential roof styles are most popular in South Africa?', a: 'Modern concrete tiles, Harvey tiles (steel with slate chips), and Chromadek metal sheets in charcoal and dark grey are highly popular.' },
      { q: 'Do you work with home insurance claims for storm/hail damage?', a: 'Yes! We provide certified assessments and official quotations required by South African insurers to speed up your claim.' },
    ],
    seoKeywords: 'Residential Roofing Services South Africa | Home Roofing Contractors | Metal and Tile Roofs for Houses | Residential Roof Repairs',
    imageAlt: 'Residential Roofing South Africa',
  },
  {
    slug: 'commercial-roofing',
    title: 'Commercial Roofing Systems',
    shortDesc: 'Professional large-scale roofing systems for offices, schools, and malls.',
    description: 'Commercial roofing projects require strict compliance, professional project management, and minimized business disruption. New Roofing Solution delivers high-grade commercial roofing for offices, retail malls, clinics, schools, and complexes across South Africa.',
    iconName: 'Building',
    benefits: [
      'Minimal footprint on active business operations with off-hours scheduling',
      'Strict adherence to OHS (Occupational Health & Safety) regulations and site rules',
      'Highly durable, large-scale flat roof, concrete slab, and structural metal solutions',
      'Long-term maintenance plans that protect your commercial assets and tenants',
    ],
    process: [
      { step: '01', title: 'OHS Risk Assessment & Engineering Review', desc: 'We draft safety files, engineer scaffold layouts, and coordinate with facilities managers.' },
      { step: '02', title: 'Material Logistics Coordination', desc: 'Crane lifting and secure bulk material placement to maintain active parking and pedestrian safety.' },
      { step: '03', title: 'Advanced Waterproofing & Roofing', desc: 'Installation of high-grade commercial metal systems, standing seam, or double-layer torch-on waterproofing.' },
      { step: '04', title: 'Compliance Sign-off', desc: 'Completion of structural engineer certificate checks, guarantee issuances, and official hand-over.' },
    ],
    faqs: [
      { q: 'Do you provide safety files and operate under OHS acts?', a: 'Absolutely. We have full liability insurance, active COIDA letter of good standing, and compile comprehensive site safety files.' },
      { q: 'Can you work over weekends or after hours?', a: 'Yes, we customize our schedule so that noisy tasks are completed during off-peak times, keeping your tenants or shoppers happy.' },
    ],
    seoKeywords: 'Commercial Roofing Company South Africa | Commercial Roof Repairs | Office Block Waterproofing | Commercial Roofing Contractors',
    imageAlt: 'Commercial Roofing South Africa',
  },
  {
    slug: 'industrial-roofing',
    title: 'Industrial Roofing Contractors',
    shortDesc: 'Heavy-duty industrial systems for factories, warehouses, and depots.',
    description: 'Industrial roofing demands high structural strength, expert project speed, and specialized materials like IBR, standing seam, and Chromadek that can withstand large scale wind loads and internal industrial environments. We provide elite industrial solutions across South Africa.',
    iconName: 'Building2',
    benefits: [
      'Engineered metal systems designed for massive spans and specialized ventilation',
      'Corrosion-resistant metal options (like Colorbond or specialized PVC coated steels) for chemical and industrial zones',
      'Highly efficient rainwater harvesting integration and heavy IBR downpipes',
      'Turnkey solutions for warehouses, factories, aircraft hangars, and agricultural storage',
    ],
    process: [
      { step: '01', title: 'Structural Structural Checks', desc: 'Our steel design and truss engineers analyze structural dead-weights and purlin spacing.' },
      { step: '02', title: 'Heavy Material Mobilisation', desc: 'Using specialized truck-mount cranes, we safely lift heavy industrial steel coils and long-span IBR sheets.' },
      { step: '03', title: 'Precision Standing Seam & IBR Mounting', desc: 'We install continuous run sheets, removing overlapping joints to ensure perfect water tightness over massive square-meters.' },
      { step: '04', title: 'Industrial Ventilation & Skyline Fitment', desc: 'We integrate commercial polycarb skylight panels, smoke vents, and high-volume wind turbines (whirlybirds).' },
    ],
    faqs: [
      { q: 'What is IBR roofing sheeting?', a: 'Inverted Box Rib (IBR) is a square-fluted profile sheeting designed for maximum load-bearing and water drainage, perfect for warehouses and factories.' },
      { q: 'Do you install industrial skylights?', a: 'Yes! We install high-strength polycarbonate translucent sheets that let in natural sunlight, significantly reducing factory electrical costs.' },
    ],
    seoKeywords: 'Industrial Roofing Contractors South Africa | Warehouse Roof Replacement | IBR Chromadek Sheets | Factory Roofing Specialist',
    imageAlt: 'Industrial Roofing South Africa',
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Much Does Roof Repair Cost in South Africa?',
    slug: 'how-much-does-roof-repair-cost-south-africa',
    category: 'Guides',
    date: 'June 18, 2026',
    readTime: '5 min read',
    excerpt: 'An honest, transparent breakdown of average roof repair prices, leak repairs, and tile replacements in the South African market.',
    content: [
      'Understanding the cost of roof repairs in South Africa is essential for budgeting and avoiding overcharges. While every roof is unique, local pricing typically depends on whether you have concrete tiles, corrugated iron, or concrete slabs.',
      'Minor leak repairs (such as sealing a valley or replacing three to five cracked concrete tiles) typically range from R1,500 to R4,500. This usually includes labor, structural polyurethane sealant, and local material costs.',
      'For moderate repairs (such as replacing extensive flashing around a chimney, re-screwing an entire section of corrugated iron sheet, or re-laying worn underlay felt on a valley), you can expect costs between R4,500 and R12,000.',
      'Major repairs involving rotten truss replacement, massive storm damage reconstruction, or large-scale waterproofing on concrete slabs usually start from R12,000 and can scale upward depending on the structural engineering certificates required.',
      'Always remember: delaying a minor leak repair to save a few thousand Rand almost always leads to rotten wood trusses, ruined ceiling boards, and shorted electrical circuits—ultimately costing ten times more. Request a free diagnostic quote from New Roofing Solution to get an accurate, itemized cost estimate.',
    ],
    imageAlt: 'Roof Repair Costs South Africa',
  },
  {
    id: 'blog-2',
    title: '7 Crucial Signs Your Roof Needs a Complete Replacement',
    slug: 'signs-roof-needs-replacement',
    category: 'Roofing Tips',
    date: 'May 12, 2026',
    readTime: '4 min read',
    excerpt: 'Continual repairs can become a money pit. Learn the visual warning signs that tell you it is more cost-effective to replace your roof.',
    content: [
      'Roofs are designed to last decades, but they do not last forever. In South Africa, the extreme combination of blistering high-UV summer sunshine and violent winter storms or highveld hailstorms can cause materials to degrade prematurely.',
      'The first warning sign is frequent leaks in different rooms. If you are calling a contractor out three or four times a year to patch leaks in different spots, your roofing material has likely gone porous or the sheet metal is corroded beyond simple patch fixes.',
      'The second sign is visible structural sagging. If you look at your roofline from the street and notice dips, curves, or a wavy appearance, your wooden trusses may have dry rot or storm load damage—a major safety hazard.',
      'The third sign is rusted and paper-thin metal sheeting. If your corrugated or IBR roof shows severe orange rust pitting along valleys and overlaps, screws will no longer hold securely, risking sheet liftoff in high winds.',
      'At New Roofing Solution, we evaluate your roof honestly. If simple repairs can safely buy you another 5 to 10 years, we will tell you. If a replacement is the only safe option, we provide complete, budget-conscious packages with premium underlays and long-term guarantees.',
    ],
    imageAlt: 'Signs Roof Needs Replacement',
  },
  {
    id: 'blog-3',
    title: 'The Best Roofing Materials for South African Weather',
    slug: 'best-roofing-materials-south-african-weather',
    category: 'Materials',
    date: 'April 22, 2026',
    readTime: '6 min read',
    excerpt: 'From concrete roof tiles to modern steel Chromadek, explore which materials provide the ultimate protection against intense sun, wind, and hail.',
    content: [
      'Choosing the right roofing material for your South African home or business isn\'t just about aesthetics; it is about choosing a material that can survive extreme local weather environments.',
      '1. Chromadek Roofing: Chromadek is South Africa\'s gold standard for pre-painted galvanized steel. It has an organic coating designed to withstand severe UV rays, ocean salt spray, and extreme temperature swings. It is lightweight, modern, and excellent for rainwater collection.',
      '2. Concrete Roof Tiles: Highly durable, heavy, and extremely fire-resistant. Concrete tiles are excellent for coastal wind zones because their heavy weight keeps them firmly in place. However, they require a heavy-duty truss structure to support the load.',
      '3. Harvey Tiles: A highly popular lightweight steel tiling system coated with natural crushed stone. They offer the classic appearance of slate or concrete tiles but at a fraction of the weight, and are virtually indestructible against even the largest Highveld hailstones.',
      'Contact our consulting team to look at samples and find the perfect material combination for your budget and architectural style.',
    ],
    imageAlt: 'Roofing Materials South Africa',
  },
  {
    id: 'blog-4',
    title: 'How to Prevent Roof Leaks During Heavy Rain',
    slug: 'prevent-roof-leaks-heavy-rain',
    category: 'Maintenance',
    date: 'March 15, 2026',
    readTime: '4 min read',
    excerpt: 'Do not wait for the storm to start before checking your roof. Here is a handy checklist to secure your home before heavy rains arrive.',
    content: [
      'Heavy summer downpours in South Africa can dump fifty millimeters of water in less than an hour. If your drainage systems or sealants are not perfectly prepped, this volume of water will find its way inside.',
      'First, keep gutters clear. Leaves, twigs, and fine roof dust build up in gutters, creating direct blockages. When a storm hits, the water rises, flows backward over the fascia board, and floods straight into your eaves and ceiling.',
      'Second, inspect the flashing. Flashing is the metal or lead border that seals junctions between your roof sheets/tiles and brick chimneys, walls, or valleys. Cracked mortar joints or loose flashing screws are the most common source of mystery leaks.',
      'Third, check roof valley blockages. Valleys are the metallic channels where two sloping roof sections meet. If leaves get caught here, water dams up and pours under the tiles. Ensure these channels are clean and fully clear.',
    ],
    imageAlt: 'Prevent Roof Leaks Heavy Rain',
  },
  {
    id: 'blog-5',
    title: 'The Hidden Benefits of Roof Waterproofing in South Africa',
    slug: 'benefits-roof-waterproofing-south-africa',
    category: 'Waterproofing',
    date: 'February 28, 2026',
    readTime: '4 min read',
    excerpt: 'Discover how professional waterproofing stops mould, protects building concrete structures, and significantly lowers indoor heat.',
    content: [
      'Waterproofing is often seen as a reactive solution to stop active leaks. However, high-grade torch-on and liquid membrane waterproofing provide extensive preventative benefits that go far beyond simple leak patching.',
      'One major benefit is protecting concrete slabs from structural concrete rot. Water that gets absorbed into concrete reaches the internal steel rebar, causing it to rust, expand, and crack the concrete apart.',
      'Additionally, professional waterproofing systems block the growth of toxic black mould, which thrives in damp, dark ceiling spaces and causes severe respiratory issues for occupants.',
      'Finally, high-quality white or silver waterproofing elastomeric topcoats reflect up to 85% of solar radiation. This keeps your home or commercial building cooler, leading to major electricity savings on air conditioning.',
    ],
    imageAlt: 'Roof Waterproofing Benefits',
  }
];

export const PROJECTS_GALLERY: ProjectItem[] = [
  {
    id: 'p-1',
    title: 'Modern Residential Re-Roofing',
    category: 'residential',
    location: 'Sandton, Johannesburg',
    description: 'Stripped away old broken clay tiles and converted the structure into a premium, lightweight dark charcoal Chromadek corrugated metal roof with state-of-the-art Isoboard insulation.',
    beforeImg: '/images/media__1782324986421.jpg',
    afterImg: '/images/media__1782324917894.jpg',
  },
  {
    id: 'p-2',
    title: 'Industrial Warehouse Standing Seam',
    category: 'industrial',
    location: 'Midrand Industrial Depot',
    description: 'Over 4,500 square meters of high-strength industrial IBR Chromadek sheets installed with heavy-duty commercial polycarbonate skylights and natural-draft ventilation turbine whirlybirds.',
    beforeImg: '/images/media__1782324917921.jpg',
    afterImg: '/images/media__1782324917936.jpg',
  },
  {
    id: 'p-3',
    title: 'Commercial Office Block Waterproofing',
    category: 'commercial',
    location: 'Menlyn, Pretoria',
    description: 'Implemented a multi-layer 4mm Torch-On bitumen waterproofing system on a flat concrete roof slab, including advanced liquid membrane application on all heavy expansion joints.',
    beforeImg: '/images/media__1782324986403.jpg',
    afterImg: '/images/media__1782324986480.jpg',
  },
  {
    id: 'p-4',
    title: 'Residential Complex Gutter Overhaul',
    category: 'residential',
    location: 'Centurion, Gauteng',
    description: 'Installed 850 meters of custom seamless extruded aluminum gutters and downpipes for a high-end security housing estate, resolving persistent soil erosion around building foundations.',
    beforeImg: '/images/media__1782324986510.jpg',
    afterImg: '/images/media__1782324986543.jpg',
  },
  {
    id: 'p-5',
    title: 'Severe Storm Damage Restoration',
    category: 'repairs',
    location: 'Randburg, Johannesburg',
    description: 'Emergency tarping and immediate structural replacement of six broken timber roof trusses and brandering after a major hail-storm tree fall. Restored perfectly to SANS regulations.',
    beforeImg: '/images/media__1782325144714.jpg',
    afterImg: '/images/media__1782325144796.jpg',
  },
  {
    id: 'p-6',
    title: 'Flat Slab Concrete Waterproofing',
    category: 'waterproofing',
    location: 'Umhlanga, Durban',
    description: 'Marine-grade double waterproofing membrane installation on a luxury residential balcony and penthouse rooftop, complete with full thermal reflective protective white coating.',
    beforeImg: '/images/media__1782325144842.jpg',
    afterImg: '/images/media__1782325144865.jpg',
  }
];

export const SERVICE_AREAS = [
  { city: 'Johannesburg', region: 'Gauteng', details: 'Full residential and commercial coverage, including Sandton, Randburg, Roodepoort, Midrand, and East Rand.' },
  { city: 'Pretoria', region: 'Gauteng', details: 'Serving Centurion, Pretoria East, Pretoria North, Menlyn, and surrounding municipal areas.' },
  { city: 'Midrand', region: 'Gauteng', details: 'Commercial parks, industrial depots, and residential estates.' },
  { city: 'Centurion', region: 'Gauteng', details: 'High-speed storm damage repairs, waterproofing, and tile replacements.' },
  { city: 'Sandton', region: 'Gauteng', details: 'Premium corporate offices flat roof waterproofing and high-end residential re-roofing.' },
  { city: 'East Rand', region: 'Gauteng', details: 'Factories, warehouse roofs, and homes in Benoni, Boksburg, and Kempton Park.' },
  { city: 'West Rand', region: 'Gauteng', details: 'Krugersdorp, Roodepoort, and Randfontein roofing projects.' },
  { city: 'Durban', region: 'KwaZulu-Natal', details: 'Coastal corrosion protection, seamless gutter installs, and flat balcony waterproofing.' },
  { city: 'Waterfall & Kyalami', region: 'Midrand, Gauteng', details: 'High-end residential estate re-roofing, commercial parks waterproofing, and rapid dispatch roofing supplies.' },
  { city: 'Bloemfontein', region: 'Free State', details: 'Large agricultural sheds IBR roofing and central residential roofing.' },
  { city: 'Port Elizabeth', region: 'Eastern Cape', details: 'Coastal weatherproofing, metal roof painting, and general roof maintenance.' }
];

export const FAQS_LIST = [
  {
    q: 'How much does a roof repair cost in South Africa?',
    a: 'Minor leak repairs and tile replacements typically cost between R1,500 and R4,500. Moderate flashing repairs or re-screwing range from R4,500 to R12,000. Major truss reconstructions or massive waterproofing starts from R12,000. We provide 100% free, detailed, non-obligation quotes.'
  },
  {
    q: 'How often should my roof be inspected?',
    a: 'We recommend inspecting your roof at least once a year, preferably before the wet summer or winter season, or immediately after a severe hailstorm to detect hairline tile cracks early.'
  },
  {
    q: 'How long does a new roof installation take?',
    a: 'A standard residential roof installation or re-roofing project takes between 3 to 7 working days. Industrial projects are completed in phased schedules determined during structural review.'
  },
  {
    q: 'What is the best roofing material for South African weather?',
    a: 'Chromadek pre-painted steel sheets are exceptional for UV, rust, and hail resistance. Harvey Steel tiles are also incredibly robust for hail. Concrete tiles are highly suited for heavy wind and costal areas.'
  },
  {
    q: 'How long does roof waterproofing last?',
    a: 'Our high-grade 4mm Torch-On bitumen membranes and heavy-duty liquid rubber applications come with a 5 to 10 year durability guarantee, which can be extended indefinitely with basic routine touch-up maintenance.'
  },
  {
    q: 'Do you provide free roofing quotations?',
    a: 'Yes! We provide 100% free site inspections, leak diagnostics, and comprehensive itemized quotes throughout all our service regions.'
  },
  {
    q: 'Do you handle emergency roof repairs?',
    a: 'Yes, we have rapid response crews equipped to handle severe active leaks, storm wind damages, and structural failures to protect your interiors.'
  },
  {
    q: 'Do you work on commercial and industrial properties?',
    a: 'Yes, we are fully certified, compile comprehensive OHS (Occupational Health & Safety) site files, carry multi-million Rand liability insurance, and hold valid letters of good standing (COIDA) for large-scale corporate assets.'
  }
];
