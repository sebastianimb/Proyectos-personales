let mensaje: string = "Hola mundo"
mensaje = 'Otro'
mensaje = 'Other'
console.log(mensaje)

/* Tipo en JS
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
*/

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