
import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38973811-65af30dfa760d39e422e4d431'

async function getFetch(value, page = '1') {
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
        return response.data
      } catch (error) {
        throw new Error(error.message)
      }
}






export {getFetch}