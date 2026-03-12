;(function () {
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('.hero_section')
  )
  if (!sections.length) return

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
})()

