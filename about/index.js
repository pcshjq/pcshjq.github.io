$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) {
        if (/msie/.test(navigator.userAgent.toLowerCase())) document.execCommand("Stop");
        else window.stop();
        window.location.href = '../login/';
    }
    $('.dropdown-toggle').html('<i class="glyphicon glyphicon-user"  style="color:lightseagreen"></i> ' + Parse.User.current().get('displayname') + ' <span class="caret">');

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
});
