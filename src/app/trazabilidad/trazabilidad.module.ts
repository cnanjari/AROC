import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerEmailFilter } from './filter.pipe';
import { TrazabilidadComponent } from './trazabilidad.component';
import { Trazabilidad } from './trazabilidad.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Trazabilidad),
        FormsModule
    ],
    declarations: [TrazabilidadComponent,CustomerEmailFilter]
})

export class TrazabilidadModule {}
