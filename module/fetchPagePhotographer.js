

//fonction fetch page photographer
import{getData} from './photographerPage.js'

function myFetch2() {
    fetch("../data/photographers.json")
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        getData(data);
      } else {
        console.log('erreur')
      }
    })
  }
export{ myFetch2 }