const mainPage = document.querySelector('.Photographer-Page-Main');
// const modalButton =document.querySelector("#contact_button");
// const footerInfos = document.querySelector('.infos');
const filterDiv = document.querySelector('.select-filter')
let lightBoxBg = document.querySelector('#lightbox-background');
let lightboxContainer =document.querySelector(".lightbox-modal")
let buttonClose =document.querySelector(".lightbox_close");
let next = document.querySelector('.lightbox_chevron--next')
let previous = document.querySelector('.lightbox_chevron--previous')
let imagesLightBox = document.getElementsByClassName('image-media')
let position
// document.addEventListener('click', (e)=>{console.log(e.key)})


document.addEventListener('click', (e)=>{
  if((e.target.tagName === 'IMG'||'VIDEO') && e.target.className ==='image-media')
    lightboxOpen(e)
  }
  );


//   // ouvrir la lightbox
function lightboxOpen(e){

    e.preventDefault()
    lightBoxBg.style.display = 'flex'
    lightBoxBg.setAttribute('aria-hidden', 'false')
    mainPage.setAttribute('aria-hidden', 'true')
    mainPage.setAttribute('tabindex', '-1')
    // modalButton.style.display ='none';
    filterDiv.style.display ='none';
    // filterDiv.setAttribute('aria-hidden','true')
    // footerInfos.style.display ='none';
    // footerInfos.setAttribute('aria-hidden','true')
    lightboxContainer.setAttribute('tabindex', '0')
    lightboxContainer.focus()

    let picture = window.event.target;
    let id = findId(picture)
    let firstItem= document.getElementById(`object${id}`)
    giveThePosition(firstItem)
    firstItem.style.display = 'flex'
    firstItem.setAttribute('aria-hidden', 'false')
    lightboxContainer.focus()

  }
  // console.log(document.getElementById('src'))

 

//////////// position de la première image selectionnée dans la lightbox  ////////
function giveThePosition(firstItem){
  let className = firstItem.className
  let i = className.lastIndexOf ('_')
  let positionSt = className.substr(i+1)
  let position= parseInt(positionSt)
  return position
}

 ////// trouver l 'id de l 'image cliquée ///////////
 function findId(picture) {
    if(picture.tagName !=='A'){
      let divMedia = picture.parentNode
      // console.log(divMedia)
      let idDivMedia = divMedia.getAttribute('id')
      let id = idDivMedia.replace('idImage', '')
      console.log(id)
      return id
    }else{
      let idDivMedia = picture.getAttribute('id')
      let id = idDivMedia.replace('idImage', '')
  
      return id
    } 
}  

//Navigation droite gauche dans la lightbox
next.addEventListener('click',() =>goToNext());



let i = 1;
function goToNext(){
  let items = document.querySelectorAll('.lightbox_object')
 console.log(items)

  let total = items.length-1
  console.log(total)
  if (i < total){
    const lastItem= items.item (i)
    console.log(lastItem)
     i++
  const currentItem = items.item (i)
  console.log(currentItem)
  setNewAttributes(lastItem,currentItem)
}else if (i === total){
  const lastItem = items.item (i)
  i = 0
  const currentItem = items.item (i)
  setNewAttributes(lastItem,currentItem) 
}
}


previous.addEventListener('click',() =>goToPrevious());



function goToPrevious(){
  let items= document.querySelectorAll('.lightbox_object')
  let total = items.length-1;
  let i = 1
  if (i - 1 >= 0) {
    i -= 1
    const currentItem = items.item (i)
    const lastItem = items.item (i+1)
    console.log(currentItem)
    setNewAttributes(lastItem, currentItem)
  } else {
    const lastItem = items.item (i)
    position = total
    const currentItem = items.item (i)
    setNewAttributes(lastItem, currentItem)
  
}
}
const setNewAttributes = (lastItem, currentItem) => {
  lastItem.style.display = 'none'
  currentItem.style.display = 'flex'
  lastItem.setAttribute('aria-hidden', 'true')
  currentItem.setAttribute('aria-hidden', 'false')
}

//fermeture lightbox
buttonClose.addEventListener('click',()=>lightboxClose())
document.body.addEventListener('keydown',(e) => onKey(e))
function onKey(e){
  // console.log(e.target)
  let keyname = e.key
  console.log (keyname)
  if(keyname =='Escape'){
    lightboxClose()
  }
  else if(keyname =='ArrowRight'){
    goToNext()
  }
  else if(keyname =='ArrowLeft'){
    goToPrevious()
  }
}

function lightboxClose(){
  
  lightBoxBg.style.display = 'none'
  lightBoxBg.setAttribute('aria-hidden', 'true')
  mainPage.setAttribute('aria-hidden', 'false')
  mainPage.setAttribute('tabindex', '0')
  modalButton.style.display ='flex';
  filterDiv.style.display ='flex';
  filterDiv.setAttribute('aria-hidden','false')
  footerInfos.style.display ='flex';
  footerInfos.setAttribute('aria-hidden','false')
  let items = document.querySelectorAll('.lightbox_object')
  let itemsArray= Array.from(items)
   itemsArray.forEach((item)=>{
    item.setAttribute('aria-hidden', 'true')
    item.style.display = 'none'
   })
}
export{lightboxOpen}







