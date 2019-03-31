$(function (){
    var name = $("#video_name").val();
    var viedo_src = $("#video").attr("src","video/");
    var danmaku;
    var color=Array();
    var display=Array();
    var size=Array();
    var ws_url="ws://localhost:8080"
    function setstyle(){
        color[0]="red";
        color[1]="orane";
        color[2]="green";
        color[3]="blue";
        display[0]="1";
        display[1]="0.75";
        display[2]="0.45";
        display[3]="0";
        size[0]="25px";
        size[1]="15px";
        size[2]="10px";
        size[3]="5px";
        for (var i = 0; i <= 3; i++) {
            $("#color").append("<option value=" + color[i] + ">" + color[i] + "</option>");
            //颜色选项
            $("#size").append("<option value=" + size[i] + ">" + size[i] + "</option>");
            //字体大小
            $("#opacity").append("<option value=" + display[i] +">" + display[i] + "</option>");
            //透明度
    }
}
    $("select").change(setstyle());
})