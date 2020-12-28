import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action'
import { Observable } from 'rxjs'
import { isSubmittingSelector } from '../../store/selectors'
import { AuthService } from '../../services/auth.service'
import { RegisterRequestInterface } from '../../types/register-request.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._initializeForm()
    this._initializeValues()
  }

  private _initializeForm() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      email: '',
      password: ''
    })
  }

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this._store.dispatch(registerAction({ request }))
  }

  private _initializeValues() {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
  }
}
