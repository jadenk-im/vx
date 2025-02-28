document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carousel").forEach((carousel) => {
        const slidesContainer = carousel.querySelector(".carousel-images");
        const slides = slidesContainer.children;
        const totalSlides = slides.length;

        let currentIndex = 1; // Start at first real slide (after the cloned one)
        let isTransitioning = false;

        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");

        // Clone first and last slides for seamless looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);

        // Adjust total slides count
        const updatedSlides = slidesContainer.children;
        const updatedTotalSlides = updatedSlides.length;

        // Move to first real slide (to avoid seeing the clone)
        slidesContainer.style.transform = `translateX(-100%)`;

        const updateSlidePosition = () => {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            slidesContainer.style.transition = "transform 0.5s ease-in-out";
        };

        const nextSlide = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;

            updateSlidePosition();

            setTimeout(() => {
                if (currentIndex === updatedTotalSlides - 1) {
                    slidesContainer.style.transition = "none";
                    currentIndex = 1;
                    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
                isTransitioning = false;
            }, 500);
        };

        const prevSlide = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;

            updateSlidePosition();

            setTimeout(() => {
                if (currentIndex === 0) {
                    slidesContainer.style.transition = "none";
                    currentIndex = updatedTotalSlides - 2;
                    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                }
                isTransitioning = false;
            }, 500);
        };

        prevButton.addEventListener("click", prevSlide);
        nextButton.addEventListener("click", nextSlide);
    });
});
