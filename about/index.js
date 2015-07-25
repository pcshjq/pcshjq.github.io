$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) {
        if (navigator.userAgent.match(/Trident|MSIE/) != null) document.execCommand("Stop");
        else window.stop();
        window.location.href = '../login/';
    }
    if (typeof console == "object") {
        if (navigator.userAgent.match(/Chrome/)) console.log("%c看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!", "color: #ff5722; font-size: 25px;");
        else console.log("看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!");
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
