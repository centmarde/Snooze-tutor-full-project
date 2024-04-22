const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("showAnimate");
    } else {
      entry.target.classList.remove("showAnimate");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hiddenAnimate");
hiddenElements.forEach((el) => observer.observe(el));
