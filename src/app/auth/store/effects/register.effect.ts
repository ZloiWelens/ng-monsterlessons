import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/current-user.interface'
import { of } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistanceService } from '../../../shared/services/persistance.service'
import { Router } from '@angular/router'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this._authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this._persistanceService.set('accessToken', currentUser.token)
            return registerSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(registerFailureAction({ errors: errorResponse.error.errors }))
          )
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() => this._actions$.pipe(
    ofType(registerSuccessAction),
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
