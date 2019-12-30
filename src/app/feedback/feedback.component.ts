import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal, { default as swal } from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  submitted = false;
  data
  get f() { return this.feedbackform.controls; }
  ngOnInit() {
    this.feedbackform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailid: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required,],
      age: ['', [Validators.required, Validators.minLength(2)]],
      Phoneno: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      passwd: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required]
    });
  }

  feedbackform: FormGroup = new FormGroup({
    'name': new FormControl(""),
    'emailid': new FormControl(""),
    'address': new FormControl(""),
    'age': new FormControl(""),
    'Phoneno': new FormControl(""),
    'passwd': new FormControl(""),
    'gender': new FormControl(""),
  });


  // submiting form data
  save() {
    this.submitted = true;

    if (this.feedbackform.valid) {
      let data = {
        "bkname": this.feedbackform.value.name,
        "bkemailid": this.feedbackform.value.emailid,
        "bkaddress": this.feedbackform.value.address,
        "bkage": this.feedbackform.value.age,
        "bkrollnumber": this.feedbackform.value.Phoneno,
        "bkpasswd": this.feedbackform.value.passwd,
        "bkgender": this.feedbackform.value.gender,
      };

      this.data = data
      localStorage.setItem("feedbackData", JSON.stringify(this.data));  //to store user data in local storage
      Swal.fire(
        'Submitted',
        'Data Sucessfully stored in Localstorage With Key "feedbackData" ',
        'success')
    }
    else {
      this.validForm(this.feedbackform);
    }
  }

  Reset() {
    Swal.fire({
      title: 'Conform!',
      text: 'Are you sure to Reset',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reset it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.feedbackform.reset();
        this.submitted = false;
        this.data = 0;
        Swal.fire(
          'Cleared',
          'Form reset success.',
          'success')
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Form reset cancelled',
          'error')
      }
    })
  }

  Validate() {
    this.submitted = true;
  }

  // validation for form 
  validForm(formGroup: FormGroup) {
    !Object.keys(formGroup.controls)
      .map(controlName => formGroup.controls[controlName])
      .filter(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
        return !control.valid;
      });
  }


}
