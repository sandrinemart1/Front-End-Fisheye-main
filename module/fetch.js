import { createCardDOM } from "./home-page-elements.js";

//fonction pour recuperer les donnees
class Photographer {
  constructor(name, id, city, country, tagline, price, portrait, media) {
    (this.name = name),
      (this.id = id),
      (this.city = city),
      (this.country = country),
      (this.tagline = tagline),
      (this.price = price),
      (this.portrait = portrait),
      (this.media = media);
  }
}
class Media {
  constructor(date, id, image, likes, photographerId, price, title) {
    (this.date = date),
      (this.id = id),
      (this.image = image),
      (this.likes = likes),
      (this.photographerId = photographerId),
      (this.price = price),
      (this.title = title);
  }
}
const photographersJson = [];
const mediasJson = [];
let photographerJson;
//fonction fetch pour page d'accueil
async function myFetch(affichage) {
  const response = await fetch("https://sandrinemart1.github.io/Front-End-Fisheye-main/data/photographers.json").then(
    async (response) => {
      if (response.ok) {
        const data = await response.json();
        const photographers = data.photographers;
        const media = data.media;

        dataInArray(photographers);
        dataInArray2(media);
        createCardDOM(photographersJson);
      } else {
        console.error("Retour du serveur :", response.status);
      }
    }
  );
}

function dataInArray(photographers) {
  for (let photographer of photographers) {
    const photographerJson = new Photographer(
      photographer.name,
      photographer.id,
      photographer.city,
      photographer.country,
      photographer.tagline,
      photographer.price,
      photographer.portrait
    );

    photographersJson.push(photographerJson);
  }
  return photographersJson;
}

function dataInArray2(media) {
  media.forEach((media) => {
    const mediaJson = new Media(
      media.date,
      media.id,
      media.image,
      media.likes,
      media.photographerId,
      media.price,
      media.title
    );

    mediasJson.push(mediaJson);

    return mediasJson;
  });
}






export{Photographer}
export { myFetch };
export { photographersJson, mediasJson };
