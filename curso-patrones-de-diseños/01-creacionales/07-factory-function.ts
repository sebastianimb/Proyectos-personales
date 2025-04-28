/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

type Lenguages = 'es' | 'en' | 'fr'

function createGreeted(lang:Lenguages){
    return function(name: string){
        const messages = {
            'es': `Hola, ${name}`,
            'en': `Hello, ${name}`,
            'fr': `Bonjour, ${name}`
        }
        console.log(messages[lang]);
    }
}

function main(){
    const spanishGreeted = createGreeted('es')
    spanishGreeted('Sebastian')
    const englishhGreeted = createGreeted('en')
    englishhGreeted('Michael')
    const frenchGreeted = createGreeted('fr')
    frenchGreeted('Pier')
}   
main()