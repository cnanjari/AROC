import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost:8080//';
    public ApiUrl = 'api-monitor-ar/';
    public Process = "process/";
    public Document = "document/";
}