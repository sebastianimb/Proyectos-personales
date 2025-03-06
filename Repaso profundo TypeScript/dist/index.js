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
}
const personaje = new Personaje(1, 'Sebastian', 100, 1);
console.log(personaje);
if (personaje instanceof Personaje) {
    console.log('Type Narrowing de clases');
}
//# sourceMappingURL=index.js.map