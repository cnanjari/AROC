import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Batch2Component } from './batch2.component';
import { Batch2Routes } from './batch2.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Batch2Routes),
        FormsModule
    ],
    declarations: [Batch2Component]
})

export class Batch2Module {}
