function calc() {
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
}

export default calc;