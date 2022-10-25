import { SeparateCardImage } from "./factoryMedia.js";

//////dropdown//////////

let dropDownDiv = document.querySelector(".container");
let chevronDown = document.getElementById("button-dropdown");
let chevronUp = document.getElementById("button-dropup");
let popularity = document.getElementById("option1");
let date = document.getElementById("option2");
let titre = document.getElementById("option3");
let dropdownButton = document.querySelector('.select-filter_button span')

/////ouverture du dropdown /////////////
function dropDownOpen() {
  dropDownDiv.style.display = "flex";
  chevronDown.setAttribute("aria-expanded", "true");
  // dropdownButton.style.zIndex ='0';
  popularity.focus();
}
/////fermeture du dropdown/////////////
function dropDownClose() {
  dropDownDiv.style.display = "none";
  chevronDown.setAttribute("aria-expanded", "false");
  chevronDown.focus();
}
///////  fonctions de tri  //////////////
////// tri par  'populaire' //////////////
function popularitySort(media) {
  function tri(a, b) {
    return a.likes < b.likes ? 1 : a.likes == b.likes ? 0 : -1;
  }
  media.sort(tri);
  SeparateCardImage(media);
}
//////  tri par  'titre' //////////////
function titleSort(media) {
  function tri(a, b) {
    let titreA = a.title.split(" ").join("");
    a = titreA.toLowerCase();
    let titreB = b.title.split(" ").join("");
    b = titreB.toLowerCase();
    return a < b ? -1 : 1;
  }
  media.sort(tri);
  SeparateCardImage(media);
}
///////  tri par 'date'  //////////////
function dateSort(media) {
  function tri(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA < dateB ? 1 : dateA == dateB ? 0 : -1;
  }
  media.sort(tri);
  SeparateCardImage(media);
}


export { dropDownOpen, dropDownClose, popularitySort, dateSort, titleSort };
