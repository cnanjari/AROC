import { Routes } from '@angular/router';

import { Batch3Component } from './batch3.component';

export const Batch3Routes: Routes = [
    {
      path: '',
      children: [ {
        path: 'pages/batch3',
        component: Batch3Component
    }]
}
];
