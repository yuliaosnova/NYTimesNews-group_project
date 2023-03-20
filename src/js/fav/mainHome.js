import { NEWS_CARD_CSS_CLASSES } from "./constants";
import { resolveFavClick } from "./common";

const newsCardsContainer = document.querySelector(`.${NEWS_CARD_CSS_CLASSES.container}`);
newsCardsContainer.addEventListener('click', resolveFavClick);