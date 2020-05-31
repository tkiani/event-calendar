<?php

if($_SESSION['user'] != null){
	echo json_encode(array(
        "success" => true,
        ));
        exit;
}
else{
    echo json_encode(array(
        "success" => false,
        ));
        exit;
}


?>