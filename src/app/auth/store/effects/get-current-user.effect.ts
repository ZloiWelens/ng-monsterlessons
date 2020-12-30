import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { AuthService } from '../../services/auth.service'
import { CurrentUserInterface } from '../../../shared/types/current-user.interface'
import { of } from 'rxjs'
import { PersistanceService } from '../../../shared/services/persistance.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from '../actions/get-current-user.action'

@Injectable()

export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this._persistanceService.get('accessToken')
        if (!token) return of(getCurrentUserFailureAction())
        return this._authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({ currentUser })
          }),
          catchError(() => of(getCurrentUserFailureAction())
          )
        )
      })
    )
  )

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _persistanceService: PersistanceService
  ) {
  }
}
