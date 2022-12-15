import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input"];

  connect() {
    console.log("Hello, Stimulus!");
    window.terminalFree = true;
    this.#write("Hello, I'm Will, welcome to my portfolio! I hope you enjoy your stay.");
  }

  projects() {
    this.#write('See my projects')
  }

  contact() {
    this.#write('Contact me')
  }


  #write(line) {
    if (window.terminalFree === true) {
      this.inputTarget.innerHTML = "";
      for (let i = 0; i < line.length; i++) {
        setTimeout(() => {
          this.inputTarget.insertAdjacentText("beforeend", line[i]);
        }, i * 80);
      }
      window.terminalFree = false;
      setTimeout(() => {
        window.terminalFree = true;
      }, line.length * 80);
    }
  }
}
