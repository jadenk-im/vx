const infoImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
        img.addEventListener('mouseover', () => {
            document.body.style.backgroundImage = 'url(' + img.src + ')';
            document.body.style.backgroundPosition = index === 0 ? 'bottom' : 'center';
        });
        img.addEventListener('mouseout', () => {
            document.body.style.backgroundImage = '';
        });
    });
};

document.addEventListener('DOMContentLoaded', infoImages);
