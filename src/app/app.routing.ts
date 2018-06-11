import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'pages/login',
      pathMatch: 'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },{
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
    },{
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule'
    },{
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    },{
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
    },{
        path: '',
        loadChildren: './timeline/timeline.module#TimelineModule'
    },{
        path: '',
        loadChildren: './batch/batch.module#BatchModule'
    },{
        path: '',
        loadChildren: './batch2/batch2.module#Batch2Module'
    },{
        path: '',
        loadChildren: './batch3/batch3.module#Batch3Module'
    },{
        path: '',
        loadChildren: './solicitudes-activas/solicitudes-activas.module#SolicitudesActivasModule'
    },{
        path: '',
        loadChildren: './solicitudes-terminadas/solicitudes-terminadas.module#SolicitudesTerminadasModule'
    },{
        path: '',
        loadChildren: './trazabilidad/trazabilidad.module#TrazabilidadModule'
    }
  ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      }]
    }
];
