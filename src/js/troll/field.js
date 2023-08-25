export default class Field {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }

    this._element = element;
  }

  startGame(size) {
    let gameField = `<table class='game_field_table'><tbody>`;
    for (let i = 0; i < size; i++) {
      gameField += `<tr>`;
      for (let i = 0; i < size; i++) {
        gameField += `<td></td>`;
      }
      gameField += `</tr>`;
    }
    gameField += `</tbody></table>`;
    this._element.insertAdjacentHTML("afterbegin", gameField);
  }
}
