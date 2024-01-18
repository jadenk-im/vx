const mobileMenu = () => {
    const html = document.documentElement;
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.querySelectorAll('.mobile-menu-button');
    let scrollPosition = 0; // Variable to store the scroll position

    const toggleMobileMenu = () => {
        const isMenuVisible = mobileMenu.style.display === 'flex';

        if (isMenuVisible) {
            // Menu is currently visible; about to hide it
            html.style.removeProperty('position');
            html.style.removeProperty('top');
            window.scrollTo(0, scrollPosition); // Scroll to the original position
        } else {
            // Menu is currently hidden; about to show it
            scrollPosition = window.pageYOffset; // Save the scroll position
            html.style.position = 'fixed';
            html.style.top = `-${scrollPosition}px`; // Offset the top to the negative scroll position
        }

        mobileMenu.style.display = isMenuVisible ? 'none' : 'flex';
        html.classList.toggle('no-scroll', !isMenuVisible);
    };

    mobileMenuButton.forEach(button => button.addEventListener('click', toggleMobileMenu));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMobileMenu));
};

document.addEventListener('DOMContentLoaded', mobileMenu);
