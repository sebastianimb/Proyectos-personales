/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

interface FileSystemComponent {
    showDetails(ident?: string): void
}

class File implements FileSystemComponent {
    constructor(private _name: string){}
    showDetails(ident?: string): void {
        console.log(`${ident}-File: ${this._name}`);
    }
}
class Folder implements FileSystemComponent {
    private _content: Array<FileSystemComponent> = []
    constructor(private _name: string ){}
    showDetails(ident: string= ''): void {
        console.log(`${ident}+Carpeta: ${this._name}`);
        this._content.forEach(file => {
            file.showDetails(`${ident} `)
        });
    }
    add(file: FileSystemComponent):void{
        this._content.push(file)
    }
}

function main(){
    const files = [new File('index.html'), new File('ignore.git'), new File('package.json')]
    const file2 = new File('readme.md')
    const file3 = new File('deno.json')

    const Folder1 = new Folder('public')
    files.forEach(files => {
        Folder1.add(files)
    });
    const Folder2 = new Folder('public 2')
    Folder2.add(file2)
    const Folder3 = new Folder('public 3')
    Folder3.add(file3)
    const Folder4 = new Folder('public 4')

    const rootFolder = new Folder('root')
    rootFolder.add(Folder1)
    rootFolder.add(Folder2)
    rootFolder.add(Folder3)
    rootFolder.add(Folder4)
    Folder2.add(Folder3)
    rootFolder.showDetails()
}
main()