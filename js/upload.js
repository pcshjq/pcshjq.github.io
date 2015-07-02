$(function () {
    Parse.$ = jQuery;
    Parse.initialize("kMUH1stxvfuI5IxWHoA8x3rCaEqBWYgNUx5Wembu", "nSJVzXIq2iSBdUUBvLKnpW4okjgZ8SV0Dq3E1IFi");
    if (!Parse.User.current()) window.location.href = './login.html';
});

$(document).ready(function () {
    $('.dropdown-toggle').append(Parse.User.current().getUsername() + ' <span class="caret">');
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
                this.save({
                    'name': name,
                    'address': address,
                    'telephone': telephone,
                    'business_hours': business_hours,
                    'contributor': $('#cbAnonym').prop('checked') ? 'Anonymous' : Parse.User.current().getUsername()
                }, {
                    success: function (blog) {
                        window.location.reload();
                    },
                    error: function (blog, error) {
                        console.log(blog);
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
