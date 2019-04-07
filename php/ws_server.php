<?php 
require_once(__DIR__.'/SensitiveWord.php');
$ws = new swoole_websocket_server("0.0.0.0", 9505);
$sen = new SensitiveWord(__DIR__.'/chinese_dictionary.txt');
$ws->on('open', function ($ws, $request) {

});

//监听
$ws->on('message', function ($ws, $frame) {
    
    echo "Message: {$frame->data}";
    $data = new stdClass();
    $danmu = json_decode($frame->data, true);
    $data->user = $danmu["user"];
    $data->words = $sen->filter($danmu["words"]);
 
    foreach($ws->connections as $fd){
        $ws->push($fd, json_encode($data));
        
    }
});

$ws->on('close', function ($ws, $fd) {

});

$ws->start();