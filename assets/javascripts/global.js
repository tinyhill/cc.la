$(document).ready(function () {

    // 搜索框提示信息
    (function () {

        var s = $('.s');
        var label = s.find('label');
        var input = s.find('input');

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

        s.click(function () {
            input.focus();
        });

    })();

});