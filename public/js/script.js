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

  document.addEventListener('DOMContentLoaded', (event) => {
    // Animação dos contadores
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
  
        const increment = target / 200;
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
  
      updateCount();
    });
  });
  