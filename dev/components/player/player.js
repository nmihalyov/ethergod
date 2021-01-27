$(document).on('click', e => {
  // hide dropdown on outer click
  if(!$(e.target).closest('.js-player-dropdown').length) {
    $('.js-player-dropdown').removeClass('js-player-dropdown--active').find('.js-player-dropdown-inner').slideUp(300);
  }

  // hide tags bubble on outer click
  if(!$(e.target).closest('.js-player-bubble').length && !$(e.target).closest('[data-control="info"]').length) {
    $('.js-player-bubble').fadeOut(300);
  }
});

// player about scripts
$('.player__about-head').on('click', e => {
  const $this = $(e.currentTarget);

  $this.toggleClass('player__about-head--active');
  $this.parent().find('.player__about-content').slideToggle(300);
});

// switch
$('.js-game-switch').on('click', e => {
  $(e.currentTarget).find('.player__game-switch-input').toggleClass('player__game-switch-input--active');
});

// fullscreen handler
$('[data-control="fullscreen"]').on('click', () => {
  const body = document.body;
  const requestMethod = body.requestFullScreen || body.webkitRequestFullScreen || body.mozRequestFullScreen || body.msRequestFullScreen;

  if (requestMethod) {
    requestMethod.call(body);
  } else if (typeof window.ActiveXObject !== "undefined") {
    const wscript = new ActiveXObject("WScript.Shell");

    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }

  $('.js-player-frame').addClass('player__game-frame--fullscreen');
  $('.player__game-inner').addClass('player__game-inner--fullscreen');
});

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', () => {
  if (!document.fullScreen && !document.mozFullScreen && !document.webkitIsFullScreen) {
    $('.js-player-frame').removeClass('player__game-frame--fullscreen');
    $('.player__game-inner').removeClass('player__game-inner--fullscreen');
  }
});

// favorite handler
$('[data-control="favorite"]').on('click', e => {
  $(e.currentTarget).toggleClass('player__game-control--active');
});

// tags bubble handler
$('[data-control="info"]').on('click', () => {
  $('.js-player-bubble').css('display', 'flex').hide(0).fadeIn(300);
});

$('.js-player-bubble-close').on('click', () => {
  $('.js-player-bubble').fadeOut(300);
});

// overlay hide handlers
$('.js-play-real').on('click', () => {
  $('.player__game-switch-input').addClass('player__game-switch-input--active');
  $('.player__game-overlay').fadeOut(300);
  $('.player__game-menu').removeClass('player__game-menu--disabled');
});

$('.js-play-entertain').on('click', () => {
  $('.player__game-switch-input').removeClass('player__game-switch-input--active');
  $('.player__game-overlay').fadeOut(300);
  $('.player__game-menu').removeClass('player__game-menu--disabled');
});

// player dropdown
$('.js-player-dropdown-item').on('click', e => {
  const $this = $(e.currentTarget);

  if (!$this.siblings('.js-player-dropdown-inner').length) {
    $this.parent().siblings('.js-player-dropdown-item').prependTo($this.parent());
    $this.prependTo($this.closest('.js-player-dropdown'));
  }

  $this.closest('.js-player-dropdown').toggleClass('js-player-dropdown--active').find('.js-player-dropdown-inner').slideToggle(300);
});