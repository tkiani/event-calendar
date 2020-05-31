// add event.js
document.getElementById("edit_event_btn").addEventListener("click", editEventAjax, false); // Bind the AJAX call to button click

function editEventAjax(event) {
    const eventID = document.getElementById("editeventid").value; // Get event id from the form
    const eventDetails = document.getElementById("edit-eventdetails").value; // Get event details from the form
    const  dateAndTime = document.getElementById("edit-eventdate").value; // Get date and time from the form


    let dateAndTime1 = dateAndTime.split('-');
    let dateAndTime2 = dateAndTime1[2].split('T');
    let dateAndTime3 = dateAndTime2[1].split(':');

    const year = Number(dateAndTime1[0]); //get year
    const month = Number(dateAndTime1[1]); //get month
    const day = Number(dateAndTime2[0]); //get day
    const hour = Number(dateAndTime3[0]); //get hour
    const minute = Number(dateAndTime3[1]); //get minute
 
    let eventColor;

    let red = document.getElementById("redEdit");
    let yellow = document.getElementById("yellowEdit");
    let green = document.getElementById("greenEdit");
   
    if(red.checked){
          eventColor = "red";
      }
    else if(yellow.checked){
          eventColor = "yellow";
      }
    else if(green.checked){
          eventColor = "green";
      }

      let eventPriority;

      let low = document.getElementById("lowEdit");
      let moderate = document.getElementById("moderateEdit");
      let high = document.getElementById("highEdit");
     
      if(low.checked){
          eventPriority = "low";
        }
        if(moderate.checked){
          eventPriority = "moderate";
        }
        if(high.checked){
          eventPriority = "high";
        }

    // Make a URL-encoded string for passing POST data:
    const data = {'eventID': eventID, 'eventDetails': eventDetails, 'year': year, 'month':month, 'day':day, 'hour':hour,'minute':minute,'eventColor': eventColor, 'eventPriority':eventPriority, 'validateCSRFtoken':validateCSRFtoken};

    fetch("editevent.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => displaySuccessUpdate(data))
        .catch(err => console.error(err));
}

function displaySuccessUpdate(data){
    if(data.success){
        $("#edit-eventdetails").val('');
        $("#editeventid").val('');
        alert("Event successfully updated in calendar!");
        callupdateCalendar();
    }
else{
    $("#edit-eventdetails").val('');
    $("#editeventid").val('');
    alert("Could not update event in calendar!");
}
}

function callupdateCalendar(){
updateCalendar();
}