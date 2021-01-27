$(document).on('click', e => {
  // hide dropdown on outer click
  if(!$(e.target).closest('.js-popup-dropdown').length) {
    $('.js-popup-dropdown').removeClass('js-popup-dropdown--active').find('.js-popup-dropdown-inner').slideUp(300);
  }
});

// popup handling
let topOffset = 0;

const hideOverflow = () => {
  topOffset = window.scrollY;

  $('body').css({
    position: 'fixed',
    marginTop: `${-topOffset}px`
  });
};

const showOverflow = () => {
  $('body').css({
    position: 'static',
    marginTop: '0'
  });

  window.scrollTo(0, topOffset);
};

const closePopup = (e, $this) => {
  if(!$(e.target).closest('.popup__window').length || !$this.hasClass('js-popup')) {
    showOverflow();
  
    $this.closest('.js-popup').hide(0);
	}
};

const openPopup = $popup => {
  hideOverflow();

  $('.js-popup').hide(0);
  
  $popup.fadeIn(300);
};

$('.js-open-popup').on('click', e => {
  const target = $(e.currentTarget).attr('data-popup');
  const $popup = $(`.js-popup[data-popup="${target}"]`);
  openPopup($popup);
});

$('.js-close-popup').on('click', e => {
  closePopup(e, $(e.currentTarget));
});

// popup dropdown
$('.js-popup-dropdown-item').on('click', e => {
  const $this = $(e.currentTarget);

  if (!$this.siblings('.js-popup-dropdown-inner').length) {
    $this.parent().siblings('.js-popup-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-popup-dropdown'));
  }

  $this.closest('.js-popup-dropdown').toggleClass('js-popup-dropdown--active').find('.js-popup-dropdown-inner').slideToggle(300);
});

// popup forms handling
$('.js-form-withdraw').on('submit', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const $address = $this.find('input[name="ethWithdrawalWalletAddress"]');
  const $amount = $this.find('input[name="ethSumToWithdraw"]');
  let isValid = true;

  if ($address.val().length !== 34) {
    isValid = false;
    $address.closest('.input').addClass('input--error');
  }

  if ($amount.val() < $amount.attr('data-min')) {
    isValid = false;
    $amount.closest('.input').addClass('input--error').find('.input__error').text(`Минимум ${$amount.attr('data-min')}`);
  } else if ($amount.val() > $amount.attr('data-max')) {
    isValid = false;
    $amount.closest('.input').addClass('input--error').find('.input__error').text('Недостаточно средств');
  }

  if (isValid) {
    // send form
  }
});

$('.js-form-transfer').on('submit', e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const $name = $this.find('input[name="recipientName"]');
  const $amount = $this.find('input[name="transferAmount"]');
  let isValid = true;

  if ($name.val().length !== 34) {
    isValid = false;
    $name.closest('.input').addClass('input--error');
  }

  if ($amount.val() > $amount.attr('data-max')) {
    isValid = false;
    $amount.closest('.input').addClass('input--error').find('.input__error').text('Недостаточно средств');
  }

  if (isValid) {
    // send form
  }
});

// refresh statistics handler
$('.js-popup-refresh').on('click', e => {
  const $this = $(e.currentTarget);

  $this.addClass('popup__refresh--loading');
  setTimeout(() => {
    $this.removeClass('popup__refresh--loading');
  }, 1000);
});

// user actions handlers
$('.popup__user-action[data-action="transfer"]').on('click', e => {
  const name = $(e.currentTarget).parent().siblings('.popup__user-name').text();

  $('[data-popup="wallet"] .js-tab:last-child').click();
  $('[data-popup="wallet"] input[name="recipientName"]').val(name);
});

$('.popup__user-action[data-action="blacklist"]').on('click', e => {
  $(e.currentTarget).toggleClass('popup__user-action--active');
});