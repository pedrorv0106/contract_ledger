$(document).ready(function () {

    var currentStep = 1;

    $('.review').click(function () {
        $('.dashboard_home_context').hide(200);
        $('.breadcrumbs').show(200);
        $('.review_content').show(200);
    });

    $(".next-step").click(function () {

        $(".step-container .step-separator[data-step='" + currentStep + "']").addClass('active');

        $(".my_context").removeClass('active');

        if ($(".step-container .step[data-step='" + currentStep + "']").parent().hasClass('active')) {

            $(".step-container .step[data-step='" + currentStep + "']").parent().removeClass('active');

            $(".step-container .step[data-step='" + currentStep + "']").parent().addClass('success');
        }

        currentStep++;

        $(".my_context[data-step='" + currentStep + "']").addClass('active');

        $(".step-container .step[data-step='" + currentStep + "']").parent().addClass('active');

        if ($('.main_steps').last().hasClass('active')) {

            currentStep++;

            $('.main_steps').last().removeClass('active');

            $('.main_steps').last().addClass('success');
        }
    });

    $('.back').click(function () {

        $(".my_context[data-step='" + currentStep + "']").removeClass('active');

        $(".step-container .step[data-step='" + currentStep + "']").parent().removeClass('active');

        currentStep--;

        $(".my_context[data-step='" + currentStep + "']").addClass('active');

        $(".step-container .step-separator[data-step='" + currentStep + "']").removeClass('active');

        $(".step-container .step[data-step='" + currentStep + "']").parent().removeClass('success');

        $(".step-container .step[data-step='" + currentStep + "']").parent().addClass('active');

    });


    $('.select_property').click(function () {

        $('.page_title_text').text('INITIATE PURCHASE AGREEMENT TO SELLER', 200);

        $('#back').text('Previous page').append('<i class="fas fa-chevron-left"></i>');

    });

    $('.buyer_agreement').click(function () {
        window.location.reload();
    });

    $('.menu-item-has-children').click(function () {
        $('.menu-item-has-children').removeClass("active");
        $(this).addClass("active");
    });

    $('.menu-item-has-children>ul>li>a').click(function () {

        $('.menu-item-has-children>ul>li').removeClass('active');
        $(this).parent('li').addClass('active')
    });
});