/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface Location {
    display(cordinates: {x:number,y:number}):void
}

class LocationIcon implements Location {
    private type: string
    private iconImage: string
    constructor(type:string,iconImage:string){
        this.type=type
        this.iconImage=iconImage
    }
  display(cordinates: { x: number; y: number; }): void {
    console.log(`
        Coords: ${this.type} en {${cordinates.x},${cordinates.y}} - [${this.iconImage}]
        `);
  }
}
// Clase que implementa flyweight
class LocationFactory {
    private icons: Record<string,LocationIcon> = {}
    getLocation(type:string): LocationIcon {
        if (!this.icons[type]) {
            console.log(`Creando la instancia de ${type}`);
            const iconImage = `Imagen de ${type}.png`
            this.icons[type] = new LocationIcon(type,iconImage)
        }
        return this.icons[type]
    }
}

class MapLocation {
    private cords: {x: number, y:number}
    private icon: LocationIcon
    constructor(x:number, y:number, icon:LocationIcon){
        this.cords = {x,y}
        this.icon=icon
    }
    display(){
        this.icon.display(this.cords)
    }
}

function main(){
    const factory = new LocationFactory()
    const locations = [
        new MapLocation(10,20, factory.getLocation('hospital')),
        new MapLocation(15,25, factory.getLocation('hospital')),
        new MapLocation(10,30, factory.getLocation('parque')),
        new MapLocation(45,75, factory.getLocation('parque'))
    ]
    locations.forEach(location => {
        location.display()
    });
}
main()