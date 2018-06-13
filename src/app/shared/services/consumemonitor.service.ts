import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ParameterService } from "./parameter.service";

@Injectable()
export class CommonService {
  // Variables

  resourceProcess: string = "/api-monitor-ar/process/";
  resourceProcessByTime: string = "/api-monitor-ar/process/last/";
  resourcedocuments: string = "/api-monitor-ar/document/";
  resourceProcessStatus: string = "/api-monitor-ar/process/status/";
  
  
  constructor(private http: HttpClient, private _parameter: ParameterService) {}
 

  // Mantenedor usuarios
  getProcessService() {
   
      let url = this._parameter.getEndPoint() + this.resourceProcess;
      this.http.get(url)
        .toPromise()
        .then(
          res => { // Success
            console.log(res);
            return res;
          },
          msg => { // Error
          console.error(msg);
          return msg;
          }
        );
  }
  getProcessStatusService(status:number) {
    let url = this._parameter.getEndPoint() + this.resourceProcessStatus+status;
    console.log(url);
    return this.http.get(url).subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }
  getProcessByTimeService(time) {
    console.log(this._parameter.getEndPoint());

    let url = this._parameter.getEndPoint() + this.resourceProcessByTime + time;
    return this.http.get(url).subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }
  getDocumentsService( process: string) {
    let url = this._parameter.getEndPoint() + this.resourcedocuments + process;
    console.log("url documentos: "+url);
    return this.http.get(url).subscribe(
      data => {
        return data;
      },
      error => console.log(error)
    );
  }




}
