$(function(){
    var name = $("#video_name").val();
    var viedo_src = $("#video").attr("src","video/");
    var danmaku;
    var color=Array();
    var ws_url="ws://localhost:8080"
    function setColor(){
        color[0]="red";
        color[1]="orane";
        color[2]="green";
        color[3]="blue";
        color[4]="purple";
    }
    function selector() {
        setColor();
        for (var i = 0; i <= 10; i++) {
            $("select").append("<option value=" + i + ">" + color[i] +"id="+"color"+i+ "</option>");
            var color_name = "#color"+i;
            $(color_name).attr("style","color:"+color[i]);
        }
    }
    $("select").change(selector());
})