import NewsApiServes from './rest-api';

const news = new NewsApiServes();

const categoriesDropdownList = document.querySelector(
  '.categories-dropdown-list-js'
);
const othersDropdownList = document.querySelector('.others-dropdown-list-js');

async function getCategoryList() {
  if (document.title !== 'NYTimes News') {
    return;
  }
  const response = await news.requestListCategories();

  const markupOthers = response.data.results
    .map((arr, index) => {
      if (index > 5) {
        return `<li class="dropdown__item">
            <button class="dropdown__category-btn category__btn">${arr.display_name}</button>
          </li>`;
      }
    })
    .join('');
  othersDropdownList.innerHTML = markupOthers;

  const markupCategories = response.data.results
    .map(
      arr => `<li class="dropdown__item">
                            <button class="dropdown__category-btn category__btn">${arr.display_name}</button>
                        </li>`
    )
    .join('');
  categoriesDropdownList.innerHTML = markupCategories;
}
export { getCategoryList };
