$(document).on('click', e => {
  const $this = $(e.target);

  if(!$this.closest('.js-settings-filter').length) {
    $('.js-settings-filter').removeClass('js-settings-filter--active').find('.js-settings-filter-inner').slideUp(300);
  }
});

// settings filter dropdown
$('.js-settings-filter-item').on('click', e => {
  const $this = $(e.currentTarget);

  if ($this.parent().hasClass('js-settings-filter')) {
    e.preventDefault();
  }

  $this.closest('.js-settings-filter').toggleClass('js-settings-filter--active').find('.js-settings-filter-inner').slideToggle(300);
});
