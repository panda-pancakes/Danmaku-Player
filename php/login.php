<?php
require_once("database.php");
session_start();
function login() {
    $ret = new stdClass();
	if(empty($_POST["user"])){
        $ret->errmsg = "尚未登录，不能发表弹幕"；
        $ret->status = "failed";
    }else{
        $ret->status = "ok";
        $_SESSION["user"] = $_POST["user"];
    }
    return $ret;
}
echo json_encode($ret);
