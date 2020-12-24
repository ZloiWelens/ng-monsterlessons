import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action'
import { Observable } from 'rxjs'
import { isSubmittingSelector } from '../../store/selectors'

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
    private _store: Store
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  private initializeForm() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      email: '',
      password: ''
    })
  }

  onSubmit() {
    this._store.dispatch(registerAction(this.form.value))
  }

  private initializeValues() {
    this.isSubmitting$ = this._store.pipe(select(isSubmittingSelector))
  }
}
