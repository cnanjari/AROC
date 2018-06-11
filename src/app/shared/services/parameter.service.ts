import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ParameterService {

  // Archivo de parametros
  parameterFile: string = "../../../assets/config/parameter.json";
  
  constructor( private http: Http ) { }

  // Métodos persistencia
  setEndPoint( value: string ) {
    sessionStorage.setItem("endpoint", value);
  }
  

  getEndPoint() {
    return sessionStorage.getItem("endpoint");
  }


  setEndPointBackUp( value: string ) {
    sessionStorage.setItem("endpointBackup", value);
  }

  getEndPointBackUp() {
    return sessionStorage.getItem("endpointBackup");
  }


  // Metodo de obtencion de datos desde .json
  getParameters() {
    return this.http.get( this.parameterFile )
        .map( res => {
          console.log(res);
          
            return res;
            
          },
          error => console.log(error)
      )
  }

  // Se guardan datos en sessionStorage
  getValues() {
      this.getParameters()
          .subscribe( data => {
              this.setEndPoint(data.json().endpoint);
              console.log(data.json().endpoint);
              this.setEndPointBackUp(data.json().endpointBackup);
            }
          );
  }

}
