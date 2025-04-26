/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

class DragonBalls {
    private static instance: DragonBalls
    private dragonBallCollected: number
    private constructor(){
        this.dragonBallCollected = 0
    }
    public static getInstance(): DragonBalls {
        if (!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls()
        }
        return DragonBalls.instance
    }
    collectBall(){
        if (this.dragonBallCollected<7) {
            this.dragonBallCollected++
            console.log(`Aun faltan esferas, Total de esferas capturadas: ${this.dragonBallCollected}`);
            return
        }
        console.log(`Esfera del dragon capturadada con exito, Total de esferas capturadas: ${this.dragonBallCollected}`);
        
    }
    summonShenLong(){
        if (this.dragonBallCollected===7) {
            console.log('Se ha invocado a Shenlong, pide tu deseo...');
            this.dragonBallCollected=0
            console.log('Esferas esparcidas...');   
        } else{
            console.log('No ha aparecido, aun faltan esferas, Total de esferas:', this.dragonBallCollected);
            
        }
    }
}

function main(){
    const gokuDragonBalls = DragonBalls.getInstance()
    gokuDragonBalls.collectBall()
    gokuDragonBalls.collectBall()
    gokuDragonBalls.collectBall()
    gokuDragonBalls.collectBall()
    gokuDragonBalls.summonShenLong()
    const vegetaDragonBalls = DragonBalls.getInstance()
    vegetaDragonBalls.collectBall()
    vegetaDragonBalls.collectBall()
    vegetaDragonBalls.collectBall()
    vegetaDragonBalls.summonShenLong()
    vegetaDragonBalls.collectBall()
}
main()