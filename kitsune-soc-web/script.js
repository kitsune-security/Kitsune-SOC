(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  // "Demander un devis" buttons -> prefill subject and scroll to form
  const subjectSelect = document.getElementById("subjectSelect");
  document.querySelectorAll(".js-quote").forEach((btn) => {
    btn.addEventListener("click", () => {
      const offer = btn.getAttribute("data-offer") || "Serenity";
      if (subjectSelect) subjectSelect.value = `Audit - ${offer}`;
      const contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
      // focus first field
      const nameInput = document.querySelector('input[name="name"]');
      if (nameInput) setTimeout(() => nameInput.focus(), 350);
    });
  });

  // Contact form (front-only). Replace with your real endpoint if needed.
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");

  function setHint(msg, ok = true) {
    if (!hint) return;
    hint.textContent = msg;
    hint.style.color = ok ? "rgba(255,255,255,.78)" : "rgba(255,120,170,.92)";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();
      const consent = data.get("consent") === "on";

      if (!name || !email || !message || !consent) {
        setHint("Merci de compléter les champs obligatoires et d’accepter d’être recontacté(e).", false);
        return;
      }

      // Simulate submit success
      setHint("Message prêt à être envoyé. Connectez ce formulaire à Formspree / n8n / backend pour l’envoi réel ✅", true);
      form.reset();

      // Default back to Serenity after reset
      if (subjectSelect) subjectSelect.value = "Audit - Serenity";
    });
  }
})();
