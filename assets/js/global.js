$(document).ready(function () {

    /**
     * placeholder
     */
    (function () {

        var q = $('.q');
        var label = q.find('label');
        var input = q.find('input');

        if ($.trim(input.val()) === '') {
            label.removeClass('hidden');
        }

        input.focus(function () {
            label.addClass('hidden');
        }).blur(function () {
            if ($.trim(input.val()) === '') {
                label.removeClass('hidden');
            }
        });

        q.click(function () {
            input.focus();
        });

    })();

});