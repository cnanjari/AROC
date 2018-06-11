import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing'; 
import { CommonService } from '../shared/services/consumemonitor.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule
        
    ],
    providers: [
        CommonService
      ],
    declarations: [DashboardComponent]
})

export class DashboardModule {}
