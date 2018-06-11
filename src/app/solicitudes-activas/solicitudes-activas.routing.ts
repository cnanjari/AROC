import { Routes } from '@angular/router';

import { SolicitudesActivasComponent } from './solicitudes-activas.component';

export const SolicitudesActivas: Routes = [
    {
      path: '',
      children: [ {
        path: 'solicitudes-activas',
        component: SolicitudesActivasComponent
    }]
}
];
