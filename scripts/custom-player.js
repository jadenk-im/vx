document.addEventListener('DOMContentLoaded', () => {
  const videoContainers = document.querySelectorAll('.custom-play-button-container');

  videoContainers.forEach(container => {
    const player = container.querySelector('mux-player');
    const playBtn = container.querySelector('.custom-play-button');

    if (!player || !playBtn) return;

    playBtn.addEventListener('click', () => {
      container.classList.add('is-active');
      player.play();
    });
  });
});