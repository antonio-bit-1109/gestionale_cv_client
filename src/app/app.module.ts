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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    DividerModule,
    HttpClientModule,
    NgbModule,
    ButtonModule,
    BrowserAnimationsModule,
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
