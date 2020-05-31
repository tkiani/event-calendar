document.getElementById("logout_btn").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click

document.getElementById("delete-logout_btn").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click

document.getElementById("edit-logout_btn").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click

function logoutAjax(event) {
    fetch("logout.php", {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => data.success ? show_sidenav(data) : alert("Can not log out!"))
    .catch(err => console.error(err));
}

function show_sidenav(data){
    if(data.success){
      $(".sidenav").show();
    $(".loggedin_nav").hide();
    $(".deleteEventNavigation").hide();
    $(".editEventNavigation").hide();  
    $(".select_btn").hide();  
    userLoggedIn = false;
    updateCalendar();
    }
    
}
