//Initialize your slider in your script file or an inline script tag
$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg" alt=""></button>',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        },
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  const toggleSlide = function (item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // ================ MODAL =================
  $('[data-modal="consultation"]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function () {
      $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });


  // ================ VALIDATE =================
  const validateForm = function (form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите ваше имя",
          minlength: jQuery.validator.format("Введите {0} или более символа!")
        },
        phone: "Пожалуйста, введите ваш номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту, чтобы мы смогли связаться с вами",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }

  validateForm('#consultation form');
  validateForm('#order form');
  validateForm('#consultation-form');


  // ================ MASK INPUT =================
  jQuery(function($){
    $("input[name=phone]").mask("+7 (999) 999-99-99");
  });

  // ================ FORM SUBMIT TO SERVER =================
  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });

    return false;
  });

  // =================== SMOOTH SCROLL ======================
  $(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  })

  // $('a[href^="#"]').click(function () {
  //   const _href = $(this).attr('href');
  //   $('html, body').animate({scrollTop: $(_href).offsetTop + 'px'});
  // });

  // WOW JS 
  new WOW().init();

});

