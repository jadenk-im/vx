document.addEventListener('DOMContentLoaded', (event) => {
    const aboutImages = document.querySelectorAll('img[src^="assets/images/about/"]');
    let loadedImages = 0;

    window.lockScreen();

    aboutImages.forEach(img => {
        img.addEventListener('load', () => {
            loadedImages++;
            const progress = (loadedImages / aboutImages.length) * 100;
            window.incrementLoadingProgress(progress);

            if (loadedImages === aboutImages.length) {
                window.incrementLoadingProgress(100);
            }
        });

        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
});
