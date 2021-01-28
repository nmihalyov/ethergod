// count symbols remains
const countSymbols = () => {
  const inputLength = 160 - $('.js-chat-input').val().length;

  $('.js-chat-counter').text(inputLength);

  if (160 - $('.js-chat-input').val().length < 0) {
    $('.chat__footer-input-counter').addClass('chat__footer-input-counter--error');
  } else {
    $('.chat__footer-input-counter').removeClass('chat__footer-input-counter--error');
  }
};

// programatically enter symbol to input
const enterSymbol = symbol => {
  const currentInputText = $('.js-chat-input').val();
  let commandString = '';

  if (/\s$/.test($('.js-chat-input').val()) || currentInputText.length === 0) {
    commandString = symbol;
  } else {
    commandString = ' ' + symbol;
  }
  
  $('.js-chat-input').val(currentInputText + commandString).focus();

  countSymbols();
};

$(document).on('click', e => {
  const $this = $(e.target);

  // hide dropdown on outer click
  if(!$this.closest('.js-chat-dropdown').length) {
    $('.js-chat-dropdown').removeClass('js-chat-dropdown--active').find('.js-chat-dropdown-inner').slideUp(300);
  }
});

// open chat window
$('.js-chat-open').on('click', () => {
  $('.js-chat').slideDown(300);
  $('.js-chat-messages').scrollTop($('.js-chat-messages').prop('scrollHeight'), 0);
  $('.js-chat-input').focus();
});

// close chat window
$('.js-chat-close').on('click', () => {
  $('.js-chat').slideUp(300);
  $('.js-chat-input').blur();
});

// chat dropdown
$('.js-chat-dropdown-item').on('click', e => {
  const $this = $(e.currentTarget);

  if (!$this.siblings('.js-chat-dropdown-inner').length) {
    $this.parent().siblings('.js-chat-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-chat-dropdown'));
  }

  $this.closest('.js-chat-dropdown').toggleClass('js-chat-dropdown--active').find('.js-chat-dropdown-inner').slideToggle(300);
});

// chat input symbol counter
$('.js-chat-input').on('input', e => {
  const $this = $(e.currentTarget);
  const currentInputText = $this.val();

  countSymbols();

  if (/@$/.test(currentInputText)) {
    $('.js-chat-mentions').slideDown(300);
    $('.js-chat-commands').slideUp(300);
  } else if (/\/$/.test(currentInputText)) {
    $('.js-chat-commands').slideDown(300);
    $('.js-chat-mentions').slideUp(300);
  } else {
    $('.js-chat-mentions').slideUp(300);
    $('.js-chat-commands').slideUp(300);
  }
});

// chat scroll handlers
$('.js-chat-messages').on('scroll', e => {
  const $this = $(e.currentTarget);

  requestAnimationFrame(() => {
    if ($this.scrollTop() + $this.innerHeight() >= $this.prop('scrollHeight') - 10) {
      $this.parent().addClass('chat__messages--bottom');
    } else {
      $this.parent().removeClass('chat__messages--bottom');
    }
  });
});

$('.js-chat-scroll').on('click', () => {
  $('.js-chat-messages').animate({scrollTop: $('.js-chat-messages').prop('scrollHeight')}, 300);
});

// chat mentions handlers
$('.js-chat-mentioning').on('click', e => {
  e.preventDefault();

  enterSymbol('@');
  $('.js-chat-mentions').slideDown(300);
});

$('.js-chat-mention').on('click', e => {
  e.preventDefault();

  $('.js-chat-input').val($('.js-chat-input').val() + $(e.currentTarget).text() + ' ');
  $('.js-chat-mentions').slideUp(300);

  countSymbols();

  $('.js-chat-input').focus();
});

// chat commands handlers
$('.js-chat-commanding').on('click', e => {
  e.preventDefault();

  enterSymbol('/');
  $('.js-chat-commands').slideDown(300);
});

$('.js-chat-command').on('click', e => {
  e.preventDefault();

  $('.js-chat-input').val($('.js-chat-input').val() + $(e.currentTarget).attr('data-command') + ' @');
  $('.js-chat-commands').slideUp(300);
  $('.js-chat-mentions').slideDown(300);

  countSymbols();

  $('.js-chat-input').focus();
});

// send message handler
$('.js-chat-form').on('submit', e => {
  e.preventDefault();
  moment.locale('ru');

  if (160 - $('.js-chat-input').val().length < 0) {
    $('.js-chat-input').focus();

    return false;
  }

  const lastBlockDateTime = $('.chat__messages-block:last-child').find('.chat__messages-date').text();
  const nowDateTime = moment(new Date()).format('dddd HH:mm');
  const message = `
    <p class="chat__messages-item">
      <span class="chat__messages-name">username</span>: ${$('.js-chat-input').val()}
    </p>`.replace(/@(\S+)\s/gm, (a, b) => {
      return `<a href="javascript:void(0)" class="chat__messages-user js-open-popup" data-popup="user">@${b}</a> `;
    });

  if ($('.js-chat-input').val().replace(/\s/g, '').length) {
    if (nowDateTime === lastBlockDateTime) {
      $('.js-chat-messages .chat__messages-block:last-child').append(message);
    } else {
      $('.js-chat-messages').append(`
        <div class="chat__messages-block">
          <p class="chat__messages-date">${nowDateTime}</p>
          ${message}
        </div>`);
    }
    
    $('.js-chat-input').val('').focus();
    $('.js-chat-messages').animate({scrollTop: $('.js-chat-messages').prop('scrollHeight')}, 300);

    countSymbols();
  }

  $('.js-chat-input').focus();
});