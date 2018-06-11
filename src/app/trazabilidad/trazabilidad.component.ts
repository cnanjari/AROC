import { TableData } from '../md/md-table/md-table.component';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'
declare interface Task {
  id: string;
  proceso: string;
  fecha_inicio: string;
  feha_fin: string;
  porcentaje: number;
  cantidad_doc: number;
  estado: number;// 1: en ejecucion, 2 terminado sin errores, 3 : terminado on errores
  cerror: number;
}
declare interface Logs {
  id: string;
  log: string;
}

@Component({
    selector: 'batch2-cmp',
    templateUrl: 'trazabilidad.component.html'
})



export class TrazabilidadComponent implements OnInit{
  
  public solicitudes: Task[];
  public logs: Logs[];
  public log: Logs[];
  public logSeleccionado: Logs;
  public id: string;
  getbyId: Function;
  showSwal: Function;
  ngOnInit(){
   
         this.solicitudes = [
            {id: "F1436549n"    , proceso: "Documento A",  fecha_inicio: "26-05-2017 22:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 15 , cantidad_doc:25665   ,estado: 3, cerror:5},
            {id: "F5146516549n" , proceso: "Documento A",  fecha_inicio: "26-05-2017 14:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 22 , cantidad_doc:150315  ,estado: 3, cerror:50 },
            {id: "D516512255"   , proceso: "Documento A",  fecha_inicio: "26-05-2017 9:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 65 , cantidad_doc:251651  ,estado: 3, cerror:230 },
            {id: "R14648621"    , proceso: "Documento A",  fecha_inicio: "26-05-2017 8:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 90 , cantidad_doc:2815120 ,estado: 3, cerror:25},
            {id: "F51651432"    , proceso: "Documento A",  fecha_inicio: "26-05-2017 7:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 25 , cantidad_doc:2165120 ,estado: 3, cerror:33},
            {id: "F14365495n"   , proceso: "Documento A",  fecha_inicio: "26-05-2017 22:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 15 , cantidad_doc:25665   ,estado: 3, cerror:258},
            {id: "F5146515549n" , proceso: "Elemento A",  fecha_inicio: "26-05-2017 14:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 22 , cantidad_doc:150315  ,estado: 3, cerror:540 },
            {id: "D516512055"   , proceso: "Elemento A",  fecha_inicio: "26-05-2017 9:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 65 , cantidad_doc:251651  ,estado: 3, cerror:340 },
            {id: "R14648651"    , proceso: "Elemento A",  fecha_inicio: "26-05-2017 8:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 90 , cantidad_doc:2815120 ,estado: 3, cerror:560},
            {id: "F51651472"    , proceso: "Elemento A",  fecha_inicio: "26-05-2017 7:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 25 , cantidad_doc:2165120 ,estado: 3, cerror:980},
            {id: "F143654sn"    , proceso: "Elemento A",  fecha_inicio: "26-05-2017 22:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 15 , cantidad_doc:25665   ,estado: 3, cerror:40},
            {id: "F5146516s549n", proceso: "Documento B",  fecha_inicio: "26-05-2017 14:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 22 , cantidad_doc:150315  ,estado: 3, cerror:20 },
            {id: "D5165122s55"  , proceso: "Documento B",  fecha_inicio: "26-05-2017 9:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 65 , cantidad_doc:251651  ,estado: 3, cerror:2 },
            {id: "R146486s21"   , proceso: "Documento B",  fecha_inicio: "26-05-2017 8:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 90 , cantidad_doc:2815120 ,estado: 3, cerror:89},
            {id: "F516514s32"   , proceso: "Documento B",  fecha_inicio: "26-05-2017 7:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 25 , cantidad_doc:2165120 ,estado: 3, cerror:23},
            {id: "F14365s49n"   , proceso: "Documento C",  fecha_inicio: "26-05-2017 22:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 15 , cantidad_doc:25665   ,estado: 3, cerror:44},
            {id: "F5146s516549n", proceso: "Documento C",  fecha_inicio: "26-05-2017 14:35:55",feha_fin: "26-05-2017 22:35:55",porcentaje: 22 , cantidad_doc:150315  ,estado: 3, cerror:55},
            {id: "D516s512255"  , proceso: "Documento C",  fecha_inicio: "26-05-2017 9:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 65 , cantidad_doc:251651  ,estado: 3, cerror:78},
            {id: "R14s648621"   , proceso: "Documento C",  fecha_inicio: "26-05-2017 8:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 90 , cantidad_doc:2815120 ,estado: 3, cerror:89},
            {id: "F5s1651432"   , proceso: "Documento C",  fecha_inicio: "26-05-2017 7:35:55", feha_fin: "26-05-2017 22:35:55",porcentaje: 25 , cantidad_doc:2165120 ,estado: 3, cerror:56},
         ];
      var logs = [
            {id: "F1436549n",    
          log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "F5146516549n", log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`}, 
            {id: "D516512255",   log:`ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "R14648621",    log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "F51651432",    log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "F14365495n",   log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "F5146515549n", log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "D516512055",   log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "R14648651",    log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "F51651472",    log: `ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (74,12): Property 'getbyId' does not exist on type 'SolicitudesTerminadasComponent'.
ERROR in /Volumes/D/cristophernan/Documents/Altiuz Report/altiuz-report/src/app/solicitudes-terminadas/solicitudes-terminadas.component.ts (78,7): Cannot find name 'swal'.

webpack: Failed to compile.
webpack: Compiling...
Date: 2017-11-29T18:05:39.380Z                                                n Hash: 1db8c78962d9acac3b70
Time: 1103ms
chunk {batch.module} batch.module.chunk.js, batch.module.chunk.js.map () 10.3 kB {main} 
chunk {batch2.module} batch2.module.chunk.js, batch2.module.chunk.js.map () 8.22 kB {main} 
chunk {batch3.module} batch3.module.chunk.js, batch3.module.chunk.js.map () 13.7 kB {main} 
chunk {charts.module} charts.module.chunk.js, charts.module.chunk.js.map () 19.4 kB {main} 
chunk {common} common.chunk.js, common.chunk.js.map (common) 1.17 MB {main} 
chunk {components.module} components.module.chunk.js, components.module.chunk.js.map () 113 kB {main} 
chunk {dashboard.module} dashboard.module.chunk.js, dashboard.module.chunk.js.map () 25.1 kB {main} 
chunk {inline} inline.bundle.js, inline.bundle.js.map (inline) 5.83 kB [entry]
chunk {main} main.bundle.js, main.bundle.js.map (main) 57.6 kB {vendor} [initial]
chunk {pages.module} pages.module.chunk.js, pages.module.chunk.js.map () 39.2 kB {main} 
chunk {polyfills} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 364 kB {inline} [initial]
chunk {solicitudes-activas.module} solicitudes-activas.module.chunk.js, solicitudes-activas.module.chunk.js.map () 21.5 kB {main} 
chunk {solicitudes-terminadas.module} solicitudes-terminadas.module.chunk.js, solicitudes-terminadas.module.chunk.js.map () 21.5 kB {main}  [rendered]
chunk {styles} styles.bundle.js, styles.bundle.js.map (styles) 506 kB {inline} [initial]
chunk {tables.module} tables.module.chunk.js, tables.module.chunk.js.map () 40.4 kB {main} 
chunk {timeline.module} timeline.module.chunk.js, timeline.module.chunk.js.map () 11.5 kB {main} 
chunk {trazabilidad.module} trazabilidad.module.chunk.js, trazabilidad.module.chunk.js.map () 67 kB {main} 
chunk {user.module} user.module.chunk.js, user.module.chunk.js.map () 14.4 kB {main} 
chunk {vendor} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.91 MB [initial]
chunk {widgets.module} widgets.module.chunk.js, widgets.module.chunk.js.map () 25.6 kB {main}

webpack: Compiled successfully.`},
            {id: "F143654sn",    log:"116% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "F5146516s549n",log:"126% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "D5165122s55",  log:"136% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "R146486s21",   log:"146% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "F516514s32",   log:"156% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "F14365s49n",   log:"166% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "F5146s516549n",log:"176% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "D516s512255",  log:"186% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "R14s648621",   log:"196% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   },
            {id: "F5s1651432",   log:"206% building modules 221/257       Hash: fde64d7ece96080a057b<br/>remote:        Time: 49708ms<br/>remote:        chunk {0} 0.ba4786c2c8cf07893ccd.chunk.js (common) 39.7 kB {17}  [rendered]<br/>remote:        chunk {1} 1.4a29f94de41404a310da.chunk.js () 72 kB {17}  [rendered]<br/>remote:        chunk {2} 2.36a178b8ce863bdf9f3c.chunk.js () 40.8 kB {17}  [rendered]<br/>remote:        chunk {3} 3.a273995e287ab947f885.chunk.js () 16.7 kB {17}  [rendered]<br/>remote:        chunk {4} 4.9f2b32223ef61979652c.chunk.js () 10.8 kB {17}  [rendered]<br/>remote:        chunk {5} 5.a6a846094dc56755c332.chunk.js () 13.5 kB {17}  [rendered]<br/>remote:        chunk {6} 6.950e0e21bd0cc7d94c17.chunk.js () 57 kB {17}  [rendered]<br/>remote:        chunk {7} 7.0c908012dd2d0971905c.chunk.js () 12.4 kB {17}  [rendered]<br/>remote:        chunk {8} 8.f79f28253922ee5a6049.chunk.js () 11.3 kB {17}  [rendered]<br/>remote:        chunk {9} 9.cd4f478d63852ce5e1c3.chunk.js () 56.8 kB {17}  [rendered]<br/>remote:        chunk {10} 10.4c8de6a539c5eb5fcd41.chunk.js () 28.2 kB {17}  [rendered]<br/>remote:        chunk {11} 11.7af58a737c2634bbc88c.chunk.js () 182 kB {17}  [rendered]<br/>remote:        chunk {12} 12.07f77ed7fb6938c299dc.chunk.js () 16.5 kB {17}  [rendered]<br/>remote:        chunk {13} 13.040b3c764f2a69bf169c.chunk.js () 7.23 kB {17}  [rendered]<br/>remote:        chunk {14} 14.a851ee3ce7a63d8cc8ab.chunk.js () 14.9 kB {17}  [rendered]<br/>remote:        chunk {15} polyfills.05eb72cc35d2df6a8da6.bundle.js (polyfills) 144 kB {19} [initial] [rendered]<br/>remote:        chunk {16} styles.f515ffd434de2f5ac3be.bundle.css (styles) 366 kB {19} [initial] [rendered]<br/>remote:        chunk {17} main.e1ccbe793ce74255ab67.bundle.js (main) 28 kB {18} [initial] [rendered]<br/>remote:        chunk {18} vendor.9ef59cad80edf728f403.bundle.js (vendor) 398 kB [initial] [rendered]<br/>remote:        chunk {19} inline.57f2f8f180f0371a870e.bundle.js (inline) 1.83 kB [entry] [rendered]<br/>remote:        up to date in 61.957s<br/>remote: <br/>remote: -----> Caching build<br/>remote:        Clearing previous node cache<br/>remote:        Saving 2 cacheDirectories (default):<br/>remote:        - node_modules<br/>remote:        - bower_components (nothing to cache)<br/>remote: <br/>remote: -----> Build succeeded!<br/>remote: -----> Discovering process types<br/>remote:        Procfile declares types     -> (none)<br/>remote:        Default types for buildpack -> web<br/>remote: <br/>remote: -----> Compressing...<br/>remote:        Done: 98.5M<br/>remote: -----> Launching...<br/>remote:        Released v89<br/>remote:        https://altiuz-report.herokuapp.com/ deployed to Heroku"   }
         ];
    this.getbyId= function (id){
     
      this.logSeleccionado = logs.filter(x => x.id === id);
      console.log(this.logSeleccionado);
      swal({
                title: 'Log de Incidencia',
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                html:
                        "<textarea rows='10' cols='80' class='form-control' id='txtLog' disabled>"+
                        this.logSeleccionado[0].log+
                        "</textarea>"
                        
                });
    
    }
    
  } 
}
