import { Routes } from '@angular/router';

import { SolicitudesTerminadasComponent } from './solicitudes-terminadas.component';

export const SolicitudesTerminadas: Routes = [
    {
      path: '',
      children: [ {
        path: 'solicitudes-terminadas',
        component: SolicitudesTerminadasComponent
    }]
}
];
