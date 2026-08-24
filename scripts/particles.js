// particle background

(function () {
    const canvas = document.getElementById('particle-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Theme accent colors to blend between, per-particle
    const TEAL = { r: 79, g: 209, b: 197 };
    const PURPLE = { r: 183, g: 148, b: 244 };
    const WHITE = { r: 241, g: 245, b: 255 };

    // A few fixed two-tone combinations so gradients always read as
    // "on brand" rather than random muddy blends
    const COMBOS = [
        [TEAL, PURPLE],
        [PURPLE, TEAL],
        [PURPLE, WHITE],
        [TEAL, WHITE]
    ];

    function mix(a, b, t) {
        return {
            r: Math.round(a.r + (b.r - a.r) * t),
            g: Math.round(a.g + (b.g - a.g) * t),
            b: Math.round(a.b + (b.b - a.b) * t)
        };
    }

    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationId = null;

    function densityForWidth(w) {
        // Fewer particles on small screens for both looks and performance
        if (w < 600) return 26;
        if (w < 1100) return 42;
        return 58;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle() {
        const [from, to] = COMBOS[Math.floor(Math.random() * COMBOS.length)];
        const radius = Math.random() * 1.4 + 0.7;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            baseRadius: radius,
            from,
            to,
            // very slow, gentle drift — no interaction, just ambience
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            // independent twinkle phase so particles don't pulse in sync
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.003 + Math.random() * 0.005,
            // gentle opacity ceiling per-particle for natural variance
            maxAlpha: 0.35 + Math.random() * 0.25
        };
    }

    function initParticles() {
        const count = densityForWidth(width);
        particles = Array.from({ length: count }, makeParticle);
    }

    function wrap(p) {
        const margin = 20;
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            wrap(p);

            p.phase += p.twinkleSpeed;
            const twinkle = (Math.sin(p.phase) + 1) / 2; // 0..1
            const alpha = 0.15 + twinkle * p.maxAlpha;
            const r = p.baseRadius + twinkle * 0.35;

            // Blend color across the particle's own small gradient disc
            const core = mix(p.from, p.to, 0.15);
            const edge = mix(p.from, p.to, 0.9);

            // Very short glow falloff — kept tight so it reads as a soft
            // point of light rather than a bright halo
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2);
            glow.addColorStop(0, `rgba(${core.r}, ${core.g}, ${core.b}, ${alpha})`);
            glow.addColorStop(0.6, `rgba(${edge.r}, ${edge.g}, ${edge.b}, ${alpha * 0.35})`);
            glow.addColorStop(1, `rgba(${edge.r}, ${edge.g}, ${edge.b}, 0)`);

            ctx.beginPath();
            ctx.fillStyle = glow;
            ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function loop() {
        draw();
        animationId = requestAnimationFrame(loop);
    }

    function start() {
        resize();
        initParticles();
        if (prefersReducedMotion) {
            draw(); // single calm frame, no animation loop
        } else {
            if (animationId) cancelAnimationFrame(animationId);
            loop();
        }
    }

    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Pause when tab is hidden to save battery/CPU
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stop();
        } else if (!prefersReducedMotion) {
            loop();
        }
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            resize();
            initParticles();
            if (prefersReducedMotion) draw();
        }, 200);
    });

    start();
})();