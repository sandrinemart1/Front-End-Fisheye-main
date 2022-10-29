const mainPage = document.querySelector(".Photographer-Page-Main");
const filterDiv = document.querySelector(".select-filter");
let lightBoxBg = document.querySelector("#lightbox-background");
let lightboxContainer = document.querySelector(".lightbox-modal");
////3 boutons de commande /////
let buttonClose = document.querySelector(".lightbox_close");
let next = document.querySelector(".lightbox_chevron--next");
let previous = document.querySelector(".lightbox_chevron--previous");
let position =1;


document.addEventListener("click", (e) => {
  if (
    (e.target.tagName === "IMG" || "VIDEO") &&
    e.target.className === "image-media"
  )
    lightboxOpen(e);
});

//   // ouvrir la lightbox

function lightboxOpen(e) {
  e.preventDefault();
  lightBoxBg.style.display = "flex";
  lightBoxBg.setAttribute("aria-hidden", "false");
  mainPage.setAttribute("aria-hidden", "true");
  mainPage.setAttribute("tabindex", "-1");
  filterDiv.style.display = "none";
  filterDiv.setAttribute("aria-hidden", "true");
  lightboxContainer.setAttribute("tabindex", "0");
  lightboxContainer.focus();

  let picture = window.event.target;
  let id = findId(picture);
  //déterminer la postion de l'object selectionné
  let firstItem = document.getElementById(`object${id}`);
  position = giveThePosition(firstItem)+ 1;
  console.log(firstItem)
  console.log(position)
  displayLightbox(position)
  return firstItem
}
//////////// position de la première image selectionnée dans la lightbox  ////////
function giveThePosition(firstItem) {
  let className = firstItem.className;
  let i = className.lastIndexOf("_");
  let positionSt = className.substr(i + 1);
  let position = parseInt(positionSt);
  return position;
}

////// trouver l 'id de l 'image cliquée ///////////
function findId(picture) {
  if (picture.tagName !== "A") {
    let divMedia = picture.parentNode;
    let idDivMedia = divMedia.getAttribute("id");
    let id = idDivMedia.replace("idImage", "");
    return id;
  } else {
    let idDivMedia = picture.getAttribute("id");
    let id = idDivMedia.replace("idImage", "");
    return id;
  }
}
//////////////////image suivante ou précédente /////////////
next.addEventListener("click", (e) => goToNext(1));
previous.addEventListener("click", (e) => goToNext(-1));
function goToNext(n) {
  displayLightbox((position += n));
}

function displayLightbox(n){
  const items = document.getElementsByClassName("lightbox_object");
  console.log(n)
  for (let i = 0; i < items.length; i++) {
    items[i].style.display = "none";
    items[i].setAttribute('aria-hidden','true')
  }
  console.log(position)
  // next----sauter de la derniere image à la premiere
  if(n > items.length){position= 1}
  console.log(position)
  // previous ---sauter de la premiere image  à la derniere
  if(n <1){position = items.length}
  //afficher uniquement l 'object selectionné(-1 car fonction parametre+=n)
  items[position-1].style.display = "flex";
  items[position-1].setAttribute('aria-hidden','false')

}



//fermeture lightbox
buttonClose.addEventListener("click", () => lightboxClose());
document.body.addEventListener("keydown", (e) => onKey(e));
function onKey(e) {
  // console.log(e.target)
  let keyname = e.key;
  if (keyname == "ArrowRight") {
    goToNext(1);
  } else if (keyname == "ArrowLeft") {
    goToNext(-1);
  } else if (keyname == "Escape") {
    lightboxClose();
  }
}

function lightboxClose() {
  lightBoxBg.style.display = "none";
  lightBoxBg.setAttribute("aria-hidden", "true");
  mainPage.setAttribute("aria-hidden", "false");
  mainPage.setAttribute("tabindex", "0");
  filterDiv.style.display = "flex";
  filterDiv.setAttribute("aria-hidden", "false");

  let items = document.querySelectorAll(".lightbox_object");
  let itemsArray = Array.from(items);
  itemsArray.forEach((item) => {
    item.setAttribute("aria-hidden", "true");
    item.style.display = "none";
  });
}
export { lightboxOpen };
