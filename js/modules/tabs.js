function tabs() {

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
}

module.exports = tabs;