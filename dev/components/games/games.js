$('.js-games-slider').slick({
  infinite: true,
  swipe: false,
  slidesToShow: 6,
  variableWidth: true,
  prevArrow: '<div class="games__slider-arrow games__slider-arrow--prev"></div>',
  nextArrow: '<div class="games__slider-arrow games__slider-arrow--next"></div>',
  responsive: [{
    breakpoint: 1199,
    settings: {
      swipe: true,
      swipeToSlide: true,
      slidesToShow: 3
    }
  }]
});