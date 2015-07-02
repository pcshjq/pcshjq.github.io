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

    $('#btnFB').click(function () {
        Parse.FacebookUtils.logIn(null, {
            success: function (user) {
                if (!user.existed()) {
                    console.log("User signed up and logged in through Facebook!");
                } else {
                    console.log("User logged in through Facebook!");
                }
                $('#btnFB').addClass('btn-success');
                window.location.href = './upload.html';
            },
            error: function (user, error) {
                $('#btnFB').addClass('btn-danger');
                console.log("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    });
});