const renderProject = () => {
  const mainContainer = document.querySelector('.project-container');
  window.lockScreen();

  const projectId = new URLSearchParams(window.location.search).get('id');

  db.collection('projects').doc(projectId).get().then(doc => {
    if (!doc.exists) {
      console.error('No such document!');
      return mainContainer.innerHTML = '<p>Project not found.</p>';
    }

    const mediaItems = doc.data().project;
    mainContainer.innerHTML = mediaItems.map((item, index) => 
      item.startsWith('https://') ?
      `<img class="project-image" alt="Image ${index + 1}" src="${item}">` :
      `<div id="player-${index}" class="video-container"></div>`
    ).join('');

    mediaItems.forEach((item, index) => {
      if (!item.startsWith('https://')) {
        const shouldLoop = item.startsWith('loop-');
        const videoId = shouldLoop ? item.replace('loop-', '') : item;

        new Vimeo.Player(`player-${index}`, {
          url: `https://vimeo.com/${videoId}`,
          id: videoId,
          controls: !shouldLoop,
          autoplay: shouldLoop,
          background: shouldLoop,
          loop: shouldLoop,
          muted: true,
          byline: false,
          title: false,
          portrait: false
        });
      }
    });

    loadMediaElements(mainContainer, mediaItems.length);
  }).catch(error => {
    console.error('Error:', error);
    mainContainer.innerHTML = '<p>Error loading project.</p>';
    window.unlockScreen();
  });
};

const loadMediaElements = (container, totalItems) => {
  let loadedItems = 0;
  container.querySelectorAll('img, iframe').forEach(media => {
    media.onload = () => {
      if (++loadedItems === totalItems) {
        window.incrementLoadingProgress(100);
      } else {
        window.incrementLoadingProgress((loadedItems / totalItems) * 100);
      }
    };

    if (media.tagName.toLowerCase() === 'iframe') {
      media.onload();
    }
  });
};

renderProject();
