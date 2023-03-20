export function onFavoriteBtnClick (){
const newsBoxEl = document.querySelector('.news-container') 
newsBoxEl.addEventListener('click', onFvBtn)
 function onFvBtn({target}){
    if(target.classList.contains('add-news-favorite')){
        target.classList.toggle('liked')
        const fvBtnText = target.firstElementChild
        target.classList.contains('liked') ? fvBtnText.textContent = 'Remove from favorite' : fvBtnText.textContent = 'Add to favorite'
    }
}
 }