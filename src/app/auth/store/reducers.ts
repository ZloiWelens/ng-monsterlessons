import { AuthStateInterface } from '../types/auth-state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.action'

export const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  validationErrors: null
}

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })),
  on(registerSuccessAction,
    (state, action
    ):
    AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
      validationErrors: null
    })),
  on(registerFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  }))
)

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
