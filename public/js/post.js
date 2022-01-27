const newPostHandler = async (event) => {
   event.preventDefault();
   event.stopPropagation();
   
   // Collect values from the post form
   const name = document.querySelector('#post-name').value.trim();
   const body = document.querySelector('#post-body').value.trim();
 
   if (name && body) {
     // Send a POST request to the API endpoint
     const response = await fetch('/api/post/new', {
       method: 'POST',
       body: JSON.stringify({ name, body }),
       headers: { 'Content-Type': 'application/json'},
     });
     console.log(response)
     if (response.ok) {
       document.location.replace('/home')
     } else {
       alert(response.statusText);
     }
   }
   else {
     alert('Please add text to both fields!')
   }
 };
document.querySelector('.post-form').addEventListener('submit', newPostHandler)