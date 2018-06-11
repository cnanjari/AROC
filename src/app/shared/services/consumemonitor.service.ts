import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ParameterService } from "./parameter.service";

@Injectable()
export class CommonService {
  // Variables

  resourceProcess: string = "/api-monitor-ar/process/";
  resourceProcessByTime: string = "/api-monitor-ar/process/last/";
  resourcedocuments: string = "/api-monitor-ar/document/";
  resourceProcessStatus: string = "/api-monitor-ar/process/status/";

  constructor(private http: Http, private _parameter: ParameterService) {}

  // Mantenedor usuarios
  getProcessService() {
    let url = this._parameter.getEndPoint() + this.resourceProcess;
    return this.http.get(url).map(
      res => {
        return res;
      },
      error => console.log(error)
    );
  
  }
  getProcessStatusService(status:number) {
    let url = this._parameter.getEndPoint() + this.resourceProcessStatus+status;
    console.log(url);
    return this.http.get(url).map(
      res => {
        return res;
      },
      error => console.log(error)
    );
  }
  getProcessByTimeService(time) {
    let url = this._parameter.getEndPoint() + this.resourceProcessByTime + time;
    return this.http.get(url).map(
      res => {
        return res;
      },
      error => console.log(error)
    );
  }
  getDocumentsService( process: string) {
    let url = this._parameter.getEndPoint() + this.resourcedocuments + process;
    console.log("url documentos: "+url);
    return this.http.get(url).map(
      res => {
        return res;
      },
      error => console.log(error)
    );
  }




}
