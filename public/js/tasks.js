// tasks.js

document.addEventListener('DOMContentLoaded', () => {
    // Animação para os elementos da tabela
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.classList.add('fade-in');
        }, index * 100); // Atraso de 100ms entre cada linha
    });

    // Animação para a pesquisa
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('focus');
    });

    searchInput.addEventListener('blur', () => {
        searchInput.classList.remove('focus');
    });
});
