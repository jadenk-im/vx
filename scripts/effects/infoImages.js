const infoImages = () => {
    const images = document.querySelectorAll('img');
    
    const resetBackground = () => {
        document.body.style.backgroundImage = '';
    };

    const applyBackground = (img, index) => {
        resetBackground();
        document.body.style.backgroundImage = 'url(' + img.src + ')';
        document.body.style.backgroundPosition = index === 0 ? 'bottom' : 'center';
    };

    images.forEach((img, index) => {
        img.addEventListener('mouseover', () => applyBackground(img, index));
        img.addEventListener('mouseout', resetBackground);

        img.addEventListener('touchstart', (event) => {
            applyBackground(img, index);
            event.preventDefault();
        }, {passive: true});
    });

    document.addEventListener('touchstart', (event) => {
        if (!event.target.matches('img')) {
            resetBackground();
        }
    }, {passive: true});
};

document.addEventListener('DOMContentLoaded', infoImages);
