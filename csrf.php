<?php
    session_start();
    $CSRFtoken = $_SESSION['token'];
    echo json_encode(array(
		"CSRFtoken" => $CSRFtoken
	));
	exit;
?>