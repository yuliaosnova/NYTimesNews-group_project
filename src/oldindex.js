import jsScriptHeader from './js/jsScriptHeader';
import { getCategoryList } from './js/category-search';
import popularNews from './js/renderPopularNews';
import { createCardPop } from './js/cardMarkup';
import { updateMarkup } from './js/markupUtils';
import { createCard } from './js/cardMarkup';
import { getWeatherWidget } from './js/weather';

import { onFavoriteBtnClick } from './js/onFavoriteBtn';
// import footerJs from './js/footer';
import { addEvtListOnReadMore } from './js/onReadLink';

import NewsApiServes from './js/rest-api';

const news = new NewsApiServes();

jsScriptHeader();
popularNews();
getCategoryList();

// getWeatherWidget();

console.log(news.getCardOrder());

export function renderCards(articles, identifier) {
  news.sizeScreenCompute();
  const markup = articles
    .map((article, idx) => {
      if (identifier === 'search') {
        if (idx !== news.getCardOrder()) {
          return createCard(article);
        }
        return getWeatherWidget();
      } else if (identifier === 'populate') {
        if (idx !== news.getCardOrder()) {
          return createCardPop(article);
        }
        return getWeatherWidget();
      }
    })
    .join('');
  updateMarkup(markup, newsBoxEl);
}

onFavoriteBtnClick();
addEvtListOnReadMore();
// footerJs();
