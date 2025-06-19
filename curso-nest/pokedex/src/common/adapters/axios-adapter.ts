import axios, { AxiosInstance } from "axios"
import { HtttpAdapter } from "../interfaces/htttp-adapter-interface"
import { Injectable } from "@nestjs/common"

@Injectable()
export class AxiosAdapter implements HtttpAdapter {
    private readonly _axios: AxiosInstance = axios

    async get<T>(url: string): Promise<T> {
        try{
            const { data } = await this._axios.get<T>(url)
            return data
        }
        catch{
            throw new Error('This is an error - Check logs')
        }
    }
}