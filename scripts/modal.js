document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll('[data-toggle]');
  const modals = document.querySelectorAll('.modal');
  let activeModal = null;

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = `${button.dataset.toggle}-modal`;
      const modal = document.getElementById(modalId);

      if (activeModal === modal) {
        modal.classList.remove('active');
        activeModal = null;
      } else {
        modals.forEach(m => m.classList.remove('active'));
        modal.classList.add('active');
        activeModal = modal;
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      activeModal.classList.remove('active');
      activeModal = null;
    }
  });
});
