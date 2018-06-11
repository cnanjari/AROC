import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesTerminadasComponent } from './solicitudes-terminadas.component';
import { SolicitudesTerminadas } from './solicitudes-terminadas.routing';
import { CustomerEmailFilter } from './filter.pipe';
import { CommonService } from '../shared/services/consumemonitor.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SolicitudesTerminadas),
        FormsModule
    ],
    providers: [
        CommonService
      ],
    declarations: [SolicitudesTerminadasComponent,CustomerEmailFilter]
})

export class SolicitudesTerminadasModule {}
