import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { NonregComponent } from './nonreg/nonreg.component';
import { RegisterComponent } from './register/register.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChangePassAComponent } from './change-pass-a/change-pass-a.component';
import { OceneComponent } from './ocene/ocene.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewObjekatComponent } from './new-objekat/new-objekat.component';
import { IzmeniObjekatComponent } from './izmeni-objekat/izmeni-objekat.component';
import { PreviewComponent } from './preview/preview.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { PlacanjeComponent } from './placanje/placanje.component';
import { AgencijaProfileComponent } from './agencija-profile/agencija-profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditAgencijaComponent } from './edit-agencija/edit-agencija.component';
import { PregledObjektaComponent } from './pregled-objekta/pregled-objekta.component';
import { JobProgressComponent } from './job-progress/job-progress.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'user', component: UserComponent},
  {path: 'nonreg',component:NonregComponent},
  {path:'reg',component:RegisterComponent},
  {path:'agencija',component:AgencijaComponent},
  {path:'changePass',component:ChangePassComponent},
  {path:'changePassA',component:ChangePassAComponent},
  {path:'ocene',component:OceneComponent},
  {path: 'userProfile',component:UserProfileComponent},
  {path: 'newObjekat',component:NewObjekatComponent},
  {path: 'izmeniObjekat',component:IzmeniObjekatComponent},
  {path: 'preview',component:PreviewComponent},
  {path: 'ponuda',component:PonudaComponent},
  {path: 'placanje',component:PlacanjeComponent},
  {path: 'agenProfile',component:AgencijaProfileComponent},
  {path: 'admin',component:AdminLoginComponent},
  {path: 'adminPf',component:AdminComponent},
  {path:'editU',component:EditUserComponent},
  {path:'editA',component:EditAgencijaComponent},
  {path:'prevO',component:PregledObjektaComponent},
  {path:'jobP',component:JobProgressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
