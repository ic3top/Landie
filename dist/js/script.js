document.addEventListener("DOMContentLoaded", () => {
	// header
    var header = $('.header'),
	scrollPrev = 0;

    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
    
        if ( scrolled > 220 && scrolled > scrollPrev ) {
            header.addClass('out');
        } else {
            header.removeClass('out');
        }
        scrollPrev = scrolled;
    });

    // modal window
	$('.modal__close').on('click', () => {
		$('.overlay, #consultation, #thanks, #order').fadeOut('fast');
		document.body.classList.remove('overflow-hd');
	});

	$('.btn').each(function(i) {
		$(this).on('click', () => {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
			document.body.classList.add('overflow-hd');
		});
	});

	$(".modal__close").on("click", () => {
		$(".overlay, #thanks, #order").fadeOut("fast"); 
		document.body.classList.remove("overflow-hd");
    });

	// smooth scrolling
	$(function(){
        $("a[href^='#']").click(function(){
                const _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
	});

	// validate form
	function validateForms(selector) {
		$(selector).validate({
			rules: {
				name: {
					minlength: 2,
					required: true,
				},
				phone: "required",
				email: {
					required: true,
					email: true
				},
				check: {
					required: true,
				}
			},
			errorPlacement: function(error, element) {
				return 1;
			}
		});
	}
	validateForms(".modal__form");

	// masked iput
	$('input[name=phone]').mask("+9 999 999 99 999",{placeholder:"_", autoclear: false});

	// mailer
	$('form').submit(function(e) {
		e.preventDefault();
		// captcha
		if ($('input#captcha').val().length != 0) {
			console.error("denied");
			return false;
		}

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#order').fadeOut();
			$('.overlay, #thanks').fadeIn();
			

            $('form').trigger('reset');
        });
        return false;
	});

	// WOW
	new WOW().init();
});