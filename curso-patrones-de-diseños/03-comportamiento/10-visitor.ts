/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHaunstedHouse(haunstedHouse: HaunstedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Atraccion {
  accept(visitor: Visitor): void;
}

class RollerCoaster implements Atraccion {
  private price: number = 50;
  getPrice(): number {
    return this.price;
  }
  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }
}
class HaunstedHouse implements Atraccion {
  private price: number = 20;
  getPrice(): number {
    return this.price;
  }
  accept(visitor: Visitor): void {
    visitor.visitHaunstedHouse(this);
  }
}
class FerrisWheel implements Atraccion {
  private price: number = 50;
  getPrice(): number {
    return this.price;
  }
  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `El niño en RollerCoaster: El precio es de $${
        rollerCoaster.getPrice() * 0.5
      }`
    );
  }
  visitHaunstedHouse(haunstedHouse: HaunstedHouse): void {
    console.log(
      `El niño en haunstedHouse: El precio es de $${
        haunstedHouse.getPrice() * 0.5
      }`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `El niño en ferrisWheel: El precio es de $${ferrisWheel.getPrice() * 0.5}`
    );
  }
}
class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `El adulto en RollerCoaster: El precio es de $${rollerCoaster.getPrice()}`
    );
  }
  visitHaunstedHouse(haunstedHouse: HaunstedHouse): void {
    console.log(
      `El adulto en haunstedHouse: El precio es de $${haunstedHouse.getPrice()}`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `El adulto en ferrisWheel: El precio es de $${ferrisWheel.getPrice()}`
    );
  }
}
class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `El señor en RollerCoaster: El precio es de $${
        rollerCoaster.getPrice() * 0.8
      }`
    );
  }
  visitHaunstedHouse(haunstedHouse: HaunstedHouse): void {
    console.log(
      `El señor en haunstedHouse: El precio es de $${
        haunstedHouse.getPrice() * 0.8
      }`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `El señor en ferrisWheel: El precio es de $${
        ferrisWheel.getPrice() * 0.8
      }`
    );
  }
}

function main() {
  const atracctions: Array<Atraccion> = [
    new RollerCoaster(),
    new HaunstedHouse(),
    new FerrisWheel(),
  ];
  const child = new ChildVisitor();
  atracctions.forEach((atracction) => atracction.accept(child));
  const adult = new AdultVisitor();
  atracctions.forEach((atracction) => atracction.accept(adult));
  const senior = new SeniorVisitor();
  atracctions.forEach((atracction) => atracction.accept(senior));
}
main();
