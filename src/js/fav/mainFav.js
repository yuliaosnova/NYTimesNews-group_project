import {
  FAV_BUTTON_ICON_FILLED_HTML,
  FAV_PAGES_KEY,
  NEWS_CARD_CSS_CLASSES,
  OFFSETS_FAVORITES,
  FAV_BUTTON_ICON_FILLED_HTML,
} from './constants';
import { resolveFavClick } from './common';
import StoragePagesController from './storagePagesController';
import throttle from 'lodash.throttle';
import { withoutNews } from '../withoutNews';

const newsCardsContainer = document.querySelector(`.${NEWS_CARD_CSS_CLASSES.container}`);
newsCardsContainer.addEventListener('click', resolveFavClick);

const storagePagesController = new StoragePagesController(FAV_PAGES_KEY, OFFSETS_FAVORITES);
const firstPage = storagePagesController
  .getPageData()
  .reduce((markup, article) => createFavCardPop(article) + markup, '');
newsCardsContainer.insertAdjacentHTML('beforeend', firstPage);

window.addEventListener(
  'scroll',
  throttle(() => {
    continuePage();
  }, 300)
);

function continuePage() {
  if (window.innerHeight + window.scrollY < document.body.offsetHeight - 1) {
    return;
  }
  const nextPageData = storagePagesController.getNextPageData();
  if (nextPageData) {
    const markup = nextPageData.reduce((markup, article) => createFavCardPop(article) + markup, '');
    newsCardsContainer.insertAdjacentHTML('beforeend', markup);
  }
}

function createFavCardPop({ media, title, section, subsection, abstract, published_date, url }) {
  return `
          <li class="news-item">
          <div class="overlay"></div>
          <div class="img-thumb">
          <span class="readable"
          >Already read
          <svg class="icon-done" width="18" height="18"><use
          href="/sprite.f14d31f7.svg#arrow-done"></use></svg>
            </span>
            <img src="${
              !media[0]
                ? 'https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/The_New_York_Times.jpg'
                : media[0].url
            }" loading="lazy" alt="${!media[0] ? 'NYTimes' : media[0].caption}" class="news-img" />
            <p class="news-chip">${section || subsection}</p>
            <button type="button" class="add-news-favorite">
              <p class="favorite-btn-text">Remove from favorite</p>
              <svg class="favorite-icon" width="16" height="16" viewBox="0 0 32 32" style="fill: #4440F6;">
                ${FAV_BUTTON_ICON_FILLED_HTML}
              </svg> 
            </button>
          </div>
          <div class="news-info">
            <h2 class="news-title disable-scroll">
              ${title}
            </h2>
            <p class="news-desk">
            ${abstract}
            </p>
            <div class="adding">
              <p class="news-date">${published_date}</p>
              <a
                href=${url}
                class="news-link"
                target="_blank"
                rel="noopener noreferrer"
                >Read more</a
              >
            </div>
          </div>
        </li> `;
}

withoutNews();
