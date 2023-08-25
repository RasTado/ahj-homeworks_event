import Field from "./field";
// import Goblin from "./goblin";

export default class Controls {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }

    this._element = element;

    this.onStartGame = this.onStartGame.bind(this);
    this.onClick = this.onClick.bind(this);

    this._startbtn = this._element.querySelector(".nav_game_start_btn");
    this._startbtn.addEventListener("click", this.onStartGame);
    this._game_size = this._element.querySelector(".nav_game_size");
    this._game_hits = this._element.querySelector(".nav_game_hits");
    this._game_miss = this._element.querySelector(".nav_game_miss");
    this._game_count = this._element.querySelector(".nav_game_count");
  }

  onStartGame(e) {
    e.preventDefault();
    const newGameF = new Field(".game_cont");
    if (newGameF._element.children.length == 1) {
      newGameF._element.children[0].remove();
    }
    newGameF.startGame(this._game_size.value);
    this.c = 0;
    this.h = 0;
    this.m = 0;
    this._game_hits.textContent = this.h;
    this._game_miss.textContent = this.m;

    const table = document.querySelector("tbody");
    const cels = table.querySelectorAll("td");

    setTimeout(() => {
      console.log("start");
      this._inter = setInterval(() => {
        let fda = table.querySelector(".troll");
        if (fda) {
          fda.classList.remove("troll");
        }
        let fd = cels[Math.floor(Math.random() * cels.length)];
        fd.classList.add("troll");
        this.c++;
        this.m = -1 + this.c - this.h;
        this._game_miss.textContent = this.m;
        // console.log("c:", this.c, "m:", this.m, "h:", this.h);
        if (this.m == 5) {
          console.log("lose");
          alert("LOSE !");
          location.reload();
        }
      }, 1000);
    }, 1000);

    newGameF._element.addEventListener("click", this.onClick);
    clearInterval(this._inter);
  }

  onClick(e) {
    const target = e.target;
    // console.log("c:", this.c, "m:", this.m, "h:", this.h);
    if (target.classList.contains("troll")) {
      // console.log("hit");
      this.h++;
      this._game_hits.textContent = this.h;
      target.classList.remove("troll");

      if (this.h == 10) {
        console.log("win");
        alert("WIN !");
        location.reload();
      }
    } else {
      // console.log("miss");
      this.m++;
      this._game_miss.textContent = this.m;

      if (this.m == 5) {
        console.log("lose");
        alert("LOSE !");
        location.reload();
      }
    }
  }
}
