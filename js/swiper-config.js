// Configuración Swiper
const swiperConfig = {
  loop: true, // Loop infinito
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: (index, className) => {
      return `<span class="${className}" aria-label="Ir a la diapositiva ${
        index + 1
      }"></span>`;
    },
  },
  a11y: {
    prevSlideMessage: "Diapositiva anterior",
    nextSlideMessage: "Diapositiva siguiente",
    firstSlideMessage: "Esta es la primera diapositiva",
    lastSlideMessage: "Esta es la última diapositiva",
    paginationBulletMessage: "Ir a la diapositiva",
  },
  breakpoints: {
    // Estos valores se ajustan según los puntos de ruptura del JSON
    480: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1025: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 4,
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper-container", swiperConfig);
});
