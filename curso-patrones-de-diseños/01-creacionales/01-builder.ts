/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
    public cpu= 'cpu - no defined'
    public ram= 'ram - no defined'
    public storage= 'storage - no defined'
    public gpu?:string
    displayConfiguration(){
        console.log(`Configuration:
            CPU: ${this.cpu}
            RAM: ${this.ram}
            STORAGE: ${this.storage}
            GPU: ${this.gpu ? this.gpu : 'No gpu'} 
            `);
        
    }
}
class ComputerBuilder{
    private computer : Computer
    constructor(){
        this.computer = new Computer()
    }
    setCpu(cpu:string): ComputerBuilder {
        this.computer.cpu = cpu
        return this
    }
    setRam(ram:string): ComputerBuilder {
        this.computer.ram = ram
        return this
    }
    setStorage(storage:string): ComputerBuilder {
        this.computer.storage = storage
        return this
    }
    setGpu(gpu:string): ComputerBuilder {
        this.computer.gpu = gpu
        return this
    }
    build(){
        return this.computer
    }
}

const newComputer: Computer = new ComputerBuilder()
    .setCpu('i7-12100')
    .setRam('16GB')
    .setStorage('1TB')
    .build()

newComputer.displayConfiguration()