"use strict";
class Personaje {
    constructor(id, nombre, _hp, level) {
        this.id = id;
        this.nombre = nombre;
        this._hp = _hp;
        this.level = level;
    }
    subirNivel() {
        this.level++;
        return this.level;
    }
    cambiarHp(cantidad) {
        this._hp += cantidad;
        return this._hp;
    }
    get hp() {
        return this._hp;
    }
    static agregarPersonaje() {
        Personaje.equipo++;
    }
    static getEquipo() {
        return Personaje.equipo;
    }
}
Personaje.equipo = 0;
const personaje = new Personaje(1, 'Sebastian', 100, 1);
console.log(personaje);
if (personaje instanceof Personaje) {
    console.log('Type Narrowing de clases');
}
//# sourceMappingURL=index.js.map