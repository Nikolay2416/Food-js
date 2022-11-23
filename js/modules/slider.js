function slider() {
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
}

module.exports = slider;