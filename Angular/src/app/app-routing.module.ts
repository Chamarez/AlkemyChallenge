import { InsideModule } from './modules/inside/inside.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/home/login/login.component';
import { RegisterComponent } from './modules/home/register/register.component';
import { InsideComponent } from './modules/inside/inside.component';
import { CheckLoginGuard } from './shared/guard/check-login.guard';



const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'inside', loadChildren:()=> import('./modules/inside/inside.module').then((x)=> x.InsideModule),  canActivate: [CheckLoginGuard]},
  {path:"", redirectTo: 'home' , pathMatch: 'full'},
  {path:"**", redirectTo: 'home',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
