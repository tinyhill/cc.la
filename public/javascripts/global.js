$(document).ready(function () {

    /**
     * 输入提示信息
     */
    function placeholder() {

        var label = $('.s label');
        var target = $('.s input');
        if ($.trim(target.val()) == '') {
            label.removeClass('hidden');
        }
        target.focus(function () {
            label.addClass('hidden');
        }).blur(function () {
            if ($.trim(target.val()) == '') {
                label.removeClass('hidden');
            }
        });

    }

    placeholder();

});