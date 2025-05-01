/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
*/
class Player{
    constructor(
        public name:string,
        public level:number
        ){}
    getStat():void{
        console.log(`El personaje ${this.name}, posee ${this.level}`);
    }
    lvlUp(){
        this.level = this.level+50
        console.log(`El jugador ${this.name}, ha subido 50 niveles, nivel actual: ${this.level}`);
        
    }
    
}

interface Room {
    enter(player:Player):void
}


class SecretRoom implements Room {
  enter(player:Player): void {
    console.log(`El jugador ${player.name} ha entrado en el cuarto secreto...`);
  }
}

class MagicPortal implements Room {
    private minLvl = 50
    constructor(private Room: Room){}
    enter(player: Player): void {
      if (player.level>= this.minLvl ) {
        this.Room.enter(player)
        return
      }
      console.log(`El nivel de ${player.name}, es demasiado bajo, nivel necesario para este cuarto: ${this.minLvl}`); 
    }
}

function main(){
    const player = new Player('Sebastian',0)
    const magicPortal = new MagicPortal(new SecretRoom())
    magicPortal.enter(player)
    player.lvlUp()
    player.lvlUp()
    magicPortal.enter(player)
}
main()