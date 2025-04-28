import { Logger } from 'jsr:@deno-library/logger';

// TODO: Implementar el LoggerAdapter

interface ILogger {
    file: string
    writeLog: (msg:string) => void
    writeWarning: (msg:string) => void
    writeError:(msg:string) => void
}

export class DenoLoggerAdapter implements ILogger{
  public file: string;
  private DenoLogger = new Logger()
  constructor(file:string){
    this.file=file
  }
  writeLog(msg: string):void {
    this.DenoLogger.info(`[${this.file} LOG]: ${msg}`)
  };
  writeWarning(msg: string) {
    this.DenoLogger.warn(`[${this.file} WARNING]: ${msg}`)
  };
  writeError(msg: string){
    this.DenoLogger.error(`[${this.file} ERROR]: ${msg}`);
  };
}