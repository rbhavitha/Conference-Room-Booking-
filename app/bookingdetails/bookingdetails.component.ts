import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css']
})
export class BookingdetailsComponent implements OnInit {
  public table1: any=[];
  public table2: any=[];
  location:any=[];
  confirm:any=[];
  owner:any=[];
  sampleform: FormGroup;
  owner2: {};
  
  constructor(private s1:ApiService,fb:FormBuilder, public dialog: MatDialog) {
  this. sampleform = fb.group({  
    'location_name': [null]   // will use the property in html page  
   });
}
  OpenDialog(): void {
    let dialogRef = this.dialog.open( MyDialogComponent, {
    data: {
      myVar: "MY VAR"
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
 
  ngOnInit(): void {
  // console.log(this.s1.getlocations().subscribe((data1:{})=>{
      //this.location=data1}));
      this.s1.getconfirmbooking().subscribe((data2:{})=>{
        this.confirm=data2
        this.table1=data2
        this.table2=data2
        console.log(this.confirm)
  //console.log(this.confirm[0].user_id);
  
  this.table1 = this.confirm.filter((item) => (item.booking_id == this.s1.booking_id));


  console.log(this.table1)
  console.log(this.table1.room_id) });
  this.s1.getowner().subscribe((data3:{})=>{
    this.owner=data3
    this.owner2=data3;
    console.log(this.owner)
   

  })
       
}
  
}
