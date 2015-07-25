window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId: '1675828652651130', // Facebook App ID
        status: false,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.3' // Facebook Graph API version
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (Parse.User.current()) {
        if (navigator.userAgent.match(/Trident|MSIE/) != null) document.execCommand("Stop");
        else window.stop();
        window.location.href = '../upload/';
    }
    if (typeof console == "object") {
        if (navigator.userAgent.match(/Chrome/)) console.log("%c看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!", "color: #ff5722; font-size: 25px;");
        else console.log("看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!");
    }
    $('.control-label').hide();

    $('.form-signin').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
        Parse.User.logIn(username, password, {
            success: function (user) {
                $(":input[type='submit']").removeClass('btn-primary');
                $(":input[type='submit']").addClass('btn-success');
                window.name = user.getUsername();
                window.location.href = '../upload/';
            },
            error: function (user, error) {
                $("input[name='password']").val('');
                $('.control-label').show();
                if (!$('.form-signin').hasClass('has-error'))
                    $('.form-signin').toggleClass('has-error');
                console.log(error);
            }
        });
    });

    $('#btnFB').click(function () {
        Parse.FacebookUtils.logIn(null, {
            success: function (user) {
                /*if (!user.existed()) {
                    console.log("User signed up and logged in through Facebook!");
                } else {
                    console.log("User logged in through Facebook!");
                }*/
                $('#btnFB').removeClass('btn-info');
                $('#btnFB').addClass('btn-success');
                $('#btnFB').append('中...');
                FB.api('/me', function (response) {
                    window.name = response.name;
                    window.location.href = '../upload/';
                });
            },
            error: function (user, error) {
                $('#btnFB').removeClass('btn-info');
                $('#btnFB').addClass('btn-danger');
                // console.log("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    });
});
