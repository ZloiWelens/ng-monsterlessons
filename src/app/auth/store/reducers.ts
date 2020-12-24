import { AuthStateInterface } from '../types/auth-state.interface'
import { Action, createReducer, on } from '@ngrx/store'
import { registerAction } from './actions/register.action'

export const initialState: AuthStateInterface = {
  isSubmitting: false
}

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true
  }))
)

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
