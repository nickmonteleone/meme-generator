// add event listener for form and init counter for memes
const form = document.querySelector("form");
let memesCreated = 0;
form.addEventListener("submit", generateMeme);

// script for adding meme when button clicked
function generateMeme(event) {
  // prevent default so page doesn't reload
  event.preventDefault();
  // get inputs from form using dom
  const inputImageFile = document.getElementById("input-image-file");
  const inputTopText = document.getElementById("input-top-text");
  const inputBottomText = document.getElementById("input-bottom-text");
  // get result message dom
  const inputResultText = document.getElementById('input-result-text');
  // check if image and/or text was provided
  let imageProvided = inputImageFile.files[0] != undefined;
  let textProvided = inputTopText.value.length > 0 || inputBottomText.value.length > 0;
  // get main section to append box to
  const mainPage = document.getElementById('main-page');
  // create meme box with number of meme
  const memeBox = document.createElement('div');
  memeBox.classList.add('meme-box');
  // create elements for the meme image, text, and close button
  const memeImage = document.createElement("img");
  memeImage.classList.add('meme-image');
  const memeTopText = document.createElement("div");
  memeTopText.classList.add('meme-text', 'top-text');
  const memeBottomText = document.createElement("div");
  memeBottomText.classList.add('meme-text', 'bottom-text');
  const memeClose = document.createElement('button');
  memeClose.classList.add('btn-close', 'meme-close');
  // append children elements to meme box
  memeBox.appendChild(memeImage);
  memeBox.appendChild(memeTopText);
  memeBox.appendChild(memeBottomText);
  memeBox.appendChild(memeClose);
  // update the meme image if file provided
  if (imageProvided) {
    const reader = new FileReader();
    reader.onload = function (e) {
      memeImage.src = e.target.result;
    };
    reader.readAsDataURL(inputImageFile.files[0]);
  }
  else memeImage.src = "images/dat-boi-bike.gif";
  // update the meme text
  memeTopText.innerText = inputTopText.value;
  memeBottomText.innerText = inputBottomText.value;
  // when image or text provided, append new meme box to main page
  if (imageProvided || textProvided) {
    memesCreated++;
    memeBox.setAttribute('id', `meme-${memesCreated}`);
    // add event listener for close button
    memeClose.addEventListener("click", function () {
      // get meme box parent element and remove from the DOM
      const parentMemeBox = memeClose.parentElement;
      parentMemeBox.remove();
    });
    // add to end if first meme, otherwise before the most recent
    if (memesCreated === 1) mainPage.appendChild(memeBox);
    else {
      // first item of meme box class found will be top one
      const lastMeme = document.getElementsByClassName("meme-box")[0];
      mainPage.insertBefore(memeBox, lastMeme);
    }
    // clear form fields if meme generated
    inputImageFile.value = "";
    inputTopText.value = "";
    inputBottomText.value = "";
  }
  console.log(textProvided)
  // set result message based on what was provieded
  if (imageProvided && textProvided) {
    inputResultText.innerText = 'Nice meme!\nRetry steps 1-4 to make another.';
  }
  else if (imageProvided) {
    inputResultText.innerText = 'Cool image.\nTry adding text next time.';
  }
  else if (textProvided) {
    inputResultText.innerText = 'No image provided.\nhere come dat boi!!!';
  }
  else inputResultText.innerText = 'No inputs.\nComplete steps 1-4 and retry.';
}