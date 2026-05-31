// --- ULTIMATE FAILSAFE ---
// Paksa semua section muncul jika ada error kritis agar layar tidak blank
window.addEventListener("error", function(e) {
    console.error("Failsafe Aktif: ", e.message);
    document.querySelectorAll('.reveal, .reveal-staggered').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    document.body.classList.remove('content-locked');
});

// --- SISTEM BAHASA TRANSLASI ---
const translations = {
  en: {
    nav_about: "About", nav_contact: "Contact", hero_title: "Festival Of Agroindustry", foa_heading: "What is FoA?",
    foa_subheading: "Festival Of Agroindustry 2026",
    foa_p1: "The Festival of Agroindustry (FOA) is an annual program organized by HIMALOGIN, designed as an international platform to advance sustainable agroindustrial development and national food security. Through seminars, innovation expos, and competitions, FOA directly addresses persistent challenges facing Indonesia's agroindustry sector, including inefficiencies across production, processing, and distribution systems.",
    foa_p2: "Beyond a ceremonial event, FOA serves as a catalyst for transformation by bringing together fresh ideas, innovative solutions, and academically driven forums aimed at improving efficiency, productivity, and the overall competitiveness of agroindustry. Ultimately, FOA represents a collective movement toward a self-sufficient, competitive Indonesian agroindustry that contributes meaningfully to national development.",
    cat_heading: "Competition Categories",
    cat_nsac_desc: "A national competition within FOA targeted at high school students across Indonesia. Structured across four progressive stages from preliminary to grand final, NSAC challenges participants in conceptual understanding, analytical thinking, and practical skills in agroindustry.",
    cat_nac_desc: "A national competition within FOA for university students to present critical and creative solutions in agroindustry. It consists of three sub-competitions: Business Case Competition, Essay Competition, and Infographic Competition.",
    cat_iac_desc: "An international competition within FOA for university students, featuring two categories: Essay Competition, which requires abstract and full paper submission before presentation, and Idea Pitch Competition, where selected participants pitch their innovation directly at the final stage with a digital or physical prototype.",
    ben_heading: "Participant Benefits", ben_1_title: "Pengenalan Jurusan", ben_1_desc: "Introduction to the Department of Agroindustrial Technology IPB",
    ben_2_title: "Expo Agroindustri", ben_2_desc: "Knowledge about sustainable agroindustry through the Expo", ben_3_title: "Seminar Nasional",
    ben_3_desc: "National Agroindustry Seminar", ben_4_title: "Hadiah Jutaan Rupiah", ben_4_desc: "Millions of rupiah in prizes",
    ben_5_title: "Golden Ticket", ben_5_desc: "Golden Ticket to TIN IPB", time_heading: "Competition Timeline", footer_social: "Follow our social media",
  },
  id: {
    nav_about: "Tentang", nav_contact: "Kontak", hero_title: "Festival Of Agroindustry", foa_heading: "Apa itu FoA?",
    foa_subheading: "Festival Of Agroindustry 2026",
    foa_p1: "Festival Of Agroindustry adalah kompetisi gaming arcade terbesar yang menampilkan berbagai kategori permainan klasik. Kami menghadirkan pengalaman gaming yang tak terlupakan dengan atmosfer retro yang autentik.",
    foa_p2: "Setiap peserta berkesempatan untuk menunjukkan skill mereka, bersaing dengan pemain terbaik, dan meraih penghargaan bergengsi.",
    cat_heading: "Kategori Lomba",
    cat_nsac_desc: "Kompetisi tingkat nasional dalam FOA yang ditargetkan untuk siswa SMA/sederajat di seluruh Indonesia. Terstruktur dalam empat tahap progresif dari babak penyisihan hingga grand final, NSAC menantang peserta dalam pemahaman konseptual, pemikiran analitis, dan keterampilan praktis di bidang agroindustri.",
    cat_nac_desc: "Kompetisi nasional dalam FOA bagi mahasiswa untuk menyajikan solusi kritis dan kreatif di bidang agroindustri. Terdiri dari tiga sub-kompetisi: Business Case Competition, Essay Competition, dan Infographic Competition.",
    cat_iac_desc: "Kompetisi internasional dalam FOA untuk mahasiswa, menampilkan dua kategori: Essay Competition, yang membutuhkan penyerahan abstrak dan makalah lengkap sebelum presentasi, dan Idea Pitch Competition, di mana peserta terpilih mempresentasikan inovasi mereka langsung di tahap akhir dengan prototipe digital atau fisik.",
    ben_heading: "Benefit Peserta", ben_1_title: "Pengenalan Jurusan", ben_1_desc: "Pengenalan mengenai Jurusan Teknik Industri Pertanian IPB",
    ben_2_title: "Expo Agroindustri", ben_2_desc: "Ilmu mengenai agroindustri berkelanjutan melalui Expo", ben_3_title: "Seminar Nasional",
    ben_3_desc: "Seminar Nasional Agroindustri", ben_4_title: "Hadiah Jutaan Rupiah", ben_4_desc: "Hadiah Jutaan rupiah",
    ben_5_title: "Golden Ticket", ben_5_desc: "Golden Ticket masuk TIN IPB", time_heading: "Alur Waktu Kompetisi", footer_social: "Ikuti media sosial kami",
  }
};

// --- LOGIKA GANTI BAHASA ---
let savedLang = localStorage.getItem("foa_lang");
let currentLang = translations[savedLang] ? savedLang : (navigator.language.startsWith("id") ? "id" : "en");

function setLanguage(langCode) {
  if (!translations[langCode]) langCode = "en"; 
  currentLang = langCode;
  localStorage.setItem("foa_lang", currentLang);
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const newText = translations[currentLang][key];
    
    if (newText) {
      const isFoAText = element.closest('.foa-text') !== null;
      const targetSpan = element.querySelector(".typewriter-target");
      
      if (isFoAText && targetSpan) {
        element.setAttribute("data-text", newText);
        if (element.classList.contains("typing-done")) {
          element.innerHTML = `<span style="display: grid;"><span style="grid-area: 1 / 1; visibility: hidden;">${newText}</span><span class="typewriter-target" style="grid-area: 1 / 1;">${newText}</span></span>`;
        }
      } else {
        element.textContent = newText;
      }
    }
  });

  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = currentLang === "id" ? "EN" : "ID";
}

// --- LOGIKA TYPEWRITER ---
function runTypewriter(element, speed = 2) {
  return new Promise(resolve => {
    if (element.classList.contains("typing") || element.classList.contains("typing-done")) { resolve(); return; }
    
    const text = element.getAttribute("data-text"); 
    if (!text) { resolve(); return; } // Failsafe
    
    element.classList.add("typing");
    const target = element.querySelector(".typewriter-target");
    if (!target) { resolve(); return; } // Failsafe
    
    let i = 0;
    function type() {
      if (!element.classList.contains("typing")) { resolve(); return; }
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        element.typewriterTimeout = setTimeout(type, speed);
      } else {
        element.classList.remove("typing");
        element.classList.add("typing-done");
        resolve(); 
      }
    }
    type();
  });
}

// --- OBSERVER UNTUK ANIMASI SCROLL ---
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      
      if (entry.target.id === "foa") {
        if (entry.target.dataset.typingFinished === "true") return;
        if (entry.target.dataset.isTyping === "true") return;
        
        entry.target.dataset.isTyping = "true";
        document.body.classList.add("content-locked");

        const textElements = entry.target.querySelectorAll(".foa-text p");
        textElements.forEach(el => {
          if (!el.classList.contains("typing") && !el.classList.contains("typing-done")) {
            const text = el.getAttribute("data-text") || el.textContent.trim();
            if (!el.getAttribute("data-text")) el.setAttribute("data-text", text);
            el.innerHTML = `<span style="display: grid;"><span style="grid-area: 1 / 1; visibility: hidden;">${text}</span><span class="typewriter-target" style="grid-area: 1 / 1;"></span></span>`;
          }
        });

        const typeSequentially = async () => {
          try {
            let fullyCompleted = true;
            for (const el of textElements) {
              if (entry.target.dataset.isTyping !== "true") { fullyCompleted = false; break; }
              await runTypewriter(el);
            }
            if (fullyCompleted && entry.target.dataset.isTyping === "true") {
              entry.target.dataset.typingFinished = "true";
              entry.target.dataset.isTyping = "false";
              document.body.classList.remove("content-locked");
            }
          } catch (error) {
            console.error("Typewriter Error:", error);
            document.body.classList.remove("content-locked"); // Failsafe
          }
        };
        typeSequentially();
      }
    } else {
      entry.target.classList.remove("revealed");
      if (entry.target.id === "foa") {
        if (entry.target.dataset.typingFinished === "true") return;
        entry.target.dataset.isTyping = "false"; 
        document.body.classList.remove("content-locked");

        const textElements = entry.target.querySelectorAll(".foa-text p");
        textElements.forEach(el => {
           if (el.typewriterTimeout) clearTimeout(el.typewriterTimeout);
           el.classList.remove("typing", "typing-done");
           if (el.getAttribute("data-text")) {
               const text = el.getAttribute("data-text");
               el.innerHTML = `<span style="display: grid;"><span style="grid-area: 1 / 1; visibility: hidden;">${text}</span><span class="typewriter-target" style="grid-area: 1 / 1;"></span></span>`;
           }
        });
      }
    }
  });
}, observerOptions);


// --- INIT & EVENT LISTENERS UMUM ---
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const targetLang = currentLang === "id" ? "en" : "id";
      setLanguage(targetLang);
    });
  }
  
  document.querySelectorAll(".reveal, .reveal-staggered").forEach((el) => {
    revealObserver.observe(el);
  });

  const contactDropdownBtn = document.getElementById("contactDropdownBtn");
  const contactItemTarget = contactDropdownBtn?.closest(".contact-item");
  if (contactDropdownBtn && contactItemTarget) {
    contactDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      contactItemTarget.classList.toggle("dropdown-active");
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".contact-info-wrapper") && !e.target.closest("#contactDropdownBtn")) {
        contactItemTarget.classList.remove("dropdown-active");
      }
    });
  }
});

function toggleCategoryText(headerElement) {
  const descBox = headerElement.nextElementSibling;
  if (descBox) descBox.classList.toggle("active");
}

const navbar = document.querySelector("nav");
if (navbar) {
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const foaSection = document.getElementById("foa");
    if (foaSection && scrollTop >= foaSection.offsetTop - 100) navbar.classList.add("nav-hidden");
    else navbar.classList.remove("nav-hidden");
  });
}

document.getElementById("aboutBtn")?.addEventListener("click", () => document.getElementById("foa")?.scrollIntoView({ behavior: "smooth" }));
document.getElementById("contactBtn")?.addEventListener("click", () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }));

const foaSlider = document.getElementById("foaSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
if (foaSlider && prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    const scrollAmount = foaSlider.clientWidth;
    if (foaSlider.scrollLeft <= 0) foaSlider.scrollTo({ left: foaSlider.scrollWidth, behavior: "smooth" });
    else foaSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    const scrollAmount = foaSlider.clientWidth;
    if (Math.ceil(foaSlider.scrollLeft + foaSlider.clientWidth) >= foaSlider.scrollWidth - 5) foaSlider.scrollTo({ left: 0, behavior: "smooth" });
    else foaSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

// --- LOGIKA TIMELINE ---
let animationTimeouts = [];
document.querySelectorAll(".timeline-tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const tabName = this.getAttribute("data-tab");
    document.querySelectorAll(".timeline-tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".timeline-content").forEach((c) => c.classList.remove("active"));
    
    this.classList.add("active");
    const timelineContent = document.getElementById(tabName + "-timeline");
    if (timelineContent) {
      timelineContent.classList.add("active");
      runTimelineAnimation(timelineContent);
    }
  });
});

function runTimelineAnimation(timelineContent) {
  animationTimeouts.forEach((timeout) => clearTimeout(timeout));
  animationTimeouts = [];

  const progressLine = timelineContent.querySelector(".timeline-progress-line");
  const checkpoint = timelineContent.querySelector(".timeline-checkpoint");
  const verticalTimeline = timelineContent.querySelector(".vertical-timeline");
  const items = timelineContent.querySelectorAll(".timeline-item");

  items.forEach((item) => {
    const icon = item.querySelector(".timeline-icon");
    if (icon) icon.classList.remove("glow");
  });

  if (progressLine) { 
    progressLine.style.transition = "none"; progressLine.style.height = "0%"; 
    void progressLine.offsetWidth; 
    progressLine.style.transition = "height 12s linear"; progressLine.style.height = "100%"; 
  }
  if (checkpoint) { 
    checkpoint.style.transition = "none"; checkpoint.style.top = "0%"; 
    void checkpoint.offsetWidth; 
    checkpoint.style.transition = "top 12s linear"; checkpoint.style.top = "100%"; 
  }

  if (!verticalTimeline) return;
  const timelineHeight = verticalTimeline.offsetHeight;
  const totalDuration = 12000; 

  items.forEach((item) => {
    const icon = item.querySelector(".timeline-icon");
    if (!icon) return;

    const iconCenterY = item.offsetTop + 35; 
    let percentage = iconCenterY / timelineHeight;
    
    if (percentage > 1) percentage = 1;
    if (percentage < 0) percentage = 0;

    const triggerTime = percentage * totalDuration;
    const timeoutId = setTimeout(() => { icon.classList.add("glow"); }, triggerTime);
    animationTimeouts.push(timeoutId);
  });
}

const timelineSection = document.getElementById("timeline");
const timelineSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeTimeline = document.querySelector(".timeline-content.active");
      if (activeTimeline) runTimelineAnimation(activeTimeline); 
    }
  });
}, { threshold: 0.3 });

if (timelineSection) timelineSectionObserver.observe(timelineSection);