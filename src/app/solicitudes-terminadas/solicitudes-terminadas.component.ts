import { TableData } from '../md/md-table/md-table.component';
import { Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeHtml} from '@angular/platform-browser';
import * as Chartist from 'chartist';
import swal from 'sweetalert2';
import { CommonService } from '../shared/services/consumemonitor.service';
import * as moment from 'moment';
@Component({
    selector: 'batch2-cmp',
    templateUrl: 'solicitudes-terminadas.component.html'
})

export class SolicitudesTerminadasComponent implements OnInit {
  [x: string]: any;
  constructor(
   private _sanitizer: DomSanitizer, 
  private _CommonService: CommonService) { }
  public procesos;
  getbyId: Function;
  public procesosSemana: any;
  public id: string;

  procesarProc(data) {
    this.procesos.proc = data;
    var docQ = 0;
    var docOK = 0;
    var docNOK = 0;
    var porComp = 0;
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
        porcOK = Math.round( ((correctos / proc.totalDocumentos) * 100) * 10 ) / 10;
        porcNOK = Math.round(((incorrectos / proc.totalDocumentos) * 100) * 10 ) / 10;
        proc.correctos = correctos;
        proc.incorrectos = incorrectos;
        proc.ejecutados = ejecutados;
        proc.porOK = porcOK;
        proc.porNOK = porcNOK;
        proc.completado =  Math.round(((ejecutados / proc.totalDocumentos) * 100)* 10 )/ 10;
        proc.estado= this.getEstado(proc.idEstado);
      } else {
        proc.tiempoEstimado = "Indeterminado";
      }


    }
    tiempoProceso = Math.round(tiempoProceso / 10);
    this.procesos.docQ = docQ;
    this.procesos.docOK = docOK;
    this.procesos.docNOK = docNOK;
    this.procesos.show= true;
    console.log(this.procesos);
  }
  getEstado(idest){
      if(idest = 0)
      {
        return "Terminado Correctamente"
      }else if(idest = 1){
        return "terminado con errores"
      }else {
        return "errores"
      }
  }
  getProcess() {
    return new Promise((resolve, reject) => {
      this._CommonService.getProcessService();
    })
  };
  procesarDias(data){
    this.procesosSemana = data;
    var docQ = 0;
    var docOK= 0;
    var docNOK = 0;
    var days = this.Last7Days();
    for (let proc of this.procesosSemana) {
      
      for(var i=0; i<=6 ; i++)  {
        var dia = moment(proc.inicio).format("DD/MM/YYYY");
        var comparar = days[i].datesAgo;
        if (dia == comparar){ days[i].qty++ }
      }

      docQ = docQ + proc.totalDocumentos;
      if ( proc.documentos ){
        for (let doc of proc.documentos) {
          if(doc.idEstado = 1){
              docOK = docOK + 1;
          }else{
            docNOK = docNOK + 1;
          }
        }
      }else{
        docNOK = docNOK + proc.totalDocumentos;
      }
      
    }
    this.procesosSemana.docQ = docQ;
    this.procesosSemana.docOK = docOK;
    this.procesosSemana.docNOK = docNOK;  
    var labels = [];
    var series =[];
    for(var i=0; i<=6 ; i++)  {
      labels[i]= days[i].daysAgo;
      series[i]= days[i].qty;
    }
    var max = Math.max.apply(Math, series);

    this.linealChart(labels,series, max)
  }
  linealChart(datos,valores, masAlto){
    var dataDailySalesChart = {
      labels: datos,
      series: [valores]
      
    };

    var optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: masAlto+10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }



    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);

  };
  Last7Days () { 
    var daysAgo = [{}];
    var datesAgo = {};
    var dates={};

     for(var i=0; i<=6; i++) 
     {
       dates[i]= {
         datesAgo: moment().subtract(i, 'days').format("DD/MM/YYYY"),
         daysAgo: moment().subtract(i, 'days').format("ddd"),
         qty: 0
       }
       
     }
     
     return dates
}
startAnimationForLineChart(chart) {
  var seq, delays, durations;
  seq = 0;
  delays = 80;
  durations = 500;
  chart.on('draw', function (data) {

    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if (data.type === 'point') {
      seq++;
      data.element.animate({
        opacity: {
          begin: seq * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: 'ease'
        }
      });
    }
  });

  seq = 0;
}
  ngOnInit(){

    this.procesos = <any>{};
    this.procesos.show = false;
    this.getProcess().then(
      (response) => {
        console.log("llegó la respuesta: ");
        console.log(response);
        this.procesarProc(response);
        this.procesarDias(response);
        console.log(this.procesos);
      }
    );
    
      
      this.getbyId= function (id){
      var logSeleccionado = this.procesos.proc.filter(x => x.idProceso === id);
      console.log(logSeleccionado);
      var docs= logSeleccionado[0].documentos;
      console.log(docs);
      var contenidoDoc;
      if (docs){
        contenidoDoc = 
                        " <div class='col-md-12'>" +
                          " <h3>Documentos</h3>"+
                           `<div class="content table-responsive">
                              <table class="modal-table table">
                                    <thead class="text-info">
                                        <tr>
                                          <th>Id</th>
                                          <th>Inicio</th>
                                          <th>Termina aproximadamente</th>
                                          <th>link</th>
                                          <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       `;

          for (let doc of docs ) {
            
             contenidoDoc+=
               `<tr>`+
               `<td >`+doc.idDocumento+`</td>
                <td >`+ new Date(doc.inicio).getDay() + "-"+new Date(doc.inicio).getMonth() +  "-"+ new Date(doc.inicio).getFullYear() + " "+ new Date(doc.inicio).getHours() +":"+new Date(doc.inicio).getMinutes() +":"+new Date(doc.inicio).getSeconds()+`</td>
                <td >`+ new Date(doc.fin).getDay() + "-"+new Date(doc.fin).getMonth() +  "-"+ new Date(doc.fin).getFullYear() + " "+ new Date(doc.fin).getHours() +":"+new Date(doc.fin).getMinutes() +":"+new Date(doc.fin).getSeconds()+`</td>
                <td >`+doc.link+`</td>
                <td >`+doc.idest+`</td>`+
              `<tr>`;
          };
        
        contenidoDoc+=
                          `
                             </tbody>
                            </table>
                           </div>
                         </div>`
        ;
      };
      swal({
                title: 'Detalle',
                buttonsStyling: false,
                width: "90wh",
                confirmButtonClass: "btn btn-success",
                html:
                        "<div class='row'>" +
                        " <div class='col-md-12'>" +
                           `<div class="content table-responsive">
                              <table class="modal-table table">
                                    <thead class="text-info">
                                        <tr>
                                          <th>Id</th>
                                          <th>Estado</th>
                                          <th>Inicio</th>
                                          <th>termino</th>
                                          <th>Porcentaje de avance</th>
                                          <th>Cantidad de documentos procesados</th>
                                          <th>Cantidad de errores</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td >`+ logSeleccionado[0].idProceso+`</td>
                                            <td >`+ logSeleccionado[0].estado+`</td>
                                            <td >`+ logSeleccionado[0].inicio+`</td>
                                            <td >`+ logSeleccionado[0].fin+`</td>
                                            <td >`+ logSeleccionado[0].completado+`%</td>
                                            <td >`+ logSeleccionado[0].total_DOCUMENTOS+`</td>
                                            <td >`+ logSeleccionado[0].incorrectos+`</td>
                                        </tr>
                                    </tbody>
                              </table>
    
                            </div>`+
                        "</div>" +
                      contenidoDoc+
                        "</div>"
                });
    }
        
  } 
}
