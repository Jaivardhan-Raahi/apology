document.addEventListener('DOMContentLoaded', () => {
    // Background Heart Animation
    const bgContainer = document.getElementById('bg-animation');
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💓'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Random positioning and sizing
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        
        bgContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Interactive Buttons
    const forgiveBtn = document.getElementById('forgive-btn');
    const thinkBtn = document.getElementById('think-btn');
    const responseText = document.getElementById('response-text');

    forgiveBtn.addEventListener('click', () => {
        responseText.innerText = "Thank you, my love! I promise to make it up to you! ❤️";
        responseText.classList.remove('hidden');
        confettiExplosion();
    });

    thinkBtn.addEventListener('click', () => {
        responseText.innerText = "I understand. I will wait for you forever. Take all the time you need.";
        responseText.classList.remove('hidden');
    });

    // Simple Confetti Effect
    function confettiExplosion() {
        for (let i = 0; i < 100; i++) {
            createConfetti();
        }
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const tx = Math.cos(angle) * velocity * 20;
        const ty = Math.sin(angle) * velocity * 20;

        const animation = confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        animation.onfinish = () => confetti.remove();
    }
});
