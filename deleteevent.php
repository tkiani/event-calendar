<?php
// edit event.php

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_httponly', '1');
ini_set('session.use_only_cookies', '1');
session_start();


//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

//Variables can be accessed as such:
$username = $_SESSION['user'];
$eventID = $json_obj['eventID'];
$validateCSRFtoken = $json_obj['validateCSRFtoken'];

// if(!hash_equals($_SESSION['token'], $validateCSRFtoken)) {
//   die("Request forgery detected");
// }

//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

require 'mydatabase.php';//connect to data base

$stmt2 = $mysqli->prepare("DELETE from events where id=? and username=?");
if(!$stmt2){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}

$stmt2->bind_param('is',$eventID, $username);
$stmt2->execute();
$stmt2->close();

if(!$stmt2){
    echo json_encode(array(
      "success" => false
));
exit;
}

echo json_encode(array(
    "success" => true
));
exit;
?>

