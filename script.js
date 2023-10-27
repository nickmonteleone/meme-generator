// get constants for element ids
const inputImageFile = document.getElementById("input-image-file");
const inputTopText = document.getElementById("input-top-text");
const inputBottomText = document.getElementById("input-bottom-text");
// get main section to append box to
const mainPage = document.getElementById('main-page');
// add event listener for form and init counter for memes
const form = document.querySelector("form");
let memesCreated = 0;
form.addEventListener("submit", generateMeme);

function generateMeme(event) {
  /* add a new meme to the page */
  event.preventDefault();
  // check if image and/or text was provided
  let imageProvided = inputImageFile.files[0] != undefined;
  let textProvided = inputTopText.value.length > 0 || inputBottomText.value.length > 0;
  // when image or text provided, append new meme box to main page
  if (imageProvided || textProvided) {
    // create elements for the meme
    const memeBox = document.createElement('div');
    memeBox.classList.add('meme-box');
    const memeImage = document.createElement("img");
    memeImage.classList.add('meme-image');
    const memeTopText = document.createElement("div");
    memeTopText.classList.add('meme-text', 'top-text');
    const memeBottomText = document.createElement("div");
    memeBottomText.classList.add('meme-text', 'bottom-text');
    const memeClose = document.createElement('button');
    memeClose.classList.add('btn-close', 'meme-close');
    // add src for image, use input if file provided
    if (imageProvided) {
      const reader = new FileReader();
      reader.addEventListener("load", () => memeImage.src = reader.result);
      reader.readAsDataURL(inputImageFile.files[0]);
    }
    else memeImage.src = "images/dat-boi-bike.gif";
    // update the meme text
    memeTopText.innerText = inputTopText.value;
    memeBottomText.innerText = inputBottomText.value;
    // append children elements to meme box
    memeBox.appendChild(memeImage);
    memeBox.appendChild(memeTopText);
    memeBox.appendChild(memeBottomText);
    memeBox.appendChild(memeClose);
    // set box id based on how many memes on page
    memesCreated++;
    memeBox.setAttribute('id', `meme-${memesCreated}`);
    // add event listener for close button
    memeClose.addEventListener("click", function () {
      // get meme box parent element and remove from the DOM
      const parentMemeBox = memeClose.parentElement;
      // clear meme text if most recent meme is closed
      let memeNumberDeleted = parentMemeBox.id.substring(5);
      if (memeNumberDeleted == memesCreated) {
        const inputResultText = document.getElementById('input-result-text');
        inputResultText.innerText = '';
      }
      parentMemeBox.remove();
    });
    // add to end if first meme, otherwise before the most recent
    if (memesCreated === 1) mainPage.appendChild(memeBox);
    else {
      // first item of meme box class found will be top one
      const lastMeme = document.getElementsByClassName("meme-box")[0];
      mainPage.insertBefore(memeBox, lastMeme);
    }
    resetInputs();
  }
  setResultMessage(imageProvided, textProvided);
}

function resetInputs() {
  // clear form fields if meme generated
  inputImageFile.value = "";
  inputTopText.value = "";
  inputBottomText.value = "";
}

function setResultMessage(imageProvided, textProvided) {
  // set result message based on what was provided
  const inputResultText = document.getElementById('input-result-text');
  if (imageProvided && textProvided) {
    inputResultText.innerText = 'Nice meme!\nSubmit again to make another.';
  }
  else if (imageProvided) {
    inputResultText.innerText = 'Cool image.\nTry adding text next time.';
  }
  else if (textProvided) {
    inputResultText.innerText = 'No image provided.\nhere come dat boi!!!';
  }
  else inputResultText.innerText = 'No inputs.\nComplete form and retry.';
}