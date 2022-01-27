const redirect = async () => {
   const res = await fetch('/api/post/new', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
   })
   if (res.ok) {
      document.location.replace('/api/post/new')
   } else {
      alert(response.statusText);
   }
}

document.querySelector('#redirect-btn').addEventListener('click', redirect)
