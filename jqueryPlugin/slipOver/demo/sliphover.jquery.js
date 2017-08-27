/*
* Sliphover jquery plugin
* by Willwang at 2017/08/27
* willworkgogogo@gmail.com
* */
;(function ($, window, document, undefined) {
    var defaults = {
        target: 'img', // 目标元素,默认是img
    };
    
    function SlipHover(ele, options) {
        this.elements = ele;
        this.option = $.extend({}, defaults, options);
        this.init();
    }

    SlipHover.prototype = {
        init: function () {
            var that = this,
                target = this.option.target;

            $(this.elements).off('mouseenter.sliphover', target).on('mouseenter.sliphover', target, function(event){
                var $element = $(this),
                    $overlayContainer = that.createContainer($element);
                $overlayContainer.off('mouseenter.sliphover mouseleave.sliphover').on('mouseenter.sliphover mouseleave.sliphover', function (event) {
                    var direction = that.getDirection($(this), event);

                    if (event.type == 'mouseenter') {
                        var $overlay = $overlayContainer.find('.slipover-overlay');
                        if (!$overlay.length) {

                        }
                    } else {
                        that.removeOverlay(that, $(this), direction);
                    }
                })
            })
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
        createOverlay: function (instance, direction, $element) {
            //
            var bottom, left, $overlay, $overlayColor, content, $targetAParent;

            switch (direction) {
                case 0:
                    // from top
                    left = 0;
                    bottom = '100%';
                    break;
                case 1:
                    // from right
                    left = '100%';
                    bottom = 0;
                    break;
                case 2:
                    // from bottom
                    left = 0;
                    bottom = '-100%';
                    break;
                case 3:
                    // from left
                    left = '-100%';
                    bottom = 0;
                    break;
                default:
                    console.error('error when get direction of the mouse')
            };

            //

        },
        getDirection: function ($target, event) {
            var w = $target.width(),
                h = $target.height(),
                x = (event.pageX - $target.offset().left - (w / 2) * (w > h ? (h / w) : 1)),
                y = (event.pageY - $target.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            return direction;
        }
    };

    $.fn.slipHover = function(options) {
        this.each(function() {
           new SlipHover($(this), options)
        });
        return this
    }
})(jQuery, window, document)