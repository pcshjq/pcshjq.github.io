/*!
 * FileInput Chinese Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 * @author kangqf <kangqingfei@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['zh'] = {
        fileSingle: '檔案',
        filePlural: '多重檔案',
        browseLabel: '瀏覽 &hellip;',
        removeLabel: '移除',
        removeTitle: '取消選取的檔案',
        cancelLabel: '取消',
        cancelTitle: '取消上傳',
        uploadLabel: '上傳',
        uploadTitle: '上傳選取的檔案',
        msgSizeTooLarge: '檔案 "{name}" (<b>{size} KB</b>) 超過了大小限制 <b>{maxSize} KB</b>. 請重新上傳!',
        msgFilesTooLess: '您必須選擇至少 <b>{n}</b> {files} 來上傳. 請重新上傳!',
        msgFilesTooMany: '選擇上傳檔案的個數 <b>({n})</b> 超過最大限制個數 <b>{m}</b>. 請重新上傳!',
        msgFileNotFound: '檔案 "{name}" 未找到!',
        msgFileSecured: '由於安全限制禁止讀取檔案 "{name}"',
        msgFileNotReadable: '檔案 "{name}" 不可讀',
        msgFilePreviewAborted: '取消 "{name}" 的預覽',
        msgFilePreviewError: '讀取 "{name}" 時出現個錯誤',
        msgInvalidFileType: '不正確的檔名 "{name}", 只支援 "{types}" 類型的檔案',
        msgInvalidFileExtension: '不正確的附檔名 "{name}", 只支援 "{extensions}" 類型的附檔名',
        msgValidationError: '檔案上傳錯誤',
        msgLoading: '載入第 {index} 檔案 共 {files} &hellip;',
        msgProgress: '載入第 {index} 檔案 共 {files} - {name} - {percent}% 完成',
        msgSelected: '選取 {n} {files}',
        msgFoldersNotAllowed: '只支持拖拽文件! 跳过 {n} 拖拽的文件夹.',
        msgImageWidthSmall: '圖片檔 "{name}" 的寬度至少為 {size} 像素',
        msgImageHeightSmall: '圖片檔 "{name}" 的高度至少為 {size} 像素',
        msgImageWidthLarge: '圖片檔 "{name}" 寬度不能超过過 {size} 像素',
        msgImageHeightLarge: '圖片檔 "{name}" 的高度不能超過 {size} 像素',
        dropZoneTitle: '拖曳檔案到這裡 &hellip;',
        slugCallback: function(text) {
            return text ? text.split(/(\\|\/)/g).pop().replace(/[^\w\u4e00-\u9fa5\-.\\\/ ]+/g, '') : '';
        }
    };
})(window.jQuery);