$(document).on('click', e => {
  const $this = $(e.target);

  // hide menu on outer click
  if(!$this.closest('.js-menu').length && !$this.hasClass('js-burger') && !$this.closest('.js-burger').length) {
    $('.js-menu').removeClass('header__menu--active');
  }
  
  // hide dropdown on outer click
  if(!$this.closest('.js-header-dropdown').length) {
    $('.js-header-dropdown').removeClass('js-header-dropdown--active').find('.js-header-dropdown-inner').slideUp(300);
  }
  
  // hide context menu on outer click
  if(!$this.closest('.header__context').length || $this.hasClass('js-open-popup') || $this.hasClass('js-chat-open')) {
    $('.js-header-context-menu').fadeOut(300);
  }
});

// header menu
$('.js-burger').on('click', () => {
  $('.js-menu').toggleClass('header__menu--active');

  if ($(window).innerWidth() < 1199) {
    hideOverflow();
  }
});

$('.js-menu-close').on('click', () => {
  $('.js-menu').removeClass('header__menu--active');

  if ($(window).innerWidth() < 1199) {
    showOverflow();
  }
});

// header dropdown
if (localStorage.getItem('currencyShow')) {
  const $currentCurrency = $(`.js-header-dropdown-item[data-currency="${localStorage.getItem('currencyShow')}"]`);

  $currentCurrency.parent().siblings('.js-header-dropdown-item').prependTo($currentCurrency.parent());
  $currentCurrency.prependTo($currentCurrency.closest('.js-header-dropdown'));
}

$('.js-header-dropdown-item').on('click', e => {
  const $this = $(e.currentTarget);

  if (!$this.siblings('.js-header-dropdown-inner').length) {
    $this.parent().siblings('.js-header-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-header-dropdown'));
  }

  if ($this.attr('data-currency')) {
    localStorage.setItem('currencyShow', $this.attr('data-currency'));
  }

  $this.closest('.js-header-dropdown').toggleClass('js-header-dropdown--active').find('.js-header-dropdown-inner').slideToggle(300);
});

// context menu
$('.js-header-context').on('click', e => {
  const $this = $(e.currentTarget);

  $('.js-header-context-menu').not($this.siblings()).fadeOut(300);
  $this.siblings('.js-header-context-menu').fadeToggle(300);
});

// crypto switch
const setCryptoCashView = type => {
  if (type === 'cash') {
    $('.header__crypto .js-header-dropdown-item').each((i, el) => {
      $(el).html(`<span>$</span>${$(el).attr('data-cash')}`);
    });

    $('.js-header-switch').attr('data-type', 'cash');
  } else if (type === 'crypto') {
    $('.header__crypto .js-header-dropdown-item').each((i, el) => {
      $(el).html($(el).attr('data-crypto'));
    });

    $('.js-header-switch').attr('data-type', 'crypto');
  }
};

if (localStorage.getItem('cryptoCashView') === 'cash') {
  setCryptoCashView('cash');
} else {
  setCryptoCashView('crypto');
}

$('.js-header-switch').on('click', e => {
  const $this = $(e.currentTarget);

  if ($this.attr('data-type') === 'crypto') {
    localStorage.setItem('cryptoCashView', 'cash');

    setCryptoCashView('cash');
  } else {
    localStorage.setItem('cryptoCashView', 'crypto');

    setCryptoCashView('crypto');
  }
});