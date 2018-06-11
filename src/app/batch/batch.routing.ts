import { Routes } from '@angular/router';

import { BatchComponent } from './batch.component';

export const BatchRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'pages/batch',
        component: BatchComponent
    }]
}
];
