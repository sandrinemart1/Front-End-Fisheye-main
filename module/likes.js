import { photographer } from "./photographerData.js";
const stock = JSON.parse(localStorage.getItem("photographerStock"));

function like(mediaId) {
  document.addEventListener("click", (e) => {
    const likesSum = document.querySelector(".infos_likes--count");

    let heart = e.target;
    let heartParent = heart.parentNode;
    let likeP = heartParent.parentNode.querySelector("p");

    if (
      e.target.className === "fa-solid fa-heart" &&
      heartParent.className !== "clicked"
    ) {
      // pour n'autoriser qu'un seul clic par image'
      heart.classList.add("clicked");
      likeP.textContent++;
      likesSum.textContent++;
    }
  });
}

///// injecter likes totaux  et prix dans le footer //////////
function likeAdd(stock, photographer) {
  for (let i = 0; i < stock.length; i++) {
    let total = 0;
    const likeSum = stock.reduce((a, b) => {
      return a + b.likes;
    }, total);
    document.querySelector(".infos_likes--count").textContent = likeSum;

    document.querySelector(".infos_price").textContent = `${stock[i].price}€/j`;
  }
}

export { like, likeAdd };
