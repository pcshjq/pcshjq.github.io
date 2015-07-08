window.fbAsyncInit = function () {
    if (window.name != '') return;
    Parse.FacebookUtils.init({
        appId: '1675828652651130', // Facebook App ID
        status: false,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.3' // Facebook Graph API version
    });
    GetName();
    $('.dropdown-toggle').html('使用者: ' + window.name + ' <span class="caret">');
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/zh_TW/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function GetName() {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    var user = Parse.User.current();
    if (Parse.FacebookUtils.isLinked(user)) {
        FB.api('/me', function (response) {
            window.name = response.name;
        });
    } else if (user) {
        window.name = user.getUsername();
    }
};
