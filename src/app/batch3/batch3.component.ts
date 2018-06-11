import { TableData } from '../md/md-table/md-table.component';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2'

declare var $:any;
@Component({
    selector: 'batch2-cmp',
    templateUrl: 'batch3.component.html'
})

export class Batch3Component implements OnInit{
     showSwal(type){
        if(type == 'basic'){
          swal({
                title: "Here's a message!",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
            });

      }else if(type == 'title-and-text'){
          swal({
                title: "Here's a message!",
                text: "It's pretty, isn't it?",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-info"
            });

      }else if(type == 'success-message'){
          swal({
                type: "success",
                title: "Muy bien",
                text: "Se subieron los archivos correctamente.El id d peticion es el #1565165498",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success"
                

            });

      }else if(type == 'warning-message'){
            swal({
                    title: 'No se pudo subir archivo',
                    text: "¿Desea intentar nuevamente?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Reintentar!',
                    buttonsStyling: false
                }).then(function() {
                  swal({
                    title: 'Muy Bien!',
                    text: 'Se ha subido el achivo correctamnte. El id d peticion es el #1565165498',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                    })
                });
      }else if(type == 'warning-message-and-confirmation'){
            swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    confirmButtonText: 'Yes, delete it!',
                    buttonsStyling: false
                }).then(function() {
                  swal({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                    })
                });
      }else if(type == 'warning-message-and-cancel'){
            swal({
                    title: 'Lo sentimos no se pudo cargar el archivo',
                    text: 'Intente nuevamente',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, keep it',
                    confirmButtonClass: "btn btn-success",
                    cancelButtonClass: "btn btn-danger",
                    buttonsStyling: false
                }).then(function() {
                  swal({
                    title: 'Deleted!',
                    text: 'Your imaginary file has been deleted.',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                    })
                }, function(dismiss) {
                  // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                  if (dismiss === 'cancel') {
                    swal({
                      title: 'Cancelled',
                      text: 'Your imaginary file is safe :)',
                      type: 'error',
                      confirmButtonClass: "btn btn-info",
                      buttonsStyling: false
                    })
                  }
                })

      }else if(type == 'custom-html'){
          swal({
                title: 'HTML example',
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                html:
                        'You can use <b>bold text</b>, ' +
                        '<a href="http://github.com">links</a> ' +
                        'and other HTML tags'
                });

      }else if(type == 'auto-close'){
          swal({ title: "Auto close alert!",
                 text: "I will close in 2 seconds.",
                 timer: 2000,
                 showConfirmButton: false
                });
      } else if(type == 'input-field'){
            swal({
                    title: 'Input something',
                    html: '<div class="form-group">' +
                              '<input id="input-field" type="text" class="form-control" />' +
                          '</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function(result) {
                    swal({
                        type: 'success',
                        html: 'You entered: <strong>' +
                                $('#input-field').val() +
                              '</strong>',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false

                    })
                }).catch(swal.noop)
        }
    }
    public ngOnInit(){
    
    
    }
}
