import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { registerAction } from '../../store/actions/register.action'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _store: Store
  ) {
  }

  ngOnInit(): void {
    this.initializeForm()
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
}
