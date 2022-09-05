import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PlataformDetectorService } from "src/app/core/plataform-detector/plataform-detector.service";
import { lowerCaseValidator } from "src/app/shared/components/validators/lower-case.validator";
import { NewUSer } from "./new-user";
import { UserNotTakenValidatorService } from "./signup-not-taken.validator.service";
import { SignupService } from "./signup.service";

@Component({
  templateUrl: "./signup.component.html",
  providers: [UserNotTakenValidatorService],
})
export class SignUpComponent implements OnInit {
  singupForm: FormGroup;
  @ViewChild("inputEmail") inputEmail: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService
  ) {}

  ngOnInit(): void {
    this.singupForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      fullName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      userName: [
        "",
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
        this.userNotTakenValidatorService.checkUserNameTaken(),
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });

    this.platformDetectorService.isPlatformBrowser() &&
      this.inputEmail.nativeElement.focus();
  }

  signup() {
    const newUser = this.singupForm.getRawValue() as NewUSer;

    this.signupService.signup(newUser).subscribe(
      () => this.router.navigate([""]),
      (err) => console.log(err)
    );
  }
}
