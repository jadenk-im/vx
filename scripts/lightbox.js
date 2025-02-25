document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");

    if (!lightbox || !lightboxImg) {
        console.error("Lightbox or Lightbox Image not found in the DOM.");
        return;
    }

    document.querySelectorAll(".clickable-image").forEach(img => {
        img.addEventListener("click", (e) => {
            e.preventDefault();
            lightboxImg.src = img.src;
            lightbox.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    const closeLightbox = () => {
        if (!lightbox.classList.contains("show")) return;
        lightbox.classList.remove("show");
        document.body.style.overflow = "auto";
    };

    lightbox.addEventListener("click", closeLightbox);
    window.addEventListener("scroll", closeLightbox);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
});
