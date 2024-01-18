let currentProgress = 0;

const interpolateColor = (startColor, endColor, percentage) => {
    const [startR, startG, startB] = startColor;
    const [endR, endG, endB] = endColor;

    const r = Math.round(startR + (endR - startR) * (percentage / 100));
    const g = Math.round(startG + (endG - startG) * (percentage / 100));
    const b = Math.round(startB + (endB - startB) * (percentage / 100));

    return `rgb(${r}, ${g}, ${b})`;
};

const lockScreen = () => document.documentElement.classList.add('no-scroll');
const unlockScreen = () => document.documentElement.classList.remove('no-scroll');

const updateLoadingScreen = (percentage) => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;

    if (percentage >= 100) {
        loadingScreen.style.display = 'none';
        unlockScreen();
    }
};

const incrementLoadingProgress = (increment) => {
    currentProgress = Math.min(100, currentProgress + increment);
    updateLoadingScreen(currentProgress);
};

window.incrementLoadingProgress = incrementLoadingProgress;
window.lockScreen = lockScreen;
window.unlockScreen = unlockScreen;
