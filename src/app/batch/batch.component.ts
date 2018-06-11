import { TableData } from '../md/md-table/md-table.component';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'batch-cmp',
    templateUrl: 'batch.component.html'
})

export class BatchComponent implements OnInit{
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
