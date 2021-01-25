$(document).on('click', e => {
  const $this = $(e.target);

  if(!$this.closest('.js-settings-filter').length) {
    $('.js-settings-filter').removeClass('js-settings-filter--active').find('.js-settings-filter-inner').slideUp(300);
  }

  // hide dropdown on outer click
  if(!$(e.target).closest('.js-settings-dropdown').length) {
    $('.js-settings-dropdown').removeClass('js-settings-dropdown--active').find('.js-settings-dropdown-inner').slideUp(300);
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

// settings dropdown
$('.js-settings-dropdown-item').on('click', e => {
  const $this = $(e.currentTarget);

  if (!$this.siblings('.js-settings-dropdown-inner').length) {
    $this.parent().siblings('.js-settings-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-settings-dropdown'));
  }

  $this.closest('.js-settings-dropdown').toggleClass('js-settings-dropdown--active').find('.js-settings-dropdown-inner').slideToggle(300);
});