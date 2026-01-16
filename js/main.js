/* ================================
   ОСНОВНОЙ ФАЙЛ JAVASCRIPT
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimation();
  initSlider();
});

// Мобильное меню
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

// Анимация при скролле
function initScrollAnimation() {
  const fadeElements = document.querySelectorAll('.fade-in');

  function checkVisible() {
    fadeElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.75) {
        element.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisible);
  checkVisible(); // Проверка при загрузке
}

// Слайдер
function initSlider() {
  const slider = document.querySelector('.slider-container');
  const slides = document.querySelectorAll('.slider-item');
  const prevBtn = document.querySelector('.slider-btn:first-of-type');
  const nextBtn = document.querySelector('.slider-btn:last-of-type');
  const dots = document.querySelectorAll('.dot');

  if (!slider || slides.length === 0) return;

  let currentSlide = 0;

  function showSlide(n) {
    if (n >= slides.length) {
      currentSlide = 0;
    } else if (n < 0) {
      currentSlide = slides.length - 1;
    }

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Обновляем точки
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide--;
      showSlide(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide++;
      showSlide(currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Автоматическая смена слайдов
  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000);

  showSlide(currentSlide);
}
