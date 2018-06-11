import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';
@Pipe({
  name: 'customerEmailFilter'
})
@Injectable()
export class CustomerEmailFilter implements PipeTransform {
  transform(procesos, args: any): any[] {
    try {
      return procesos.proc.filter(function(row){ 
                    return (row.idProceso.toLowerCase().indexOf(args.toLowerCase())  !== -1)
                }); //end of filter
    }
    catch(err) {
      console.log(err);
      return procesos;
    }
   
  }
}
