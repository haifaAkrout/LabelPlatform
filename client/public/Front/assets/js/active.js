var window, document, jQuery;
(function ($) {
    "use strict";
	
    function sliders() {
        if ($.fn.owlCarousel) {
            $('.header-wrapper').owlCarousel({
                items: 1,
                loop: true,
                smartSpeed: 1000,
                autoplay: true,
                dots: false
            });
            
            $(".header-wrapper").on("translate.owl.carousel", function(){
                $(".single-slide h1, .single-slide p, .slide-images img").removeClass("animated fadeInUp").css("opacity", "0");
                $(".single-slide span").removeClass("animated fadeInDown").css("opacity", "0");
            });

            $(".header-wrapper").on("translated.owl.carousel", function(){
                $(".single-slide h1, .single-slide p, .slide-images img").addClass("animated fadeInUp").css("opacity", "1");
                $(".single-slide span").addClass("animated fadeInDown").css("opacity", "1");
            });
            
            
            
            $('.serivce-wrapper').owlCarousel({
                items: 3,
                loop: true,
                smartSpeed: 1000,
                autoplay: true,
                nav: false,
                dots:true,
                dotsEach: true,
                margin:30,
				responsiveClass:true,
				responsive:{
					992:{
						items:3
					},
					768:{
						items:3
					},
					320:{
						items:1,
					
					}
				}
            });
            
            $('.tst_slider').owlCarousel({
                items: 1
            });

            $('.brand-wrapper').owlCarousel({
                items: 5,
				loop: true,
				responsiveClass:true,
				responsive:{
					992:{
						items:5
					},
					768:{
						items:3
					},
					320:{
						items:2,
						margin:20
					}
				}
            });
            
            $('.teastimonial-slide').owlCarousel({
                items: 1,
				nav: true,
				loop: true,
                dots: false,
				margin: 30,
				navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });
			$('.tastimonal-wrapper').owlCarousel({
                items: 2,
				nav: true,
				loop: true,
				margin: 30,
                dots: false,
				navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
				responsiveClass:true,
				responsive:{
					768:{
						nav: false,
					},
					320:{
					  nav: false,
					  items: 1
					}
				}
            });
        }
    }

    function plugins() {
    

        $('nav ul.menu').slicknav({
            appendTo: '.menu_col'
        });

        if ($.fn.barfiller) {
            $('.barfiller').each(function () {
                $(this).barfiller();
            });
        }

        if ($.fn.counterUp) {
            $('.counter').each(function () {
                $(this).counterUp();
            });
        }
        
        $(".digitas-project-categories li").on('click', function () {
            $(".digitas-project-categories li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr("data-filter");
            $(".all-projects-isotope").isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                }
            });
        });
        
        
        
        $("#sticker").sticky({topSpacing:0});
        
    }



    function pluginsWl() {

        $('.masonry-wrap').masonry({
            itemSelector: '.masonry-grid'
        });
        
		$(".js-modal-btn").modalVideo();
		$('#nav').onePageNav();
    }

    function customCode() {
        $('.sub-menu').siblings('a').addClass('sub-siblings');
        $('.mega-menu').siblings('a').closest('li').addClass('mega-par');
        $('.search_icon, .search_close').click(function () {
            $('.search_form').toggleClass('active');
        });

        $('.mega-menu').siblings('a').closest('li').on('click', function () {
            $('this').find('.menu-column').css('display', 'block');
        });
    }

    function heightConfig() {

        //        var sth = -1;
        //        $('.sth').each(function () {
        //            if ($(this).height() > sth) {
        //                sth = $(this).height();
        //            }
        //        });
        //        $('.sth').height(sth);
        //        
    }


    $(document).ready(function () {
        plugins();
        customCode();
        sliders();
        heightConfig();
    });

    $(window).on('load', function () {
        
		$("#loading").fadeOut(700);
        heightConfig();
        pluginsWl();
        
        
        
        
      jQuery('.digitas-all-projects').masonry({
                // options...
                itemSelector: '.single-digitas-project-wrap',
                columnWidth: 0
            });
        
            jQuery('.digitas-all-projects').isotope({
                itemSelector: '.single-digitas-project-wrap',
                filter: '*'
            });
            
          jQuery('.home-2-portfolio-menu li').click(function(){
                
                var selector = $(this).attr('data-filter');
                
                jQuery('.digitas-all-projects').isotope({

                    filter: selector

                });
                
            });
        
        
        
        
        
    });


})(jQuery);
