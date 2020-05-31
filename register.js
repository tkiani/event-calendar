 //Register stuff
 document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click

 function registerAjax(event) {
    const newusername = document.getElementById("newusername").value; // Get the username from the form
    const newpassword = document.getElementById("newpassword").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = {'newusername': newusername, 'newpassword': newpassword};

    fetch("register.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => register_success(data))
        .catch(err => console.error(err));
}

function register_success(data){
        if(data.success){
            alert('You have successfully registered!')
            $('#newusername').val('');
            $('#newpassword').val('');
        }
        else {
            alert(`${data.message}`);
            $('#newusername').val('');
            $('#newpassword').val('');
        }
}

