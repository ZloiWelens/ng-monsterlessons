import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  isLoggedIn: boolean | null
  isLoading: boolean
  currentUser: CurrentUserInterface | null
  validationErrors: BackendErrorsInterface | null
}
