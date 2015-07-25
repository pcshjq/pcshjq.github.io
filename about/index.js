$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) {
        if (/msie/.test(navigator.userAgent.toLowerCase())) document.execCommand("Stop");
        else window.stop();
        window.location.href = '../login';
    }
    $('.dropdown-toggle').html('使用者: ' + Parse.User.current().get('displayname') + ' <span class="caret">');

    $.ajax({
        url: '../dcl/Terms_of_Service.txt',
        success: function (data) {
            $('#collapse1').html('<div class="panel-body"><pre>' + data + '</pre></div>');
        }
    });
    $.ajax({
        url: '../dcl/Privacy_Policy.txt',
        success: function (data) {
            $('#collapse2').html('<div class="panel-body"><pre>' + data + '</pre></div>');
        }
    });
    $.ajax({
        url: '../dcl/MIT.txt',
        success: function (data) {
            $('#collapse3').html('<div class="panel-body"><pre>' + data + '</pre></div>');
        }
    });
    $.ajax({
        url: '../dcl/BSD.txt',
        success: function (data) {
            $('#collapse4').html('<div class="panel-body"><pre>' + data + '</pre></div>');
        }
    });
});
