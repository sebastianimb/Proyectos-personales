/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
  setNext(Handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;
  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

class BasicSupport extends BaseHandler {
  override handle(request: string) {
    if (request === "basico") {
      console.log("Soporte basico: resolviendo consulta basica... adios");
      return;
    }
    console.log("Soporte basico: derivando consulta a soporte avanzado...");
    super.handle(request);
  }
}
class AdvancedSupport extends BaseHandler {
  override handle(request: string) {
    if (request === "avanzado") {
      console.log("Soporte avanzado: resolviendo consulta avanzada... adios");
      return;
    }
    console.log("Soporte avanzado: derivando consulta a soporte expero...");
    super.handle(request);
  }
}
class ExpertSupport extends BaseHandler {
  override handle(request: string) {
    if (request === "experto") {
      console.log("Soporte experto: resolviendo consulta experta... adios");
      return;
    }
    console.log(
      "Soporte experto: no se pudo resolver la consulta, enviaremos un tecnico a domicilio... adios."
    );
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();
  basicSupport.setNext(advancedSupport).setNext(expertSupport);
  basicSupport.handle("experto");
}
main();
