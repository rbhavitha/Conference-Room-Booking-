import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
 
  User:any[];
  
  
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
     private _apiservice: ApiService ) { 
     
    }  
     
  
 
  ngOnInit(): void {
  }
  onSubmit(loginForm)
{
  console.log(loginForm);
  this._apiservice.postData(loginForm).subscribe(data => {
    console.log(data)
    if (data["status"] === "Success")
    {
      this._apiservice.LoggedIn=true;
      this._apiservice.user_id=loginForm.id;
      this._apiservice.user_name=data["message"];
      console.log("to be directed to next page")
      window.alert('Success ! Your login details has been entered successfully.');
      this._router.navigate(['/location'])
      window.alert(this._apiservice.user_name);     
    }
    else if(loginForm.id=="admin" && loginForm.password=="admin")
    {
      window.alert('Welcome to Admin Page!');
      this._router.navigate(['/admin']) 
    }
    
    
    else
    {
      console.log("display login again")
      if (window.confirm("Failed ! Your login details has not been entered correctly.Please try again.")) {
      }
      else (window.open("exit.html", "Thanks for Visiting!"));
      }
     
    }

  
    
  );

    

}

 
}