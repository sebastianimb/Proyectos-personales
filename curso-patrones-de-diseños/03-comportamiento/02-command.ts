/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */
interface Command {
  execute(): void;
}

class Light {
  turnON() {
    console.log("La luz esta encendida...");
  }
  turnOff() {
    console.log("La luz esta apagada...");
  }
}
class Fan {
  on() {
    console.log("El ventilador esta encendido...");
  }
  off() {
    console.log("El ventilador esta apagado...");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnON();
  }
}
class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOff();
  }
}
class FanOnCommand implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.on();
  }
}
class FanOffCommand implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.off();
  }
}

class RemoteController {
  private _commands: Record<string, Command> = {};
  setCommand(button: string, command: Command) {
    this._commands[button] = command;
  }
  pressButton(button: string) {
    if (this._commands[button]) {
      this._commands[button].execute();
      return;
    }
    console.log("No existe algun comando para este boton.");
  }
}

function main() {
  const remoteControl = new RemoteController();
  const light = new Light();
  const fan = new Fan();

  const commandLightOn = new LightOnCommand(light);
  const commandLightOff = new LightOffCommand(light);
  const commandFanOn = new FanOnCommand(fan);
  const commandFanOff = new FanOffCommand(fan);

  remoteControl.setCommand("1", commandLightOn);
  remoteControl.setCommand("2", commandLightOff);
  remoteControl.setCommand("3", commandFanOff);
  remoteControl.setCommand("4", commandFanOn);
  remoteControl.pressButton("1");
  remoteControl.pressButton("2");
  remoteControl.pressButton("4");
  remoteControl.pressButton("3");
}
main();
