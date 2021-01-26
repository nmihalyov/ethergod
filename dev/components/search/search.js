// search handler
$('.js-search-input input').on('input', e => {
  const $this = $(e.currentTarget);

  if ($this.val().length >= 3) {
    $('.js-search-text').hide(0);
    $('.js-search-output').fadeIn(300);
  } else {
    $('.js-search-output').hide(0);
    $('.js-search-text').fadeIn(300);
  }
});

$('.js-search-recommend').on('click', e => {
  $('.js-search-input input').val(e.currentTarget.innerText);
  $('.js-search-input input').trigger('input');
});