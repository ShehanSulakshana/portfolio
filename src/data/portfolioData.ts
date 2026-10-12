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
    "Mobile Developer (Flutter)",
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
    tagline: "Footwear Shopping App",
    description: "Flutter shoe store app with product listing and add/remove cart functions, built on local state management.",
    architectureDetails: [
      "Product listing screen with a cart that supports adding and removing items.",
      "Local, in-memory state management with no backend dependency, keeping the cart logic simple and self-contained.",
      "Declarative navigation using go_router, with an onboarding screen as the entry point.",
      "Flutter multi-platform project scaffold (Android, iOS, web, desktop) with a Material design base."
    ],
    image: "/static/project-images/stepz-store-app.jpg",
    alt: "Stepz Store Flutter shoe store app showing product listing and cart",
    link: "https://github.com/ShehanSulakshana/Stepz-Store",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Ongoing",
    techs: ["Flutter", "Dart", "go_router", "State Management"],
    featured: true,
    order: 1
  },
  {
    id: "cipher-x",
    title: "Cipher-X",
    tagline: "Hands-On Cryptography Toolkit",
    description: "Python toolkit for learning cryptography by implementing classical ciphers, AES, and RSA from the ground up.",
    architectureDetails: [
      "Built to write, test, and understand core encryption, decryption, and hashing algorithms instead of relying on high-level abstractions.",
      "Covers both symmetric (AES) and asymmetric (RSA) encryption concepts alongside classical ciphers.",
      "Key generation, storage, and handling patterns built on the PyCA cryptography library.",
      "Interactive command-line entry point (main.py) with a lightweight, dependency-focused design for learning and experimentation."
    ],
    image: "/static/project-images/cipher-x.png",
    alt: "Cipher-X Python cryptography toolkit banner",
    link: "https://github.com/ShehanSulakshana/Cipher-X",
    category: "security",
    categoryLabel: "Cybersecurity & Cryptography",
    status: "Active",
    techs: ["Python", "Cryptography", "AES", "RSA", "Classical Ciphers"],
    featured: true,
    order: 2
  },
  {
    id: "cineecho",
    title: "CineEcho App",
    tagline: "Movie & TV Discovery Platform",
    description: "Flutter movie and TV discovery app powered by the TMDB API, with trailers, watch history, favorites, and cloud-synced watch-time stats.",
    architectureDetails: [
      "TMDB API integration over HTTP for trending, popular, and upcoming titles, detailed metadata, trailers, and cast and crew filmographies.",
      "Provider-based state management with a layered structure: models, providers, services, screens, and reusable widgets.",
      "Firebase Authentication with Google Sign-In, and Cloud Firestore for cloud-synced profiles, favorites, and watch history, with Hive for local storage.",
      "Animated viewing statistics showing total watch time, movies watched, and episodes watched, plus episode-level tracking for TV series.",
      "Search across movies, shows, and people, with Material 3 dark mode and custom Firestore security rules."
    ],
    image: "/static/project-images/cineecho-app.jpg",
    alt: "CineEcho Flutter movie and TV discovery app interface",
    link: "https://github.com/ShehanSulakshana/CineEcho",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Active",
    techs: ["Flutter", "Dart", "TMDB API", "Provider", "Firebase", "Hive"],
    featured: true,
    order: 3
  },
  {
    id: "truenote",
    title: "TrueNote App",
    tagline: "Privacy-First Notes App",
    description: "Cross-platform Flutter notes app focused on performance, clean design, and privacy-first note management. Currently in early development.",
    architectureDetails: [
      "Flutter and Dart project targeting Android, iOS, web, and Windows from a single codebase.",
      "Provider-based state management as the foundation for the app's architecture.",
      "Repository serves as a public development log tracking progress and code evolution while the app approaches its first stable release.",
      "Firebase is listed as the planned backend but is not yet integrated; the code is proprietary and all rights are reserved."
    ],
    image: "/static/project-images/truenote-app.jpg",
    alt: "TrueNote Flutter privacy-first notes app",
    link: "https://github.com/ShehanSulakshana/TrueNote",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Ongoing",
    techs: ["Flutter", "Dart", "Provider", "State Management"],
    featured: true,
    order: 4
  },
  {
    id: "port-scanner",
    title: "Port Scanner",
    tagline: "TCP Port Scanning CLI",
    description: "Python command-line scanner that detects open TCP ports on any IP or domain and maps them to common services.",
    architectureDetails: [
      "Socket-based TCP connect scanning with a 0.5 second per-port timeout, run sequentially across the chosen port range.",
      "Accepts raw IP addresses or domain names, resolves hostnames, and validates the start and end port range (1-65535).",
      "Maps open ports to standard service names (HTTP, SSH, FTP, HTTPS) and prints colour-coded live results with total scan time.",
      "Optional export of open ports and services to a text file, with the output path set in config.yaml."
    ],
    image: "/static/project-images/port-scanner.png",
    alt: "Port Scanner Python TCP scanning tool terminal output",
    link: "https://github.com/ShehanSulakshana/PortScanner",
    category: "security",
    categoryLabel: "Cybersecurity & Recon",
    status: "Active",
    techs: ["Python", "Sockets", "Networking (TCP/IP)", "CLI", "Reconnaissance"],
    featured: false,
    order: 5
  },
  {
    id: "ip-lookup",
    title: "IP Checkout",
    tagline: "OSINT IP & Domain Lookup",
    description: "Python OSINT script that fetches geolocation and ISP data for any public IP address and resolves web domains to their IP.",
    architectureDetails: [
      "Queries the ip-api.com JSON API for country, region, city, zip code, timezone, ISP, organization, and coordinates.",
      "Domain-to-IP resolution through Python's socket library for any website address.",
      "Interactive menu offering two modes: public IP checkout and web IP checkout, with a restart option after each lookup.",
      "Colour-coded terminal output using colorama and a pyfiglet banner, with a helper script that installs dependencies."
    ],
    image: "/static/project-images/ip-checkout.png",
    alt: "IP Checkout Python OSINT tool terminal output",
    link: "https://github.com/ShehanSulakshana/IP-Checkout",
    category: "security",
    categoryLabel: "Cybersecurity & Recon",
    status: "Active",
    techs: ["Python", "REST APIs", "Sockets", "OSINT", "IP Analysis"],
    featured: false,
    order: 6
  },
  {
    id: "weather-app",
    title: "Weather App",
    tagline: "Current Weather Client",
    description: "First Flutter app: fetches current weather and a 5-hour forecast for a user-specified location using the OpenWeather API.",
    architectureDetails: [
      "HTTP requests to the free OpenWeather API for real-time weather data by location.",
      "Displays temperature, city name, and weather condition description, plus a 5-hour forecast.",
      "Clean, simple UI built with core Flutter widgets as a practice project."
    ],
    image: "/static/project-images/weather-app.svg",
    alt: "Weather App Flutter current weather and forecast interface",
    link: "https://github.com/ShehanSulakshana/WeatherApp",
    category: "development",
    categoryLabel: "Mobile Engineering",
    status: "Active",
    techs: ["Flutter", "Dart", "OpenWeather API", "HTTP", "UI Design"],
    featured: false,
    order: 7
  },
  {
    id: "student-system",
    title: "Student Management System",
    tagline: "Console-Based Student Records CRUD",
    description: "Java console application connected to MySQL via JDBC for adding, viewing, updating, searching, and deleting student records.",
    architectureDetails: [
      "Full CRUD operations on a Students table (ID, name, date of birth, email, phone) through JDBC and the MySQL connector.",
      "Input validation for email format, date format, and phone number before records are saved.",
      "Menu-driven terminal interface with colored console output for readability.",
      "Search and delete by student ID, with database setup SQL and configuration steps documented in the README."
    ],
    image: "/static/project-images/student-system.svg",
    alt: "Student Management System Java console app with MySQL database",
    link: "https://github.com/ShehanSulakshana/StudentManagementSystem",
    category: "systems",
    categoryLabel: "Software Engineering & Databases",
    status: "Active",
    techs: ["Java", "MySQL", "JDBC", "CRUD", "Console UI"],
    featured: false,
    order: 8
  },
  {
    id: "snapsage",
    title: "Snapsage Photography",
    tagline: "Photography Portfolio Website",
    description: "Responsive photography portfolio built with HTML, CSS, and JavaScript, featuring a dynamic gallery and hosted live on Netlify.",
    architectureDetails: [
      "Responsive layout optimized for desktop, tablet, and mobile using semantic HTML5 and CSS3 with variables, animations, and media queries.",
      "Interactive gallery section with hover effects and modal previews for high-resolution images.",
      "Dedicated sections for photography services, client testimonials, and contact details with social links.",
      "Vanilla JavaScript for scroll-triggered animations and interactive elements, deployed on Netlify."
    ],
    image: "https://github.com/ShehanSulakshana/Snapsage-Photography/blob/main/img/screenshot.png?raw=true",
    alt: "Snapsage Photography portfolio website homepage",
    link: "https://github.com/ShehanSulakshana/Snapsage-Photography",
    category: "systems",
    categoryLabel: "Web Development",
    status: "Active",
    techs: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Netlify"],
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
    date: "2024",
    title: "The Beginning of the Journey",
    institution: "Where It All Started",
    description: "Where my curiosity about the IT industry and software development began, sparking the drive that shaped my path into cybersecurity and app development."
  },
  {
    date: "Jan 2025",
    title: "BSc in Information Technology Begins",
    institution: "Open University of Sri Lanka",
    description: "Began my BSc in IT at the Open University of Sri Lanka, building the academic foundation for a career in cybersecurity and software development."
  },
  {
    date: "Aug 2025",
    title: "Flutter Development Begins",
    institution: "Mobile Development",
    description: "Started building cross-platform apps with Flutter and Dart, developing hands-on projects in parallel with my cybersecurity coursework."
  },
  {
    date: "Nov 2025",
    title: "Security Fundamentals",
    institution: "Cybersecurity & Networking",
    description: "Built core security skills through networking basics, Linux command-line workflows, and packet-level traffic analysis with Wireshark."
  },
  {
    date: "Jan 2026",
    title: "Portfolio Launch",
    institution: "Personal Project",
    description: "Designed and launched this portfolio to showcase my cybersecurity and development journey, projects, and certifications in one place."
  },
  {
    date: "Feb 2026",
    title: "Dean's List Award",
    institution: "Open University of Sri Lanka",
    description: "Selected for the Dean's List for Year 1, Semester 2, with a perfect 4.0 GPA.",
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

