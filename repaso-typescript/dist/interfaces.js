"use strict";
class Caballo {
    constructor() {
        this.name = 'Tiro al blanco';
    }
    caminar() {
        console.log('Caminando...');
    }
    onomatopeya() {
        return 'Hi';
    }
}
class Perro {
    constructor() {
        this.name = 'Miky';
    }
    caminar() {
        console.log('Caminando...');
    }
    onomatopeya() {
        return 'Guau';
    }
}
class DiccionarioUsuario {
}
let userDict = new DiccionarioUsuario();
userDict['1a'] = 'Usuario1';
userDict['a1'] = 'Usuario2';
console.log(userDict);
//# sourceMappingURL=interfaces.js.map