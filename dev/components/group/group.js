$(document).on('click', e => {
  // hide dropdown on outer click
  if(!$(e.target).closest('.js-group-dropdown').length) {
    $('.js-group-dropdown').removeClass('js-group-dropdown--active').find('.js-group-dropdown-inner').slideUp(300);
  }
});

// group dropdown
$('body').on('click', '.js-group-dropdown-item', e => {
  const $this = $(e.currentTarget);
  
  if (!$this.siblings('.js-group-dropdown-inner').length) {
    const $groupDropdownInner = $this.parent();
    $this.parent().siblings('.js-group-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-group-dropdown'));

    // sort elements
    const $sortedItems = Array.from($this.next().children()).sort((a, b) => {
      const aText = a.innerText;
      const bText = b.innerText;
  
      if (aText < bText) {
        return -1;
      }
    });

    $this.next().children().remove();
    $groupDropdownInner.append($sortedItems);
  }

  $this.closest('.js-group-dropdown').toggleClass('js-group-dropdown--active').find('.js-group-dropdown-inner').slideToggle(300);
});