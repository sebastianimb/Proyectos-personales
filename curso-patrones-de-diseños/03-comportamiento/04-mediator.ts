/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */
class User {
  private username: string;
  private chatRoom: ChatRoom;
  constructor(username: string, chatroom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatroom;
    this.chatRoom.addUser(this);
  }
  sendMessage(msg: string) {
    console.log(`El usuario ${this.username}: ${msg}`);
    this.chatRoom.sendMessage(this, msg);
  }
  receiveMessage(sender: User, msg: string) {
    console.log(
      `El usuario ${sender.username} envia hacia ${this.username}: ${msg}`
    );
  }
}

class ChatRoom {
  private users: Array<User> = [];
  public title: string;
  constructor(title: string) {
    this.title = title;
  }
  addUser(user: User) {
    this.users.push(user);
  }
  sendMessage(sender: User, msg: string) {
    const userToSend = this.users.filter((userToSend) => {
      return userToSend != sender;
    });
    for (const usersend of userToSend) {
      usersend.receiveMessage(sender, msg);
    }
  }
}

function main() {
  const chatRoom = new ChatRoom("Grupo de trabajo.");
  const user1 = new User("Sebastian", chatRoom);
  const user2 = new User("Patricio", chatRoom);
  const user3 = new User("Carolina", chatRoom);
  const user4 = new User("Felipe", chatRoom);

  user1.sendMessage("Hola a todos!");
}
main();
