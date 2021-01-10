// copy to clipboard
$('.js-input-copy').on('click', e => {
  e.preventDefault();
  const input = e.currentTarget.parentNode.querySelector('input');

  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand('copy');
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