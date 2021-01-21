$(document).on('click', e => {
  const $this = $(e.target);

  // hide dropdown on outer click
  if(!$this.hasClass('js-tel-dropdown') && !$this.hasClass('input__field')) {
    $('.js-tel-dropdown').removeClass('js-tel-dropdown--active').find('.js-tel-dropdown-inner').slideUp(300);
  }
});

// copy to clipboard
$('.js-input-copy').on('click', e => {
  e.preventDefault();
  const input = e.currentTarget.parentNode.querySelector('input');
  const type = input.getAttribute('type');
  input.setAttribute('type', 'text');
  
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand('copy');
  input.setAttribute('type', type);
});

// remove error text
$('.input').on('input', e => {
  $(e.currentTarget).closest('.input').removeClass('input--error');
});

// set max to sum input
$('.js-input-max').on('click', e => {
  const $this = $(e.currentTarget);

  $this.siblings('.input__field').val($this.siblings('.input__field').attr('data-max'));
  $this.closest('.input').removeClass('input--error');
});

// tel dropdown
$('.js-tel-dropdown').on('click', e => {
  e.preventDefault();
  $(e.currentTarget).toggleClass('js-tel-dropdown--active').find('.js-tel-dropdown-inner').slideToggle(300);
});

$('.js-tel-dropdown-item').on('click', e => {
  const $this = $(e.currentTarget);
  const icon = $this.attr('data-icon');

  $this.closest('.js-tel-dropdown').attr('data-icon', icon);
  $this.closest('.input').find('input').attr('placeholder', $this.attr('data-mask').replaceAll('9', '_')).inputmask($this.attr('data-mask'));
});

// masking
$('input[type="tel"]').each((i, el) => {
  $(el).inputmask($(el).attr('data-mask'));
});

// toggle visibility
$('.js-input-toggle').on('click', e => {
  e.preventDefault();
  const $inputField = $(e.currentTarget).siblings('input');

  $inputField.attr('type', $inputField.attr('type') === 'password' ? 'text' : 'password');
});