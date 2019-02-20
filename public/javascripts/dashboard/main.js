var linkText;

$(function () {

    var list = $('.js-dropdown-list');

    link = $('.js-link');

    link.click(function (e) {
        e.preventDefault();
        list.slideToggle(200);
    });

    list.find('li').click(function () {
        var text = $(this).html();
        var icon = '<i class="fas fa-caret-down"></i>';
        link.val(text);
        list.slideToggle(200);
        linkText = link.html();
        $('.main_search_product').show(200);
        $('.pagination_nav').show(200);
    });
});

var currentStep = 1;

$(document).ready(function () {

    //    search
    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("search");
        filter = input.value;
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    $('.add_job').click(function () {
        $('.current_job_context').toggle(200)
    });

//    open

    [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
        new SelectFx(el);
    });

    jQuery('.selectpicker').selectpicker;

    $('#menuToggle').on('click', function (event) {
        $('body').toggleClass('open');
    });

    $('.search-trigger').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('.search-trigger').parent('.header-left').addClass('open');
    });

    $('.search-close').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        $('.search-trigger').parent('.header-left').removeClass('open');
    });


    $('.close-btn').click(function (event) {
        jQuery('.video-player').removeClass('live');
        jQuery('.cover').addClass('backe');

        var $wrapper = jQuery('.video-wrapper');

        if ($wrapper.hasClass('video-playing')) {
            $wrapper.removeClass('video-playing');
        } else {
            $wrapper.addClass('video-playing');
        }

        player.pauseVideo();

        event.preventDefault();
    });

    $('.video-wrapper').on('click', function () {

        var video = jQuery(this).find('video').get(0);
        var $wrapper = jQuery(this);

        if ($wrapper.hasClass('video-playing')) {
            $wrapper.removeClass('video-playing');
        } else {
            $wrapper.addClass('video-playing');
        }

        jQuery('.video-player').addClass('live');

        player.playVideo();
        player.setPlaybackRate('hd1080');

        setTimeout(function () {
            jQuery('.cover').removeClass('backe');
        }, 1000);

        event.preventDefault();

    });

    $('.pause').on('click', function () {
        if (jQuery(this).hasClass('plays')) {
            jQuery(this).removeClass('plays').attr('src', 'img/pauze.png');
            player.playVideo();
        } else {
            jQuery(this).addClass('plays').attr('src', 'img/plays.png');
            player.pauseVideo();
        }
    });

    $('.mute').on('click', function () {
        if (jQuery(this).hasClass('unmute')) {
            jQuery(this).removeClass('unmute').attr('src', 'img/volume.png');
            player.unMute();
        } else {
            jQuery(this).addClass('unmute').attr('src', 'img/mute.png');
            player.mute();
        }
    });

    $('.books_input p').click(function () {
        $('.books_input p').removeClass('checked');
        $(this).addClass('checked')
    })
});

