import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importando forms module
import { FormsModule } from '@angular/forms'

// Configurações Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { EstudanteComponent } from './estudantes/estudante/estudante.component';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { EstudanteListaComponent } from './estudantes/estudante-lista/estudante-lista.component';
import { EstudanteService } from './shared/estudante.service';

@NgModule({
  declarations: [
    AppComponent,
    EstudanteComponent,
    EstudantesComponent,
    EstudanteListaComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [EstudanteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
