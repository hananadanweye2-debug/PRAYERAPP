function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleSearch() {
  const input = document.getElementById("searchInput");
  input.style.display = input.style.display === "inline-block" ? "none" : "inline-block";
  input.focus();
}

// Handle menu clicks
function handleAction(action) {
  switch(action) {
    case 'settings':
      alert("Open Settings");
      break;
    case 'rate':
      alert("Redirect to Rate App");
      break;
    case 'about':
      alert("Open About Page");
      break;
    case 'help':
      alert("Open Help Section");
      break;
    case 'share':
      alert("Share App");
      break;
  }
}

// Close menu when clicking outside
document.addEventListener("click", function(e) {
  const menu = document.getElementById("dropdownMenu");
  if (!e.target.closest(".menu-container")) {
    menu.style.display = "none";
  }
});
