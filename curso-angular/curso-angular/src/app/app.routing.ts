import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"
import {AppModule} from './app.module'

//Components
import { EmpleadoComponent } from "./ermpleado/empleado.component";
import { FrutaComponent } from "./fruta/fruta.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contacto/contacto.component";
import { CochesComponent } from "./coches/coches.component";
import { PlantillasComponent } from "./plantillas/plantillas.component";

const appRoutes: Routes = [
{
  path:'', component:HomeComponent
},
{
  path:'home', component:HomeComponent
},
{
  path:'contacto', component:ContactComponent
},
{
  path:'contacto/:page', component:ContactComponent
},
{
  path:'empleado', component:EmpleadoComponent
},
{
  path:'frutas', component:FrutaComponent
},
{
  path:'coches', component:CochesComponent
},
{
  path:'plantillas', component:PlantillasComponent
},
{
  path:'**', component:HomeComponent
},
]


export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<AppModule> = RouterModule.forRoot(appRoutes)
