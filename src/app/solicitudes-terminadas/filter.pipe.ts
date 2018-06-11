import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerEmailFilter'
})
@Injectable()
export class CustomerEmailFilter implements PipeTransform {
  transform(proceso: any, args: any): any[] {
    try {
       return proceso.filter(function(row){ 
                    return (row.idProceso.toLowerCase().indexOf(args.toLowerCase())  !== -1)
                }); //end of filter
    }
    catch(err) {
      console.log(err);
      return proceso;
    }
   
  }
}
