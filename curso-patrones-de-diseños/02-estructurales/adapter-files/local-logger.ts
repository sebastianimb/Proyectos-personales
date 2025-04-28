import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LocalLogger Class
export class Logger {
    constructor(
        private file: string
    ){}
    writeLog(msg:string){
        console.log(`[${this.file} LOG]: ${msg}`);
    }
    writeWarning(msg:string){
        console.log(`[${this.file} WARNING]: %c${msg}`, COLORS.yellow);
    }
    writeError(msg:string){
        console.log(`[${this.file} ERROR]: %c${msg}`, COLORS.red);
    }
}