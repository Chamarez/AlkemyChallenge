import { HeaderAndFooterModule } from './modules/header-and-footer/header-and-footer.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { InsideModule } from './modules/inside/inside.module';
import { SharedModule } from './shared/shared.module';
import { NgParticlesModule } from 'ng-particles';
import { FormsModule }   from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgParticlesModule,

     ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
