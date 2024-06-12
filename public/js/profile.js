// profile.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('displayNameModal');
    const btn = document.querySelector('.btn-edit-name'); // Correção: selecionando o botão com a classe btn-edit-name
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
        modal.classList.add('fade-in');
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
