var UserName = '';
window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId: '1675828652651130',
        status: false,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.3' // Graph API version
    });
    FB.getLoginStatus(function (response) {
        var user = Parse.User.current();
        if (Parse.FacebookUtils.isLinked(user) && response.status === 'connected') { // Parse FB user and FB authorized app(connected)
            FB.api('/me', function (response) {
                UserName = response.name;
                $('.dropdown-toggle').html('使用者: ' + UserName + ' <span class="caret">');
            });
        } else if (user) { // Parse Login
            UserName = user.getUsername();
            $('.dropdown-toggle').html('使用者: ' + UserName + ' <span class="caret">');
        }
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
    $("#collapse1").load("dcl/Privacy_Policy.txt");
    $("#collapse2").load("dcl/MIT.txt");
    $("#collapse3").load("dcl/BSD.txt");
});
