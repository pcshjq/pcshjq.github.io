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
    if (!Parse.User.current()) {
        window.stop();
        window.location.href = './login.html';
    }
    else {
        var uname;
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                FB.api('/me', function (response) { uname = response.name; });
                // var uid = response.authResponse.userID;
                // var accessToken = response.authResponse.accessToken;
            } else uname = Parse.User.current().getUsername();
        });
        $('.dropdown-toggle').append(uname + ' <span class="caret">');
    }
});
