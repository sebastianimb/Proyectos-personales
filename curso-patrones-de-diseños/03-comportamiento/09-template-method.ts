/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */
abstract class HotBerevage {
  prepare(): void {
    this.boilWater();
    this.putIngredients();
    this.pourInCup();
    this.addCondiments();
  }
  private boilWater(): void {
    console.log("Hirviendo el agua...");
  }
  private pourInCup(): void {
    console.log("Sirviendo en una taza...");
  }
  protected abstract putIngredients(): void;

  protected abstract addCondiments(): void;
}

class Tea extends HotBerevage {
  protected override putIngredients(): void {
    console.log(`Elijiendo el mejor te y colocándolo en la taza...`);
  }
  protected override addCondiments(): void {
    console.log("Añadiendo un poco de miel y limón...");
  }
}
class Coofe extends HotBerevage {
  protected override putIngredients(): void {
    console.log(`Moliendo granos del mejor café y colocándolo en la taza...`);
  }
  protected override addCondiments(): void {
    console.log("Añadiendo un poco de azúcar y leche...");
  }
}

function main() {
  const tea = new Tea();
  const coofe = new Coofe();
  tea.prepare();
  coofe.prepare();
}
main();
