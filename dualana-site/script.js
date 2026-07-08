const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 30);
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
