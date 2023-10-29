import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected userEmail: string;
  protected userPassword: string;
  protected isWrongLogin: boolean = false;
  protected isSubmitted: boolean = false;
  protected msgError: string;
  constructor(
    private loginService: LoginService,
    private builder: FormBuilder,
    private router: Router) { }
  ngOnInit(): void {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required]),
    userPassword: this.builder.control('', [Validators.required])
  })


  login() {
    this.isSubmitted = true;
    if (this.userEmail && this.userPassword)
      this.loginService.login(this.userEmail, this.userPassword).subscribe({
        next: (res) => {
          if (typeof res === 'string') {
            this.msgError = res;
            return
          }
          if (res.userRoles[0].roleName === 'ROLE_ADMIN' || res.userRoles[1].roleName === 'ROLE_ADMIN') {
            sessionStorage.setItem("userRoles", 'ROLE_ADMIN');
            sessionStorage.setItem("jwtToken", JSON.stringify(res.jwtToken));
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => console.log(err),
      })
  }


}
