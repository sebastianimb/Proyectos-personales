/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class FlyOnWater implements MovementStrategy {
  move(): void {
    console.log(`El pato vuela por el agua...`);
  }
}
class SwimOnWater implements MovementStrategy {
  move(): void {
    console.log(`El pato nada por el agua...`);
  }
}
class WalkOnShore implements MovementStrategy {
  move(): void {
    console.log(`El pato camina por la orilla...`);
  }
}

class Duck {
  private name: string;
  private MovementStrategy: MovementStrategy;

  constructor(name: string, MovementStrategy: MovementStrategy) {
    this.name = name;
    this.MovementStrategy = MovementStrategy;
  }

  performMove() {
    console.log(`El pato esta listo para moverse...`);
    this.MovementStrategy.move();
  }

  setMovementStrategy(strategy: MovementStrategy) {
    this.MovementStrategy = strategy;
    console.log(`El pato ha cambiado de estrategia...`);
  }
}

function main() {
  const duck1 = new Duck("Pato rapido", new SwimOnWater());
  const duck2 = new Duck("Pato no rapido", new FlyOnWater());
  const duck3 = new Duck("Pato lento", new WalkOnShore());

  console.log(`Comienza la carrera de patos`);
  duck1.performMove();
  duck2.performMove();
  duck3.performMove();

  duck3.setMovementStrategy(new FlyOnWater());
  duck3.performMove();
}
main();
