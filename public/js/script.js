function openNav() {
  document.getElementById("mySidebar").classList.add('open');
  document.getElementById("menuIcon").classList.remove('fa-bars');
  document.getElementById("menuIcon").classList.add('fa-times');
  document.getElementById("menuButton").classList.add('open');

  setTimeout(() => {
    const links = document.querySelectorAll('.sidebar a');
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add('fade-in');
      }, index * 100); // Atraso de 100ms entre cada link
    });
  }, 500); // Espera até a sidebar estar completamente aberta
}

function closeNav() {
  const links = document.querySelectorAll('.sidebar a');
  links.forEach((link, index) => {
    setTimeout(() => {
      link.classList.remove('fade-in');
      link.classList.add('fade-out');
    }, index * 100); // Atraso de 100ms entre cada link
  });

  setTimeout(() => {
    document.getElementById("mySidebar").classList.remove('open');
    document.getElementById("menuIcon").classList.remove('fa-times');
    document.getElementById("menuIcon").classList.add('fa-bars');
    document.getElementById("menuButton").classList.remove('open');
    links.forEach(link => {
      link.classList.remove('fade-out');
    });
  }, links.length * 100 + 300); // Espera até o fade-out estar completo
}

function toggleNav() {
  if (document.getElementById("mySidebar").classList.contains('open')) {
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

