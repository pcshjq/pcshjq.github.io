$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (Parse.User.current()) {
        $('.dropdown-toggle').html('<i class="glyphicon glyphicon-user"  style="color:lightseagreen"></i> ' + Parse.User.current().get('displayname') + ' <span class="caret">');
    } else {
        $('.dropdown').html('<a href="../login/" role="button">登入</a>');
    }
    // Context
    $('#announcement .panel-body').load('../dcl/Join_Us.txt');
    $('#declaration #collapse1 .panel-body').load('../dcl/Terms_of_Service.txt');
    $('#declaration #collapse2 .panel-body').load('../dcl/Privacy_Policy.txt');
    // Console
    if (typeof console == "object") {
        if (navigator.userAgent.match(/Chrome/)) console.log("%c看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!", "color: #ff5722; font-size: 25px;");
        else console.log("看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!");
    }
});