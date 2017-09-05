countDown: function(d, o) {
    /* 
        接收两个对象
        
        @param {d} 
        {
            dom: "", 倒计时元素位置
            dataVal: "", 元素的属性，服务器渲染时间
            futureDate: "", 过期时间，时间戳，单位ms
        }

        @param {o} 
        {
            sec: "",    // 秒 选择器  显示位置
            mini: "",   // 分
            hour: "",   // 时
            day: "",    // 日
            month: "",  // 月
            year: "",   // 年
        }
    */
    var f = {
        intervalTime: "",
        getNowDate: Number(d.dom.attr(d.dataVal)), // 获取页面渲染的服务器时间
        zero: function(n){
            var n = parseInt(n, 10);
            if(n > 0){
                if(n <= 9){
                    n = "0" + n;    
                }
                return String(n);
            }else{
                return "00";    
            }
        },
        dv: function(){
            var future = new Date(d.futureDate),
                dur = Math.round((future.getTime() - f.getNowDate) / 1000) + future.getTimezoneOffset() * 60;
            var getPms = function() {
                dur--;
                var pms = {
                    sec: "00",
                    mini: "00",
                    hour: "00",
                    day: "00",
                    month: "00",
                    year: "0"
                };
                if(dur > 0){
                    pms.sec = f.zero(dur % 60);
                    pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                    pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                    pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                    
                    pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                    
                    pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
                }else{
                    // TODO 活动报名时间已截止
                    d.dom.html("<span style='color: #D7000F;'>活动报名已截止</span>")
                    clearInterval(f.intervalTime);
                }
                return pms;
            };
            var ui = function() {
                var pms = getPms();
                if(o.sec){
                    o.sec.innerHTML = pms.sec;
                }
                if(o.mini){
                    o.mini.innerHTML = pms.mini;
                }
                if(o.hour){
                    o.hour.innerHTML = pms.hour;
                }
                if(o.day){
                    o.day.innerHTML = pms.day;
                }
                if(o.month){
                    o.month.innerHTML = pms.month;
                }
                if(o.year){
                    o.year.innerHTML = pms.year;
                } 
            }
            f.intervalTime = setInterval(ui, 1000);
        }
    };
    f.dv()
}

// 调用
var countDownConfig = {
    $: function(id) {
        return document.getElementById(id)
    },
    domObj: function() {
        return {
            dom: $('.count-down'), //文案替换位置dom，用于显示倒计时结束
            dataVal: 'data-val', //元素的属性
            futureDate: Date.UTC(2017, 8, 20, 12) // 实际月份要-1
        }
    },
    timeDomObj: function() {
        return {
            sec: countDownConfig.$('sec'),
            mini: countDownConfig.$('mini'),
            hour: countDownConfig.$('hour'),
            day: countDownConfig.$('day'),
        }
    }
}
countDown(countDownConfig.domObj(), countDownConfig.timeDomObj());