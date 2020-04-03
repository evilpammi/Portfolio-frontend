import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
// import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    public token: string;
    MSG_NETWORK_ERROR: string = "Failed to connect service.";
    private baseUrl: string; 
    result:any;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        // private http: Http,
        private http: HttpClient,
        // private loaderService: LoaderService,
        private router: Router) {
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.baseUrl = environment.frontend_api_path;
    }

    // getAllUser() {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'GET';
    //     var url = this.baseUrl + '/user/getall';
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 this.refreshToken(JSON.parse(request.responseText).token);
    //                 return request.responseText;
    //             } else {
    //                 this.popToast("error", "Error!", JSON.parse(request.responseText).data);
    //             }
    //         };
    //         request.send();
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // getAll(){
    //     this.http.get(this.baseUrl + "/user/getall",this.httpOptions).map(function(res){
    //         this.result = res;
    //         if(this.result.isPass){
    //             console.log(this.result);
    //             return this.result;
    //         }
    //     });
    // }

    getAll(){
        // let token = this.getToken();
        // let order = { token };
        // let body = JSON.stringify(order);
        return this.http.get(this.baseUrl + "/user/getall", this.httpOptions).map(function(res){
            this.result = res;
            if(this.result.isPass){
                return this.result;
            }
        });
    }

    createUser(user_name: string, user_password: string, user_fname : string, user_lname : string, user_email : string, role_id : string, user_status : string) {
        // let headers = new Headers(); 
        // headers.append('Content-Type', 'application/json; charset=UTF-8');
        let order = { user_name, user_password, user_fname, user_lname, user_email, role_id, user_status };
        let body = JSON.stringify(order);
        return this.http.post(this.baseUrl + "/user/create",body).map(function(res){
            this.result = res;
            if(this.result.isPass){
                return this.result;
            }
        });
    }

    // getUser(id: number) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'GET';
    //     var url = this.baseUrl + '/user/get_user?id=' + id + '&token=' + this.getToken();
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 this.refreshToken(JSON.parse(request.responseText).token);
    //                 return request.responseText;
    //             } else {
    //                 this.popToast("error", "Error!", JSON.parse(request.responseText).data);
    //             }
    //         };
    //         request.send();
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    

    // getAllUserByPage(page_index: number, page_size: number, order_by: string, order_src: string) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'GET';
    //     var url = this.baseUrl + '/user/search_all_user_by_page?page_index=' + page_index + '&page_size=' + page_size + '&order_by=' + order_by + '&order_src=' + order_src + '&token=' + this.getToken();
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 this.refreshToken(JSON.parse(request.responseText).token);
    //                 return request.responseText;
    //             } else {
    //                 this.popToast("error", "Error!", JSON.parse(request.responseText).data);
    //             }
    //         };
    //         request.send();
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // createUser(user_name: string, user_password: string, user_firstname: string, user_lastname: string, user_email: string) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'PUT';
    //     var url = this.baseUrl + '/user/create_user?user_name=' + user_name +
    //         '&user_password=' + user_password +
    //         '&user_firstname=' + user_firstname +
    //         '&user_lastname=' + user_lastname +
    //         '&user_email=' + user_email +
    //         '&token=' + this.getToken();
    //     var json = {
    //         "user_name": user_name,
    //         "user_password": user_password,
    //         "user_firstname": user_firstname,
    //         "user_lastname": user_lastname,
    //         "user_email": user_email,
    //         "token": this.getToken()
    //     }
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.setRequestHeader("Content-Type", "application/json");
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 this.refreshToken(JSON.parse(request.responseText).token);
    //                 return request.responseText;
    //             } else {
    //                 this.popToast("error", "Error!", JSON.parse(request.responseText).message);
    //             }
    //         };
    //         request.send(JSON.stringify(json));
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // updateUser(user_id: number, user_firstname: string, user_lastname: string, user_email: string, old_pass: string, new_pass: string) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'POST';
    //     var url = this.baseUrl + '/user/update_user';
    //     var json = {
    //         "id": user_id,
    //         "user_firstname": user_firstname,
    //         "user_lastname": user_lastname,
    //         "user_email": user_email,
    //         "old_pass": old_pass,
    //         "new_pass": new_pass,
    //         "token": this.getToken()
    //     }
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.setRequestHeader("Content-Type", "application/json");
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 this.refreshToken(JSON.parse(request.responseText).token);
    //                 return request.responseText;
    //             } else {
    //                 return request.responseText;
    //             }
    //         };
    //         request.send(JSON.stringify(json));
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // deleteUser(user_id: number) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'DELETE';
    //     var url = this.baseUrl + '/user/delete_user';
    //     var json = {
    //         "id": user_id,
    //         "token": this.getToken()
    //     }
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.setRequestHeader("Content-Type", "application/json");
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 this.refreshToken(JSON.parse(request.responseText).token);
    //                 return request.responseText;
    //             } else {
    //                 this.popToast("error", "Error!", JSON.parse(request.responseText).message);
    //             }
    //         };
    //         request.send(JSON.stringify(json));
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // checkForgotPassword(user: string) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'GET';
    //     var url = this.baseUrl + '/user/check_forgot_password?user=' + user;
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 return request.responseText;
    //             } else {
    //                 return request.responseText;
    //             }
    //         };
    //         request.send();
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // forgotPassword(user_id: number, new_pass: string, token: string) {
    //     // this.loaderService.display(true);
    //     var request = new XMLHttpRequest();
    //     var method = 'GET';
    //     var url = this.baseUrl + '/user/forgot_password?id=' + user_id + '&new_pass=' + new_pass + '&token=' + token;
    //     var async = false;
    //     try {
    //         request.open(method, url, async);
    //         request.onreadystatechange = () => {
    //             if (request.readyState == 4 && request.status == 200) {
    //                 return request.responseText;
    //             } else {
    //                 return request.responseText;
    //             }
    //         };
    //         request.send();
    //     } catch (error) {
    //         this.popToast("error", "Error!", this.MSG_NETWORK_ERROR);
    //     }

    //     // this.loaderService.display(false);
    //     return request.responseText;
    // }

    // private popToast(type, title, text) {
    //     if (text == "Token error : jwt expired") {
    //         localStorage.removeItem('currentUser');
    //         this.router.navigate(["/login"]);
    //     } else {
    //         var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //         if (currentUser != null) {
    //             if (currentUser.token != undefined) {
    //                 var toast: Toast = {
    //                     type: type,
    //                     title: title,
    //                     body: text.replace("jwt", "")
    //                 };
    //                 this.toasterService.pop(toast);
    //             }
    //         } else {
    //             this.router.navigate(["/login"]);
    //         }
    //     }
    // }

    // private getToken() {
    //     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser == null || localStorage.getItem('currentUser') == "{}") {
    //         return '';
    //     } else {
    //         return currentUser.token;
    //     }
    // }

    // private refreshToken(new_token) {
    //     if (this.getToken() != '') {
    //         var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //         currentUser.token = new_token;
    //         localStorage.setItem('currentUser', JSON.stringify(currentUser));
    //     }
    // }
}