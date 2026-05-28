// ── Countdown ──
function updateCountdown() {
    const wedding = new Date('2026-11-01T18:00:00');
    const now = new Date();
    const diff = wedding - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML =
            '<p class="countdown-label" style="font-size:1.2rem;letter-spacing:.1em">🎉 Hoje é o grande dia!</p>';
        return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-dias').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-horas').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-min').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-seg').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── RSVP ──
function submitRSVP() {
    const nome = document.getElementById('f-nome').value.trim();
    const conf = document.getElementById('f-conf').value;

    if (!nome) { alert('Por favor, informe seu nome.'); return; }
    if (!conf) { alert('Por favor, selecione sua confirmação.'); return; }

    document.getElementById('form-wrap').style.display = 'none';
    document.getElementById('rsvp-success').style.display = 'block';
}

// ── Intersection Observer: fade-in on scroll ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.tl-item, .presente-card, .local-card, .presentes-pix').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
    observer.observe(el);
});