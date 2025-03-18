// Interfaces
interface Animal {
    name: string;
    caminar(): void
    onomatopeya(): string
}

class Caballo implements Animal {
    name:string = 'Tiro al blanco'
    caminar(){
        console.log('Caminando...');
        
    }
    onomatopeya(): string {
        return 'Hi' 
    }
}

class Perro implements Animal {
    name:string = 'Miky'
    caminar(){
        console.log('Caminando...');
        
    }
    onomatopeya(): string {
        return 'Guau' 
    }
}

// Index Signatures

class DiccionarioUsuario {
    [id: string]: string
}

let userDict: DiccionarioUsuario = new DiccionarioUsuario()
userDict['1a'] = 'Usuario1'
userDict['a1'] = 'Usuario2'

console.log(userDict);
