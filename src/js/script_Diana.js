function smoothScroll(targetId, duration) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top;
        const startTime = performance.now();

        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + targetPosition * ease);

            if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Привязываем к якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    if (document.getElementById(targetId)) {
      e.preventDefault();
      smoothScroll(targetId, 1200); // 1200 мс = 1.2 секунды
    }
  });
});
const track = document.getElementById('carouselTrack');
const items = document.querySelectorAll('.portfolio-item');
const itemWidth = items[0].offsetWidth + 16; 
const imagesPerSlide = 3;
const totalSlides = Math.ceil(items.length / imagesPerSlide);
let currentSlide = 0;

function updateCarousel() {
    const offset = -currentSlide * itemWidth * imagesPerSlide;
    track.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0; 
    }
    updateCarousel();
}

function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1; 
    }
    updateCarousel();
}

  
setInterval(nextSlide, 4000);

  
window.addEventListener('load', updateCarousel);