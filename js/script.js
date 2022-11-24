import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import cards from './modules/cards';
import {launchingAModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

  const modalTimetId = setTimeout(() => launchingAModalWindow('.modal', modalTimetId), 30000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', '[data-close]', modalTimetId);
  timer();
  calc();
  forms('form', modalTimetId);
  slider();
  cards();
  
});