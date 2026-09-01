document.addEventListener("DOMContentLoaded", function () {

  /* ═══════════════════════════════════════════════════════════════════
     1. HAMBURGER TOGGLE
  ═══════════════════════════════════════════════════════════════════ */
  var toggle = document.querySelector(".site-header-toggle");
  var nav    = document.querySelector(".site-header-nav");
  if (!toggle || !nav) return;

  var hamburger = toggle.querySelector(".hamburger-icon");
  var close     = toggle.querySelector(".close-icon");

  function openNav() {
    nav.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    hamburger.style.display = "none";
    close.style.display = "block";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    // Always start at main panel when opening
    resetToMainPanel();
  }

  function closeNav() {
    nav.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    hamburger.style.display = "block";
    close.style.display = "none";
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    resetToMainPanel();
  }

  toggle.addEventListener("click", function () {
    if (nav.classList.contains("nav-open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  /* ═══════════════════════════════════════════════════════════════════
     2. MOBILE PANEL NAVIGATION
  ═══════════════════════════════════════════════════════════════════ */
  var panelHistory = []; // stack of panel IDs

  function resetToMainPanel() {
    panelHistory = [];
    var allPanels = nav.querySelectorAll(".mobile-nav-panel");
    allPanels.forEach(function (p) { p.classList.remove("active"); });
    var main = nav.querySelector(".mobile-nav-panel[data-panel-id='main']");
    if (main) main.classList.add("active");
  }

  function showPanel(targetId) {
    var allPanels = nav.querySelectorAll(".mobile-nav-panel");
    var current   = nav.querySelector(".mobile-nav-panel.active");
    var next      = nav.querySelector(".mobile-nav-panel[data-panel-id='" + targetId + "']");
    if (!next) return;

    if (current) {
      panelHistory.push(current.getAttribute("data-panel-id"));
      current.classList.remove("active");
    }
    next.classList.add("active");
    // Scroll to top of new panel
    next.scrollTop = 0;
  }

  function goBack() {
    if (panelHistory.length === 0) {
      closeNav();
      return;
    }
    var prevId  = panelHistory.pop();
    var current = nav.querySelector(".mobile-nav-panel.active");
    var prev    = nav.querySelector(".mobile-nav-panel[data-panel-id='" + prevId + "']");
    if (!prev) return;
    if (current) current.classList.remove("active");
    prev.classList.add("active");
    prev.scrollTop = 0;
  }

  // Forward navigation: buttons / links with data-mobile-panel
  nav.addEventListener("click", function (e) {
    // Forward: panel trigger
    var trigger = e.target.closest("[data-mobile-panel]");
    if (trigger) {
      e.preventDefault();
      var targetId = trigger.getAttribute("data-mobile-panel");
      showPanel(targetId);
      return;
    }
    // Back button
    var backBtn = e.target.closest(".mobile-back-btn");
    if (backBtn) {
      e.preventDefault();
      goBack();
      return;
    }
  });

  /* ═══════════════════════════════════════════════════════════════════
     3. DESKTOP DROPDOWN TOGGLE (simple dropdowns – non-mega-menu pages)
  ═══════════════════════════════════════════════════════════════════ */
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

  /* ═══════════════════════════════════════════════════════════════════
     4. DESKTOP MEGA MENU (mouseenter panel switching – index.html only)
  ═══════════════════════════════════════════════════════════════════ */
  var megaMenuItems  = document.querySelectorAll(".mega-menu-service-item");
  var megaMenuPanels = document.querySelectorAll(".mega-menu-panel");

  if (megaMenuItems.length > 0 && megaMenuPanels.length > 0) {
    megaMenuItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        var targetId = item.getAttribute("data-target");

        megaMenuItems.forEach(function (i)  { i.classList.remove("active"); });
        megaMenuPanels.forEach(function (p) { p.classList.remove("active"); });

        item.classList.add("active");
        var targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add("active");
      });
    });
  }

});
