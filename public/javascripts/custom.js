(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function ($, root, undefined) {

    $(function () {

        'use strict';

        var apihost = 'https://reneza.com/api';

        var errorCount = 0;

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        /**
         * @param {string} phone
         */
        function validatePhone(phone) {
            let phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return phoneReg.test(phone);
        }

        /**
         * Name and surname separeted by space
         * @param {string} value
         */
        function validateNameAndSurname(value) {
            var nameReg = /^[a-zA-Z0-9_]+( )+[a-zA-Z0-9_]+$/;
            return nameReg.test(value);
        }

        function validateText(text) {
            return text.length > 0;
        }


        function validateCheckbox(checkbox) {
            return checkbox.is(':checked');
        }


        var validateInput = function ($input) {

            var inputVal = $input.val();

            if ($input.attr('type') == 'text') {
                if (validateText(inputVal) == false) {
                    if (!$input.hasClass('has-error')) {
                        errorCount += 1;
                    }
                    $input.addClass('has-error');
                } else {
                    if ($input.hasClass('has-error')) {
                        errorCount -= 1;
                    }
                    $input.removeClass('has-error');
                }
            }

            if ($input.attr('type') == 'email') {
                if (validateEmail(inputVal) == false) {
                    if (!$input.hasClass('has-error')) {
                        errorCount += 1;
                    }
                    $input.addClass('has-error');
                } else {
                    if ($input.hasClass('has-error')) {
                        errorCount -= 1;
                    }
                    $input.removeClass('has-error');
                }
            }

            if ($input.attr('type') == 'checkbox') {
                validateCheckbox($input);
                if (validateCheckbox($input)) {
                    if ($input.hasClass('has-error')) {
                        errorCount -= 1;
                    }
                    $input.removeClass('has-error');
                } else {
                    if (!$input.hasClass('has-error')) {
                        errorCount += 1;
                    }
                    $input.addClass('has-error');
                }
            }


            if ($input.attr('type') == 'radio') {

                var $parent = $input.closest('.input-wrapper');
                var inputName = $input.attr('name');

                if ($input.length == 1) {

                    if ($input.is(':checked')) {
                        $('input[type=radio][name=' + inputName + ']').removeClass('has-error');

                        if ($parent.hasClass('error')) {
                            $parent.removeClass('error');
                            errorCount -= 1;
                        }

                    } else {
                        $('input[type=radio][name=' + inputName + ']').addClass('has-error');

                        if (!$parent.hasClass('error')) {
                            $parent.addClass('error');
                            errorCount += 1;
                        }

                    }

                } else if ($input.length > 1) {

                    if (!$('input[type=radio][name=' + inputName + ']').is(':checked')) {
                        $input.each(function () {
                            $(this).addClass('has-error');
                        });
                        if (!$parent.hasClass('error')) {
                            $parent.addClass('error');
                            errorCount += 1;
                        }
                    } else {
                        $input.each(function () {
                            $(this).removeClass('has-error');
                        });
                        if ($parent.hasClass('error')) {
                            $parent.removeClass('error');
                            errorCount -= 1;
                        }
                    }

                }

            }

            if ($input.attr('type') == 'phone') {
                if (!validatePhone(inputVal)) {
                    if (!$input.hasClass('has-error')) {
                        errorCount += 1;
                    }
                    $input.addClass('has-error');
                } else {
                    if ($input.hasClass('has-error')) {
                        errorCount -= 1;
                    }
                    $input.removeClass('has-error');
                }
            }

            if ($input.attr('type') == 'name-surname') {
                if (!validateNameAndSurname(inputVal)) {
                    if (!$input.hasClass('has-error')) {
                        errorCount += 1;
                    }
                    $input.addClass('has-error');
                } else {
                    if ($input.hasClass('has-error')) {
                        errorCount -= 1;
                    }
                    $input.removeClass('has-error');
                }
            }

        }


        var validateSelect = function ($select) {
            var selectVal = $select.val();

            if (!selectVal) {
                if (!$select.hasClass('has-error')) {
                    errorCount += 1;
                }
                $select.addClass('has-error');
            } else {
                if ($select.hasClass('has-error')) {
                    errorCount -= 1;
                }
                $select.removeClass('has-error');
            }

        }


        var validateTextArea = function ($textarea) {
            var text = $textarea.val();

            if (validateText(text) == false) {
                if (!$textarea.hasClass('has-error')) {
                    errorCount += 1;
                }
                $textarea.addClass('has-error');
            } else {
                if ($textarea.hasClass('has-error')) {
                    errorCount -= 1;
                }
                $textarea.removeClass('has-error');
            }

        }


        var validateInputWrapper = function ($inputWrapper) {

            var $input = $inputWrapper.find('input');
            var $select = $inputWrapper.find('select');
            var $textarea = $inputWrapper.find('textarea');

            //input
            if ($input.length > 0 && $input.prop('required')) {
                validateInput($input);
            }

            //select
            if ($select.length > 0 && $select.prop('required')) {
                validateSelect($select);
            }

            //textarea
            if ($textarea.length > 0 && $textarea.prop('required')) {
                validateTextArea($textarea);
            }

        }

        $('.popup-after-form').on('click', function(event) {

            var checkValue = $(this).parent().parent().find('input').val();
            var checkClass = $(this).parent().parent().find('input').attr('class');

            if(checkClass !== 'has-error' && checkValue !== '') {
                activatePopup('sign-up-popup-tenant');
            } else {

            }

            //event.preventDefault();
        });

        /*$('.open-tour').on('click', function(event) {

            $('.tour-content > div').removeClass('active');
            $('.menu-items-wrapper .menu li a').removeClass('highlight');
            $('.menu-mobile-training li a').removeClass('highlight');
            $('.tour-content > div .image').removeClass('active');
            $('.tour-content > div.tour-popup--main').addClass('active');

            $('html, body').addClass('noscroll');
            $('.tour').addClass('active');
            $('.tour .menu-trigger2').addClass('active');

            event.preventDefault();

        });*/

        $('.menu-trigger2').on('click', function(event) {

            $('html, body').removeClass('noscroll');
            $('.tour').removeClass('active');

            $('.index-steps .image-wrapper .image:nth-child(1)').addClass('active');
            $('.di0').addClass('open');
            $('.index-steps-on li:first-child').addClass('active');

            event.preventDefault();
        });

        var $window = $(window);

        function checkWidth() {
            var windowsize = $window.width();

            return windowsize;
        }

        $(window).resize(checkWidth);

        $('.training-menu li a').on('click', function(event) {

            var goTo = $(this).data('steps');

            $('input[name="current_slider"]').val(goTo);

            $('.tour-content > div').removeClass('active');
            $('.menu-items-wrapper .menu li a').removeClass('highlight');
            $('.menu-mobile-training li a').removeClass('highlight');
            $('.tour-content > div .image').removeClass('active');

            if(goTo == 'onboarding') {
                $('.menu-items-wrapper .menu li:nth-child(1) a').addClass('highlight');
                $('.menu-mobile-training li:nth-child(1) a').addClass('highlight');
            }

            if(goTo == 'payments') {
                $('.menu-items-wrapper .menu li:nth-child(2) a').addClass('highlight');
                $('.menu-mobile-training li:nth-child(2) a').addClass('highlight');
            }

            if(goTo == 'maintanance') {
                $('.menu-items-wrapper .menu li:nth-child(3) a').addClass('highlight');
                $('.menu-mobile-training li:nth-child(3) a').addClass('highlight');
            }

            $('.tour-content > div.tour-popup--'+goTo+' .faq-question').removeClass('open');
            $('.tour-content > div.tour-popup--'+goTo+' .faq-question > .bottom').hide();

            $('.tour-content > div.tour-popup--'+goTo+' .faq-question:nth-child(1)').addClass('open');
            $('.tour-content > div.tour-popup--'+goTo+' .faq-question:nth-child(1) > .bottom').show();

            var imgNr = $('.tour-content > div.tour-popup--'+goTo+' .faq-question:nth-child(1)').data('image');
            $('.tour-content > div.tour-popup--'+goTo+' .image.imgnr'+imgNr).addClass('active');

            if(checkWidth() <= 640) {
                $('.tour-content > div.tour-popup--'+goTo+' .mobile-steps-nav li:nth-child(1)').addClass('active');
            }

            $('.tour-content > div.tour-popup--'+goTo).addClass('active');

            event.preventDefault();
        });

        $('.open-trainings li a').on('click', function(event) {

            $('html').addClass('noscroll');
            $('.tour').addClass('active');
            $('.tour .menu-trigger2').addClass('active');

            var goTo = $(this).data('steps');

            $('input[name="current_slider"]').val(goTo);

            $('.tour-content > div').removeClass('active');
            $('.menu-items-wrapper .menu li a').removeClass('highlight');
            $('.tour-content > div .image').removeClass('active');

            if(goTo == 'onboarding') {
                $('.menu-items-wrapper .menu li:nth-child(1) a').addClass('highlight');
            }

            if(goTo == 'payments') {
                $('.menu-items-wrapper .menu li:nth-child(2) a').addClass('highlight');
            }

            if(goTo == 'maintanance') {
                $('.menu-items-wrapper .menu li:nth-child(3) a').addClass('highlight');
            }

            $('.tour-content > div.tour-popup--'+goTo+' .faq-question').removeClass('open');
            $('.tour-content > div.tour-popup--'+goTo+' .faq-question > .bottom').hide();

            $('.tour-content > div.tour-popup--'+goTo+' .faq-question:nth-child(1)').addClass('open');
            $('.tour-content > div.tour-popup--'+goTo+' .faq-question:nth-child(1) > .bottom').show();

            var imgNr = $('.tour-content > div.tour-popup--'+goTo+' .faq-question:nth-child(1)').data('image');
            $('.tour-content > div.tour-popup--'+goTo+' .image.imgnr'+imgNr).addClass('active');

            if(checkWidth() <= 640) {
                $('.tour-content > div.tour-popup--'+goTo+' .mobile-steps-nav li:nth-child(1)').addClass('active');
            }

            $('.tour-content > div.tour-popup--'+goTo).addClass('active');

            event.preventDefault();
        });


        $(document).on('keyup change', '.input-wrapper input[required]', function () {
            validateInput($(this));
        });

        $(document).on('change', '.input-wrapper select', function () {
            validateSelect($(this));
        });

        $(document).on('keyup change', '.input-wrapper textarea', function () {
            validateTextArea($(this));
        });


        var validateForm = function (form) {
            $(form).find('.input-wrapper').each(function () {
                validateInputWrapper($(this));
            });
        }


        $('.popup-wrapper.check-your-rank form, .dashboard-invite-form').on('submit', function (e) {
            validateForm(this);
            if (errorCount != 0) {
                e.preventDefault();
            } else {
                console.log('current form valid, do something etc');
                e.preventDefault();
            }
        });

        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, 1500, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex','-1');
                            $target.focus();
                        };
                    });
                }
            }
        });

        $('.select-input').niceSelect();


        if($('#letting-slider').length > 0) {
            var lettingSlider =  document.getElementById('letting-slider');

            noUiSlider.create(lettingSlider, {
                start: 14,
                step: 1,
                tooltips: false,
                connect: [true, false],
                range: {
                    'min': 1,
                    'max': 25
                },
                format: wNumb({
                    decimals: 0,
                })
            });

            lettingSlider.noUiSlider.on('update', function( values, handle ) {

                var value = values[handle];

                $('.sum').html(value + '%');
                $('.sum').data('suma', value);

                var property_location = $('select[name="property_location"]').val();
                var monthly_income    = $('input[name="monthly_income"]').val();
                var properties        = $('select[name="properties"]').val();
                var letting_fee       = parseInt($('.sum').data('suma')) / 100;

                var estate_fee;
                var reneza_fee;
                var annual_savings;

                if(!$.isNumeric($('input[name="monthly_income"]').val())) {
                    $('.main-price').html('-');
                    $('.estate_fee').html('-');
                    $('.reneza_fee').html('-');
                } else {
                    if(property_location == 'london') {
                        // estate_fee = (parseInt(monthly_income) * 12 * letting_fee);
                        estate_fee = ((parseInt(monthly_income) * letting_fee) * 12) * parseInt(properties);
                        reneza_fee = (59 * 12) * parseInt(properties);
                        annual_savings = estate_fee - reneza_fee;

                        $('.main-price').html('£'+parseInt(annual_savings));
                        $('.estate_fee').html('£'+parseInt(estate_fee));
                        $('.reneza_fee').html('£'+parseInt(reneza_fee));
                    } else {
                        // estate_fee = (((parseInt(monthly_income) * letting_fee) * 12) + parseInt(monthly_income) ) * parseInt(properties);
                        estate_fee = ((parseInt(monthly_income) * letting_fee) * 12) * parseInt(properties);
                        reneza_fee = (39 * 12) * parseInt(properties);
                        annual_savings = estate_fee - reneza_fee;

                        $('.main-price').html('£'+parseInt(annual_savings));
                        $('.estate_fee').html('£'+parseInt(estate_fee));
                        $('.reneza_fee').html('£'+parseInt(reneza_fee));
                    }
                }

            });
        }

        setTimeout(function() {
            $('.mini-menu').addClass('active');
         }, 1000);


        if($('#select-container').length > 0) {
            var toggle = document.getElementById('select-container');
            var toggleContainer = document.getElementById('toggle-container');
            var toggleNumber;

            toggle.addEventListener('click', function() {
                toggleNumber = !toggleNumber;
                if (toggleNumber) {
                    toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
                    toggleContainer.style.webkitClipPath  = 'inset(0 0 0 50%)';
                    toggleContainer.style.backgroundColor = '#f5f6f8';
                    $('input[name="pricing"]').val('hmo');

                    var months = $('input[name="month-an"]:checked').length > 0;

                    if(months == true) {
                        // annually
                        $('.price span').html('per room');
                        $('.price2 span').html('per room');
                    } else {
                        // monthly
                        $('.price span').html('pcm per room');
                        $('.price2 span').html('pcm per room');
                    }

                   $('.pricing-section .pricing-text').html('HMO license is required. Reneza will carry an HMO inspection for £100.');
                } else {
                    toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
                    toggleContainer.style.webkitClipPath = 'inset(0 50% 0 0)';
                    toggleContainer.style.backgroundColor = '#f5f6f8';
                    $('input[name="pricing"]').val('single');

                    var months = $('input[name="month-an"]:checked').length > 0;

                    if(months == true) {
                        // annually
                        $('.price span').html('pcm');
                        $('.price2 span').html('');
                    } else {
                        // monthly
                        $('.price span').html('pcm');
                        $('.price2 span').html('pcm');
                    }

                    $('.pricing-section .pricing-text').html('No upfront fees, no lock-in contracts and you decide how much we manage');
                }

            });
        }


        $('#dn').on('change', function(event) {

            var checked = $('#dn:checked').length > 0;

            if(checked == true) {
                $('.price').fadeOut(500, function() {
                    // annually
                    $('.price2').fadeIn(500);
                    var months = $('input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.price span').html('per room');
                        $('.price2 span').html('per room');
                    } else {
                        // single
                        $('.price span').html('pcm');
                        $('.price2 span').html('');
                    }
                });
            } else {
                $('.price2').fadeOut(500, function() {
                    // monthly
                    $('.price').fadeIn(500);
                    var months = $('input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.price span').html('pcm per room');
                        $('.price2 span').html('pcm per room');
                    } else {
                        // single
                        $('.price span').html('pcm');
                        $('.price2 span').html('pcm');
                    }
                });
            }

            event.preventDefault();
        });

        // ONBOARDING
        $('#dn2').on('change', function(event) {

            var checked = $('#dn2:checked').length > 0;

            if(checked == true) {
                $('.switch_landlord_onboarding .price').fadeOut(500, function() {
                    // annually
                    $('.switch_landlord_onboarding .price2').fadeIn(500);
                    var months = $('.switch_landlord_onboarding input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.switch_landlord_onboarding .price span').html('per room');
                        $('.switch_landlord_onboarding .price2 span').html('per room');
                    } else {
                        // single
                        $('.switch_landlord_onboarding .price span').html('pcm');
                        $('.switch_landlord_onboarding .price2 span').html('');
                    }
                });
            } else {
                $('.switch_landlord_onboarding .price2').fadeOut(500, function() {
                    // monthly
                    $('.switch_landlord_onboarding .price').fadeIn(500);
                    var months = $('.switch_landlord_onboarding input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.switch_landlord_onboarding .price span').html('pcm per room');
                        $('.switch_landlord_onboarding .price2 span').html('pcm per room');
                    } else {
                        // .switch_landlord_onboardingsingle
                        $('.switch_landlord_onboarding .price span').html('pcm');
                        $('.switch_landlord_onboarding .price2 span').html('pcm');
                    }
                });
            }

            event.preventDefault();
        });

        // PAYMENTS
        $('#dn3').on('change', function(event) {

            var checked = $('#dn3:checked').length > 0;

            if(checked == true) {
                $('.switch_landlord_payment .price').fadeOut(500, function() {
                    // annually
                    $('.switch_landlord_payment .price2').fadeIn(500);
                    var months = $('.switch_landlord_payment input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.switch_landlord_payment .price span').html('per room');
                        $('.switch_landlord_payment .price2 span').html('per room');
                    } else {
                        // single
                        $('.switch_landlord_payment .price span').html('pcm');
                        $('.switch_landlord_payment .price2 span').html('');
                    }
                });
            } else {
                $('.switch_landlord_payment .price2').fadeOut(500, function() {
                    // monthly
                    $('.switch_landlord_payment .price').fadeIn(500);
                    var months = $('.switch_landlord_payment input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.switch_landlord_payment .price span').html('pcm per room');
                        $('.switch_landlord_payment .price2 span').html('pcm per room');
                    } else {
                        // .switch_landlord_onboardingsingle
                        $('.switch_landlord_payment .price span').html('pcm');
                        $('.switch_landlord_payment .price2 span').html('pcm');
                    }
                });
            }

            event.preventDefault();
        });

        // MANAGENT
        $('#dn4').on('change', function(event) {

            var checked = $('#dn4:checked').length > 0;

            if(checked == true) {
                $('.switch_landlord_managent .price').fadeOut(500, function() {
                    // annually
                    $('.switch_landlord_managent .price2').fadeIn(500);
                    var months = $('.switch_landlord_managent input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.switch_landlord_managent .price span').html('per room');
                        $('.switch_landlord_managent .price2 span').html('per room');
                    } else {
                        // single
                        $('.switch_landlord_managent .price span').html('pcm');
                        $('.switch_landlord_managent .price2 span').html('');
                    }
                });
            } else {
                $('.switch_landlord_managent .price2').fadeOut(500, function() {
                    // monthly
                    $('.switch_landlord_managent .price').fadeIn(500);
                    var months = $('.switch_landlord_managent input[name="pricing"]').val();

                    if(months == 'hmo') {
                        // hmo
                        $('.switch_landlord_managent .price span').html('pcm per room');
                        $('.switch_landlord_managent .price2 span').html('pcm per room');
                    } else {
                        // .switch_landlord_onboardingsingle
                        $('.switch_landlord_managent .price span').html('pcm');
                        $('.switch_landlord_managent .price2 span').html('pcm');
                    }
                });
            }

            event.preventDefault();
        });


        // calculate prices
        $('#calculator-prices select').on('change', function(event) {

            var property_location = $('select[name="property_location"]').val();
            var monthly_income    = $('input[name="monthly_income"]').val();
            var properties        = $('select[name="properties"]').val();
            var letting_fee       = parseInt($('.sum').data('suma')) / 100;

            var estate_fee;
            var reneza_fee;
            var annual_savings;

            if(!$.isNumeric($('input[name="monthly_income"]').val())) {
                $('.main-price').html('-');
                $('.estate_fee').html('-');
                $('.reneza_fee').html('-');
            } else {
                if(property_location == 'london') {
                    // estate_fee = (parseInt(monthly_income) * 12 * letting_fee);
                    estate_fee = ((parseInt(monthly_income) * letting_fee) * 12) * parseInt(properties);
                    reneza_fee = (59 * 12) * parseInt(properties);
                    annual_savings = estate_fee - reneza_fee;

                    $('.main-price').html('£'+parseInt(annual_savings));
                    $('.estate_fee').html('£'+parseInt(estate_fee));
                    $('.reneza_fee').html('£'+parseInt(reneza_fee));
                } else {
                    // estate_fee = (((parseInt(monthly_income) * letting_fee) * 12) + parseInt(monthly_income) ) * parseInt(properties);
                    estate_fee = ((parseInt(monthly_income) * letting_fee) * 12) * parseInt(properties);
                    reneza_fee = (39 * 12) * parseInt(properties);
                    annual_savings = estate_fee - reneza_fee;

                    $('.main-price').html('£'+parseInt(annual_savings));
                    $('.estate_fee').html('£'+parseInt(estate_fee));
                    $('.reneza_fee').html('£'+parseInt(reneza_fee));
                }
            }

            event.preventDefault();
        });

        $('#calculator-prices input[name="monthly_income"]').keyup(function(event) {

            var property_location = $('select[name="property_location"]').val();
            var monthly_income    = $('input[name="monthly_income"]').val();
            var properties        = $('select[name="properties"]').val();
            var letting_fee       = parseInt($('.sum').data('suma')) / 100;

            var estate_fee = 0;
            var reneza_fee = 0;
            var annual_savings = 0;


            if(!$.isNumeric($('input[name="monthly_income"]').val())) {
                $('.main-price').html('-');
                $('.estate_fee').html('-');
                $('.reneza_fee').html('-');
            } else {
                if(property_location == 'london') {
                    // estate_fee = (parseInt(monthly_income) * 12 * letting_fee);
                    estate_fee = ((parseInt(monthly_income) * letting_fee) * 12) * parseInt(properties);
                    reneza_fee = (59 * 12) * parseInt(properties);
                    annual_savings = estate_fee - reneza_fee;

                    $('.main-price').html('£'+parseInt(annual_savings));
                    $('.estate_fee').html('£'+parseInt(estate_fee));
                    $('.reneza_fee').html('£'+parseInt(reneza_fee));

                    console.log(estate_fee);
                } else {
                    // estate_fee = (((parseInt(monthly_income) * letting_fee) * 12) + parseInt(monthly_income) ) * parseInt(properties);
                    estate_fee = ((parseInt(monthly_income) * letting_fee) * 12) * parseInt(properties);
                    reneza_fee = (39 * 12) * parseInt(properties);
                    annual_savings = estate_fee - reneza_fee;

                    $('.main-price').html('£'+parseInt(annual_savings));
                    $('.estate_fee').html('£'+parseInt(estate_fee));
                    $('.reneza_fee').html('£'+parseInt(reneza_fee));
                }
            }

            event.preventDefault();
        });

        //scroll to sections
        var scroller = function (scrollTo) {
            $('html,body').animate({
                scrollTop: $(".scroll-anchor-" + scrollTo).offset().top
            }, 750, $.bez([0.74, 0.09, 0.15, 0.99]));
        }

        $('.scroller').on('click', function (e) {
            e.preventDefault();
            var scrollTo = $(this).attr('data-scrollto');
            scroller(scrollTo);
        });

        //buttons animation

        $('.button').each(function () {
            $(this).on('mousemove', function (e) {
                var x = e.clientX - e.target.getBoundingClientRect().left;
                var y = e.clientY - e.target.getBoundingClientRect().top;
                $(this).get(0).style.setProperty('--x', x + 'px');
                $(this).get(0).style.setProperty('--y', y + 'px');
            });
        });

        $('.arrow-right').on('click', function(event) {

            if(!$(this).hasClass('active')) {
                $(this).addClass('active');

                var $container = $(this);
                var $activeQuestionNext = $(this).next().children().find('.open').data('image');
                var $activeQuestion = $(this).next().children().find('.open');
                var $allQuestion = $(this).next().children().find('.faq-question');

                var stepMin = $(this).data('minarrow');
                var stepMax = $(this).data('maxarrow');

                var newNumber = parseInt($activeQuestionNext) + 1;

                $activeQuestion.removeClass('open');
                $activeQuestion.find('.bottom').slideUp();

                $('.image-wrapper .image.active').removeClass('active');

                if(stepMax >= newNumber) {
                    $('.image-wrapper .image.imgnr'+newNumber).addClass('active');

                    if(checkWidth() <= 640) {
                        $('.mobile-steps-nav li').removeClass('active');
                        $('.mobile-steps-nav li.dq'+newNumber).addClass('active');
                    }

                    $allQuestion.each(function () {
                        var imageNumber = $(this).data('image');
                        var $thisContainer = $(this);

                        if(newNumber == imageNumber) {

                            if(checkWidth() <= 640) {
                                $(this).find('.bottom').hide(function () {
                                    $thisContainer.addClass('open');
                                });
                            } else {
                                $(this).find('.bottom').slideDown(function () {
                                    $thisContainer.addClass('open');
                                });
                            }

                            setTimeout(function() {
                                $($container).removeClass('active');
                            }, 400);
                        }
                    });
                } else {
                    $('.image-wrapper .image.imgnr'+stepMin).addClass('active');

                    if(checkWidth() <= 640) {
                        $('.mobile-steps-nav li').removeClass('active');
                        $('.mobile-steps-nav li.dq'+stepMin).addClass('active');
                    }

                    $allQuestion.each(function () {
                        var imageNumber = $(this).data('image');
                        var $thisContainer = $(this);

                        if(stepMin == imageNumber) {

                            if(checkWidth() <= 640) {
                                $(this).find('.bottom').hide(function () {
                                    $thisContainer.addClass('open');
                                });
                            } else {
                                $(this).find('.bottom').slideDown(function () {
                                    $thisContainer.addClass('open');
                                });
                            }

                            setTimeout(function() {
                                $($container).removeClass('active');
                            }, 400);
                        }
                    });
                }
            }

            event.preventDefault();
        });


        $('.arrow-left').on('click', function(event) {

            if(!$(this).hasClass('active')) {
                $(this).addClass('active');
                var $container = $(this);
                var $activeQuestionNext = $(this).next().next().children().find('.open').data('image');
                var $activeQuestion = $(this).next().next().children().find('.open');
                var $allQuestion = $(this).next().next().children().find('.faq-question');

                var stepMin = $(this).data('minarrow');
                var stepMax = $(this).data('maxarrow');

                var newNumber = parseInt($activeQuestionNext) - 1;

                $activeQuestion.removeClass('open');
                $activeQuestion.find('.bottom').slideUp();

                $('.image-wrapper .image.active').removeClass('active');

                if(stepMin <= newNumber) {
                    $('.image-wrapper .image.imgnr'+newNumber).addClass('active');

                    if(checkWidth() <= 640) {
                        $('.mobile-steps-nav li').removeClass('active');
                        $('.mobile-steps-nav li.dq'+newNumber).addClass('active');
                    }

                    $allQuestion.each(function () {
                        var imageNumber = $(this).data('image');
                        var $thisContainer = $(this);

                        if(newNumber == imageNumber) {

                            if(checkWidth() <= 640) {
                                $(this).find('.bottom').hide(function () {
                                    $thisContainer.addClass('open');
                                });
                            } else {
                                $(this).find('.bottom').slideDown(function () {
                                    $thisContainer.addClass('open');
                                });
                            }

                            setTimeout(function() {
                                $($container).removeClass('active');
                            }, 400);
                        }
                    });
                } else {
                    $('.image-wrapper .image.imgnr'+stepMax).addClass('active');

                    if(checkWidth() <= 640) {
                        $('.mobile-steps-nav li').removeClass('active');
                        $('.mobile-steps-nav li.dq'+stepMax).addClass('active');
                    }

                    $allQuestion.each(function () {
                        var imageNumber = $(this).data('image');
                        var $thisContainer = $(this);

                        if(stepMax == imageNumber) {

                            if(checkWidth() <= 640) {
                                $(this).find('.bottom').hide(function () {
                                    $thisContainer.addClass('open');
                                });
                            } else {
                                $(this).find('.bottom').slideDown(function () {
                                    $thisContainer.addClass('open');
                                });
                            }

                            setTimeout(function() {
                                $($container).removeClass('active');
                            }, 400);
                        }
                    });
                }
            }
            event.preventDefault();
        });

        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left

                var sectionName = $('input[name="current_slider"]').val();
                $('.tour-popup--'+sectionName+' .arrow-left').trigger('click');
                break;

                case 39: // right

                var sectionName = $('input[name="current_slider"]').val();
                $('.tour-popup--'+sectionName+' .arrow-right').trigger('click');
                break;


                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });

        //faq

        $('.faq-question .top').on('click', function () {

            var $question = $(this).closest('.faq-question');

            $('.faq-question.open').not($question).each(function () {
                var $this = $(this);
                $this.removeClass('open');
                $this.find('.bottom').slideUp();
            });

            if ($question.hasClass('open')) {
                $question.removeClass('open');
                $question.find('.bottom').slideUp();
            } else {
                $question.find('.bottom').slideDown(function () {
                    $question.addClass('open');
                });
            }

        });


        $('.swap-image').on('click', function () {

            var targetImage = parseInt($(this).attr('data-image'));

            $('.image-wrapper .image.active').removeClass('active');
            $($('.image-wrapper .image').get(targetImage)).addClass('active');
        });

        $('.index-steps .swap-image').on('click', function () {

            var targetImage = parseInt($(this).attr('data-image'));

            $('.index-steps .image-wrapper .image.active').removeClass('active');
            $($('.index-steps .image-wrapper .image').get(targetImage)).addClass('active');
        });



        //mobile questions

        $('.mobile-steps-nav li').on('click', function () {
            if (!$(this).hasClass('active')) {
                $('.mobile-steps-nav li').removeClass('active');
                $(this).addClass('active');

                var $targetQuestion = $($('.faq-question').get(parseInt($(this).attr('data-question'))));

                $('.faq-question.open').removeClass('open');
                $targetQuestion.addClass('open');

                $('.image-wrapper .image.active').removeClass('active');
                $($('.image-wrapper .image').get(parseInt($(this).attr('data-question')))).addClass('active');

            }
        });

        $('.index-steps-on li').on('click', function(event) {

            var dataImage = $(this).data('question');
            $('.index-steps-on li').removeClass('active');

            $(this).addClass('active');

            $('.open-faq-mobile-link .faq-question.open').removeClass('open');
            var $targetQuestion = $($('.open-faq-mobile-link .faq-question').get(parseInt($(this).attr('data-question'))));
            $targetQuestion.addClass('open');

            $('.index-steps .image-wrapper .image.active').removeClass('active');
            $($('.index-steps .image-wrapper .image').get(parseInt($(this).attr('data-question')))).addClass('active');

            console.log(dataImage);

            event.preventDefault();
        });



        //animations with 70% of window height

        var offset = window.innerHeight * 0.7;

        var osActive = function () {

            for (var i = 0; i < document.querySelectorAll('.e-in').length; i++) {

                var el = document.querySelectorAll('.e-in')[i];

                if (el.getBoundingClientRect().top < offset) {
                    if (!el.classList.contains('active')) {
                        el.classList.add('active');
                    }
                } else {
                    el.classList.remove('active');
                }

            }

        }

        if (document.querySelectorAll('.e-in').length > 0) {

            window.addEventListener('load', function () {
                osActive();
            });

            window.addEventListener('scroll', function () {
                osActive();
            });

        }


        //mobile menu

        $('.menu-trigger').on('click', function () {
            $(this).toggleClass('active');
            $('.menu-items-wrapper').toggleClass('active');
        });

        $('nav a').on('click', function () {
            $('.menu-trigger, .menu-items-wrapper').removeClass('active');
        });


        //scrolled navigation

        var navScroll = function () {
            if ($(window).scrollTop() > 0) {
                $('nav').addClass('scrolled');
            } else {
                $('nav').removeClass('scrolled');
            }
        }

        $(window).on('scroll', function () {
            navScroll();
        });

        navScroll();

        //hero animation

        if ($('.hero-animation').length) {

            var params = {
                container: $('.hero-animation').get(0),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'js/animation-info.json'
            };

            var anim;

            anim = lottie.loadAnimation(params);
        }



        var host = window.location.host;
        var currPath = window.location.pathname.split('/')[1];
        var links = document.querySelectorAll('nav a');
        links.forEach(function (link) {
            var linkString = link.href;
            if(typeof linkString === 'string' || linkString instanceof String) {
                if(link.href.indexOf(host) !== -1 && link.href.indexOf('#') === -1 ) {
                    var linkPathName = linkString.split(host + '/')[1];
                    if(linkPathName === currPath) {
                        link.classList.add('highlight');
                    }

                }
            }
        })
        // highlight


        //dashboard graphs

        var circleGraphModule = {};

        circleGraphModule.init = function ($circle) {

            //create svg
            $circle.append('<svg fill="none" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke-width="6"> <circle stroke="#FEFEFE" cx="40" cy="40" r="37"></circle> <circle cx="40" cy="40" r="37"></circle> </g> </svg>')

            var percentageText = parseInt($circle.attr('data-percentage'));
            var mainColour = $circle.attr('data-colour');
            var bgColour = $circle.attr('data-bgcolor');

            $el1 = $circle.find('circle:first-of-type');
            $el2 = $circle.find('circle:last-of-type');

            $el1.css('stroke', bgColour);
            $el2.css('stroke', mainColour);

            var dashOffset = parseInt($el2.css('stroke-dashoffset'));

            $circle.on('enable', function () {
                $(this).addClass('active');
                $el1 = $circle.find('circle:first-of-type');
                $el2 = $circle.find('circle:last-of-type');

                dashOffset = parseInt($el2.css('stroke-dashoffset'));
                targetOffset = dashOffset - dashOffset * (percentageText / 100);
                $el2.css('stroke-dashoffset', targetOffset);
            });

            $circle.on('disable', function () {
                $(this).removeClass('active');
            });

        }


        $('.circle-graph').each(function () {
            circleGraphModule.init($(this));
        });


        $('.graph').trigger('enable');



        /* popup functions */


        /* sign up popup steps */

        var $activePopup = 0;

        //signup popup steps
        var signupStep = 1;


        var signupStepChange = function () {

            $('.sign-up-popup .popup').removeClass('step-1 step-2 step-3 step-4');

            console.log('changing signup form step');

            if (signupStep !== 4) {
                signupStep += 1;
            } else if (signupStep == 4) {
                //close signup popup and open check your mail popup
                console.log('final signup step reached');
                //signupStep = 1;
                //$('.sign-up-popup .popup').removeClass('step-1 step-2 step-3');
                //closePopup();

                //activatePopup('')

            }

            $('.sign-up-popup .popup').addClass('step-' + signupStep);

        }


        $('.popup-step-link').on('click', function () {

            var targetStep = parseInt($(this).attr('data-step'));

            //allows to get back to previous steps
            if (targetStep < signupStep) {
                signupStep = targetStep - 1;
                signupStepChange();
            }

        });


        //when clicking 'change email address' it returns you back to step 1
        $('.sign-up-popup .change-email-address').on('click', function (e) {
            e.preventDefault();
            signupStep = 0;
            signupStepChange();
        });


        $('.sign-up-popup form').on('submit', function (e) {
            validateForm(this);
            console.log('validating signup form, error count: ' + errorCount);
            if (errorCount != 0) {
                e.preventDefault();
            } else {
                console.log('current form valid, do something etc');
                signupStepChange();
                e.preventDefault();
            }
        });


        // Get in touch form submit
        $(document).on('submit', 'form#get_in', function(e) {
            e.preventDefault();
            var data = {
                name: $(this).find('.name').val(),
                email: $(this).find('.email').val(),
                message: $(this).find('.message').val()
            };

            console.log(data);

            $.ajax(apihost + '/getInTouch', {
                data: JSON.stringify(data),
                contentType : 'application/json',
                type : 'POST',
                success: function(data, textStatus){
                    console.log('ye');
                    window.location.href = '/';
                },
                error: function(data, textStatus ){

                }
            });
        });

        $(document).on('submit', 'form.landlord', function(e) {
            e.preventDefault();
            var data = {
                email: $(this).find('.email').val()
            };

            console.log(data);

            $.ajax(apihost + '/tenant/contact', {
                data: JSON.stringify(data),
                contentType : 'application/json',
                type : 'POST',
                success: function(data, textStatus){
                    console.log('ye');
                    window.location.href = '/';
                },
                error: function(data, textStatus ){

                }
            });
        });

        $(document).on('submit', 'form.tenant', function(e) {
            e.preventDefault();
            var data = {
                email: $(this).find('.email').val(),
                isLandlord: false
            };

            $.ajax(apihost + '/contacts', {
                data: JSON.stringify(data),
                contentType : 'application/json',
                type : 'POST',
                success: function(data, textStatus){

                },
                error: function(data, textStatus ){

                }
            });
        });



        $('.sign-up-popup-step.step-3-content .step-change').on('click', function (e) {
            signupStepChange();
        });


        var closePopup = function () {
            $('body').removeClass('popup-open');

            //reset popup after closing it

            var $targetPopup = $activePopup;

            window.setTimeout(function () {
                signupStep = 1;
                $targetPopup.find('.popup').removeClass('step-1 step-2 step-3 step-4').addClass('step-1');
                $targetPopup.find('input').val('').prop('checked', false).removeClass('has-error');
                $targetPopup.find('.step-2-content .input-wrapper').removeClass('error');
                errorCount = 0;
            }, 700);

            $activePopup.removeClass('active');
        };


        $('.close-popup').on('click', function () {
            closePopup();
        });


        $('.popup-wrapper').on('click', function (e) {
            if ($(e.target).hasClass('popup-wrapper')) {
                closePopup();
            }
        });


        $(window).on('keydown', function (e) {
            if (e.keyCode == 27 && $activePopup.length > 0) {
                closePopup();
            }
        });


        var activatePopup = function (popup) {
            $('body').addClass('popup-open');
            $activePopup = $('.popup-wrapper.' + popup)
            $activePopup.addClass('active');
        };


        $('.opens-popup').on('click', function (e) {
            e.preventDefault();
            var targetPopup = $(this).attr('data-popup');
            activatePopup(targetPopup);
        });


        //lazyload

        $(function () {
            $('.lazy').Lazy();
        });


        //dashboard copy link

        $('.copy-link-button').on('click', function (e) {
            e.preventDefault();

            $linkInput = $('.link-input');

            $linkInput.attr('disabled', false);
            $linkInput.get(0).select();
            document.execCommand("copy");
            $linkInput.attr('disabled', true);

            var $container = $(this).closest('.link-wrapper');
            $container.addClass('tooltip-active');

            window.setTimeout(function () {
                $container.removeClass('tooltip-active');
            }, 1000);

        });


        //mobile dropdown menu

        $('.dropdown-opener').on('click', function () {

            if ($(window).width() < 640) {

                var $dropdown = $(this).parent().find('.dropdown-content');

                if ($dropdown.hasClass('visible')) {
                    $dropdown.stop().slideUp();
                    $dropdown.removeClass('visible');
                } else {
                    $dropdown.stop().slideDown(function () {
                        $dropdown.addClass('visible');
                    });
                }

            }

        });

    });

    $(window).on("load", function() {
        $('.hero').addClass('active');
        $('.pricing-section').addClass('active');
    });

})(jQuery, this);
},{}]},{},[1])
