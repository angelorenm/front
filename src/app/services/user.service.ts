import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public token;
  public identity;
  
  constructor(
    private _http : HttpClient


  ) { 
    this.url = GLOBAL.url;
  }

  registrar(user):Observable<any>{
    var obj = {
       nombre: user.nombre,
       email: user.email,
       password: user.password, 
    }

    //console.log(user);

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'registrar',obj,{headers:headers});
  }

  login(user, gettoken = null):Observable<any>{
    
    console.log(user);
    
    let json = user;
    if(gettoken != null){
      user.gettoken = true;
    }

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'login',json, {headers:headers});

  }

  get_users(){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'usuarios',{headers:headers});  
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;

    }else{
      this.token = null;
    }
    return this.token;
  }

  getIdentity(){

    let identity = localStorage.getItem('identity');
    if(identity){
      this.identity = identity;

    }else{
      this.identity = null;
    }
    return this.identity;

  }

}
