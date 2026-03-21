// ─── COUNTDOWN TIMER ────────────────────────────────────────────
const eventDate = new Date('2026-07-18T17:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent    = '00';
        document.getElementById('hours').textContent   = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = String(days).padStart(2, '0');
    document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ─── RSVP BUTTONS ───────────────────────────────────────────────
document.getElementById('yesBtn')?.addEventListener('click', function () {
    this.textContent = '¡Te esperamos! ✓';
    this.style.background = 'rgba(90,170,90,0.2)';
    this.style.borderColor = '#5aaa5a';
    this.style.color = '#2d6b2d';
    document.getElementById('noBtn').style.opacity = '0.4';
    document.getElementById('noBtn').disabled = true;
});

document.getElementById('noBtn')?.addEventListener('click', function () {
    this.textContent = 'Nos veremos pronto ✗';
    this.style.background = 'rgba(200,80,80,0.15)';
    this.style.borderColor = '#cc5555';
    this.style.color = '#7a1f1f';
    document.getElementById('yesBtn').style.opacity = '0.4';
    document.getElementById('yesBtn').disabled = true;
});

// ─── DRAGGABLE GALLERY ──────────────────────────────────────────
const gallery = document.querySelector('.gallery-scroll');
if (gallery) {
    let isDown = false, startX, scrollLeft;

    gallery.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', () => { isDown = false; });
    gallery.addEventListener('mouseup',    () => { isDown = false; });

    gallery.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        gallery.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
}

// ─── FADE IN ON SCROLL ──────────────────────────────────────────
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section, footer').forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });
});
