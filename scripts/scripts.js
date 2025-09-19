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
          otherContent.style.padding = "0 15px";
        }
      });

      header.classList.toggle("active");
      const content = header.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = "0 15px";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "15px";
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