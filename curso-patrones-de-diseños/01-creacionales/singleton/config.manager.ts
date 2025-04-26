class ConfigManager {
    private config: Record<string,string> = {}
    setConfig(key:string, value:string):void{
        this.config[key]=value
    }
    getConfig(key:string): string | null{
        return this.config[key]
    }
    getAllConfig(): Record<string, string>{
        return {...this.config}
    }
}

export const configManager = new ConfigManager()