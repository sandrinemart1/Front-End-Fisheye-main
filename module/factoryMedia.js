import { Element } from "./elementDOM.js";
import { photographer, firstName } from "./photographerData.js";
import {like, likeAdd} from "./likes.js";
import {lightboxOpen} from './lightbox.js';
let stock = JSON.parse(localStorage.getItem("photographerStock"));

let sectionMedia = document.getElementById("media");
let mediaAndAttributes = document.querySelector(
  ".page_photographer-media-attributes");

let ul = document.querySelector(".lightbox_Container--img");


class FactoryMedia {
  constructor() {
    this.createMedia = (type) => {
      let eachMedia;
      if (type === "image") {
        eachMedia = new Image();
      } else if (type === "video") {
        eachMedia = new Video();
      }
      return eachMedia;
    };
  }
}

const factory = new FactoryMedia();
// creer une carte pour chq media image
class Image {
  createImage(mediaId) {
    let linkMedia = document.getElementById(`idImage${mediaId.id}`);
    linkMedia.setAttribute('href', 'javascript:void(0);')
    let imageMedia = document.createElement("img");
    imageMedia.className = "image-media";
    //corriger les images mal centrées
    if (photographer.id == 82 || photographer.id == 925) {
      imageMedia.classList.add("improved-image");
    }
    linkMedia.appendChild(imageMedia);
    imageMedia.setAttribute(
      "src",`../assets/images/${firstName}/${mediaId.image}`
    );
    imageMedia.setAttribute(
      "alt",
      `image portant le titre "${mediaId.title}" réalisée par ${mediaId.name}`
    );
    imageMedia.setAttribute("id", `${mediaId.id}`);


    ///// ouverture de la lightbox
    linkMedia.addEventListener("click", (e) => lightboxOpen(e));
  }
  //creer une image pour la lightbox
  createImageLightbox(mediaId) {
    let li = new Element(
      "li",
      "li",
      "lightbox_object"
    ).el;
    li.setAttribute('id',`object${mediaId.id}`)
    li.setAttribute("aria-hidden", "true");
    li.style.display = "none";
    ul.appendChild(li);
    let figure = new Element("figure", "figure", "lightbox_figure").el;
    figure.setAttribute('aria-labelledby', `images${mediaId.id}`)
    figure.setAttribute('tabindex', '0')
    li.appendChild(figure);
    let image = new Element(
      "image",
      "img",
      "image_lightbox"    
    ).el;
    image.setAttribute('id',`image${mediaId.id}`)
    image.setAttribute("src", `../assets/images/${firstName}/${mediaId.image}`);
    image.setAttribute(
      "alt",
      `image portant le titre "${mediaId.title}" réalisée par ${photographer.name}`
    );
  
    figure.appendChild(image);
    let figcaption = new Element("figcaption", "figcaption", "title_image").el;
    figcaption.innerText = `${mediaId.title}`;
    figure.appendChild(figcaption);
  }
}
  //creer une image pour video
  class Video{
    createVideo(mediaId) {
    //  lien contenant une image
      let linkMedia = document.getElementById(`idImage${mediaId.id}`)

      let imageMedia = document.createElement('video');
      linkMedia.appendChild(imageMedia);
      imageMedia.setAttribute('src',`../assets/images/${firstName}/${mediaId.video}` );
      imageMedia.setAttribute('id',`${mediaId.id}`)
      imageMedia.setAttribute('alt',`vidéo portant le titre "${mediaId.title}" réalisée par ${photographer.name}`)
      imageMedia.setAttribute('controls',true)
      imageMedia.className ='image-media';
  
 /////ouverture de la lightbox 
     linkMedia.addEventListener('click',(e) => lightboxOpen(e))
   
    }
    createVideoLightbox(mediaId){
      let li = new Element('li','li','lightbox_object').el
        li.style.display ='none';
        li.setAttribute('id', `object${mediaId.id}`)
        li.setAttribute('aria-hidden', 'true')
        ul.appendChild(li)
        let figure = new Element('figure','figure','lightbox_figure').el
        figure.setAttribute('tabindex', '0')
        figure.setAttribute('aria-labelledby', `images${mediaId.id}`)
        li.appendChild(figure)
        let video = new Element('video','video','video_lightbox').el
        video.setAttribute('src',`../assets/images/${firstName}/${mediaId.video}` );
        video.setAttribute('controls',true)
        video.setAttribute('width', '1050')
        video.setAttribute('id',`video${mediaId.id}`)
        video.setAttribute('alt',`vidéo portant le titre "${mediaId.title}" réalisée par ${photographer.name}`)
        video.setAttribute('aria-label',`vidéo portant le titre "${mediaId.title}" réalisée par ${photographer.name}`)
        figure.appendChild(video)
        let figcaption = new Element('figcaption','figcaption',"title_image").el
        figcaption.innerText = `${mediaId.title}`
        figcaption.setAttribute('aria-hidden','true')
        figure.appendChild(figcaption)
    }
    }

function SeparateCardImage(media) {
  mediaAndAttributes.innerHTML = "";
  // console.log(media)
  media.forEach((mediaId) => {
    createDomElements(mediaId);
    if (mediaId.image !== undefined) {
      let card = factory.createMedia("image");
      card.createImage(mediaId);
      card.createImageLightbox(mediaId);
    } else {
      let card = factory.createMedia("video");
      card.createVideo(mediaId);
      card.createVideoLightbox(mediaId);
    }
  });
  let items = document.querySelectorAll(".lightbox_object");
  // console.log(items)
  let itemsArray = Array.from(items);
  // console.log(itemsArray)
  items.forEach((item) => {
    item.classList.add(`object_${itemsArray.indexOf(item)}`);
  });
  let allMedias = document.querySelectorAll(".media_link");
  // console.log(allMedias)
  let medias = Array.from(allMedias);
  // console.log(medias)
  medias.forEach((media) => {
    media.classList.add(`media_${medias.indexOf(media)}`);
  });
  return media
}

function createDomElements(mediaId) {

  let articleMedia = new Element(
    "articleMedia",
    "article",
    "page_photographer-media"
  ).el;
  mediaAndAttributes.appendChild(articleMedia);
  articleMedia.setAttribute("id", mediaId.id);
  /////
  let linkMedia = new Element(
    "linkMedia",
    "a",
    "media__link"  
  ).el;
  linkMedia.setAttribute('id',`idImage${mediaId.id}`)
  linkMedia.setAttribute('tabindex', '0')
  articleMedia.appendChild(linkMedia);
  linkMedia.setAttribute("href", "javascript:void(0);");
  linkMedia.setAttribute("tabindex", "0");
  linkMedia.setAttribute("aria-label", `${mediaId.title} gros plan`);
  ///// bandeau informations image
  let imageAttributes = new Element(
    "imageAttributes",
    "div",
    "img_attributes"
  ).el;
  articleMedia.appendChild(imageAttributes);
  let imageTitle = new Element("imageTitle", "h3").el;
  imageTitle.setAttribute('id',"mediaId.likes")
  imageAttributes.appendChild(imageTitle);
  let imageLike = new Element("imageLike", "p").el;
  imageAttributes.appendChild(imageLike);
  imageLike.textContent = mediaId.likes;
  imageTitle.textContent = mediaId.title;
  let aHeart = new Element("aHeart", "a",'heartCss').el;
  aHeart.setAttribute('id', `spanHeart${mediaId.id}`)
  imageAttributes.appendChild(aHeart);
  let imageHeart = new Element("imageHeart", "i").el;
  imageHeart.className = "fa-solid fa-heart"
  imageHeart.setAttribute('role', 'button')
  aHeart.appendChild(imageHeart);

  ///// lien des likes
  document.addEventListener("click", (e) => {
    if (
      e.target.tagName === "I" &&
      e.target.className === "fa-solid fa-heart"
    ) {
      like();
    }
  });
  aHeart.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      like();
    }
  })
}
export { SeparateCardImage };
