import { TableData } from '../md/md-table/md-table.component';
import { Injectable, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as moment from 'moment';
import * as Chartist from 'chartist';
import swal from 'sweetalert2';
import { CommonService } from '../shared/services/consumemonitor.service';

@Component({
  selector: 'batch2-cmp',
  templateUrl: "solicitudes-activas.component.html"
})

export class SolicitudesActivasComponent implements OnInit {
  constructor(
    private _sanitizer: DomSanitizer,
    private _CommonService: CommonService) { }

  [x: string]: any;
  public id: string;
  public procesos: any;
  public data: any;
  public getbyId: any;

  

  procesarProc(data) {
    
    this.procesos.proc = data;
    var docQ = 0;
    var docOK = 0;
    var docNOK = 0;
    var porComp = 0;
    var existenproc= false;
    for (let proc of this.procesos.proc) {
      var tiempoProceso = 0;
          var correctos = 0;
          var incorrectos = 0;
          var ejecutados = 0;
          var porcOK = 0;
          var porcNOK = 0;
          var porComp = 0;
      docQ = docQ + proc.totalDocumentos;
      if (proc.documentos){
        existenproc= true;
        ejecutados = Object.keys(proc.documentos).length;
      }else{
        ejecutados = 0;
      }
      
      if (ejecutados > 0) {
        for (let doc of proc.documentos) {

          if (doc.idEstado = 0) {
            docOK = docOK + 1;
          } else {
            docNOK = docNOK + 1;
          }
          doc.tiempoProceso = Math.abs((new Date(doc.inicio).getTime() - new Date(doc.fin).getTime()) / 1000)
          if (!isNaN(doc.tiempoProceso || doc.tiempoProceso != null)) {
            tiempoProceso += doc.tiempoProceso;
          }
        }
      } else {
        docNOK = docNOK + proc.totalDocumentos;
      }
      
      if (!isNaN(tiempoProceso) && ejecutados > 0 && !(proc.totalDocumentos == 0)) {

        var minutosProceso = Math.floor(tiempoProceso / 60);
        proc.tiempoProceso = minutosProceso + ":" + (tiempoProceso - minutosProceso * 60);

        var tiempoPromedio = Math.round(tiempoProceso / proc.totalDocumentos);
        var TiempoEstimado = Math.floor(tiempoPromedio * proc.totalDocumentos);

        proc.tiempoEstimado = Math.floor(TiempoEstimado / 60) + ":" + Math.floor(TiempoEstimado - (Math.floor(TiempoEstimado / 60) * 60));
        porcOK = (correctos / proc.totalDocumentos) * 100;
        porcNOK = (incorrectos / proc.totalDocumentos) * 100;
        proc.correctos = correctos;
        proc.incorrectos = incorrectos;
        proc.ejecutados = ejecutados;
        proc.porOK = porcOK;
        proc.porNOK = porcNOK;
        proc.completado = (ejecutados / proc.totalDocumentos) * 100;
      } else {
        proc.tiempoEstimado = "Indeterminado";
      }


    }
    tiempoProceso = Math.round(tiempoProceso / 10);
    this.procesos.docQ = docQ;
    this.procesos.docOK = docOK;
    this.procesos.docNOK = docNOK;
    this.procesos.existenproc= existenproc;
    console.log(this.procesos);
  }
  getProcess() {
    return new Promise((resolve, reject) => {
      this.data = this._CommonService.getProcessStatusService(3);
    })
  };
  ngOnInit() {
    this.procesos = <any>{};
    setInterval(() => {
      this.getProcess().then(
        (response) => {
          this.procesarProc(response);
        }
      );
    }, 10000);


    var dataDailySalesChart = {
      labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      series: [
        [200, 17, 70, 100, 50, 25, 35]
      ]
    };


    var optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 15
      }),
      low: 0,
      high: 250, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }
    this.getbyId = function (id) {

      this.logSeleccionado = this.procesos.proc.filter(x => x.idProceso === id);

      swal({
        title: 'Detalle Solicitud Batch',
        buttonsStyling: false,
        width: "100vw",
        confirmButtonClass: "btn btn-success",
        html:
          "<div class='row'>" +
          " <div class='col-md-12'>" +
          "<h3>" + this.logSeleccionado[0].idProceso + "</h3>" +
          `<div class="content table-responsive">
                              <table class="modal-table table">
                                    <thead class="text-info">
                                        <tr>
                                          <th>Inicio</th>
                                          <th>Termino</th>
                                          <th>Porcentaje de avance</th>
                                          <th>Cantidad de documentos procesados</th>
                                          <th>total documentos</th>
                                          <th>Cantidad de errores</th>
                                          <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >`+ this.logSeleccionado[0].inicio.toLocaleString() + `</td>
                                            <td >`+ this.logSeleccionado[0].fin.toLocaleString() + `</td>
                                            <td >`+ this.logSeleccionado[0].completado + `%</td>
                                            <td >`+ this.logSeleccionado[0].totalDocumentos + `</td>
                                            <td >`+ this.logSeleccionado[0].ejecutados + `</td>
                                            <td >`+ this.logSeleccionado[0].incorrectos + `</td>
                                            <td >`+ this.logSeleccionado[0].estado + `</td>
                                        </tr>
                                    </tbody>
                              </table>
    
                            </div>`+
          "</div>" +
          "</div>"
      });
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.id = "";

  }



}
