$(function(){
    var user=$("#user").val();
    var words=$("#words").val();
    var data;
    var clicktime=0;
    player_onoff();
    //加载弹幕
    if($("#send_btn").click()||$("#freshen_btn").click()){
        if(check()==true){
            var ws =new WebSocket(ws_url);
            ws.onopen=function(){
                var package={
                    "user":user,
                    "words":words
                }
                ws.send(JSON.stringify(package));
                console.log("发送弹幕");
            }
            //发送弹幕
            ws.onmessage=function(evt){
                data=evt.data;
            }
            //收集服务器上的弹幕
            ws.onclose=function(){
                console.log("关闭ws");
            }
    
        }else{
            attention();
        }
    }
    //显示或关闭弹幕
    function player_onoff(){
        if($("#show").click()){
            clicktime=1;
            $("#danmaku_container").hide();
        }
        if($("#show").click()&&clicktime==1){
            clicktime=0;
            $("#danmaku_container".show());
        }
    }
    //显示提示
    function attention(){
        $("#attention").attr("src","img/");
        $("#attention").show();
        setTimeout(function(){
            $("#attention").hide()
        },2333);
    }
    //前端检查
    function check(){
        var errcode=111;
        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }//是否为空
        function check_uni(str) {
            var patt_illegal = new RegExp(/[\@\#\$\%\^\&\*{\}\:\\L\<\>\?}\'\"\\\/\b\f\n\r\t]/g);
            return patt_illegal.test(str);
        }//是否为字符？非法字符
        if(isBlank($("#user").val())){
            $("#user").focus();
            errcode=233;
            attention();
        }
        if(check_uni($("#user").val())){
            $("#user").focus();
            errcode=666;
            attention();
        }
        if(isBlank($("#words").val())){
            errcode=233;
            $("#words").focus();
            attention();
        }
        if(check_uni($("#words").val())){
            errcode=666;
            $("#words").focus();
            attention();
        }
        if(errcode==111){
            return true;//检查函数 验证通过返回true
        }else{
            return false;
        }
    }
})