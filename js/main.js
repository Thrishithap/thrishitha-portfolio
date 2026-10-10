// ============================================================
// CUSTOM CURSOR
// ============================================================

const dot = document.querySelector(".cursor-dot");
const aura = document.querySelector(".cursor-aura");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let auraX = mouseX;
let auraY = mouseY;


document.addEventListener("mousemove", (event) => {

  mouseX = event.clientX;
  mouseY = event.clientY;

  if (dot) {
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }

});


function cursorLoop() {

  auraX += (mouseX - auraX) * 0.14;
  auraY += (mouseY - auraY) * 0.14;

  if (aura) {
    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;
  }

  requestAnimationFrame(cursorLoop);
}

cursorLoop();


// ============================================================
// CURSOR HOVER EFFECT
// ============================================================

document
  .querySelectorAll(
    "a, .glass-card, .project-card, .tech-pill, .button, .button-project, .filter-btn, .hobby-tag, .cute-stat-card, .about-polaroid-card, .cute-status-pill, .polaroid-sub-pill, .pillar-item, .skill-bento-card, .skill-filter-btn, .skill-chip, .marquee-item, .exp-track-card, .exp-track-node, .exp-duration-tag, .copy-email-btn, .send-letter-btn, .cute-social-chip, .c-sticker, .cute-avail-pill, .scroll-cue, .carousel-arrow-btn, .s-dot, .p-dot"
  )
  .forEach((element) => {

    element.addEventListener("mouseenter", () => {

      aura?.classList.add("hover");

    });


    element.addEventListener("mouseleave", () => {

      aura?.classList.remove("hover");

    });

  });


// ============================================================
// SCROLL REVEAL
// ============================================================

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    observer.observe(element);

  });


// ============================================================
// ROTATING HERO TEXT
// ============================================================

const roleWord =
  document.getElementById("roleWord");


const roles = [
  "scalable backends",
  "clean APIs",
  "AI-powered systems",
  "useful products"
];


let roleIndex = 0;


setInterval(() => {

  if (!roleWord) return;


  roleWord.style.opacity = "0";


  setTimeout(() => {

    roleIndex =
      (roleIndex + 1) % roles.length;

    roleWord.textContent =
      roles[roleIndex];

    roleWord.style.opacity = "1";

  }, 220);

}, 2300);


// ============================================================
// MAGNETIC BUTTONS
// ============================================================

document
  .querySelectorAll(".magnetic")
  .forEach((element) => {

    element.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          (rect.left + rect.width / 2);

        const y =
          event.clientY -
          (rect.top + rect.height / 2);


        element.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform = "";

      }
    );

  });


// ============================================================
// FLOATING BOW PARALLAX
// ============================================================

const bows =
  document.querySelectorAll(".bow");


window.addEventListener("scroll", () => {

  const scrollY =
    window.scrollY;


  bows.forEach((bow, index) => {

    const speed =
      0.015 + (index % 4) * 0.006;

    bow.style.marginTop =
      `${scrollY * speed}px`;

  });

});


// ============================================================
// 3D TILT ON CARDS
// ============================================================

document
  .querySelectorAll(".glass-card")
  .forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;


        const rotateX =
          (y - centerY) / 20;

        const rotateY =
          (centerX - x) / 20;


        card.style.transform =
          `perspective(700px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


// ============================================================
// CONTINUOUS SMOOTH SCROLLING & ACTIVE NAV (SCROLL-SPY)
// ============================================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
let isClickScrolling = false;
let clickScrollTimer = null;

function setActiveNavLink(targetId) {
  if (!targetId) return;
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${targetId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 1. Smooth scroll with navbar offset and immediate active state on click
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetHref = link.getAttribute("href");
    if (!targetHref || !targetHref.startsWith("#")) return;

    const targetSection = document.querySelector(targetHref);
    if (targetSection) {
      e.preventDefault();
      const targetId = targetHref.substring(1);

      // Immediately highlight clicked link
      setActiveNavLink(targetId);

      // Prevent scroll-spy from overriding while smooth scroll animates
      isClickScrolling = true;
      clearTimeout(clickScrollTimer);

      const navHeight = 70;
      const elementTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = Math.max(0, elementTop - navHeight);

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      // Update URL hash
      if (history.pushState) {
        history.pushState(null, null, targetHref);
      }

      // Resume scroll-spy after smooth scroll finishes
      clickScrollTimer = setTimeout(() => {
        isClickScrolling = false;
        updateScrollSpy();
      }, 850);
    }
  });
});

// 2. Viewport-based Scroll-Spy (works seamlessly for tall sections like Projects & Skills)
function updateScrollSpy() {
  if (isClickScrolling) return;

  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // If near bottom of the page, activate Contact
  if (scrollY + windowHeight >= docHeight - 60) {
    setActiveNavLink("contact");
    return;
  }

  // 140px offset accounts for fixed navbar + natural reading view
  const scrollPosition = scrollY + 140;
  let currentSectionId = "home";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentSectionId = section.getAttribute("id");
    }
  });

  setActiveNavLink(currentSectionId);
}

// RequestAnimationFrame throttled scroll event for 60fps performance
let isScrollTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!isScrollTicking) {
      requestAnimationFrame(() => {
        updateScrollSpy();
        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  },
  { passive: true }
);

// Initial call to set active link on load
updateScrollSpy();

const logoLink = document.querySelector(".logo");
if (logoLink) {
  logoLink.addEventListener("click", () => {
    setActiveNavLink("home");
  });
}


// ============================================================
// BOW MOUSE INTERACTION
// ============================================================

document.addEventListener(
  "mousemove",
  (event) => {

    const x =
      event.clientX / window.innerWidth - 0.5;

    const y =
      event.clientY / window.innerHeight - 0.5;


    bows.forEach((bow, index) => {

      const movement =
        (index % 5 + 1) * 4;


      bow.style.marginLeft =
        `${x * movement}px`;

      bow.style.marginTop =
        `${y * movement}px`;

    });

  }
);


// ============================================================
// REDUCED MOTION
// ============================================================

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


if (reducedMotion.matches) {

  document
    .querySelectorAll("*")
    .forEach((element) => {

      element.style.animationDuration =
        "0.001ms";

      element.style.transitionDuration =
        "0.001ms";

    });

}


// ============================================================
// PROJECT CARDS SPOTLIGHT & CATEGORY FILTERS
// ============================================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// ============================================================
// PROJECTS CAROUSEL CONTROLLER (ONE CARD PER SCROLL)
// ============================================================

const projectsTrack = document.getElementById("projectsCarouselTrack");
const projectsPrevBtn = document.getElementById("projectsPrevBtn");
const projectsNextBtn = document.getElementById("projectsNextBtn");
const projectDots = document.querySelectorAll(".p-dot");
const projectActiveIdx = document.getElementById("projectActiveIdx");
const projectFilterButtons = document.querySelectorAll(".filter-btn");

let currentProjectIdx = 0;
const totalProjectSlides = 3;

function getProjectCardWidth() {
  if (!projectsTrack) return 600;
  const firstProject = projectsTrack.querySelector(".project-card");
  if (!firstProject) return projectsTrack.clientWidth;
  return firstProject.offsetWidth + 32;
}

function updateProjectsCarouselState() {
  if (!projectsTrack) return;
  const cardWidth = getProjectCardWidth();
  const currentIdx = Math.min(
    totalProjectSlides - 1,
    Math.max(0, Math.round(projectsTrack.scrollLeft / cardWidth))
  );
  currentProjectIdx = currentIdx;

  // Update active dot
  projectDots.forEach((dot, idx) => {
    if (idx === currentIdx) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Update active counter badge
  if (projectActiveIdx) {
    projectActiveIdx.textContent = String(currentIdx + 1).padStart(2, "0");
  }

  // Update category filter button active state to match current slide
  const activeSlide = projectsTrack.querySelector(`.project-card[data-card-idx="${currentIdx}"]`);
  if (activeSlide) {
    const cardCategory = activeSlide.getAttribute("data-category");
    projectFilterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute("data-filter");
      if (btnFilter === cardCategory || (btnFilter === "all" && currentIdx === 0)) {
        btn.classList.add("active");
      } else if (btnFilter !== "all") {
        btn.classList.remove("active");
      }
    });
  }
}

function goToProjectSlide(slideIdx, smooth = true) {
  if (!projectsTrack) return;
  const targetIdx = (slideIdx + totalProjectSlides) % totalProjectSlides;
  currentProjectIdx = targetIdx;
  const targetCard = projectsTrack.querySelector(`.project-card[data-card-idx="${targetIdx}"]`);
  if (targetCard) {
    const targetLeft = targetCard.offsetLeft - projectsTrack.offsetLeft;
    projectsTrack.scrollTo({
      left: targetLeft,
      behavior: smooth ? "smooth" : "auto"
    });
  }
}

if (projectsTrack) {
  // Arrow navigation: exactly 1 card per click
  if (projectsNextBtn) {
    projectsNextBtn.addEventListener("click", () => {
      goToProjectSlide(currentProjectIdx + 1, true);
      if (isProjectHovered) {
        stopProjectAutoScroll();
        startProjectAutoScroll();
      }
    });
  }

  if (projectsPrevBtn) {
    projectsPrevBtn.addEventListener("click", () => {
      goToProjectSlide(currentProjectIdx - 1, true);
      if (isProjectHovered) {
        stopProjectAutoScroll();
        startProjectAutoScroll();
      }
    });
  }

  // Dots navigation: direct to target card
  projectDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIdx = parseInt(dot.getAttribute("data-slide"), 10) || 0;
      goToProjectSlide(slideIdx, true);
      if (isProjectHovered) {
        stopProjectAutoScroll();
        startProjectAutoScroll();
      }
    });
  });

  // Scroll listener to sync active indicators
  let isProjectsTicking = false;
  projectsTrack.addEventListener(
    "scroll",
    () => {
      if (!isProjectsTicking) {
        requestAnimationFrame(() => {
          updateProjectsCarouselState();
          isProjectsTicking = false;
        });
        isProjectsTicking = true;
      }
    },
    { passive: true }
  );

  // Mouse drag to scroll with snap alignment
  let isPDown = false;
  let startPX = 0;
  let scrollPLeft = 0;

  projectsTrack.addEventListener("mousedown", (e) => {
    isPDown = true;
    startPX = e.pageX - projectsTrack.offsetLeft;
    scrollPLeft = projectsTrack.scrollLeft;
    stopProjectAutoScroll();
  });

  projectsTrack.addEventListener("mouseleave", () => {
    isPDown = false;
    stopProjectAutoScroll();
  });

  projectsTrack.addEventListener("mouseup", () => {
    isPDown = false;
    // Snap to nearest card upon releasing drag
    const cardWidth = getProjectCardWidth();
    const nearestIdx = Math.min(
      totalProjectSlides - 1,
      Math.max(0, Math.round(projectsTrack.scrollLeft / cardWidth))
    );
    goToProjectSlide(nearestIdx, true);

    if (isProjectHovered) {
      startProjectAutoScroll();
    }
  });

  projectsTrack.addEventListener("mousemove", (e) => {
    if (!isPDown) return;
    e.preventDefault();
    const x = e.pageX - projectsTrack.offsetLeft;
    const walk = (x - startPX) * 1.5;
    projectsTrack.scrollLeft = scrollPLeft - walk;
  });

  // ============================================================
  // AUTO-SCROLL ONLY WHEN CURSOR IS ON PROJECT CARDS (1 CARD PER SCROLL)
  // ============================================================
  let projectAutoScrollInterval = null;
  let projectInitialAutoTimer = null;
  let isProjectHovered = false;

  function advanceProjectSlide() {
    if (!projectsTrack || isPDown) return;
    goToProjectSlide(currentProjectIdx + 1, true);
  }

  function startProjectAutoScroll() {
    stopProjectAutoScroll();
    isProjectHovered = true;

    // Begin first slide transition after 900ms of hovering, then advance 1 card every 2800ms
    projectInitialAutoTimer = setTimeout(() => {
      if (!isProjectHovered || isPDown) return;
      advanceProjectSlide();

      projectAutoScrollInterval = setInterval(() => {
        if (!isProjectHovered || isPDown) return;
        advanceProjectSlide();
      }, 2800);
    }, 900);
  }

  function stopProjectAutoScroll() {
    isProjectHovered = false;
    if (projectInitialAutoTimer) {
      clearTimeout(projectInitialAutoTimer);
      projectInitialAutoTimer = null;
    }
    if (projectAutoScrollInterval) {
      clearInterval(projectAutoScrollInterval);
      projectAutoScrollInterval = null;
    }
  }

  // Start auto-scroll ONLY when cursor enters project cards/track
  projectsTrack.addEventListener("mouseenter", startProjectAutoScroll);
  projectsTrack.addEventListener("mouseleave", stopProjectAutoScroll);

  // Pause auto-scroll when interacting directly with links or buttons inside cards
  const projectInteractiveEls = projectsTrack.querySelectorAll("a, button");
  projectInteractiveEls.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (projectInitialAutoTimer) clearTimeout(projectInitialAutoTimer);
      if (projectAutoScrollInterval) clearInterval(projectAutoScrollInterval);
    });
    el.addEventListener("mouseleave", () => {
      if (isProjectHovered) {
        startProjectAutoScroll();
      }
    });
  });
}

// Category Filter Tab integration (scrolls to matching single card)
projectFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    projectFilterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-filter");
    if (!projectsTrack) return;

    if (category === "all") {
      goToProjectSlide(0, true);
    } else {
      const matchingCard = projectsTrack.querySelector(`.project-card[data-category="${category}"]`);
      if (matchingCard) {
        const idx = parseInt(matchingCard.getAttribute("data-card-idx"), 10) || 0;
        goToProjectSlide(idx, true);
      }
    }
  });
});


// ============================================================
// ANIMATED COUNTERS FOR ABOUT STATS
// ============================================================

const statCounters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetVal = parseFloat(counter.getAttribute("data-target"));
        const decimals = parseInt(counter.getAttribute("data-decimals") || "0");
        const suffix = counter.getAttribute("data-suffix") || "";
        const duration = 1800;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetVal * easeOut;

          counter.textContent = `${currentVal.toFixed(decimals)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = `${targetVal.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateCount);
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.25 }
);

statCounters.forEach((counter) => {
  counterObserver.observe(counter);
});


// ============================================================
// CUTE POLAROID STICKER CLICK SPARKLE BURST
// ============================================================

const polaroid = document.querySelector(".about-polaroid-card");

if (polaroid) {
  const sparkIcons = [
    '<i class="fa-solid fa-wand-magic-sparkles" style="color: var(--pink)"></i>',
    '<i class="fa-solid fa-star" style="color: #facc15"></i>',
    '<i class="fa-solid fa-heart" style="color: #ff5c9a"></i>',
    '<i class="fa-solid fa-spa" style="color: #ff9fc2"></i>',
    '<i class="fa-solid fa-bolt" style="color: #ffd166"></i>'
  ];

  polaroid.addEventListener("click", (event) => {
    const rect = polaroid.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    for (let i = 0; i < 6; i++) {
      const spark = document.createElement("span");
      spark.innerHTML = sparkIcons[Math.floor(Math.random() * sparkIcons.length)];
      spark.style.position = "absolute";
      spark.style.left = `${clickX}px`;
      spark.style.top = `${clickY}px`;
      spark.style.fontSize = `${1.2 + Math.random() * 0.8}rem`;
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "100";
      spark.style.userSelect = "none";
      spark.style.transition = "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease";

      const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 50;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance - 30;

      polaroid.appendChild(spark);

      requestAnimationFrame(() => {
        spark.style.transform = `translate(${destX}px, ${destY}px) scale(1.3) rotate(${Math.random() * 40 - 20}deg)`;
        spark.style.opacity = "0";
      });

      setTimeout(() => {
        spark.remove();
      }, 900);
    }
  });
}


// ============================================================
// SKILLS BENTO CARDS SPOTLIGHT & 3D TILT EFFECT
// ============================================================

const skillCards = document.querySelectorAll(".skill-bento-card");

skillCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Dynamic 3D perspective tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// ============================================================
// SKILLS CAROUSEL CONTROLLER & FILTERING
// ============================================================

const skillsTrack = document.getElementById("skillsCarouselTrack");
const skillsPrevBtn = document.getElementById("skillsPrevBtn");
const skillsNextBtn = document.getElementById("skillsNextBtn");
const skillsDots = document.querySelectorAll(".s-dot");
const carouselActiveIdx = document.getElementById("carouselActiveIdx");

function getActiveSkillCardIndex() {
  if (!skillsTrack || skillCards.length === 0) return 0;
  const trackScrollLeft = skillsTrack.scrollLeft;
  const maxScroll = skillsTrack.scrollWidth - skillsTrack.clientWidth;

  // Edge cases: start or end
  if (trackScrollLeft <= 15) return 0;
  if (trackScrollLeft >= maxScroll - 15) return skillCards.length - 1;

  const trackOffsetLeft = skillsTrack.offsetLeft;
  let closestIdx = 0;
  let minDiff = Infinity;

  skillCards.forEach((card, idx) => {
    const cardLeft = card.offsetLeft - trackOffsetLeft;
    const diff = Math.abs(cardLeft - trackScrollLeft);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = idx;
    }
  });

  return closestIdx;
}

function updateSkillsCarouselState() {
  if (!skillsTrack || skillCards.length === 0) return;
  const currentIdx = getActiveSkillCardIndex();

  // 1. Update active dot
  skillsDots.forEach((dot, idx) => {
    if (idx === currentIdx) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // 2. Update active counter badge
  if (carouselActiveIdx) {
    carouselActiveIdx.textContent = String(currentIdx + 1).padStart(2, "0");
  }

  // 3. Highlight the scrolled card (both scrolling left or right) & un-dim
  skillCards.forEach((card, idx) => {
    if (idx === currentIdx) {
      card.classList.add("is-highlighted");
      card.classList.remove("is-dimmed");
    } else {
      card.classList.remove("is-highlighted");
      card.classList.remove("is-dimmed");
    }
  });

  // 4. Synchronize category filter buttons with the scrolled card
  skillFilterBtns.forEach((btn) => {
    btn.classList.add("active");
  });
}

if (skillsTrack) {
  // Arrow buttons: smooth step left or right
  if (skillsNextBtn) {
    skillsNextBtn.addEventListener("click", () => {
      const currentIdx = getActiveSkillCardIndex();
      const nextIdx = (currentIdx + 1) % skillCards.length;
      const targetCard = skillCards[nextIdx];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    });
  }

  if (skillsPrevBtn) {
    skillsPrevBtn.addEventListener("click", () => {
      const currentIdx = getActiveSkillCardIndex();
      const prevIdx = (currentIdx - 1 + skillCards.length) % skillCards.length;
      const targetCard = skillCards[prevIdx];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    });
  }

  // Dots navigation
  skillsDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIdx = parseInt(dot.getAttribute("data-slide"), 10) || 0;
      const targetCard = skillCards[slideIdx];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    });
  });

  // Scroll listener to update highlighted card, dots, and filter tab
  let isCarouselTicking = false;
  skillsTrack.addEventListener(
    "scroll",
    () => {
      if (!isCarouselTicking) {
        requestAnimationFrame(() => {
          updateSkillsCarouselState();
          isCarouselTicking = false;
        });
        isCarouselTicking = true;
      }
    },
    { passive: true }
  );

  // Mouse drag to scroll
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  skillsTrack.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - skillsTrack.offsetLeft;
    scrollLeft = skillsTrack.scrollLeft;
  });

  skillsTrack.addEventListener("mouseleave", () => {
    isDown = false;
  });

  skillsTrack.addEventListener("mouseup", () => {
    isDown = false;
    updateSkillsCarouselState();
  });

  skillsTrack.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - skillsTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    skillsTrack.scrollLeft = scrollLeft - walk;
  });

  // Initial call to highlight first skill card on load
  updateSkillsCarouselState();
}

// Category Filter Bar Integration
const skillFilterBtns = document.querySelectorAll(".skill-filter-btn");

skillFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-skill-filter");

    // Toggle active button state
    skillFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (filter === "all") {
      if (skillsTrack) {
        skillsTrack.scrollTo({ left: 0, behavior: "smooth" });
      }
      setTimeout(() => updateSkillsCarouselState(), 350);
    } else {
      const targetCard = document.querySelector(`.skill-bento-card[data-skill-cat="${filter}"]`);
      if (targetCard && skillsTrack) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        setTimeout(() => updateSkillsCarouselState(), 350);
      }
    }
  });
});


// ============================================================
// INTERACTIVE SKILL CHIP MICRO-BURST EFFECT
// ============================================================

const skillChips = document.querySelectorAll(".skill-chip");

skillChips.forEach((chip) => {
  chip.addEventListener("click", (e) => {
    const chipRect = chip.getBoundingClientRect();
    const clickX = e.clientX - chipRect.left;
    const clickY = e.clientY - chipRect.top;

    const burst = document.createElement("span");
    burst.style.position = "absolute";
    burst.style.left = `${clickX}px`;
    burst.style.top = `${clickY}px`;
    burst.style.width = "6px";
    burst.style.height = "6px";
    burst.style.borderRadius = "50%";
    burst.style.background = "#fff";
    burst.style.boxShadow = "0 0 14px 6px rgba(255, 255, 255, 0.8), 0 0 24px 10px rgba(141, 108, 255, 0.6)";
    burst.style.pointerEvents = "none";
    burst.style.transform = "translate(-50%, -50%) scale(1)";
    burst.style.transition = "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease";
    burst.style.zIndex = "10";

    chip.style.position = "relative";
    chip.appendChild(burst);

    requestAnimationFrame(() => {
      burst.style.transform = "translate(-50%, -50%) scale(7)";
      burst.style.opacity = "0";
    });

    setTimeout(() => burst.remove(), 700);
  });
});


// ============================================================
// MARQUEE ITEM INTERACTION -> HIGHLIGHT CORRESPONDING BENTO CARD
// ============================================================

const marqueeItems = document.querySelectorAll(".marquee-item");

marqueeItems.forEach((item) => {
  item.style.cursor = "pointer";
  item.title = "Click to view domain category";

  item.addEventListener("click", () => {
    const text = item.textContent.toLowerCase();
    let targetCat = "all";

    if (
      text.includes("java") ||
      text.includes("python") ||
      text.includes("javascript") ||
      text.includes("dsa") ||
      text.includes("data structures") ||
      text.includes("oop") ||
      text.includes("operating") ||
      text.includes("network")
    ) {
      targetCat = "core";
    } else if (
      text.includes("node") ||
      text.includes("express") ||
      text.includes("rest") ||
      text.includes("graphql") ||
      text.includes("mongo") ||
      text.includes("dbms") ||
      text.includes("jwt")
    ) {
      targetCat = "backend";
    } else if (
      text.includes("machine learning") ||
      text.includes("deep learning") ||
      text.includes("scikit") ||
      text.includes("numpy") ||
      text.includes("pandas")
    ) {
      targetCat = "ml";
    } else if (
      text.includes("git") ||
      text.includes("bruno") ||
      text.includes("latex")
    ) {
      targetCat = "tools";
    } else if (
      text.includes("communication") ||
      text.includes("teamwork") ||
      text.includes("leadership") ||
      text.includes("problem solving") ||
      text.includes("time management")
    ) {
      targetCat = "soft";
    }

    if (targetCat !== "all") {
      const targetCard = document.querySelector(`.skill-bento-card[data-skill-cat="${targetCat}"]`);
      if (targetCard && skillsTrack) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        setTimeout(() => updateSkillsCarouselState(), 350);
      }
    }
  });
});


// ============================================================
// EXPERIENCE VERTICAL TRACK INTERACTION & HOVER ENGINE
// ============================================================

const expCards = document.querySelectorAll(".exp-card");
const expPins = document.querySelectorAll(".exp-track-pin");

expCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Subtle 3D perspective tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

  // Interactive spark burst on click
  card.addEventListener("click", (e) => {
    // If clicking a link or interactive child, allow default navigation without card spark burst
    if (e.target.closest("a, button, input")) return;

    // Remove active class from all cards
    expCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    
    const rect = card.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const row = card.closest(".exp-timeline-row");
    const accentColor = row?.classList.contains("row-pink")
      ? "#ff5c9a"
      : row?.classList.contains("row-cyan")
      ? "#62e9ff"
      : "#8d6cff";

    // Create sparks
    for (let i = 0; i < 8; i++) {
      const burst = document.createElement("span");
      burst.style.position = "absolute";
      burst.style.left = `${clickX}px`;
      burst.style.top = `${clickY}px`;
      burst.style.width = "5px";
      burst.style.height = "5px";
      burst.style.borderRadius = "50%";
      burst.style.background = i % 2 === 0 ? accentColor : "#ffffff";
      burst.style.boxShadow = `0 0 10px ${burst.style.background}`;
      burst.style.pointerEvents = "none";
      burst.style.transform = "translate(-50%, -50%) scale(1)";
      burst.style.transition = "transform 0.7s cubic-bezier(0.1, 1, 0.1, 1), opacity 0.7s ease-out";
      burst.style.zIndex = "10";

      card.appendChild(burst);

      const angle = (Math.PI * 2 * i) / 8;
      const distance = 50 + Math.random() * 35;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        burst.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        burst.style.opacity = "0";
      });

      setTimeout(() => burst.remove(), 700);
    }
  });
});

// Pin hover sparkle effects
expPins.forEach((pin) => {
  pin.addEventListener("mouseenter", () => {
    const rect = pin.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const row = pin.closest(".exp-timeline-row");
    const accentColor = row?.classList.contains("row-pink")
      ? "#ff5c9a"
      : row?.classList.contains("row-cyan")
      ? "#62e9ff"
      : "#8d6cff";

    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement("span");
      sparkle.style.position = "fixed";
      sparkle.style.left = `${centerX}px`;
      sparkle.style.top = `${centerY}px`;
      sparkle.style.width = "4px";
      sparkle.style.height = "4px";
      sparkle.style.borderRadius = "50%";
      sparkle.style.background = i % 2 === 0 ? accentColor : "#fff";
      sparkle.style.pointerEvents = "none";
      sparkle.style.boxShadow = `0 0 8px ${sparkle.style.background}`;
      sparkle.style.transform = "translate(-50%, -50%) scale(1)";
      sparkle.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      sparkle.style.zIndex = "99";

      document.body.appendChild(sparkle);

      const angle = (Math.PI * 2 * i) / 6;
      const distance = 25 + Math.random() * 15;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        sparkle.style.opacity = "0";
      });

      setTimeout(() => sparkle.remove(), 600);
    }
  });
});

// Remove active state when clicking outside cards
document.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".exp-card");
  if (!clickedCard) {
    expCards.forEach(c => c.classList.remove("active"));
  }
});

// Education card interactive glare
const eduShowcaseCard = document.querySelector(".edu-showcase-card");
if (eduShowcaseCard) {
  eduShowcaseCard.addEventListener("mousemove", (e) => {
    const rect = eduShowcaseCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    eduShowcaseCard.style.setProperty("--mouse-x", `${x}px`);
    eduShowcaseCard.style.setProperty("--mouse-y", `${y}px`);
  });
}


// ============================================================
// CUTE STATIONERY CARD & CONTACT INTERACTIONS
// ============================================================

// 1. Copy Email to Clipboard - Delegated to rock-solid window.copyEmailAddress
const copyEmailBtn = document.getElementById("copyEmailBtn");
const copyToast = document.getElementById("copyToast");

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", (e) => {
    if (typeof window.copyEmailAddress === "function") {
      window.copyEmailAddress(e);
    }
  });
}

// 2. 3D Perspective Tilt on Contact Stationery Card
const contactCard = document.querySelector(".contact-stationery-card");
if (contactCard) {
  contactCard.addEventListener("mousemove", (e) => {
    const rect = contactCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    contactCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  });

  contactCard.addEventListener("mouseleave", () => {
    contactCard.style.transform = "";
  });
}

// 3. Playful Click Interaction on Floating Cute Stickers
const cuteStickers = document.querySelectorAll(".c-sticker");
cuteStickers.forEach((sticker) => {
  sticker.addEventListener("click", (e) => {
    // Pop animation on the sticker itself
    sticker.style.transform = "scale(1.8) rotate(360deg)";
    sticker.style.filter = "drop-shadow(0 0 25px rgba(255, 92, 154, 1))";

    // Create a mini burst of heart / sparkle particles
    const rect = sticker.getBoundingClientRect();
    const burstIcons = [
      '<i class="fa-solid fa-heart" style="color: #ff5c9a"></i>',
      '<i class="fa-solid fa-star" style="color: #facc15"></i>',
      '<i class="fa-solid fa-spa" style="color: #ff9fc2"></i>',
      '<i class="fa-solid fa-wand-magic-sparkles" style="color: var(--pink)"></i>'
    ];
    for (let i = 0; i < 5; i++) {
      const p = document.createElement("span");
      p.innerHTML = burstIcons[i % burstIcons.length];
      p.style.position = "fixed";
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top + rect.height / 2}px`;
      p.style.fontSize = "1.2rem";
      p.style.pointerEvents = "none";
      p.style.zIndex = "9999";
      p.style.transition = "all 0.7s cubic-bezier(0.2, 0.9, 0.3, 1)";
      document.body.appendChild(p);

      const angle = (i / 5) * Math.PI * 2;
      const dist = 45 + Math.random() * 30;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      requestAnimationFrame(() => {
        p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        p.style.opacity = "0";
      });

      setTimeout(() => p.remove(), 750);
    }

    setTimeout(() => {
      sticker.style.transform = "";
      sticker.style.filter = "";
    }, 600);
  });
});