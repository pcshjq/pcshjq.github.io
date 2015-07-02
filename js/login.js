$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    // Session validation
    if (Parse.User.current()) {
        window.stop();
        window.location.href = './upload.html';
    }
    $('.control-label').hide();
    $('.form-signin').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
        Parse.User.logIn(username, password, {
            success: function (user) {
                window.location.href = './upload.html';
            },
            error: function (user, error) {
                $("input[name='password']").val('');
                $('.control-label').show();
                if (!$('.form-signin').hasClass('has-error'))
                    $('.form-signin').toggleClass('has-error');
                // console.log(error);
            }
        });
    });
});

window.fbAsyncInit = function () {
    FB.init({
        appId: '1675828652651130',
        xfbml: true,
        version: 'v2.3'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function FBLogin() {
    FB.login(function () { }, { scope: 'publish_actions' });
}