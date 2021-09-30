import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderAndFooterModule } from '../header-and-footer/header-and-footer.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,


  ],
  imports: [
    CommonModule,
    HeaderAndFooterModule,
    FormsModule,
    SharedModule
  ],
  exports: []
})
export class HomeModule { }
