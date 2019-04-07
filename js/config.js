$(function (){
    var name = $("#video_name").val();
    var src1 = "https://vodkgeyttp8.vod.126.net/cloudmusic/7ee3/mv/a104/181251ac9d84d0f40c5fa2d8fc263e7e.mp4?wsSecret=e1e5e8d65c7f5edc9dc3de8cd744ee3d&wsTime=1554628539";
    $("video").attr("src",src1);
    $("#video_name").text("SEARCH");
    // var viedo_src = $("#video").attr("src","video/");
    // var danmaku;
    var color=Array();
    var display=Array();
    var size=Array();
    function setstyle(){
        color[0]="white";
        color[1]="orange";         
        color[2]="green";
        color[3]="blue";
        color[4]="red";
        display[0]="1";
        display[1]="0.75";
        display[2]="0.5";
        display[3]="0.35";
        display[4]="0.2";
        size[0]="25px";
        size[1]="20px";
        size[2]="15px";
        size[3]="10px";
        size[4]="5px";
        for (var i = 0; i <= 4; i++) {
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