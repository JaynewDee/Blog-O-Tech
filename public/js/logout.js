// Send post request to api/user/logout controller endpoint to check for an active session.
// If session is alive, end it.
const logout = async () => {
   const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
    });

  if (response.ok) {
    document.location.replace('/api/user/login');
  } else {
    alert(response.statusText);
  }
};



// Write front-end logic for sending post request for new blogpost
document.querySelector('#logout').addEventListener('click', logout);
