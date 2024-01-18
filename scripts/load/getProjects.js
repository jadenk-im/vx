const getProjects = maxProjects => {
  const section = document.querySelector('#projects-section');
  const container = section.querySelector('.projects-container');

  db.collection('projects').get().then(querySnapshot => {
    window.lockScreen();

    const totalProjects = querySnapshot.size;
    const displayLimit = maxProjects > 0 && maxProjects < totalProjects ? maxProjects : totalProjects;
    let loadedProjects = 0;

    querySnapshot.docs.slice(0, displayLimit).forEach(doc => {
      const { thumbnail, title, type } = doc.data();
      const id = doc.id;
      const projectHTML = `
        <a href="project.html?id=${id}" class="project-thumbnail">
          <div class="project-thumbnail-image" style="background-image: url(${thumbnail})"></div>
          <p>(${title})<br>${type}</p>
        </a>`;
      container.insertAdjacentHTML('beforeend', projectHTML);

      const img = new Image();
      img.onload = () => {
        loadedProjects++;
        window.incrementLoadingProgress((loadedProjects / displayLimit) * 100);

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
    window.unlockScreen();
  });
};
