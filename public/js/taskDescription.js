// public/js/taskDescription.js

document.addEventListener('DOMContentLoaded', function () {
    // Animação de fade-in no carregamento da página
    const container = document.querySelector('.task-container');
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.transition = 'opacity 0.5s';
      container.style.opacity = 1;
    }, 100);
  });
  