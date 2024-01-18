const mobileHover = () => {
    const removeHoverClass = () => {
        const hoverElements = document.querySelectorAll('a:hover, button:hover');
        hoverElements.forEach(elem => {
            elem.classList.remove('hover');
        });
    }

    document.addEventListener('touchstart', (event) => {
        if (!event.target.matches('a, button')) {
            removeHoverClass();
        }
    });
};

document.addEventListener('DOMContentLoaded', mobileHover);
