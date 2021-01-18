$('.levels__item-head').on('click', e => {
  const $this = $(e.currentTarget);

  $('.levels__item-desc').slideUp(300);

  if ($this.hasClass('levels__item-head--active')) {
    $this.removeClass('levels__item-head--active');
  } else {
    $('.levels__item-head--active').removeClass('levels__item-head--active');
    $this.addClass('levels__item-head--active');
    $this.parent().find('.levels__item-desc').slideDown(300);
  }
});