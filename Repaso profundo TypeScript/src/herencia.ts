// POO HERENCIA

abstract class datosBasicos {
    constructor(
        public name: string,
        public desc: string,
        protected created_at: Date,
        protected created_by: number,
    ){}
    get fullYear() {
        return this.created_at.getFullYear();
    }
    get fullDesc() {
        return this.name + ' ' + this.desc
    }
    abstract guardar(): void
}

class Producto extends datosBasicos {
    constructor(
        public stock: number,
        public sku: number,
        name: string,
        desc: string,
        created_at: Date,
        created_by: number,
    ){
        super(name, desc, created_at, created_by)
    }
    override get fullDesc() {
        return 'Producto'+ '' + super.fullDesc
    }
    guardar(): void {
        console.log('Guardando producto...')
    }
}
class Categoria extends datosBasicos {
    public producto: Producto[] = []
    constructor(
        name: string,
        desc: string,
        created_at: Date,
        created_by: number,
    ){
        super(name, desc, created_at, created_by)
    }
    agregarProducto(producto: Producto) {
        this.producto.push(producto)
    }
    override get fullDesc() {
        return 'Categoria'+ '' + super.fullDesc
    }
    guardar(): void {
        console.log('Guardando categoria...')
    }
}

const product = new Producto(100,1,'Mantequilla', 'Producto de comida', new Date(), 1);
const categoria = new Categoria('Alimentos', 'Categoria de alimentos', new Date, 1)
categoria.agregarProducto(product)
console.log(categoria.fullDesc)