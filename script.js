const opening = document.querySelector("#opening");
const gift = document.querySelector("#gift");
const openGift = document.querySelector("#open-gift");
const closingNote = document.querySelector("#closing-note");
const climaxLine = document.querySelector(".arabic-line--climax");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function revealAll() {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -35px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  const endingObserver = new IntersectionObserver(
    (entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        window.setTimeout(() => closingNote.classList.add("is-visible"), 5000);
        observer.disconnect();
      }
    },
    { threshold: 0.1 },
  );

  endingObserver.observe(climaxLine);
} else {
  revealAll();
  closingNote.classList.add("is-visible");
}

openGift.addEventListener("click", () => {
  gift.inert = false;
  gift.classList.add("is-open");
  gift.focus({ preventScroll: true });
  window.scrollTo(0, 0);
  opening.classList.add("is-dismissed");
  window.setTimeout(() => opening.remove(), 1700);
});
