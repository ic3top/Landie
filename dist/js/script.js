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

	// Theme chooser
	const themes = {
		light: {
			"--main-color": "#111B47",
			"--sub-color": "#505F98",
			"--body-bg": "#ffffff",
			"--title-color": "#091133",
			"--btn-hover": "#505F98",
			"--logo-color": "#111B47",
			"--logo-hover": "#111B47",
			"--btn-clear-color": "#091133",
			"--close-color": "#111B47",
			"--descr-color": "#5D6970",
			"--footer-color": "#E7ECFF",
		},
		dark: {
			"--sub-color": "#d7e0f7",
			"--body-bg": "#045399",
			"--title-color": "#d7e0f7",
			"--btn-hover": "#424fff",
			"--logo-color": "#d7e0f7",
			"--logo-hover": "#d7e0f7",
			"--btn-clear-color": "#d7e0f7",
			"--close-color": "#111B47",
			"--descr-color": "#d5d0d9",
		},
	}

	let lastSelectedTheme = "light";
	const themeSelect = document.getElementById("slider");
	themeSelect.addEventListener("change", onThemeSelect)

	function onThemeSelect(e) {
		switch (lastSelectedTheme) {
			case "dark":
				lastSelectedTheme = "light"
				setTheme(lastSelectedTheme);
				break;
			case "light":
				lastSelectedTheme = "dark"
				setTheme(lastSelectedTheme);
				break;
		}
	}

	function setTheme(name) {
		const selectedThemeObj = themes[name];
		Object.entries(selectedThemeObj).forEach(([key, value]) => {
			document.documentElement.style.setProperty(key, value);
		});
	}

	
});