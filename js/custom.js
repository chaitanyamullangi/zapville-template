jQuery(document).ready(function($) {

    // Preloader
    // Use this properly. This is just a hack to replicate the loader at the begining
    // $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
    });
    // });

    // Hero rotating texts
    $("#hero .rotating").Morphext({
        animation: "flipInX",
        separator: ",",
        speed: 3000
    });

    // Initiate the wowjs
    new WOW().init();

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 'fast',
        delay: 300
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('<nav id="mobile-nav"></nav>');
        $mobile_nav.append($('.location-signin-wrap').clone());
        $mobile_nav.append($('<div class="clearfix"></div>'));
        $mobile_nav.append($('#nav-menu-left > ul').clone());
        $mobile_nav.append($('#nav-menu-container > .nav-menu').clone());
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Stick the header at top on scroll
    $("#header").sticky({
        topSpacing: 0,
        zIndex: '50'
    });

    // Back to top button
    $(window).scroll(function() {

        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }

    });

    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // FILE UPLOAD LOGIC
    //
    $('#uploadImage').change(function(event) {
        var files = event.target.files,
            file;
        if(!files.length) {
            // NO File has been selected
            return;
        }
        // file[0], Holds the file object now. Make a logic to preserve the file to upload while form submit.
        // For now just putting the file name in text field.
        file = files[0];
        $('.inputfileName').val(file.name);
    });

});
