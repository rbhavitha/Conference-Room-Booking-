import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AdminComponent} from '../app/admin/admin.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  locationapiserver:string="http://localhost:49796/api/locations";
JoinMultpleTableapiserver:string="http://localhost:49796/api/joinmultipletable";
confirmbookingapiserver:string="http://localhost:49796/api/confirmbooking";
bookingapiserver:string="http://localhost:49796/api/bookings";
ownerapiserve:string="http://localhost:49796/api/owners";
departmentapiserver:string="http://localhost:49796/api/departments";
roomtypeapiserver:string="http://localhost:49796/api/roomtypes";
adminreportapiserver:string="http://localhost:49796/api/AdminReport";

  constructor(private httpClient: HttpClient) {
    console.log('service created');
   }
    LoggedIn: boolean=false;
   
   user_id="";
   user_name="";
   booking_id="";
  
  getInfo()
  {
    
    const info = [
      { idd: 8 ,name: "susdfbbu" },
      { idd: 9, name: "harsduu" },
      { idd: 99, name: "seecvcvnuu" },
      { idd: 978, name: "ramsdfu" },
      { idd: 545, name: "tejccca" },
    ];
    return info;
  }
  getUsers()
  {
    return  this.httpClient.get('http://localhost:49796/api/Users');
  }
  postData(body:any)
  {
    return this.httpClient.post('http://localhost:49796/api/Login',body);

  }
  
  public getlocations():Observable<any>
  { 
    return (this.httpClient.get(this.locationapiserver));
  }
  
  
  public getJoinMultpleTables():Observable<any>{
    return(this.httpClient.get(this.JoinMultpleTableapiserver));
  }
  public postbooking(body){
    return(this.httpClient.post("http://localhost:49796/api/bookings",body));
  }
  public getconfirmbooking(){
    return(this.httpClient.get(this.confirmbookingapiserver));
  }
  public getbooking()
  {
    return (this.httpClient.get(this.confirmbookingapiserver));
  }
  public getowner()
  {
    return (this.httpClient.get(this.ownerapiserve));
  }
  public  getdepartments():Observable<any>
 {
   return(this.httpClient.get(this.departmentapiserver))
 }
 public getRoomTypes():Observable<any>
 {
   return(this.httpClient.get(this.roomtypeapiserver))
 }
 public getAdminReport():Observable<any>
 {
  return (this.httpClient.get(this.adminreportapiserver));
 }

}

