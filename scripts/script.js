lucide.createIcons();

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
        mobileToggle.innerHTML = '<i data-lucide="menu" style="width:24px;height:24px"></i>';
        lucide.createIcons();
    });
});

// Tab 
window.switchTab = function (tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.closest('.tab-btn').classList.add('active');
    lucide.createIcons();
};

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


document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    function switchTab(activeTab) {
        // Update buttons
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === activeTab);
        });

        // Update content
        tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.tabContent === activeTab);
        });
    }

    // Click events
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            switchTab(this.dataset.tab);
        });

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Initialize first tab
    if (tabBtns.length > 0) {
        switchTab(tabBtns[0].dataset.tab);
    }
});


const lines = [
    'shehan@portfolio:~$whoami',
    'Flutter Mobile Developer',
    'Cybersecurity Enthusiast'
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

        item.addEventListener('click', (e) => {
            if (index !== currentIndex) {
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
        autoTimer = setInterval(() => { if (!isHovering) nextSlide(); }, 4500);
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