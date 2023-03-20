import jsScriptHeader from './js/jsScriptHeader';
import { getCategoryList } from './js/category-search';
import weatherTemplate from './template/weatherTemplate';
import { getWeatherWidget } from './js/weather';
import popularNews from './js/renderPopularNews';
import { createCardPop } from './js/cardMarkup';
import { updateMarkup } from './js/markupUtils';
import { createCard } from './js/cardMarkup';
import jsCalendar from './js/calendar';
import { readLinksStyling } from './js/readLinksStyling';
import categories from './js/categories';
import NewsApiServes from './js/rest-api';
import footerJs from './js/footer';
import { pagiantePopularNews } from './js/pagiginatePopNews.js';
import { makeHiddenCategories } from './js/categories/isHidden';

const newsBoxEl = document.querySelector('.news-container');
const news = new NewsApiServes();

jsScriptHeader();
if (document.title === 'NYTimes News') {
  jsCalendar();
  makeHiddenCategories();
  categories(news);
  // readLinksStyling();
}

footerJs();
