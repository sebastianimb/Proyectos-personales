/* let mensaje: string = "Hola mundo"
mensaje = 'Otro'
mensaje = 'Other'
console.log(mensaje)

Tipo en JS
*number
*string
*boolean
*undefined
*null
*object
*funcion 

Tipos de TS
*any (No usarlo)
*unknown
*never
*arrays
*tuplas
*Enums
*
* tipos inferidos

let extincionDinosaurios: number = 76_000_000
let dinosaurioFavorito: string = "T-Rex"
let extintos: boolean = true

function configuracion(config:any) {
    return config
}

//Arrays 
let animales: string[] = ["Perro", "Gato", "Vaca"]
let nums: number[] = [1,2,3,4]
let checks: boolean[] = []
let nums2: Array<number> = []
// nums.map((num)=> num.) El autocompletado suguiere metodos del tipo de dato.

//Tuplas
// id, nombre 1,felipe
let tupla: [number, string] = [1, 'Felipe']

//Enums
enum Talla { Pequeña='s', Mediana='m', Grande='l', ExtraGrande='xl'}

const talla = Talla.Pequeña
console.log(talla)

const enum LoadingState { Idle, Loading, Success, Error }
const estado = LoadingState.Idle

// Objetos

// const objeto: {
//     readonly id: number,
//     // name?: string,
//     name:string,
//     talla: Talla
// } = { id:1, name: 'Sebastian', talla:Talla.ExtraGrande}
type Direccion = {
    calle: string,
    numero: number,
    pais: string,
}
type Persona = {
    readonly id: number,
    //name?: string,
    name:string,
    talla: Talla
    direccion: Direccion
}
const objeto: Persona = { id:1, name: 'Sebastian', talla:Talla.ExtraGrande, direccion: {calle:'direccion alea', numero:23, pais:'China'}}

const arr: Array<Persona> = []
const arrr: Persona[] = []

//Funciones
const fn: (a:number)=>number = (edad:number)=> {
    return edad
}

function validaEdad(edad:number, msg:'hola que tal'): string{
    if(edad >17){
        return `pasa ${msg}`
    }
    return 'no pasa'
}

// Never
function error(): never {
    throw new Error('Error')
}

// Optional Chaining
let puntaje: number | string = 98

type Animal = {
    id:number,
    especie: string
}

type Personas = {
    id:number,
    nombre: string
}

let Usuario: Animal | Personas = {
    id:1,
    especie:'Mamifero',
    nombre:'Kalix'
}

function sumaDos(nom: number | string): number {
    if(typeof nom === 'number'){
        return nom + 10
    }
    return parseInt(nom) + 10
}

// Interception Types
type Audit = {
    created_at: string,
    modify_at: string
}

type Product = {
    name: string
}

const product: Audit & Product = {
    created_at: '',
    modify_at: '',
    name: 'Producto 1'
}

// Literal Types
type Fibo = 1 | 2 | 3 | 4 | 5
const nDeFibo: Fibo = 4

// nulleable Types
function toNumber(str:string | null | undefined): number {
    if(!str) {
        return 0
    }
    return parseInt(str)
}

const n = toNumber(null)


//Optional chain operator
function getUser(id:number) {
    if (id<0) {
        return null
    }
    return {
        id: 1,
        name: 'John Doe',
        created_at: new Date()
    }
}

const user = getUser(1)
console.log(user?.created_at)

const arrs = null
arrs?.[0]

const fn5: any = null;

fn5?.()

// Nullish coalescing operator
const difficulty: number | null = 0;
const user5 = {
    name: 'Pedro',
    difficulty: difficulty ?? 1
}

// Type Assertion
const elem: any = null
const num = elem as number

//const input = document.getElementById('input') as HTMLInputElement
const input = <HTMLInputElement>document.getElementById('input')
console.log(input.value)

// Type Narrowing
let str6: string | number = '10'
if(typeof str6 === 'string'){
    str6 = str6.toUpperCase()
}
if(typeof str6 === 'number'){
    str6 = ''
}

// Never Type
function procesa(algo: unknown){
    if(typeof algo === 'function'){
        algo()
    }
    if (algo instanceof Array) {
        algo.length
    } else {
        throw new Error('No es una función')
    }
}
 */


// P.O.O
class Personaje {
    /* readonly id:number
    nombre: string
    private _hp:number
    level: number
    profesion?: string
    constructor(id: number, nombre: string, hp: number, level: number){
        this.id= id;
        this.nombre = nombre;
        this._hp = hp;
        this.level = level;
    } */
    profesion?: string
    private static equipo: number = 0
    constructor(
        public id: number,
        public nombre: string,
        private _hp: number,
        public level: number){
    }
    subirNivel(): number {
        this.level++;
        return this.level;
    }
    cambiarHp(cantidad:number): number {
        this._hp += cantidad;
        return this._hp;
    }
    get hp(): number {
        return this._hp;
    }
    static agregarPersonaje(): void {
        Personaje.equipo++;
    }
    static getEquipo(): number {
        return Personaje.equipo;
    }
    /* set hp(cantidad: number) {
        this._hp += cantidad;
    } */
}

const personaje = new Personaje(1,'Sebastian', 100, 1)
console.log(personaje)

//Type Narrowing
if (personaje instanceof Personaje) {
    console.log('Type Narrowing de clases')
}