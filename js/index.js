;(function () {
  // HERO SLIDER ----------------------------------------------------------
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('.hero_section')
  )

  if (sections.length) {
    var total = sections.length
    var currentIndex = 0
    var autoTimer = null
    var AUTO_DELAY = 5000 // 5000ms delay

    function setActiveSection(nextIndex) {
      sections[currentIndex].classList.remove('is-active')

      currentIndex = (nextIndex + total) % total

      sections[currentIndex].classList.add('is-active')
    }

    function goToNext() {
      setActiveSection(currentIndex + 1)
      restartAuto()
    }

    function goToPrev() {
      setActiveSection(currentIndex - 1)
      restartAuto()
    }

    function restartAuto() {
      if (autoTimer) {
        clearInterval(autoTimer)
      }
      autoTimer = setInterval(goToNext, AUTO_DELAY)
    }

    // Initialise state
    sections.forEach(function (section, index) {
      if (index === 0) {
        section.classList.add('is-active')
      } else {
        section.classList.remove('is-active')
      }
    })

    // Wire up arrows across all hero sections
    var rightButtons = document.querySelectorAll('.right_arrow_button')
    var leftButtons = document.querySelectorAll('.left_arrow_button')

    rightButtons.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault()
        goToNext()
      })
    })

    leftButtons.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault()
        goToPrev()
      })
    })

    // Start auto-rotation
    restartAuto()
  }

  // PRODUCT CARDS HORIZONTAL SCROLLER ------------------------------------
  var productContainer = document.querySelector(
    '.section_4_section_productlist_container'
  )
  var productCards = productContainer
    ? Array.prototype.slice.call(
        productContainer.querySelectorAll(
          '.section_4_section_productlist_container_link'
        )
      )
    : []

  if (productContainer && productCards.length) {
    var visibleCount = 3
    var currentStart = 0

    function getStep () {
      var firstCard = productCards[0]
      var cardRect = firstCard.getBoundingClientRect()
      var style = getComputedStyle(productContainer)
      var gap =
        parseFloat(style.columnGap || style.gap || '0') || 0
      return cardRect.width + gap
    }

    function getVisibleCount () {
      var step = getStep()
      if (!step) return 1

      // How many cards fit fully in the viewport width
      var containerWidth = productContainer.clientWidth || 0
      var count = Math.floor(containerWidth / step)

      return Math.max(1, count)
    }

    function clampIndex (index) {
      visibleCount = getVisibleCount()
      var maxStart = Math.max(productCards.length - visibleCount, 0)
      if (index < 0) return 0
      if (index > maxStart) return maxStart
      return index
    }

    function scrollToIndex () {
      // Recompute in case layout changed (mobile/desktop, resize, etc.)
      visibleCount = getVisibleCount()
      currentStart = clampIndex(currentStart)
      var step = getStep()
      var target = step * currentStart
      productContainer.scrollTo({
        left: target,
        behavior: 'smooth'
      })
    }

    function goProductsNext () {
      currentStart = clampIndex(currentStart + 1)
      scrollToIndex()
    }

    function goProductsPrev () {
      currentStart = clampIndex(currentStart - 1)
      scrollToIndex()
    }

    var leftBtns = document.querySelectorAll('.productinfo_button_left')
    var rightBtns = document.querySelectorAll('.productinfo_button_right')

    leftBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault()
        goProductsPrev()
      })
    })

    rightBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault()
        goProductsNext()
      })
    })
  }
})()

