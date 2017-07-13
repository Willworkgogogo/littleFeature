/**
 * willwang 2017-05-30
 * 提示框插件
 * 使用方法
 * 
 */  

$(function() {
    $.fn.popoTip = function(options) {
        var defaults = {
            Event: "click",
            timeOut: 2000
        };
        var options = $.extend(defaults, options);
        var $tip = $(this);

        // 方法实现逻辑
        $tip.on(options.Event, function(e){
            var type    = $(this).attr("popoType"),
                msg     = $(this).attr("popoMsg"),
                tipHTML = ""; // 提示信息
            
            switch (type){
                case 'loading':
                    tipHTML = '<img alt="" src="images/loading.gif">' + (msg ? msg : '正在提交你的请求, 请稍后...');
                    break
                case 'notice':
                    tipHTML = '<span class="ico-notice"></span>' + msg;
                    break
                case 'success':
                    tipHTML = '<span class="ico-success"></span>' + msg;
                    break
                case 'error':
                    tipHTML = '<span class="ico-error"></spa>' + msg;
                    break      
            }

            // 删除节点
            if ($('.msgbox_layer_wrap')) {
                $('.msgbox_layer_wrap').remove();
            }

            // 关定时器
            if (st) {
                clearTimeout(st)
            } 

            var htmlBody =   '<div class="msgbox_layer_wrap">'
                           + '<span id="mode_tips_v2" class="msgbox_layer" style="z-index: 10000">'
                           + '<span class="gtl_ico_clear">'+ tipHTML +'</span>'
                           + '<span class="gtl_end"></span>'
                           + '</span>'
                           + '</div>'
            $(body).prepend(htmlBody)
            $('.msgbox_layer_wrap').show();

            // 隐藏，定时器
            var st = setTimeout(function(){
                $('.msgbox_layer_wrap').hide();
            }, options.timeOut);
            
        })
    }
})