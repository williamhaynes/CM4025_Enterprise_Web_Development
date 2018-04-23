/**
 * This simple class works to fix some css issues with displaying long page text
 */

$(function() {
    $("a").click(function () {
        var whatClicked = ($(this).attr('id'));
        //console.log(whatClicked);
        if(whatClicked == "privacyPolicy" || whatClicked == "register" || whatClicked == "loginPageRegisterButton") {
            $("body, html").css('height', 'auto');
            //console.log("Privacy Policy Clicked");
        }
        else {
            $("body, html").css('height', '100%');
            console.log("Something else clicked");
        }
    });

});