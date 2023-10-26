const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const imageFile = document.getElementById("image-file");
  const topText = document.getElementById("top-text");
  const bottomText = document.getElementById("bottom-text");
  console.log("You just submitted the form!");
  console.log(imageFile.value);
  console.log(topText.value);
  console.log(bottomText.value);
});
