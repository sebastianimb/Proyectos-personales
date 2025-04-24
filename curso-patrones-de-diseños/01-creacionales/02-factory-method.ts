/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
    prepare():void
}

class chickenHamburger implements Hamburger {
    prepare(): void {
      console.log('Preparando una hamburguesa de polloc/c', COLORS.yellow);
    }
}

class ResHamburger implements Hamburger {
    prepare(): void {
      console.log('Preparando una hamburguesa de Resc/c', COLORS.yellow);
    }
}

abstract class Restaurant {
    protected abstract createHamburger(): Hamburger
    orderHamburger():void{
        const hamburger = this.createHamburger()
        hamburger.prepare()
    }
}
class ChickenHamburgerRestaurant extends Restaurant {
    protected override createHamburger(): Hamburger {
        return new chickenHamburger
    }
}
class ResHamburgerRestaurant extends Restaurant {
    protected override createHamburger(): Hamburger {
        return new ResHamburger
    }
}

const chickenRestaurant = new ChickenHamburgerRestaurant
chickenRestaurant.orderHamburger()

const resRestaunt = new ResHamburgerRestaurant
resRestaunt.orderHamburger()