// Your API key: 38973811-65af30dfa760d39e422e4d431
// https://pixabay.com/api/
// https://pixabay.com/api/?q=cats&image_type=photo&orientation=horizontal&safesearch=true

import InfiniteScroll from "infinite-scroll";


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38973811-65af30dfa760d39e422e4d431'

const containerGalery = document.querySelector('.gallery')

// let page = 1

async function getFetch(value, page=1) {
   let l  = `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  
  const resp = await fetch(l);
    if (!resp.ok) {
        throw new Error(resp.status);
    }
    return await resp.json();
    
}








export {getFetch}