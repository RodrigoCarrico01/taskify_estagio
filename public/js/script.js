function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    localStorage.setItem('sidebarOpen', 'true');
    document.getElementById("menuIcon").classList.remove('fa-bars');
    document.getElementById("menuIcon").classList.add('fa-times');
    document.getElementById("menuButton").classList.add('open');
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    localStorage.setItem('sidebarOpen', 'false');
    document.getElementById("menuIcon").classList.remove('fa-times');
    document.getElementById("menuIcon").classList.add('fa-bars');
    document.getElementById("menuButton").classList.remove('open');
  }
  
  function toggleNav() {
    if (localStorage.getItem('sidebarOpen') === 'true') {
      closeNav();
    } else {
      openNav();
    }
  }
  
  document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('sidebarOpen') === 'true') {
      openNav();
    } else {
      closeNav();
    }
  });