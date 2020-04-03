import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class RoleService {
    public token: string;
    MSG_NETWORK_ERROR: string = "Failed to connect service.";
    private baseUrl: string; 
    result:any;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient) {
        this.baseUrl = environment.frontend_api_path;
    }


    getAll(){
        return this.http.get(this.baseUrl + "/role/getall", this.httpOptions).map(function(res){
            this.result = res;
            if(this.result.isPass){
                return this.result;
            }
        });
    }

    
}