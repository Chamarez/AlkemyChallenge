import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideComponent } from './inside.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderAndFooterModule } from '../header-and-footer/header-and-footer.module';
import { InsideRoutingModule } from './inside-routing.module';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    InsideComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    HeaderAndFooterModule,
    SharedModule,
    InsideRoutingModule

  ]
})
export class InsideModule { }
