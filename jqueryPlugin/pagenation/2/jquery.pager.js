/**
 * jquery.pager.js v1.0.0
 * by willwang 2017-06-14
 */

;(function ($, window, document, undefined) {
    "use strict";

    function Pager($ele, options) {
        this.$ele = $ele;
        this.defaults = {
            pageIndex: 0,   // 当前页索引，从0开始
            pageSize: 6,    // 每页显示内容
            itemCount: 50,  // 列表总条数
            prevText: '上一页',
            nextText: '下一页',
            maxButtonCount: 7,  // 除了首页和尾页，中间显示的最大页数按钮
            buildPageUrl: null,
            onPageChanged: null,
        };
        this.options = $.extend({}, this.defaults, options);
        this.init();
    }

    Pager.prototype = {
        init: function () {
            this.renderHtml();
        },
        renderHtml: function () {
            var options = this.options;
            var html = [];

            // 总页码数
            options.pageCount = Math.ceil(options.itemCount / options.pageSize);

            // 生成上一页的按钮
            if (options.pageIndex > 0) {
                html.push('<a href="" page='+ (options.pageIndex - 1) +' class="flip"></a>')
            }else {
                html.push('<span class="flip noPage">'+ options.prevText +'</span>')
            }

            // 临时的起始页码中间页码， 当页码数量大于显示的最大按钮数时使用
            var tempStartIndex = options.pageIndex - Math.floor(options.maxButtonCount / 2) + 1; 

            // b
            var endIndex = Math.min(options.pageCount, Math.max(0, tempStartIndex) + options.maxButtonCount) - 1;
            var startIndex = Math.max(0, endIndex - options.maxButtonCount + 1);

            // 第一页?
            if (startIndex > 0) {
                html.push('<a href="" page="'+ 0 +'">1</a>');
                html.push('<span>...</span>')
            }

            // 生成页面按钮
            for (var i = startIndex; i <= endIndex; i++) {
                if (options.pageIndex == i){
                    html.push('<span class="curPage">'+ (i + 1) +'</span>')
                }else {
                    html.push('<a page="'+ i +'" href="'+ this.buildPageUrl(options.pageIndex + 1) +'">'+ (i + 1) +'</a>')
                }
            }

            // 最后一页
            if (endIndex < options.pageCount - 1) {
                html.push('<span>...</span>')
                html.push('<a href="'+ this.buildPageUrl(options.pageCount - 1) +'" page="'+ (options.pageCount - 1) +'">'+ options.pageCount +'</a>')
            }

            // 下一页
            if (options.pageIndex < options.pageCount - 1){
                html.push('<a href="'+ this.buildPageUrl(options.pageCount - 1) +'" page="'+ (options.pageCount - 1) +'" class="flip">'+ options.nextText +'</a>')
            }else {
                html.push('<span class="flip noPage">'+ options.nextText +'</span>')
            }

            // render
            this.$ele.html(html.join(""));

        },
        buildPageUrl: function() {
            if ($.isFunction(this.options.buildPageUrl)){
                return this.options.buildPageUrl(pageIndex)
            }
            return "javascript:;"
        }
    }

    $.fn.Page = function () {
        return new Pager($(this))
    }
})(jQuery, window, document)