# Event-Calendar

A project made for CSE330-CREATIVE PROGRAMMING AND RAPID PROTYPING. Functionality:  

Support a month-by-month view of the calendar.

Show one month at a time, with buttons to move forward or backward.

There should be no limit to how far forward or backward the user can go.

Users can register and log in to the website.

Unregistered users should see no events on the calendar.

Registered users can add events.

All events should have a date and time, but do not need to have a duration.

You do not need to support recurring events (where you add an event that repeats, for example, every monday).

Registered users see only events that they have added.

Your AJAX should not ask the server for events from a certain username. Instead, your AJAX should ask the server for events, and the server should respond with the events for only the currently-logged-in user (from the session). 

Registered users can delete their events, but not the events of others.

Again, the server should delete events based on the username present in the session. (If it deletes only based on an Event ID, an attacker could feed any arbitrary Event ID to your server, even if he/she didn't own that event.)

All user and event data should be kept in a database.

At no time should the main page need to be reloaded.

User registration, user authentication, event addition, and event deletion should all be handled by JavaScript and AJAX requests to your server.
