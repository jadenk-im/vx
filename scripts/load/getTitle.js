document.addEventListener('DOMContentLoaded', () => {
    const projectId = 'intersections';
    window.lockScreen();
    const backgroundContainer = document.querySelector('.background-container');
  
    db.collection('explorations').doc(projectId).get().then(doc => {
      if (!doc.exists) {
        console.error('No such document!');
        window.unlockScreen();
        return;
      }
  
      const { content, type } = doc.data();
      if (type === 'image') {
        backgroundContainer.style.backgroundImage = `url('${content}')`;
        backgroundContainer.style.backgroundSize = 'cover';
        backgroundContainer.style.backgroundPosition = 'center center';
        window.incrementLoadingProgress(100);
        window.unlockScreen();
      } else if (type === 'video') {
        // Clear the background image if any
        backgroundContainer.style.backgroundImage = 'none';
        // Prepare the container for the Vimeo player
        backgroundContainer.innerHTML = `<div id="vimeo-player"></div>`;
        const options = {
          id: content,
          background: true,
          muted: true,
          autoplay: true,
          loop: true
        };
        const player = new Vimeo.Player('vimeo-player', options);
        player.setVolume(0); // Ensure it's muted if the background property doesn't apply
        player.on('loaded', () => {
          window.incrementLoadingProgress(100);
          window.unlockScreen();
        });
      }
    }).catch(error => {
      console.error('Error:', error);
      window.unlockScreen();
    });
  });
  