const RESET_EVERY_TIME = false;

const vimeoCommand = (iframe, method, value) => {
  if (!iframe || !iframe.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ method, value }),
    "https://player.vimeo.com"
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const players = Array.from(document.querySelectorAll('iframe[src*="player.vimeo.com"]'));
  if (!("IntersectionObserver" in window) || players.length === 0) return;
  const hasStarted = new WeakMap();
  
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const iframe = entry.target;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        if (RESET_EVERY_TIME || !hasStarted.get(iframe)) {
          vimeoCommand(iframe, "setCurrentTime", 0);
          hasStarted.set(iframe, true);
        }
        vimeoCommand(iframe, "play");
      } else {
        vimeoCommand(iframe, "pause");
      }
    });
  }, {
    root: null,
    threshold: [0, 0.5],
    rootMargin: "0px 0px 0px 0px"
  });

  players.forEach(p => io.observe(p));
});
