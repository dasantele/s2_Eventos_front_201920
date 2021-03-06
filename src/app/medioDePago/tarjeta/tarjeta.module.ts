import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MedioDePagoService } from '../medioDePago.service';
import { TarjetaAddComponent } from './tarjeta-add/tarjeta-add.component';
import { TarjetaListComponent } from './tarjeta-list/tarjeta-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule
    ],
    declarations: [TarjetaAddComponent,
                TarjetaListComponent],
    providers: [MedioDePagoService],
    exports: [TarjetaAddComponent, 
                TarjetaListComponent]
})
export class TarjetaModule { }