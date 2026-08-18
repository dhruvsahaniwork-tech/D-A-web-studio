/**
 * D&A Web Studio - Centralized Data Store
 * All copy, founders information, services, case studies, and studio details.
 */

const studioData = {
  brand: {
    name: "D&A Web Studio",
    tagline: "Digital experiences that work everywhere.",
    subheading: "We build 3D animated, high-conversion websites and support systems that make your business easier to understand, easier to trust, and easier to choose.",
    email: "Dhruv.sahani.work@gmail.com",
    established: "2024",
    availability: "Accepting New Projects (Q3/Q4 2026)",
    stats: [
      { label: "Projects Delivered", value: "50+", icon: "rocket" },
      { label: "Client Satisfaction", value: "99.4%", icon: "smile" },
      { label: "Average ROI Uplift", value: "2.8x", icon: "trending-up" },
      { label: "Response Time", value: "< 2 hrs", icon: "zap" }
    ]
  },

  founders: [
    {
      id: "dhruv",
      name: "Dhruv Sahani",
      role: "Founder / Digital Direction & Strategy",
      image: "assets/dhruv.jpg",
      tagline: "Bridging bold visual design with high-conversion web strategy.",
      bio: "Dhruv drives the digital direction at D&A — from how a business should position itself online to how the final website should feel, animate, and perform. He is focused on turning complicated business needs into clear, memorable digital experiences.",
      points: [
        "Looks at every website from the business outcome and conversion side first.",
        "Designs purposeful 3D & interactive elements that engage rather than distract.",
        "Turns complicated value propositions into crisp, intuitive customer journeys.",
        "Engineers for lightning speed, Core Web Vitals, and long-term scalability."
      ],
      skills: ["Digital Strategy", "3D Web Experiences", "Conversion Architecture", "Full-Stack Web", "Growth Thinking"],
      socials: {
        email: "mailto:Dhruv.sahani.work@gmail.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      id: "amisha",
      name: "Amisha Kadve",
      role: "Co-Founder / Client Experience & Operations",
      image: "assets/amisha.jpg",
      tagline: "Bringing structure, empathy, and seamless coordination to every build.",
      bio: "Amisha brings structure, care, and a human perspective to the studio. She ensures every client feels heard, project milestones are executed flawlessly, and the experience of collaborating with D&A is as thoughtful as the work itself.",
      points: [
        "Champions clear, consistent, and transparent communication across all phases.",
        "Translates business requirements and feedback into structured project roadmaps.",
        "Focuses on human-centric customer support workflows and data integrity.",
        "Guarantees that no important detail gets lost from kickoff to final launch."
      ],
      skills: ["Operations", "Client Experience", "Project Coordination", "Quality Systems", "Delivery Management"],
      socials: {
        email: "mailto:Dhruv.sahani.work@gmail.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    }
  ],

  services: [
    {
      id: "web-development",
      num: "01",
      category: "WEB EXPERIENCES",
      title: "3D & Interactive Web Development",
      shortDesc: "Custom-built, 3D animated, high-performance websites engineered to turn attention into qualified enquiries and revenue.",
      fullDesc: "We build bespoke digital experiences using modern frameworks, Three.js 3D WebGL, and fluid animations. Designed mobile-first, optimized for extreme speed, and structured to make your brand impossible to ignore.",
      icon: "globe",
      features: [
        "Custom 3D WebGL & Interactive Animations",
        "Mobile-First Responsive Layouts (100% Cross-device)",
        "Ultra-Fast Load Times & 95+ Google PageSpeed",
        "Built-in Conversion Funnels & Lead Capture",
        "Clean, Maintainable & Scalable Codebase"
      ],
      badge: "Flagship Service",
      tags: ["Three.js", "Tailwind CSS", "Modern JS", "React / Next.js", "Animations"]
    },
    {
      id: "digital-growth",
      num: "02",
      category: "GROWTH",
      title: "Digital Growth & CRO Strategy",
      shortDesc: "Sharper digital positioning and conversion rate optimization that help people discover, trust, and choose your brand.",
      fullDesc: "A great website is only effective when it produces results. We analyze your customer journey, remove drop-off friction, optimize copy hierarchy, and implement SEO architectures to scale organic inbound demand.",
      icon: "trending-up",
      features: [
        "Full Customer Journey & Conversion Audit",
        "SEO Architecture & Technical Meta Optimization",
        "Strategic Copywriting & Value Proposition Tuning",
        "Analytics & Behavioral Heatmap Integration",
        "A/B Testing & Funnel Refinement"
      ],
      badge: "High Impact",
      tags: ["SEO", "CRO", "Funnel Strategy", "Analytics", "Positioning"]
    },
    {
      id: "chat-support",
      num: "03",
      category: "CX AUTOMATION",
      title: "Chat Support & Response Systems",
      shortDesc: "Real-time customer conversation workflows and smart automated response pipelines that prevent visitors from bouncing.",
      fullDesc: "Never miss an enquiry. We implement and manage responsive live chat protocols and intelligent response workflows that guide prospective clients to answers instantly and capture high-intent leads 24/7.",
      icon: "message-square",
      features: [
        "Real-Time Live Chat Integration",
        "Intelligent Lead Capture & Qualification Routing",
        "Custom Automated FAQ Response Workflows",
        "CRM & Slack / Discord Notification Bridges",
        "Continuous Response Quality Monitoring"
      ],
      badge: "24/7 Availability",
      tags: ["Live Chat", "CRM Integration", "Automation", "Lead Routing", "Customer CX"]
    },
    {
      id: "customer-support",
      num: "04",
      category: "PEOPLE & CARE",
      title: "Dedicated Customer Support Operations",
      shortDesc: "Reliable, human-led support operations built around accuracy, empathy, and high retention rates for growing brands.",
      fullDesc: "We provide structured customer support systems and team workflows that elevate client trust. From ticketing management to post-purchase inquiries, we ensure your customers always receive swift, respectful solutions.",
      icon: "headphones",
      features: [
        "Multi-Channel Helpdesk Management (Email & Chat)",
        "SLA Tracking & Rapid Resolution Protocols",
        "Standard Operating Procedures (SOP) Development",
        "Customer Feedback & Sentiment Reporting",
        "Empathetic, Brand-Aligned Communication"
      ],
      badge: "Human-Powered",
      tags: ["Helpdesk", "Zendesk/Intercom", "SLA Support", "Client Retention"]
    },
    {
      id: "data-review",
      num: "05",
      category: "QUALITY & ASSURANCE",
      title: "Data Review & Quality Control",
      shortDesc: "Meticulous human-in-the-loop review and quality assurance workflows for business datasets where accuracy is critical.",
      fullDesc: "Data errors cost businesses thousands in lost efficiency. Our rigorous data review operations inspect, clean, validate, and verify enterprise datasets, catalog listings, and user submissions with zero compromise on precision.",
      icon: "check-circle",
      features: [
        "Multi-Tier Dataset Verification Protocols",
        "Catalog & Inventory Integrity Audits",
        "Content Moderation & Compliance Checking",
        "Discrepancy Reporting & Rectification",
        "High-Throughput Accuracy Benchmarks (99.8%+)"
      ],
      badge: "High Precision",
      tags: ["Data QA", "Verification", "Compliance", "Accuracy", "Auditing"]
    },
    {
      id: "data-annotation",
      num: "06",
      category: "AI & DATA",
      title: "Data Annotation & AI Labeling",
      shortDesc: "Structured image, video, and text annotation pipelines built to fuel high-performing machine learning and AI models.",
      fullDesc: "Prepare your data for production AI. We provide structured, pixel-accurate bounding boxes, semantic segmentation, text classification, and entity tagging adhering strictly to your proprietary guidelines.",
      icon: "layers",
      features: [
        "Bounding Box & Polygonal Image Annotation",
        "Video Tracking & Keyframe Labeling",
        "NLP Text Classification & Named Entity Recognition",
        "Strict Double-Pass Quality Control",
        "Scalable Pipeline for Large Volumes"
      ],
      badge: "AI-Ready",
      tags: ["Computer Vision", "NLP", "Bounding Boxes", "Segmentation", "AI Datasets"]
    }
  ],

  caseStudies: [
    {
      id: "solaris-ai",
      title: "Solaris AI — Autonomous Analytics Platform",
      client: "Solaris Tech Global",
      category: "Web Experiences",
      metric: "+240% Lead Conversion",
      duration: "4 Weeks",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      description: "Designed and engineered an interactive 3D WebGL product tour showcasing real-time predictive analytics with custom dark glass aesthetics and interactive particle nodes.",
      tags: ["Three.js", "Tailwind CSS", "GSAP", "Analytics Engine"],
      link: "#"
    },
    {
      id: "velox-commerce",
      title: "Velox Luxury Watches — 3D Showroom",
      client: "Velox Horology London",
      category: "3D E-Commerce",
      metric: "+185% Time on Page",
      duration: "5 Weeks",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      description: "Implemented a real-time 3D watch customizer allowing buyers to rotate, inspect dial textures, change straps, and checkout with seamless 1-click payment flow.",
      tags: ["WebGL", "E-Commerce", "3D Customizer", "Stripe Flow"],
      link: "#"
    },
    {
      id: "strata-cloud",
      title: "Strata Cloud — Enterprise Infrastructure Portal",
      client: "Strata Cloud Systems",
      category: "Web & Support",
      metric: "99.8% Data Accuracy",
      duration: "6 Weeks",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      description: "Built a conversion-engineered multi-region portal complete with 24/7 automated chat support triage and real-time infrastructure data monitoring.",
      tags: ["Full-Stack", "Chat Support", "Data Pipeline", "UI/UX"],
      link: "#"
    },
    {
      id: "aurora-health",
      title: "Aurora BioTech — Interactive Research Hub",
      client: "Aurora Genomics",
      category: "Data & Growth",
      metric: "+320% Inbound Inquiries",
      duration: "3 Weeks",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      description: "A responsive, ultra-clean web platform featuring scientific data visualization, seamless client booking, and interactive genetic sequence annotation displays.",
      tags: ["Data Annotation", "Web Design", "SEO Growth", "Fast Load"],
      link: "#"
    }
  ],

  principles: [
    {
      num: "01",
      title: "Clarity Over Clutter",
      description: "A customer should never have to guess what your business offers, why it matters, or how to take the next step."
    },
    {
      num: "02",
      title: "3D & Motion With Purpose",
      description: "We don't add 3D animations just to look flashy; we craft immersive visuals that direct attention and elevate brand trust."
    },
    {
      num: "03",
      title: "Speed & Responsiveness",
      description: "Every website is engineered mobile-first, loading in milliseconds across smartphones, tablets, and high-res desktops."
    },
    {
      num: "04",
      title: "Founders' Personal Touch",
      description: "Every single project is directly overseen by Dhruv & Amisha. No middle-managers, no outsourcing to junior templates."
    }
  ],

  process: [
    {
      step: "01",
      title: "Discovery & Blueprint",
      desc: "We analyze your audience, identify conversion bottlenecks, and map out the visual narrative and technical blueprint."
    },
    {
      step: "02",
      title: "3D Concept & UI/UX Design",
      desc: "We craft interactive 3D assets, custom layouts, and interactive prototypes designed to impress and convert."
    },
    {
      step: "03",
      title: "Precision Engineering",
      desc: "We build responsive, ultra-fast code with Three.js, clean CSS, smooth micro-interactions, and robust backend integrations."
    },
    {
      step: "04",
      title: "Launch, QA & Scaling",
      desc: "Rigorous cross-device testing, SEO optimization, analytics setup, and ongoing growth support to ensure compounding ROI."
    }
  ],

  estimator: {
    serviceTypes: [
      { id: "web", name: "3D Animated Website", scopeLabel: "Custom 3D Architecture", time: "2-3 weeks" },
      { id: "growth", name: "Digital Growth & SEO Setup", scopeLabel: "Conversion & Discovery Strategy", time: "1-2 weeks" },
      { id: "chat", name: "Chat & CX Support System", scopeLabel: "Automation & Routing Workflows", time: "1 week" },
      { id: "data", name: "Data QA / Annotation Pipeline", scopeLabel: "Precision Quality & Labeling", time: "2 weeks" },
      { id: "full", name: "Complete Studio Suite", scopeLabel: "Full-Stack Design, Dev & Support", time: "3-4 weeks" }
    ],
    pagesCount: [
      { id: "single", label: "Single 3D Landing Page", detail: "High-Impact Focus" },
      { id: "multi-small", label: "3 - 5 Multi-Pages", detail: "Complete Studio Website" },
      { id: "multi-large", label: "6 - 10+ Pages / Portal", detail: "Comprehensive Platform" }
    ],
    addons: [
      { id: "threejs-custom", name: "Custom 3D Interactive Model / Canvas", benefit: "Bespoke 3D Geometry" },
      { id: "cms", name: "Content Management & Blog System", benefit: "Self-Editing Access" },
      { id: "rush", name: "Priority Fast-Track Delivery", benefit: "Accelerated Launch" },
      { id: "support-pack", name: "Dedicated Post-Launch Support", benefit: "Ongoing Maintenance" }
    ]
  },

  testimonials: [
    {
      quote: "D&A Web Studio transformed how our company looks to enterprise buyers. The 3D animations and crisp storytelling increased our demo booking rate by 180% in the first month.",
      author: "Marcus Vance",
      role: "CEO & Co-Founder",
      company: "Vance Logistics Global",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
    {
      quote: "Working directly with Dhruv and Amisha was refreshing. Dhruv solved all our technical and 3D visual challenges while Amisha kept every deadline razor sharp. Truly world-class.",
      author: "Elena Rostova",
      role: "Head of Marketing",
      company: "Aetherial AI Labs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
    },
    {
      quote: "The combination of high-end web design and accurate data support solved two huge bottlenecks for us under one roof. Highly recommend D&A Web Studio.",
      author: "David Chen",
      role: "Managing Director",
      company: "OmniCore Technologies",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    }
  ],

  faqs: [
    {
      q: "What makes D&A Web Studio different from other agencies?",
      a: "We blend cutting-edge 3D interactive web experiences with practical conversion architecture and reliable data/support operations. Plus, you work directly with both co-founders (Dhruv & Amisha) — ensuring personal attention, fast turnaround, and zero bureaucratic bloat."
    },
    {
      q: "Will 3D animations slow down my website on mobile phones?",
      a: "Not at all. We specifically engineer our Three.js WebGL scenes to use lightweight geometries, shader optimizations, and device pixel ratio adjustments. On low-power devices, it gracefully scales so load times stay under 1.5 seconds."
    },
    {
      q: "Can I request a single service or do I need the entire package?",
      a: "You can start with any single service — whether you just need a stunning 3D website, dedicated chat support workflows, or data annotation — and scale with us as your business grows."
    },
    {
      q: "How long does a typical 3D website project take?",
      a: "Most custom landing pages and 3D web experiences are delivered within 2 to 4 weeks. We also offer fast-track delivery options if you have an upcoming product launch or deadline."
    },
    {
      q: "How do we get started?",
      a: "Simply use our interactive Scope Estimator below or click 'Make a Free Demo'. We'll schedule a discovery chat, discuss your goals, and provide an interactive concept mockup for your brand."
    }
  ]
};