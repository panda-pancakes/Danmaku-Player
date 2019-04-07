<?php
require_once("connect.php");
$con->set_charset('utf8mb4');
session_start();
if($_POST["user"]){
    $user = $_POST["user"];
}else{
    $user = $_SESSION["user"];
}

$words = $_POST["words"];
if(!empty($user)){
    $sql = "INSERT INTO danmu(user, words) VALUES (?,?)";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $user, $words);
    $stmt->execute();
    $stmt->close();
}else{
    $con->close();
}
