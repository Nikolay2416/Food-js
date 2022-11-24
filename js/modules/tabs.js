function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

  // Tabs

  const tabContent = document.querySelectorAll(tabsContentSelector),
  tabheaderItems = document.querySelector(tabsParentSelector),
  tabheaderItem = document.querySelectorAll(tabsSelector);

  function removesTabs() {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabheaderItem.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function addTabs(i = 0) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabheaderItem[i].classList.add(activeClass);
  }

  removesTabs();
  addTabs();

  tabheaderItems.addEventListener( "click", function(event) {
    let target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))) {
      tabheaderItem.forEach((item, i) => {
        if (target == item) {
          removesTabs();
          addTabs(i);
        }
      });
    }
  });
}

export default tabs;