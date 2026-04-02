document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".site-header-toggle");
  var nav = document.querySelector(".site-header-nav");
  if (!toggle || !nav) return;

  var hamburger = toggle.querySelector(".hamburger-icon");
  var close = toggle.querySelector(".close-icon");

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen);
    hamburger.style.display = isOpen ? "none" : "block";
    close.style.display = isOpen ? "block" : "none";
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll(".site-header-link").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      hamburger.style.display = "block";
      close.style.display = "none";
      document.body.style.overflow = "";
    });
  });
});
