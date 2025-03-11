import { Point, PUNTITO } from "./Point"
import Group, { defaultGroups } from "./Group" // Export por defecto y nombrado
import * as G from "./Group" // Wildard
import { Animales, Chanchos, Caballos } from "./Animales" // ReExport

console.log(Caballos, Chanchos, Animales);

const point = new Point(1,1)
const group = new Group(1, 'Sebastian')
const groups = new G.default(1,'seba')
console.log(PUNTITO);
console.log(defaultGroups.admin);


