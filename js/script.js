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

  // Используем классы для создание карточек меню

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH(); 
    }

    changeToUAH() {
      this.price = this.price * this.transfer; 
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
          this.classes = "menu__item";
          element.classList.add(this.classes);
      } else {
          this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
          new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
      });
    });

  // Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
      bindPostData(item);
  });

  const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
  };

  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
    
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    launchingAModalWindow();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
  }

  // Slider

  const prevSliderButton = document.querySelector('.offer__slider-prev'),
        nextSliderButton = document.querySelector('.offer__slider-next'),
        currentSlider = document.querySelector('#current'),
        totalSlider = document.querySelector('#total'),
        sliders = document.querySelectorAll('.offer__slide'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(sliderWrapper).width,
        offerSlider = document.querySelector('.offer__slider'),
        dots = [];

  let currentSlide = 1;
  let offset = 0;

  if(sliders.length < 10) {
      totalSlider.textContent = `0${sliders.length}`;
      currentSlider.textContent = `0${currentSlide}`;
    } else {
      totalSlider.textContent = sliders.length;
      currentSlider.textContent = currentSlide;
    }

  sliderInner.style.width = 100 * sliders.length +'%';
  sliderInner.style.display = 'flex';
  sliderInner.style.transition = '0.5s all';

  sliderWrapper.style.overflow = 'hidden';

  sliders.forEach(slide => {
    slide.style.width = width;
  });

  offerSlider.style.position = 'relative';

  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  offerSlider.append(indicators);

  for (let i = 0; i < sliders.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function weAreNotRemovingNumbers(meaning) {
   return +meaning.replace(/\D/g, '');
  }

  nextSliderButton.addEventListener('click', () => {
    if (offset == weAreNotRemovingNumbers(width) * (sliders.length - 1)) {
      offset = 0;
    } else {
      offset += weAreNotRemovingNumbers(width);
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (currentSlide == sliders.length) {
      currentSlide = 1;
    } else {
      currentSlide++;
    }

    if (sliders.length < 10) {
      currentSlider.textContent = `0${currentSlide}`;
    } else {
      currentSlider.textContent = currentSlide;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[currentSlide - 1].style.opacity = 1;
  });

  prevSliderButton.addEventListener('click', () => {
    if (offset == 0) {
      offset = weAreNotRemovingNumbers(width) * (sliders.length - 1);
    } else {
      offset -= weAreNotRemovingNumbers(width);
    }

    sliderInner.style.transform = `translateX(-${offset}px)`;

    if (currentSlide == 1) {
      currentSlide = sliders.length;
    } else {
      currentSlide--;
    }

    if (sliders.length < 10) {
      currentSlider.textContent = `0${currentSlide}`;
    } else {
      currentSlider.textContent = currentSlide;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[currentSlide - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      currentSlide = slideTo;
      offset = weAreNotRemovingNumbers(width) * (slideTo - 1);

      sliderInner.style.transform = `translateX(-${offset}px)`;

      if (sliders.length < 10) {
        currentSlider.textContent = `0${currentSlide}`;
      } else {
        currentSlider.textContent = currentSlide;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[currentSlide - 1].style.opacity = 1;
    });
  });

  // Calculator 

  const result = document.querySelector('.calculating__result span');
  const sexWrapper = document.querySelectorAll('#gender div');
  const sexWoman = document.querySelector('#woman');
  const inputWrapper = document.querySelectorAll('.calculating__choose_medium input');
  const inputHeight = document.querySelector('#height');
  const inputWeight = document.querySelector('#weight');
  const inputAge = document.querySelector('#age');
  const ratioWrapper = document.querySelectorAll('.calculating__choose_big div');
  const ratioLow = document.querySelector('#low');
  const ratioSmall = document.querySelector('#small');
  const ratioMedium = document.querySelector('#medium');
  const ratioHigh = document.querySelector('#high');

  let sex, height, weight, age, ratio;

  function checkLocalStorage(block, valueVariable) {
    if (localStorage.getItem(block)) {
      ratio = localStorage.getItem(block);
    } else {
      ratio = valueVariable;
      localStorage.setItem(block, valueVariable);
    }
  }
  checkLocalStorage('sex', 'woman');
  checkLocalStorage('ratio', 'small');

  function getStaticInformation(){
    sexWrapper.forEach(elem => {
      elem.classList.remove('calculating__choose-item_active');
      if(elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add('calculating__choose-item_active');
      }
    });

    ratioWrapper.forEach(elem => {
      elem.classList.remove('calculating__choose-item_active');
      if(elem.getAttribute('id') === localStorage.getItem('ratio')) {
        elem.classList.add('calculating__choose-item_active');
      }
    });
  }
  getStaticInformation();

  sexWrapper.forEach(item => {
    item.addEventListener("click", (e) => {
      sexWrapper.forEach(item => {
        item.classList.remove('calculating__choose-item_active');
        localStorage.setItem('sex', e.target.getAttribute('id'));
      });
      e.target.classList.add('calculating__choose-item_active');
      calcValues();
    });
  });

  inputWrapper.forEach(item => {
    item.addEventListener("input", () => calcValues());
  });

  ratioWrapper.forEach(item => {
    item.addEventListener("click", (e) => {
      ratioWrapper.forEach(item => {
        item.classList.remove('calculating__choose-item_active');
        localStorage.setItem('ratio', e.target.getAttribute('id'));
      });
      e.target.classList.add('calculating__choose-item_active');
      calcValues();
    });
  });

  function calcValues() {
    if (sexWoman.classList.contains('calculating__choose-item_active')) {
      sex = 447.6;
    } else {
      sex = 88.36;
    }

    numbersOnly(inputHeight);
    numbersOnly(inputWeight);
    numbersOnly(inputAge);

    height = inputHeight.value;
    weight = inputWeight.value;
    age = inputAge.value;

    if (ratioLow.classList.contains('calculating__choose-item_active')) {
      ratio = 1.2;
    } else if (ratioSmall.classList.contains('calculating__choose-item_active')) {
      ratio = 1.375;
    } else if (ratioMedium.classList.contains('calculating__choose-item_active')) {
      ratio = 1.55;
    } else if (ratioHigh.classList.contains('calculating__choose-item_active')) {
      ratio = 1.725;
    }

    calcTotal();
  }

  function numbersOnly(selector) {
    if (selector.value.match(/\D/g)) {
      selector.style.border = "1px solid red";
    } else {
      selector.style.border = 'none';
    }
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
    } else {
      result.textContent = Math.round((sex + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  calcTotal();
  calcValues();

});