/**
 * 美化页面功能
 * 2017-06-02 by willwang
 */ 

;(function($, window, document, undefined){
    var Beautifier = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        };
        this.options = $.extend({}, this.defaults, opt);
    }

    // 定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            })
        }
    }

    // 在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        // 创建Beautifier实例
        var beautifier = new Beautifier(this, options);

        // 调用方法
        return beautifier.beautify()
    }
})(jQuery, window, document)