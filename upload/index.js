﻿$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) {
        if (navigator.userAgent.match(/Trident|MSIE/) != null) document.execCommand("Stop");
        else window.stop();
        window.location.href = '../login/';
    }
    // displayname
    $('.dropdown-toggle').html('<i class="glyphicon glyphicon-user"  style="color:lightseagreen"></i> ' + Parse.User.current().get('displayname') + ' <span class="caret">');
    // Bloodhound data source
    var ShopData = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: 'https://api.parse.com/1/classes/Shop?where={"name":{"$regex":"%QUERY"}}&limit=10',
            wildcard: '%QUERY',
            prepare: function (query, settings) {
                // settings.type (method for jQuery 1.9+) default is GET
                settings.dataType = 'json';
                settings.contentType = "application/json; charset=UTF-8";
                settings.headers = {
                    'X-Parse-Application-Id': 'kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu',
                    'X-Parse-REST-API-Key': '17sSFSMl9IuBt4HvQfeJKvpFVQaS6Gjf3qJApUmz'
                };
                settings.url = settings.url.replace('%QUERY', encodeURIComponent(query));
                return settings;
            },
            transform: function (response) {
                // console.log(response);
                return response.results;
                // return response.results.map(function (o) { return { name: o.name } });
            }
        }
    });
    // typeahead ini
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'Shops',
        display: 'name',
        source: ShopData
    });
    // fileinput ini
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
    $('.alert').hide();
    // submit and upload
    $('.row').on('submit', function (e) {
        e.preventDefault();
        var data = $(e.target).serializeArray();
        // alert ini
        if ($('.alert').hasClass('alert-success')) $('.alert').toggleClass('alert-success');
        if ($('.alert').hasClass('alert-warning')) $('.alert').toggleClass('alert-warning');
        if ($('.alert').hasClass('alert-danger')) $('.alert').toggleClass('alert-danger');
        // show grecaptcha alert (danger)
        $('.alert').show();
        if (grecaptcha.getResponse() === '') {
            $('.alert').toggleClass('alert-danger');
            $('.alert').text('請驗證非機器人');
            return;
        }
        // show upload alert (info)
        $('.alert').toggleClass('alert-info');
        $('.alert').text('上傳中...');
        $(':input').prop('disabled', true);
        $('.file-control').fileinput('disable');
        // processing upload photos
        var tShop = Parse.Object.extend('tShop'), shop = new tShop();
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
        // two side validation
        Parse.Cloud.run('grecaptcha', { 'key': grecaptcha.getResponse() }, {
            success: function (result) {
                if (!result) {
                    // show server alert (info)
                    $('.alert').toggleClass('alert-info');
                    $('.alert').toggleClass('alert-danger');
                    $('.alert').text('reCaptcha 伺服器驗證錯誤,請再嘗試一次');
                    var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                    $close.appendTo($('.alert'));
                    // reset
                    $(':input').prop('disabled', false);
                    $('.file-control').fileinput('enable');
                    grecaptcha.reset();
                    return;
                } else {
                    shop.save({
                        'name': data[0].value,
                        'category': data[1].value,
                        'address': data[2].value,
                        'telephone': data[3].value,
                        'business_hours': data[4].value,
                        'takeout': $('#takeout')[0].checked,
                        'description': data[5].value
                    }, {
                        success: function (upload) {
                            // show success alert (success)
                            $('.alert').toggleClass('alert-info');
                            $('.alert').toggleClass('alert-success');
                            $('.alert').text('上傳成功!!');
                            var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                            $close.appendTo($('.alert'));
                            $(':input').prop('disabled', false);
                            $('.file-control').fileinput('enable');
                            // reset
                            $('.form-control').val('');
                            $('.file-control').fileinput('clear');
                            $(":input[name='name']").focus();
                            grecaptcha.reset();
                        },
                        error: function (upload, error) {
                            // show error alert (danger)
                            $('.alert').toggleClass('alert-info');
                            $('.alert').toggleClass('alert-danger');
                            $('.alert').text('上傳失敗, 請再嘗試一次,或回報給管理員');
                            var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                            $close.appendTo($('.alert'));
                            // reset                            
                            $(':input').prop('disabled', false);
                            $('.file-control').fileinput('enable');
                            grecaptcha.reset();
                            // console.log(upload, error);
                        }
                    });
                }
            },
            error: function (error) {
                // show server alert(info)
                $('.alert').toggleClass('alert-info');
                $('.alert').toggleClass('alert-danger');
                $('.alert').text('伺服器錯誤,請再嘗試一次,或回報給管理員');
                var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                $close.appendTo($('.alert'));
                // reset
                grecaptcha.reset();
                $(':input').prop('disabled', false);
                $('.file-control').fileinput('enable');
                // console.log(error);
            }
        });
    });
    // Console
    if (typeof console == "object") {
        if (navigator.userAgent.match(/Chrome/)) console.log("%c看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!", "color: #ff5722; font-size: 25px;");
        else console.log("看來您很喜歡探索新事物！我們喜歡好奇的人，您應該加入我們並且一起建造這個偉大的APP!");
    }
});