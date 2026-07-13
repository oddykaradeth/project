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


// ini untuk fullscreen modal

  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalIndex = document.getElementById('modalIndex');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  let lastFocused = null;

  function openModal(card){

    modalImage.src = card.dataset.image;
    modalImage.alt = card.dataset.title;

    modalIndex.textContent = card.dataset.index;
    modalTitle.textContent = card.dataset.title;
    modalBody.textContent = card.dataset.body;

    lastFocused = document.activeElement;

    document.body.classList.add('modal-open');
    modal.classList.add('is-open');

    modalClose.focus();
}

  function closeModal(){
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    if(lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.card');
        openModal(card);
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(card);
        }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')){
      closeModal();
    }
  });

revealItems.forEach((item) => observer.observe(item));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();