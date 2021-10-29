import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService) {
  }
  canActivate() {
    if (this.apiService.LoggedIn) {
      return true;
    } else {
      window.alert('Permission denied for this page');
      return false;
    }
  }
}
