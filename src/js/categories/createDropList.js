import { ref } from './refCaregories';

export default function createDropList(list) {
  ref.arrBtns.forEach((el, i) => {
    if (!el.classList.contains('drop-btn') && list[i]) {
      el.firstElementChild.textContent = list[i];
      el.dataset.category = list[i].toLowerCase();
    }
    // console.log(el, list[i]);
  });
}
