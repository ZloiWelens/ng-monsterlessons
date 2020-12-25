import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/current-user.interface'
import { of } from 'rxjs'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this._authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({ currentUser })
          }),
          catchError(() => of(registerFailureAction())
          )
        )
      })
    )
  )

  constructor(
    private _actions$: Actions,
    private _authService: AuthService
  ) {
  }
}
