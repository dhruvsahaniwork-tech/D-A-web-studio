/**
 * D&A Web Studio - Main Controller (Performance & Accessibility Optimized)
 * Zero Forced Reflows • WCAG AAA Accessible • Throttled Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderFounders();
  renderServices();
  renderCaseStudies();
  renderProcess();
  renderPrinciples();
  renderEstimator();
  renderTestimonials();
  renderFaqs();
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
   1. Theme Switcher (Accessible & High Contrast)
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
   2. Render Founders (Semantic & High Contrast)
   ========================================================================== */
function renderFounders() {
  const container = document.getElementById("founders-container");
  if (!container || !studioData.founders) return;

  container.innerHTML = studioData.founders.map(founder => `
    <article class="tilt-card glass-panel rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-start border border-slate-200 dark:border-white/10 transition-all shadow-sm" aria-label="Founder profile for ${founder.name}">
      <div class="tilt-inner w-full md:w-5/12 shrink-0">
        <div class="founder-portrait rounded-2xl border border-slate-200 dark:border-white/15 overflow-hidden shadow-md relative">
          <img src="${founder.image}" alt="Portrait of ${founder.name}, ${founder.role}" width="400" height="480" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute bottom-3 left-3 right-3 z-10">
            <span class="inline-block px-3 py-1 bg-white/95 dark:bg-emerald-950/90 backdrop-blur-md border border-emerald-600/30 text-emerald-900 dark:text-emerald-200 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
              ${founder.role.split('/')[0].trim()}
            </span>
          </div>
        </div>
      </div>
      <div class="tilt-inner flex-1 flex flex-col justify-between h-full">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold">${founder.role}</span>
          </div>
          <h3 class="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 font-display">${founder.name}</h3>
          <p class="text-emerald-800 dark:text-emerald-300 text-sm font-semibold italic mb-4">"${founder.tagline}"</p>
          <p class="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mb-6">${founder.bio}</p>
          
          <div class="space-y-2.5 mb-6">
            ${founder.points.map(pt => `
              <div class="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <span class="text-emerald-700 dark:text-emerald-400 mt-0.5" aria-hidden="true">✦</span>
                <span>${pt}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-6" aria-label="Specialties">
            ${founder.skills.map(skill => `
              <span class="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-white/5 border border-emerald-300 dark:border-white/10 text-[11px] font-semibold text-emerald-900 dark:text-slate-200">
                ${skill}
              </span>
            `).join('')}
          </div>
          <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <a href="${founder.socials.email}" aria-label="Send an email to ${founder.name}" class="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-600 transition-colors">
              <i data-lucide="mail" class="w-3.5 h-3.5" aria-hidden="true"></i> Connect with ${founder.name.split(' ')[0]} ↗
            </a>
            <span class="text-[11px] text-slate-500 font-medium">Co-Founder D&A</span>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}
/* ==========================================================================
   3. Render Services Grid & Accessible Modals
   ========================================================================== */
function renderServices() {
  const container = document.getElementById("services-grid");
  if (!container || !studioData.services) return;

  container.innerHTML = studioData.services.map(srv => `
    <div role="button" tabindex="0" aria-label="View details for ${srv.title}" class="tilt-card glass-panel rounded-2xl p-6 lg:p-7 flex flex-col justify-between border border-slate-200 dark:border-white/10 hover:border-emerald-600 group transition-all cursor-pointer shadow-sm focus:ring-2 focus:ring-emerald-600" onclick="openServiceModal('${srv.id}')" onkeydown="if(event.key==='Enter'||event.key===' ')openServiceModal('${srv.id}')">
      <div>
        <div class="flex items-center justify-between mb-5">
          <span class="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold tracking-wider">${srv.num} / ${srv.category}</span>
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-[10px] font-bold text-emerald-900 dark:text-emerald-200">
            ${srv.badge}
          </span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-800 dark:text-emerald-300 mb-4 group-hover:scale-105 transition-transform" aria-hidden="true">
          <i data-lucide="${srv.icon}" class="w-6 h-6"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2.5 font-display group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">${srv.title}</h3>
        <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">${srv.shortDesc}</p>
        
        <ul class="space-y-2 mb-6 text-xs text-slate-700 dark:text-slate-300 font-medium">
          ${srv.features.slice(0, 3).map(f => `
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
        <span class="text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Explore Deliverables <i data-lucide="arrow-up-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
        </span>
        <span class="text-[11px] text-slate-500 font-mono font-medium">D&A Standard</span>
      </div>
    </div>
  `).join('');
}

window.openServiceModal = function(serviceId) {
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
      <button onclick="closeModal()" aria-label="Close service details modal" class="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors">
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
   4. Render Case Studies & Interactive Filter Tabs
   ========================================================================== */
function renderCaseStudies(filter = "All") {
  const container = document.getElementById("case-studies-grid");
  if (!container || !studioData.caseStudies) return;

  const filtered = filter === "All"
    ? studioData.caseStudies
    : studioData.caseStudies.filter(c => c.category.toLowerCase().includes(filter.toLowerCase()));

  container.innerHTML = filtered.map(item => `
    <article class="tilt-card glass-panel rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-emerald-600 transition-all flex flex-col justify-between group shadow-sm" aria-label="Case study: ${item.title}">
      <div class="relative h-48 overflow-hidden bg-slate-800">
        <img src="${item.image}" alt="Screenshot preview for ${item.title}" width="800" height="400" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div class="absolute top-3 left-3">
          <span class="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white">
            ${item.category}
          </span>
        </div>
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span class="text-xs font-bold text-emerald-300 font-mono bg-slate-950/90 px-2.5 py-1 rounded-md border border-emerald-500/40">
            ${item.metric}
          </span>
          <span class="text-[11px] text-slate-200 font-mono bg-black/70 px-2 py-0.5 rounded font-medium">
            ${item.duration}
          </span>
        </div>
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">${item.title}</h3>
          <p class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mb-4">${item.description}</p>
        </div>

        <div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${item.tags.map(t => `<span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">${t}</span>`).join('')}
          </div>
          <button onclick="openCaseModal('${item.id}')" aria-label="Inspect architecture for ${item.title}" class="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 border border-slate-200 dark:border-white/10 hover:border-emerald-600 text-xs font-bold text-emerald-900 dark:text-emerald-200 transition-all flex items-center justify-center gap-1.5">
            <span>Inspect Architecture</span> <i data-lucide="arrow-up-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  if (typeof lucide !== "undefined") lucide.createIcons();
}

window.filterCaseStudies = function(category, btnElement) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("btn-primary", "text-white", "font-bold");
    btn.classList.add("bg-white", "dark:bg-white/5", "text-slate-800", "dark:text-slate-200");
  });
  if (btnElement) {
    btnElement.classList.remove("bg-white", "dark:bg-white/5", "text-slate-800", "dark:text-slate-200");
    btnElement.classList.add("btn-primary", "text-white", "font-bold");
  }
  renderCaseStudies(category);
  initTiltCards();
};

window.openCaseModal = function(caseId) {
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
      <button onclick="closeModal()" aria-label="Close case study modal" class="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 hover:text-slate-900 transition-colors">
        <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
      </button>
    </div>

    <div class="rounded-xl overflow-hidden mb-6 max-h-60 border border-slate-200 dark:border-white/10 bg-slate-900">
      <img src="${item.image}" alt="Screenshot for ${item.title}" width="800" height="400" loading="lazy" class="w-full h-full object-cover">
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
   5. Render Principles & Process
   ========================================================================== */
function renderPrinciples() {
  const container = document.getElementById("principles-grid");
  if (!container || !studioData.principles) return;

  container.innerHTML = studioData.principles.map(p => `
    <div class="tilt-card glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-emerald-600 transition-all shadow-sm">
      <div class="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold mb-3">${p.num} / STANDARD</div>
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">${p.title}</h3>
      <p class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-normal">${p.description}</p>
    </div>
  `).join('');
}

function renderProcess() {
  const container = document.getElementById("process-steps");
  if (!container || !studioData.process) return;

  container.innerHTML = studioData.process.map(step => `
    <div class="relative p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 hover:border-emerald-600 transition-all shadow-sm">
      <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-200 font-mono font-bold flex items-center justify-center mb-4" aria-hidden="true">
        ${step.step}
      </div>
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">${step.title}</h3>
      <p class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed font-normal">${step.desc}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   6. Interactive Project Scope Estimator
   ========================================================================== */
let estimatorState = {
  serviceId: "web",
  pageTier: "single",
  selectedAddons: new Set()
};

function renderEstimator() {
  calculateEstimatorTotal();
}

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
      : "Includes: Full Design, 3D WebGL Concept, Responsive Testing & Direct Founder Oversight";
  }
}

window.applyEstimateToContact = function() {
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
   7. Scratch & Reveal Interactive Playground
   ========================================================================== */
function initScratchCard() {
  const canvas = document.getElementById("scratch-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const box = canvas.parentElement;
  
  canvas.width = box.offsetWidth || 400;
  canvas.height = box.offsetHeight || 220;

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
  let scratchedPixels = 0;
  let isRevealed = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (!isRevealed) {
      checkScratchPercentage();
    }
  }

  function checkScratchPercentage() {
    scratchedPixels++;
    if (scratchedPixels > 30) {
      isRevealed = true;
      canvas.style.opacity = "0";
      setTimeout(() => {
        canvas.style.display = "none";
        triggerConfetti();
      }, 400);
    }
  }

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
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

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2d5a27', '#047857', '#0369a1', '#86efac']
    });
  }
}

/* ==========================================================================
   8. Testimonials & Accessible FAQ
   ========================================================================== */
function renderTestimonials() {
  const container = document.getElementById("testimonials-grid");
  if (!container || !studioData.testimonials) return;

  container.innerHTML = studioData.testimonials.map(t => `
    <article class="tilt-card glass-panel rounded-2xl p-6 lg:p-7 border border-slate-200 dark:border-white/10 hover:border-emerald-600 transition-all flex flex-col justify-between shadow-sm" aria-label="Review by ${t.author}">
      <div class="mb-6">
        <div class="flex text-emerald-700 dark:text-emerald-400 gap-1 mb-4" aria-label="Rating: 5 out of 5 stars">
          <i data-lucide="star" class="w-4 h-4 fill-current" aria-hidden="true"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current" aria-hidden="true"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current" aria-hidden="true"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current" aria-hidden="true"></i>
          <i data-lucide="star" class="w-4 h-4 fill-current" aria-hidden="true"></i>
        </div>
        <p class="text-slate-800 dark:text-slate-200 text-sm leading-relaxed italic">"${t.quote}"</p>
      </div>

      <div class="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
        <img src="${t.avatar}" alt="Photo of ${t.author}" width="40" height="40" loading="lazy" class="w-10 h-10 rounded-full object-cover border border-emerald-500/40">
        <div>
          <div class="text-sm font-bold text-slate-900 dark:text-white">${t.author}</div>
          <div class="text-xs text-slate-600 dark:text-slate-400 font-medium">${t.role}, <span class="text-emerald-800 dark:text-emerald-300 font-semibold">${t.company}</span></div>
        </div>
      </div>
    </article>
  `).join('');
}

function renderFaqs() {
  const container = document.getElementById("faqs-container");
  if (!container || !studioData.faqs) return;

  container.innerHTML = studioData.faqs.map((faq, index) => `
    <div class="glass-panel rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden transition-all shadow-sm">
      <button onclick="toggleFaq(${index})" id="faq-btn-${index}" aria-expanded="false" aria-controls="faq-answer-${index}" class="w-full p-5 text-left flex items-center justify-between gap-4 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors focus:ring-2 focus:ring-emerald-600">
        <span class="font-bold text-sm lg:text-base text-slate-900 dark:text-white font-display">${faq.q}</span>
        <i data-lucide="chevron-down" id="faq-icon-${index}" class="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 transition-transform duration-300" aria-hidden="true"></i>
      </button>
      <div id="faq-answer-${index}" role="region" aria-labelledby="faq-btn-${index}" class="px-5 pb-5 text-xs lg:text-sm text-slate-700 dark:text-slate-300 leading-relaxed hidden">
        ${faq.a}
      </div>
    </div>
  `).join('');
}

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
   9. 3D Tilt Cards (Optimized: Cached Rects, Zero Layout Thrashing)
   ========================================================================== */
function initTiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile for 100% speed

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
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      rect = null;
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }, { passive: true });
  });
}

/* ==========================================================================
   10. Typewriter Headline Loop
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
   11. Contact Form & Toast Feedback
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
      showToast("Thank you! Your enquiry has been received. Dhruv & Amisha will get back to you shortly.");
      form.reset();

      const mailtoLink = `mailto:Dhruv.sahani.work@gmail.com?subject=New Project Request from ${encodeURIComponent(name)} - ${encodeURIComponent(service)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
      window.open(mailtoLink, "_blank");
    }, 600);
  });
}

function showToast(msg) {
  const toast = document.getElementById("feedback-toast");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.innerText = msg;
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0");
  }, 4500);
}

/* ==========================================================================
   12. Mobile Navigation Drawer
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
   13. Lightweight Custom Magnetic Cursor
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

  let rafId = null;
  function renderFollower() {
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    rafId = requestAnimationFrame(renderFollower);
  }
  renderFollower();
}

/* ==========================================================================
   14. Scrollspy Navigation
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