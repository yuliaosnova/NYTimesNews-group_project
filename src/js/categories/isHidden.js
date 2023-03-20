import { ref } from './refCaregories';
const page = document.querySelector('.not-find');

function makeVisibleCategories() {
  ref.list.style.visibility = 'visible';
}

function makeHiddenCategories() {
  ref.list.style.visibility = 'hidden';
}

function hidCategorySectionOnError() {
  ref.categories.style.display = 'none';
}

function showCategorySectionOnError() {
  ref.categories.style.display = 'flex';
}

function makeHiddenThumb() {
  page.classList.remove('find');
}

export {
  showCategorySectionOnError,
  makeVisibleCategories,
  makeHiddenCategories,
  hidCategorySectionOnError,
  makeHiddenThumb,
};
