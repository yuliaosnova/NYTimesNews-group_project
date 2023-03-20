import { READ_PAGE_NEWS_CARDS_CONTAINER } from "./constants";
import { newsCardsFavChecker, resolveFavClick } from "./common";

const newsCardsContainer = document.querySelector(`.${READ_PAGE_NEWS_CARDS_CONTAINER}`);
newsCardsContainer.addEventListener('click', resolveFavClick);

newsCardsFavChecker();