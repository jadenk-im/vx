document.addEventListener("DOMContentLoaded", () => {
  let activeModal = null;

  const closeActive = () => {
    if (!activeModal) return;
    activeModal.classList.remove("active");
    activeModal = null;
  };

  const openModal = (modal) => {
    document.querySelectorAll(".modal.active").forEach(m => m.classList.remove("active"));
    modal.classList.add("active");
    activeModal = modal;
  };

  // const infoUpdate = () => {
  //   const textElement = document.getElementById("contact-div");
  //   const mediaQuery = window.matchMedia("(max-width: 768px)");

  //   function handleScreenChange(e) {
  //     for (i in e) {
  //       if (i.matches) {
  //       // <= 768px
  //       textElement.textContent = "Placeholder";
  //     } else {
  //       // > 768px
  //       textElement.textContent = "Placeholder";
  //     }
  //     }
      
  //   }

  //   mediaQuery.addEventListener("change", handleScreenChange);

  //   // run at load
  //   handleScreenChange(mediaQuery);
  // };

  document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-toggle]");
    if (!button) return;

    const modalId = `${button.dataset.toggle}-modal`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (activeModal === modal) closeActive();
    else openModal(modal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeActive();
  });
});
