import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { BadgeModule } from 'primeng/badge';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { tokenRequestInterceptor } from './interceptors/send-token-request.interceptor';
import { GetAllCvUserComponent } from './components/get-all-cv-user/get-all-cv-user.component';
import { ModificaCvComponent } from './components/modifica-cv/modifica-cv.component';
import { CreaCvComponent } from './components/crea-cv/crea-cv.component';
import { ModalGenericComponent } from './components/modal-generic/modal-generic.component';
import { ConfermaCancellaCvComponent } from './components/conferma-cancella-cv/conferma-cancella-cv.component';
import { RicercaCvEsperienzeComponent } from './components/ricerca-cv-esperienze/ricerca-cv-esperienze.component';
import { OrizontalCardComponent } from './components/shared/orizontal-card/orizontal-card.component';
import { RicercaCvCompetenzaComponent } from './components/ricerca-cv-competenza/ricerca-cv-competenza.component';
import { VisualizzaCvComponent } from './components/visualizza-cv/visualizza-cv.component';
import { CaricaCvAdminComponent } from './components/carica-cv-admin/carica-cv-admin.component';
import { RicercaCvNomeCandidatoComponent } from './components/ricerca-cv-nome-candidato/ricerca-cv-nome-candidato.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrazioneComponent,
    HomeComponent,
    HomePageComponent,
    NavbarComponent,
    SideBarComponent,
    GetAllCvUserComponent,
    ModificaCvComponent,
    CreaCvComponent,
    ModalGenericComponent,
    ConfermaCancellaCvComponent,
    RicercaCvEsperienzeComponent,
    OrizontalCardComponent,
    RicercaCvCompetenzaComponent,
    VisualizzaCvComponent,
    CaricaCvAdminComponent,
    RicercaCvNomeCandidatoComponent,
    ProfiloUtenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    SidebarModule,
    DividerModule,
    HttpClientModule,
    NgbModule,
    ButtonModule,
    BrowserAnimationsModule,
    FileUploadModule,
    BadgeModule,
    FormsModule,
    ToastModule,
    MenubarModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: tokenRequestInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
