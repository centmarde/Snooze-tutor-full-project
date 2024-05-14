import "./loader.ea51d4ef.js";
import "./mover.71caf343.js";
const form_register = document.getElementById("form_register");
form_register.onclick = async (e) => {
  e.preventDefault();
  document.querySelector("#form_register button").disabled = true;
  document.querySelector(
    "#form_register button"
  ).innerHTML = `<span>Loading...</span>`;
  window.location.href = "/register.html";
  document.querySelector("#form_register button[type='submit']").disabled = false;
  document.querySelector(
    "#form_register button[type='submit']"
  ).innerHTML = `Submit`;
};
let last = document.getElementById("last");
let stars = document.getElementById("stars");
let moon = document.getElementById("moon");
let mountains_behind = document.getElementById("mountains_behind");
let text = document.getElementById("texth2");
let mountains_front = document.getElementById("mountains_front");
window.addEventListener("scroll", function() {
  let value = window.scrollY;
  last.style.top = value * 0.4 + "px";
  stars.style.left = value * 0.25 + "px";
  moon.style.top = value * 2.25 + "px";
  mountains_behind.style.top = value * 0.25 + "px";
  mountains_front.style.top = value * 0 + "px";
  firstLayer.style.left = value * 0.1 + "px";
  text.style.marginRight = value * 4 + "px";
  text.style.marginTop = value * 0.5 + "px";
});
