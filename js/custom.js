// to get current year
function getYear() {
  var currentYear = new Date().getFullYear()
  document.querySelector('#displayYear').innerHTML = currentYear
}
// nav menu
function openNav() {
  document.getElementById('myNav').classList.toggle('menu_width')
  document.querySelector('.custom_menu-btn').classList.toggle('menu_btn-style')
}
