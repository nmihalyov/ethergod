$(document).on('click', e => {
  // hide dropdown on outer click
  if(!$(e.target).closest('.js-tabs-dropdown').length) {
    $('.js-tabs-dropdown').removeClass('js-tabs-dropdown--active').find('.js-tabs-dropdown-inner').slideUp(300);
  }
});

// tabs handling
$('.js-tab').on('click', e => {
  const $this = $(e.currentTarget);
  const target = $this.attr('data-content');
  const $tabs = $this.closest('.js-tabs');

  $tabs.find('.tabs__item--active').removeClass('tabs__item--active');
  $this.addClass('tabs__item--active');

  $tabs.find('.js-tabs-content').hide(0);
  $tabs.find(`.js-tabs-content[data-content="${target}"]`).fadeIn(500);
});

// tabs dropdown
$('body').on('click', '.js-tabs-dropdown-item', e => {
  const $this = $(e.currentTarget);
  
  if (!$this.siblings('.js-tabs-dropdown-inner').length) {
    const $tabsDropdownInner = $this.parent();
    $this.parent().siblings('.js-tabs-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-tabs-dropdown'));

    // sort elements
    const $sortedItems = Array.from($this.next().children()).sort((a, b) => {
      const aText = a.innerText;
      const bText = b.innerText;
  
      if (aText < bText) {
        return -1;
      }
    });

    $this.next().children().remove();
    $tabsDropdownInner.append($sortedItems);
  }

  $this.closest('.js-tabs-dropdown').toggleClass('js-tabs-dropdown--active').find('.js-tabs-dropdown-inner').slideToggle(300);
});