import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors'
import { AuthService } from '../../services/auth.service'
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface'
import { LoginRequestInterface } from '../../types/login-request.interface'
import { loginAction } from '../../store/actions/login.action'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

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
      email: '',
      password: ''
    })
  }

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this._store.dispatch(loginAction({ request }))
  }

  private _initializeValues() {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this._store.pipe(select(validationErrorsSelector))
  }
}
