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
    'Flutter | Dart Developer',
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
