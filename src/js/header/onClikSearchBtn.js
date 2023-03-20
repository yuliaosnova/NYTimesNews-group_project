export default function onClikSearchBtn(e) {
  e.currentTarget.parentNode.firstElementChild.classList.add(
    'js-search-active'
  );
  e.currentTarget.classList.add('js-search-active');
}
