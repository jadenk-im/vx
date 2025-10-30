document.addEventListener("DOMContentLoaded", () => {
  const iframes = Array.from(document.querySelectorAll('iframe[src*="player.vimeo.com"]'));
  if (iframes.length === 0) return;

  const hasStarted = new WeakMap();

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const iframe = entry.target;
      const player = new Vimeo.Player(iframe);

      player.ready().then(() => {
        iframe.setAttribute("playsinline", "");
        iframe.setAttribute("webkit-playsinline", "");
      });

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const first = !hasStarted.get(iframe);
        const startAtZero = first ? player.setCurrentTime(0) : Promise.resolve();

        startAtZero
          .then(() => player.setVolume(0))
          .then(() => player.play())
          .catch(() => {
            setTimeout(() => player.play().catch(()=>{}), 300);
          });

        hasStarted.set(iframe, true);
      } else {
        player.pause().catch(()=>{});
      }
    });
  }, { threshold: [0.5] });

  iframes.forEach(iframe => io.observe(iframe));
});