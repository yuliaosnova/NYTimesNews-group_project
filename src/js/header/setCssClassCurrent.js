export default function setCssClassCurrent(menu, site, id) {
  setClass(menu, id);
  setClass(site, id);
  function setClass(element, id) {
    element.childNodes.forEach(el => {
      if (el.nodeName === 'LI') {
        el.classList.remove('current');
        if (el.childNodes[1].textContent.trim() === id)
          el.classList.add('current');
      }
    });
  }
}
