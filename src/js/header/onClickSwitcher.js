// ---- switch handler ------
export default function onClickSwitcher(ref) {
  ref.classList.toggle('isDark');
  const isDark = localStorage.getItem('isDark');
  localStorage.setItem('isDark', isDark ? '' : true);
}
