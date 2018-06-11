import { Routes } from '@angular/router';

import { TrazabilidadComponent } from './trazabilidad.component';

export const Trazabilidad: Routes = [
    {
      path: '',
      children: [ {
        path: 'trazabilidad',
        component: TrazabilidadComponent
    }]
}
];
