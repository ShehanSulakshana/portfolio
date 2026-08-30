lucide.createIcons();

//Particle Background





//Mobile nav
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
let isMenuOpen = false;

mobileToggle?.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        navLinks.classList.add('active');
        mobileToggle.innerHTML = '<i data-lucide="x" style="width:24px;height:24px;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1)"></i>';
    } else {
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = '<i data-lucide="menu" style="width:24px;height:24px;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1)"></i>';
    }

    lucide.createIcons();
});

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = '<i data-lucide="menu" style="width:24px;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1)"></i>';
        lucide.createIcons();
    });
});

// PROJECTS SECTION — data-driven, category filterable, "See more" on mobile
window.PROJECT_CATEGORIES = [
    { id: "security", label: "Security" },
    { id: "development", label: "Development" }
];

// order: 1 = most recent. Add new projects anywhere in the array; the list
// is sorted by "order" automatically so this array does not need to stay sorted.
window.PROJECTS_DATA = [
    {
        title: "TrueNote App",
        description: "Flutter note-taking app with cloud synchronization capabilities.",
        image: "static/project-images/truenote-app.jpg",
        alt: "TrueNote Flutter note-taking app screenshot with cloud synchronization",
        link: "https://github.com/ShehanSulakshana/TrueNote",
        category: "development",
        status: "Ongoing",
        fileLabel: "truenote.dart",
        techs: ["Flutter", "Dart", "Firebase", "State Management"],
        order: 1
    },
    {
        title: "CineEcho App",
        description: "Flutter movie guidance app powered by TMDB API. Discover movies, track watch time stats, and share.",
        image: "static/project-images/cineecho-app.jpg",
        alt: "CineEcho Flutter movie guidance app screenshot showing movie discovery and watch time stats",
        link: "https://github.com/ShehanSulakshana/CineEcho",
        category: "development",
        status: "Active",
        fileLabel: "cineecho.dart",
        techs: ["Flutter", "Dart", "TMDB API", "State Management"],
        order: 2
    },
    {
        title: "Port Scanner",
        description: "Python tool for network reconnaissance",
        image: "static/project-images/port-scanner.png",
        alt: "Terminal output of a Python-based network port scanner tool",
        link: "https://github.com/ShehanSulakshana/PortScanner",
        category: "security",
        status: "Active",
        fileLabel: "port_scanner.py",
        techs: ["Python", "Sockets", "Networking", "Reconnaissance"],
        order: 3
    },
    {
        title: "IP Lookup",
        description: "Script for IP analysis and domain checking",
        image: "static/project-images/ip-checkout.png",
        alt: "Terminal output of a Python-based IP lookup and domain checking tool",
        link: "https://github.com/ShehanSulakshana/IP-Checkout",
        category: "security",
        status: "Active",
        fileLabel: "ip_lookup.py",
        techs: ["Python", "APIs", "IP Analysis", "DNS Checks"],
        order: 4
    },
    {
        title: "Weather App",
        description: "Flutter Weather app by using OpenWeather API",
        image: "static/project-images/weather-app.svg",
        alt: "Weather App Flutter application screenshot showing current weather and forecast using OpenWeather API",
        link: "https://github.com/ShehanSulakshana/WeatherApp",
        category: "development",
        status: "Active",
        fileLabel: "weather_app.dart",
        techs: ["Flutter", "Dart", "OpenWeather API", "UI Design"],
        order: 5
    },
    {
        title: "Student System",
        description: "Java app with MySQL for student records",
        image: "static/project-images/student-system.svg",
        alt: "Student System Java application screenshot showing student records management interface",
        link: "https://github.com/ShehanSulakshana/StudentManagementSystem",
        category: "development",
        status: "Active",
        fileLabel: "StudentSystem.java",
        techs: ["Java", "MySQL", "CRUD", "OOP"],
        order: 6
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const filtersEl = document.getElementById("projectFilters");
    const gridEl = document.getElementById("projectsGrid");
    const toggleBtn = document.getElementById("toggleProjectsBtn");
    const toggleText = document.getElementById("toggleProjectsText");
    if (!filtersEl || !gridEl) return;

    const projects = (Array.isArray(window.PROJECTS_DATA) ? window.PROJECTS_DATA.slice() : [])
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    if (projects.length === 0) return;

    const configuredCategories = Array.isArray(window.PROJECT_CATEGORIES) ? window.PROJECT_CATEGORIES : [];
    // Only show category pills that actually have at least one project,
    // and fall back to auto-generating a label for any category not pre-configured.
    const usedCategoryIds = [...new Set(projects.map(p => p.category))];
    const categories = usedCategoryIds.map(id => {
        const known = configuredCategories.find(c => c.id === id);
        return known || { id, label: id.charAt(0).toUpperCase() + id.slice(1) };
    });

    const STATUS_BADGE_CLASS = {
        active: "badge-active",
        ongoing: "badge-ongoing",
        learning: "badge-learning"
    };

    const MOBILE_QUERY = window.matchMedia("(max-width: 768px)");
    const MOBILE_INITIAL_COUNT = 6;
    const DESKTOP_INITIAL_COUNT = 3;

    let activeCategory = "all";
    let expanded = false; // whether the mobile "See more" state is expanded

    const CODE_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
        </svg>`;

    const ARROW_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>`;

    function projectCardMarkup(project) {
        const safe = (s) => (s || "").toString();
        const statusClass = STATUS_BADGE_CLASS[safe(project.status).toLowerCase()] || "badge-active";
        const techs = Array.isArray(project.techs) ? project.techs : [];
        const categoryId = safe(project.category);
        const categoryLabel = (categories.find(c => c.id === categoryId) || { label: categoryId }).label;

        return `
        <div class="glass-card project-card" data-category="${categoryId}"
            role="link" tabindex="0" style="cursor:pointer;"
            aria-label="${safe(project.title)} — open project on GitHub">
            <div class="project-media">
                <span class="project-badge ${statusClass}">${safe(project.status)}</span>
                <img src="${safe(project.image)}" alt="${safe(project.alt)}" class="project-image" loading="lazy">
            </div>
            <div class="project-body">
                <span class="project-eyebrow eyebrow-${categoryId}">// ${safe(categoryLabel).toLowerCase()}</span>
                <h3>${safe(project.title)}</h3>
                <p>${safe(project.description)}</p>
            </div>
            <div class="project-stack" aria-label="Built with">
                ${CODE_ICON}
                <span>${techs.map(safe).join(" · ")}</span>
            </div>
            <div class="project-footer">
                <span>View source</span>
                ${ARROW_ICON}
            </div>
        </div>`;
    }

    // Render all cards once; filtering/paging is done by toggling classes so
    // no re-render is needed on interaction.
    gridEl.innerHTML = projects.map(projectCardMarkup).join("");
    const cardEls = Array.from(gridEl.querySelectorAll(".project-card"));

    cardEls.forEach((card, i) => {
        const project = projects[i];
        const open = () => window.open(project.link, "_blank", "noopener,noreferrer");
        card.addEventListener("click", open);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
            }
        });
    });

    // Filter pills
    filtersEl.innerHTML = [{ id: "all", label: "All" }, ...categories].map(cat => {
        const count = cat.id === "all" ? projects.length : projects.filter(p => p.category === cat.id).length;
        return `<button type="button" class="project-filter-btn${cat.id === "all" ? " active" : ""}"
            data-filter="${cat.id}" role="tab" aria-selected="${cat.id === "all"}">
            ${cat.label}<span class="filter-count">${count}</span>
        </button>`;
    }).join("");

    const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");
    const COLLAPSE_MS = 400; // must match .glass-card.project-card transition duration
    let isFirstRender = true;
    let pendingHideTimer = null;

    function isCardVisible(card) {
        return !card.classList.contains("filtered-out") && !card.classList.contains("hidden-overflow");
    }

    function applyView() {
        // "See more" pagination only ever applies to the "All" tab —
        // category views always show every matching project.
        const isAllTab = activeCategory === "all";
        const isMobile = MOBILE_QUERY.matches;
        const initialCount = isMobile ? MOBILE_INITIAL_COUNT : DESKTOP_INITIAL_COUNT;
        const shouldPaginate = isAllTab && projects.length > initialCount;

        const cardMeta = cardEls.map((card, i) => {
            const inCategory = activeCategory === "all" || card.dataset.category === activeCategory;
            const beyondInitial = i >= initialCount;
            const hiddenByPagination = shouldPaginate && beyondInitial && !expanded;
            return {
                filteredOut: !inCategory,
                hiddenOverflow: inCategory && hiddenByPagination,
                visible: inCategory && !hiddenByPagination
            };
        });

        transitionCards(cardMeta);

        toggleBtn.hidden = !shouldPaginate;
        if (shouldPaginate) {
            toggleText.textContent = expanded ? "Show less" : "See more";
            toggleBtn.classList.toggle("expanded", expanded);
        } else {
            expanded = false;
        }
    }

    // Applies the resolved filtered-out/hidden-overflow classes instantly,
    // with no animation. Used on first render and for reduced-motion users.
    function setClassesInstant(cardMeta) {
        cardEls.forEach((card, i) => {
            const meta = cardMeta[i];
            card.classList.remove("card-revealing", "card-collapsing");
            card.style.transform = "";
            card.style.transition = "";
            card.classList.toggle("filtered-out", meta.filteredOut);
            card.classList.toggle("hidden-overflow", meta.hiddenOverflow);
        });
    }

    // Animates between filter/pagination states:
    //  - cards leaving fade + settle down (card-collapsing) before being
    //    pulled out of layout with display:none
    //  - cards already visible smoothly reflow into their new grid slot
    //    using the FLIP technique, once the leavers have been removed
    //  - cards entering fade + rise into place (card-revealing)
    function transitionCards(cardMeta) {
        if (pendingHideTimer) {
            clearTimeout(pendingHideTimer);
            pendingHideTimer = null;
        }

        if (isFirstRender || REDUCE_MOTION.matches) {
            isFirstRender = false;
            setClassesInstant(cardMeta);
            return;
        }

        const staying = [];
        const entering = [];
        const leaving = [];

        cardEls.forEach((card, i) => {
            const wasVisible = isCardVisible(card);
            const willBeVisible = cardMeta[i].visible;
            if (willBeVisible && wasVisible) staying.push(card);
            else if (willBeVisible && !wasVisible) entering.push(card);
            else if (!willBeVisible && wasVisible) leaving.push(card);
        });

        // FIRST: capture positions of cards staying visible, before anything moves.
        const firstRects = new Map();
        staying.forEach(card => firstRects.set(card, card.getBoundingClientRect()));

        // Fade/settle the outgoing cards in place (they still occupy their grid slot).
        leaving.forEach(card => card.classList.add("card-collapsing"));

        const finishTransition = () => {
            leaving.forEach(card => {
                card.classList.remove("card-collapsing");
            });

            // Pull leavers out of the grid, then bring the entering cards in.
            cardEls.forEach((card, i) => {
                const meta = cardMeta[i];
                card.classList.toggle("filtered-out", meta.filteredOut);
                card.classList.toggle("hidden-overflow", meta.hiddenOverflow);
            });
            entering.forEach(card => card.classList.add("card-revealing"));

            // LAST: measure staying cards' new slots and invert to their old
            // position, then release on the next frame so the browser
            // animates the reflow instead of snapping to it.
            requestAnimationFrame(() => {
                staying.forEach(card => {
                    const first = firstRects.get(card);
                    const last = card.getBoundingClientRect();
                    const dx = first.left - last.left;
                    const dy = first.top - last.top;
                    if (dx || dy) {
                        card.style.transition = "none";
                        card.style.transform = `translate(${dx}px, ${dy}px)`;
                    }
                });

                requestAnimationFrame(() => {
                    staying.forEach(card => {
                        card.style.transition = "";
                        card.style.transform = "";
                    });
                    entering.forEach(card => card.classList.remove("card-revealing"));
                });
            });
        };

        if (leaving.length === 0) {
            // Nothing to fade out first, so proceed immediately.
            finishTransition();
        } else {
            pendingHideTimer = setTimeout(() => {
                pendingHideTimer = null;
                finishTransition();
            }, COLLAPSE_MS);
        }
    }

    filtersEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".project-filter-btn");
        if (!btn) return;
        activeCategory = btn.dataset.filter;
        expanded = false;
        filtersEl.querySelectorAll(".project-filter-btn").forEach(b => {
            const isActive = b === btn;
            b.classList.toggle("active", isActive);
            b.setAttribute("aria-selected", String(isActive));
        });
        applyView();
    });

    toggleBtn.addEventListener("click", () => {
        expanded = !expanded;
        applyView();
    });

    MOBILE_QUERY.addEventListener("change", applyView);

    applyView();
});

//Main sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Timeline items 
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200); 
        }
    });
}, {
    threshold: 0.15,          
    rootMargin: '0px 0px -50px 0px' 
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

    timelineObserver.observe(item);
});

// Navbar
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const nav = document.querySelector('nav');
            nav.classList.toggle('scrolled', window.pageYOffset > 80);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

window.addEventListener('load', () => {
    lucide.createIcons();

    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

window.addEventListener('resize', () => {
    lucide.createIcons();
});


const lines = [
    'whoami',
    'Mobile Developer',
    'Cybersecurity Enthusiast',
    'Bsc.IT Undergraduate at OUSL',
        ];

let currentLine = 0;
let charIndex = 0;
let isDeleting = false;
let lineElement = document.getElementById('typewriter');
let cursorElement = document.getElementById('cursor');

function typeWriter() {
    const currentText = lines[currentLine];

    if (!isDeleting) {
        // Typing phase
        if (charIndex <= currentText.length) {
            lineElement.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, 70);
            return;
        }
        // Pause after typing complete
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 900);
        return;
    }

    // Deleting phase  
    if (charIndex > 0) {
        lineElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 30);
        return;
    }

    // Move to next line
    currentLine = (currentLine + 1) % lines.length;
    charIndex = 0;
    isDeleting = false;
    setTimeout(typeWriter, 200);
}
typeWriter();

// Cursor Spotlight
(function () {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return;

    // Ambient page-wide glow that trails the cursor
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    spotlight.setAttribute('aria-hidden', 'true');
    document.body.appendChild(spotlight);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let renderQueued = false;

    function renderSpotlight() {
        spotlight.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
        renderQueued = false;
    }

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        spotlight.classList.add('is-active');

        if (!renderQueued) {
            renderQueued = true;
            requestAnimationFrame(renderSpotlight);
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        spotlight.classList.remove('is-active');
    });

    // Localized spotlight glow on interactive cards, tracking the cursor within each card
    const spotlightCards = document.querySelectorAll('.glass-card, .tool-card, .contact-card');

    spotlightCards.forEach((card) => {
        let cardRafQueued = false;
        let cardX = 50;
        let cardY = 50;

        function renderCardSpotlight() {
            card.style.setProperty('--spot-x', `${cardX}%`);
            card.style.setProperty('--spot-y', `${cardY}%`);
            cardRafQueued = false;
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            cardX = ((e.clientX - rect.left) / rect.width) * 100;
            cardY = ((e.clientY - rect.top) / rect.height) * 100;

            if (!cardRafQueued) {
                cardRafQueued = true;
                requestAnimationFrame(renderCardSpotlight);
            }
        }, { passive: true });
    });
})();



// CERTIFICATES — 3D coverflow carousel
(function () {
    const certData = [
        {
            id: 1,
            title: 'Web Design for Beginners',
            issuer: 'University of Moratuwa, Sri Lanka',
            image: 'static/certs/web-design.png',
            tags: ['HTML', 'CSS', 'JS', 'UI/UX'],
            verifyUrl: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php/?code=DL6MD2SnS8'
        },
        {
            id: 2,
            title: 'GitHub 101 - GitHub For Beginners',
            issuer: 'Microsoft Student Ambassadors',
            image: 'static/certs/github-101.png',
            tags: ['GIT', 'GITHUB', 'Version Control'],
            verifyUrl: 'https://www.linkedin.com/posts/shehan-sulakshana_github-microsoftstudentambassadors-versioncontrol-share-7490604150120923137-ESPA/'
        },
        {
            id: 3,
            title: 'Networking Basics',
            issuer: 'Cisco Networking Academy',
            image: 'static/certs/networking-basics.png',
            tags: ['Networking', 'Protocols', 'OSI Model'],
            verifyUrl: 'https://www.credly.com/badges/bd702b9e-16d3-439d-bcf6-6cb71c249196/public_url'
        },
        {
            id: 4,
            title: "Introduction to Cybersecurity",
            issuer: 'Cisco Networking Academy',
            image: 'static/certs/cybersecurity-intro.png',
            tags: ['Cybersecurity', 'CIA Triad', 'Networking Security'],
            verifyUrl: 'https://www.credly.com/badges/ec03e1af-01c9-4aa4-858a-e5538fd12ed7/public_url'
        }
    ];

    const carousel = document.getElementById('cert3dCarousel');
    const indicatorsEl = document.getElementById('cert3dIndicators');
    const prevBtn = document.getElementById('cert3dPrev');
    const nextBtn = document.getElementById('cert3dNext');
    const container = document.querySelector('.cert3d-container');
    if (!carousel) return;

    let currentIndex = 0;
    let autoTimer = null;
    let isHovering = false;
    let isPageVisible = !document.hidden;

    function createItem(data, index) {
        const item = document.createElement('div');
        item.className = 'cert3d-item';
        item.dataset.index = index;

        const tags = data.tags.map(t => `<span class="cert3d-tag">${t}</span>`).join('');

        item.innerHTML = `
            <div class="cert3d-card">
                <div class="cert3d-number">0${data.id}</div>
                <div class="cert3d-thumb"><img src="${data.image}" alt="${data.title}" loading="lazy"></div>
                <h3 class="cert3d-title">${data.title}</h3>
                <p class="cert3d-issuer">${data.issuer}</p>
                <div class="cert3d-tags">${tags}</div>
                <a class="cert3d-verify" href="${data.verifyUrl}" target="_blank" rel="noopener noreferrer">
                    <i data-lucide="badge-check"></i> View Certificate
                </a>
                <span class="cert3d-hint">Click to bring forward</span>
            </div>
        `;

        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `View ${data.title} certificate`);

        item.addEventListener('click', (e) => {
            if (index !== currentIndex) {
                e.preventDefault();
                goToSlide(index);
            }
        });

        item.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && index !== currentIndex) {
                e.preventDefault();
                goToSlide(index);
            }
        });

        return item;
    }

    function updateCarousel() {
        const items = document.querySelectorAll('.cert3d-item');
        const dots = document.querySelectorAll('.cert3d-dot');
        const total = items.length;
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;

        let spacing1 = 320, spacing2 = 500;
        if (isMobile) { spacing1 = 190; spacing2 = 320; }
        else if (isTablet) { spacing1 = 250; spacing2 = 400; }

        items.forEach((item, index) => {
            let offset = index - currentIndex;
            if (offset > total / 2) offset -= total;
            else if (offset < -total / 2) offset += total;

            const abs = Math.abs(offset);
            const sign = offset < 0 ? -1 : 1;
            item.classList.toggle('is-active', abs === 0);
            item.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';

            if (abs === 0) {
                item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
                item.style.opacity = '1';
                item.style.zIndex = '10';
            } else if (abs === 1) {
                const rot = isMobile ? 28 : 32;
                const scale = isMobile ? 0.86 : 0.82;
                item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing1}px) translateZ(-180px) rotateY(${-sign * rot}deg) scale(${scale})`;
                item.style.opacity = '0.75';
                item.style.zIndex = '5';
            } else if (abs === 2) {
                const rot = isMobile ? 38 : 42;
                const scale = isMobile ? 0.7 : 0.65;
                item.style.transform = `translate(-50%, -50%) translateX(${sign * spacing2}px) translateZ(-320px) rotateY(${-sign * rot}deg) scale(${scale})`;
                item.style.opacity = '0.4';
                item.style.zIndex = '3';
            } else {
                item.style.transform = 'translate(-50%, -50%) translateZ(-420px) scale(0.5)';
                item.style.opacity = '0';
                item.style.zIndex = '1';
            }
        });

        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        lucide.createIcons();
    }

    function nextSlide() { currentIndex = (currentIndex + 1) % certData.length; updateCarousel(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + certData.length) % certData.length; updateCarousel(); }
    function goToSlide(i) { currentIndex = i; updateCarousel(); }

    function startAuto() {
        stopAuto();
        // Only auto-advance while the tab/window is active (visible) and the
        // user isn't hovering the carousel — prevents background CPU/battery
        // use and unwanted jumps while the user is away from the tab.
        autoTimer = setInterval(() => {
            if (!isHovering && isPageVisible) nextSlide();
        }, 4500);
    }
    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }

    function init() {
        certData.forEach((data, index) => {
            carousel.appendChild(createItem(data, index));

            const dot = document.createElement('div');
            dot.className = 'cert3d-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            indicatorsEl.appendChild(dot);
        });

        updateCarousel();
        startAuto();

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        container.addEventListener('mouseenter', () => (isHovering = true));
        container.addEventListener('mouseleave', () => (isHovering = false));

        // Pause auto-scroll entirely when the browser tab/window is not
        // active (backgrounded, minimized, or another tab is focused), and
        // resume it when the user comes back.
        document.addEventListener('visibilitychange', () => {
            isPageVisible = !document.hidden;
            if (isPageVisible) {
                startAuto();
            } else {
                stopAuto();
            }
        });

        // Extra safety net for browsers/window managers that fire
        // focus/blur without a visibilitychange event.
        window.addEventListener('blur', () => {
            isPageVisible = false;
            stopAuto();
        });
        window.addEventListener('focus', () => {
            isPageVisible = true;
            startAuto();
        });

        // Swipe support
        let touchStartX = 0;
        container.addEventListener('touchstart', (e) => (touchStartX = e.touches[0].clientX), { passive: true });
        container.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(diff) > 40) diff < 0 ? nextSlide() : prevSlide();
        }, { passive: true });

        // Keyboard nav — only while hovering the carousel
        document.addEventListener('keydown', (e) => {
            if (!isHovering) return;
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        let resizeT;
        window.addEventListener('resize', () => {
            clearTimeout(resizeT);
            resizeT = setTimeout(updateCarousel, 200);
        });
    }

    init();
})();


// BADGES SUB-SECTION

window.BADGES_DATA = [
  {
    title: "GitHub For Beginners",
    issuer: "Microsoft Student Ambassadors",
    date: "Issued Jul 2026",
    skills: "Git, GitHub, Version Control",
    link: "https://github.com/nisalgunawardhana/Github-for-beginners/issues/1018#issuecomment-5012249370",
    img: "static/badges/github-beginners.png"
  },
  {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Issued Dec 2025",
    skills: "Networking Fundamentals, Protocols, OSI Model",
    link: "https://www.credly.com/badges/ec03e1af-01c9-4aa4-858a-e5538fd12ed7/public_url",
    img: "static/badges/networking-basics.png"
  },
  {
    title: "Cybersecurity Basics",
    issuer: "Cisco Networking Academy",
    date: "Issued Jan 2026",
    skills: "Cybersecurity Fundamentals, Threat Analysis",
    link: "https://www.credly.com/badges/ec03e1af-01c9-4aa4-858a-e5538fd12ed7/public_url",
    img: "static/badges/cybersecurity-basics.png"
  },
  {
    title: "Build Apps with Flutter",
    issuer: "Google Developers",
    date: "Issued Aug 2026",
    skills: "Flutter, Dart, Mobile Development",
    link: "https://developers.google.com/profile/badges/playlists/intro-to-flutter?u=shehanss",
    img: "static/badges/intro-to-flutter.svg"
  },
  
  {
    title: "Material Design Flutter",
    issuer: "Google Developers",
    date: "Issued Aug 2026",
    skills: "Material Design, Flutter, UI/UX",
    link: "https://developers.google.com/profile/badges/playlists/implement-material-design-with-material-components?u=shehanss",
    img: "static/badges/material-design-with-flutter.svg"
  },
  {
    title: "Firebase And Flutter",
    issuer: "Google Developers",
    date: "Issued Jul 2026",
    skills: "Firebase, Flutter, Mobile Development",
    link: "https://developers.google.com/profile/badges/playlists/firebase/add_firebase_to_flutter?u=shehanss",
    img: "static/badges/firebase-flutter.svg"
  },
  {
    title: "Firebase And Flutter : Advanced",
    issuer: "Google Developers",
    date: "Issued Aug 2026",
    skills: "Firebase, Flutter, Mobile Development",
    link: "https://developers.google.com/profile/badges/playlists/firebase/firebase-flutter-advanced?u=shehanss",
    img: "static/badges/advanced-firebase-flutter.svg"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".badges-container");
  const rowsEl = document.getElementById("badgesRows");
  if (!container || !rowsEl) return;

  const data = Array.isArray(window.BADGES_DATA) ? window.BADGES_DATA : [];
  if (data.length === 0) return;

  const perRow = parseInt(container.dataset.perRow, 10) || 4;
  const toggleBtn = document.getElementById("toggleBadgesBtn");
  const toggleText = document.getElementById("toggleText");

  const modal = document.getElementById("badgeModal");
  if (modal && modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  const rows = [];
  for (let i = 0; i < data.length; i += perRow) {
    rows.push(data.slice(i, i + perRow));
  }

  function initials(str) {
    return (str || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join("");
  }

  function chipMarkup(badge) {
    const safe = (s) => (s || "").toString();
    return `
      <button class="badge-chip"
        data-title="${safe(badge.title)}"
        data-issuer="${safe(badge.issuer)}"
        data-date="${safe(badge.date)}"
        data-skills="${safe(badge.skills)}"
        data-link="${safe(badge.link)}"
        data-img="${safe(badge.img)}">
        <span class="badge-chip-icon-wrap">
          <img src="${safe(badge.img)}" alt="" class="badge-chip-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <span class="badge-chip-fallback" style="display:none;">${initials(badge.issuer || badge.title)}</span>
        </span>
        <span class="badge-chip-name">${safe(badge.title)}</span>
      </button>`;
  }

  const firstRow = document.createElement("div");
  firstRow.className = "badges-chips";
  firstRow.innerHTML = rows[0].map(chipMarkup).join("");
  rowsEl.appendChild(firstRow);

  // "See more"
  const extraRowWrappers = [];
  for (let i = 1; i < rows.length; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "badge-row-wrapper badge-row-collapsed";
    wrapper.innerHTML = `<div class="badge-row-inner"><div class="badges-chips">${rows[i].map(chipMarkup).join("")}</div></div>`;
    rowsEl.appendChild(wrapper);
    extraRowWrappers.push(wrapper);
  }

  // "See more"
  let revealedCount = 0;

  function updateToggleLabel() {
    const remaining = extraRowWrappers.length - revealedCount;
    if (remaining > 0) {
      toggleText.textContent = "See more";
      toggleBtn.classList.remove("expanded");
    } else {
      toggleText.textContent = "Show less";
      toggleBtn.classList.add("expanded");
    }
  }

  if (extraRowWrappers.length > 0) {
    toggleBtn.hidden = false;
    updateToggleLabel();

    toggleBtn.addEventListener("click", () => {
      const remaining = extraRowWrappers.length - revealedCount;

      if (remaining > 0) {
        // Reveal the next collapsed row.
        extraRowWrappers[revealedCount].classList.remove("badge-row-collapsed");
        revealedCount++;
      } else {
        // Everything is revealed — collapse back down to just the first row.
        extraRowWrappers.forEach(w => w.classList.add("badge-row-collapsed"));
        revealedCount = 0;
      }

      updateToggleLabel();
    });
  }


  rowsEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".badge-chip");
    if (!chip) return;
    openBadgeModal({
      title: chip.dataset.title,
      issuer: chip.dataset.issuer,
      date: chip.dataset.date,
      skills: chip.dataset.skills,
      link: chip.dataset.link,
      img: chip.dataset.img
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeBadgeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeBadgeModal();
  });
});

// BADGE MODAL DIALOG
function openBadgeModal({ title, issuer, date, skills, link, img }) {
  document.getElementById("modalTitle").textContent = title || "";
  document.getElementById("modalIssuer").textContent = issuer || "";
  document.getElementById("modalDate").textContent = date || "";
  document.getElementById("modalSkills").textContent = skills || "";
  document.getElementById("modalVerifyLink").href = link || "#";
  const img_el = document.getElementById("modalImg");
  img_el.style.display = "";
  img_el.src = img || "";
  img_el.alt = title || "";
  img_el.onerror = () => { img_el.style.display = "none"; };
  document.getElementById("badgeModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBadgeModal() {
  document.getElementById("badgeModal").classList.remove("active");
  document.body.style.overflow = "";
}