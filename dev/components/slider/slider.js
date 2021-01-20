$('.js-slider').slick({
  variableWidth: true,
  centerMode: true,
  swipe: false,
  prevArrow: '<div class="slider__carousel-arrow slider__carousel-arrow--prev"></div>',
  nextArrow: '<div class="slider__carousel-arrow slider__carousel-arrow--next"></div>',
  responsive: [{
    breakpoint: 1199,
    settings: {
      arrows: false,
      swipe: true,
      swipeToSlide: true
    }
  }]
});