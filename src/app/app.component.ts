import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any; 
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit{
    constructor(private elRef:ElementRef) {}
    ngOnInit(){
        let body = document.getElementsByTagName('body')[0];
        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        
            body.classList.add("perfect-scrollbar-off");
       
       // $.material.init();
    }
}
