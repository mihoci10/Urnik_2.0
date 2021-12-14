import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DodajPredmetComponent } from './dodaj-predmet/dodaj-predmet.component';
import { DodajProfesorjaComponent } from './dodaj-profesorja/dodaj-profesorja.component';
import { UrnikComponent } from './urnik/urnik.component';


const routes: Routes = [
  { path: '', component: UrnikComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dodajPredmet', component: DodajPredmetComponent},
  { path: 'dodajProfesorja', component: DodajProfesorjaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
