/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

class GameMemento {
  private level: number;
  private health: number;
  private position: string;
  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }
  getLevel() {
    return this.level;
  }
  getHealth() {
    return this.health;
  }
  getPosition() {
    return this.position;
  }
}

class Game {
  private level: number;
  private health: number;
  private position: string;
  constructor(level: number, health: number, position: string) {
    this.level = level;
    this.health = health;
    this.position = position;
  }
  save(): GameMemento {
    console.log(`Se ha guardado la partida en ${this.position}`);

    return new GameMemento(this.level, this.health, this.position);
  }
  play(level: number, health: number, position: string) {
    console.log(
      `Jugando en el nivel: ${level}, con ${health} puntos de vida en la posicion: ${position}`
    );
  }
  restore(history: GameMemento) {
    this.level = history.getLevel();
    this.health = history.getHealth();
    this.position = history.getPosition();
  }
}

class HistoryGame {
  private history: Array<GameMemento> = [];
  push(save: GameMemento) {
    this.history.push(save);
  }
  pop(): GameMemento | null {
    return this.history.pop() ?? null;
  }
}

function main() {
  const game = new Game(1, 100, "Callejon maldito");
  const historyGame = new HistoryGame();
  historyGame.push(game.save());
  game.play(3, 50, "Castillo de sangre");
  historyGame.push(game.save());
  game.restore(historyGame.pop()!);
  historyGame.push(game.save());
}
main();
