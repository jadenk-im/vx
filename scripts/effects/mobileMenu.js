const mobileMenu = () => {
    const html = document.documentElement;
    const mobileMenuButton = document.querySelectorAll('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMobileMenu = () => {
        const isMenuVisible = mobileMenu.style.display === 'flex';
        mobileMenu.style.display = isMenuVisible ? 'none' : 'flex';
        html.classList.toggle('no-scroll', !isMenuVisible);
    };

    mobileMenuButton.forEach(button => button.addEventListener('click', toggleMobileMenu));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMobileMenu));
};

document.addEventListener('DOMContentLoaded', mobileMenu);
