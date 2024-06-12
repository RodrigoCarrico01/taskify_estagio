// statistics.js

document.addEventListener('DOMContentLoaded', () => {
    // Animação para os elementos das estatísticas
    const counts = document.querySelectorAll('.count');
    counts.forEach(count => {
        const updateCount = () => {
            const target = +count.getAttribute('data-count');
            const current = +count.innerText;

            const increment = target / 200;

            if (current < target) {
                count.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 10);
            } else {
                count.innerText = target;
            }
        };

        updateCount();
    });
});
