import  {photographersJson , mediasJson} from './fetch.js'
import { myFetch  } from './fetch.js'


myFetch()

////////evenement scrollY pour atteindre le contenu////////////
window.addEventListener('scroll', () => content()) 

function content(){
    const pageContent = document.querySelector('.contenu_link')
    if ( window.scrollY > 250 ) {
        pageContent.style.display = 'flex'
      } else {
        pageContent.style.display = 'none'
      }
}