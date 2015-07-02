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
