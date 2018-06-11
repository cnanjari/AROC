import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Batch3Component } from './batch3.component';
import { Batch3Routes } from './batch3.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Batch3Routes),
        FormsModule
    ],
    declarations: [Batch3Component]
})

export class Batch3Module {}
