document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200; 
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const percent = Math.min(progress / duration, 1);
          window.scrollTo(0, startPosition + distance * ease(percent));
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }

        window.requestAnimationFrame(step);
      }
    });
  });

  const images = [
    './src/img/Home/carousel1.jpg',
    './src/img/Home/carousel2.jpg',
    './src/img/Home/carousel3.jpg',
    './src/img/Home/carousel4.jpg',
    './src/img/Home/carousel5.jpg',
    './src/img/Home/carousel6.jpg',
    './src/img/Home/carousel7.jpg'
  ];
  let index = 0;
  const carouselImage = document.getElementById('carouselImage');

  function updateImage() {
    carouselImage.style.opacity = 0;
    setTimeout(() => {
      carouselImage.src = images[index];
      carouselImage.style.opacity = 1;
    }, 300);
  }
  function prevImage() {
    index = (index - 1 + images.length) % images.length;
    updateImage();
  }
  function nextImage() {
    index = (index + 1) % images.length;
    updateImage();
  }
  setInterval(nextImage, 4000);