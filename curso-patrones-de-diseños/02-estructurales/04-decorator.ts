/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

interface Notifications {
    send(msg:string):void
}

class basicNotification implements Notifications {
  send(msg: string): void {
    console.log(`Enviando una notificacion basica: ${msg}`);
  }
}

abstract class notificacionDecorator implements Notifications {
    protected notification: Notifications
    constructor(notification: Notifications){
        this.notification=notification
    }
    send(msg: string): void {
        this.notification.send(msg)
    }
}

class SMSDecorator extends notificacionDecorator{
    private sendSMS(msg:string){
        console.log(`Enviando mensaje a traves de SMS: ${msg}`);
    }
    override send(msg: string): void {
        super.send(msg)
        this.sendSMS(msg)
    }
}
class EmailDecorator extends notificacionDecorator{
    private sendEmail(msg:string){
        console.log(`Enviando mensaje a traves de Correo electronico: ${msg}`);
    }
    override send(msg: string): void {
        super.send(msg)
        this.sendEmail(msg)
    }
}

function main(){
    let notification = new basicNotification()
    notification = new SMSDecorator(notification)
    notification = new EmailDecorator(notification)
    notification.send('Alerta del sistema...')
}
main()