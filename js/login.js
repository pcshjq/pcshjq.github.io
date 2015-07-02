$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (Parse.User.current()) window.location.href = './upload.html';
});

$(document).ready(function () {
    $('.form-signin').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
        Parse.User.logIn(username, password, {
            success: function (user) {
                console.log('success');
                window.location.href = './upload.html';
            },
            error: function (user, error) {
                console.log(error);
            }
        });
    });
});
