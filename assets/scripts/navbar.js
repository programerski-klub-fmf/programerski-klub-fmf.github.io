document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Add a click event on each of them
  $navbarBurgers.forEach(elem => {
    elem.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = document.getElementById(elem.dataset.target)

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      elem.classList.toggle('is-active')
      target.classList.toggle('is-active')
    })
  })
})
