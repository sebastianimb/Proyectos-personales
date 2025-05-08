/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;
  waitingForMoney(): void;
  selectProduct(): void;
  deliveryProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new waitingForMoneyState(this);
  }
  setState(state: State) {
    this.state = state;
    console.log(`El estado ha cambiado ahora esta en: ${state.name}`);
  }
  getState(): State {
    return this.state;
  }
  waitingForMoney() {
    this.state.waitingForMoney();
  }
  selectProduct() {
    this.state.selectProduct();
  }
  deliveryProduct() {
    this.state.deliveryProduct();
  }
}

class waitingForMoneyState implements State {
  name: string = "Esperando dinero";
  private VendingMachine: VendingMachine;

  constructor(VendingMachine: VendingMachine) {
    this.VendingMachine = VendingMachine;
  }
  waitingForMoney(): void {
    console.log("Dinero insertado, ahora puedes elegir un producto.");

    this.VendingMachine.setState(new selectProductState(this.VendingMachine));
  }
  selectProduct(): void {
    console.log(`No puedes seleccionar productos, primero ingresa dinero.`);
  }
  deliveryProduct(): void {
    console.log(`No puedes seleccionar productos, primero ingresa dinero.`);
  }
}
class selectProductState implements State {
  name: string = "Seleccionando producto";
  private VendingMachine: VendingMachine;

  constructor(VendingMachine: VendingMachine) {
    this.VendingMachine = VendingMachine;
  }
  waitingForMoney(): void {
    console.log(`No puedes insertar dinero, elige tus productos.`);
  }
  selectProduct(): void {
    console.log("Eligiendo productos....., Ahora espere su despacho");

    this.VendingMachine.setState(new deliveryProductState(this.VendingMachine));
  }
  deliveryProduct(): void {
    console.log(`Primero debes elegir un productos`);
  }
}
class deliveryProductState implements State {
  name: string = "Despacho de producto";
  private VendingMachine: VendingMachine;

  constructor(VendingMachine: VendingMachine) {
    this.VendingMachine = VendingMachine;
  }
  waitingForMoney(): void {
    console.log(`Espera el despacho de tus productos...`);
  }
  selectProduct(): void {
    console.log(`Espera el despacho de tus productos...`);
  }
  deliveryProduct(): void {
    console.log(`Producto ya despachado..., volviendo al inicio.`);
    console.log(`Inserte dinero`);
    this.VendingMachine.setState(new waitingForMoneyState(this.VendingMachine));
  }
}

function main() {
  const vendingMachine = new VendingMachine();
  vendingMachine.selectProduct();
  vendingMachine.deliveryProduct();
  vendingMachine.waitingForMoney();
  vendingMachine.waitingForMoney();
  vendingMachine.selectProduct();
  vendingMachine.deliveryProduct();
}
main();
