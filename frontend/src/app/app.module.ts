import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NonregComponent } from './nonreg/nonreg.component';
import { RegisterComponent } from './register/register.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChangePassAComponent } from './change-pass-a/change-pass-a.component';
import { OceneComponent } from './ocene/ocene.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewObjekatComponent } from './new-objekat/new-objekat.component';
import { PreviewComponent } from './preview/preview.component';
import { IzmeniObjekatComponent } from './izmeni-objekat/izmeni-objekat.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { PlacanjeComponent } from './placanje/placanje.component';
import { AgencijaProfileComponent } from './agencija-profile/agencija-profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditAgencijaComponent } from './edit-agencija/edit-agencija.component';
import { PregledObjektaComponent } from './pregled-objekta/pregled-objekta.component';
import { JobProgressComponent } from './job-progress/job-progress.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    NonregComponent,
    RegisterComponent,
    AgencijaComponent,
    ChangePassComponent,
    ChangePassAComponent,
    OceneComponent,
    UserProfileComponent,
    NewObjekatComponent,
    PreviewComponent,
    IzmeniObjekatComponent,
    PonudaComponent,
    PlacanjeComponent,
    AgencijaProfileComponent,
    AdminComponent,
    AdminLoginComponent,
    EditUserComponent,
    EditAgencijaComponent,
    PregledObjektaComponent,
    JobProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
