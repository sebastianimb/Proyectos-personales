"use strict";
class datosBasicos {
    constructor(name, desc, created_at, created_by) {
        this.name = name;
        this.desc = desc;
        this.created_at = created_at;
        this.created_by = created_by;
    }
    get fullYear() {
        return this.created_at.getFullYear();
    }
    get fullDesc() {
        return this.name + ' ' + this.desc;
    }
}
class Producto extends datosBasicos {
    constructor(stock, sku, name, desc, created_at, created_by) {
        super(name, desc, created_at, created_by);
        this.stock = stock;
        this.sku = sku;
    }
    get fullDesc() {
        return 'Producto' + '' + super.fullDesc;
    }
    guardar() {
        console.log('Guardando producto...');
    }
}
class Categoria extends datosBasicos {
    constructor(name, desc, created_at, created_by) {
        super(name, desc, created_at, created_by);
        this.producto = [];
    }
    agregarProducto(producto) {
        this.producto.push(producto);
    }
    get fullDesc() {
        return 'Categoria' + '' + super.fullDesc;
    }
    guardar() {
        console.log('Guardando categoria...');
    }
}
const product = new Producto(100, 1, 'Mantequilla', 'Producto de comida', new Date(), 1);
const categoria = new Categoria('Alimentos', 'Categoria de alimentos', new Date, 1);
categoria.agregarProducto(product);
console.log(categoria.fullDesc);
//# sourceMappingURL=herencia.js.map