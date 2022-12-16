import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"

window.Stimulus = Application.start()
const context = require.context("./controllers", true, /\.js$/)
Stimulus.load(definitionsFromContext(context))


// scroll functions ------

//initials expansion on page scrolled down
const initials = document.querySelector('#initials');
const position = document.querySelector('#position');
window.initialsMode = true;


const initialsAnimSpeed = 10;
const initialsAnimPoint = 136;

const expandInitials = () => {
  window.initialsMode = false;
  const initialsReplacement = 'William Neve';
  position.classList.add('show');
  for(let i = 1; i < initialsReplacement.length; i++) {
    if (i === 8) {
      continue;
    } else {
      setTimeout(() => {
        if (i < 8) {
          initials.innerHTML = initials.innerHTML.slice(0, -1) + initialsReplacement[i] + 'N';
        } else {
          initials.innerHTML += initialsReplacement[i];
        }
      }, (i -1) * initialsAnimSpeed);
    }
  }
}

const collapseInitials = () => {
  window.initialsMode = true;
  const initialsReplacement = 'William Neve';
  position.classList.remove('show');
  for(let i = initialsReplacement.length - 1; i >= 1; i--) {
    if (i === 8) {
      continue;
    } else {
      setTimeout(() => {
        if (i > 8) {
          initials.innerHTML = initials.innerHTML.slice(0, -1);
        } else {
          initials.innerHTML = initials.innerHTML.slice(0,-2) + 'N';
        }
      }, (initialsReplacement.length - i -1) * initialsAnimSpeed);
    }
  }
}




// scroll event listener


let oldScrollPos = 0;
document.addEventListener('scroll', (_event) => {
  const currentScrollPos = window.scrollY;
  if (currentScrollPos > oldScrollPos) {
    //scrolling down
    if (currentScrollPos > initialsAnimPoint && window.initialsMode === true) {
      expandInitials();
    }
    // do other stuff on scroll down?
  } else {
    //scorlling up
    if (currentScrollPos < initialsAnimPoint && window.initialsMode === false) {
      collapseInitials()
    }
  }
  oldScrollPos = currentScrollPos;
})
