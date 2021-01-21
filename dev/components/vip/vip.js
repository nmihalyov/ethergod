$('.js-vip-slider').slick({
  variableWidth: true,
  variableHeight: true,
  centerMode: true,
  swipe: false,
  prevArrow: '<div class="vip__feedback-arrow vip__feedback-arrow--prev"></div>',
  nextArrow: '<div class="vip__feedback-arrow vip__feedback-arrow--next"></div>',
  responsive: [{
    breakpoint: 1199,
    settings: {
      arrows: false,
      swipe: true,
      swipeToSlide: true
    }
  }]
});