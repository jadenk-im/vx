const getProjects = maxProjects => {
  const section = document.querySelector('#projects-section');
  const container = section.querySelector('.projects-container');
  const loadingScreen = document.querySelector('.loading-screen');

  db.collection('projects').get().then(querySnapshot => {
    window.lockScreen();

    const totalProjects = querySnapshot.size;
    const displayLimit = maxProjects > 0 && maxProjects < totalProjects ? maxProjects : totalProjects;
    let loadedProjects = 0;

    querySnapshot.docs.slice(0, displayLimit).forEach(doc => {
      const { thumbnail, title, date, hex } = doc.data();
      const id = doc.id;
      const projectHTML = `
      <a href="project.html?id=${id}" class="project-thumbnail" data-hex="#${hex}">
        <h1>${date} ${title}</h1>
      </a>`;
      container.insertAdjacentHTML('beforeend', projectHTML);

      const img = new Image();
      img.onload = () => {
        loadedProjects++;
        window.incrementLoadingProgress((loadedProjects / displayLimit) * 100);

        const imgElement = document.createElement('img');
        imgElement.src = thumbnail;
        imgElement.classList.add('thumbnail-image');
        imgElement.id = `${id}-thumbnail`;
        imgElement.style.display = 'none';
        document.body.appendChild(imgElement);

        const thumbnailElement = container.querySelector(`a[href="project.html?id=${id}"]`);

        thumbnailElement.addEventListener('mouseover', () => {
          document.body.style.backgroundColor = `#${hex}`;
          imgElement.style.display = 'block';
        });
        thumbnailElement.addEventListener('mouseout', () => {
          document.body.style.backgroundColor = ''; // Optionally, reset to a default color
          imgElement.style.display = 'none';
        });

        if (loadedProjects === displayLimit) {
          window.incrementLoadingProgress(100);
        }
      };
      img.src = thumbnail;
    });

    if (totalProjects > displayLimit) {
      section.insertAdjacentHTML('beforeend', `<a href="projects.html" class="view-all-projects"><h2>View all projects</h2></a>`);
    }
  }).catch(error => {
    console.error("Error getting documents: ", error);
    console.log('yuh');
    loadingScreen.innerHTML = `<h1>Could not load. Please refresh.</h1>`;
  });
};
