window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabContent = document.querySelectorAll('.tabcontent'),
        tabheaderItems = document.querySelector('.tabheader__items'),
        tabheaderItem = document.querySelectorAll('.tabheader__item');

  function removesTabs() {

    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabheaderItem.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function addTabs(i = 0) {
      tabContent[i].classList.add('show', 'fade');
      tabContent[i].classList.remove('hide');
      tabheaderItem[i].classList.add('tabheader__item_active');
  }

  removesTabs();
  addTabs();

  tabheaderItems.addEventListener( "click", function(event) {
    let target = event.target;

    if(target && target.classList.contains('tabheader__item')) {
      tabheaderItem.forEach((item, i) => {
        if (target == item) {
          removesTabs();
          addTabs(i);
        }
      });
    }
  });

  // Timer

  const deadline = new Date(2022, 11, 31);

  function balanceBeforeDeadline() {
    const diff = deadline - new Date();
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

    return {
      "diff": diff,
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds,
    };
  }

  function pad(x) {
    return x < 10 ? '0' + x : x;
  }

  const timerInterval = setInterval(timerOnThePage, 1000);

  function timerOnThePage(newTime) {
    const t = balanceBeforeDeadline(newTime);
    const timer = document.querySelector('.timer'),
          days  = timer.querySelector('#days'),
          hours  = timer.querySelector('#hours'),
          minutes  = timer.querySelector('#minutes'),
          seconds  = timer.querySelector('#seconds');

          days.innerHTML = pad(t.days);
          hours.innerHTML = pad(t.hours);
          minutes.innerHTML = pad(t.minutes);
          seconds.innerHTML = pad(t.seconds);
  }

  timerOnThePage();

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

});