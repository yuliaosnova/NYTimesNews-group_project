import { ref } from './header/refFunHeader';
import onSearchSubmit from './onSearchSubmit';
import onClikSearchBtn from './header/onClikSearchBtn';
import onClickSwitcher from './header/onClickSwitcher';
import defineSite from './header/defineSite';
import setCssClassCurrent from './header/setCssClassCurrent';

// ------- HEADER MAIN SCRIPT ---------
export default function jsScriptHeader() {
  ref.formSearch.addEventListener('submit', onSearchSubmit);

  ref.btnSearchInput.addEventListener('click', onClikSearchBtn);

  ref.burger.addEventListener('click', () => {
    ref.menu.classList.remove('is-hidden');
    document.querySelector('.calendar__box').style.visibility = 'hidden';
  });

  ref.cross.addEventListener('click', () => {
    ref.menu.classList.add('is-hidden');
    document.querySelector('.calendar__box').style.visibility = 'visible';
  });

  // ---- switch handler binder ------

  const isDark = localStorage.getItem('isDark') || '';
  if (isDark) ref.body.classList.add('isDark');

  const onClickSwitcherBinder = onClickSwitcher.bind(this, ref.body);

  for (const el of ref.switcher) {
    el.addEventListener('click', onClickSwitcherBinder);
  }
  // ----- define & set class 'current' to site ------

  const site = defineSite(ref.main);
  setCssClassCurrent(ref.menuNav, ref.siteNav, site);
}
