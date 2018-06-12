import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

export interface Config {
  endpoint: string;
  endpointBackup: string;
}
@Injectable()
export class ParameterService {

  // Archivo de parametros
  configUrl = "../../../assets/config/parameter.json";
  config: Config;
  constructor( private http: HttpClient ) { }

  
  setEndPoint(value: string) {
    return sessionStorage.setItem("endpoint", value);
  }

  getEndPoint() {
    this.getValues();
    return sessionStorage.getItem("endpoint");
  }

  // Metodo de obtencion de datos desde .json
  getParameters() {
    
    return this.http.get<Config>(this.configUrl);
  }

  // Se guardan datos en sessionStorage
  getValues() {
      
       this.getParameters()
          .subscribe( data => {
            console.log("obtiene los parametros");
            console.log(data);
            this.setEndPoint(data.endpoint);
            }
          );
  }

}
