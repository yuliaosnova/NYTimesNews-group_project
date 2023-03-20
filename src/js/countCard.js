export default function countCard() {
  let num = 4;
  if (window.matchMedia('(min-width: 768px)').matches) num = 7;
  if (window.matchMedia('(min-width: 1200px)').matches) num = 8;
  return num;
}
