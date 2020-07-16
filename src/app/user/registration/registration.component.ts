import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public fb: FormBuilder
    , private authService: AuthService
    , public router: Router) { }

  ngOnInit() {
    this.validation();
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmPwdCtrl = fb.get('confirmPassword');
    if (confirmPwdCtrl.errors == null || 'mismatch' in confirmPwdCtrl.errors) {
      if (fb.get('password').value !== confirmPwdCtrl.value) {
        confirmPwdCtrl.setErrors({ mismatch: true });
      } else {
        confirmPwdCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign({ password: this.registerForm.get('passwords.password').value },
        this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.router.navigate(['/user/login']);
        },
        error => {
          const erro = error.error;
          erro.array.forEach(element => {

            switch (element.code) {
              case 'DuplicateUserName':
                console.log('Usuario existente!');
                break;
              default:
                console.log('Erro no cadastro ' + element.code);
                break;
            }
          });
        }
      );
    }
  }
}
