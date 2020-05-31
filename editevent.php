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
// $username = $_SESSION['user'];
$username = $_SESSION['user'];
$eventID = $json_obj['eventID'];
$eventDetails = $json_obj['eventDetails'];
$year = $json_obj['year'];
$monthInitial = $json_obj['month'];
$month = ($monthInitial - 1);
$day = $json_obj['day']; // day is showing as null
$hour = $json_obj['hour']; // hour is showing as null
$minute = $json_obj['minute'];
$color = $json_obj['eventColor'];
$priority = $json_obj['eventPriority'];

//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

require 'mydatabase.php';//connect to data base

$stmt = $mysqli->prepare("UPDATE events SET eventdetails=?, day=?, month=?, year=?, hour=?, minute=?, eventcolor=?, eventpriority=?  WHERE id=? and username=?");
 if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}

$stmt->bind_param('ssssssssss', $eventDetails, $day, $month, $year, $hour, $minute, $color, $priority, $eventID, $username);
$stmt->execute();
$stmt->close();





if(!$stmt){
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
