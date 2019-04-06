<?php 
$ws = new swoole_websocket_server("0.0.0.0", 9505);

$ws->on('open', function ($ws, $request) {

});

//监听
$ws->on('message', function ($ws, $frame) {
    
    echo "Message: {$frame->data}";

    foreach($ws->connections as $fd){
        $ws->push($fd, json_encode($frame->data));
        
    }
});

$ws->on('close', function ($ws, $fd) {

});

$ws->start();