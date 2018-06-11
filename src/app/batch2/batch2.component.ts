import { TableData } from '../md/md-table/md-table.component';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'batch2-cmp',
    templateUrl: 'batch2.component.html'
})

export class Batch2Component implements OnInit{
   public tableData: TableData;
  ngOnInit(){
        this.tableData = {
            headerRow: ['ID', 'Nombre', 'Clase', 'Subclase'],
            dataRows: [
                ['1', 'Declaracion de impuestos', 'Legal', 'Declaracion'],
                ['2', 'Declaracion de renta', 'Legal', 'Declaracion'],
                ['3', 'Declaracion de ingresos', 'Legal', 'Declaracion'],
                ['4', 'Patrimonio fiscal', 'Legal', 'Declaracion']
            ]
         }; 
  } 
}
