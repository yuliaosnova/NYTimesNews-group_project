import countCard from '../../js/countCard';
// import countCard from './createOneCard';
export default function createCards(arr, ref, page = 1) {
  const num = countCard();
  const showArr = arr.slice((page - 1) * num, page * num);
  // console.log(arr, showArr);
  // const str = showArr.map(createOneCard);
}
