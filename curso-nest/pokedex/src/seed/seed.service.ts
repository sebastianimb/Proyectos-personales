import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { url } from 'inspector';
import { PokeResponse } from './interfaces/poke-response-interface';
import { PokemonService } from './../pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios-adapter';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { all } from './../../node_modules/axios/index.d';

@Injectable()
export class SeedService {

  constructor( 
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly _http: AxiosAdapter
    ){}

  async executeSeed(){
    await this.pokemonModel.deleteMany({})

    const data = await this._http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    // const insertPromisesArray: Array<Promise<Pokemon>> = [] -> De la segunda forma
    const insertPokemonsArray: Array<{name:string, no: number}> = []

    data.results.forEach( ({ name, url }) => {
      const segments = url.split('/')
      const no = +segments[segments.length - 2]
      //const response = await this.pokemonModel.create({name, no}) -> De la primera forma
      /* insertPromisesArray.push(
        this.pokemonModel.create({name, no}) -> Segunda forma
      ) */

      // De la tercera y mejor forma
      insertPokemonsArray.push( {name, no} )
    });

    // await Promise.all(insertPromisesArray) -> Segnda forma
    await this.pokemonModel.insertMany(insertPokemonsArray) // -> Tercer y mejor forma

    return "SEED Executed"
  }

}
