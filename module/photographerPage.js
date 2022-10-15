import{myFetch2} from './fetchPagePhotographer.js' // requête JSON
import{getPhotographer,photographer} from './photographerData.js'//affichage photographe + medias
import{displayModal} from './modale.js'//formulaire contact
import { dropDownOpen,dropDownClose, popularitySort, dateSort, titleSort} from './dropdown.js'  // fonction tri
myFetch2()


// Recupération des données//
function getData(data) {
    const photographers = data.photographers
    const media = data.media
    //recuperer les medias dans le photographe correspondant  
    for (let photographer of photographers) {
      let mediaList = []  
      
      Object.defineProperty(photographer, 'media', {
        value: mediaList,
        writable: true 
      })
      for (let mediaId of media) {
        if (photographer.id == mediaId.photographerId) {
          mediaList.push(mediaId);
        }
      }
    }
    
    getPhotographer(data.photographers)
    localStorage.setItem('photographerStock', JSON.stringify(photographers));
    localStorage.setItem('mediaStock', JSON.stringify(media));

   
  }

////////Variables stockées dans le document ////////////
  let stock = JSON.parse(localStorage.getItem('photographerStock'));
  let media = JSON.parse(localStorage.getItem('mediaStock'));

 console.log(stock) 
//////LANCEMENT MODALE D INSCRIPTION///////
let modalButton = document.getElementById('contact_button')
document.addEventListener('click', (e)=>{
    if (e.target === modalButton) {
        displayModal()
    }
  })


//// DROPDOWN  APPEL et TRI///////////////
let chevronDown = document.getElementById("button-dropdown")
let popularity = document.querySelector(".option1");
let date = document.getElementById("option2");
let titre = document.getElementById("option3");
let chevronUp = document.getElementById("button-dropup")
let dropDownDiv = document.querySelector(".container");
let arrowDown = document.querySelector('#arrow-down')
console.log(popularity)
console.log('salut')
chevronDown.addEventListener("click",()=>dropDownOpen())
chevronUp.addEventListener('click', () =>dropDownClose())
///////  fonctions de tri avec boutons :'populaire' 'date' 'titre' //////////////

popularity.addEventListener('click', ()=> popularitySort(photographer.media))
popularity.addEventListener('keydown',(e)=>{
  if(e.key ==='Enter'){
    popularitySort(photographer.media)
  }
})
date.addEventListener('click',()=> dateSort(photographer.media))
date.addEventListener('keydown',(e)=>{
  if(e.key ==='Enter'){
    dateSort(photographer.media)
  }
})
titre.addEventListener('click', () => titleSort(photographer.media))
titre.addEventListener('keydown',(e)=>{
  if(e.key ==='Enter'){
    titleSort(photographer.media)
  }
})



///////////////////////////////
  export{getData}