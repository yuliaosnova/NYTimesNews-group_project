export { FAV_PAGES_KEY, OFFSETS_FAVORITES, MAX_WIDTH, NEWS_CARD_CSS_CLASSES, WEATHER_CARD_CSS_CLASS, READ_PAGE_NEWS_CARDS_CONTAINER, FAV_BUTTON_ICON_FILL_COLOR, FAV_BUTTON_ICON_FILLED_HTML, FAV_BUTTON_ICON_EMPTY_HTML };


const FAV_PAGES_KEY = 'favPagesData';
const WEATHER_CARD_CSS_CLASS = 'weather__card';
const READ_PAGE_NEWS_CARDS_CONTAINER = 'read';
const FAV_BUTTON_ICON_FILL_COLOR = '#4440F6';


const OFFSETS_FAVORITES = {
    mobile: 5,
    tablet: 8,
    desktop: 9,
};
Object.freeze(OFFSETS_FAVORITES);


const MAX_WIDTH = {
    mobile: 320,
    tablet: 768,
};
Object.freeze(MAX_WIDTH);


const NEWS_CARD_CSS_CLASSES = {
    container: 'news-container',
    card: 'news-item',
    favButton: 'add-news-favorite',
    favButtonText: 'favorite-btn-text',
    favButtonIcon: 'favorite-icon',
    
    inFavorites: 'in-favorites',

    title: 'news-title',
    abstract: 'news-desk',
    section: 'news-chip',
    media: 'news-img',
    published_date: 'news-date',
    url: 'news-link',
};
Object.freeze(NEWS_CARD_CSS_CLASSES);


const FAV_BUTTON_ICON_FILLED_HTML = '<path class="icon-heart" d="M8.381 2.286C4.174 2.286.762 5.663.762 9.829c0 3.363 1.333 11.345 14.458 19.413a1.501 1.501 0 0 0 1.56 0c13.125-8.069 14.458-16.05 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543S16 6.857 16 6.857s-3.412-4.571-7.619-4.571z"/>';
const FAV_BUTTON_ICON_EMPTY_HTML = '<path class="icon-empty-heart" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.333 4c-3.681 0-6.667 2.955-6.667 6.6 0 2.943 1.167 9.927 12.651 16.987a1.316 1.316 0 0 0 1.366 0c11.484-7.06 12.651-14.044 12.651-16.987 0-3.645-2.985-6.6-6.667-6.6S16 8 16 8s-2.985-4-6.667-4z" />';