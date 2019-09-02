// AOS
AOS.init({
  duration: 1000,
})

jQuery(document).ready(function ($) {
  'use strict';


  // Animsition
  $(".animsition").animsition();

  // Scrollax
  $.Scrollax();

  // Smooth scroll
  var $root = $('html, body');

  $('a.js-smoothscroll[href^="#"]').click(function () {
    $root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 40
    }, 500);

    return false;
  });

  // Owl
  $('.wide-slider').owlCarousel({
    loop: true,
    autoplay: true,
    margin: 10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: false,
    items: 1,
    autoheight: true,
    navText: ["<span class='ion-chevron-left'></span>", "<span class='ion-chevron-right'></span>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      600: {
        items: 1,
        nav: false
      },
      1000: {
        items: 1,
        nav: true
      }
    }
  });

  // Show menu 
  if ($(window).width() > 768) {
    $('body').removeClass('menu-open');
    $('.js-templateux-menu').css('display', 'block');
  }
  // Window Resize
  $(window).resize(function () {
    var $this = $(this);
    $('.js-templateux-menu li').removeClass('staggard');
    $('.js-toggle-menu').removeClass('is-active');
    if ($this.width() > 768) {
      $('body').removeClass('menu-open');
      $('.js-templateux-menu').css('display', 'block');

    } else {
      if ($this.width() < 768) {
        $('.js-templateux-menu').css('display', 'none');
      }
    }
  });

  // Hamburger Button 
  $('.js-toggle-menu').on('click', function (e) {
    e.preventDefault();

    var $this = $(this);

    if ($('body').hasClass('menu-open')) {
      $this.removeClass('is-active');
      $('body').removeClass('menu-open');
      $('.js-templateux-menu li').removeClass('staggard');
    } else {
      $this.addClass('is-active');
      $('body').addClass('menu-open');

      $('.js-templateux-menu li').each(function (k) {
        var $this = $(this);
        setTimeout(function () {
          $this.addClass('staggard');
        }, 100 * k);
      });

    }

    if ($('.templateux-menu').is(':visible')) {
      $('.js-templateux-menu').fadeOut(300);
    } else {
      $('.js-templateux-menu').fadeIn(300);
    }
  })

  var form = $('#sendForm');
  var name = form.find('#name');
  var email = form.find('#email');
  var phone = form.find('#phone');
  var type = form.find('#type');
  var msg = form.find('#msg');
  var url = 'https://script.google.com/macros/s/AKfycbzRIoOb91dpcyyrwGwXud3FXI4c2IxigPkuUeMoAdK18DaKF08h/exec';

  form.on('submit', function (e) {
    e.preventDefault();
    if(formValidation()) {
      send();
    }
  });

  var send = function () {
    // data
    var data = {
      'name': name.val(),
      'email': email.val(),
      'phone': phone.val(),
      'type': type.val(),
      'msg': msg.val()
    }

    // ajax post
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (data) {
        console.log('success');
        document.getElementById('sendForm').reset();
        alert('Success');
      },
      error: function (data) {
        console.log('fail');
      }
    });
  }

  // email 체크
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // form validation
  function formValidation() {
    if (name.val() == '') {
      alert('Required Name field');
      name.focus();
      return false;
    } else if (!validateEmail(email.val()) || email.val() == '') {
      alert('Required Email field');
      email.focus();
      return false;
    } else if (phone.val() == '') {
      alert('Required Phone field');
      phone.focus();
      return false;
    } else if (type.val() == '') {
      alert('Required Type of Work field');
      type.focus();
      return false;
    } else if (msg.val() == '') {
      alert('Required Message field');
      msg.focus();
      return false;
    } else {
      alert('Loading... Please wait.');
      return true;
    }
  }

});