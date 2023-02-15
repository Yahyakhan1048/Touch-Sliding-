// get our elements
const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

  // set up our Global Variable
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0

    // add our event listeners
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // Touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
  
    //===== Mouse Event ======
  
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
  })


  // ======= Disable Context menu mean when You are clicking or moving on slide it does not show anything ===========
    window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  
  
  function touchStart(index) {
    return function (event) {
    currentIndex = index
    //======== it execute when you touch mobile screen or moving curser on Screen
    startPos = event.type.includes('mouse')
    ? event.pageX
    : event.touches[0].clientX
    isDragging = true;

    //======= Animation along X-axis ========
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
    }
  }

  function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
  }

  function touchMove(event) {
    if(isDragging) {
        const currentPosition = event.clientX
        currentTranslate = prevTranslate + currentPosition - startPos
    }
  }

  
function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}
  
function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}