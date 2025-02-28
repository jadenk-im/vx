document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const images = Array.from(document.querySelectorAll(".clickable-image"));
    const prevButton = document.querySelector(".prev-lightbox");
    const nextButton = document.querySelector(".next-lightbox");

    let currentIndex = 0;
    let lastScrollY = window.scrollY;

    if (!lightbox || !lightboxImg || !prevButton || !nextButton) {
        console.error("Lightbox elements missing in the DOM.");
        return;
    }

    images.forEach((img, index) => {
        img.addEventListener("click", (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    const openLightbox = (index) => {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
        lastScrollY = window.scrollY;
    };

    const closeLightbox = () => {
        lightbox.classList.remove("show");
        document.body.style.overflow = "auto";
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    };

    lightbox.addEventListener("click", (e) => {
        if (e.target !== prevButton && e.target !== nextButton) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.classList.contains("show")) {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeLightbox();
        }
    });

    prevButton.addEventListener("click", (e) => {
        e.stopPropagation();
        prevImage();
    });

    nextButton.addEventListener("click", (e) => {
        e.stopPropagation();
        nextImage();
    });

    window.addEventListener("scroll", () => {
        if (lightbox.classList.contains("show")) {
            if (Math.abs(window.scrollY - lastScrollY) > 50) { 
                closeLightbox();
            }
        }
    });
});
