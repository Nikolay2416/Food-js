function modal() {
  // Modal

  const openAModalWindow = document.querySelectorAll('[data-modal]'),
  modalWindow = document.querySelector('.modal'),
  closeTheModalWindow = document.querySelector('[data-close]');

  function launchingAModalWindow() {
    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimetId);
  }

  function closeModal(){
    modalWindow.style.display = 'none';
    document.body.style.overflow = '';
  }

  openAModalWindow.forEach(item => {
    item.addEventListener('click', () => {
      launchingAModalWindow();
    });
  });

  closeTheModalWindow.addEventListener('click', closeModal);

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.style.display === 'block') { 
        closeModal();
    }
  });

  const modalTimetId = setTimeout(launchingAModalWindow, 30000);

  const defaultOffset = 3300;

  const scrollPosition = () => document.documentElement.scrollTop;

  function callingAModalWindowWhenScrolling() {
    if(scrollPosition() > defaultOffset) {
      launchingAModalWindow();
      window.removeEventListener('scroll', callingAModalWindowWhenScrolling);
    }
  }

  window.addEventListener('scroll', callingAModalWindowWhenScrolling);
}

module.exports = modal;