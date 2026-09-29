import { SiteConfig, ServiceItem, FeaturedEvent, GalleryItem, Testimonial, ProcessStep, Principle } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "NOIR EVENTS",
  legalName: "Noir Events & Experiences Studio Ltd.",
  tagline: "Architects of Unforgettable Gatherings",
  headline: {
    line1: "WE CREATE",
    line2: "EVENTS",
    line3: "PEOPLE REMEMBER.",
  },
  description:
    "We plan, design, and orchestrate extraordinary corporate summits, luxury weddings, intimate private celebrations, concerts, and brand activations with cinematic precision and peerless artistic direction.",
  contact: {
    email: "concierge@noirevents.studio",
    inquiryEmail: "inquiries@noirevents.studio",
    phone: "+1 (800) 849-6647",
    intlPhone: "+44 (0) 20 7946 0912",
    address: {
      line1: "740 Mayfair Avenue, 4th Floor",
      city: "London",
      country: "United Kingdom",
    },
    locations: [
      { city: "London", country: "United Kingdom", address: "Mayfair Creative Quarter" },
      { city: "New York", country: "United States", address: "5th Ave Arts District" },
      { city: "Paris", country: "France", address: "Rue du Faubourg Saint-Honoré" },
    ],
  },
  socials: [
    { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Twitter / X", url: "https://x.com", icon: "Twitter" },
    { name: "Vimeo", url: "https://vimeo.com", icon: "Video" },
  ],
  stats: [
    {
      value: "150+",
      label: "Signature Events",
      description: "Delivered across 14 countries",
    },
    {
      value: "50+",
      label: "Global Brands",
      description: "Fortune 500 & luxury leaders",
    },
    {
      value: "8+",
      label: "Years of Craft",
      description: "Dedicated to experiential luxury",
    },
    {
      value: "98%",
      label: "Client Retention",
      description: "Unconditional satisfaction rate",
    },
  ],
};

export const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Events", href: "#events" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Process", href: "#process" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "corporate",
    number: "01",
    title: "Corporate Events & Summits",
    tagline: "Inspiring prestige and commanding authority",
    description:
      "From high-stakes shareholder galas to visionary annual leadership summits, we craft bespoke business environments that amplify your company's stature, align stakeholders, and leave lasting impressions.",
    iconName: "Briefcase",
    features: [
      "Keynote Stage & Set Design",
      "Executive Hospitality Lounges",
      "Live Global Broadcast Integration",
      "VIP Speaker Concierge",
    ],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "weddings",
    number: "02",
    title: "Weddings & Celebrations",
    tagline: "Poetic romance staged with architectural elegance",
    description:
      "We transform private estates, historic villas, and secluded coasts into bespoke fairy-tales. Every floral arrangement, culinary pairing, and lighting cue is orchestrated to tell your personal love story.",
    iconName: "Heart",
    features: [
      "Destination Villa & Estate Scouting",
      "Haute Cuisine & Wine Pairing",
      "Custom Spatial Architecture",
      "Discreet VIP Guest Coordination",
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "concerts",
    number: "03",
    title: "Concerts & Live Shows",
    tagline: "Visceral audio-visual spectacles of massive scale",
    description:
      "We design cutting-edge festival stages, arena tours, and intimate live acoustic sessions with stadium-grade acoustic fidelity, kinetic lighting rigs, laser mapping, and seamless crowd logistics.",
    iconName: "Music",
    features: [
      "Dynamic Laser & Projection Mapping",
      "Spatial Surround Sound Engineering",
      "Artist Rider & Stage Management",
      "Crowd Safety & Flow Operations",
    ],
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "activations",
    number: "04",
    title: "Brand Activations & Pop-ups",
    tagline: "Experiential marketing that captures viral imagination",
    description:
      "We build multi-sensory physical worlds that turn passive attendees into fervent brand advocates. Interactive installations, influencer unveils, and press previews engineered for peak social resonance.",
    iconName: "Sparkles",
    features: [
      "Custom Spatial Fabrications",
      "Interactive Digital Installations",
      "Influencer & Press Preview Logistics",
      "Real-Time Social Media Moments",
    ],
    image:
      "https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "private",
    number: "05",
    title: "Private Parties & Milestone Galas",
    tagline: "Uninhibited joy curated with white-glove discretion",
    description:
      "Exclusive birthday soirees, anniversary banquets, and high-society masquerades. We source rare venues, world-renowned chefs, and confidential headliners for experiences impossible to duplicate.",
    iconName: "GlassWater",
    features: [
      "Michelin-Starred Private Catering",
      "Headline Musical Talent Booking",
      "Thematic Immersion & Wardrobe Styling",
      "Strict Privacy & NDA Protections",
    ],
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "conferences",
    number: "06",
    title: "Conferences & Global Exhibitions",
    tagline: "Seamless multi-day congresses for thousands of innovators",
    description:
      "From multi-track breakout sessions to expansive exhibition halls, we manage badge credentials, translation booths, sponsor pavilions, and after-hours networking with frictionless operational rigor.",
    iconName: "Users",
    features: [
      "Multi-Track Audio Visual Logistics",
      "Interactive Sponsor Pavilions",
      "Smart Attendee Flow Design",
      "Post-Event Analytics & Footage",
    ],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  },
];

export const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: "leclat-du-verre",
    title: "L'Éclat du Verre Gala",
    category: "Corporate & Charity Gala",
    location: "Grand Palais, Paris",
    year: "2025",
    description:
      "A black-tie philanthropic evening under an architectural glass dome with kinetic crystal chandeliers and a 40-piece philharmonic ensemble.",
    extendedDescription:
      "Honoring international heritage conservation, this bespoke gala gathered 600 dignitaries under Paris's storied glass vaults. We suspended 12 kinetic chandelier rings synchronized to an original symphonic score, accompanied by a 5-course gastronomic journey curated by 3-star Michelin chefs.",
    attendees: "600 VIP Guests",
    highlights: ["Custom Kinetic Lighting Rigs", "Philharmonic Synchronization", "Zero-Waste Floral Engineering"],
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    id: "aura-nocturne",
    title: "Aura Live Experience",
    category: "Concert & Festival",
    location: "Printworks Arena, London",
    year: "2025",
    description:
      "A 360-degree holographic music spectacle fusing progressive electronic soundscapes with hyper-synchronized lasers and kinetic robotics.",
    extendedDescription:
      "A boundary-pushing audio-visual show designed for 4,500 electronic music purists. Employing custom volumetric laser arrays and 8K LED ribbons, we immersed the audience inside a responsive digital cathedral.",
    attendees: "4,500 Attendees",
    highlights: ["Volumetric Laser Projection", "360° Spatial Acoustic Field", "Custom Stage Rigging"],
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    id: "solstice-nuptials",
    title: "Solstice Coastal Nuptials",
    category: "Luxury Destination Wedding",
    location: "Ravello, Amalfi Coast",
    year: "2024",
    description:
      "A three-day cliffside celebration framed by the Mediterranean horizon, hand-crafted olive grove dining tables, and floating fireworks.",
    extendedDescription:
      "Perched 350 meters above the Tyrrhenian Sea, we orchestrated a three-day celebration spanning a private boat regatta, cliffside blessing surrounded by 10,000 heirloom white roses, and an evening dinner illuminated entirely by candlelight.",
    attendees: "180 Close Guests",
    highlights: ["Private Cliffside Construction", "Custom Artisan Ceramics", "Bespoke Midnight Barge Fireworks"],
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
    featured: false,
  },
  {
    id: "vanguard-keynote",
    title: "Vanguard Global Launch",
    category: "Brand Activation & Keynote",
    location: "Pier 48, San Francisco",
    year: "2024",
    description:
      "The cinematic reveal of next-generation autonomous aerospace technology with interactive spatial displays and live world broadcast.",
    extendedDescription:
      "Combining industrial raw architecture with high-precision stage engineering, this hybrid launch was broadcast to 2.4 million viewers while hosting 1,200 tech leaders in an ultra-luxurious tiered arena.",
    attendees: "1,200 Onsite / 2.4M Stream",
    highlights: ["Ultra-wide 48K LED Canvas", "Live Satellite Broadcast", "Interactive Demo Labs"],
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    id: "metamorphosis-pavilion",
    title: "Metamorphosis Couture Salon",
    category: "Fashion Activation",
    location: "Palazzo Reale, Milan",
    year: "2025",
    description:
      "An ethereal runway installation crafted from reflective mirrors, living botanical moss, and acoustic rain curtains for Milan Fashion Week.",
    extendedDescription:
      "Designed as an ode to natural transformation, this immersive showcase blurred the line between contemporary sculpture and fashion theatre for leading international editors and celebrities.",
    attendees: "350 Fashion Dignitaries",
    highlights: ["Living Flora Sculptures", "Reflective Infinity Runway", "Acoustic Scent Dispersion"],
    image:
      "https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=1400&q=80",
    featured: false,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Starlight Banquet",
    category: "Weddings",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "tall",
  },
  {
    id: "gal-2",
    title: "Prismatic Stadium Lights",
    category: "Concerts",
    location: "London Arena",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "wide",
  },
  {
    id: "gal-3",
    title: "Keynote Theatre of the Future",
    category: "Corporate",
    location: "San Francisco",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "square",
  },
  {
    id: "gal-4",
    title: "Mirrored Pavilion",
    category: "Activations",
    location: "Milan, Italy",
    image:
      "https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "wide",
  },
  {
    id: "gal-5",
    title: "Gilded Ballroom Reception",
    category: "Corporate",
    location: "Vienna Palace",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "tall",
  },
  {
    id: "gal-6",
    title: "Midnight Toast",
    category: "Activations",
    location: "Manhattan Penthouse",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "square",
  },
  {
    id: "gal-7",
    title: "Amphitheatre Electric Dreams",
    category: "Concerts",
    location: "Berlin Techno Temple",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "wide",
  },
  {
    id: "gal-8",
    title: "Cliffside Al Fresco Supper",
    category: "Weddings",
    location: "Amalfi Coast",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
    aspectRatio: "tall",
  },
];

export const PRINCIPLES_DATA: Principle[] = [
  {
    number: "01",
    title: "Creative Direction & Spatial Architecture",
    description:
      "We treat event venues not as empty halls, but as living cinematic stages. Every perspective, focal point, lighting temperature, and sonic texture is deliberately shaped to evoke wonder.",
    iconName: "Compass",
  },
  {
    number: "02",
    title: "End-to-End White-Glove Planning",
    description:
      "From diplomatic security protocols and private air charter logistics to bespoke culinary curations and international vendor management, no detail escapes our rigorous oversight.",
    iconName: "ShieldCheck",
  },
  {
    number: "03",
    title: "Flawless Technical & Live Execution",
    description:
      "Production-grade redundancy, mil-spec staging engineering, and veteran backstage cue callers ensure live performances, keynotes, and ceremonial moments proceed with zero friction.",
    iconName: "Cpu",
  },
  {
    number: "04",
    title: "Emotionally Resonant Memories",
    description:
      "Spectacle without soul is forgotten by morning. We design psychological crescendos and intimate surprises that forge indelible memories for your guests for decades to come.",
    iconName: "Sparkles",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Audience psychology, vision, and ambitious objectives",
    description:
      "We begin with a deep exploration into your intent, brand codes, attendee demographic, acoustic nuances, and non-negotiables. We define the emotional arc of the event.",
    deliverables: [
      "Strategic Brief & Objectives Matrix",
      "Feasibility & Budget Architecture",
      "Venue Sourcing & Site Inspection Dossier",
    ],
  },
  {
    step: "02",
    title: "Design",
    subtitle: "Spatial rendering, sensory mapping, and artistic vision",
    description:
      "Our architects and scenographers draft 3D photorealistic spatial models, lighting simulations, custom culinary journeys, and thematic branding for your approval.",
    deliverables: [
      "Photorealistic 3D Spatial Renders",
      "Lighting & Acoustic Engineering Plots",
      "Gastronomy & Beverage Curation",
    ],
  },
  {
    step: "03",
    title: "Execute",
    subtitle: "Synchronized production, vendor mastery, and live command",
    description:
      "Our operations command post orchestrates hundreds of specialized artisans, structural engineers, AV technicians, and hospitality concierges with time-stamped precision.",
    deliverables: [
      "Master Minute-by-Minute Run of Show",
      "Complete Technical Rigging & Soundcheck",
      "VIP Hospitality & Security Protocol",
    ],
  },
  {
    step: "04",
    title: "Celebrate",
    subtitle: "Unforgettable crescendo and timeless legacy",
    description:
      "As doors open, our invisible backstage machine ensures you and your guests are entirely present to revel in an extraordinary, flawless celebration.",
    deliverables: [
      "Seamless Live Event Orchestration",
      "Executive Host Accompaniment",
      "Archival 4K Cinematography & Analytics",
    ],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "lumina-tech",
    quote:
      "NOIR EVENTS transformed our annual global summit into a theatrical masterpiece. Our attendees are still raving about the holographic reveal. The level of calm professionalism under pressure is unmatched.",
    author: "Elena Rostova",
    role: "VP of Global Brand Experience",
    company: "Lumina Technologies",
    event: "Vanguard Global Launch (1,200 attendees)",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "sterling-vance",
    quote:
      "When hosting heads of state and sovereign fund leaders, there is zero tolerance for operational error. Noir delivered a flawless, gilded evening at the Grand Palais that set a new benchmark for private diplomacy.",
    author: "Marcus Sterling",
    role: "Managing Partner",
    company: "Sterling & Vance Capital",
    event: "L'Éclat du Verre Gala (Paris)",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "amalfi-wedding",
    quote:
      "They engineered an entire floating reception over the Mediterranean cliff edge that looked like an architectural dream. It wasn't just a wedding; it was the happiest, most magical weekend of our lives.",
    author: "Sophia & Julian Chen",
    role: "Private Clients",
    company: "London & Singapore",
    event: "Three-Day Amalfi Coast Nuptials",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "apex-fest",
    quote:
      "Noir's lighting and stage architects understand sensory immersion better than anyone in Europe. Their custom kinetic rigs gave our festival the visual identity of the decade.",
    author: "David K. Hawthorne",
    role: "Festival Executive Producer",
    company: "Apex Sound Arts",
    event: "Aura Live Experience (London)",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "maison-couture",
    quote:
      "Every single guest felt transported into an editorial wonderland. Noir understood our maison's heritage immediately and executed with the delicate touch of a high-fashion atelier.",
    author: "Claire de Montmirail",
    role: "Artistic Director",
    company: "Maison Joaillerie",
    event: "Metamorphosis Salon (Milan)",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
];

export const INQUIRY_OPTIONS = {
  eventTypes: [
    "Corporate Summit or Gala",
    "Luxury Destination Wedding",
    "Concert or Live Performance",
    "Brand Activation & Pop-Up",
    "Private Milestone Celebration",
    "Congress or Global Exhibition",
    "Other Bespoke Experience",
  ],
  budgetRanges: [
    "$35,000 – $75,000",
    "$75,000 – $150,000",
    "$150,000 – $350,000",
    "$350,000 – $1,000,000",
    "$1,000,000+ (Ultra-High Production)",
  ],
  guestCounts: [
    "Under 50 (Intimate VIP)",
    "50 – 150 Guests",
    "150 – 500 Guests",
    "500 – 1,500 Attendees",
    "1,500+ (Massive Scale)",
  ],
};
