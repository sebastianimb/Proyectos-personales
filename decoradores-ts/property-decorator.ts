function Min(min:number){
    return(target: any, propertyName:string) => {
        let val: string
        const descriptor: PropertyDescriptor = {
            get() {
                return val
            },
            set(v:string) {
                if (v.length<min) {
                    throw new Error(`${propertyName} debe ser minimo de largo ${min}`)
                }
                val = v
            },
        }
        Object.defineProperty(target, propertyName, descriptor)
    }
}
class User {
    @Min(6)
    public password: string
    constructor(public name: string, public lastname: string, password:string){
        this.password= password
    }
}

const user = new User('Sebastian', 'Molina', '123456')
console.log(user.password);


export {}