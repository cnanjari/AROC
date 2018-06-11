import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';
@Pipe({
  name: 'customerEmailFilter'
})
@Injectable()
export class CustomerEmailFilter implements PipeTransform {
  transform(solicitudes: Task[], args: any): any[] {
    try {
     return solicitudes.filter(function(row){ 
                    return (row.id.toLowerCase().indexOf(args.toLowerCase())  !== -1|| row.proceso.toLowerCase().indexOf(args.toLowerCase())  !== -1)
                }); //end of filter
    }
    catch(err) {
      console.log(err);
      return solicitudes;
    }
   
  }
}
