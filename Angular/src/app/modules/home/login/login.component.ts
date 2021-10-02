import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../auth/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;




  constructor(private authSvc: AuthService, private fb: FormBuilder,  private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {
    const username= this.form.value.username;
    const password = this.form.value.password;
    const userData = {
      username:username,
      password:password
    }
    this.authSvc.login(userData).subscribe((res)=>
    { if(res){
      this.router.navigate(['inside']);
    }
  });
  }

  error(){
    alert('Usuario o Pasword ingresados son invalidos')
  }






  register() {
    this.router.navigate(['/register']);
  }
}
