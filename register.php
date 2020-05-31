<?php
// register.php


 header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$newusername = $json_obj['newusername'];
$newpassword = $json_obj['newpassword'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

require 'mydatabase.php';

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

$stmt = $mysqli->prepare("SELECT COUNT(*) FROM users WHERE username=?");
$stmt->bind_param('s', $newusername);
$stmt->execute();
$stmt->bind_result($cnt);
$stmt->fetch();
$stmt->close();

if($cnt > 0){
    echo json_encode(array(
    "success" => false,
    "message" => "Please choose a different username!"
));
exit;
}

else {
    $pwd_hash = password_hash($newpassword , PASSWORD_DEFAULT);
    $to_insert = $mysqli->prepare("INSERT into users (username, hashed_password) values (? , ?)");
    if(!$to_insert){
        printf("Query prep failed: %s\n", $mysqli->error);
        exit;
    }
    $to_insert->bind_param('ss', $newusername,$pwd_hash);
    $to_insert->execute();
    $to_insert->close();
    echo json_encode(array(
        "success" => true
    ));
    exit;
}
?>