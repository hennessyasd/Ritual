document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup-form");
  const popupContent = document.querySelector(".popup-content");
  const form = document.querySelector("#requestForm");
  const notification = document.querySelector(".notification");
  const closeBtn = document.querySelector(".close-btn");
  const openBtns = document.querySelectorAll(".btn");

  openBtns.forEach((btn) => {
    if (btn.textContent.trim() === "Оставить заявку") {
      btn.addEventListener("click", () => {
        popup.classList.add("active");
      });
    }
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
  });

  popup.addEventListener("click", (e) => {
    if (!popupContent.contains(e.target)) {
      popup.classList.remove("active");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    popup.classList.remove("active");
    notification.classList.add("show");

    const line = notification.querySelector(".notif-line");
    line.classList.add("run");

    setTimeout(() => {
      notification.classList.remove("show");
      line.classList.remove("run");
    }, 3500);
  });

  const inlineForm = document.querySelector(".div2 form");
  if (inlineForm) {
    inlineForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let msg = document.createElement("div");
      msg.className = "inline-thanks";
      msg.innerHTML = `
        <p>Спасибо, ждите звонка!</p>
        <div class="inline-line"></div>
      `;
      document.body.appendChild(msg);

      setTimeout(() => msg.classList.add("show"), 10);

      const line = msg.querySelector(".inline-line");
      setTimeout(() => line.classList.add("run"), 100);

      setTimeout(() => {
        msg.classList.remove("show");
        setTimeout(() => msg.remove(), 500);
      }, 3500);

      inlineForm.reset();
    });
  }
});
