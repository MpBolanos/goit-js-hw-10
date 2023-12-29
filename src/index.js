import { getBreeds, getCatByBreed } from './cat-api.js';
import Notiflix from "notiflix";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import 'slim-select/dist/slimselect.css';



const select = document.querySelector('#idSelect');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const divCatInfo = document.querySelector('.cat-info');

loader.classList.replace('is-hidden', 'loader');
select.classList.add('is-hidden');
error.classList.add('is-hidden');



async function fetchBreeds() {
  try {

    
    const api = await getBreeds();

    // Agrega un primer option con un mensaje
    const defaultOption = document.createElement('option');
    defaultOption.value = ''; // Puedes establecer un valor específico si es necesario
    defaultOption.text = 'Select a cat breed'; // Mensaje que deseas mostrar
    select.appendChild(defaultOption);

    // Agrega opciones para cada raza de gato
    let markup = api.data.map((value) => {
      return `<option value="${value.id}">${value.name}</option>`;
    }).join('');

    select.innerHTML += markup;

   
    const slim = new SlimSelect({
      select: '#idSelect',
     
    });
  

    // Oculta el loader después de agregar las opciones
    loader.classList.add('is-hidden');
    // Muestra el elemento select
    select.classList.remove('is-hidden');

    
  } catch (error) {
    onFetchError(error);
  }
}

fetchBreeds();


async function handleCatChange(breedId) {
  try {
    // Ocultar div.cat-info y mostrar p.loader
    divCatInfo.classList.add('is-hidden');
    loader.classList.remove('is-hidden');
    select.classList.add('is-hidden');

      const apiBreedsId = await getCatByBreed(breedId);

      console.log('Respuesta de la API:', apiBreedsId);
      loader.classList.replace('is-hidden', 'loader');
      select.classList.remove('is-hidden');

      const catInfo = apiBreedsId.data[0];
      const breedInfo = catInfo.breeds[0];

      divCatInfo.innerHTML = `
          <div class="cat-image_container"><img class="cat-image" src="${catInfo.url}" alt="${breedInfo.name}" /></div>
          <div class="cat-info_container"><h2>${breedInfo.name}</h2>
          <p><b>Description:</b> ${breedInfo.description}</p>
          <p><b>Temperament:</b> ${breedInfo.temperament}</p></div>
      `;
   
      // Mostrar div.cat-info y ocultar p.loader después de cargar la información
    divCatInfo.classList.remove('is-hidden');
    loader.classList.add('is-hidden');
    
  } catch (error) {
      onFetchError(error);
  }
}

// Agrega un evento 'change' al elemento select
select.addEventListener('change', async (event) => {
  const selectedValue = event.target.value;
  await handleCatChange(selectedValue);
});

function onFetchError(error) {
  select.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}