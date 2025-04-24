/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */
import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
    prepare():void
}

interface Drink {
    pour():void
}

class ChickenHamburger implements Hamburger {
    prepare(): void {
      console.log('Preparando una hamburguesa de %cpollo...', COLORS.yellow);
    }
}

class VeganHamburger implements Hamburger {
    prepare(): void {
      console.log('Preparando una hamburguesa %cvegana...', COLORS.yellow);
    }
}

class Water implements Drink {
    pour(): void {
        console.log('Preparando una vaso de %cagua...', COLORS.yellow);
    }
}
class Soda implements Drink {
    pour(): void {
        console.log('Preparando una vaso de %cbebida...', COLORS.yellow);
    }
}

interface RestaurantFactory {
    createHamburger(): Hamburger,
    createDrink(): Drink
}

class FastFoodRestaurantFactory implements RestaurantFactory {
    createDrink(): Drink {
        return new Soda
    }
    createHamburger(): Hamburger {
      return new ChickenHamburger
    }
}

class HealthyRestaurantFactory implements RestaurantFactory {
    createDrink(): Drink {
        return new Water
    }
    createHamburger(): Hamburger {
      return new VeganHamburger
    }
}

function main(factory: RestaurantFactory) {
    const hamburger = factory.createHamburger()
    const drink = factory.createDrink()
    hamburger.prepare()
    drink.pour()
  }
  console.log('Fastfood order:');
  main(new FastFoodRestaurantFactory);
  console.log('Healthy order:');
  main(new HealthyRestaurantFactory);