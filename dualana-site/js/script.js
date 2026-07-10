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
const services = [
    {
      index: "01",
      image: "/assets/img-service1.png",
      title: "Brand Activation",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      index: "02",
      image: "/assets/img-service2.png",
      title: "Brand Exhibition",
      body: "Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    },
    {
      index: "03",
      image: "/assets/img-service3.png",
      title: "Event Management",
      body: "In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere."
    },
    {
      index: "04",
      image: "/assets/img-service4.png",
      title: "Booth Production",
      body: "Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."
    }
  ];

  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalIndex = document.getElementById('modalIndex');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  let lastFocused = null;

  function openModal(i){
    const data = services[i];
    if(!data) return;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalIndex.textContent = data.index;
    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;

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

  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(Number(btn.dataset.open));
    });
  });

  // Clicking the card itself (outside the button) also opens its modal
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.service)));
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openModal(Number(card.dataset.service));
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