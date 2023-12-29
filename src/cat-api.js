import axios from "axios";



async function getBreeds() {
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
      return response;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function getCatByBreed(breedId) {
    try {
      const response = await axios.get(`https://api.thecatapi.com/v1/images/search`, {
        params: {
          api_key:`live_ESizp401vUNhBqUXymXE8nr4NLET63ZjlG2W2RWK6Rx3T8wMwtcLbS388ZI89YzY`,
          breed_ids: `${breedId}`
        }
      });
      
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export { getBreeds, getCatByBreed }