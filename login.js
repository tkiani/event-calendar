// login.js

document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
     
let userLoggedIn = false;
let validateCSRFtoken=0;
let csrfToken = 0;

    fetch("csrf.php", {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then (data => setCSRF(data))
    .catch(err => console.error(err));
    
    function setCSRF (data) {
     csrfToken = data.CSRFtoken;
    }

function loginAjax(event) {
    
const username = document.getElementById("username").value; // Get the username from the form
const password = document.getElementById("password").value; // Get the password from the form

// Make a URL-encoded string for passing POST data:
const data = { 'username': username, 'password': password};

fetch("login.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => data.success ? remove_sidenav(data) : alert(`${data.message}`))
    .catch(err => console.error(err));
}


function remove_sidenav(data){
$(".sidenav").hide();
$('#username').val('');
$('#password').val('');
$(".select_btn").show();
$(".loggedin_nav").show();
validateCSRFtoken = data.CSRFtoken;
userLoggedIn = true;
updateCalendar();
//set validate csrf token
}
