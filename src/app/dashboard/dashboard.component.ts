import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../shared/services/consumemonitor.service';
import * as Chartist from 'chartist'; 
import { Pipe } from '@angular/core';
import { DecimalPipe } from "@angular/common";
import { Http, Headers, Response } from '@angular/http';
import * as moment from 'moment';

declare var $: any;

declare interface Indicadores {
  titulo: string;
  cantidad: number;
  label: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterViewInit {
  constructor( private _CommonService: CommonService) { }

  [x: string]: any;

  public indicadores1: Indicadores[];
  public tableData: TableData;
  public res: any;
  public procesos: any;
  public procesosSemana: any;
  public color1: any;
  public color2: any;
  public color3: any;
  public ultimoproceso: any;

  public ngOnInit() {
    var initialhours = 24;
    this.indicadores1 = [
      { titulo: "Ultimas  " + initialhours + " horas ", cantidad: 0, label: "Procesos generados" },
      { titulo: "Documentos Generados últimas  " + initialhours + " horas ", cantidad: 0, label: "Documentos Generados" },
      { titulo: "Ultimas  " + initialhours + " horas ", cantidad: 0, label: "Errores detectados" }
    ];
    this.procesos = <any>{};
    this.getProcessByTime(initialhours.toString()).then(
      (response) =>  {
        this.procesarProc(response);
      }
    );
    this.getProcessByTime("168").then(
      (response) =>  {
        this.procesarDias(response);
        this.donutchart(this.procesosSemana.docOK, this.procesosSemana.docNOK)
      }
    );

  }
  procesarProc(data){
    this.procesos.proc = data;
    var docQ = 0;
    var docOK= 0;
    var docNOK = 0;
    var times = [];
    for (let proc of this.procesos.proc) {
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
    this.procesos.docQ = docQ;
    this.procesos.docOK = docOK;
    this.procesos.docNOK = docNOK;  
    this.indicadores1[0].cantidad= this.procesos.proc.length;
    this.indicadores1[1].cantidad= docQ;
    this.indicadores1[2].cantidad= docNOK; 
    this.color1 = this.changeColor( this.indicadores1[0].cantidad);
    this.color2 = this.changeColor( this.indicadores1[1].cantidad);
    this.color3 = this.changeColor( this.indicadores1[2].cantidad);
    var contador = 0;
    for (let index of this.procesos.proc[this.procesos.proc.length -1].documentos){
        
        times[contador] = moment(index.inicio).format("DD/MM/YYYY HH:mm:ss");
        contador +=1;
    }
    this.ultimoproceso = this.procesos.proc[this.procesos.proc.length -1].idProceso;
    var seguimiento = this.count(times)
    this.linealSeguimientoChart(seguimiento);
  }
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
  linealSeguimientoChart(seguimiento){

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */
    var label= [];
    var serie=[];
    for(var i=0; i<=seguimiento.length-1 ; i++)  {
      
      var element = seguimiento[i];
      label[i]=element[0];
      serie[i]=element[1];
      
    }
    console.log(serie);
    var dataCompletedTasksChart = {
      labels: label,
      series: [serie]
      
    };

    var optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: Math.max.apply(Math, serie)+6, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    this.startAnimationForLineChart(completedTasksChart);
  }

  donutchart(ok, nok){
    var correcto = ok;
    var error = nok;
    var total = ok + nok;
    var porok = (ok / total) *100;
    var pornok = (nok / total) *100;
    var dataPreferences = {
      labels: [porok + '%', pornok + '%'],
      series: [correcto, error]
    };

    var optionsPreferences = {

    };
    var piechart = new Chartist.Pie('#donutChart', dataPreferences, optionsPreferences);
    this.startAnimationForLineChart(piechart);

  }
  getProcessByTime(tiempo: string) {
    return new Promise((resolve, reject) => {
      this._CommonService.getProcessByTimeService(tiempo)
    })
  };

  



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

  startAnimationForBarChart(chart) {
    var seq2, delays2, durations2;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
  changeColor(numero) {
    if (numero >= 0 && numero <= 15) {
      return "green"
    } else if (numero > 15 && numero <= 50) {
      return "yellow"
    } else if (numero > 50) {
      return "red"
    }
  }

  onSelectDate(hours) {
    this.getProcessByTime(hours).then(
      (response) =>  {
        this.procesarProc(response);
        this.indicadores1[0].titulo ="Últimas " + hours+ " horas";
        this.indicadores1[1].titulo = "Documentos Generados últimas " + hours+ " horas";
        this.indicadores1[2].titulo = "Últimas " + hours+ " horas";
      }
    );

  }

   count(elements) {
    var array_elements = elements;

    array_elements.sort();
    var array=[[],[]];
    var current = null;
    var cnt = 0;
    var position = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                array[position]=[current,cnt];
                position++;
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
      array[position]=[current,cnt];
    }
    return array;
}
  ngAfterViewInit() {
    var breakCards = true;
    if (breakCards == true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(function () {
        var $fix_button = $(this);
        var $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(function () {
          var $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(function () {
          var $this = $(this);
          var hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr("data-count", hover_count);
          if (hover_count >= 20) {
            $(this).children('.card-header, .card-image').addClass('hinge animated');
          }
        });
      });
    }
    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();
  }
}
