import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BatchComponent } from './batch.component';
import { BatchRoutes } from './batch.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BatchRoutes),
        FormsModule
    ],
    declarations: [BatchComponent]
})

export class BatchModule {}
