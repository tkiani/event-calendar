
/* * * * * * * * * * * * * * * * * * * *\
 *               Module 4              *
 *      Calendar Helper Functions      *
 *                                     *
 *        by Shane Carr '15 (TA)       *
 *  Washington University in St. Louis *
 *    Department of Computer Science   *
 *               CSE 330S              *
 *                                     *
 *      Last Update: October 2017      *
\* * * * * * * * * * * * * * * * * * * */

(function () {
	"use strict";
	/* Date.prototype.deltaDays(n)
	 * 
	 * Returns a Date object n days in the future.
	 */
	Date.prototype.deltaDays = function (n) {
		// relies on the Date object to automatically wrap between months for us
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
	};

	/* Date.prototype.getSunday()
	 * 
	 * Returns the Sunday nearest in the past to this date (inclusive)
	 */
	Date.prototype.getSunday = function () {
		return this.deltaDays(-1 * this.getDay());
	};
}());

/** Week
 * 
 * Represents a week.
 * 
 * Functions (Methods):
 *	.nextWeek() returns a Week object sequentially in the future
 *	.prevWeek() returns a Week object sequentially in the past
 *	.contains(date) returns true if this week's sunday is the same
 *		as date's sunday; false otherwise
 *	.getDates() returns an Array containing 7 Date objects, each representing
 *		one of the seven days in this month
 */
function Week(initial_d) {
	"use strict";

	this.sunday = initial_d.getSunday();
		
	
	this.nextWeek = function () {
		return new Week(this.sunday.deltaDays(7));
	};
	
	this.prevWeek = function () {
		return new Week(this.sunday.deltaDays(-7));
	};
	
	this.contains = function (d) {
		return (this.sunday.valueOf() === d.getSunday().valueOf());
	};
	
	this.getDates = function () {
		var dates = [];
		for(var i=0; i<7; i++){
			dates.push(this.sunday.deltaDays(i));
		}
		return dates;
	};
}

/** Month
 * 
 * Represents a month.
 * 
 * Properties:
 *	.year == the year associated with the month
 *	.month == the month number (January = 0)
 * 
 * Functions (Methods):
 *	.nextMonth() returns a Month object sequentially in the future
 *	.prevMonth() returns a Month object sequentially in the past
 *	.getDateObject(d) returns a Date object representing the date
 *		d in the month
 *	.getWeeks() returns an Array containing all weeks spanned by the
 *		month; the weeks are represented as Week objects
 */
function Month(year, month) {
	"use strict";
	
	this.year = year;
	this.month = month;
	
	this.nextMonth = function () {
		return new Month( year + Math.floor((month+1)/12), (month+1) % 12);
	};
	
	this.prevMonth = function () {
		return new Month( year + Math.floor((month-1)/12), (month+11) % 12);
	};
	
	this.getDateObject = function(d) {
		return new Date(this.year, this.month, d);
	};
	
	this.getWeeks = function () {
		var firstDay = this.getDateObject(1);
		var lastDay = this.nextMonth().getDateObject(0);
		
		var weeks = [];
		var currweek = new Week(firstDay);
		weeks.push(currweek);
		while(!currweek.contains(lastDay)){
			currweek = currweek.nextWeek();
			weeks.push(currweek);
		}
		
		return weeks;
	};
}


let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currMonth = new Month(2020, 3); //APRIL 2020

var currentEvent = -1;
var eventCount = 0;

updateCalendar();

function updateCalendar(){

   let month=currMonth.month,
       year=currMonth.year;

   let  currDate=new Date();
   let  dateToday=currDate.getDate();
   let  monthToday=currDate.getMonth();
   let  yearToday=currDate.getFullYear();

   document.getElementById("day-wrap").innerHTML="";

   document.getElementById("header-title-date").innerHTML=monthArray[month] +' '+ year;

   let weeksArray = currMonth.getWeeks();

   let numOfDaysInMonth = 0;
   let numOfWeeksInMonth = 0;

   for(var w in weeksArray){
	  let daysArray = weeksArray[w].getDates();
      numOfWeeksInMonth++;
      let text = '<div class="week" id="week'+numOfWeeksInMonth+'">';
		for(let currDate in daysArray){
         if(daysArray[currDate].getMonth()==month){
            numOfDaysInMonth++;

            let className="day";
            if (monthToday == month && yearToday == year && yearToday==numOfDaysInMonth) {
               className+=" today";
            }

            text += '<div class="'+className+'" id="day'+numOfDaysInMonth+'"><div class="day-number">'+daysArray[currDate].getDate()+'</div></div>';
		
		}else{

            text += '<div class="day-blank" name="day-blank"><div class="day-number"></div></div>';
         }
		}
      
	  text += '</div>';
	  
      document.getElementById("day-wrap").innerHTML += text;
	}
	if(userLoggedIn){
		let eventlist = [];
		getEventsAjax(eventlist);
	}
	
}


function getEventsAjax(eventlist) {

	let eventPriority;

    let lowDisplay = document.getElementById("lowDisplay");
    let moderateDisplay = document.getElementById("moderateDisplay");
    let highDisplay = document.getElementById("highDisplay");
   
    if(lowDisplay.checked){
        eventPriority = "low";
      }
      if(moderateDisplay.checked){
        eventPriority = "moderate";
      }
      if(highDisplay.checked){
        eventPriority = "high";
      }

	let month=currMonth.month,
		 year=currMonth.year;
	 
	  const data = {'year': year, 'month': month , 'eventPriority':eventPriority};
  
	  fetch("getEvents.php", {
		  method: 'POST',
		  body: JSON.stringify(data),
		  headers: { 'content-type': 'application/json' }
	  })
	  .then(response => response.json())
	  .then(data =>{
		  let NewEventList = helpEventArray(data, eventlist);
		  displayEvent(NewEventList);
	  })
	  .catch(err => console.error(err));
  }


function helpEventArray (data, eventlist) {

	if (data.success == true) {
		let ids = data.ids; // ids are unique
		let title = data.names;
		let days = data.days;
		let months = data.months;
		let years = data.years;
		let hours = data.hours;
		let minutes = data.minutes;
		// let priorities = data.priorities;
		let colors = data.colors;


		for (i = 0; i < title.length; i++) {
			if(!(eventlist.includes(ids[i]))){
				let newEvent = new CalEvent(ids[i], title[i], months[i], days[i], years[i], hours[i], minutes[i], colors[i]);
				eventlist.push(newEvent);
			}
		}

	}
	console.log(eventlist);
	
return eventlist;
}

function CalEvent(id, title, month, date, year, hour, minute, color) {
	"use strict";
	this.index = id;
	this.title = title; //string
	this.month = month;
	this.date = date;
	this.year = year;
	this.hour = hour;
	this.minute = minute;
	this.color = color;
}

function displayEvent(NewEventList){

	let month=currMonth.month,
	year=currMonth.year;

 for(var e in NewEventList){

	var eventMonth = NewEventList[e].month,
	   eventYear = NewEventList[e].year,
	   eventIndex = NewEventList[e].index;
	   eventHour = NewEventList[e].hour;
	   eventMinute = NewEventList[e].minute;

	 if(month==eventMonth && year==eventYear){
	  //Add the event to calendar
		 var eventDate = NewEventList[e].date,
			eventTitle = NewEventList[e].title;
			let eventColor = NewEventList[e].color;

			if(document.getElementById("day"+eventDate) != null){
		   
			// document.getElementById("day"+eventDate).innerHTML+='<button class="indicator-wrap" id="event'+eventIndex+'" data = "'+eventIndex+'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</button>';	
			document.getElementById("day"+eventDate).innerHTML+='<div class="indicator-wrap" id="event'+eventIndex+'" data = "'+eventIndex+'" style="background:'+eventColor+'" title="'+eventTitle+'">'+ '<div class="eventID">' + "Event ID: " +eventIndex+ '</div>' + eventTitle+ '<div class="eventTime">' + "Event Time: " + eventHour + " " + eventMinute + '</div>' + '</div>';		
		}
	 }
 }
}

