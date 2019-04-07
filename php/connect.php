<?php
require_once("../config.php");
$con = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
if ($con->connect_error) {
	echo("<b>Failed to access database: </b>" . $con->connect_error);

} 