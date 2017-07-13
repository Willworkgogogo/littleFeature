/**
 * 
 */

;(function($, window, document, undefined){
    "use strict";
    var Pagination = function($ele, options) {
        this.$ele = $ele;
        this.defaults = {
            pageIndex: 0,
            pageSize: 6,
            itemCount: 50,
            maxButtonCount: 7,
            prevText: "上一页",
            nextText: "下一页",
            buildPageUrl: null,
            onPageChanged: null
        };
        this.options = $.extend({}, this.defaults, options)
        // init
        this.init()
    }

    Pagination.prototype = {
        init: function () {
            var _this = this;
            _this.ele.click(function () {
                $(this).addClass('selected').siblings().removeClass('selected');
                console.log($(this).text())
            })
        },
        renderHtml: function () {
            var options = this.options;
            
            // pageCount 总页数
            options.pageCount = Math.ceil(options.itemCount / options.pageSize);
            var html = [];

            // 生成上一页按钮
            
        }
    }

    $.fn.Pagination = function() {
        var pagination = new Pagination($('li'));

    }

})(jQuery, window, document) 