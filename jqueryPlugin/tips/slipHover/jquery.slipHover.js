/**
 * slipHover
 * 2017-06-03 by willwang
 * 不支持移动端使用
 */ 

;(function($, window, document, undefined){
    
    // Create the defaults
    var pluginName = 'slipHover',
        defaults = {
            target: 'img', // 目标对象
            caption: 'title', // 遮罩上显示的内容
            duration: 'fast', // 动画效果时间
            fontColor: '#fff',
            textAlign: 'center', // 文本水平位置
            verticalMiddle: true, // 文本垂直位置
            backgroundColor: 'rgba(0,0,0,.7)',
            backgroundColorAttr: null, // 指定使用rgba
            reverse: false, // 反转方向
            height: '100%', // 指定覆盖高度
            withLink: true // 有链接时覆盖层可被点击
        }

    // SlipHover 构造函数
    function SlipHover(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        // this.version = 'v1.0.0';
        this.init();
    }

    SlipHover.prototype = {
        init: function() {
             
             // 移动端禁用
             if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return ;

             var _this = this,
                target = this.settings.target;

            // 当鼠标移入时，创建覆盖容器
            $(this.element).off('mouseenter.slipehover', target).on('mouseenter.sliphover', target, function(element){
                var $element = $(this),
                    $overlayContainer = _this.createContainer($element)
            })
        },
        createContainer: function($element) {
            // get the properties of the target
            var top = $element.offset().top,
                left = $element.offset().left,
                width = $element.outerWidth(),
                height = $element.outerHeight();
            zIndex = $element.css('z-index');
            
        }
    }
})(jQuery, window, document)