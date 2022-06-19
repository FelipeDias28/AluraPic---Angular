import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {
  loginForm: FormGroup; // Controla o form do template

  // Contrutor de formulário
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // primeiro parâmetro é o valor padrão do formulário.
      // segundo parâmetro do array é a validação.
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
