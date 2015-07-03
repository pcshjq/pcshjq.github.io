window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId: '1675828652651130', // Facebook App ID
        status: false,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.3' // Facebook Graph API version
    });
    $(document).trigger('FBSDKLoaded');
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

    $(document).bind('FBSDKLoaded', function () {
        console.log('FB loaded')
        if (Parse.User.current()) {
            var uname;
            if (Parse.FacebookUtils.isLinked(Parse.User.current()))
                FB.api('/me', function (response) { uname = response.name; });
            else uname = Parse.User.current().getUsername();
            $('.dropdown-toggle').append(uname + ' <span class="caret">');
        } else {
            window.stop();
            window.location.href = './login.html';
        }
    });

    $('.alert').hide();
    $("#photo_front").fileinput({
        showUpload: false,
        previewFileType: "image",
        browseClass: "btn btn-success",
        browseLabel: " 上傳店家正面照",
        browseIcon: '<i class="glyphicon glyphicon-picture"></i>',
        removeClass: "btn btn-danger",
        removeLabel: " 刪除",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
    });
    $("#photo_menu").fileinput({
        showUpload: false,
        previewFileType: "image",
        browseClass: "btn btn-success",
        browseLabel: " 上傳菜單",
        browseIcon: '<i class="glyphicon glyphicon-picture"></i>',
        removeClass: "btn btn-danger",
        removeLabel: " 刪除",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
    });

    $('.row').on('submit', function (e) {
        e.preventDefault();
        var tShop = Parse.Object.extend('tShop', {
            create: function (name, address, telephone, business_hours) {
                $(':input').prop('disabled', true);
                $('.file-control').fileinput('disable');

                if ($('.alert').hasClass('alert-success')) $('.alert').toggleClass('alert-success');
                if ($('.alert').hasClass('alert-danger')) $('.alert').toggleClass('alert-danger');
                $('.alert').toggleClass('alert-info');
                $('.alert').show();
                $('.alert').text('上傳中...');

                this.save({
                    'name': name,
                    'address': address,
                    'telephone': telephone,
                    'business_hours': business_hours,
                    'contributor': $('#cbAnonym').prop('checked') ? 'Anonymous' : Parse.User.current().getUsername()
                }, {
                    success: function (upload) {
                        $('.alert').toggleClass('alert-info');
                        $('.alert').toggleClass('alert-success');
                        $('.alert').text('上傳成功 :)');
                        var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                        $close.appendTo($('.alert'));

                        $(':input').prop('disabled', false);
                        $('.file-control').fileinput('enable');

                        $('.form-control').val('');
                        $('.file-control').fileinput('clear');
                        $(":input[name='name']").focus();
                    },
                    error: function (upload, error) {
                        $('.alert').toggleClass('alert-info');
                        $('.alert').toggleClass('alert-danger');
                        $('.alert').text('上傳失敗 :(');
                        var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                        $close.appendTo($('.alert'));

                        $(':input').prop('disabled', false);
                        $('.file-control').fileinput('enable');

                        console.log(upload);
                        console.log(error);
                    }
                });
            }
        });
        var data = $(e.target).serializeArray(),
        shop = new tShop();
        var photoFront = $("#photo_front")[0];
        if (photoFront.files.length > 0) {
            var file = photoFront.files[0];
            var name = "front" + file.name.substr((file.name.lastIndexOf('.')));
            var parseFile = new Parse.File(name, file)
            shop.set("photo_front", parseFile);
        }
        var photoMenu = $("#photo_menu")[0];
        if (photoMenu.files.length > 0) {
            var file = photoMenu.files[0];
            var name = "menu" + file.name.substr((file.name.lastIndexOf('.')));
            var parseFile = new Parse.File(name, file)
            shop.set("photo_menu", parseFile);
        }
        shop.create(data[0].value, data[1].value, data[2].value, data[3].value);
    });
});
