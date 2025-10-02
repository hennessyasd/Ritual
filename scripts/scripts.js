//burger-menu
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector("header nav ul");

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      navMenu.classList.toggle("active");
    })
  };
});

//accordion
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-header");
  const footer = document.querySelector("footer");

  accordions.forEach(header => {
    header.addEventListener("click", e => {
      e.stopPropagation();

      accordions.forEach(other => {
        if (other !== header) {
          other.classList.remove("active");
          const otherContent = other.nextElementSibling;
          otherContent.style.maxHeight = null;
          
        }
      });

      header.classList.toggle("active");
      const content = header.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        
      }
    });
  });

  document.addEventListener("click", e => {
    if (!footer.contains(e.target)) {
      accordions.forEach(header => {
        header.classList.remove("active");
        const content = header.nextElementSibling;
        content.style.maxHeight = null;
        content.style.padding = "0 15px";
      });
    }
  });
});


//slider main
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slider .slide");
  let currentIndex = 0;
  const interval = 5000;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);
  setInterval(nextSlide, interval);
});