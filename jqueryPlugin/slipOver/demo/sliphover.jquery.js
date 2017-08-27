/*
* Sliphover jquery plugin
* by Willwang at 2017/08/27
* willworkgogogo@gmail.com
* */
;(function ($, window, document, undefined) {
    var defaults = {
            
    };
    
    function SlipHover(ele, options) {
        this.elements = ele;
        this.option = $.extend({}, defaults, options);
        this.init();
    }

    SlipHover.prototype = {
        init: function () {
            var that = this,
                $overlayContainer = that.createContainer(this.elements);
        },
        createContainer: function ($element) {
            var top = $element.offset().top,
                left = $element.offset().left,
                width = $element.outerWidth(),
                height = $element.outerHeight(),
                zIndex = $element.css('z-index');
            var $overlayContainer = $('<div>', {
                class: 'sliphover-container'
            }).css({
                pointerEvent: "none",
                width: width,
                height: height,
                position: "absolute",
                left: left,
                top: top,
                borderRadius: $element.css('border-radius'),
                zIndex: parseInt(zIndex) + 1,
            });

            $('body').append($overlayContainer);

            return $overlayContainer
        },
        createOverlay: function () {

        },
    };

    $.fn.slipHover = function(options) {
        this.each(function() {
           new SlipHover($(this), options)
        });
        return this
    }
})(jQuery, window, document)