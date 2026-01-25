const sections = [
  document.querySelector("#about"),
  document.querySelector("#education"),
  document.querySelector("#hobbies"),

  
].filter(Boolean);

const heroTitleEl = document.querySelector(".hero-title");

if (heroTitleEl) {
  const text = "IT Student & Future Front-End Developer";
  let index = 0;
  let isDeleting = false;

  const typeSpeed = 70;
  const deleteSpeed = 45;
  const pauseAfterType = 1200;
  const pauseAfterDelete = 500;

  function tick() {
    heroTitleEl.textContent = text.substring(0, index);

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting) {
      if (index < text.length) {
        index++;
      } else {
        isDeleting = true;
        delay = pauseAfterType;
      }
    } else {
      if (index > 0) {
        index--;
      } else {
        isDeleting = false;
        delay = pauseAfterDelete;
      }
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 600);
}


const navLinks = document.querySelectorAll(".nav-link");
const toTopBtn = document.querySelector(".to-top");

sections.forEach(sec => sec.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

sections.forEach(sec => revealObserver.observe(sec));

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navLinks.forEach(a => a.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(sec => spyObserver.observe(sec));

window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hero-title");
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = "";
  el.classList.add("typing");

  let i = 0;
  const speed = 60;

  function typeOnce() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeOnce, speed);
    } else {
      el.classList.remove("typing");
      el.classList.add("done");
    }
  }

  setTimeout(typeOnce, 400);
});



toTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const hero = document.querySelector(".hero");
const bigFill = document.querySelector(".big-name--fill");
const bigStroke = document.querySelector(".big-name--stroke");
const portrait = document.querySelector(".portrait");

if (hero && bigFill && bigStroke && portrait) {
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; 
    const y = (e.clientY - r.top) / r.height - 0.5;

    bigFill.style.transform = `translate(-50%, -50%) translate(${x * 10}px, ${y * 6}px)`;
    bigStroke.style.transform = `translate(-50%, -50%) translate(${x * -8}px, ${y * -5}px)`;
    portrait.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    bigFill.style.transform = "translate(-50%, -50%)";
    bigStroke.style.transform = "translate(-50%, -50%)";
    portrait.style.transform = "translate(0, 0)";
  });
}
