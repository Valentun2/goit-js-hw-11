import { getFetch } from "./helpers/animals-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const containerGalery = document.querySelector('.js-gallery')
const searchForm=document.querySelector('.js-search-form')
const target = document.querySelector('.guard')

const gallery = new SimpleLightbox('.gallery a');
let page = 1

searchForm.addEventListener('submit', hanglerSerch)

function hanglerSerch(evt) {
  evt.preventDefault()

  const inputValue = evt.target.children.searchQuery.value
  page=1
  
  containerGalery.innerHTML=''

  insertMarcup()
  getFetch(inputValue).then(data =>  {
    if(!data.hits.length){
Notify.warning("Sorry, there are no images matching your search query. Please try again.")
return
}
    Notify.info(`Hooray! We found ${data.totalHits} images.`)}
  ).catch((err)=>Notify.failure(err.message))
}


function createMarcup(arr) {
  return arr.hits.map(obj=>{
const {downloads, comments, views, likes, tags, largeImageURL, webformatURL} = obj

return `<div class="photo-card">
<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width ='250' height = "200" /></a>
<div class="info">
<p class="info-item">
<b>Likes:</b> ${likes}
</p>
<p class="info-item">
<b>Views:</b> ${views}
</p>
<p class="info-item">
<b>Comments:</b> ${comments}
</p>
<p class="info-item">
<b>Downloads:</b> ${downloads}
</p>
</div>
</div>`
}).join('')
}

const options = {
  rootMargin: "300px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(hanglerload, options)

function hanglerload(entries){
  entries.forEach(({isIntersecting
  }) => {
  const inputSearch = searchForm.children.searchQuery.value;

  if(isIntersecting){
    getFetch(inputSearch, page).then(data => {
      containerGalery.insertAdjacentHTML('beforeend',createMarcup(data));
      
      gallery.refresh()
      
      const totalPage = Math.ceil(data.totalHits/40)

      if(totalPage <= page){
        observer.unobserve(target)
      }
      
      page +=1
    }) 
        .catch(err => console.log(err))
  }

 });
}




function insertMarcup(){
  const inputSearch = searchForm.children.searchQuery.value;

  getFetch(inputSearch, page).then(data => {
   
    containerGalery.insertAdjacentHTML('beforeend',createMarcup(data));

      gallery.refresh()
      const totalPage = Math.ceil(data.totalHits/40)

      if(totalPage > page){
        observer.observe(target)
      }
    }) 
    .catch(err => err)
}


