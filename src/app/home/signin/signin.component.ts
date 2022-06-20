import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
  loginForm: FormGroup; // Controla o form do template

  // Contrutor de formulário
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // primeiro parâmetro é o valor padrão do formulário.
      // segundo parâmetro do array é a validação.
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const userName = this.loginForm.get("userName").value;
    const password = this.loginForm.get("password").value;

    this.authService
        .authenticate(userName, password)
        .subscribe(
          () => console.log("authenticado com sucesso"),
          err => {
            console.log(err);
            this.loginForm.reset();
            alert("Invalid user name or password");
          }
        )
  }
}
