import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { UserRegister} from '../../../shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;


  constructor(private regServ  : RegisterService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6) ]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      passwordconfirm: ['',[Validators.required]],
      email: ['',[Validators.required , Validators.email]],
    },{

       validator: ConfirmedValidator('password', 'passwordconfirm')
     }
    );



  }

  ngOnInit(): void {}



  onSubmit() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    const email = this.form.value.email;
    const userData = {
      username:username,
      password:password,
      email:email,
      }

    this.regServ.register(userData).subscribe((res)=>{
      if(res.userId !=0 && res.userId !=null){
        alert('Usuario Creado')
      }
    },
    (err: HttpErrorResponse)=> {
      console.log(err.status)
      if (err.error instanceof Error) {
        console.log("Client-side error");
        console.log(err);
      }
      else {
        console.log(err.error.message);
      }
    },

    )
    }














}
export function ConfirmedValidator(controlName: string, matchingControlName: string){

  return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {

          return;

      }

      if (control.value !== matchingControl.value) {

          matchingControl.setErrors({ confirmedValidator: true });

      } else {

          matchingControl.setErrors(null);

      }

  }

}
