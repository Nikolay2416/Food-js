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

  // Классы для создание карточек меню

  class MenuTemplates {
    constructor(imgSrc, alt, h3, divDescr, divCost, divTotalSpan, divTotal, parentSelector, ...classes) {
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.h3 = h3;
      this.divDescr = divDescr;
      this.divCost = divCost;
      this.divTotalSpan = divTotalSpan;
      this.divTotal = divTotal;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 2;
      this.changeToUAH();
    }

    changeToUAH() {
      this.divTotalSpan = this.divTotalSpan * this.transfer;
    }

    addingInformationToTheSite() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
          this.classes = "menu__item";
          element.classList.add(this.classes);
      } else {
          this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML += `
        <img src="${this.imgSrc}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.h3}"</h3>
        <div class="menu__item-descr">${this.divDescr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">${this.divCost}</div>
            <div class="menu__item-total"><span>${this.divTotalSpan}</span> ${this.divTotal}</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  const fitnessMenu = new MenuTemplates(
        'img/tabs/vegy.jpg', 
        'vegy', 
        'Меню "Фитнес', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        'Цена:', 
        229, 
        'грн/день',
        ".menu .container");

  const premiumMenu = new MenuTemplates(
        'img/tabs/elite.jpg', 
        'elite', 
        'Меню "Премиум', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        'Цена:', 
        550, 
        'грн/день',
        ".menu .container");

  const menuLean = new MenuTemplates(
        'img/tabs/post.jpg', 
        'post', 
        'Меню "Постное', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        'Цена:', 
        430, 
        'грн/день',
        ".menu .container");

  fitnessMenu.addingInformationToTheSite();
  premiumMenu.addingInformationToTheSite();
  menuLean.addingInformationToTheSite();

  // Forms 

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMassage = document.createElement('div');
      statusMassage.classList.add('status');
      statusMassage.textContent = message.loading;
      form.append(statusMassage);
      
      const requst = new XMLHttpRequest();
      requst.open('POST', 'server.php');

      const formData = new FormData(form);

      requst.send(formData);

      requst.addEventListener('load', () => {
        if (requst.status === 200) {
          console.log(requst.response);
          statusMassage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMassage.remove();
          }, 2000);
        } else {
          statusMassage.textContent = message.failure;
        }
      });
    });
  }

});