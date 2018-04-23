/**
 * This simple class works to change the active element in the nav bar
 * Essentially it will underline the current page
 * Deprecated
 */

$(function() {
    $(".nav-link").click(function () {
        var whatClicked = ($(this).attr('id'));
        $(".nav-link").removeClass("active");
        $(this).addClass("nav-link active");
        //$(this).removeClass("nav-link");
    });
});