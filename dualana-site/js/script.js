const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");

let lastScrollY = window.scrollY;

function updateHeader() {

    const currentScroll = window.scrollY;
    // background putih setelah scroll
    header.classList.toggle(
        "is-scrolled",
        currentScroll > 30
    );

    // jangan hide saat di paling atas
    if(currentScroll <= 30){
        header.classList.remove("is-hidden");
    }

    // scroll ke bawah
    else if(currentScroll > lastScrollY){
        header.classList.add("is-hidden");
    }

    // scroll ke atas
    else{
        header.classList.remove("is-hidden");
    }
    lastScrollY = currentScroll;
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

/* ==========================================================
   PROJECT GALLERY
========================================================== */

const lightbox = document.getElementById("lightbox");
const galleryImage = document.getElementById("galleryImage");
const galleryTitle = document.getElementById("galleryTitle");
const galleryDescription = document.getElementById("galleryDescription");
const galleryCounter = document.getElementById("galleryCounter");

const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryClose = document.getElementById("galleryClose");

let galleryImages = [];
let galleryIndex = 0;

function renderGallery() {

    if (!galleryImages.length) return;

    galleryImage.src = galleryImages[galleryIndex];
    galleryImage.alt = galleryTitle.textContent;

    galleryCounter.textContent =
        `${galleryIndex + 1} / ${galleryImages.length}`;
}

function openGallery(project) {

    if (!project) return;

    const gallery = project.dataset.gallery;

    if (!gallery) {
        console.warn("Project belum memiliki data-gallery");
        return;
    }

    galleryImages = JSON.parse(gallery);

    galleryIndex = 0;

    galleryTitle.textContent =
        project.dataset.title || "";

    galleryDescription.textContent =
        project.dataset.description || "";

    renderGallery();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeGallery() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

document.querySelectorAll(".project-btn").forEach((btn) => {

    btn.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        const project = btn.closest(".project-tile");

        openGallery(project);

    });

});

galleryPrev.addEventListener("click", () => {

    if (!galleryImages.length) return;

    galleryIndex =
        (galleryIndex - 1 + galleryImages.length) %
        galleryImages.length;

    renderGallery();

});

galleryNext.addEventListener("click", () => {

    if (!galleryImages.length) return;

    galleryIndex =
        (galleryIndex + 1) %
        galleryImages.length;

    renderGallery();

});

galleryClose.addEventListener("click", closeGallery);

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closeGallery();

    }

});

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    switch (e.key) {

        case "Escape":
            closeGallery();
            break;

        case "ArrowLeft":

            galleryIndex =
                (galleryIndex - 1 + galleryImages.length) %
                galleryImages.length;

            renderGallery();

            break;

        case "ArrowRight":

            galleryIndex =
                (galleryIndex + 1) %
                galleryImages.length;

            renderGallery();

            break;

    }

});

const popup = document.getElementById("mapPopup");
const popupCity = document.getElementById("popupCity");
const popupRegion = document.getElementById("popupRegion");

document.querySelectorAll("map area").forEach(area=>{

    area.addEventListener("click",(e)=>{

        e.preventDefault();

        popupCity.textContent = area.dataset.city;
        popupRegion.textContent = area.dataset.region;

        const coords = area.coords.split(",");

        popup.style.left = coords[0] + "px";
        popup.style.top = coords[1] + "px";

        popup.classList.add("active");

    });

});

document.addEventListener("click",(e)=>{

    if(
        !e.target.closest(".map-popup") &&
        e.target.tagName !== "AREA"
    ){

        popup.classList.remove("active");

    }

});