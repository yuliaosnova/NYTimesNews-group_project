import createDropList from './categories/createDropList';
import onDrop from './categories/onDrop';
import onClikCategories from './categories/onClikCategories';
import randomList from './categories/randomList';
import { ref } from './categories/refCaregories';
import { makeVisibleCategories } from './categories/isHidden';
import { hidCategorySectionOnError } from './categories/isHidden';
import { onError } from './renderPopularNews';

export default function categores(news) {
  const bindOnClikCategories = onClikCategories.bind(this, news);

  ref.drop.addEventListener('click', onDrop);
  ref.list.addEventListener('click', bindOnClikCategories);

  handlerCetegories(news);
}

// doing for resize or reload
async function handlerCetegories(news) {
  try {
    await getCategories(news).then(list => createListManager(list));
  } catch (error) {
    hidCategorySectionOnError();
    onError();
  }
}

async function getCategories(news) {
  try {
    const arrCategCommon = await news.categories;
    makeVisibleCategories();
    return arrCategCommon.map(el => el.display_name);
  } catch (error) {
    hidCategorySectionOnError();
    onError();
  }
}

function createListManager(list) {
  createDropList([...randomList(list)]);
}
