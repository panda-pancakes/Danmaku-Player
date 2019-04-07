$(function(){
    var user = $("#user").val(); 
    var words = $("#words").val(); 
    var data; 
    var num=0;
    var clicktime = 3; 
    var ws_url="ws://http://203.195.221.189/Danmaku-Player/php/ws_server.php";
    player_onoff(); 
    //加载弹幕

    function loading() {
        if (check() == true) {
            var ws = new WebSocket(ws_url); 
            ws.onopen = function() {
                var package =  {
                    "user":user, 
                    "words":words
                }
                ws.send(JSON.stringify(package)); 
                go_bullet(); 
                console.log("发送弹幕"); 
            }
            //发送弹幕
            ws.onmessage = function(evt) {
                data = evt.data; 
                show_bullet(data); 
            }
            //收集服务器上的弹幕
            ws.onclose = function() {
                console.log("关闭ws"); 
            }
    
        }else {
            attention(); 
        }
    }
    //显示或关闭弹幕
    function player_onoff() {
        $("#show").click(function () {
            if (clicktime == 3 || clicktime == 0) {
                clicktime = 1; 
                console.log("关闭弹幕"); 
                $(".danmaku_container").hide(); 
            }else {
                clicktime = 0; 
                console.log("显示弹幕"); 
                $(".danmaku_container").show(); 
            }
        })
        attention(); 
    }
    //滚动条 让输入框不要被挡着
    function texting(str) {
        console.log("别挡着"); 
        $(str).css( {
            "margin-bottom":"200px"
        }); 
        setTimeout(function(){
            $(str).css({
                "margin-bottom":"inherit"
            });
            },5000);
    }
    //显示提示
    function attention() {
        $("#attention").text("EXM？您做了什么？");
        $("#attention").show(); 
        setTimeout(function () {
            $("#attention").hide();
        }, 2333); 
    }
    //前端检查
    function check() {
        var errcode = 111; 
        function isBlank(str) {
            return ( ! str || /^\s * $/.test(str)); 
        }//是否为空
function check_uni(str) {
var patt_illegal = new RegExp(/[\@\#\$\ % \^\ & \ *  {\}\:\\L\ < \ > \?}\'\"\\\/\b\f\n\r\t]/g);
            return patt_illegal.test(str);
        }//是否为字符？非法字符
        if(isBlank($("#user").val())){
            $("#user").focus(function(){
                texting("#user");
            });
            errcode=233;
            attention();
        }
        if(check_uni($("#user").val())){
            $("#user").focus(function(){
                texting("#user");
            });
            errcode=666;
            attention();
        }
        if(isBlank($("#words").val())){
            errcode=233;
            $("#words").focus(function(){
                texting("#words");
            });
            attention();
        }
        if(check_uni($("#words").val())){
            errcode=666;
            $("#words").focus(function(){
            });
            attention();
        }
        if(errcode==111){
            $("#user").css({
                opacity: 0.8
            })
            return true;//检查函数 验证通过返回true
        }else{
            return false;
        }
    }
    
//设置弹幕随机高度
var highs=Array();
highs[0]=0;//用来设置底部 顶部 弹幕的 不过鉴于DDL紧迫 弃暗投明（不是
function sethigh(){
        var high=Math.random()*100+35;
        return high;
    }

//插入弹幕
function go_bullet() {
    var user = $("#user").val(); 
    if(user==undefined||user==""){
        user="一位不愿意透露姓名的用户";
    }
    var text = $("#words").val();
    num=num++;
    containername = "container[" + num + "]";
    bulletname = "bulletc[" + num + "]";
    say_a_word(user,text);
    console.log("写进评论");
    var color = $("#color").val();
    var size = $("#size").val();
    var opacity = $("#opacity").val();
    // font_style(bulletname);
    // $(containername).css({
    //     "top":sethigh(),
    // })
    $("#main_container").append("<div class='danmaku_container' id="+containername+" style="+"top:"+sethigh()+"px>"
    +"<div class='bullet'" + "id='" +bulletname + "'style="+"color:"+color+";size:"+size+";opacity:"+opacity+";"
    +">" + text +"</div>"
    +"</div>");//包含在内
}
//插入弹幕时发表评论
function say_a_word(user,str){
    var now=new Date();
    date=now.getFullYear()+"/"+now.getMonth()+"/"+now.getDay()+"/"+now.getHours()+":"+now.getMinutes();
    $("#comments").append("<div class='comment'>"+
    "<img class='imghead'  id='"+user+"' src='img/icon_sample.png'>"
    +"<div class='username'>"+user+"</div>" //用户名
    +"<div class='time'>"+date+"</div>" //时间
    +"<div class='text'>"+str //评论内容
    +"</div></div>");
}
//按钮设置
$("#send_btn").bind("click", function () {
    loading();
    go_bullet();
})
$("#freshen_btn").click(function () {
    loading();
    $(".danmaku_container").show();
})
$("#setting_box").hide();
$("#setting").click(function(){
    $("#setting_box").show();
    $("#slider").slider();
})
//改变字体颜色和大小、透明度      哇因为append的时候就已经写入函数了 改变不了
// function font_style(str) {
//     var color = $("#color").val();
//     var size = $("#size").val();
//     var opacity = $("#opacity").val();
//     $(str).css({
//         "color": color,
//         "font-size": size,
//         "opacity": opacity
//     })
// }

//评论区
function show_bullet(data) {
    for (var i = 0; i < data.sum; i++) {
        //哇这个明显写错了 danmaku_container是用来在视频上显示弹幕 的  评论区要专门做呀
        // $(".danmaku_container").append("<div class='bullet'" + "id=bullet[" + num + "]>" + data.text + "</div>");
        bulletname = "#bulletc[" + num + "]";
        font_style(bulletname);
    }
}
})