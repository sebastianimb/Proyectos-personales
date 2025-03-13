function Route(ruta: string) {
    return (constructor: Function) => {
        console.log('Ejecutando decorador de ruta');
        constructor.prototype.route = ruta
    }
}
function Method(method:string){
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        console.log(methodName,descriptor);
        const original = descriptor.value
        descriptor.value = function(...args: any) { 
            console.log('metodo decorado')
            original.call(this, ...args)
            console.log('despues metodo decorado')
        }
    }
}
@Route('/productos')
class Productos {
    @Method('get')
    find (val: string) {
        console.log('Im find method'+val);
        
    }
}
const p = new Productos()
p.find(' hola mundo')
