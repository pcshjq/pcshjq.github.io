$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) window.location.href = './login.html';
});

$(document).ready(function () {
    $('.dropdown-toggle').append(Parse.User.current().getUsername() + ' <span class="caret">');
});
