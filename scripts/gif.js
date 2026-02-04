document.addEventListener("DOMContentLoaded", async () => {
    try {
    const res = await fetch(
        "https://api.giphy.com/v1/gifs/random?api_key=FJn3QHF7XUelXyIxPaPzVAoMlBVpYy4p"
    );
    const json = await res.json();
    const imageUrl = json.data.images.original.url;

    document.documentElement.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
    console.error("Error:", error);
    }
});