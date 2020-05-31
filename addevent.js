// add event.js
document.getElementById("addevent_btn").addEventListener("click", addEventAjax, false); // Bind the AJAX call to button click

function addEventAjax(event) {
    
    const eventDetails = document.getElementById("eventdetails").value; // Get event details from the form
    const  eventDateAndTime = document.getElementById("event_date").value; // Get date and time from the form
    const  shareEvent = document.getElementById("shareevent").value; // Get shared username from the form

    let dateAndTime1 = eventDateAndTime.split('-');
    let dateAndTime2 = dateAndTime1[2].split('T');
    let dateAndTime3 = dateAndTime2[1].split(':');

    const year = Number(dateAndTime1[0]); //get year
    const month = (Number(dateAndTime1[1])); //get month
    const day = Number(dateAndTime2[0]); //get day
    const hour = Number(dateAndTime3[0]); //get hour
    const minute = Number(dateAndTime3[1]); //get minute

    let eventColor;

    let red = document.getElementById("red");
    let yellow = document.getElementById("yellow");
    let green = document.getElementById("green");
   
    if(red.checked){
         eventColor = "red";
      }
      if(yellow.checked){
         eventColor = "yellow";
      }
      if(green.checked){
         eventColor = "green";
      }

    let eventPriority;

    let low = document.getElementById("low");
    let moderate = document.getElementById("moderate");
    let high = document.getElementById("high");
   
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
    const data = {'eventDetails': eventDetails, 'shareEvent':shareEvent, 'year': year, 'month':month, 'day':day, 'hour':hour,'minute':minute,'eventColor': eventColor, 'priority':eventPriority, 'validateCSRFtoken':validateCSRFtoken};

    fetch("addevent.php", {
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
        alert("Event successfully added to calendar!");
        $("#eventdetails").val('');
        $("#event_date").val('');
        $("#shareevent").val('');
        updateCalendar();
        }
        else{
        alert("Could not add event to calendar please try again.");
        $("#eventdetails").val('');
        $("#event_date").val('');
        $("#shareevent").val('');
        }
    }