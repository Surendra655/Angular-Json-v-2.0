import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _Router: Router) { }

  ngOnInit() {
  }



  loginFrm = new FormGroup({
    "userID": new FormControl("", [Validators.required]),
    "pass": new FormControl("", [Validators.required]),
  })

  validate() {
    if (this.loginFrm.value.userID.trim() === "" || this.loginFrm.value.pass.trim() === "") {

      this.loginFrm.controls.userID.markAsTouched();
      this.loginFrm.controls.pass.markAsTouched();
    }
    else {
      
      if (
        this.loginFrm.value.userID.trim() === "admin" &&
        this.loginFrm.value.pass.trim() === "admin"
      ) {
        sessionStorage.setItem("UDATA", JSON.stringify({ 'id': 'admin', 'password': 'admin' }))
        this._Router.navigate(['list']);
    
      }
      else {
        Swal.fire('Oops...', 'Invalid Credentials!', 'error')
    
      }
    }
  }
}
