import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/current-user.interface'
import { of } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistanceService } from '../../../shared/services/persistance.service'
import { Router } from '@angular/router'
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action'

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this._authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this._persistanceService.set('accessToken', currentUser.token)
            return loginSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(loginFailureAction({ errors: errorResponse.error.errors }))
          )
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() => this._actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      this._router.navigateByUrl('/')
    })
    ),
    { dispatch: false })

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _persistanceService: PersistanceService,
    private _router: Router
  ) {
  }
}
