// Script that clears the warning that the website doesn't use cookies
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('no-cookie-button').addEventListener('click', () => {
    document.getElementById('no-cookie-warning').classList.add('is-hidden')
  })
})
