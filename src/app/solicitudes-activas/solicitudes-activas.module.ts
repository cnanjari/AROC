import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudesActivasComponent } from './solicitudes-activas.component';
import { SolicitudesActivas } from './solicitudes-activas.routing';
import { CustomerEmailFilter } from './filter.pipe';
import { CommonService } from '../shared/services/consumemonitor.service';

@NgModule({
    
    imports: [
        CommonModule,
        RouterModule.forChild(SolicitudesActivas),
        FormsModule
        
    ],
    providers: [
        CommonService
      ],
    declarations: [SolicitudesActivasComponent, CustomerEmailFilter]
})

export class SolicitudesActivasModule {}
