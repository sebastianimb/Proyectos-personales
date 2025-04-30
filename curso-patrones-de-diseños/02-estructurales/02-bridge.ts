import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
interface Ability {
    use():void
}

class SwordAtack implements Ability{
  use(): void {
    console.log('%cLanza un espadazo feroz', COLORS.red);
  }
}

class AxeAtack implements Ability{
    use(): void {
      console.log('%cLanza un hachazo feroz', COLORS.red);
    }
  }

class MagicSpell implements Ability{
    use(): void {
      console.log('%cLanza un hechizo...', COLORS.cyan);
    }
}

class FireSpell implements Ability{
    use(): void {
      console.log('%cLanza un hechizo de fuego...', COLORS.cyan);
    }
}

abstract class Character {
    protected ability: Ability
    constructor(ability: Ability){
        this.ability= ability
    }
    setAbility(ability:Ability){
        this.ability = ability
    }
    abstract useAbility():void
}

class Warrior extends Character{
  override useAbility(): void {
    console.log('El guerrero prepara su fuerza...');
    this.ability.use()
  }
}

class Mage extends Character{
    override useAbility(): void {
        console.log('El mago prepara su magia...');
        this.ability.use()
    }
}

function main(){
    const warrior = new Warrior(new SwordAtack())
    const mage = new Mage(new MagicSpell())
    mage.useAbility()
    mage.setAbility(new FireSpell())
    mage.useAbility()
    warrior.useAbility()
    warrior.setAbility(new AxeAtack())
    warrior.useAbility()
}
main()