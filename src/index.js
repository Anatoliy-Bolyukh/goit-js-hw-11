import axios from 'axios'
import Notiflix from 'notiflix';

import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector(".search-form")
const containerEl = document.querySelector(".gallery")
const loadMore = document.querySelector(".load-more")

let currentPage = 1;
let inputValue = ""
async function getImage(inputValue) {
    let object = {
        params: {
            key: '29481170-b8cb5e2348f04b98e255503c6',
            q: inputValue,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 3,
            page: currentPage,
        }
    }

    const response = await axios.get('https://pixabay.com/api/', object)
    return response.data
}


formEl.addEventListener("submit", onFormSubmit);

async function onFormSubmit(event) {

    event.preventDefault()
    currentPage = 1
    inputValue = formEl.elements.searchQuery.value
    try {
        const response = await getImage(inputValue)
        containerEl.innerHTML = renderData(response.hits);
        currentPage += 1
        new SimpleLightbox('.gallery a ')
        if (response.hits.length === 0) Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } catch (error) {
        console.log(error);
    }

}

function renderData(images) {
    return images.map(({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }
    ) => {
        return `<a class="photo-link" href="${largeImageURL}">
        <div class="photo-card">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
         <div class="info">
    <div class="info-item">
      <b>Likes</b><br>
      <p>${likes}</p>
    </div>
    <div class="info-item">
       <b>Views</b><br>
       <p>${views}</p>
    </div>
    <div class="info-item">
      <b>Comments</b><br>
      <p>${comments}</p>
    </div>
    <div class="info-item">
      <b>Downloads</b><br>
       <p>${downloads}</p>
    </div>
  </div>
</div>
 </a>`

    }).join('')
}

loadMore.addEventListener('click', scrollPage);

async function scrollPage() {

    try {
        const response = await getImage(inputValue)
        containerEl.innerHTML += renderData(response.hits);
        currentPage += 1
        new SimpleLightbox('.gallery a ')
        if (response.hits.length === 0) Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } catch (error) {
        console.log(error);

    }
}

















