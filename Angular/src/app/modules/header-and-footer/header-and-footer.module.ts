import { NgParticlesModule } from 'ng-particles';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgParticlesModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent]
})
export class HeaderAndFooterModule { }
