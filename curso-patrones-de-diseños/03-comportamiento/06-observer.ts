/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YoutubeChannel {
  private suscribers: Array<Observer> = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.suscribers.push(observer);
    console.log(`El canal ${this.name}, ha recibido un nuevo suscriptor...`);
  }

  unsuscribe(observer: Observer) {
    this.suscribers = this.suscribers.filter((sub) => sub !== observer);
    console.log(`El canal ${this.name}, ha perdido un suscriptor...`);
  }

  uploadVideo(videoTitle: string) {
    console.log(
      `El canal ${this.name}, ha subido un nuevo video: ${videoTitle}`
    );

    this.suscribers.forEach((subs) => {
      subs.notify(videoTitle);
    });
  }
}

class Suscriptor implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `El suscriptor ${this.name}, ha sido notificado del nuevo video llamado: ${videoTitle}`
    );
  }
}

function main() {
  const youtubeChannel = new YoutubeChannel("TedX");
  const sub1 = new Suscriptor("Sebastian");
  const sub2 = new Suscriptor("Felipe");
  const sub3 = new Suscriptor("Carolina");
  const sub4 = new Suscriptor("Patricio");
  const sub5 = new Suscriptor("Ingrid");
  youtubeChannel.subscribe(sub1);
  youtubeChannel.subscribe(sub2);
  youtubeChannel.subscribe(sub3);
  youtubeChannel.subscribe(sub4);
  youtubeChannel.subscribe(sub5);
  youtubeChannel.unsuscribe(sub5);
  youtubeChannel.uploadVideo("Firt lecture");
}
main();
