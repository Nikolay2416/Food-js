function launchingAModalWindow(modalSelector, modalTimetId) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  console.log(modalTimetId);
  if (modalTimetId) {
    clearInterval(modalTimetId);
  }
}

function closeModal(modalSelector){
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.style.display = 'none';
  document.body.style.overflow = '';
}



function modal(triggerSelector, modalSelector, closeModalSelector, modalTimetId) {
  // Modal

  const openAModalWindow = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector),
        closeTheModalWindow = document.querySelector(closeModalSelector);

  openAModalWindow.forEach(item => {
    item.addEventListener('click', () => {
      launchingAModalWindow(modalSelector, modalTimetId);
    });
  });

  closeTheModalWindow.addEventListener('click', () => closeModal(modalSelector));

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modalWindow.style.display === 'block') { 
        closeModal(modalSelector);
    }
  });

  const defaultOffset = 3300;

  const scrollPosition = () => document.documentElement.scrollTop;

  function callingAModalWindowWhenScrolling() {
    if(scrollPosition() > defaultOffset) {
      launchingAModalWindow(modalSelector, modalTimetId);
      window.removeEventListener('scroll', callingAModalWindowWhenScrolling);
    }
  }

  window.addEventListener('scroll', callingAModalWindowWhenScrolling);
}

export default modal;
export {launchingAModalWindow};
export {closeModal};