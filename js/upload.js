﻿$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) {
        if (/msie/.test(navigator.userAgent.toLowerCase())) document.execCommand("Stop");
        else window.stop();
        window.location.href = './login.html';
    }
    $('.dropdown-toggle').html('使用者: ' + window.name + ' <span class="caret">');

    var ShopData = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: 'https://api.parse.com/1/classes/Shop?where={"name":{"$regex":"%QUERY"}}&limit=20',
            wildcard: '%QUERY',
            prepare: function (query, settings) {
                // settings.type (method for jQuery 1.9+) default is GET
                settings.dataType = 'json';
                settings.contentType = "application/json; charset=UTF-8";
                settings.headers = {
                    'X-Parse-Application-Id': 'kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu',
                    'X-Parse-REST-API-Key': '17sSFSMl9IuBt4HvQfeJKvpFVQaS6Gjf3qJApUmz'
                };

                // aware XSS
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

    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'Shops',
        display: 'name',
        source: ShopData
    });

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

    $('.row').on('submit', function (e) {
        e.preventDefault();
        var data = $(e.target).serializeArray();
        if ($('.alert').hasClass('alert-success')) $('.alert').toggleClass('alert-success');
        if ($('.alert').hasClass('alert-warning')) $('.alert').toggleClass('alert-warning');
        if ($('.alert').hasClass('alert-danger')) $('.alert').toggleClass('alert-danger');
        $('.alert').show();
        if (grecaptcha.getResponse() === '') {
            $('.alert').toggleClass('alert-warning');
            $('.alert').text('請驗證非機器人');
            return;
        }
        $('.alert').toggleClass('alert-info');
        $('.alert').text('上傳中...');
        $(':input').prop('disabled', true);
        $('.file-control').fileinput('disable');

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
    });

    Parse.Cloud.run('grecaptcha', { 'key': grecaptcha.getResponse() }, {
        success: function (result) {
            if (!result) {
                $('.alert').toggleClass('alert-info');
                $('.alert').toggleClass('alert-danger');
                $('.alert').text('reCaptcha 伺服器驗證錯誤');
                var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                $close.appendTo($('.alert'));
                $(':input').prop('disabled', false);
                $('.file-control').fileinput('enable');
                grecaptcha.reset();
                return;
            } else {
                shop.save({
                    'name': data[0].value,
                    'address': data[1].value,
                    'telephone': data[2].value,
                    'business_hours': data[3].value,
                    'contributor': $('#cbAnonym').prop('checked') ? 'Anonymous' : window.name
                }, {
                    success: function (upload) {
                        $('.alert').toggleClass('alert-info');
                        $('.alert').toggleClass('alert-success');
                        $('.alert').text('上傳成功!!');
                        var $close = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="display: block;"><span aria-hidden="true">×</span></button>');
                        $close.appendTo($('.alert'));
                        $(':input').prop('disabled', false);
                        $('.file-control').fileinput('enable');
                        grecaptcha.reset();

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
                        grecaptcha.reset();
                        // upload error
                        console.log(upload);
                        console.log(error);
                    }
                });
            }
        },
        error: function (error) {
            // grecaptcha error
            console.log(error);
        }
    });
});
