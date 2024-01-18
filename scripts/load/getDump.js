const getDump = maxImages => {
  const container = document.querySelector('#dump-container');

  db.collection('dump').get().then(querySnapshot => {
    window.lockScreen();
    const totalImages = querySnapshot.size;
    const displayLimit = maxImages > 0 && maxImages < totalImages ? maxImages : totalImages;
    let loadedImages = 0;

    querySnapshot.docs.slice(0, displayLimit).forEach(doc => {
      const { image } = doc.data();
      const img = new Image();
      img.src = image;
      img.alt = doc.id;
      img.onload = () => {
          loadedImages++;
          window.incrementLoadingProgress((loadedImages / displayLimit) * 100);

          if (loadedImages === displayLimit) {
              window.incrementLoadingProgress(100);
          }
      };
      container.appendChild(img);
    });

    if (totalImages > displayLimit) {
      // Load more logic
    }
  }).catch(error => {
    console.error("Error getting documents: ", error);
    window.unlockScreen();
  });
};

document.addEventListener('DOMContentLoaded', () => getDump(0));
