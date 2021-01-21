$('.code__input').on('keyup', e => {
  const $this = $(e.currentTarget);
  const inputVal = $this.val();
  const key = e.keyCode || e.charCode;
  let codeIsNotEntered = false;

  $this.val(inputVal.replace(/[^0-9]/g, ''));

  if (!/[^0-9]/g.test(inputVal) && key != 8 && key != 46) {
    $this.next().focus();
  } else if ((key == 8 || key == 46) && inputVal === '') {
    $this.prev().focus();
  }

  $this.parent().find('input').each((i, el) => {
    if (el.value === '') {
      codeIsNotEntered = true;
    }
  });

  if (!codeIsNotEntered) {
    $this.parent().addClass('code--entered');
    $this.parent().parent().find('.js-code-title').hide();
    $this.parent().parent().find('.js-code-result').show();
    $this.blur();
  }
});