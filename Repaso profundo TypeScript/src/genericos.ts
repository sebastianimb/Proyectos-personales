//Genericos
function log<T, V>(a: T, b: V): V {
    console.log(`${a}: ${b}`);
    return b
}

log<string,number>('Hola mundo', 1)
log<string, string>('Hola mundo',' Chao mundo')
log('Hola mundo', 1)

// Genericos en funciones
async function fetchData<T>(recurso: string): Promise<T> {
    const respuesta = await fetch(`${recurso}`);
    return respuesta.json();
}
type User = {
    id: number,
    nombre: string
}
async function main() {
    const user = await fetchData<User>('/usuarios')
    console.log(user.id, user.nombre);
}

// Genericos en clases
class Programador<T> {
    computador: T
    constructor(computador: T){
        this.computador = computador
    }
}
interface Computador {
    encender: ()=> void
    apagar: ()=> void
}

const programador = new Programador<Computador>({ encender: ()=> {}, apagar: ()=> {}})
const programadorString = new Programador<String>('Hola Mundo')

// Genericos en interfaces
interface KeyValue<T,V> {
    key: T,
    value: V
}
interface Producto {
    id:number
}

function fetchProduct(): KeyValue<string, Producto> {
    return { key: 'id del producto', value: product}
}

function fetchStock(): KeyValue<string, number> {
    return { key: 'id del producto', value: 500}
}

// Restricciones en genericos

/* type UserEx = {
    id: number,
    name: string
} */
class UserEx {
    constructor(public id: number, public name: string) {}
}
function print<T extends UserEx>(print: T): T {
    console.log(print)
    return print
}
print({id:1, name: 'Sebastian'})

// Genericos con herencia
class Estado<T> {
    protected data: T[] = []
    agregar(t:T): void {
        this.data.push(t)
    }
    getEstado(): T[] {
        return this.data
    }
}
type ObjectId = {
    id: string
}
// Pasar el genericos con restricciones
class EstadoEliminar<T extends ObjectId> extends Estado<T>{
    eliminar(id: string): void {
        this.data = this.data.filter(item => item.id !== id)
    }
}

class EstadosUsuarios extends Estado<UserEx> {
    reiniciarContrasenas() : void {
        // logica
    }
}
const estadoUsuarios = new EstadosUsuarios

//operador keyof
type Calendar = {
    id: number,
    name: string,
    fuente: string
}

const calendar: Calendar = {id:1,name:'Google',fuente:'Google'}

function getKeyCalendar<T>(objeto: T, property: keyof T): unknown {
    return objeto[property]
}


//Utility Types
type Punto = {
    x: number,
    y: number,
    desc?: string
}

type PuntoOptional = Partial<Punto>
type PuntoRequired = Required<Punto>

const keyVal: Record<string, number> = { 'im string': 44}
type sameKeyVal = { [key:string]: number}

const puntoOmit: Omit<Punto,'desc'|'y'> = {
    x:1
}

const puntoPick: Pick<Punto, 'x'|'y'> = {
    x:1,
    y:2
}

const puntoReadOnly: Readonly<Punto> = {
    x:1,
    y:2
}