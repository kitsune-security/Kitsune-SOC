document.addEventListener('DOMContentLoaded', () => {
    
    // --- Gestion du formulaire (Simulation) ---
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.textContent;
            
            btn.textContent = "Envoi en cours...";
            btn.style.opacity = "0.7";
            
            // Simule un envoi réseau
            setTimeout(() => {
                alert("Merci ! Votre demande a été enregistrée. Nous vous contacterons rapidement.");
                form.reset();
                btn.textContent = originalText;
                btn.style.opacity = "1";
            }, 1000);
        });
    }

    // --- Animation au scroll (Intersection Observer) ---
    // Cette partie détecte quand un élément ".fade-in" entre dans l'écran
    const observerOptions = {
        threshold: 0.1, // Déclenche quand 10% de l'élément est visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Ne joue l'animation qu'une fois
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Smooth Scroll pour les ancres ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});