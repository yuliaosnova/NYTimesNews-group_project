export { touchLocalStorageArr, getPagesOffset, newsCardsFavChecker, resolveFavClick };
import {
  FAV_BUTTON_ICON_EMPTY_HTML,
  FAV_BUTTON_ICON_FILLED_HTML,
  FAV_BUTTON_ICON_FILL_COLOR,
  FAV_PAGES_KEY,
  MAX_WIDTH,
  NEWS_CARD_CSS_CLASSES,
  WEATHER_CARD_CSS_CLASS,
} from './constants';
import { withoutNews } from '../withoutNews';

function getPagesOffset(offsetsStruct) {
  if (window.matchMedia(`(max-width: ${MAX_WIDTH.mobile}px)`).matches) {
    return offsetsStruct.mobile;
  } else if (window.matchMedia(`(max-width: ${MAX_WIDTH.tablet}px)`).matches) {
    return offsetsStruct.tablet;
  } else {
    return offsetsStruct.desktop;
  }
}

// The function return data (array) from localStorage and can make changes with it using 'operatingFunc(array, data)' function
function touchLocalStorageArr(key, incomingData = null, operatingFunc = null) {
  let dataArr = [];
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      dataArr = JSON.parse(storedData);
    } catch (error) {
      console.log(error.message);
    }
  }
  if (operatingFunc) {
    operatingFunc(dataArr, incomingData);
    localStorage.setItem(key, JSON.stringify(dataArr));
  }
  return dataArr;
}

// It finds a news card that corresponds to an event ('click') target.
function getNewsCardNode(newsCardClassName, favButtonNode) {
  let newsCardNode = favButtonNode;
  while (!newsCardNode.classList.contains(newsCardClassName)) {
    newsCardNode = newsCardNode.parentElement;
  }
  return newsCardNode;
}

// Checks for a news card in the storage
function isInStorage(localStorageKey, newsCardNode) {
  const title = newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.title}`).textContent.trim();
  const idx = touchLocalStorageArr(localStorageKey).findIndex(struct => struct.title === title);
  return idx;
}

function removeCardFromFavorites(localStorageKey, idx, newsCardNode) {
  touchLocalStorageArr(localStorageKey, idx, removeFromArr);
  newsCardNode.remove();
  withoutNews();

  // newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.favButtonText}`).textContent = 'Add to favorite';
  // newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.favButtonIcon}`).innerHTML = FAV_BUTTON_ICON_EMPTY_HTML;
}
function removeFromArr(storageArr, idx) {
  storageArr.splice(idx, 1);
}

function addCardToFavorites(localStorageKey, newsCardNode) {
  touchLocalStorageArr(localStorageKey, newsCardNode, addToArr);
  markCardFavorite(newsCardNode);
}
function addToArr(storageArr, newsCardNode) {
  storageArr.unshift(collectData(newsCardNode));
}

function markCardFavorite(newsCardNode) {
  newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.favButtonText}`).textContent = 'In favorite';
  newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.favButtonIcon}`).innerHTML =
    FAV_BUTTON_ICON_FILLED_HTML;
}

function collectData(newsCardNode) {
  const dataStruct = {
    media: [
      {
        url: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.media}`).src,
        caption: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.media}`).alt,
      },
    ],
    title: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.title}`).textContent.trim(),
    section: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.section}`).textContent,
    subsection: '',
    abstract: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.abstract}`).textContent,
    published_date: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.published_date}`)
      .textContent,
    url: newsCardNode.querySelector(`.${NEWS_CARD_CSS_CLASSES.url}`).href,
  };
  return dataStruct;
}

function resolveFavClick(event) {
  if (
    !(
      event.target.classList.contains(NEWS_CARD_CSS_CLASSES.favButton) ||
      event.target.parentNode.classList.contains(NEWS_CARD_CSS_CLASSES.favButton) ||
      event.target.tagName === 'path'
    )
  ) {
    return;
  }

  const newsCardNode = getNewsCardNode(NEWS_CARD_CSS_CLASSES.card, event.target);

  const idx = isInStorage(FAV_PAGES_KEY, newsCardNode);
  idx > -1
    ? removeCardFromFavorites(FAV_PAGES_KEY, idx, newsCardNode)
    : addCardToFavorites(FAV_PAGES_KEY, newsCardNode);
}

function newsCardsFavChecker() {
  const cards = document.querySelectorAll(`.${NEWS_CARD_CSS_CLASSES.card}`);
  for (let card of cards) {
    if (card.classList.contains(WEATHER_CARD_CSS_CLASS)) {
      continue;
    }
    if (isInStorage(FAV_PAGES_KEY, card) > -1) {
      markCardFavorite(card);
    }
  }
}
