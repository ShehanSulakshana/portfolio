export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  architectureDetails: string[];
  image: string;
  alt: string;
  link: string;
  category: 'development' | 'security' | 'systems';
  categoryLabel: string;
  status: 'Active' | 'Ongoing';
  techs: string[];
  featured?: boolean;
  order: number;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issuerBadge?: string;
  image: string;
  skills: string[];
  verifyUrl: string;
  credentialCode?: string;
  issueDate?: string;
}

export interface Badge {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string;
  link: string;
  img: string;
  issuerType: 'Google' | 'Cisco' | 'Microsoft';
}

export interface TimelineMilestone {
  date: string;
  title: string;
  institution: string;
  description: string;
  highlight?: boolean;
}

export interface CareerPath {
  title: string;
  stage: string;
  focus: string;
  description: string;
  currentSkills: string[];
  aspirations: string;
}

export const PROFILE_INFO = {
  fullName: "Shehan Sulakshana",
  headline: "Mobile Developer & Cybersecurity Enthusiast",
  degree: "BSc (Hons) in Information Technology",
  institution: "Open University of Sri Lanka (OUSL)",
  academicStanding: "BSc IT Undergraduate · 4.0 Current GPA",
  location: "Sri Lanka",
  profilePhoto: "https://avatars.githubusercontent.com/u/163650030?v=4",
  livePortfolio: "https://shehan-sulakshana.is-a.dev/",
  email: "shehansulakshana01@gmail.com",
  whatsapp: "https://wa.me/+94713143118",
  whatsappNumber: "+94 71 314 3118",
  github: "https://github.com/ShehanSulakshana",
  linkedin: "https://www.linkedin.com/in/shehan-sulakshana-129758342",
  facebook: "https://www.facebook.com/shehan.sulakshana.01",
  web3FormsKey: "fc6dacec-aa2f-4466-9e61-1bd471892503",
  terminalLines: [
    "whoami",
    "Mobile Developer (Flutter / Dart)",
    "Cybersecurity Enthusiast",
    "Open for Freelance & Internships",
  ]
};

export const CAREER_PATHS: CareerPath[] = [
  {
    title: "Mobile Application Developer",
    stage: "Undergraduate Track",
    focus: "Cross-Platform iOS & Android Apps",
    description: "Building responsive Flutter & Dart mobile applications with clean state management and Firebase.",
    currentSkills: ["Flutter", "Dart", "Firebase", "State Management", "REST APIs"],
    aspirations: "Open to mobile developer roles, internships, and freelance projects."
  },
  {
    title: "Cybersecurity & Systems Track",
    stage: "Hands-On Research & Defense",
    focus: "Network Security & Applied Defense",
    description: "Studying network protocols, packet inspection, and secure coding through Linux labs and Python tools.",
    currentSkills: ["Python", "TCP/IP & Networking", "Wireshark", "Linux CLI", "Socket Programming"],
    aspirations: "Aiming for security engineering, vulnerability testing, and defensive systems."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "stepz-store",
    title: "Stepz Store App",
    tagline: "E-Commerce Mobile Architecture",
    description: "Flutter footwear store with BLoC state management and real-time Firestore catalog.",
    architectureDetails: [
      "Structured MVC / BLoC state flow for scalable cart, checkout, and inventory lifecycles.",
      "Cloud Firestore integration for real-time stock availability and order dispatch logging.",
      "Custom responsive design system optimized for 60fps scrolling across iOS and Android.",
      "Comprehensive product filtering, wishlist persistence, and secure checkout simulation."
    ],
    image: "/static/project-images/stepz-store-app.jpg",
    alt: "Stepz Store Flutter footwear e-commerce application interface",
    link: "https://github.com/ShehanSulakshana/Stepz-Store",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Ongoing",
    techs: ["Flutter", "Dart", "Firebase", "State Management", "BLoC"],
    featured: true,
    order: 1
  },
  {
    id: "cipher-x",
    title: "Cipher-X",
    tagline: "Cryptographic Analysis Suite",
    description: "Python security toolkit implementing classical and modern ciphers (AES-256, RSA).",
    architectureDetails: [
      "Modular Python engine implementing classical ciphers (Caesar, Vigenère, Substitution) alongside modern AES-256 and RSA key pair generation.",
      "Mathematical analysis helpers for frequency calculation and ciphertext entropy breakdown.",
      "Interactive command-line interface with secure file encryption/decryption routines.",
      "Designed as a defensive learning testbed for cryptographic vulnerability assessment."
    ],
    image: "/static/project-images/cipher-x.png",
    alt: "Cipher-X Python cryptographic encryption and analysis toolkit terminal",
    link: "https://github.com/ShehanSulakshana/Cipher-X",
    category: "security",
    categoryLabel: "Cybersecurity & Cryptography",
    status: "Active",
    techs: ["Python", "Cryptography", "AES-256", "RSA", "Algorithms"],
    featured: true,
    order: 2
  },
  {
    id: "cineecho",
    title: "CineEcho App",
    tagline: "Media Discovery & Tracking Engine",
    description: "Flutter movie discovery app powered by TMDB API with watch-time analytics and watchlist.",
    architectureDetails: [
      "Asynchronous REST client interacting with TMDB v3 API with in-memory caching for trending feeds.",
      "Aggregated personal watch-time computation with monthly runtime progress meters.",
      "Adaptive dark-mode UI with fluid hero animations and YouTube trailer modal integration.",
      "Offline-first favorites storage utilizing localized state caching."
    ],
    image: "/static/project-images/cineecho-app.jpg",
    alt: "CineEcho Flutter movie guidance application interface",
    link: "https://github.com/ShehanSulakshana/CineEcho",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Active",
    techs: ["Flutter", "Dart", "TMDB API", "State Management", "Async I/O"],
    featured: true,
    order: 3
  },
  {
    id: "truenote",
    title: "TrueNote App",
    tagline: "Cloud Synchronized Notebook",
    description: "Cloud-synced Flutter note-taking app with offline caching and biometric lock.",
    architectureDetails: [
      "Real-time bidirectional Firebase Firestore listeners with optimistic UI updates.",
      "Local-first SQLite / Hive fallback ensuring offline manuscript drafting and zero data loss.",
      "Tag-based taxonomic sorting, instant full-text search, and markdown syntax rendering.",
      "Biometric lock integration for sensitive client notes and credentials."
    ],
    image: "/static/project-images/truenote-app.jpg",
    alt: "TrueNote Flutter note taking and cloud sync application",
    link: "https://github.com/ShehanSulakshana/TrueNote",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Ongoing",
    techs: ["Flutter", "Dart", "Firebase Firestore", "Cloud Sync", "State Management"],
    featured: true,
    order: 4
  },
  {
    id: "port-scanner",
    title: "Port Scanner",
    tagline: "High-Throughput Network Reconnaissance",
    description: "Multi-threaded Python scanner for rapid TCP port auditing and service detection.",
    architectureDetails: [
      "Concurrent socket thread pooling delivering sub-second scan speeds across subnet targets.",
      "Banner grabbing routine to identify daemon service versions and banner leakages.",
      "Custom timeout optimization and non-blocking I/O routines to bypass host timeouts.",
      "Detailed port status summary with recognized IANA service mappings and risk notations."
    ],
    image: "/static/project-images/port-scanner.png",
    alt: "Port Scanner multi-threaded Python socket reconnaissance tool terminal",
    link: "https://github.com/ShehanSulakshana/PortScanner",
    category: "security",
    categoryLabel: "Cybersecurity & Recon",
    status: "Active",
    techs: ["Python", "Sockets", "Networking (TCP/IP)", "Concurrency", "Reconnaissance"],
    featured: false,
    order: 5
  },
  {
    id: "ip-lookup",
    title: "IP Lookup",
    tagline: "Geographic & DNS Intelligence",
    description: "Python script for IP geolocation mapping, ISP lookup, and DNS records verification.",
    architectureDetails: [
      "Multi-source API querying to cross-reference Autonomous System Numbers (ASN) and geographic coordinates.",
      "DNS forward and reverse resolution to spot spoofed endpoints and misconfigured mail exchangers.",
      "Command-line formatting with structured JSON export for downstream security analysis pipelines.",
      "Rate-limit handling with robust fallback across alternative lookup endpoints."
    ],
    image: "/static/project-images/ip-checkout.png",
    alt: "IP Lookup reconnaissance and DNS inspection tool interface",
    link: "https://github.com/ShehanSulakshana/IP-Checkout",
    category: "security",
    categoryLabel: "Cybersecurity & Recon",
    status: "Active",
    techs: ["Python", "REST APIs", "DNS Checks", "IP Analysis", "Network Security"],
    featured: false,
    order: 6
  },
  {
    id: "weather-app",
    title: "Weather App",
    tagline: "Real-Time Meteorological Client",
    description: "Flutter weather client with real-time forecasts and dynamic graphics via OpenWeather API.",
    architectureDetails: [
      "Geolocation-driven meteorological queries delivering hourly forecasts and 7-day outlooks.",
      "Custom vector UI reacting dynamically to live atmospheric conditions (rain, clear, thunderstorm).",
      "Robust error handling for intermittent connectivity and invalid city input queries."
    ],
    image: "/static/project-images/weather-app.svg",
    alt: "Weather App Flutter mobile forecast client interface",
    link: "https://github.com/ShehanSulakshana/WeatherApp",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Active",
    techs: ["Flutter", "Dart", "OpenWeather API", "UI Design", "Geo Location"],
    featured: false,
    order: 7
  },
  {
    id: "student-system",
    title: "Student Management System",
    tagline: "Enterprise Academic Records DB",
    description: "Java desktop app with MySQL managing course registration, grades, and GPA records.",
    architectureDetails: [
      "Object-Oriented Programming (OOP) architecture with clean separation between Model, View, and Controller layers.",
      "JDBC database connector utilizing parameterized queries to eliminate SQL injection vulnerabilities.",
      "Automated GPA calculation algorithms matching university grading rubric standards.",
      "Role-based access control simulation distinguishing faculty inputs from student report viewers."
    ],
    image: "/static/project-images/student-system.svg",
    alt: "Student Management System Java and MySQL application architecture diagram",
    link: "https://github.com/ShehanSulakshana/StudentManagementSystem",
    category: "systems",
    categoryLabel: "Software Engineering & Databases",
    status: "Active",
    techs: ["Java", "MySQL", "JDBC", "CRUD", "OOP", "Relational DB"],
    featured: false,
    order: 8
  },
  {
    id: "snapsage",
    title: "Snapsage Photography",
    tagline: "Commercial Studio Showcase",
    description: "Responsive photography studio showcase with dynamic image galleries and client inquiries.",
    architectureDetails: [
      "Fluid masonry layout engineered with modern CSS Grid and Flexbox for responsive cross-device viewing.",
      "Zero-dependency vanilla JavaScript lightbox viewer optimized for rapid thumbnail hydration.",
      "Semantic HTML5 structure achieving 95+ Lighthouse accessibility and performance ratings."
    ],
    image: "https://github.com/ShehanSulakshana/Snapsage-Photography/blob/main/img/screenshot.png?raw=true",
    alt: "Snapsage Photography studio website layout showcase",
    link: "https://github.com/ShehanSulakshana/Snapsage-Photography",
    category: "systems",
    categoryLabel: "Web Development",
    status: "Active",
    techs: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
    featured: false,
    order: 9
  }
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 1,
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa, Sri Lanka",
    issuerBadge: "UOM",
    image: "/static/certs/web-design.png",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Architecture", "UI/UX Principles"],
    credentialCode: "DL6MD2SnS8",
    issueDate: "2025",
    verifyUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php/?code=DL6MD2SnS8"
  },
  {
    id: 2,
    title: "GitHub 101 - GitHub For Beginners",
    issuer: "Microsoft Student Ambassadors",
    issuerBadge: "Microsoft",
    image: "/static/certs/github-101.png",
    skills: ["Git CLI", "GitHub Workflows", "Branching Strategies", "Version Control", "Collaboration"],
    verifyUrl: "https://www.linkedin.com/posts/shehan-sulakshana_github-microsoftstudentambassadors-versioncontrol-share-7490604150120923137-ESPA/"
  },
  {
    id: 3,
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    issuerBadge: "Cisco",
    image: "/static/certs/networking-basics.png",
    skills: ["Networking Protocols", "TCP/IP Stack", "OSI 7-Layer Model", "Subnetting", "Packet Routing"],
    verifyUrl: "https://www.credly.com/badges/bd702b9e-16d3-439d-bcf6-6cb71c249196/public_url"
  },
  {
    id: 4,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issuerBadge: "Cisco",
    image: "/static/certs/cybersecurity-intro.png",
    skills: ["CIA Triad", "Threat Vectors", "Network Defense", "Cryptography Primitives", "Data Privacy"],
    verifyUrl: "https://www.credly.com/badges/ec03e1af-01c9-4aa4-858a-e5538fd12ed7/public_url"
  },
  {
    id: 5,
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    issuerBadge: "Cisco",
    image: "/static/certs/python_essentials_1.png",
    skills: ["Python Programming", "Algorithm Design", "Data Structures", "Modular Architecture", "File I/O"],
    verifyUrl: "https://www.credly.com/badges/f00e223b-cc9e-4084-bf5a-9e60ff0f556a/public_url"
  }
];

export const BADGES_DATA: Badge[] = [
  {
    id: "badge-1",
    title: "GitHub For Beginners",
    issuer: "Microsoft Student Ambassadors",
    issuerType: "Microsoft",
    date: "Jul 2026",
    skills: "Git, GitHub, Version Control, Open Source Workflows",
    link: "https://github.com/nisalgunawardhana/Github-for-beginners/issues/1018#issuecomment-5012249370",
    img: "/static/badges/github-beginners.png"
  },
  {
    id: "badge-2",
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    issuerType: "Cisco",
    date: "Dec 2025",
    skills: "Networking Fundamentals, TCP/IP, Protocols, OSI Model",
    link: "https://www.credly.com/badges/ec03e1af-01c9-4aa4-858a-e5538fd12ed7/public_url",
    img: "/static/badges/networking-basics.png"
  },
  {
    id: "badge-3",
    title: "Cybersecurity Basics",
    issuer: "Cisco Networking Academy",
    issuerType: "Cisco",
    date: "Jan 2026",
    skills: "Cybersecurity Fundamentals, Threat Modeling, Defense in Depth",
    link: "https://www.credly.com/badges/ec03e1af-01c9-4aa4-858a-e5538fd12ed7/public_url",
    img: "/static/badges/cybersecurity-basics.png"
  },
  {
    id: "badge-4",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    issuerType: "Cisco",
    date: "Jan 2026",
    skills: "Python, Control Flow, Functional Programming, Algorithmic Problem Solving",
    link: "https://www.credly.com/badges/f00e223b-cc9e-4084-bf5a-9e60ff0f556a/public_url",
    img: "/static/badges/python-essentials1.png"
  },
  {
    id: "badge-5",
    title: "Build Apps with Flutter",
    issuer: "Google Developers",
    issuerType: "Google",
    date: "Aug 2026",
    skills: "Flutter, Dart, Cross-Platform Architecture, Mobile Lifecycle",
    link: "https://developers.google.com/profile/badges/playlists/intro-to-flutter?u=shehanss",
    img: "/static/badges/intro-to-flutter.svg"
  },
  {
    id: "badge-6",
    title: "Material Design Flutter",
    issuer: "Google Developers",
    issuerType: "Google",
    date: "Aug 2026",
    skills: "Material Design 3, Flutter Theming, Accessible Component Systems",
    link: "https://developers.google.com/profile/badges/playlists/implement-material-design-with-material-components?u=shehanss",
    img: "/static/badges/material-design-with-flutter.svg"
  },
  {
    id: "badge-7",
    title: "Firebase And Flutter",
    issuer: "Google Developers",
    issuerType: "Google",
    date: "Jul 2026",
    skills: "Firebase Authentication, Cloud Firestore, Realtime Sync, Security Rules",
    link: "https://developers.google.com/profile/badges/playlists/firebase/add_firebase_to_flutter?u=shehanss",
    img: "/static/badges/firebase-flutter.svg"
  },
  {
    id: "badge-8",
    title: "Firebase And Flutter : Advanced",
    issuer: "Google Developers",
    issuerType: "Google",
    date: "Aug 2026",
    skills: "Advanced Firebase Integration, Cloud Messaging, Performance Tracing",
    link: "https://developers.google.com/profile/badges/playlists/firebase/firebase-flutter-advanced?u=shehanss",
    img: "/static/badges/advanced-firebase-flutter.svg"
  }
];

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    date: "Jan 2025",
    title: "Computer Systems & Programming Logic",
    institution: "Foundational Computing",
    description: "Started learning programming logic and core computer architecture using Python—covering memory hierarchy, basic data structures, and algorithmic problem decomposition."
  },
  {
    date: "Apr 2025",
    title: "Web Architecture & Frontend Mechanics",
    institution: "Web Technologies",
    description: "Started learning how the browser renders interfaces, studying semantic HTML5, CSS layout mechanics (Flexbox & Grid), and asynchronous JavaScript for dynamic interactions."
  },
  {
    date: "Jul 2025",
    title: "Cross-Platform Mobile Engineering",
    institution: "Mobile Development",
    description: "Started learning mobile engineering with Dart and Flutter—focusing on reactive widget trees, state management architectures, and integrating RESTful endpoints."
  },
  {
    date: "Oct 2025",
    title: "Computer Networking & Protocol Suites",
    institution: "Networking Fundamentals",
    description: "Started learning the TCP/IP stack and OSI reference model in depth—analyzing packet flow, socket communication, IP subnetting, and DNS resolution."
  },
  {
    date: "Dec 2025",
    title: "Linux Environments & Shell Automation",
    institution: "Systems & Scripting",
    description: "Started learning Unix-like operating systems, mastering POSIX terminal workflows, user access controls, process signals, and automation through Bash scripts."
  },
  {
    date: "Feb 2026",
    title: "Applied Cryptography & Defensive Concepts",
    institution: "Cybersecurity & Defense",
    description: "Started learning practical security fundamentals—exploring symmetric (AES) and asymmetric (RSA) encryption, secure hashing, and defensive coding principles.",
    highlight: true
  }
];

export const SKILLS_CATEGORIES = [
  {
    id: "security",
    title: "Cybersecurity & Systems Defense",
    tagline: "Security tools, packet inspection, and defense",
    skills: [
      { name: "Parrot Security OS", category: "OS & Environments" },
      { name: "Kali Linux", category: "OS & Environments" },
      { name: "Linux CLI & Shell", category: "OS & Environments" },
      { name: "Bash Scripting", category: "Automation" },
      { name: "TCP/IP Protocol Suite", category: "Networking" },
      { name: "Wireshark Packet Analysis", category: "Analysis" },
      { name: "Nmap Reconnaissance", category: "Recon" },
      { name: "Network Sockets", category: "Networking" },
      { name: "DNS Recon & OSINT", category: "Recon" },
      { name: "AES-256 & RSA Cryptography", category: "Defense" },
      { name: "Traffic & Port Analysis", category: "Analysis" },
      { name: "Vulnerability Assessment", category: "Audit" },
      { name: "CIA Triad Hardening", category: "Governance" }
    ]
  },
  {
    id: "mobile-frontend",
    title: "Mobile & Frontend Development",
    tagline: "Cross-platform UI, app lifecycle, and logic",
    skills: [
      { name: "Flutter", category: "Framework" },
      { name: "Dart", category: "Language" },
      { name: "BLoC & State Management", category: "Architecture" },
      { name: "Material Design 3", category: "UI/UX" },
      { name: "React", category: "Web" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "JavaScript (ES6+)", category: "Language" },
      { name: "HTML5 & Semantic Web", category: "Web" },
      { name: "CSS3 & Animations", category: "Styling" },
      { name: "Responsive Layouts", category: "UI/UX" }
    ]
  },
  {
    id: "backend-cloud",
    title: "Databases, Cloud & Systems",
    tagline: "Databases, cloud services, and APIs",
    skills: [
      { name: "Firebase Cloud Firestore", category: "Database" },
      { name: "Firebase Authentication", category: "Auth" },
      { name: "MySQL Relational DB", category: "Database" },
      { name: "JDBC / Relational SQL", category: "Backend" },
      { name: "Python", category: "Language" },
      { name: "Java (OOP)", category: "Language" },
      { name: "RESTful APIs", category: "Integration" },
      { name: "Cloudflare", category: "Infrastructure" }
    ]
  },
  {
    id: "tooling",
    title: "Engineering Tooling & Workflow",
    tagline: "Version control, terminal, and build toolchains",
    skills: [
      { name: "Git CLI", category: "VCS" },
      { name: "GitHub & Actions", category: "CI/CD" },
      { name: "Android Studio", category: "IDE" },
      { name: "VS Code", category: "IDE" },
      { name: "Postman API Client", category: "Testing" },
      { name: "Figma Interface Design", category: "Design" }
    ]
  }
];

export const SECRET_FLAG = {
  flag: "FLAG{welcome_explorer_thank_you_for_visiting_my_site}",
  congratulations: "Congratulations on exploring the filesystem! You found the hidden security flag.",
  message: "Welcome, and thank you so much for taking the time to visit and explore my portfolio!"
};

