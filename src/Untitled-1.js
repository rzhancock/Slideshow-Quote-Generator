import {favoriteQuotes} from './quotes'
const imagesIndexesArray = Array(30).fill().map(() => Math.round(Math.random() * 30));
const quotesIndexesArray = Array(30).fill().map(() => Math.round(Math.random() * favoriteQuotes.length - 1));

let combined = [];
for (let i = 0; i  < imagesIndexesArray.length; i++) {
  combined.push([imagesIndexesArray[i], quotesIndexesArray[i]]);
}


console.log(combined);