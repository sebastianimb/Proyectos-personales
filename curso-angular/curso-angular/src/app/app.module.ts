import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { routing, appRoutingProviders} from './app.routing'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contacto/contacto.component';
import { FrutaComponent } from './fruta/fruta.component';
import { EmpleadoComponent } from './ermpleado/empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    FrutaComponent,
    EmpleadoComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
