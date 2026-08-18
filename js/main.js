/**
 * D&A Web Studio - Optimized Production Main Script
 * Zero CLS • Zero Forced Reflows • Instant Interaction
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTiltCards();
  initTypewriter();
  initScratchCard();
  initContactForm();
  initMobileNav();
  initCustomCursor();
  initScrollspy();
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

/* ==========================================================================
   1. Theme Switcher
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("da_theme") || "light";

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    updateThemeIcon(false);
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    updateThemeIcon(true);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      document.documentElement.classList.toggle("light", !isDark);
      localStorage.setItem("da_theme", isDark ? "dark" : "light");
      updateThemeIcon(!isDark);
      toggleBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    });
  }
}

function updateThemeIcon(isLight) {
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.setAttribute("data-lucide", isLight ? "moon" : "sun");
    if (typeof lucide !== "undefined") lucide.createIcons();
  }
}

/* ==========================================================================
   2. Service Modals
   ========================================================================== */
window.openServiceModal = function(serviceId) {
  if (typeof studioData === "undefined" || !studioData.services) return;
  const service = studioData.services.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById("general-modal");
  const modalContent = document.getElementById("modal-dynamic-content");
  
  modalContent.innerHTML = `
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-800 dark:text-emerald-300" aria-hidden="true">
          <i data-lucide="${service.icon}" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-xs font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-bold">${service.category}</span>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">${service.title}</h2>
        </div>
      </div>
      <button onclick="closeModal()" type="button" aria-label="Close service details modal" class="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors">
        <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
      </button>
    </div>

    <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6">${service.fullDesc}</p>

    <div class="mb-6">
      <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold mb-3">Key Deliverables & Standards</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        ${service.features.map(f => `
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 font-medium">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true"></i>
            <span>${f}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="mb-6">
      <h4 class="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold mb-2">Tech Stack & Frameworks</h4>
      <div class="flex flex-wrap gap-2">
        ${service.tags.map(tag => `
          <span class="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 text-xs font-bold text-emerald-900 dark:text-emerald-200">
            ${tag}
          </span>
        `).join('')}
      </div>
    </div>

    <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
      <button onclick="closeModal(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'})" class="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
        <span>Request Free Demo / Consultation</span> <i data-lucide="arrow-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
      </button>
      <span class="text-xs text-slate-500 font-medium">Led directly by Dhruv & Amisha</span>
    </div>
  `;

  modal.classList.add("open");
  if (typeof lucide !== "undefined") lucide.createIcons();
};

/* ==========================================================================
   3. Case Studies Filter & Modal
   ========================================================================== */
window.filterCaseStudies = function(category, btnElement) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("btn-primary", "text-white", "font-bold");
    btn.classList.add("bg-white", "dark:bg-white/5", "text-slate-800", "dark:text-slate-200");
    btn.setAttribute("aria-selected", "false");
  });
  if (btnElement) {
    btnElement.classList.remove("bg-white", "dark:bg-white/5", "text-slate-800", "dark:text-slate-200");
    btnElement.classList.add("btn-primary", "text-white", "font-bold");
    btnElement.setAttribute("aria-selected", "true");
  }

  const cards = document.querySelectorAll("#case-studies-grid article");
  cards.forEach(card => {
    if (category === "All") {
      card.style.display = "flex";
    } else {
      const cardCat = card.querySelector(".bg-black\\/70")?.innerText || "";
      if (cardCat.toLowerCase().includes(category.toLowerCase())) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  });
};

window.openCaseModal = function(caseId) {
  if (typeof studioData === "undefined" || !studioData.caseStudies) return;
  const item = studioData.caseStudies.find(c => c.id === caseId);
  if (!item) return;

  const modal = document.getElementById("general-modal");
  const modalContent = document.getElementById("modal-dynamic-content");

  modalContent.innerHTML = `
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-white/10">
      <div>
        <span class="text-xs font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-bold">${item.client}</span>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white font-display">${item.title}</h2>
      </div>
      <button onclick="closeModal()" type="button" aria-label="Close case study modal" class="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 hover:text-slate-900 transition-colors">
        <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
      </button>
    </div>

    <div class="rounded-xl overflow-hidden mb-6 max-h-60 border border-slate-200 dark:border-white/10 bg-slate-900">
      <img src="${item.image}" alt="Screenshot for ${item.title}" width="600" height="300" loading="lazy" class="w-full h-full object-cover">
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
      <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
        <div class="text-xs text-slate-600 dark:text-slate-400 font-medium">Outcome Metric</div>
        <div class="text-base font-bold text-emerald-800 dark:text-emerald-400 font-mono">${item.metric}</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center">
        <div class="text-xs text-slate-600 dark:text-slate-400 font-medium">Timeline</div>
        <div class="text-base font-bold text-slate-900 dark:text-white font-mono">${item.duration}</div>
      </div>
      <div class="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center col-span-2 sm:col-span-1">
        <div class="text-xs text-slate-600 dark:text-slate-400 font-medium">Category</div>
        <div class="text-base font-bold text-teal-800 dark:text-teal-300">${item.category}</div>
      </div>
    </div>

    <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6">${item.description} Tailored to eliminate friction and maximize conversion clarity.</p>

    <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
      <button onclick="closeModal(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'})" class="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
        <span>Build a Project Like This</span> <i data-lucide="arrow-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
      </button>
      <span class="text-xs text-slate-500 font-medium">D&A Web Studio</span>
    </div>
  `;

  modal.classList.add("open");
  if (typeof lucide !== "undefined") lucide.createIcons();
};

window.closeModal = function() {
  const modal = document.getElementById("general-modal");
  if (modal) modal.classList.remove("open");
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ==========================================================================
   4. Scope Estimator
   ========================================================================== */
let estimatorState = {
  serviceId: "web",
  pageTier: "single",
  selectedAddons: new Set()
};

window.selectEstimatorService = function(serviceId, el) {
  estimatorState.serviceId = serviceId;
  document.querySelectorAll(".service-chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  calculateEstimatorTotal();
};

window.selectEstimatorPages = function(pageId, el) {
  estimatorState.pageTier = pageId;
  document.querySelectorAll(".page-chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  calculateEstimatorTotal();
};

window.toggleEstimatorAddon = function(addonId, el) {
  if (estimatorState.selectedAddons.has(addonId)) {
    estimatorState.selectedAddons.delete(addonId);
    el.classList.remove("active");
  } else {
    estimatorState.selectedAddons.add(addonId);
    el.classList.add("active");
  }
  calculateEstimatorTotal();
};

function calculateEstimatorTotal() {
  if (typeof studioData === "undefined" || !studioData.estimator) return;
  const { serviceTypes, pagesCount, addons } = studioData.estimator;
  
  const currentService = serviceTypes.find(s => s.id === estimatorState.serviceId) || serviceTypes[0];
  const currentPage = pagesCount.find(p => p.id === estimatorState.pageTier) || pagesCount[0];

  const scopeDisplay = document.getElementById("estimator-scope-display");
  const timeEl = document.getElementById("estimator-time-display");
  const deliverablesEl = document.getElementById("estimator-deliverables-display");

  if (scopeDisplay) {
    scopeDisplay.innerText = `${currentService.name} (${currentPage.label})`;
  }
  if (timeEl) {
    timeEl.innerText = currentService.time;
  }
  if (deliverablesEl) {
    const addonNames = Array.from(estimatorState.selectedAddons)
      .map(id => addons.find(a => a.id === id)?.name)
      .filter(Boolean);
    deliverablesEl.innerText = addonNames.length > 0 
      ? `Includes: Core Architecture + ${addonNames.join(", ")}` 
      : "Includes: Full Design, 3D WebGL Concept & Direct Founder Oversight";
  }
}

window.applyEstimateToContact = function() {
  if (typeof studioData === "undefined" || !studioData.estimator) return;
  const { serviceTypes, pagesCount, addons } = studioData.estimator;
  const currentService = serviceTypes.find(s => s.id === estimatorState.serviceId);
  const currentPage = pagesCount.find(p => p.id === estimatorState.pageTier);
  const addonNames = Array.from(estimatorState.selectedAddons)
    .map(id => addons.find(a => a.id === id)?.name)
    .filter(Boolean);

  const messageField = document.getElementById("contact-message");
  if (messageField) {
    messageField.value = `Hi Dhruv & Amisha, I selected the following project scope on your website:
- Service: ${currentService?.name}
- Scope: ${currentPage?.label}
- Estimated Timeline: ${currentService?.time}
- Add-ons: ${addonNames.join(", ") || "None"}

Let's discuss my project goals and prepare a free demo concept!`;
  }

  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
};

/* ==========================================================================
   5. Scratch & Reveal
   ========================================================================== */
function initScratchCard() {
  const canvas = document.getElementById("scratch-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = 440;
  canvas.height = 240;

  ctx.fillStyle = "#1e3828";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#86efac";
  ctx.font = "bold 14px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("✦ SCRATCH HERE TO REVEAL ✦", canvas.width / 2, canvas.height / 2 - 10);
  
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "12px sans-serif";
  ctx.fillText("Drag mouse or finger across the card", canvas.width / 2, canvas.height / 2 + 18);

  let isDrawing = false;
  let scratchedCount = 0;
  let isRevealed = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    scratchedCount++;
    if (!isRevealed && scratchedCount > 25) {
      isRevealed = true;
      canvas.style.opacity = "0";
      setTimeout(() => {
        canvas.style.display = "none";
        if (typeof confetti === "function") {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#2d5a27', '#047857', '#0369a1', '#86efac']
          });
        }
      }, 350);
    }
  }

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const { x, y } = getCoords(e);
    scratch(x, y);
  }, { passive: true });

  window.addEventListener("mouseup", () => { isDrawing = false; }, { passive: true });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoords(e);
    scratch(x, y);
  }, { passive: true });

  canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const { x, y } = getCoords(e);
    scratch(x, y);
  }, { passive: true });

  canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoords(e);
    scratch(x, y);
  }, { passive: true });

  window.addEventListener("touchend", () => { isDrawing = false; }, { passive: true });
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
window.toggleFaq = function(index) {
  const ans = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  const btn = document.getElementById(`faq-btn-${index}`);
  if (!ans || !icon || !btn) return;

  const isHidden = ans.classList.contains("hidden");
  if (isHidden) {
    ans.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
    btn.setAttribute("aria-expanded", "true");
  } else {
    ans.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
    btn.setAttribute("aria-expanded", "false");
  }
};

/* ==========================================================================
   7. 3D Tilt Cards (Cached Rects - Zero Layout Thrashing)
   ========================================================================== */
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach(card => {
    let rect = null;

    card.addEventListener("mouseenter", () => {
      rect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener("mousemove", (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      rect = null;
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }, { passive: true });
  });
}

/* ==========================================================================
   8. Typewriter Headline Loop
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  const phrases = [
    "Websites that work everywhere.",
    "3D Experiences that captivate.",
    "Support Systems that scale.",
    "Digital Brands that convert."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.innerText = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.innerText = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   9. Contact Form & Toast
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("agency-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name")?.value || "";
    const email = document.getElementById("contact-email")?.value || "";
    const service = document.getElementById("contact-service")?.value || "3D Website";
    const message = document.getElementById("contact-message")?.value || "";

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Request...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      const toast = document.getElementById("feedback-toast");
      if (toast) {
        toast.classList.remove("translate-y-24", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
        setTimeout(() => {
          toast.classList.remove("translate-y-0", "opacity-100");
          toast.classList.add("translate-y-24", "opacity-0");
        }, 4500);
      }
      form.reset();

      const mailtoLink = `mailto:Dhruv.sahani.work@gmail.com?subject=New Project Request from ${encodeURIComponent(name)} - ${encodeURIComponent(service)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
      window.open(mailtoLink, "_blank");
    }, 600);
  });
}

/* ==========================================================================
   10. Mobile Nav Drawer
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  const closeBtn = document.getElementById("close-drawer-btn");
  const backdrop = document.getElementById("mobile-backdrop");

  function openDrawer() {
    if (drawer) {
      drawer.classList.remove("-translate-x-full");
      menuBtn?.setAttribute("aria-expanded", "true");
    }
  }

  function closeDrawer() {
    if (drawer) {
      drawer.classList.add("-translate-x-full");
      menuBtn?.setAttribute("aria-expanded", "false");
    }
  }

  menuBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/* ==========================================================================
   11. Magnetic Cursor (Desktop Only)
   ========================================================================== */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) return;

  const cursor = document.querySelector(".custom-cursor");
  const follower = document.querySelector(".custom-cursor-follower");
  if (!cursor || !follower) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();
}

/* ==========================================================================
   12. Scrollspy Navigation
   ========================================================================== */
function initScrollspy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (scrollPos >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      const isCurrent = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("text-emerald-800", isCurrent);
      link.classList.toggle("dark:text-emerald-400", isCurrent);
      link.classList.toggle("font-bold", isCurrent);
    });
  }, { passive: true });
}