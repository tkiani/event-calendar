
// delete event.js
document.getElementById("delete_event_btn").addEventListener("click", deleteEventAjax, false); // Bind the AJAX call to button click

function deleteEventAjax(event) {
    const eventID = document.getElementById("deleteeventID").value; // Get event id from the form

     // Make a URL-encoded string for passing POST data:
     const data = {'eventID': eventID,'validateCSRFtoken':validateCSRFtoken };

    fetch("deleteevent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => displayIfSuccessDelete(data))
        .catch(err => console.error(err));
}

function displayIfSuccessDelete(data){
if(data.success){
alert("Event successfully deleted from calendar!");
$("#deleteeventID").val('');
callupdateCalendar();
}
else{
alert("Could not delete event from calendar, please try again.");
}
}

function callupdateCalendar(){
    updateCalendar();
}