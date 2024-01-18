const mobileMenu = () => {
    const html = document.documentElement;
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuButton = document.querySelectorAll('.mobile-menu-button');
    let scrollPosition = 0;

    const toggleMobileMenu = () => {
        const isMenuVisible = mobileMenu.style.display === 'flex';

        if (isMenuVisible) {
            html.classList.remove('no-scroll');
            setTimeout(() => {
                window.scrollTo(0, scrollPosition);
            }, 0);
        } else {
            scrollPosition = window.pageYOffset;
            html.classList.add('no-scroll');
        }

        mobileMenu.style.display = isMenuVisible ? 'none' : 'flex';
    };

    mobileMenuButton.forEach(button => button.addEventListener('click', toggleMobileMenu));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMobileMenu));
};

document.addEventListener('DOMContentLoaded', mobileMenu);
