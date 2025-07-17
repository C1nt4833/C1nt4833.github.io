// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Navigation Buttons - Scroll to section smoothly
    const navButtons = document.querySelectorAll(".nav-btn-3d");
    navButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        navButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const targetId = btn.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          targetSection.focus({ preventScroll: true });
        }
      });
    });
  
    // Hero CTA Button scroll
    const heroCta = document.querySelector(".hero-content .cta-button");
    if (heroCta) {
      heroCta.addEventListener("click", () => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
          aboutSection.focus({ preventScroll: true });
        }
      });
    }
  
    // Accordion functionality
    const accordions = document.querySelectorAll(".accordion-btn");
    accordions.forEach((acc) => {
      acc.addEventListener("click", () => {
        const expanded = acc.getAttribute("aria-expanded") === "true";
        // Close all accordions
        accordions.forEach((a) => {
          a.setAttribute("aria-expanded", "false");
          a.classList.remove("active");
          const content = a.nextElementSibling;
          if (content) {
            content.hidden = true;
            content.classList.remove("show");
          }
        });
        // Open the clicked one if it was closed
        if (!expanded) {
          acc.setAttribute("aria-expanded", "true");
          acc.classList.add("active");
          const content = acc.nextElementSibling;
          if (content) {
            content.hidden = false;
            content.classList.add("show");
          }
        }
      });
    });
  
    // Info navigation quick scroll to accordion items
    const infoLinks = document.querySelectorAll(".info-link");
    infoLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const accId = link.getAttribute("data-acc");
        const accItem = document.getElementById(accId);
        if (accItem) {
          accItem.scrollIntoView({ behavior: "smooth", block: "start" });
          // Open accordion automatically
          const btn = accItem.querySelector(".accordion-btn");
          if (btn) {
            btn.click();
          }
        }
      });
    });
  
    // Back to top button
    const backToTopBtn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // Therapist search filtering (simple frontend filtering)
    const searchInput = document.getElementById("searchName");
    const filterProvince = document.getElementById("filterProvince");
    const filterService = document.getElementById("filterService");
    const therapistList = document.getElementById("therapistList");
  
    function filterTherapists() {
      const searchVal = searchInput.value.toLowerCase();
      const provinceVal = filterProvince.value.toLowerCase();
      const serviceVal = filterService.value.toLowerCase();
  
      const therapists = therapistList.querySelectorAll(".therapist-card");
      therapists.forEach((card) => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const location = card.querySelector(".location").textContent.toLowerCase();
        const specialization = card.querySelector(".specialization").textContent.toLowerCase();
  
        const matchesSearch = name.includes(searchVal) || location.includes(searchVal);
        const matchesProvince = provinceVal === "" || location.includes(provinceVal);
        const matchesService = serviceVal === "" || specialization.includes(serviceVal);
  
        if (matchesSearch && matchesProvince && matchesService) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    }
  
    searchInput.addEventListener("input", filterTherapists);
    filterProvince.addEventListener("change", filterTherapists);
    filterService.addEventListener("change", filterTherapists);
  
    // Forum New Topic Form (dummy submission)
    const newTopicForm = document.getElementById("newTopicForm");
    newTopicForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Terima kasih! Topik diskusi baru Anda telah diposting (simulasi).");
      newTopicForm.reset();
    });
  
    // Consultation form dummy submission
    const consultForm = document.getElementById("consultForm");
    consultForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Konsultasi Anda telah dikirim. Tim kami akan menghubungi Anda segera.");
      consultForm.reset();
    });
  
    // Keyboard navigation for nav buttons for accessibility
    navButtons.forEach((btn) => {
      btn.addEventListener("keyup", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          btn.click();
        }
      });
    });
  
    // Keyboard navigation for accordion buttons
    accordions.forEach((btn) => {
      btn.addEventListener("keyup", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          btn.click();
        }
      });
    });
  });

// script.js - fungsi umum dan interaksi (nanti bisa dikembangkan)

document.addEventListener('DOMContentLoaded', () => {
  // Contoh: Highlight tombol nav aktif (bisa ditambah sesuai halaman)
  const pathname = window.location.pathname;
  const navButtons = document.querySelectorAll('.nav-btn-3d');

  navButtons.forEach(btn => {
    btn.classList.remove('active');
  });

  if (pathname.endsWith('index.html') || pathname === '/') {
    navButtons[0]?.classList.add('active');
  } else if (pathname.endsWith('artikel.html')) {
    navButtons[1]?.classList.add('active');
  } else if (pathname.endsWith('profil.html') || pathname.endsWith('profil-detail.html')) {
    navButtons[2]?.classList.add('active');
  } else if (pathname.endsWith('faq.html')) {
    navButtons[3]?.classList.add('active');
  } else if (pathname.endsWith('forum.html')) {
    navButtons[4]?.classList.add('active');
  }
});

// --- PATCHED SCRIPT ---

// Navigasi hilang saat scroll ke bawah dan muncul hanya saat scroll ke paling atas
const nav = document.querySelector('.luxury-nav');

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop <= 10) {
    // Muncul hanya saat scroll ke atas paling atas
    nav.style.top = "0";
  } else {
    // Hilang saat scroll ke bawah atau berhenti di tengah
    nav.style.top = "-120px";
  }
});





