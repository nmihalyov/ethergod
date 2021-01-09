$(document).on('click', e => {
  // hide dropdown on outer click
  if(!$(e.target).closest('.js-stats-dropdown').length) {
    $('.js-stats-dropdown').removeClass('js-stats-dropdown--active').find('.js-stats-dropdown-inner').slideUp(300);
  }
});

// tabs handling
$('.js-stats-tab').on('click', e => {
  const $this = $(e.currentTarget);
  const target = $this.attr('data-content');

  $('.stats__tabs-item--active').removeClass('stats__tabs-item--active');
  $this.addClass('stats__tabs-item--active');

  $('.js-stats-content').hide(0);
  $(`.js-stats-content[data-content="${target}"]`).fadeIn(500);
});

// stats dropdown
$('body').on('click', '.js-stats-dropdown-item', e => {
  const $this = $(e.currentTarget);
  
  if (!$this.siblings('.js-stats-dropdown-inner').length) {
    const $statsDropdownInner = $this.parent();
    $this.parent().siblings('.js-stats-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-stats-dropdown'));

    // sort elements
    const $sortedItems = Array.from($this.next().children()).sort((a, b) => {
      const aText = a.innerText;
      const bText = b.innerText;
  
      if (aText < bText) {
        return -1;
      }
    });

    $this.next().children().remove();
    $statsDropdownInner.append($sortedItems);
  }

  $this.closest('.js-stats-dropdown').toggleClass('js-stats-dropdown--active').find('.js-stats-dropdown-inner').slideToggle(300);
});