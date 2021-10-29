import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../api.service';
import {CommonModule} from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  public table: any=[];
  public table1: any=[];
  location:any=[];
  booking:any=[];
  sampleform: FormGroup;
  book:any=[];
  picker;
  startdate;
  enddate;
  select:any=[];
  loc:any=[];
  add:any=[];
  roomStatus: boolean = false;
  constructor(private s1:ApiService,fb: FormBuilder,private _activatedRoute: ActivatedRoute, private _router: Router) { 
    this. sampleform = fb.group({  
      'location_name': [null]   // will use the property in html page  
     });
    }
   
    user_name="";
    onBookButtonClick(): void{
      this._router.navigate(['/bookingdetails'])
    }

    ngOnInit(): void {
      this.s1.getlocations().subscribe((data1:{})=>{
        this.location=data1});
      this.s1.getJoinMultpleTables().subscribe((data:{})=>{
        this.book=data;
      this.table=data;
    this.table1=data;
    (this.table).forEach(element => {
      element.status = "available";
     }); 
  
  });
  this.s1.getbooking().subscribe((data2:{})=>{
    this.booking=data2
  });
  this.user_name=this.s1.user_name;
  // console.log(this.user_name);
  
  }
  value:any;
   SelectLocation(value){
      if(value=="0")
      {
        this.table=this.table1;
      }
     
     else
    {
      this.table = this.table1.filter((item) => (item.location_name == value));     
    }  
}
onSelectionChange(entry) {
  
  this.select = Object.assign({}, this.select, entry);
  console.log(this.select);
  if (this.select.status == true || this.select.status == "available")
  {
    this.roomStatus=true;
  }
  else {
    this.roomStatus = false;
  }
}
onbooks(event)
{
  var body={
	 
    "start_date": this.startdate,
    "end_date": this.enddate,
    "user_id": this.s1.user_id,
    "room_id": this.select.room_id
   
  };
  console.log(this.select.room_id)
  console.log(body)
 
  this.s1.postbooking(body).subscribe((data)=>{
    console.log(data["booking_id"])
    console.log(this.picker)
    this.s1.booking_id=data["booking_id"]});
}
selectedStartDate: Date = new Date();
selectedEndDate: Date = new Date();

getstartDate(date){
    this.startdate = moment(date).format("YYYY-MM-DD");
    console.log(this.startdate);
}
getendDate(date)
{
    this.enddate = moment(date).format("YYYY-MM-DD");
    console.log(this.enddate);

    for(var i=0;i<(this.table.length);i++)
    {
       this.loc[i]=this.table[i].location_address;
      this.add[i]=this.table[i].room_type_name;

    }

    this.filterByDate();
    console.log(this.table)
}
filterByDate()
{
        (this.table).forEach((element,index)=> {
 
    let commonRoomsList = this.booking.filter(room => (room.room_id) == (element.room_id))
   
    console.log("list for",index,commonRoomsList);
    
    if (commonRoomsList.length != 0)
    {
        for (let room of commonRoomsList) {
            var bkStartDate = moment(room.start_date);
        var bkEndDate = moment(room.end_date);
        console.log(bkStartDate.format("DD-MM-YYYY"));
        console.log(bkEndDate.format("DD-MM-YYYY"));


        if ((moment(this.selectedStartDate).isBetween(bkStartDate, bkEndDate, undefined, '[]')) || (moment(this.selectedEndDate).isBetween(bkStartDate, bkEndDate ,undefined, '[]')))
        {
          console.log("inside if");
          
          element["status"] = "unavailable";
          break;
        }
        else
        {
          element.status = "available"
          }

          
        }
   } 
});
}
element:any=[];
onselect(event)
{
  this.element=event;
  var popup = document.getElementById("myPopup");
   popup.classList.toggle("show");

}
}
   


  
