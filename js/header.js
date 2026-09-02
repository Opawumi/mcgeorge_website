document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
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
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll(".site-header-link").forEach(function (link) {
    link.addEventListener("click", function () {
      // Don't close menu for dropdown trigger
      if (link.classList.contains("site-header-dropdown-trigger")) {
        return;
      }
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      hamburger.style.display = "block";
      close.style.display = "none";
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    });
  });

  // Dropdown toggle for all dropdown wrappers (Services, Industries, Insights)
  var allDropdownWrappers = document.querySelectorAll(".site-header-dropdown-wrapper");

  allDropdownWrappers.forEach(function (wrapper) {
    var trigger = wrapper.querySelector(".site-header-dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (e) {
      e.preventDefault();

      // Close all OTHER dropdowns first
      allDropdownWrappers.forEach(function (otherWrapper) {
        if (otherWrapper !== wrapper) {
          otherWrapper.classList.remove("dropdown-open");
          var otherTrigger = otherWrapper.querySelector(".site-header-dropdown-trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        }
      });

      var isOpen = wrapper.classList.toggle("dropdown-open");
      trigger.setAttribute("aria-expanded", isOpen);
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    allDropdownWrappers.forEach(function (wrapper) {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("dropdown-open");
        var trigger = wrapper.querySelector(".site-header-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Mega Menu Interaction
  var megaMenuItems = document.querySelectorAll(".mega-menu-service-item");
  var megaMenuPanels = document.querySelectorAll(".mega-menu-panel");

  if (megaMenuItems.length > 0 && megaMenuPanels.length > 0) {
    megaMenuItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        var targetId = item.getAttribute("data-target");

        // Remove active class from all items and panels
        megaMenuItems.forEach(function (i) {
          i.classList.remove("active");
        });
        megaMenuPanels.forEach(function (p) {
          p.classList.remove("active");
        });

        // Add active class to hovered item and corresponding panel
        item.classList.add("active");
        var targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });
  }
});

