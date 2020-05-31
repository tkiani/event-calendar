<?php
// get events.php

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
$month = $json_obj['month'];
$year = $json_obj['year'];
$eventPriority = $json_obj['eventPriority'];
$username = $_SESSION['user'];

//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']

require 'mydatabase.php';//connect to data base

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

$stmt = $mysqli->prepare("SELECT id, eventdetails, day, hour, minute, eventcolor FROM events WHERE month = ? and year = ? and username = ? and eventpriority = ?");
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}

$ids = array();
$days = array();
$months = array();
$years  = array();
$names = array();
$hours = array();
$minutes = array();
$colors = array();
$priorities = array();

$stmt->bind_param('iiss', $month, $year, $username, $eventPriority);
$stmt->execute();
$stmt->bind_result($id, $name, $day, $hour, $minute, $color);

while($stmt->fetch()) {
    $ids[] = htmlentities($id); //these htmlentities are prevention for xss attacks
    $days[] = htmlentities($day);
    $months[] = htmlentities($month);
    $years[] = htmlentities($year);
    $names[] = htmlentities($name);
    $hours[] = htmlentities($hour);
    $minutes[] = htmlentities($minute);
    $colors[] = htmlentities($color);
    $priorities[] = htmlentities($eventPriority);
}

$stmt->close();

if (count($id) < 1){
	echo json_encode(array(
		"success" => false
	));
	exit;
}
else {
	echo json_encode(array(
        "success" => true,
        "ids" => $ids,
        "names" => $names,
        "days" => $days,
        "months" => $months,
        "years" => $years,
        "hours" => $hours,
        "minutes" => $minutes,
        "ids" => $ids,
        "colors" => $colors,
        "priorities" => $priorities
	));
	exit;
}

?>