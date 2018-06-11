import { Routes } from '@angular/router';

import { Batch2Component } from './batch2.component';

export const Batch2Routes: Routes = [
    {
      path: '',
      children: [ {
        path: 'pages/batch2',
        component: Batch2Component
    }]
}
];
