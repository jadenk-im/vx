const renderProject = () => {
  const mainContainer = document.querySelector('.project-container');
  window.lockScreen();

  const projectId = new URLSearchParams(window.location.search).get('id');

  db.collection('projects').doc(projectId).get().then(doc => {
    if (!doc.exists) {
      console.error('No such document!');
      mainContainer.innerHTML = '<p>Project not found.</p>';
      return;
    }

    let contentHTML = '';
    const mediaItems = doc.data().project;
    let loadedItems = 0;

    mediaItems.forEach((item, index) => {
      if (item.startsWith('https://')) {
        contentHTML += `<img class="project-image" alt="Image ${index + 1}" src="${item}">`;
      } else {
        contentHTML += `<div class="video-container">
                          <iframe src="https://player.vimeo.com/video/${item}" frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>
                          <div class="video-overlay"></div>
                        </div>`;
      }
    });

    mainContainer.innerHTML = contentHTML;

    const mediaElements = mainContainer.querySelectorAll('img, iframe');
    mediaElements.forEach(media => {
      media.onload = () => {
        loadedItems++;
        window.incrementLoadingProgress((loadedItems / mediaItems.length) * 100);

        if (loadedItems === mediaItems.length) {
          window.incrementLoadingProgress(100);
        }
      };

      // For iframes, there is no 'load' event, so consider them loaded immediately
      if (media.tagName.toLowerCase() === 'iframe') {
        media.onload();
      }
    });

  }).catch(error => {
    console.error('Error:', error);
    mainContainer.innerHTML = '<p>Error loading project.</p>';
    window.unlockScreen();
  });
};

renderProject();
