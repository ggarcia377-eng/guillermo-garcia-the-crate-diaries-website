// THE CRATE DIARIES — shared interactions
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  // Accessible image gallery lightbox
  const lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("p");
    document.querySelectorAll("[data-lightbox]").forEach((card) => {
      card.addEventListener("click", () => {
        lightboxImage.src = card.dataset.lightbox;
        lightboxImage.alt = card.querySelector("img")?.alt || "Expanded vinyl collection photograph";
        lightboxCaption.textContent = card.dataset.caption || "";
        lightbox.showModal();
      });
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  // Turn the community form into a pre-filled email draft (no backend required).
  const storyForm = document.querySelector("#story-form");
  if (storyForm) {
    storyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(storyForm);
      const subject = encodeURIComponent(`Crate Diaries submission: ${data.get("title")}`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nType: ${data.get("type")}\n\n${data.get("story")}\n\nI'll attach my photos before sending.`
      );
      const feedback = storyForm.querySelector(".form-feedback");
      feedback.textContent = "Your email draft is ready. Add any photos, then send it to hello@thecratediaries.com.";
      window.location.href = `mailto:hello@thecratediaries.com?subject=${subject}&body=${body}`;
    });
  }
});