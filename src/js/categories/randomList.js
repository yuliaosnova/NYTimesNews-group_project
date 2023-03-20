import { CATEGORIES_LENGTH } from '../constants';
export default function randomList(list) {
  const set = new Set();
  if (CATEGORIES_LENGTH > list.length) {
    console.error(
      `Error: number of download categories more then ${CATEGORIES_LENGTH}`
    );
  }
  const date = new Date();
  while (set.size < CATEGORIES_LENGTH) {
    const num = Math.ceil(Math.random() * list.length);
    const len = list[num]?.length;
    if ((len < 10 && Date.now() - date < 10) || set.size > 6)
      set.add(list[num]);
  }
  return set;
}
