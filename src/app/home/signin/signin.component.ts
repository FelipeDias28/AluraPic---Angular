import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/auth/auth.service";
import { PlataformDetectorService } from "./../../core/plataform-detector/plataform-detector.service";

@Component({
  templateUrl: "./signin.component.html",
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup; // Controla o form do template

  // Injetando um valor do input HTML
  @ViewChild("userNameInput") userNameInput: ElementRef<HTMLInputElement>;

  // Contrutor de formulário
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // primeiro parâmetro é o valor padrão do formulário.
      // segundo parâmetro do array é a validação.
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.platformDetectorService.isPlatformBrowser() &&
      this.userNameInput.nativeElement.focus();
  }

  login() {
    const userName = this.loginForm.get("userName").value;
    const password = this.loginForm.get("password").value;

    this.authService.authenticate(userName, password).subscribe(
      () => this.router.navigate(["user", userName]),
      (err) => {
        console.log(err);
        this.loginForm.reset();
        this.platformDetectorService.isPlatformBrowser() &&
          this.userNameInput.nativeElement.focus();
        alert("Invalid user name or password");
      }
    );
  }
}
