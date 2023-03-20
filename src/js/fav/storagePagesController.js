import { touchLocalStorageArr, getPagesOffset } from './common';

export default class StoragePagesController {
    #offset = 0;
    #pagesNum = 0;
    #page = 1;

    #localStorageKey = '';
    #offsetsStruct = {};

    #localStorageArr = [];

    constructor(localStorageKey, offsetsStruct) {
        this.#localStorageKey = localStorageKey;
        this.#offsetsStruct = offsetsStruct;
        this.refresh();
    }

    refresh() {
        this.#localStorageArr = touchLocalStorageArr(this.#localStorageKey);
        this.#offset = getPagesOffset(this.#offsetsStruct);
        this.#pagesNum = this.#getPagesNum();
    }

    #getPagesNum() {
        return Math.ceil(this.#localStorageArr.length / this.#offset);
    }

    getPageData() {
        return this.#localStorageArr.slice((this.#page - 1) * this.#offset, this.#page * this.#offset);
    };

    getNextPageData() {
        if (this.#page === this.#pagesNum) {
            return null;
        }
        ++this.#page;
        return this.getPageData();
    }
};