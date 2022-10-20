import{Photographer} from'./fetch.js' 
import {SeparateCardImage} from './factoryMedia.js'
import {like, likeAdd} from './likes.js'
//recuperer l 'id  de chq photographe avec l 'url
//donner url à chq page photographe et filtrer le images en fct id du photographe
let string = window.location.href;
let url = new URL(string);
let login = url.searchParams.get('id');
let photographer

function getPhotographer(photographers) {
  for (let i = 0; i < photographers.length; i++ ) {
    if (photographers[i].id == login) {
      photographer = new Photographer(
        photographers[i].name, 
        photographers[i].id, 
        photographers[i].city, 
        photographers[i].country,
        photographers[i].tagline,
        photographers[i].price,
        photographers[i].portrait,
        photographers[i].media,
      )
console.log(photographers[i].media)
      firstName(photographers[i])
      displayPhotographer(photographers[i])
      SeparateCardImage(photographers[i].media)
      like(photographers[i].media)
      likeAdd(photographers[i].media)
      return photographer
    }
  }
}

/////   fonction pour recuperer le  prenom du photographe affiché   ////
function firstName(photographer) {
  let fullName= photographer.name
  let splitName =fullName.split(' ');
  let firstName1= splitName[0];
  firstName  =  firstName1.replace('-',' ');
  // console.log(firstName);
  return firstName
  
}




///// creer entête de la page de chq photographe
function displayPhotographer() {
  //bandeau entête page photographe
  document.querySelector('.photographer_text--name').textContent = photographer.name;
  document.querySelector('.photographer_text--location').textContent = photographer.city+ ", " + photographer.country;
  document.querySelector(".photographer_text--tagline").innerHTML= photographer.tagline;
  document.getElementById('contact_button').textContent ='Contactez moi';
  document.querySelector('.photographer_section--banner >img').src =` ../../assets/images/Photographers ID Photos/${photographer.portrait}`;
  document.querySelector('.photographer_section--banner >img').setAttribute('alt',`portrait du photographe ${photographer.name}`)
  //enregistrer le nom du photographe sur la modale
  document.querySelector('#form__name').innerHTML = photographer.name;
  
}

export{getPhotographer}
export{photographer,firstName}

///////////////////////////////////////////////////////